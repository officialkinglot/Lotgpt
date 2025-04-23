import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios'; // Using axios instead of OpenAI package

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Verify the correct endpoint

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Kinglot (Powered by DeepSeek)',   
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // DeepSeek API request
    const response = await axios.post(DEEPSEEK_API_URL, {
      model: "deepseek-chat", // Verify the correct model name
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data || 'Something went wrong');
  }
});

app.listen(5000, () => console.log('Server listening on http://localhost:5000'));
