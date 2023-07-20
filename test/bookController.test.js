const { getAllBooks, getAvailableBooksCount } = require('../controllers/bookController');
const { Book } = require('../models');

describe('Book Controller', () => {
    beforeEach(() => {
        Book.findAll = jest.fn();
    });

    describe('getAllBooks', () => {
        it('should return all books', async () => {
            const mockBooks = [
                { id: 1, code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1 },
                { id: 2, code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1 },
            ];

            Book.findAll.mockResolvedValue(mockBooks);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllBooks(req, res);

            expect(Book.findAll).toHaveBeenCalledTimes(1);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBooks);
        });

        it('should handle internal server error', async () => {
            Book.findAll.mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllBooks(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getAvailableBooksCount', () => {
        it('should return the count of available books', async () => {
            const availableBooksCount = 3;

            Book.count = jest.fn().mockResolvedValue(availableBooksCount);

            const req = {};
            const res = {
                json: jest.fn(),
            };
            await getAvailableBooksCount(req, res);

            expect(Book.count).toHaveBeenCalledTimes(1);
            expect(Book.count).toHaveBeenCalledWith({
                where: {
                    memberId: null,
                },
            });

            expect(res.json).toHaveBeenCalledWith({ borrowedBooksCount: availableBooksCount });
        });

        it('should handle internal server error', async () => {
            Book.count = jest.fn().mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAvailableBooksCount(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
});
