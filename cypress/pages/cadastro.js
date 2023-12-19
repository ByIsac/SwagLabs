const cadastropage = {

        registerEmail(){
            cy.get('#reg_email').click().type(fakerbr.internet.email())
        }

}

export default cadastropage;