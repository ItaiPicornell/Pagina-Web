const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: 'mysql-26f6c79-alumnes-3bf7.e.aivencloud.com',
    port: 23697,
    user: 'avnadmin',
    password: 'AVNS_YceFFqip1dmXHQ2qNRS',
    database: 'defaultdb',
    ssl: {
        rejectUnauthorized: false
    }
};

app.post('/suscribir', async (req, res) => {
    const { nombre, correo } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO suscripciones (nombre, correo) VALUES (?, ?)', [nombre, correo]);
        await connection.end();

        res.json({ success: true, message: 'Suscripción exitosa' });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en https://webdigitalizacion.netlify.app/`);
});
