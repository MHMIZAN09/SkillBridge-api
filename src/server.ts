import app from "./app";

const port = process.env.PORT || 5000;
// Start the server
const startServer = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
startServer();
