const { Member, Book, sequelize, Sequelize } = require('../models');

module.exports = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            res.status(200).json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAvailableBooksCount: async (req, res) => {
        try {
            const borrowedBooksCount = await Book.count({
                where: {
                    memberId: null,
                },
            });

            res.json({ borrowedBooksCount });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
