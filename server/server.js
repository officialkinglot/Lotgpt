 import express from 'express';
import cors from 'cors';
import axios from 'axios'; // Use axios to make HTTP requests

const RAPIDAPI_KEY = 'e54a1fb94fmshb4d147683caa9bep16ef30jsn8a41fea8c0ff'; // Replace this with your RapidAPI key
const RAPIDAPI_HOST = 'chat-gpt-3-5-turbo2.p.rapidapi.com'; // The correct RapidAPI host

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

        const options = {
            method: 'GET',
            url: 'https://chat-gpt-3-5-turbo2.p.rapidapi.com/problem.json',
            params: { question: prompt },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        };

        const response = await axios.request(options);

        res.status(200).send({
            bot: response.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong');
    }
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000'));
