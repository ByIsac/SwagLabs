import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

When ('preencher o campo "Email"',() => {
    cy.get('#reg_email').click().type('heitor3@teste.com')
 })

 When ('preencher o campo senha com uma senha',() => {
    cy.get('#reg_password').click().type('Teste.heitor')
 })

 When ('clicar no botão "Registar"',() => {
    cy.get('p input[value=Register]').click({force: true})
 })