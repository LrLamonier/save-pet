const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// ver meu perfil
exports.getMe = catchAsync(async (req, res, next) => {
  // pegar dados do usuário baseado na ID do request
  // const user = dados do usuário
  let user;

  // retornar erro caso o usuário não seja encontrado
  if (!user) {
    return next(new AppError("Usuário não encontrado!", 404));
  }

  // criar objeto usuário para resposta
  const userRes = {
    name: user.name,
    email: user.email,
    telephone: user.telephone,
  };

  // resposta
  res.status(200).json({
    status: "success",
    data: {
      user: userRes,
    },
  });
});

//////////////////////////////////////////////////////////
// editar perfil
exports.editProfile = catchAsync(async (req, res, next) => {
  const { name, email, telephone } = req.body;

  // fazer alterações no usuário no banco de dados

  // se erro, responder com erro

  // se sucesso, responder com sucesso
  let updatedUser;

  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});
