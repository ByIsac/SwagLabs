# language: pt

Funcionalidade: Cadastro

Cenário: CT001: Cadastrando usuário

Dado de que o usuário esteja na página de identificação
Quando preencher o campo "Email"
E preencher o campo senha com uma senha
E clicar no botão "Registar"
Então o sistema tem que levar o usuáro até a página inicial