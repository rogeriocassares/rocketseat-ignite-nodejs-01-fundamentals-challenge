import assert from "assert";
import { generate } from "csv-generate";
import { parse } from "csv-parse";
import { Readable } from "node:stream";
import fs from "node:fs";
import { error } from "console";

// TODO
// Read line by line of tasks.csv and convert to Buffer
// Stream the buffer using stdin to the read stream

const csvFilePath = new URL("./tasks.csv", import.meta.url);

fetch("http://localhost:3333/tasks", {
  method: "POST",
  // body: JSON.stringify({ title: "async", description: "iterator" }),
  body: fs
    .createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ",", fromLine: 2 }))
    .on("data", (row) => {
      // JSON.stringify({ title: "async", description: "iterator" });
      // console.log(Object.assign({}, row));
      // console.log(Object.fromEntries(row));
      setTimeout(() => {
        console.log(Object.fromEntries([row]));
      }, 1000);
    }),
  duplex: "half",
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });

// fs.createReadStream(csvFilePath)
//   .pipe(parse({ delimiter: ",", fromLine: 2 }))
//   .on("data", (row) => {
//     console.log(row);
//   })
//   .on("end", () => {
//     console.log("done!");
//   })
//   .on("error", () => {
//     console.log(error.message);
//   });

// (async () => {
//   // Initialize the parser by generating random records
//   const parser = generate({
//     high_water_mark: 1,
//     length: 3
//   })
// .pipe(
// parse()
// );
// console.log(`\nparser: ${JSON.stringify(parser)}\n`)

// Intialise count
//   let count = 0;
//   // Report start
//   process.stdout.write("start\n");
//   // Iterate through each records
//   for await (const record of parser) {
//     // Report current line
//     process.stdout.write(`${count++} ${record.join(",")}\n`);
//     // Fake asynchronous operation
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   // Report end
//   process.stdout.write("...done\n");
//   // Validation
//   assert.strictEqual(count, 3);
// })();
