const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  generateMeta,
  generateImage,
} = require("./controllers/openaiControllers");

const app = express();

app.use(cors()); // Tambahkan ini untuk mengaktifkan CORS
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/openai/meta", generateMeta);
app.post("/openai/image", generateImage);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
