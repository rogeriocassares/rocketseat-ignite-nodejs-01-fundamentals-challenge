import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search ? { title: search, description: search } : null
      );
      return res
        .setHeader("Content-type", "application/json")
        .end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      if (req.body == null) {
        return res.writeHead(400).end("The body is not a valid JSON.");
      }
      const { title, description } = req.body;
      if (title && description) {
        const datetime = new Date();

        const tasks = {
          id: randomUUID(),
          created_at: datetime,
          updated_at: null,
          completed_at: null,
          title,
          description,
        };

        database.insert("tasks", tasks);

        return res.writeHead(201).end();
      } else {
        return res.writeHead(400).end("The 'title' and 'description' fields are mandatory!");
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      if (req.body == null) {
        return res.writeHead(400).end("The body is not a valid JSON.");
      }
      const { title, description } = req.body;
      if (title && description) {
        const { id } = req.params;
        const updated_at = new Date();

        let result = database.update("tasks", id, {
          updated_at,
          title,
          description,
        });

        if (result > -1) {
          return res.writeHead(204).end();
        } else {
          return res.writeHead(404).end("The 'id' parameter was not found.");
        }
      } else {
        return res.writeHead(400).end("The 'title' and 'description' fields are mandatory!");
      }
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const completed_at = new Date();

      let result = database.update("tasks", id, {
        completed_at,
      });

      if (result > -1) {
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end("The 'id' parameter was not found.");
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      let result = database.delete("tasks", id);

      if (result > -1) {
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end("The 'id' parameter was not found.");
      }
    },
  },
];
