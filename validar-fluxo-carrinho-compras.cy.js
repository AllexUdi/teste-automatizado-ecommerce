/// <reference types = "Cypress"/>

describe('Teste E2E - fluxo carrinho de compras', () => {
    it('login com sucesso', () => {
        
        //visitar a página
        cy.visit('https://www.saucedemo.com/v1/')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
        cy.get('.product_label').should('contain','Products');
        
        //ordenar produtos do menor para o maior preço
        cy.get('.product_sort_container').select('Price (low to high)')

        cy.get(':nth-child(1) > .inventory_item_label').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_label').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > .inventory_item_label').should('contain','Sauce Labs Bolt T-Shirt')

        //selecionar produto
        cy.get(':nth-child(1) > .pricebar > .btn_primary').click()
        cy.get(':nth-child(2) > .pricebar > .btn_primary').click()
        cy.get(':nth-child(3) > .pricebar > .btn_primary').click()

        //validar quantidade de produtos
       // cy.get('.fa-layers-counter').click()
       // cy.get('.fa-layers-counter').should('have.text','3')
       cy.get('.fa-layers-counter').should('have.text','3')

        //clicar no carrinho
        cy.get('.fa-layers-counter').click()

        //validar produtos
        cy.get(':nth-child(3) > .cart_item_label').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(4) > .cart_item_label').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(5) > .cart_item_label').should('contain','Sauce Labs Bolt T-Shirt')

        //botão check-out
        cy.get('.btn_action').click()

        //validar página de check-out
        cy.get('.subheader').should('contain','Checkout: Your Information')

        //preencher campos
        cy.get('[data-test="firstName"]').type('Alex')
        cy.get('[data-test="lastName"]').type('Cabral')
        cy.get('[data-test="postalCode"]').type('3800000')

        cy.get('.btn_primary').click()

        //Clicar em check-out
        cy.get('.subheader').should('contain','Checkout: Overview')

        //validar produtos
        cy.get(':nth-child(3) > .cart_item_label').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(4) > .cart_item_label').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(5) > .cart_item_label').should('contain','Sauce Labs Bolt T-Shirt')

        //validar total
        cy.get('.summary_total_label').should('contain','Total: $36.69')

        //finalizar
        cy.get('.btn_action').click()

        cy.get('.complete-header').should('contain','THANK YOU FOR YOUR ORDER')
       

    });


  })
