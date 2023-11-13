import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('Acessar o site', () => {
   cy.visit('https://google.com');
})
