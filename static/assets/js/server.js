const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Route for handling AI response requests
app.post('/generateAIResponse', async (req, res) => {
    try {
        const { userInput } = req.body;

        // Make a request to OpenAI API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: `User: ${userInput}\nAI:`,
            max_tokens: 50
        }, {
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });

        // Send the AI response back to the client
        res.json({ aiResponse: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
