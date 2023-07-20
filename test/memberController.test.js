const { getAllMembers, getBorrowedBooksCount } = require('../controllers/memberController');
const { Member, Book, sequelize } = require('../models');

describe('Member Controller', () => {
    beforeEach(() => {
        Member.findAll = jest.fn();
        Book.findAll = jest.fn();
    });

    describe('getAllMembers', () => {
        it('should return all members', async () => {
            const mockMembers = [
                { id: 1, code: 'M001', name: 'Angga' },
                { id: 2, code: 'M002', name: 'Putri' },
            ];

            Member.findAll.mockResolvedValue(mockMembers);

            const req = {};
            const res = {
                json: jest.fn(),
            };
            await getAllMembers(req, res);

            expect(Member.findAll).toHaveBeenCalledTimes(1);

            expect(res.json).toHaveBeenCalledWith(mockMembers);
        });

        it('should handle internal server error', async () => {
            Member.findAll.mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getAllMembers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('getBorrowedBooksCount', () => {
        it('should return the count of borrowed books for each member', async () => {
            const mockMembers = [
                { id: 1, code: 'M001', name: 'Angga' },
                { id: 2, code: 'M002', name: 'Putri' },
            ];
            const mockBooks = [
                { id: 1, code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1, memberId: 1 },
                { id: 2, code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1, memberId: 2 },
                { id: 3, code: 'ABC-123', title: 'Sample Book', author: 'Sample Author', stock: 1, memberId: 1 },
            ];

            Member.findAll.mockResolvedValue(mockMembers);
            Book.findAll.mockResolvedValue(mockBooks);

            const req = {};
            const res = {
                json: jest.fn(),
            };
            await getBorrowedBooksCount(req, res);

            expect(Member.findAll).toHaveBeenCalledTimes(1);
            expect(Book.findAll).toHaveBeenCalledTimes(1);

            const expectedResponse = [
                { id: 1, code: 'M001', name: 'Angga', borrowedBooksCount: 2 },
                { id: 2, code: 'M002', name: 'Putri', borrowedBooksCount: 1 },
            ];
            expect(res.json).toHaveBeenCalledWith(expectedResponse);
        });

        it('should handle internal server error', async () => {
            Member.findAll.mockRejectedValue(new Error('Database error'));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await getBorrowedBooksCount(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });
});
