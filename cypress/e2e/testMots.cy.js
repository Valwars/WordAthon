describe('Appui successif de "Z" cinq fois puis simulation de la touche "Enter"', () => {
  it('Doit appuyer cinq fois sur "Z" puis simuler la touche "Enter" du clavier', () => {
    cy.visit('http://localhost:4000/game')

    // Répéter l'appui sur 'Z' cinq fois
    for (let i = 0; i < 5; i++) {
      cy.get('.keyboard .key[name="Z"]').click() // Cliquer sur la touche 'Z'
      cy.wait(50) // Attendre un court instant entre chaque appui sur la touche 'Z'
    }

    // Simuler la touche "Enter" du clavier
    cy.get('body').type('{enter}') // Simuler la touche "Enter" sur l'élément body
    cy.wait(100)
    cy.get('.message').should('be.visible').contains('Mot invalide.')
  })
})

describe('Appuyer sur J A N T E S et voir si le mot est valide', () => {
  it('Doit appuyer sur J A N T E S puis simuler la touche "Enter" du clavier et passer a la ligne suivante', () => {
    cy.visit('http://localhost:4000/game')


    cy.get('.keyboard .key[name="J"]').click() // Cliquer sur la touche 'J'
    cy.wait(50) // Attendre un court instant entre chaque appui sur la touche 'Z'
    cy.get('.keyboard .key[name="A"]').click()
    cy.wait(50)
    cy.get('.keyboard .key[name="N"]').click()
    cy.wait(50)
    cy.get('.keyboard .key[name="T"]').click()
    cy.wait(50)
    cy.get('.keyboard .key[name="E"]').click()
    cy.wait(50)


    // Simuler la touche "Enter" du clavier
    cy.get('body').type('{enter}') // Simuler la touche "Enter" sur l'élément body
    cy.get('.message').should('not.exist')
  })
})