const Sale = require('../models/Sale');
async function getSales(req, res) {
    try {
        try {
            var data = await Sale.findAll();
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

//Observar por Venta
async function getSale(req, res) {
    try {
        try {
            var data = await Sale.findByPk(req.params.id);
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

//Crear Ventas
async function addSales(req, res) {
    try {
        const sale = await Sale.create(req.body); //dinamico

        res.status(201).send(sale);
    } catch (e) {
        if (e.name === 'SequelizeDatabaseError') {
            return res.status(400).send({ error: 'La tabla de la base de datos en la que desea ingresar no existe' })
        }
        if (e.name === 'SequelizeValidationError') {
            return res.status(400).send({ error: 'El dato que ingresó no es valido' })
        }
        else if (e.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).send({ error: 'El dato que intenta ingresar en userId y/o clientId no existe, o está nulo' })
        }
        else if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).send({ error: 'El el valor de subtotal ya existe' })
        }
        res.status(500).send(e);
    }
};

//Actualizar Ventas
async function updateSales(req, res) {
    try {
        //buacar venta
        const sale = await Sale.findByPk(req.params.id);

        //validar si existe
        if (!sale) {
            return res.status(404).send('La venta que intenta altualizar no existe');
        }
        //actualizar venta
        await Sale.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        //respuesta
        res.status(200).send({message:'La venta ha sido modificada'});

        //capturamos errores
    } catch (e) {
        res.status(500).send('error interno, intente mas tarde');
    }
};

//Eliminar Venta
async function deleteSales(req, res){
    try {

        const sale = await Sale.findByPk(req.params.id);
        if (!sale) {
            return res.status(404).send({ error: 'La venta que desea eliminar no existe' });
        }
        await Sale.destroy({
            where: {
                id: sale.id
            }
        })
        res.send({ message: 'Venta Borrada' });

    } catch (e) {
        res.status(500).send();

    }
};


module.exports = {getSales, getSale, addSales, updateSales, deleteSales};
