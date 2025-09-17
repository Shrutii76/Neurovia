// server.js (ESM version)
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/tts', async (req, res) => {
  try {
    const response = await fetch('https://typecast.ai/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '__pltYsUg8h8NwbSF5UKyWXzmkDXjriWXWaR35qxTE6G3' // put your API key
      },
      body: JSON.stringify(req.body)
    });

    const arrayBuffer = await response.arrayBuffer();
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating TTS');
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
