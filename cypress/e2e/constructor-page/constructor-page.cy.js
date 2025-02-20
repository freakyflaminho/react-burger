describe('test constructor-page', () => {
  beforeEach(() => {
    cy.visit('/');
    window.localStorage.setItem('accessToken', 'accessToken');

    cy.intercept('GET', Cypress.env('get_ingredients_url'), { fixture: 'ingredients.json' });
    cy.intercept('POST', Cypress.env('create_order_url'), { fixture: 'order.json' });
    cy.fixture('ingredients.json').as('ingredients');
    cy.fixture('order.json').as('order');

    cy.get('[data-test="ingredients-container"]').as('ingredientsContainer');
    cy.get('[data-test="constructor-container"]').as('constructorContainer');
    cy.get('[data-test="create-order"]').as('createOrder');
    cy.get('[data-test="total-price"]').as('totalPrice');
    cy.get('[data-testid="bun1"]').as('bun1');
    cy.get('[data-testid="bun2"]').as('bun2');
    cy.get('[data-testid="main1"]').as('main1');
    cy.get('[data-testid="sauce1"]').as('sauce1');
  });

  it('should open constructor page', () => {
    cy.get('@ingredientsContainer').should('be.visible');
    cy.get('@constructorContainer').should('be.visible');
  });

  it('should open ingredient card', () => {
    cy.openIngredientModal('@main1');
    cy.get('@modal').should('be.visible');
    cy.get('@ingredients').then((ingredients) => {
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.get('@modal').contains(main1.name).should('exist');
    });
  });

  it('should close ingredient card on close button click', () => {
    cy.openIngredientModal('@main1');
    cy.get('[data-test="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('should close ingredient card on ESC press', () => {
    cy.openIngredientModal('@main1');
    cy.get('body').type('{esc}');
    cy.get('@modal').should('not.exist');
  });

  it('should close ingredient card on modal overlay click', () => {
    cy.openIngredientModal('@main1');
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('@modal').should('not.exist');
  });

  it('should drag and drop bun correctly', () => {
    cy.dragAndDropItem('@bun1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun1 = ingredients.data.find(ingredient => ingredient._id === 'bun1');
      cy.get('@constructorContainer').find(`>:contains(${bun1.name})`).should('have.length', 2);
      cy.getItemsWithText('@constructorContainer', bun1.name).should('have.length', 2);
    });
    cy.findItemWithClass('@bun1', 'counter').contains(2);
  });

  it('should replace chosen bun correctly', () => {
    cy.dragAndDropItem('@bun1', '@constructorContainer');
    cy.dragAndDropItem('@bun2', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun1 = ingredients.data.find(ingredient => ingredient._id === 'bun1');
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      cy.getItemsWithText('@constructorContainer', bun1.name).should('not.exist');
      cy.getItemsWithText('@constructorContainer', bun2.name).should('have.length', 2);
    });
    cy.findItemWithClass('@bun1', 'counter').should('not.exist');
    cy.findItemWithClass('@bun2', 'counter').contains(2);
  });

  it('should drag and drop main and sauce', () => {
    cy.dragAndDropItem('@sauce1', '@constructorContainer');
    cy.dragAndDropItem('@main1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const sauce1 = ingredients.data.find(ingredient => ingredient._id === 'sauce1');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.getItemsWithText('@constructorContainer', sauce1.name).should('have.length', 1);
      cy.getItemsWithText('@constructorContainer', main1.name).should('have.length', 1);
    });
    cy.findItemWithClass('@sauce1', 'counter').contains(1);
    cy.findItemWithClass('@main1', 'counter').contains(1);
  });
  //
  it('should delete ingredients', () => {
    cy.dragAndDropItem('@sauce1', '@constructorContainer');
    cy.dragAndDropItem('@main1', '@constructorContainer');

    cy.get('@constructorContainer').get('.constructor-element__action').first().click();
    cy.get('@ingredients').then((ingredients) => {
      const sauce1 = ingredients.data.find(ingredient => ingredient._id === 'sauce1');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.getItemsWithText('@constructorContainer', sauce1.name).should('not.exist');
      cy.getItemsWithText('@constructorContainer', main1.name).should('have.length', 1);
    });

    cy.get('@constructorContainer').get('.constructor-element__action').first().click();
    cy.get('@ingredients').then((ingredients) => {
      const sauce1 = ingredients.data.find(ingredient => ingredient._id === 'sauce1');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.getItemsWithText('@constructorContainer', sauce1.name).should('not.exist');
      cy.getItemsWithText('@constructorContainer', main1.name).should('not.exist');
    });
  });

  it('should enable and disable order button', () => {
    cy.get('@createOrder').should('have.attr', 'disabled');

    cy.dragAndDropItem('@bun1', '@constructorContainer');
    cy.get('@createOrder').should('have.attr', 'disabled');

    cy.dragAndDropItem('@main1', '@constructorContainer');
    cy.get('@createOrder').should('not.have.attr', 'disabled');

    cy.dragAndDropItem('@sauce1', '@constructorContainer');
    cy.get('@createOrder').should('not.have.attr', 'disabled');

    cy.removeItemFromConstructor(1);
    cy.get('@createOrder').should('not.have.attr', 'disabled');

    cy.removeItemFromConstructor(1);
    cy.get('@createOrder').should('have.attr', 'disabled');
  });

  it('should calculate total price', () => {
    cy.dragAndDropItem('@bun1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun1 = ingredients.data.find(ingredient => ingredient._id === 'bun1');
      cy.get('@totalPrice').should('contain.text', bun1.price * 2);
    });

    cy.dragAndDropItem('@bun2', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      cy.get('@totalPrice').should('contain.text', bun2.price * 2);
    });

    cy.dragAndDropItem('@main1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.get('@totalPrice').should('contain.text', bun2.price * 2 + main1.price);
    });

    cy.dragAndDropItem('@main1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      cy.get('@totalPrice').should('contain.text', bun2.price * 2 + main1.price * 2);
    });

    cy.dragAndDropItem('@sauce1', '@constructorContainer');
    cy.get('@ingredients').then((ingredients) => {
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      const sauce1 = ingredients.data.find(ingredient => ingredient._id === 'sauce1');
      cy.get('@totalPrice').should('contain.text', bun2.price * 2 + main1.price * 2 + sauce1.price);
    });

    cy.removeItemFromConstructor(1);
    cy.get('@ingredients').then((ingredients) => {
      const bun2 = ingredients.data.find(ingredient => ingredient._id === 'bun2');
      const main1 = ingredients.data.find(ingredient => ingredient._id === 'main1');
      const sauce1 = ingredients.data.find(ingredient => ingredient._id === 'sauce1');
      cy.get('@totalPrice').should('contain.text', bun2.price * 2 + main1.price + sauce1.price);
    });
  });

  it('should create order', () => {
    cy.dragAndDropItem('@bun1', '@constructorContainer');
    cy.dragAndDropItem('@sauce1', '@constructorContainer');
    cy.get('@createOrder').click();
    cy.get('[data-test="modal"]').as('modal');

    cy.get('@modal').should('be.visible');
    cy.get('@order').then(order => {
      cy.get('@modal').contains(order.order.number);
    });
  });
});
