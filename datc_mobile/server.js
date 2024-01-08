
/*
const express = require('express');
const mysql = require('mysql');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Configurați conexiunea la baza de date
const db = mysql.createConnection({
    host: '34.118.79.104',  // Adresa IP sau numele de host al serverului de bază de date
    user: 'root',   // Numele utilizatorului pentru acces la bază de date
    password: 'andreiandreiandrei191919',  // Parola utilizatorului pentru acces la bază de date
    database: 'datc',    // Numele bazei de date
});

// Conectați-vă la baza de date
db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
    } else {
        console.log('Conectat la baza de date');
    }
});

// Setăm up serverul WebSocket
io.on('connection', (socket) => {
    console.log('Client conectat');

    // Când se primește o cerere pentru temperatura
    socket.on('getTemperature', () => {
        // Faceți interogarea la baza de date și trimiteți rezultatele la client
        const query = 'SELECT temperature FROM parameters';
        db.query(query, (err, result) => {
            if (err) {
                console.error('Eroare la interogarea bazei de date:', err);
                socket.emit('temperatureError', 'Eroare la obținerea temperaturilor');
            } else {
                const temperatures = result.map(row => row.temperature);
                socket.emit('temperatureData', temperatures);
            }
        });
    });
    
});

// Ruta pentru pagina HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Verificare periodică și notificare prin WebSocket
setInterval(() => {
    const query = 'SELECT temperature FROM parameters';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
        } else {
            const newTemperatures = result.map(row => row.temperature);
            io.emit('temperatureUpdate', newTemperatures);
        }
    });
}, 5000); // Verificare la fiecare 5 secunde

server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
*/

const express = require('express');
const mysql = require('mysql');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Configurați conexiunea la baza de date
const db = mysql.createConnection({
    host: '34.118.79.104',  // Adresa IP sau numele de host al serverului de bază de date
    user: 'root',   // Numele utilizatorului pentru acces la bază de date
    password: 'andreiandreiandrei191919',  // Parola utilizatorului pentru acces la bază de date
    database: 'datc',    // Numele bazei de date
});

// Conectați-vă la baza de date
db.connect((err) => {
    if (err) {
        console.error('Eroare la conectarea la baza de date:', err);
    } else {
        console.log('Conectat la baza de date');
    }
});

// Setăm up serverul WebSocket
io.on('connection', (socket) => {
    console.log('Client conectat');

    // Când se primește o cerere pentru temperatura, intensitatea luminii și starea ușii
    socket.on('getParameters', () => {
        // Faceți interogarea la baza de date și trimiteți rezultatele la client
        const query = 'SELECT temperature, light_intensity, opened_door FROM parameters';
        db.query(query, (err, result) => {
            if (err) {
                
                console.error('Eroare la interogarea bazei de date:', err);
                socket.emit('parametersError', 'Eroare la obținerea parametrilor');
            } else {
                const parameters = result[0]; // Avem nevoie doar de prima înregistrare, deoarece presupunem că tabela are o singură înregistrare
                socket.emit('parametersData', parameters);
                console.log(parameters);
            }
        });
    });
});

// Ruta pentru pagina HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Verificare periodică și notificare prin WebSocket
setInterval(() => {
    const query = 'SELECT temperature, light_intensity, opened_door FROM parameters';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
        } else {
            const newParameters = result[0]; // Avem nevoie doar de prima înregistrare, deoarece presupunem că tabela are o singură înregistrare
            io.emit('parametersUpdate', newParameters);
        }
    });
}, 5000); // Verificare la fiecare 5 secunde

server.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
