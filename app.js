// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config(); // Membaca variabel lingkungan dari file .env

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateMeta = async (req, res) => {
  const { title } = req.body;

  const description = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `isi ${title}`,
      },
    ],
  });

  const tags = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `sebutkan tags dari  ${title}`,
      },
    ],
  });

  res.status(200).json({
    description: description.choices[0].message,
    tags: tags.choices[0].message,
  });
};

const generateImage = async (req, res) => {
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.prompt,
  });

  res.status(200).json({
    image: image.data,
  });
};

app.post("/openai/meta", generateMeta);
app.post("/openai/image", generateImage);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
