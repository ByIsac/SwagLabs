import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('de que o usuário está na tela de login', () => {
   cy.visit('https://practice.automationtesting.in/my-account/');
})

