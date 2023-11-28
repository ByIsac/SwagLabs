# language: pt

Funcionalidade: Cadastro

Cenário: CT001: Cadastrando usuário

Dado de que o usuário esteja na página de identificação
Quando preencher o campo "Email"
E preencher o campo senha com uma senha
E clicar no botão "Registar"
Então o sistema tem que levar o usuáro até a página inicial



Cenário: CT002: Tentando cadastrar um usuário com um email existente

Dado de que o usuário esteja na página de identificação
Quando preencher o campo "Email" com um e-mail já existente no sistema
E preencher o campo senha com uma senha
E clicar no botão "Registar"
Então o sistema deve mostrar uma mensagem informando "Error: An account is already registered with your email address. Please login."
