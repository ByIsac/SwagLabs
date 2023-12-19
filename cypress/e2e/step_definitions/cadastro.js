import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { cadastropage } from "../../pages/cadastro"

// const cadastro = new cadastropage ()

const fakerbr = require('faker-br')


When ('preencher o campo "Email"',() => {
   cadastropage.registerEmail()
 })

 When ('preencher o campo senha com uma senha',() => {
    cy.get('#reg_password').click().type('Super@@1234..llss')
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


 
 When ('o sistema deve mostrar uma mensagem informando "Error: An account is already registered with your email address. Please login."',() => {
   cy.get('li strong').should('have.text', 'Error:')
   cy.get('ul[class="woocommerce-error"] li').should('have.text', 'An account is already registered with your email address. Please login.')
})
