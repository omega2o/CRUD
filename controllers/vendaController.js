const Usuarios = require('../models/usuariosModel');
const { Op } = require('sequelize');

const usuariosController = {
    createUsuarios: async (req, res) => {
        try {
            await Usuarios.create({
                usuariosname: req.body.usuariosname,
                password: req.body.password,
                role: req.body.role
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUsuariosById: async (req, res) => {
        try {
            const usuario = await Usuarios.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuarios: usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsuarioss: async (req, res) => {
        try {
            const usuarios = await Usuarios.findAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const usuario = await Usuarios.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuarios: usuario });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuarios: async (req, res) => {
        try {
            await Usuarios.update({
                usuariosname: req.body.usuariosname,
                password: req.body.password,
                role: req.body.role
            }, {
                where: { id: req.params.id }
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuarios: async (req, res) => {
        try {
            await Usuarios.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsuarioss: async (req, res) => {
        try {
            const search = req.query.search || '';
            const usuarios = await Usuarios.findAll({
                where: {
                    usuariosname: {
                        [Op.like]: `%${search}%`
                    }
                }
            });
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = usuariosController;
