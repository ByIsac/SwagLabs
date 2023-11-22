# language: pt

Funcionalidade: Login de usuário

Cenário: CT001: Logando no sistema com um usuário válido

Dado de que o usuário esteja na página de identificação
Quando preencher o campo "Email" nas credenciais de login
E preencher o campo senha com uma senha válida
E clicar no botão "login"
Então o sistema tem que levar o usuáro até a página inicial