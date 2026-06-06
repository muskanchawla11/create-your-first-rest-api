# Challenge 6 — Serve JSON from a Data File

Build an API that reads data from a JSON file and serves it.

## `getData()` (in `getData.js`)

`getData()` should:

- Read the JSON in `data/data.json` as a string.
- Parse it to JS.
- Return the parsed data.

If there's an error, it should return an **empty array** `[]`
(so callers can always safely iterate over the result instead of crashing).

## Server (in `server.js`)

- On `GET /api`:
  - Set `Content-Type: application/json`.
  - Status `200`.
  - Send the parsed data as JSON (`JSON.stringify`).
- Any other route → `404`.
- On a server error → `404` with a friendly message.
