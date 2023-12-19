const loginpage = {

        EmailLogin(){
            cy.get('#username').click().type('isac@teste.com')
        },

        PasswordLogin(){
            cy.get('#password').click().type('Senha@123')
        }





}

export default loginpage;