const Sequelize = require('sequelize');
const  {sequelize}  = require('../database/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true, // que no este vacio
      len: [2, 70] // definir un minimo y un maximo
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true, // que no este vacio
      len: [2, 70] // definir un minimo y un maximo
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true,
      notEmpty: true,
      len: [3, 50]
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [5, 16]
    }
  }
}, {
  timestamps: false,
  hooks: {
    beforeValidate: (user) => {
        if (typeof user.name === 'string') user.name = user.name.trim();
        if (typeof user.surname === 'string') user.surname = user.surname.trim();
        if (typeof user.email === 'string') user.email = user.email.trim().toLowerCase();
    },
    beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 8);
    },
    beforeUpdate: async (user) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }
    }
}
});

module.exports = User
