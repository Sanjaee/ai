// openaiController.js
const openai = require("../config/openaiConfig");

const generateMeta = async (title) => {
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

  console.log(description.choices[0]);
};

const generateImage = async (desc) => {
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: desc,
  });

  console.log(image.data);
};

module.exports = {
  generateMeta,
  generateImage,
};
