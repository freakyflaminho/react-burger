Cypress.Commands.add('openIngredientModal', (item) => {
  cy.get(item).click();
  cy.get('[data-test="modal"]').as('modal');
});

Cypress.Commands.add('dragAndDropItem', (item, container) => {
  cy.get(item).trigger('dragstart');
  cy.get(container).trigger('drop');
});

Cypress.Commands.add('removeItemFromConstructor', (index) => {
  cy.get('@constructorContainer').get('.constructor-element__action').eq(index).click();
});

Cypress.Commands.add('getItemsWithText', (container, text) => {
  return cy.get(container).find(`>:contains(${text})`);
});

Cypress.Commands.add('findItemWithClass', (item, cls) => {
  return cy.get(item).find(`[class^=${cls}]`);
});
