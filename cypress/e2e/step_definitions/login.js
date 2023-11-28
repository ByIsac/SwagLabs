import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('de que o usuário está na tela de login', () => {
   cy.visit('https://practice.automationtesting.in/my-account/');
})

Given ('de que o usuário esteja na página de identificação',() => {
   cy.visit('https://practice.automationtesting.in/my-account/')
})

When ('preencher o campo "Email" nas credenciais de login',() => {
   cy.get('#username').click().type('isac@teste.com')
})

When ('preencher o campo senha com uma senha válida',() => {
   cy.get('#password').click().type('Senha@123')
})

When ('preencher o campo senha com uma senha inválida',() => {
   cy.get('#password').click().type('Senha@1233')
})

When ('clicar no botão "login"',() => {
   cy.get('p input[value=Login]').click()
})

Then ('o sistema tem que levar o usuáro até a página inicial', () => {
   cy.get('li a').contains('Logout').should('be.visible')
})
Then ('o sistema envia uma mensagem informando que as credenciais estão incorretas', () => {
   cy.get('.woocommerce-error li, .woocommerce-info li, .woocommerce-message li').should('be.visible')
})
