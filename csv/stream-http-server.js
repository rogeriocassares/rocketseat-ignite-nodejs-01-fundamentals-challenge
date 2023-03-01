import assert from "assert";
import { parse } from "csv-parse";
import { Readable } from "node:stream";

import fs from "node:fs";
const csvPath = new URL("./tasks.csv", import.meta.url);

class ReadCsvFile extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null); // No more data to stream
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}
// (async () => {
//   fs.readFile(csvPath, "utf-8").pipe(parse());

//   // Report start
//   process.stdout.write("start\n");
//   // Iterate through each records
//   for await (const record of parser) {
//     // Report current line
//     process.stdout.write(`${count++} ${record.join(",")}\n`);
//     // Fake asynchronous operation
//     await new Promise((resolve) => setTimeout(resolve, 100));
//   }
//   // Report end
//   process.stdout.write("...done\n");

//   // Validation
//   assert.strictEqual(count, 100);
// })();

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
