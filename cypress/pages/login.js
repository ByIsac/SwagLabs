export class loginpage {

        EmailLogin(){
            cy.get('#username').click().type('isac@teste.com')
        }

        vPasswordLogin(){
            cy.get('#password').click().type('Senha@123')
        }

        iPasswordLogin(){
            cy.get('#password').click().type('Senha@1233')
        }

        BottonLogin(){
            cy.get('p input[value=Login]').click()
        }

        HomepageLogin(){
            cy.get('li a').contains('Logout').should('be.visible')
        }

        IncorrectPasswordLogin(){
            cy.get('.woocommerce-error li, .woocommerce-info li, .woocommerce-message li').should('be.visible')
        }

        VisitSite(){
            cy.visit('https://practice.automationtesting.in/my-account/')
        }

}