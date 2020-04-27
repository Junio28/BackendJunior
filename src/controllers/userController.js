const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function getUsers(req, res) {
    try {
        try {
            var data = await User.findAll();
            res.status(200).send(data);
        }catch (e){
            handleError(e, res);
        }
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Ah ocurrido un error interno'
        });
    }
};

//Observar por Usuario
async function getUser(req, res) {
    try {
        try {
            var data = await User.findByPk(req.params.id);
            res.status(200).send(data);
        }catch (e){
            handleError(e, res);
        }
    } catch (error) {
        console.log(error);
        res.json({
            data: {},
            message: 'Ah ocurrido un error interno'
        });
    }
};


//Create 
async function addUsers(req, res) {
    try {
        const user = await User.create(req.body); //dinamico

        res.status(201).send(user);
    } catch (e) {
        if (e.name === 'SequelizeDatabaseError') {
            return res.status(400).send({ error: 'La tabla de la base de datos en la que desea ingresar no existe' })
        }
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).send({ error: 'Los datos que ingresó no son validos' })
        }
        else if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({ error: 'El email que deseas ingresar ya existe' })
        }
        res.status(500).send(e);
    }
};

//Actualizar usuarios
async function updateUsers(req, res) {
    const allowedUpdates = ['name', 'surname', 'email', 'password'];
    const updatesKeys = Object.keys(req.body);
    try {
        //buacar usuario
        const p = req.body;
        const user = await User.findByPk(req.params.id);

        //validar si existe
        if (!user) {
            return res.status(400).send({error:'El usuario que intenta altualizar no existe'});
        }
        //actualizar usuario
        if (p.name || p.surname || p.email || p.password) {
            const userChange = await User.update(req.body, {
                where: {
                    id: user.id
                },
                individualHooks: true
            });
            if (userChange) {
                const data = await User.findByPk(user.id);
                return res.status(200).send({ data });
            }
            } else return res.status(400).send({ error: 'Act Invalida' })
       
            } catch (e) {
                console.log(e)
                return res.status(400).send({ error: 'Datos errados' })
                }
    };

//Eliminar Usuario
async function deleteUsers(req, res){
    try {

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'El usuario que desea eliminar no existe' });
        }
        await User.destroy({
            where: {
                id: user.id
            }
        })
        res.send({ message: 'Usuario Borrado' });

    } catch (e) {
        res.status(500).send();

    }
};


module.exports = {getUsers,getUser, addUsers, updateUsers, deleteUsers};
