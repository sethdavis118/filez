import { getFiles } from "#db/queries/files";
import express from "express";
const app = express();
export default app;
import folderRoutes from "#api/folders";

app.use(express.json());

app.use("/folders", folderRoutes);

// I didn't think I needed a separate files file for this one piece of middleware :)
app.use("/files", async (req, res) => {
  const response = await getFiles();
  return res.send(response);
});

app.use("/", (req, res) => {
  const response = "Welcome to filez!";
  return res.send(response);
});
