# Challenge 4 — Curiosity Questions 🧐

Serving an HTML page **and** its CSS from a Node server, plus all the bugs and
"why?" questions that came up along the way — explained at the easiest level.

---

## 1. My wrong code — setting HTML and CSS headers on the same response

What I first wrote (inside the `/` route):

```js
if (req.url === '/') {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Type', 'text/css');   // ❌ added this under it
  res.statusCode = 200;
  res.end(fileContent);   // fileContent is the HTML
}
```

**Why it's wrong:**
`setHeader` with the **same name overwrites** the previous one — it does not keep both. So line 2 cancels line 1, and the final `Content-Type` becomes `text/css`.

But I was sending the **HTML** content. So the browser was told *"this is CSS"* while actually receiving HTML → it tried to read `<html>...` as a stylesheet, failed, and rendered a **blank page**.

**The real misunderstanding:** one response can't carry both types.
> **One response = one Content-Type.**
HTML and CSS are **two separate requests**, so they need **two separate routes**:

```js
if (req.url === '/') {
  res.setHeader('Content-Type', 'text/html');   // only html here
  res.end(htmlContent);
} else if (req.url === '/style.css') {
  res.setHeader('Content-Type', 'text/css');    // only css here
  res.end(cssContent);
}
```

---

## 2. How does visiting `/` load the CSS?

The browser makes **two separate trips**, and the HTML itself tells it to fetch the CSS.

1. **Browser visits `/`** → server sends the HTML. Inside that HTML:
   ```html
   <link rel="stylesheet" href="/style.css" />
   ```
2. **Browser reads the HTML and sees that `<link>`** → it's an instruction: *"go fetch `/style.css` and apply it."* So the browser **automatically** makes a second request to `/style.css`. (You didn't type that URL — the HTML told it to.)
3. **Browser visits `/style.css`** → server's `else if` block sends the CSS with `Content-Type: text/css`. Browser sees that header, knows "this is a stylesheet," and **applies the rules to the page from step 1**.

```
You visit /            → get HTML
HTML's <link> says     → "fetch /style.css"
Browser visits /style.css (automatically) → gets CSS
Browser matches CSS rules to the HTML → styled page ✅
```

That's why opening `localhost:3000/style.css` **directly** just shows raw CSS text — there's no HTML there to style. The `<link>` tag is the glue.

---

## 3. What headers to load CSS, and is it "printed"?

Set the content type to `text/css`:

```js
res.setHeader('Content-Type', 'text/css');
res.statusCode = 200;
res.end(cssContent);
```

The browser reads `Content-Type: text/css`, recognizes a stylesheet, and **applies** it to the page. It does **not** print the CSS text on screen — it uses it to style the HTML.

---

## 4. Is it `res.setHeaders` or `res.setHeader`?

It's **`setHeader`** (singular):

```js
res.setHeader('Content-Type', 'text/css');   // ✅
res.setHeaders(...)                           // ❌ wrong method name
```

---

## 5. Why was `localhost:3000` loading forever?

Two different causes hit me here:

**a) Unmatched routes never end.** My handler only responded to `/` and `/style.css`. Any other path (like `/favicon.ico` or `/anything`) had no `res.end()`, so the request hung until timeout.
> **Rule: every request must reach a `res.end()`.** Add a final `else`:
> ```js
> else { res.statusCode = 404; res.end('Not found'); }
> ```

**b) A stale server was still running.** Even after fixing the code, it kept hanging — because an **old copy of the server was still running** on port 3000 and answering the browser with the old code. Node does **not** auto-reload on save.
> Restart it, or run `node --watch server.js` so it auto-restarts.

---

## 6. `EADDRINUSE: address already in use :::3000`

Means **something is already using port 3000** — usually an old server instance you didn't stop. Only one process can hold a port at a time.

Free the port:
```bash
lsof -ti:3000 | xargs kill -9
```
Then start your server again.

---

## 7. `ERR_INVALID_ARG_TYPE ... Received type number`

I wrote:
```js
res.write(count + 1);   // ❌ count+1 is a number
```
`res.write()` / `res.end()` only accept a **string, Buffer, or Uint8Array** — not a number.

Fix — convert to string:
```js
res.write(String(count + 1));   // ✅
```
(Note: writing before `res.end(html)` dumps that text **above** your HTML. To just track visits, do `count++` and `console.log(count)` instead.)

---

## 8. Why was `count` always 1?

```js
var count = 0;
res.write(String(count + 1));   // always 1
```
I never **stored** the new value — `count + 1` makes a number and throws it away, so `count` stays `0`, and every request computes `0 + 1 = 1`.

Fix — actually update count:
```js
count++;                     // 0 → 1 → 2 → 3...
res.write(String(count));
```
- `count + 1` → new number, **not saved** → stuck at 1.
- `count++` → **updates** count → grows each request. ✅

---

## 9. Is a top-of-file variable the right way for a "global" in Node?

Yes ✅ — a variable declared at the **top of the module** (outside the `createServer` callback) lives as long as the server runs, and every request shares it. Perfect for a visit counter.

Things to know:
- Prefer **`let`** over `var` (modern standard).
- It's **module-global**, not truly global — global only within this file.
- **Not persistent:** restart the server and it resets to 0 (it lives in RAM, not a database).
- **Not shared across processes:** multiple server instances each get their own copy.
- ⚠️ Don't declare it **inside** the `createServer` callback — there it resets to 0 on every request and never grows. Keep it at the top.
