import { BookEntity } from './book.entity';

describe('BookEntity', () => {
  it('should be defined', () => {
    expect(new BookEntity()).toBeDefined();
  });
});
