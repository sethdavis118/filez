import { createFile } from "#db/queries/files";
import { getFolders, getFolder } from "#db/queries/folders";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const result = await getFolders();
  return res.send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getFolder(id);
  if (!result) {
    return res.status(404).send("No folder found by that id.");
  }
  return res.send(result);
});

// QUESTION: When I visit the link /:id/files, it won't show anything. That's because this is a post, not a get, right?
router.post("/:id/files", async (req, res) => {
  const { id: folder_id } = req.params;
  const folderCheck = await getFolder(folder_id);
  if (!folderCheck) {
    return res.status(404).send("No folder found by that id.");
  }
  if (!req.body) {
    return res.status(400).send("No data provided.");
  }
  const { name, size } = req.body;
  if (!name || !size) {
    return res.status(400).send("Not all data provided.");
  }
  const result = await createFile(name, size, folder_id);
  return res.status(201).send(result);
});
