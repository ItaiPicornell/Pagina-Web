const mysql = require('mysql2/promise');

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

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Método no permitido' })
        };
    }

    try {
        const { nombre, correo } = JSON.parse(event.body);

        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO suscripciones (nombre, correo) VALUES (?, ?)', [nombre, correo]);
        await connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Suscripción exitosa' })
        };
    } catch (error) {
        console.error('Error en la función serverless:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Error en el servidor' })
        };
    }
};
