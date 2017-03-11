import { GameAppPage } from './app.po';

describe('game-app App', () => {
  let page: GameAppPage;

  beforeEach(() => {
    page = new GameAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
