import { createClient, commandOptions } from "redis";
const subscriber = createClient();
subscriber.connect(); //

async function main() {
  while (1) {
    const response = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    console.log(response);
const id=response?.element
    await downLoadS3Folder(`/output/${id}`)
  }
}


