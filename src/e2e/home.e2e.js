import Nightmare from 'nightmare';

describe('Homepage', () => {
  it('it should have logo text', async () => {
    const page = Nightmare().goto('//');
    const text = await page.evaluate(() => document.body.innerHTML).end();
    expect(text).toContain('<h1>虹宇国旅</h1>');
  });
});
