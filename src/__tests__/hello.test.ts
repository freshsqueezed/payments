import { hello } from '..';

describe('hello', () => {
  it('returns `Hello World!`', () => {
    expect(hello()).toEqual('Hello World!');
  });
});
