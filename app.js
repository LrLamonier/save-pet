const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json");
const hpp = require("hpp");
const xss = require("xss-clean");
const hpp = require("hpp");

const userRoute = require("./routes/userRoutes");
const adoptRoute = require("./routes/adoptionRoutes");

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

// habilitar Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// leitura de cookies para autenticação
app.use(cookieParser());

// proteção contra cross-site scripting
app.use(xss());

// adicionar timestamp do request ao corpo
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// whitelist
app.use(hpp({
    whitelist: [
      "titulo",
      "tipo_pet",
      "descricao",
      "localizacao",
      "id_solicitante",
      "id_instituicao",
      "name",
      "email",
      "password",
      "passwordConfirm",
      "telephone",
      "cpf",
      "cnpj",
    ],
  })
);

// rotas
app.get("/", (req, res) => {
  res.send(`Save Pet`);
});
app.use("/user", userRoute);
app.use("/adopt", adoptRoute);

// manipulação de erros
app.use(globalErrorHandler);

//documentação
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
