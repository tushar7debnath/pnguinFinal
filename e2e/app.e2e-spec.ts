import { PnguinFinalPage } from './app.po';

describe('pnguin-final App', function() {
  let page: PnguinFinalPage;

  beforeEach(() => {
    page = new PnguinFinalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
