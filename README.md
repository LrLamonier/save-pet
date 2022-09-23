<div align="center" style="margin: 20px; text-align: center">

![README](https://img1.wsimg.com/isteam/stock/42906/:/cr=t:0%25,l:0%25,w:100%25,h:100%25)

  
<h1> :feet:
:paw_prints: SavePet :feet:
:paw_prints: </h1>
  Um projeto desenvolvido durante o Dev For Tech I Back End - NodeJS. Um projeto de atração,  treinamento e recrutamento de Tech talents  mantido pela 
  
  [Gama Academy](https://www.gama.academy) em parceria com a [ACATE](https://www.acate.com.br) 

  [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://github.com/LrLamonier/save-pet/blob/main/LICENSE)
  ![GitHub last commit](https://img.shields.io/github/last-commit/LrLamonier/save-pet?style=flat-square)
  ![GitHub top language](https://img.shields.io/github/languages/top/LrLamonier/save-pet?style=flat-square)
 
</div>

<div align="center">  

[![Skills](https://skillicons.dev/icons?i=node,js,git,github,vscode,mysql,express,&perline=8)](/LrLamonier/save-pet)
 
</div>

## Conteúdo 

- [A equipe](#a-equipe)
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
    - [1. Obter o código](#1-obter-o-codigo)
    - [2. Instalar dependências](#2-instalar-dependencias)
    - [3. Iniciar a API no modo desenvolvimento](#3-iniciar-a-api-no-modo-desenvolvimento)
    - [4. Testar os endpoints e o banco de dados](#4-testar-os-endpoints-e-o-banco-de-dados)
    - [5. Integrar a API com autenticação em duas etapas](#5-integrar-a-api-com-autenticação-em-duas-etapas)
    - [6. Deploy da aplicação](#6-deploy-da-aplicação)
- [Endpoints](#endpoints)
    - [Endpoints de usuários](#endpoints-de-usuários)
        - [Criar conta](#criar-conta)
        - [Login](#login)
        - [Logout](#logout)
        - [Alterar cadastro](#alterar-cadastro-requer-jwt-válido)
        - [Solicitar deleção da conta](#solicitar-deleção-da-conta-requer-jwt-válido)
        - [Deletar conta](#deletar-conta)
        - [Solicitar alteração de senha](#solicitar-alteração-de-senha)
        - [Alterar senha](#alterar-senha)
        - [Ver meu perfil](#ver-meu-perfil-requer-jwt-válido)
        - [Ver todos os usuários](#ver-todos-os-usuários-requer-jwt-válido-de-um-usuário-do-tipo-administrador)
        - [Procurar usuário pelo ID](#procurar-usuário-pelo-id)
    - [Endpoints de chamados](#endpoints-de-chamados)
        - [Criar novo chamado](#criar-novo-chamado-requer-JWT-válido)
        - [Editar chamado](#editar-chamado-requer-jwt-válido-do-usuário-que-criou-o-chamado-ou-de-um-administrador)
        - [Deletar chamado](#deletar-chamado-requer-jwt-válido-do-usuário-que-criou-o-chamado-ou-de-um-administrador)
        - [Buscar chamados por ID de usuário](#buscar-chamados-por-id-de-usuário)
        - [Buscar todos os chamados](#buscar-todos-os-chamados)
        - [Meus chamados](#meus-chamados-requer-jwt-válido)

## Equipe 
- ``Lucas Lamonier (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/Llpampolha/)
- ``Lucas Pampolha (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in/) ou [Github](https://github.com/lpampolha) 
- ``Vando Rocha (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/Vandorc-Dev)
- ``Gisele Souza (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/giselessouza)

Instrutor:
- `` Jenifer Placido `` 

## A ideia 

De acordo com a (OMS), somente no Brasil, cerca de 30 milhões de animais estão abandonados, sendo aproximadamente 20 milhões de cães e 10 milhões de gatos. Em grandes metrópoles, para cada cinco habitantes há um cachorro. Desses, 10% estão abandonados.  Em 2020, durante a pandemia, a quantidade de cães e gatos resgatados subiu 70%, segundo levantamento da Ampara Animal, associação que oferece suporte a protetores de animais. Daí nascemos nós. Somos a SavePet. Nosso objetivo é auxiliar animais em vulnerabilidade (ex. abandonados, machucados, doentes, maus tratos) por resgatar esses animais aonde estiverem, por acionar a instituição/ongs/pessoas para que essa possa fazer o resgate do animal e registre o status da ocorrencia. Se o animal estiver ferido/precisando de ajuda medica passará primeiro por cuidados antes de ser liberado para adoção, senão será encaminhado para a lista de adoção. Também contamos com a opção de cadastrar animais pra adoção ou se voluntariar pra adotar algum deles (da instituição ou cadastrado por outros). Somos uma entidade sem fins lucrativos que desenvolve papel fundamental na promoção do bem estar e proteção dos animais, além de conscientizar a população sobre a posse responsável de cães e gatos. Precisamos encontrar adotantes para nossos peludos e bichanos resgatados ou doados. Cumprindo essa missão, poderemos fazer mais e melhor em prol de cães e gatos abandonados.
Nosso trabalho mantém-se unicamente por doações e trabalho voluntário. Não recebemos ajuda governamental e nem de empresas privadas. Seja nosso colaborador e faça a diferença na vida de peludos e bichanos! Sua solidariedade salva vidas.

## Funcionalidades 

### Criação e administração de conta	

Os usuários conseguem se cadastrar fornecendo um endereço de email válido, um número de telefone para contato e um documento de identificação válido, CPF para usuários regulares e CNPJ para ONGs, clínicas/hospitais veterinários ou outras entidades.

Os dados do usuário, com exceção do endereço de email e do documento de identificação, podem ser alterados, desde que o usuário esteja autenticado (mais detalhes em [autenticação via JWT](#-autenticação-via-jwt)).

O usuário pode, ainda, recuperar a senha e excluir a própria conta. Essas duas ações, no entanto, não podem ser feitas diretamente. Para realizá-las o usuário primeiro precisa solicitar um _token_ especial para o servidor que possui um prazo de validade de 10 minutos. Um _request_ subsequente contendo o token válido confirma a ação.

Os _tokens_ de recuperação de senha e de exclusão de conta precisam necessariamente serem enviados para o usuário através de um canal seguro. É comum a utilização de serviços externos de envio de emails, mensagens SMS ou mesmo mensagens em aplicativos como o WhatsApp.

A sessão [integração com outros serviços](#integração-com-outros-serviços) contém mais informações sobre essas funcionalidades e como integrá-las ao SavePet.

### Criação, atualização e finalização de chamados :poodle:	

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

## O banco de dados :paw_prints:

Imagem dos objetos do banco de dados:

![Banco de dados](./readme-imgs/savepet_db.png)<br>
Para criar as tabelas previamente no banco é necessário está com o Mysql instalando e rodando. Executando o script abaixo criamos todos os objetos do banco.
```sql
# Criar banco 
CREATE DATABASE savepet_db;
USE savepet_db;

#Criar tabela de usuários
CREATE TABLE usuarios(
	id_usuario INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	contato VARCHAR(50) NOT NULL,
	cpf VARCHAR(11),
	cnpj VARCHAR(14),
	password VARCHAR(50) NOT NULL,
	isAdmin BOOLEAN,
	dtSenhaAlter VARCHAR(50),
    dtTokenAlterSenha VARCHAR(50),
    dtAlterTokenExpir VARCHAR(50),
    dtTokenDeletar VARCHAR(50),
    dtTokenDelExpir VARCHAR(50)
);
# Criar tabela de chamados
CREATE TABLE chamados(
	id_chamado INT AUTO_INCREMENT PRIMARY KEY,
	ttulo VARCHAR(100) NOT NULL,
	tipoPet VARCHAR(100) NOT NULL,
	descricao VARCHAR(50) NOT NULL,
    local VARCHAR(11) NOT NULL,
    dtAbertura VARCHAR(20) NOT NULL,
    concluido BOOLEAN,
    dtConclusao VARCHAR(20)
);

#Criar tabala de adocão
CREATE TABLE adocao(
	id_adocao INT AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	tipoPet VARCHAR(100) NOT NULL,
	descricao VARCHAR(50) NOT NULL,
    contato VARCHAR(50)
);

#Adicionar coluna para guardarchave estrangeira. Adicionar relação
alter table chamados add column id_usuario_chamado int;
alter table chamados add foreign key(id_usuario_chamado) references usuarios(id_usuario);

#Adicionar coluna para guardarchave estrangeira. Adicionar relação
alter table adocao add column id_usuario_adocao int;
alter table adocao add foreign key(id_usuario_adocao) references usuarios(id_usuario);
```

## Integração com outros serviços 

A SavePet foi desenvolvida tendo em mente a integração com serviços que possibilitam a autenticação em duas etapas. Os _tokens_ de recuperação de senha e de exclusão de conta devem ser enviados para o usuário através de um canal que podemos assumir ser seguro.

![Resposta do servidor contendo um _token_ de recuperação de senha](./readme-imgs/integracao_token.png)<br>
Acima um exemplo de resposta contendo um token de recuperação de senha. O código neste repositório envia o token diretamente na resposta, o que é uma falha crítica de segurança. Quando for colocar essa API em produção, siga os passos descritos em [integrar a API com autenticação em duas etapas.](#integrar-api-com-autenticação-em-duas-etapas)

Essa estratégia de autenticação parte do pressuposto que o email e/ou número de telefone do usuário são confiáveis. Com esse princípio estabelecido, a abordagem mais direta é integrar o sistema com APIs que enviam mensagens, seja por email, SMS ou através de aplicativos como o WhatsApp.

Existem centenas de serviços com os mais variados preços, dependendo do volume de mensagens e por onde elas são enviadas. Uma boa opção gratuita é o [SendGrid](https://sendgrid.com/), que possui planos gratuitos que atendem confortavelmente aplicações pequenas.

## Quickstart 

### 1. Obter o código

- Faça um _fork_ e um clone desse repositório para executar o código localmente. Mais informações sobre esse processo [aqui](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### 2. Instalar dependências

- Caso não tenha o Node.js, faça o download [aqui](https://nodejs.org/en/) e instale.
- Da mesma forma, baixe e instale o [MySQL](https://dev.mysql.com/downloads/installer/), caso não o tenha.
- Abra o CLI do Node.js e navegue até a pasta do projeto OU abra o terminal integrado do seu editor de código favorito na pasta do projeto.
- Execute o comando `npm install`.

### 3. Iniciar a API no modo desenvolvimento

- Considerações sobre o funcionamento da API

    - Sugerimos que o processo de desenvolvimento da API seja feito com a ajuda do [nodemon](https://www.npmjs.com/package/nodemon), por isso ele está na lista das dependências instaladas.

    - A API SavePet pode ser iniciada em dois modos: produção ou desenvolvimento. Isso afeta como as respostas são enviadas para o usuário. Mais informações em [_error handling_ em desenvolvimento](#error-handling-em-desenvolvimento).

    - Os scripts para iniciar a API em cada um dos modos são:

    ```json
        "scripts": {
            "start": "node server",
            "start:prod": "set NODE_ENV=production & nodemon server.js",
            "start:dev": "set NODE_ENV=development & nodemon server.js"
        },
    ```

- Ainda na pasta do projeto, execute o comando `npm run start:dev`.

- A API estará agora rodando no modo desenvolvimento.

- Os modelos do banco de dados estão configurados para gerar as tabelas automaticamente.

- Sugerimos a utilização do [Workbench](https://dev.mysql.com/downloads/workbench/) para manipular o banco de dados.

### 4. Testar os _endpoints_ e o banco de dados

- Sugerimos o uso do [Postman](https://www.postman.com/downloads/) para a testagem das rotas.

- No Postman, defina um ambiente com duas variáveis:
    - URL: o endereço do seu `localhost`;
    - jwt: em branco (as rotas de autenticação irão editar essa variável dinamicamente).

    ![Captura de tela das variáveis de ambiente no Postman](./readme-imgs/postman_environment.png)

- A pasta `postman` possui dois arquivos no formato JSON com _requests_ pré-configurados, basta importá-los dentro do Postman.

- Teste os endpoints.

### 5. Integrar a API com autenticação em duas etapas

- Escolha um serviço que atenda ao seu caso de uso e se familiarize com a documentação. Recomendamos o [SendGrid](https://sendgrid.com/).

- A integração com o serviço externo será feita no arquivo `./controllers/authController.js`.

- Alteração de senha:
    - A função responsável por gerar a solicitação é a `resetPasswordRequest()` (linha 169).
    - Insira o código referente à conexão com o _endpoint_ do serviço de mensagem abaixo da linha 198, enviando a variável `changeToken`, que é o _token_ de troca.
    - Encapsule o código de conexão em um bloco `try / catch` e certifique-se que eventuais erros são manipulados corretamente.
    - Na resposta, `res.status(201)...` (originalmente na linha 199), retire o changeToken do corpo da resposta.

- Encerramento da conta:
    - Da mesma forma que na alteração de senha, identifique a função de geração do _token_ para exclusão de conta: `deleteAccountRequest()`, linha 258.
    - Insira o código da API externa abaixo da linha 281.
    - Encapsule o código e confira o manuseio de erros.
    - Na resposta, originalmente na linha 282, remova o `deleteToken` do corpo.

- Boas práticas no envio de mensagens:
    - Devido à quantidade imensa de _spam_, emails maliciosos e outros tipo de lixo eletrônico, as ferramentas de comunicação modernas possuem sistemas robustos que tentam diminuir esse problema.
    - Por esse motivo é necessário seguir boas práticas para que a sua mensagem chegue no destinatário. [Aqui](https://sendgrid.com/blog/10-tips-to-keep-email-out-of-the-spam-folder/) estão algumas sugestões de boas práticas para envio de emails.
    - Existem sites que permitem que você teste o quão "_spam_" o seu email parece. Um deles é o [UnSpam](https://unspam.email/).

### 6. Deploy da aplicação

- Após testar a aplicação no modo desenvolvimento E no modo produção, é hora de colocá-la na internet.

- Dos milhares de serviços de hospedagem da internet, pagos ou gratuitos, a plataforma [Heroku](https://www.heroku.com/) é uma opção excelente para aplicações pequenas. O modo gratuito tem limitações, como por exemplo suspender a aplicação caso não ocorra nenhum acesso durante um certo período e o tempo de _cold start_ pode chegar a 20 segundos.

- O Heroku é totalmente compatível com aplicações Node e o _deploy_ pode ser feito via Git. Informações detalhadas [aqui](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).

## Endpoints 

Caso esteja usando Postman, pegue os arquivos das rotas pré-configuardos [aqui](https://github.com/LrLamonier/save-pet/tree/main/postman).

### _Endpoints_ de usuários

#### Criar conta

```html
POST /usuario/signup
```

Parâmetros obrigatórios: `nome`, `email`, `tel_contato`, `cpf` OU `cnpj`, `password`, `confirmPassword`.

É obrigatório enviar um CPF ou um CNPJ. O pedido retornará um erro se nenhum dos dois foi enviado ou se os dois foram enviados.

Exemplo de _request_:

```json
{
    "nome": "Lucas",
    "email": "lucas@lucas.com",
    "tel_contato": "12345678",
    "cpf": "756.772.451-00",
    "password": "12345678",
    "confirmPassword": "12345678"
}
```
\* O número de CPF do exemplo não existe, foi gerado para testagem.

Exemplo de _response_:

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzOTYwNzIzLCJleHAiOjE2NjQ4MjQ3MjN9.oTth3stMNf0VJmmnzv9WY3sCpRIYmvTr94WFj1I1TBU",
    "data": {
        "resUser": {
            "name": "Lucas Lamonier",
            "email": "lucas@lucas.com"
        }
    }
}
```

#### Login

```html
POST /usuario/login
```

Parâmetros obrigatórios: `email`, `password`.

Exemplo de _request_:

```json
{
    "email": "lucas@lucas.com",
    "password": "12345678"
}
```

Exemplo de _response_:

```html
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzOTYwNzIzLCJleHAiOjE2NjQ4MjQ3MjN9.oTth3stMNf0VJmmnzv9WY3sCpRIYmvTr94WFj1I1TBU",
    "data": {
        "resUser": {
            "name": "Lucas Lamonier",
            "email": "lucas@lucas.com"
        }
    }
}
```

#### Logout

```html
POST /usuario/logout
```

Nenhum parâmetro é necessário. Simplesmente fazer um pedido GET.

Exemplo de _response_:

```json
{
    "status": "success"
}
```

#### Alterar cadastro (requer JWT válido)

```html
PATCH /usuario/profile
```

Parâmetros opcionais: `nome`, `contato`

Exemplo _request_:

```json
{
    "nome": "Gabriel",
    "contato": "987654321"
}
```

Exemplo de _response_:

```json
{
    "status": "success",
    "usuario": {
        "nome": "Gabriel",
        "contato": "987654321"
    }
}
```

#### Solicitar deleção da conta (requer JWT válido)

```http
POST /usuario/deletar-conta
```

Parâmetro obrigátorio: `password`

Mesmo estando autenticado, o  usuário precisa inserir a senha. Em caso de vazamento do JWT, usuários maliciosos não são capazes de solicitar a deleção da senha.

Exemplo de _request_:

```json
{
    "password": "12345678"
}
```

Exemplo de _response_:
```json
{
    "status": "success",
    "deleteToken": "505b113162691459e3ab775a960dbc3c8130f578fd837db4aa95d79872fdb204"
}
```

\* Em produção, o _token_ não seria retornado na _response_, ao invés disso, seria encaminhado via email ou por telefone.

#### Deletar conta

```http
DELETE /usuario/deletar-conta
```

Nenhum parâmetro é necessário.

Parâmetro obrigatório: `deleteToken`

Exemplo de _request_:

```json
{
    "status": "success",
    "message": "Conta deletada com sucesso!"
}
```

Exemplo de _response_:

```json
{
    "status": "success",
    "message": "Conta deletada com sucesso!"
}
```

#### Solicitar alteração de senha

```http
POST /usuario/esqueci-senha
```

Parâmetro obrigatório: `email`

Exemplo de _request_:

```json
{
    "email": "lucas@lucas.com"
}
```

Exemplo de _response_:

```json
{
    "status": "success",
    "message": "Um email para recuperação da senha foi enviado para este email, caso ele esteja cadastrado. O token é válido por 10 minutos.",
    "changeToken": "1ff4f0d09b14817c818da3a90a6516448c0428fea59ef3e63920e028bba2af13"
}
```

\* Assim como no pedido de deleção de conta, o _token_, em produção, não seria enviado na resposta.

#### Alterar senha

```http
POST /usuario/esqueci-senha
```

#### Ver meu perfil (requer JWT válido)

```http
GET /usuario/profile
```

Nenhum parâmetro necessário.

Exemplo de _response_:

```json
{
    "nome": "Lucas",
    "email": "lucas@lucas.com",
    "contato": "12345678",
    "id": {
        "cpf": "75677245100"
    }
}
```

#### Ver todos os usuários (requer JWT válido de um usuário do tipo administrador)

```html
GET /usuario/lista-contas
```

Nenhum parâmetro é necessário.

Exemplo de _response_:

```json
{
    "status": "success",
    "data": [
        {
            "id_usuario": 3,
            "nome": "Lucas",
            "email": "lucas@lucas.com",
            "contato": "12345678",
            "cpf": "75677245100",
            "cnpj": null,
            "isAdmin": null
        },
        {
            "id_usuario": 4,
            "nome": "Thaís",
            "email": "thais@thais.com",
            "contato": "12345678",
            "cpf": null,
            "cnpj": "87381182000176",
            "isAdmin": null
        },
        ...
}
 ```

#### Procurar usuário pelo ID

```http
GET /usuario/u/<ID do usuário>
```

O parâmetro necessário é a ID, que deve ser colocada no endereço do _request_.

Exemplo de _request_:

```html
/usuario/u/3
```

Exemplo de _response_:

```json
{
    "nome": "Lucas",
    "email": "lucaslucas@lucas.com",
    "contato": "12345678"
}
```

### _Endpoints_ de chamados

#### Criar novo chamado (requer JWT válido)

```http
POST /chamados/meus-chamados
```

Parâmetros obrigatórios: `titulo`, `tipoPet`, `descricao`, `local`

O parâmetro `local` deve seguir o padrão internacional WGS com no mínimo 5 casas decimais. Mais detalhes na sessão de [funcionalidades](#criação-atualização-e-finalização-de-chamados).

Exemplo de _request_:

```json
{
    "titulo": "Cachorro na rua São Jorge",
    "tipoPet": "Cachorro",
    "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
    "local": "-16.719490527908334, -49.19679150458935"
}
```

Exemplo de _response_:

```json
{
    "data": {
        "id_chamado": 10,
        "titulo": "Cachorro na rua São Jorge",
        "tipoPet": "Cachorro",
        "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
        "local": "-16.719490527908334,-49.19679150458935",
        "dtAbertura": 1663964102152,
        "id_usuario_chamado": 9
    }
}
```

\* Ao objeto do novo chamado é adicionado a _timestamp_ de criação e a ID do usuário que o criou.

#### Editar chamado (requer JWT válido do usuário que criou o chamado ou de um administrador)

```http
PATCH /chamados/meus-chamados
```

Parâmetro obrigatório: `id_chamado`
Parâmetros opcionais: `titulo`, `tipoPet`, `descricao`, `local`

Exemplo _request_:

```json
{
    "id_chamado": "11",
    "descricao": "Gato preto avistado na rua São Jorge."
}
```

Exemplo de _response_:

```json
{
    "status": "success",
    "chamadoAtualizado": {
        "descricao": "Gato preto avistado na rua São Jorge."
    }
}
```

#### Deletar chamado (requer JWT válido do usuário que criou o chamado ou de um administrador)

```http
DELETE /chamados/meus-chamados
```

Parâmetro obrigatório: `id_chamado`

Exemplo de _request_:

```json
{
    "id_chamado": "8"
}
```

Exemplo de _response_:

```json
{
    "status": "success",
    "message": "Chamado deletado com sucesso!"
}
```

#### Buscar chamados por ID de usuário

```html
GET /usuario/chamados/usuario/<ID do usuário>
```

Parâmetro obrigatório: ID do usuário inserida diretamente na URL.

Exemplo de _request_:

```html
/usuario/usuario/9
```

Exemplo de _response_:

```json
{
    "status": "success",
    "results": 1,
    "chamados": [
        {
            "id_chamado": 10,
            "titulo": "Cachorro na rua São Jorge",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.719490527908334,-49.19679150458935",
            "dtAbertura": "1663964102152",
            "concluido": false,
            "dtConclusao": null,
            "id_usuario_chamado": 9
        }
    ]
}
```

#### Buscar todos os chamados

```html
GET /chamados
```

A rota para buscar todos os chamados possui um parâmetro opcional que indica a localização do usuário. Quando esse parâmetro é incluído no _request_, os resultados são ordenados por menor distância entre o chamado e o usuário.

A localização do usuário deve ser passada via _query string_ no [padrão WGS](#criação-atualização-e-finalização-de-chamados) com, no mínimo, 5 casas decimais:

```html
GET /chamados?loc=<Coordenadas do usuário>
```

Caso as coordenadas passadas na _query string_ não sejam válidas, a ordenação padrão será retornada.

Exemplo de _request_:

```html
GET /chamados?loc=-16.68087323800827, -49.2556861602635
```

Exemplo de _response_ sem coordenadas ou com coordenadas inválidas:

```json
{
    "status": "success",
    "results": 3,
    "chamados": [
        {
            "id_chamado": 1,
            "titulo": "Distância 3",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.75040632267,-49.127321257264015",
            "dtAbertura": "1663964864085",
            "concluido": false,
            "dtConclusao": null,
            "id_usuario_chamado": 9
        },
        {
            "id_chamado": 2,
            "titulo": "Distância 1",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.712924528453627,-49.2162418455575",
            "dtAbertura": "1663964886416",
            "concluido": false,
            "dtConclusao": null,
            "id_usuario_chamado": 9
        },
        {
            "id_chamado": 3,
            "titulo": "Distância 2",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.721473656575146,-49.18705941310598",
            "dtAbertura": "1663964906160",
            "concluido": false,
            "dtConclusao": null,
            "id_usuario_chamado": 9
        }
    ]
}
```

Exemplo com coordenadas (os títulos se referem à distância, 1 para menor, 3 para maior):

```json
{
    "status": "success",
    "results": 3,
    "chamados": [
        {
            "id_chamado": 2,
            "titulo": "Distância 1",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.712924528453627,-49.2162418455575",
            "id_usuario_chamado": 9,
            "distancia": 5.51
        },
        {
            "id_chamado": 3,
            "titulo": "Distância 2",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.721473656575146,-49.18705941310598",
            "id_usuario_chamado": 9,
            "distancia": 8.59
        },
        {
            "id_chamado": 1,
            "titulo": "Distância 3",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.75040632267,-49.127321257264015",
            "id_usuario_chamado": 9,
            "distancia": 15.7
        }
    ]
}
```

#### Meus chamados (requer JWT válido)

```html
GET /chamados/meus-chamados
```

Nenhum parâmetro é necessário.

Exemplo _response_:

```json
{
    "status": "success",
    "results": 1,
    "myEvents": [
        {
            "id_chamado": 1,
            "titulo": "Distância 3",
            "tipoPet": "Cachorro",
            "descricao": "Cachorro preto de porte médio mancando avistado na rua São Jorge",
            "local": "-16.75040632267,-49.127321257264015",
            "dtAbertura": "1663964864085",
            "concluido": false,
            "dtConclusao": null,
            "id_usuario_chamado": 9
        }
}
```

<<<<<<< HEAD
## Equipe 
- ``Lucas Lamonier (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/Llpampolha/)
- ``Lucas Pampolha (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in/) ou [Github](https://github.com/lpampolha) 
- ``Vando Rocha (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/Vandorc-Dev)
- ``Gisele Souza (Back-end | JavaScript | NodeJS | ExpressJS)`` [Linkedin](https://www.linkedin.com/in//) ou [Github](https://github.com/giselessouza)

Instrutor:
- `` Jenifer Placido `` 
=======
[Voltar para o topo](#conteúdo)
>>>>>>> 2eaeb63825fcf242e24b160266ef78089b080359
