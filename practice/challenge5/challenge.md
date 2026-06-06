# Challenge 5 — Serve a Static Folder

Any file inside `public/` should be served automatically, instead of hardcoding
each file.

Build a function that:

- Takes the request URL.
- Finds the matching file inside `public/`.
- Figures out its content type from the file extension.
- Sends the file.

Rules:

- `/` should serve `index.html`.
- If the file does not exist, serve `404.html`.
- If something else goes wrong, send a `500`.
- Tell apart "file not found" from a real server error.

Extension → content type map:

| Extension | Content type      |
|-----------|-------------------|
| `.js`     | `text/javascript` |
| `.css`    | `text/css`        |
| `.html`   | `text/html`       |
| `.png`    | `image/png`       |
| `.svg`    | `image/svg+xml`   |
