import app from "./app.js";
import omdbRoutes from "./routes/omdb.routes.js";



const PORT = process.env.PORT;

app.use("/api/omdb", omdbRoutes);


// THEN start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

