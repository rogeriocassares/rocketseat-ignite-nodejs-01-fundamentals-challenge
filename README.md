# rocketseat-ignite-nodejs-01-fundamentals-challenge

This repository intend to serve as the solution of the Challenge purposed at Rocketseat's Nodejs Ignite Journey - Project 01 and it is strongly based on the [repository](https://github.com/rogeriocassares/rocketseat-ignite-nodejs-01-fundamentals) created for that class.

## 0. Quick Start

```bash
# With node>=18 and pnpm installed:
pnpm i
pnpm run dev

# In another Terminal, please run from the top directory of yje project:
node csv/parse-csv-to-api-stream.js
```



[TOC]



## 1. Target

Develop an API with no Frameworks to perform the CRUD of the tasks using an JSON database in a file.

The API must contain the following functionalities:

- [x] Creation of a task;
- [x] List all the tasks;
- [x] Updating a task by `id`;
- [x] Remove a task by `id`;
- [x] Mark by `id` a task completed;
- [x] And the real challenge: Importing tasks in bulk from a CSV file.



## 2. Routes and Business Rules

### 2.1. Task structure (properties):

- [x] `id` - Unique identifier of each task;
- [x] `title` - Title of the task;
- [x] `description` - Detailed description of the task;
- [x] `completed_at` - Date when the task was completed. The initial value must be `null`;
- [x] `created_at` - Date of the creation of the task;
- [x] `updated_at` - Always updated to the date when the task was updated;

### 2.2. Routes:

- [x] `POST` - `/tasks`
- [x] `GET` - `/tasks`
- [x] `PUT` - `/tasks/:id`
- [x] `DELETE` - `/tasks/:id`
- [x] `PATCH` - `/tasks/:id/complete`



## 3. CSV Import

Normally, an API imports the CSV file sending the file by a route with a format called `multipart/form-data`.

Nonetheless,  for this project the CSV file must be imported using Stream. To make it possible, the lib [csv-parse](https://csv.js.org/) shall be used using an [async iterator](https://csv.js.org/parse/api/async_iterator/) example.

```js
import assert from 'assert';
import { generate } from 'csv-generate';
import { parse } from 'csv-parse';

(async () => {
  // Initialise the parser by generating random records
  const parser = generate({
    high_water_mark: 64 * 64,
    length: 100
  }).pipe(
    parse()
  );
  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    process.stdout.write(`${count++} ${record.join(',')}\n`);
    // Fake asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  // Report end
  process.stdout.write('...done\n');
  // Validation
  assert.strictEqual(count, 100);
})();
```

With the lib installed using a package manager, a file must be created apart to perform the reading of the CSV file. In this file, the read operation must be performed to each line and requesting the `POST` - `/tasks` route, passing the necessary fields.

Recomendation of the CSV file fomat:

```text
title,description
Task 01,Descri????o da Task 01
Task 02,Descri????o da Task 02
Task 03,Descri????o da Task 03
Task 04,Descri????o da Task 04
Task 05,Descri????o da Task 05
```

Implementation recommendation:

Similarly done in the [`stream-http-server.js`](https://github.com/rogeriocassares/rocketseat-ignite-nodejs-01-fundamentals/blob/main/streams/stream-http-server.js) using the `for` `await`, it is always possible do with the `parse` of the lib informed above. Remember to jump the first line of the CSV file.



## 4. Going beyond

Some suggestions:

Validate if the properties `title` and `description` of the routes `POST` and `PUT` are presents in the `body` of the requisition.

IN the routes that receives the `/:id`, in addition to validate if the `id` exists in the database, return the request with a informative message the the registry does not exists.

Validate if req.body is a real JSON

Do not accept the update if just one field is filled.

Ensure fields of JSON are to lower_case.



## 5. Delivery

After completing the challenge, the code shall be submitted to the GitHub.





























