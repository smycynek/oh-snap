// spec.js
describe('Startup and title test', () => {
  it('should have a title', () => {
    browser.get('http://localhost:8080/snap');

    expect(browser.getTitle()).toEqual('Oh, snap!');
  });
});

describe('Startup and add circles', () => {
  it('should be able to add circles', () => {
    browser.get('http://localhost:8080/snap');

    const addButton = element(by.id('addCircle'));
    addButton.click();
    addButton.click();
    addButton.click();
    addButton.click();
    addButton.click();
  });
});

describe('Startup and add lines range', () => {
  it('should be able to add lines', () => {
    browser.get('http://localhost:8080/snap');

    const addButton = element(by.id('addLine'));
    addButton.click();
    addButton.click();
    addButton.click();
    addButton.click();
    addButton.click();
  });
});

describe('Startup and set scope range', () => {
  it('should be able to set scope range', () => {
    browser.get('http://localhost:8080/snap');
    const rangeControl = element(by.id('snapRangeControl'));
    expect(rangeControl.getAttribute('value')).toEqual('20');
    browser.actions().mouseMove(rangeControl).mouseDown().mouseMove({ x: 1000, y: 0 })
      .mouseUp()
      .perform();
    expect(rangeControl.getAttribute('value')).toEqual('53');
  });
});
