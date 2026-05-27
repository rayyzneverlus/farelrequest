<div align="center">

# farelrequest

Modern lightweight HTTP client for Node.js

<img src="https://img.shields.io/badge/version-1.0.0-black?style=for-the-badge">
<img src="https://img.shields.io/badge/node-%3E%3D18-black?style=for-the-badge">

</div>

---

# Features

- Fast
- Lightweight
- Promise Based
- JSON Support
- Custom Headers
- Timeout Support
- GET
- POST
- PUT
- PATCH
- DELETE

---

# Installation

```bash
npm install farelrequest
```

---

# Basic Usage

```js
const FarelRequest = require("farelrequest")

const request = new FarelRequest()

async function main() {
  const res = await request.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  )

  console.log(res.data)
}

main()
```

---

# POST Request

```js
const FarelRequest = require("farelrequest")

const request = new FarelRequest()

async function main() {
  const res = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      title: "farelrequest",
      body: "hello world",
      userId: 1
    }
  )

  console.log(res.data)
}

main()
```

---

# Custom Headers

```js
const res = await request.get(
  "https://api.example.com",
  {
    headers: {
      Authorization: "Bearer TOKEN"
    }
  }
)
```

---

# Timeout

```js
const res = await request.get(
  "https://api.example.com",
  {
    timeout: 5000
  }
)
```

---

# Response Example

```js
{
  status: 200,
  statusText: "OK",
  ok: true,
  url: "https://api.example.com",
  headers: {},
  data: {}
}
```

---

# Repository

https://github.com/rayyzneverlus/farelrequest
