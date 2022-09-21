const catchAsync = require("../utils/catchAsync");
const calcDistance = require("../utils/calcDistance");
const AppError = require("../utils/appError");
const sortArray = require("sort-array");
const { Chamados } = require("../models");

exports.allEvents = catchAsync(async (req, res, next) => {
  const chamados = await Chamados.findAll();

  if (chamados.length === 0) {
    return next(new AppError("Nenhum chamado encontrado.", 404));
  }

  if (!req.body.location) {
    return res.status(200).json({
      status: "success",
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
      distancia: calcDistance(req.body.location, c.local).toFixed(2) * 1,
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
    },
  });

  if (chamados.length === 0) {
    return next(new AppError("Nenhum chamado aberto por esse usuário.", 404));
  }

  res.status(200).json({
    chamados,
  });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  if (
    !req.body.titulo ||
    !req.body.tipoPet ||
    !req.body.descricao ||
    !req.body.local
  ) {
    return next(new AppError("Dados inválidos!", 400));
  }

  const { titulo, tipoPet, descricao, local } = req.body;
  const id_usuario_chamado = req.user.dataValues.id_usuario;

  const novoChamado = await Chamados.create({
    titulo,
    tipoPet,
    descricao,
    local,
    id_usuario_chamado,
  });

  if (!novoChamado) {
    return next(new AppError("Não foi possível criar a ocorrência.", 500));
  }

  res.status(201).json({
    data: novoChamado,
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

exports.deleteEvent = catchAsync(async (req, res, next) => {
  await req.chamado.destroy();

  res.status(200).json({
    status: "success",
    message: "Chamado deletado com sucesso!",
  });
});
