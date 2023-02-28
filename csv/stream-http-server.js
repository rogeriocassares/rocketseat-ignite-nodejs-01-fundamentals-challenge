import assert from "assert";
import { parse } from "csv-parse";

import fs from "node:fsgit";
const csvPath = new URL("./tasks.csv", import.meta.url);

(async () => {
    fs.readFile(csvPath, "utf-8")
      .pipe(parse())

  // Report start
  process.stdout.write("start\n");
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    process.stdout.write(`${count++} ${record.join(",")}\n`);
    // Fake asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Report end
  process.stdout.write("...done\n");

  // Validation
  assert.strictEqual(count, 100);
})();

// fetch("http://localhost:3334", {
//   method: "POST",
//   body: new OneToHundredStream(), // Stream the content the request in the body!
//   duplex: "half",
// })
//   .then((response) => {
//     return response.text();
//   })
//   .then((data) => {
//     console.log(data);
//   });
