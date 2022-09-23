# SavePet

## Conteúdo

- [A ideia](#a-ideia)
- [Funcionalidades](#funcionalidades)
    - [Criação e administração de conta](#criação-e-administração-de-conta)
    - [Criação, atualização e finalização de chamados](#criação-atualização-e-finalização-de-chamados)
- [Segurança](#segurança)
    - [Autenticação via JWT](#autenticação-via-JWT)
    - [Sanitização e validação de dados](#sanitização-e-validação-de-dados)
    - [Armazenamento de informações sensíveis](#armazenamento-de-informações-sensíveis)
    - [_Error handling_ em produção](#error-handling-em-produção)
    - [_Error handling_ em desenvolvimento](#error-handling-em-desenvolvimento)
- [O banco de dados](#o-banco-de-dados)
- [Integração com outros serviços](#integração-com-outros-serviços)
- [Quickstart](#quickstart)
- [Endpoints](#endpoints)
- [A equipe](#a-equipe)

## A ideia

## Funcionalidades

### Criação e administração de conta

Os usuários conseguem se cadastrar fornecendo um endereço de email válido, um número de telefone para contato e um documento de identificação válido, CPF para usuários regulares e CNPJ para ONGs, clínicas/hospitais veterinários ou outras entidades.

Os dados do usuário, com exceção do endereço de email e do documento de identificação, podem ser alterados, desde que o usuário esteja autenticado (mais detalhes em [autenticação via JWT](#-autenticação-via-jwt)).

O usuário pode, ainda, recuperar a senha e excluir a própria conta. Essas duas ações, no entanto, não podem ser feitas diretamente. Para realizá-las o usuário primeiro precisa solicitar um _token_ especial para o servidor que possui um prazo de validade de 10 minutos. Um _request_ subsequente contendo o token válido confirma a ação.

Os _tokens_ de recuperação de senha e de exclusão de conta precisam necessariamente serem enviados para o usuário através de um canal seguro. É comum a utilização de serviços externos de envio de emails, mensagens SMS ou mesmo mensagens em aplicativos como o WhatsApp.

A sessão [integração com outros serviços](#integração-com-outros-serviços) contém mais informações sobre essas funcionalidades e como integrá-las ao SavePet.

### Criação, atualização e finalização de chamados

Um usuário autenticado pode criar chamados que sinalizam a ocorrência de um animal em vulnerabilidade. Para isso, um pedido deve ser feito fornecendo um título que resuma a situação sendo sinalizada, o tipo do animal em risco, uma descrição mais detalhada da situação e a localização do animal.

A localização deve ser enviada no formato do padrão internacional [World Geodetic System (WGS)](https://developers.google.com/maps/documentation/javascript/coordinates) com, no mínimo, 5 casas decimais. Esse padrão foi escolhido porque é o formato utilizado pelo Google, o que facilita a integração com suas APIs.

![Exemplo de criação de chamado](./readme-imgs/chamado_exemplo.png)<br>
Exemplo de um _request_ de criação do chamado mostrando as coordenadas no padrão WGS.

Um chamado pode ter suas informações alteradas pelo usuário que o criou ou por um usuário especial com o cargo de administrador. Da mesma forma, o criador ou administrador pode sinalizar o chamado como finalizado quando a situação tiver sido resolvida. Um chamado finalizado também pode ser reaberto em até 48 horas após ter sido finalizado.

## Segurança

### Autenticação via JWT

A API SavePet utuliza [JSON _Web Tokens_](https://jwt.io/) via _cookie_ como forma de autenticar os usuários e permitir acesso seletivo a rotas restritas. Essa abordagem está alinhada com a proposta de um servidor [_stateless_](https://stackoverflow.com/a/5539862).

Os _tokens_ levam a _tag_ [HttpOnly](https://owasp.org/www-community/HttpOnly) com o objetivo de mitigar o risco do _cookie_ ser comprometido no lado do cliente.

![Usuário autenticado com sucesso.](./readme-imgs/autenticacao_sucesso.png)<br>
Token JWT gerado com propriedades ID do usuário, _issued at_ e _timestamp_ de expiração.

Ao tentar acessar uma rota restrita, o JWT é identificado no _request_ e validado. Após identificar o usuário no banco de dados, a _timestamp_ de emissão do _token_ é comparada com a _timestamp_ da última troca de senha do usuário. No caso de comprometimento da conta e subsequente troca de senha por parte do usuário, todos os _tokens_ emitidos antes da troca se tornam inválidos.

![Falha na autenticação](./readme-imgs/autenticacao_falha.png)<br>
Falha na autenticação por qualquer motivo, como _cookie_ expirado, retorna um erro genérico.

### Sanitização e validação de dados

Como medida de segurança, a _untrusted data_ enviadas nos _requests_ passam por processos que têm por objetivo prevenir diversos tipos de ataques.

- O método `express.json()` é usado para limitar o tamanho dos _requests_ a 10kb, diminuindo assim o risco de ataques que visam sobrecarregar a API com _payloads_ excessivamente grandes.
- A biblioteca [xss](https://www.npmjs.com/package/xss) ajuda a proteger contra ataques do tipo _cross-site scripting_.
- A biblioteca [hpp](https://www.npmjs.com/package/hpp) protege contra ataques do tipo poluição de parâmetros HTTP. Em adição à filtração de parâmetros repetidos, a estratégia de _whitelisting_ é utilizada para limitar quais os parâmetros são aceitos no _request_. A criação de uma _whitelist_, no caso da SavePet, é mais adequada do que uma _blacklist_ devido à quantidade relativamente baixa de parâmetros que a API aceita.
- A biblioteca [cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator) valida os números de CPF ou CNPJ inseridos pelo usuário e a biblioteca [validator](https://www.npmjs.com/package/validator) é utilizada para validações diversas (tipos de caracteres na senha, email...).

### Armazenamento de informações sensíveis

A senha dos usuários não é armazenada diretamente. Ao invés disso, a as senhas passam por um processo de _hashing_ e _salting_ através da biblioteca [bcrypt](https://www.npmjs.com/package/bcrypt). O mesmo método é aplicado para proteger _tokens_ de troca/recuperação de senha e deleção de conta (mais detalhes em [segurança](###-Segurança)).

### _Error handling_ em produção

A SavePet segue o paradigma de manuseio de erros de passar os erros para a função `next()` ao invés de `throw new Error`.

![Função de criação de novo usuário que retorna um erro caso o endereço de email já esteja cadastrado](./readme-imgs/erro_next.png)<br>
A função de criação de novo usuário, por exemplo, retorna um erro notificando o usuário que o email inserido já está cadastrado.

Para lidar com erros nesse modelo, primeiro criamos uma classe de erro customizada, à qual foi dado o nome de `AppError`, que _extends_ a classe `Error` padrão do JavaScript. A diferença dessa nova classe para a original é que ela adiciona um atributo que indica que esse erro é operacional.

![Classe AppError](./readme-imgs/erro_apperror.png)<br>
Classe AppError. `Error.captureStackTrace(this, this.constructor)` explicada logo abaixo.

Em seguida, criamos a função de _global error handling_ que verifica se o erro é operacional.

![Global Error Handler](./readme-imgs/erro_global_error_handler.png)<br>
_Global error handler_, função com 4 parâmetros.

Se o erro for operacional, é encaminhado para o usuário somente o código de _status_ HTTP e a mensagem personalizada que foi escrita na hora que o objeto `AppError` foi criado.

Em caso de erro decorrente de falhas no código, o usuário recebe somente um erro genérico com código HTTP 500 e uma mensagem de que algo deu errado.

![Envio do erro para o usuário](./readme-imgs/erro_senderrorprod.png)<br>

Toda essa estratégia garante que, em caso de erro, o usuário receberá uma resposta que descreve exatamente o que aconteceu ou uma resposta genérica quando o erro for um _bug_. Não vazar na resposta o _stack_ do erro é crucial para que o funcionamento interno da API não seja exposto. 

### _Error handling_ em desenvolvimento

Para facilitar o processo de desenvolvimento da aplicação a função global de erro verifica se a variável ambiental `NODE_ENV` está definida como `production` ou `development`. Caso o ambiente seja de produção, a entrega de erros acontece conforme descrito acima. No entanto, para ajudar no processo de _debugging_, um outro controlador de erro é invocado caso o ambiente esteja definido como desenvolvimento.

Para definir em qual ambiente a aplicação iniciará, utilize os _scripts_ `npm run start:dev` e `npm run start:prod` para iniciar em modo de desenvolvimento e produção, respectivamente.

![Envio de erros em desenvolvimento](./readme-imgs/erro_senderrordev.png)<br>
Função de envio de erros em desenvolvimento.

Essa resposta inclui o código HTTP, o erro em si, a mensagem e mais importante a _stack_ do erro. A função `Error.captureStackTrace(this, this.constructor)` adiciona ao objeto de erro a stack de funções que foram invocadas até a função onde o erro ocorreu. O que facilita identificar onde o problema ocorreu.

![Erro em desenvolvimento](./readme-imgs/erro_desenvolvimento.png)<br>
Exemplo de erro em desenvolvimento mostrando o _stack_ de funções.

Por motivos de segurança, caso não seja fornecido um valor válido de `NODE_ENV`, a aplicação irá executar por padrão no modo produção.

## O banco de dados
Imagem do objetos do banco d dados:
![Banco de dados](./readme-imgs/savepet_db.png)

## Integração com outros serviços

A SavePet foi desenvolvida tendo em mente a integração com serviços que possibilitam a autenticação em duas etapas. Os _tokens_ de recuperação de senha e de exclusão de conta devem ser enviados para o usuário através de um canal que podemos assumir ser seguro.

![Resposta do servidor contendo um _token_ de recuperação de senha](./readme-imgs/integracao_token.png)<br>
Acima um exemplo de resposta contendo um token de recuperação de senha. O código neste repositório envia o token diretamente na resposta, o que é uma falha crítica de segurança. Quando for colocar essa API em produção, siga os passos descritos em [integrar serviço de autenticação em duas etapas.](#integrar-serviço-de-autenticação-em-duas-etapas)

Essa estratégia de autenticação parte do pressuposto que o email e/ou número de telefone do usuário são confiáveis. Com esse princípio estabelecido, a abordagem mais direta é integrar o sistema com APIs que enviam mensagens, seja por email, SMS ou através de aplicativos como o WhatsApp.

Existem centenas de serviços com os mais variados preços, dependendo do volume de mensagens e por onde elas são enviadas. Uma boa opção gratuita é o [SendGrid](https://sendgrid.com/), que possui planos gratuitos que atendem confortavelmente aplicações pequenas.

## Quickstart

## Endpoints

## A equipe