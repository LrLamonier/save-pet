const catchAsync = require("../utils/catchAsync");
const calcDistance = require("../utils/calcDistance");
const AppError = require("../utils/appError");
const sortArray = require("sort-array");
const { Chamados } = require("../models");

exports.allEvents = catchAsync(async (req, res, next) => {
  const chamados = await Chamados.findAll({
    where: {
      concluido: false,
    },
  });

  if (chamados.length === 0) {
    return next(new AppError("Nenhum chamado encontrado.", 404));
  }

  const { loc } = req.query || undefined;

  let locValid;
  if (loc) {
    const latValid = loc.split(",")[0] * 1;
    const latDecimal = loc.split(",")[0].split(".")[1].length >= 5;

    const lonValid = loc.split(",")[1] * 1;
    const lonDecimal = loc.split(",")[1].split(".")[1].length >= 5;

    locValid = latValid && latDecimal && lonValid && lonDecimal;
  }

  if (!loc) {
    return res.status(200).json({
      status: "success",
      chamados,
    });
  }

  if (!locValid) {
    return res.status(200).json({
      status: "success",
      message: "Localização inválida, exibindo chamados na ordem padrão.",
      chamados,
    });
  }

  const chamadosDistancia = chamados.map((c) => {
    return {
      id_chamado: c.id_chamado,
      titulo: c.titulo,
      tipoPet: c.tipoPet,
      descricao: c.descricao,
      local: c.local,
      id_usuario_chamado: c.id_usuario_chamado,
      distancia: calcDistance(loc, c.local).toFixed(2) * 1,
    };
  });

  const chamadosOrdenados = sortArray(chamadosDistancia, {
    by: "distancia",
  });

  res.status(200).json({
    status: "success",
    chamados: chamadosOrdenados,
  });
});

exports.allEventsByUser = catchAsync(async (req, res, next) => {
  const chamados = await Chamados.findAll({
    where: {
      id_usuario_chamado: req.params.id_usuario,
      concluido: false,
    },
  });

  if (chamados.length === 0) {
    return next(new AppError("Nenhum chamado aberto por esse usuário.", 404));
  }

  const chamadosRes = chamados.map(({ dataValues, ...data }) => {
    return {
      id_chamado: dataValues.id_chamado,
      titulo: dataValues.titulo,
      tipoPet: dataValues.tipoPet,
      descricao: dataValues.descricao,
      local: dataValues.local,
      dtAbertura: dataValues.dtAbertura,
      id_usuario_chamado: dataValues.id_usuario_chamado,
    };
  });

  res.status(200).json({
    chamados: chamadosRes,
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const dataError = [];
  let errorMsg;

  if (!req.body.titulo) {
    dataError.push("título");
  }
  if (!req.body.tipoPet) {
    dataError.push("tipo do animal");
  }
  if (!req.body.descricao) {
    dataError.push("descrição");
  }
  if (!req.body.local) {
    dataError.push("localização");
  }
  let local;
  let locValid;
  if (req.body.local) {
    local = req.body.local.replace(/[ ]/g, "");

    const lat = local.split(",")[0] * 1 !== NaN;
    const latDecimal = local.split(",")[0].split(".")[1].length >= 5;

    const lon = local.split(",")[1] * 1 !== NaN;
    const lonDecimal = local.split(",")[1].split(".")[1].length >= 5;

    locValid = lat && latDecimal && lon && lonDecimal;
  }

  if (dataError.length !== 0) {
    const plural = dataError.length > 1;
    errorMsg = `O${plural ? "s" : ""} campo${
      plural ? "s" : ""
    } ${dataError.join(", ")} ${plural ? "são" : "é"} obrigatório${
      plural ? "s" : ""
    }!`;
  }
  if (!locValid) {
    errorMsg += "Localização inválida!";
  }

  if (errorMsg) {
    return next(new AppError(errorMsg, 400));
  }

  const { titulo, tipoPet, descricao } = req.body;
  const id_usuario_chamado = req.user.dataValues.id_usuario;

  const novoChamado = await Chamados.create({
    titulo,
    tipoPet,
    descricao,
    local,
    dtAbertura: req.requestTime,
    concluido: false,
    id_usuario_chamado,
  });

  if (!novoChamado) {
    return next(new AppError("Não foi possível criar a ocorrência.", 500));
  }

  res.status(201).json({
    data: {
      titulo,
      tipoPet,
      descricao,
      local,
      dtAbertura: req.requestTime,
      id_usuario_chamado,
    },
  });
});

exports.checkAuthEvent = catchAsync(async (req, res, next) => {
  if (!req.body.id_chamado) {
    return next(new AppError("ID de chamado inválido!", 400));
  }

  const chamado = await Chamados.findOne({
    where: {
      id_chamado: req.body.id_chamado,
    },
  });

  if (!chamado) {
    return next(new AppError("Chamado não encontrado!", 404));
  }

  if (
    chamado.dataValues.id_usuario_chamado !== req.user.dataValues.id_usuario &&
    !req.user.dataValues.isAdmin
  ) {
    return next(new AppError("Não autorizado!", 403));
  }

  req.chamado = chamado;
  next();
});

exports.editEvent = catchAsync(async (req, res, next) => {
  const chamadoAtualizado = {};

  if (req.body.titulo) {
    chamadoAtualizado.titulo = req.body.titulo;
  }
  if (req.body.tipoPet) {
    chamadoAtualizado.tipoPet = req.body.tipoPet;
  }
  if (req.body.descricao) {
    chamadoAtualizado.descricao = req.body.descricao;
  }
  if (req.body.local) {
    chamadoAtualizado.local = req.body.local;
  }

  req.chamado.set(chamadoAtualizado);

  await req.chamado.save();

  res.status(200).json({
    status: "success",
    chamadoAtualizado,
  });
});

exports.finishEvent = catchAsync(async (req, res, next) => {
  req.chamado.set({ concluido: true, dtConclusao: req.requestTime });
  req.chamado.save();

  res.status(200).json({
    status: "success",
    message: "Chamado encerrado com sucesso!",
  });
});

exports.reopenEvent = catchAsync(async (req, res, next) => {
  const dtReopenExpir = req.chamado.dtConclusao + 2 * 24 * 60 * 60 * 1000;

  if (req.requestTime > dtReopenExpir) {
    return next(new AppError("Não é mais possível reabrir este chamado.", 400));
  }

  req.chamado.set({ concluido: false, dtConclusao: null });
  req.chamado.save();

  res.status(200).json({
    status: "success",
    message: "Chamado reaberto com sucesso!",
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  await req.chamado.destroy();

  res.status(200).json({
    status: "success",
    message: "Chamado deletado com sucesso!",
  });
});
