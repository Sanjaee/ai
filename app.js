const readline = require("readline");
const {
  generateMeta,
  generateImage,
} = require("./controllers/openaiControllers");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for YouTube video title
// rl.question("jawaban: \n", generateMeta);
rl.question("jawaban: \n", generateImage);

//with close

// rl.question("jawaban: ", (desc) => {
//   // Generate meta description using OpenAI
//   generateImage(desc);

//   // Close the readline interface
//   rl.close();
// });
