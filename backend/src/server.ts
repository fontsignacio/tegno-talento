import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log(process.env.DATABASE_URL);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});



