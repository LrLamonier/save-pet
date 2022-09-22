const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Adocao } = require("../models");

// cadastrar adoção
exports.newAdopt = catchAsync(async (req, res, next) => {
  const { titulo, tipoPet, descricao, local } = req.body;
  // const newAdoption = await Adocao.create(req.body);

  // if (!newAdoption) {
  //   return next(new AppError("Não foi possível cadastrar essa adoção!", 500));
  // }

  res.status(201).json({
    status: "success",
    data: {
      // newAdoption,
    },
  });
});

// alterar cadastro adoção
exports.updateAdopt = catchAsync(async (req, res, next) => {});
