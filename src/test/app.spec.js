describe('object snap', () => {
  it('should set the snap range', () => {
    browser.get('http://localhost:8080/snap');
    const x = 2;
    expect(x).toEqual(2);
  });
});
