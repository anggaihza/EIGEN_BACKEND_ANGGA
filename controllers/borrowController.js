const { Member, Book } = require('../models');


module.exports = {
    borrowBook: async (req, res) => {
        const { memberId, bookId } = req.body;

        try {
            const member = await Member.findByPk(memberId);
            if (!member) {
                return res.status(404).json({ error: 'Member not found' });
            }

            if (member.penalty) {
                return res.status(400).json({ error: 'Member has a penalty and cannot borrow a book' });
            }

            const borrowedBooksCount = await Book.count({
                where: {
                    memberId: memberId,
                },
            });

            if (borrowedBooksCount >= 2) {
                return res.status(400).json({ error: 'Member has reached the maximum borrow limit' });
            }

            const book = await Book.findByPk(bookId);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            if (book.memberId) {
                return res.status(400).json({ error: 'Book is already borrowed by another member' });
            }

            if (book.stock === 0) {
                return res.status(400).json({ error: 'Book is out of stock' });
            }

            book.stock -= 1;
            book.createdAt = new Date();
            console.log('New createdAt value:', book.createdAt)

            book.memberId = memberId;
            await book.save();

            res.json({ message: 'Book borrowed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}