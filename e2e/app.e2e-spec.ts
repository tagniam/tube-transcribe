import { TubeTranscribePage } from './app.po';

describe('tube-transcribe App', () => {
  let page: TubeTranscribePage;

  beforeEach(() => {
    page = new TubeTranscribePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
