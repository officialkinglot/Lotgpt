 import express from 'express';
import cors from 'cors';
import axios from 'axios'; // Use axios to make HTTP requests

const RAPIDAPI_KEY = 'e54a1fb94fmshb4d147683caa9bep16ef30jsn8a41fea8c0ff'; // Replace this with your RapidAPI key

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Kinglot',   
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        // Make a POST request to OpenAI via RapidAPI
        const response = await axios.post('https://rapidapi.com/completions', {
            model: "text-davinci-003", 
            prompt: prompt,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': RAPIDAPI_KEY, // RapidAPI Key
                'X-RapidAPI-Host': 'rapidapi.com' // The correct RapidAPI host
            }
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong');
    }
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000'));
