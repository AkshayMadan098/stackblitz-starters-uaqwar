const request = require('supertest');
const http = require('http');
const { getAllBooks } = require('../controllers');
const { app } = require('../index');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', async () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];
    getAllBooks.mockReturnValue(mockedBooks);
    let result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });

  describe('API Endpoint test', () => {
    it('GET /books should get all books', async () => {
      const result = await request(server).get('/books');
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        books: [
          {
            bookId: 1,
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            genre: 'Fiction',
          },
          {
            bookId: 2,
            title: '1984',
            author: 'George Orwell',
            genre: 'Dystopian',
          },
          {
            bookId: 3,
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic',
          },
        ],
      });
      expect(result.body.books.length).toBe(3);
    });

    it('GET /books/details/:id should get a book by id', async () => {
      const result = await request(server).get('/books/details/1');
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        book: {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
      });
    });
  });
});
