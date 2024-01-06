import express from "express";
import path from "path";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// For Heroku- if the env variable is production then set server to server static files from the dist folder
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(
      path.join(new URL("./frontend/dist", import.meta.url).pathname)
    )
  );
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        new URL("./frontend/dist/index.html", import.meta.url).pathname
      )
    )
  );
  // else just show server is running for local API
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
