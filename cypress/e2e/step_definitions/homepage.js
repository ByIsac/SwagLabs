import {Given,Then, When} from "@badeball/cypress-cucumber-preprocessor"

Given ('de que o usuário faça login',() =>{
    cy.visit('https://practice.automationtesting.in/my-account/')
    cy.get('#username').click().type('isac@teste.com')
    cy.get('#password').click().type('Senha@123')
    cy.get('p input[value=Login]').click()

})

When('entrar na página homepage',()=>{
    cy.get('li a').contains('Logout').should('be.visible')
})

Then('o sistema deve exibir no corpo da páginas as opções {string}',(opção) =>{

    switch(opção){
        case 'Dashboard':
            return cy.get('ul  li[class*="wo"] a').eq(0).should('have.text', 'Dashboard')
        case 'Orders':
            return cy.get('ul  li[class*="wo"] a').eq(1).should('have.text', 'Orders')
        case 'Downloads':
            return cy.get('ul  li[class*="wo"] a').eq(2).should('have.text', 'Downloads')
        case 'Addresses':
            return cy.get('ul  li[class*="wo"] a').eq(3).should('have.text', 'Addresses')
        case 'Account Details':
            return cy.get('ul  li[class*="wo"] a').eq(4).should('have.text', 'Account Details')
        case 'Logout':
            return cy.get('ul  li[class*="wo"] a').eq(5).should('have.text', 'Logout')
        
    }



})