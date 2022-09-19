// const AppError = require("../utils/appError");

// manipuladores de erros em produção

// manipulador de erros em desenvolvimento
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// manipulador global de erros
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "erro";

  // envio de erro em desenvolvimento
  sendErrorDev(error, res);
};
