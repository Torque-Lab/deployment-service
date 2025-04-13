import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { genrate } from "./generate";
import path from "path";
import { getAllFiles } from "./extract_file";
import { uploadFile } from "./aws";
import { createClient } from "redis";

const publisher = createClient();
publisher.connect();

const subscriber = createClient();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;

  const id = genrate();
  await simpleGit().clone(
    repoUrl,
    path.join(__dirname, `outputUserRepo/${id}`)
  );

  const allFiles = getAllFiles(path.join(__dirname, `outputUserRepo/${id}`));
  allFiles.forEach((file) => {
    uploadFile(file.slice(__dirname.length + 1), file);
  });
  console.log(repoUrl);

  publisher.lPush("build-queue", id);
  publisher.hSet("status", id, "uploaded");
  res.json({
    id: id,
    message: "your deployment request sent to final service",
  });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response,
  });
});

app.listen(3000);
