// const AppError = require("../utils/appError");

// manipuladores de erros em produção
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Algo deu errado. Tente novamente.",
  });
};

// manipulador de erros em desenvolvimento
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// manipulador de erros em produção
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Algo deu errado.",
  });
};

// manipulador global de erros
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "erro";

  // envio de erro em desenvolvimento
  sendErrorDev(err, res);

  // envio de erros em produção
  // sendErrorProd(err, res);
};
