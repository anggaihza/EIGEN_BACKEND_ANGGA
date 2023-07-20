const { Model, DataTypes, Sequelize } = require("sequelize");
const db = require("../models");

module.exports = (sequelize) => {
    class Member extends Model {
        static associate(models) {
            Member.hasMany(models.Book, {
                foreignKey: {
                    name: "memberId",
                },
            });
        }
    }
    Member.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            penalty: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "Member",
        }
    );
    return Member;
};
