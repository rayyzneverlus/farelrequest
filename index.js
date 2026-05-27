class FarelRequest {
  constructor(defaults = {}) {
    this.defaults = {
      headers: {},
      timeout: 10000,
      ...defaults
    }
  }

  async request(url, options = {}) {
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      controller.abort()
    }, options.timeout || this.defaults.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaults.headers,
          ...(options.headers || {})
        },
        signal: controller.signal
      })

      clearTimeout(timeout)

      const contentType =
        response.headers.get("content-type") || ""

      let data

      if (contentType.includes("application/json")) {
        data = await response.json()
      } else if (
        contentType.includes("text") ||
        contentType.includes("html")
      ) {
        data = await response.text()
      } else {
        data = await response.arrayBuffer()
      }

      return {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        url: response.url,
        headers: Object.fromEntries(
          response.headers.entries()
        ),
        data
      }
    } catch (err) {
      clearTimeout(timeout)

      return {
        status: 500,
        ok: false,
        error: true,
        message: err.message
      }
    }
  }

  get(url, options = {}) {
    return this.request(url, {
      method: "GET",
      ...options
    })
  }

  post(url, body = {}, options = {}) {
    return this.request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    })
  }

  put(url, body = {}, options = {}) {
    return this.request(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    })
  }

  patch(url, body = {}, options = {}) {
    return this.request(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      body: JSON.stringify(body),
      ...options
    })
  }

  delete(url, options = {}) {
    return this.request(url, {
      method: "DELETE",
      ...options
    })
  }
}

module.exports = FarelRequest
