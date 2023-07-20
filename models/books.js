const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Book extends Model {
        static associate(models) {
            Book.belongsTo(models.Member, {
                foreignKey: "memberId",
            });
        }
    }
    Book.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Book",
        }
    );
    return Book;
};