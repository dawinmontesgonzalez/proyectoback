const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

const usuarioController = {
  // Obtener todos los usuarios
  getAllUsers: (req, res) => {
    Usuario.getAll((err, users) => {
      if (err) {
        return res.status(500).json({ 
          mensaje: 'Error al obtener usuarios', 
          error: err.message 
        });
      }
      res.json(users);
    });
  },

  // Registrar un nuevo usuario
  register: (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ 
        mensaje: 'Nombre, email y password son obligatorios' 
      });
    }

    // Verificar si el usuario ya existe
    Usuario.findByEmail(email, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ 
          mensaje: 'Error al verificar email', 
          error: err.message 
        });
      }

      if (existingUser) {
        return res.status(400).json({ 
          mensaje: 'Ya existe un usuario con ese correo electrónico' 
        });
      }

      // Encriptar la contraseña
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ 
            mensaje: 'Error al encriptar la contraseña', 
            error: err.message 
          });
        }

        // Crear el nuevo usuario
        Usuario.create({ 
          nombre, 
          email, 
          password: hashedPassword 
        }, (err, result) => {
          if (err) {
            return res.status(500).json({ 
              mensaje: 'Error al registrar usuario', 
              error: err.message 
            });
          }
          res.status(201).json(result);
        });
      });
    });
  },

  // Iniciar sesión
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        mensaje: 'Email y contraseña son obligatorios' 
      });
    }

    Usuario.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ 
          mensaje: 'Error al buscar usuario', 
          error: err.message 
        });
      }

      if (!user) {
        return res.status(401).json({ 
          mensaje: 'Credenciales incorrectas' 
        });
      }

      // Verificar la contraseña
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ 
            mensaje: 'Error al verificar la contraseña', 
            error: err.message 
          });
        }

        if (!result) {
          return res.status(401).json({ 
            mensaje: 'Credenciales incorrectas' 
          });
        }

        res.json({ 
          mensaje: 'Inicio de sesión exitoso', 
          usuarioId: user.id 
        });
      });
    });
  },

  // Actualizar un usuario
  updateUser: (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ 
        mensaje: 'Nombre y email son obligatorios' 
      });
    }

    Usuario.update(id, { nombre, email }, (err, result) => {
      if (err) {
        return res.status(500).json({ 
          mensaje: 'Error al actualizar usuario', 
          error: err.message 
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          mensaje: 'Usuario no encontrado' 
        });
      }

      res.json({ 
        mensaje: 'Usuario actualizado exitosamente',
        usuarioId: id 
      });
    });
  },

  // Eliminar un usuario
  deleteUser: (req, res) => {
    const { id } = req.params;

    Usuario.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ 
          mensaje: 'Error al eliminar usuario', 
          error: err.message 
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          mensaje: 'Usuario no encontrado' 
        });
      }

      res.json({ 
        mensaje: 'Usuario eliminado exitosamente' 
      });
    });
  }
};

module.exports = usuarioController;