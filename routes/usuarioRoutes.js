const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas de usuarios
router.get('/usuarios', usuarioController.getAllUsers);
router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.put('/usuarios/:id', usuarioController.updateUser);
router.delete('/usuarios/:id', usuarioController.deleteUser);

module.exports = router;