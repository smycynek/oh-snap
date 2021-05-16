// spec.js
describe('Startup and title test', () => {
  it('should have a title', () => {
    browser.get('http://localhost:8080/snap');

    expect(browser.getTitle()).toEqual('Oh, snap!');
  });
});
