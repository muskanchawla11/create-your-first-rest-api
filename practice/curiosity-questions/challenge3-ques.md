# Challenge 3 — Curiosity Questions 🧐

A collection of the "why does this work?" questions from `challenge3/text.txt`,
explained at the easiest level possible.

---

## 1. Relative path vs absolute path — which is optimal?

- **Relative path** = directions *from where you currently are* → `./public/index.html`.
- **Absolute path** = the *full address from the very top* → `/Users/muskan/.../public/index.html`.

**Problem with relative paths:** they depend on *where you run the program from*, not where the file lives. Run `node server.js` from a different folder and the path breaks.

**Optimal answer:** build an absolute path, but don't hard-code it:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "public", "index.html");
```

This means "absolute path, starting from wherever *this file* lives" — reliable like absolute, portable like relative. ✅

---

## 2. Why is async file reading better than sync?

Think of **Node as one single waiter** serving all users (there is only one thread).

- **Sync read** (`fs.readFileSync`): the waiter walks to the kitchen and **stands frozen** waiting for the food, ignoring all other tables until it's ready.
- **Async read** (`await fs.readFile`): the waiter places the order, then **goes and serves other tables**, and comes back when the food is ready.

**How other users are affected:**

With **sync**, 3 users arriving together:
```
User A → waiter starts file read → FROZEN
User B → waits (waiter frozen on A)
User C → waits (still frozen on A)
```
B and C are delayed *not by their own work* but because the single waiter was frozen on A.

With **async**:
```
User A → starts file read → waiter stays FREE
User B → handled right away
User C → handled right away
A's file ready → waiter comes back and finishes A
```

**Takeaway:** Sync freezes the *whole server* so everyone waits. Async keeps it free to serve everyone. Only matters because one thread is shared by all users.

---

## 3. What does `createServer` actually do?

`http.createServer(...)` **builds a server object** in your program — like setting up a phone that *can* receive calls. It does **not** go online yet.

It only starts listening when you call `.listen(3000)`. *That's* the moment it opens port 3000 and waits for visitors.

**Why the function inside `createServer`?**
```js
http.createServer((req, res) => { ... })
```
That function is the **instructions for what to do every time someone visits** — "when a request comes in, run this." Node saves it and runs it automatically on each request.

---

## 4. One clean sentence describing `createServer`

> "`createServer` creates an HTTP server and registers a handler function that runs every time a request arrives — but the server only starts accepting connections once you call `.listen(port)`."

Even simpler:
> "It builds a server and says *what to do for each request*; `.listen` is what actually turns it on."

---

## 5. Why are headers so important — who reads them?

A **header** is a label on the response saying *what kind of data this is* — like a label on a package ("Fragile", "Food", "Books").

**Who reads it?** The **browser** (whoever made the request). It doesn't know if your response is a webpage, image, or text — it reads `Content-Type` to decide:

| Header you send | What the browser does |
|---|---|
| `Content-Type: text/html` | Renders it as a **web page** |
| `Content-Type: text/plain` | Shows it as **raw text** |
| `Content-Type: application/json` | Treats it as **data** |
| `Content-Type: image/png` | Displays an **image** |

If you send HTML but set `text/plain`, the browser shows the raw `<html>...` code instead of a page — because you *told* it "this is just text." The header is the **instruction the receiver trusts** to interpret your bytes.

---

## 6. Read the file fresh on every request, or once at startup? (tradeoff)

**Option A — read fresh on every request** (inside the request handler):
```js
http.createServer(async (req, res) => {
  const html = await fs.readFile(filePath); // runs every visit
  res.end(html);
});
```
- ✅ **Always up to date** — edit the HTML, refresh the browser, you see changes instantly.
- ❌ **Slower & wasteful** — hits the disk on *every* request, even if the file never changed.

**Option B — read once at startup** (before/outside the handler):
```js
const html = await fs.readFile(filePath); // runs ONCE
http.createServer((req, res) => {
  res.end(html); // just serves the value already in memory
});
```
- ✅ **Fast** — file is already in memory (RAM), no disk work per request.
- ❌ **Stale** — if you edit the HTML, the server keeps serving the *old* version until you restart it.

**The tradeoff in one line:**
> Fresh-per-request = always current but slower; once-at-startup = fast but you must restart to see changes.

**Which to use?**
- **Development / learning** → read fresh (or it's fine either way) so you see edits immediately.
- **Production**, file rarely changes → read once at startup (speed matters, restarts are normal on deploy).
- Real apps often get the best of both with **caching** — read once, but refresh the cache when the file actually changes.

---

## Bonus — breaking down this line

```js
const __dirname = path.dirname(fileURLToPath(import.meta.url));
```

Read it **inside-out**:

| Code | Result |
|---|---|
| `import.meta.url` | `file:///.../challenge3/server.js` (a **URL**) |
| `fileURLToPath(...)` | `/Users/.../challenge3/server.js` (real path to the **file**) |
| `path.dirname(...)` | `/Users/.../challenge3` (just the **folder**) ✅ |

Whole line means: **"Give me the absolute path of the folder this file lives in, and store it in `__dirname`."**

**Why?** In old CommonJS, `__dirname` was free. In ES modules (`import`/`export`) it's *not provided*, so you rebuild it manually. Then you can safely point to other files:

```js
const filePath = path.join(__dirname, "public", "index.html");
// → always correct, no matter where you run from ✅
```
