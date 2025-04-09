import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { genrate } from "./helper";
import path from "path"
import { getAllFiles } from "./fileUpload";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;

  const id = genrate();
  await simpleGit().clone(repoUrl, path.join(__dirname, `outputUserRepo/${id}`));


  const allFiles=getAllFiles(path.join(__dirname, `outputUserRepo/${id}`))
  allFiles.forEach(file=>{
    console.log(file)
  })
  console.log(repoUrl);
  res.json({
    id: id,
    message: "you deployment sent to final service",
  });
});

app.listen(3000);
