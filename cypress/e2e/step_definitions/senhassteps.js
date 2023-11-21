import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Then('preenche usuário e senha válidos', ()=>{

    const user = {
        username: 'isac@mail.com',
        password: 'Teste@123'
    }
    
    cy.get('.style__ContainerFormLogin-sc-1wbjw6k-0 > :nth-child(1) > .input__default').click().type(user.username);
    cy.get('.style__ContainerFormLogin-sc-1wbjw6k-0 > .login__password > .style__ContainerFieldInput-sc-s3e9ea-0 > .input__default').click().type(user.password);
    cy.get('.otUnI').click();
})