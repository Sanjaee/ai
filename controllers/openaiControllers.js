// openaiController.js
const openai = require("../config/openaiConfig");

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
    max_tokens: 100,
  });

  const tags = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `sebutkan tags dari  ${title}`,
      },
    ],
    max_tokens: 100,
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

module.exports = {
  generateMeta,
  generateImage,
};
