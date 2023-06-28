describe('cart', () => {
  it('add product to the cart', () => {
    cy.visit('http://localhost:5173');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.contains('.MuiBadge-badge', 1);
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.contains('td', 'Matematyka');
  });

  it('remove product from cart', () => {
    cy.visit('http://localhost:5173');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="RemoveIcon"]').click();
    cy.contains('p', 'Twój koszyk jest pusty!');
  });

  it('increase quantity', () => {
    cy.visit('http://localhost:5173');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="AddIcon"]').click();
    cy.contains('[data-testid="amount"]', 2);
  });

  it('decrease quantity', () => {
    cy.visit('http://localhost:5173');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="RemoveIcon"]').click();
    cy.contains('[data-testid="amount"]', 1);
  });

  it('proceed to summary', () => {
    cy.visit('http://localhost:5173');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.contains('button', 'Dalej').click();
    cy.contains('p', 'Podsumowanie');
    cy.get('form');
  });
});
