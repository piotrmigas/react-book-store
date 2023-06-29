describe('cart', () => {
  it('add product to the cart', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.contains('.MuiBadge-badge', 1);
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.contains('td', 'Matematyka');
  });

  it('remove product from cart', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="RemoveIcon"]').click();
    cy.contains('p', 'Twój koszyk jest pusty!');
  });

  it('increase quantity', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="AddIcon"]').click();
    cy.contains('[data-testid="amount"]', 2);
  });

  it('decrease quantity', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.get('[data-testid="RemoveIcon"]').click();
    cy.contains('[data-testid="amount"]', 1);
  });

  it('proceed to summary', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.contains('button', 'Dalej').click();
    cy.contains('p', 'Podsumowanie');
    cy.get('form');
  });
});

describe('summary', () => {
  it('sends order', () => {
    cy.visit('/');
    cy.contains('button', 'Dodaj do koszyka').click();
    cy.get('[data-testid="ShoppingBasketIcon"]').click();
    cy.contains('button', 'Dalej').click();
    cy.get('input[name="first_name"]').type('John');
    cy.get('input[name="last_name"]').type('McGee');
    cy.get('input[name="city"]').type('Kraków');
    cy.get('input[name="zip_code"]').type('30-560');
    cy.contains('button', 'Zamawiam i płacę').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('McGee');
    });
  });
});
