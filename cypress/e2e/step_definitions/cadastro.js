import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

When ('preencher o campo "Email"',() => {
    cy.get('#reg_email').click().type('heitor3@teste.com')
 })

 When ('preencher o campo senha com uma senha',() => {
    cy.get('#reg_password').click().type('Teste.heitor')
 })

 When ('clicar no botão "Registar"',() => {
    cy.get('p input[value=Register]').dblclick({force: true})
 })

 When ('preencher o campo "Email" com um e-mail já existente no sistema',() => {
    cy.get('#reg_email').click().type('teste@gmail.com')
 })

 When ('o sistema deve mostrar uma mensagem informando "Error: An account is already registered with your email address. Please login."',() => {
    cy.get('li strong').should('have.text', 'Error:')
    cy.get('ul[class="woocommerce-error"] li').should('have.text', 'An account is already registered with your email address. Please login.')
 })