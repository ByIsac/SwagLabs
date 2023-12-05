# language: pt
@test

Funcionalidade: Homepage

Cenário: CT001 - Validar opções

Dado de que o usuário faça login
Quando entrar na página homepage
Então o sistema deve exibir no corpo da páginas as opções "<opções>"

Exemplos:
| Opções:          |
| Dashboard        |
| Orders           |
| Downloads        |
| Addresses        |
| Account Details  |
| Logout           |
