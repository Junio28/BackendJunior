const Sequelize = require('sequelize');
const  {sequelize}  = require('../database/db');

const Client = sequelize.define('client', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true, // que no este vacio
      len: [2, 70] // definir un minimo y un maximo
    }
  },
  lastname: {
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
  rut: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate:{
      //is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      //is: /^[a-zA-Z\sñÑ]+$/i, //validamos q tipo de caracteres puede tener
      notEmpty: true,
      len: [3, 50]
    }
  }
}, {
  timestamps: false,
  hooks: {
    beforeValidate: (clients) => {
        if (typeof clients.name === 'string') clients.name = clients.name.trim();
        if (typeof clients.lastname === 'string') clients.lastname = clients.lastname.trim();
        if (typeof clients.email === 'string') clients.email = clients.email.trim().toLowerCase();
        if (typeof clients.rut === 'string') clients.rut = clients.rut.trim();
        if (typeof clients.phone === 'string') clients.phone = clients.phone.trim();
    }
  }
});

module.exports = Client
