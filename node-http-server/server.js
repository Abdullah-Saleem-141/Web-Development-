const http = require("http");

// In-memory data -- resets every time the server restarts. No database yet;
// that comes in a later lecture/tutorial. Each task is { id, title, done }.
let tasks = [
  { id: 1, title: "Learn the http module", done: false },
  { id: 2, title: "Build a tiny API with no framework", done: false },
];
let nextId = 3;

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (chunks.length === 0) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/tasks") {
    return sendJson(res, 200, tasks);
  }

  const singleTaskMatch = url.match(/^\/tasks\/(\d+)$/);
  if (method === "GET" && singleTaskMatch) {
    const id = Number(singleTaskMatch[1]);
    const task = tasks.find((t) => t.id === id);
    if (!task) return sendJson(res, 404, { error: "Task not found" });
    return sendJson(res, 200, task);
  }

  if (method === "POST" && url === "/tasks") {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (error) {
      return sendJson(res, 400, { error: "Invalid JSON body" });
    }
    if (!body.title || typeof body.title !== "string") {
      return sendJson(res, 400, { error: "'title' is required" });
    }
    const newTask = { id: nextId++, title: body.title, done: false };
    tasks.push(newTask);
    return sendJson(res, 201, newTask);
  }

  sendJson(res, 404, { error: `No route for ${method} ${url}` });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Tasks API (raw http module) listening on http://localhost:${PORT}`);
});
