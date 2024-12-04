const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',    
  user: 'root',        
  password: '',         
  database: 'crud',     
  port: 33065            
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

module.exports = connection;