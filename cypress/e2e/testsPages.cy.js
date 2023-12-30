describe('Chargement de l\'application', () => {
    it('Doit se charger correctement', () => {
        // Visitez l'URL de votre application à tester
        cy.visit('http://localhost:4000')

        // Vérifiez un élément spécifique pour confirmer que l'application s'est chargée
        cy.get('.usernames').should('exist')
    })
})

describe('Vérification de la saisie d\'un mot après avoir cliqué sur "lancer une partie"', () => {
    it('Doit afficher un champ pour saisir un mot', () => {
        cy.visit('http://localhost:4000/game')
        // Vérifiez si un champ d'entrée de mot est présent après avoir cliqué sur le bouton
        cy.get('.grid').should('exist')
    })
})

describe('Vérification de l\'existance d\'une page de defaite', () => {
    it('Doit afficher la page de defaite', () => {
        cy.visit('http://localhost:4000/game')
        // Vérifiez si un champ d'entrée de mot est présent après avoir cliqué sur le bouton
        cy.get('.givup').click()
        cy.get('.content').should('be.visible')
    })
})


describe('Page d\'historique visible', () => {
    it('Doit se charger correctement', () => {
        // Visitez l'URL de votre application à tester
        cy.visit('http://localhost:4000/history')

        // Vérifiez un élément spécifique pour confirmer que l'application s'est chargée
        cy.get('.givup').should('exist')
    })
})

