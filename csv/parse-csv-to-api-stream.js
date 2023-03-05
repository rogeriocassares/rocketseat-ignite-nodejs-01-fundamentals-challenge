import fs from "node:fs";
import { parse } from "csv-parse";

const csvFilePath = new URL("./tasks.csv", import.meta.url);

(async () => {
  /* Parse the csv file with native createReadStream*/
  const csvParseStream = fs
    .createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ",", fromLine: 2 }));

  // Report start
  process.stdout.write("start\n");

  // Iterate through each record of csvParseStream
  for await (const record of csvParseStream) {
    // INitialize buffer array
    const buffer = [];

    // Define the task object
    const [title, description] = record;
    const task = {
      title,
      description,
    };

    // Report current line
    process.stdout.write(`${JSON.stringify(task)}\n`);
    buffer.push(task);

    // Post to the API
    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
      duplex: "half",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
  }
  // Report end
  process.stdout.write("...done\n");
})();
