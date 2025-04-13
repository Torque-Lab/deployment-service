import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws";
import { buildProject } from "./build";
const subscriber = createClient();
subscriber.connect(); //
const publisher=createClient();//to  set status of delplyemnet

async function main() {
  while (1) {
    const response = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    console.log(response);
    const id = response?.element;
    if (!id) {
      console.error("Invalid ID received:", id);
      continue;
    }
    await downloadS3Folder(`/outputUserRepo/${id}`);
    await buildProject(id);

    publisher.hSet("status",id,"deployed");

  }
}
