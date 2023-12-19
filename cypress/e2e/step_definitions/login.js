import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import {loginpage} from "../../pages/login";

Given ('de que o usuário esteja na página de identificação',() => {
   loginpage.VisitSite()
})

When ('preencher o campo "Email" nas credenciais de login',() => {
  loginpage.EmailLogin()
})

When ('preencher o campo senha com uma senha válida',() => {
   loginpage.vPasswordLogin()
})

When ('preencher o campo senha com uma senha inválida',() => {
   loginpage.iPasswordLogin()
})

When ('clicar no botão "login"',() => {
   loginpage.BottonLogin()
})

Then ('o sistema tem que levar o usuáro até a página inicial', () => {
   loginpage.HomepageLogin()
})
Then ('o sistema envia uma mensagem informando que as credenciais estão incorretas', () => {
   loginpage.IncorrectPasswordLogin()
})
