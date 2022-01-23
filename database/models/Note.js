const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Note extends Model {}

Note.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    } 
}, {
    sequelize,
    modelName: 'note',
    timestamps: true
})

module.exports = Note;