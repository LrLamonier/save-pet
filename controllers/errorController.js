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
const sendErrorProd = (err, res) => {
  console.log(err);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.name === "SequelizeValidationError") {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "Dados inválidos.",
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
