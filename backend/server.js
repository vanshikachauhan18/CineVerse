import app from "./app.js";


const PORT = process.env.PORT;



// THEN start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

