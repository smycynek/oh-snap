// protractor tests
describe('Startup and title test', () => {
  it('should have a title', () => {
    browser.get('http://localhost:8080/snap');
    expect(browser.getTitle()).toEqual('Oh, snap!');
  });
});

describe('Startup and add test pattern', () => {
  it('should be able to add test pattern and find data', () => {
    browser.get('http://localhost:8080/snap');

    const addButton = element(by.id('addTest'));
    addButton.click();
    const lineArea = element(by.id('lineData'));

    lineArea.getAttribute('value').then((value) => {
      const data = JSON.parse(value);
      expect(data.length).toBe(3);
    });

    const circleArea = element(by.id('circleData'));
    circleArea.getAttribute('value').then((value) => {
      const data = JSON.parse(value);
      expect(data.length).toBe(1); // Ensure one item.
      expect(data[0].r).toBe(50); // Ensure radius is correct.
    });
  });
});

describe('Startup and recognize a centerpoint snap', () => {
  it('should be able to a find a centerpoint snap', () => {
    browser.get('http://localhost:8080/snap');

    const rangeControl = element(by.id('snapRangeControl'));
    expect(rangeControl.getAttribute('value')).toEqual('20');
    browser.actions().mouseMove(rangeControl).mouseDown().mouseMove({ x: 1000, y: 0 })
      .mouseUp()
      .perform();

    const addButton = element(by.id('addTest'));
    addButton.click();
    const canvas = element(by.id('drawingArea'));
    browser.actions()
      .mouseMove(canvas) // Move mouse to center of canvas.
      .perform();

    const circleArea = element(by.id('selectionData'));
    circleArea.getAttribute('value').then((value) => {
      const data = JSON.parse(value);
      const keys = Object.keys(data);
      expect(keys.length).toBe(1); // Ensure one item.
      expect(data[keys[0]].x).toEqual(250); // Ensure found point is what
      expect(data[keys[0]].y).toEqual(250); // it should be.
    });
  });
});

describe('Startup and set snap range', () => {
  it('should be able to set snap range', () => {
    browser.get('http://localhost:8080/snap');
    const rangeControl = element(by.id('snapRangeControl'));
    expect(rangeControl.getAttribute('value')).toEqual('20');
    browser.actions().mouseMove(rangeControl).mouseDown().mouseMove({ x: 1000, y: 0 })
      .mouseUp()
      .perform();
    expect(rangeControl.getAttribute('value')).toEqual('53');
  });
});
