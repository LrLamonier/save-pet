const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");

const userRoute = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");

// app Express
const app = express();

// habilitar cors
app.enable("trust proxy");
app.use(cors());
app.options("*", cors());

// limitar tamanho dos requests
app.use(
  express.json({
    limit: "10kb",
  })
);

// leitura de cookies para autenticação
app.use(cookieParser());

// proteção contra cross-site scripting
app.use(xss());

// adicionar timestamp do request ao corpo
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// rotas
app.use("/user", userRoute);

// manipulação de erros
app.use(globalErrorHandler);

module.exports = app;
