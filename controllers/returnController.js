const { Member, Book } = require('../models');

module.exports = {
    returnBook: async (req, res) => {
        const { memberId, bookId } = req.body;

        try {
            const member = await Member.findByPk(memberId);
            if (!member) {
                return res.status(404).json({ error: 'Member not found' });
            }

            const book = await Book.findOne({ where: { id: bookId, memberId: memberId } });
            if (!book) {
                return res.status(404).json({ error: 'Book not found or not borrowed by the member' });
            }

            const returnDate = new Date();
            const borrowDate = book.updatedAt;
            const secondsDifference = Math.floor((returnDate - borrowDate) / (1000 * 60 * 60 * 24));

            if (secondsDifference > 7) {
                member.penalty = true;
                await member.save();

                setTimeout(async () => {
                    member.penalty = false;
                    await member.save();
                    console.log('Penalty removed for member:', member.name);
                }, 3 * 24 * 60 * 60 * 1000);
            }

            book.stock += 1;
            await book.save();

            await member.removeBook(book);

            await book.update({ memberId: null });

            res.json({ message: 'Book returned successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}