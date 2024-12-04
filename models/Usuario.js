const db = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {
  // Verificar si el email ya existe
  checkEmailExists: (email, callback) => {
    const query = 'SELECT COUNT(*) AS count FROM admin WHERE email = ?';
    
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0].count > 0); 
    });
  },

  // Método para crear un nuevo usuario
  create: (data, callback) => {
    const { nombre, email, password } = data;

    const query = 'INSERT INTO admin (nombre, email, password) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, password], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { mensaje: 'Usuario registrado exitosamente.', usuarioId: results.insertId });
    });
  },

  // Buscar usuario por email
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM admin WHERE email = ?';
    
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); 
    });
  },

  // Obtener todos los usuarios
  getAll: (callback) => {
    const query = 'SELECT id, nombre, email FROM admin';  
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results); 
    });
  },

  // Actualizar usuario
  update: (id, data, callback) => {
    const query = 'UPDATE admin SET nombre = ?, email = ? WHERE id = ?';
    const { nombre, email } = data;

    db.query(query, [nombre, email, id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);  
    });
  },

  // Eliminar usuario
  delete: (id, callback) => {
    const query = 'DELETE FROM admin WHERE id = ?';

    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results); 
    });
  }
};

module.exports = Usuario;