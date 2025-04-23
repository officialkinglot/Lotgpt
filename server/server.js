import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello from Kinglot (Powered by OpenRouter)',
  });
});

app.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "openai/gpt-3.5-turbo", // You can change this to any model on OpenRouter
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000', // Required by OpenRouter
          'X-Title': 'Kinglot AI' // Your app name
        }
      }
    );

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    res.status(500).send({
      error: error.response?.data?.error?.message || 'Something went wrong'
    });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
