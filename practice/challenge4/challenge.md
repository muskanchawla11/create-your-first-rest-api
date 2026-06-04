# Challenge 4

Serve an HTML page **and** its CSS file with the correct `Content-Type` headers,
so the page actually loads **styled** in the browser.

Also keep a **counter** that goes up by one every time anyone hits the server,
and show it.

### Requirements
- `GET /` → respond with `public/index.html` as `text/html`.
- `GET /style.css` → respond with `public/style.css` as `text/css`, so the page renders styled.
- Keep a counter that increments by 1 on every request and display its value.
