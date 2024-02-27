import { FromNowPipe } from './moment.pipe';

describe('MomentPipe', () => {
  it('create an instance', () => {
    const pipe = new FromNowPipe();
    expect(pipe).toBeTruthy();
  });
});
