// index.js

document.addEventListener("DOMContentLoaded", () => {
  const metaForm = document.querySelector(".meta-form");
  const imageForm = document.querySelector(".image-form");
  const descriptionDiv = document.querySelector(".description");
  const tagsDiv = document.querySelector(".tags");
  const thumbnailImg = document.querySelector(".thumbnail img");

  metaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = metaForm.querySelector("[name='title']").value;

    try {
      // Make a request to your server to generate meta data
      const response = await fetch("http://localhost:4000/openai/meta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      // Update the HTML with the generated meta data
      descriptionDiv.innerHTML = `<p>${data.description}</p>`;
      tagsDiv.innerHTML = `<p>${data.tags}</p>`;
    } catch (error) {
      console.error("Error generating meta data:", error);
    }
  });

  // ...

  imageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const prompt = imageForm.querySelector("[name='prompt']").value;

    try {
      // Make a request to your server to generate an image
      const response = await fetch("http://localhost:4000/openai/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      // Check if the 'image' property exists in the received data
      if (data.image && data.image.url) {
        // Update the HTML with the generated image
        thumbnailImg.src = data.image.url;
      } else {
        // Handle the case where the 'image' property or 'url' property is not present
        console.error("Image URL not found in the response:", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  });

  // ...
});
