const { Member, Book, sequelize } = require('../models');

module.exports = {
    getAllMembers: async (req, res) => {
        try {
            const members = await Member.findAll();
            res.json(members);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getBorrowedBooksCount: async (req, res) => {
        try {
            const members = await Member.findAll({
                include: [
                    {
                        model: Book,
                        attributes: [],
                    },
                ],
                attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Books.id')), 'borrowedBooksCount']],
                group: ['Member.id'],
            });
            res.json(members);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}
