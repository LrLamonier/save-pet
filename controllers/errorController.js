const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err.name === "SequelizeValidationError") {
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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "erro";

  env = JSON.stringify(process.env.NODE_ENV)
    .replace(/["]/g, "")
    .replace(" ", "");

  if (env === "development") {
    sendErrorDev(err, res);
  } else if (env === "production") {
    sendErrorProd(err, res);
  } else {
    return res.status(500).json({
      status: "fail",
      message: "Algo deu errado. Tente novamente em alguns minutos.",
    });
  }
};
