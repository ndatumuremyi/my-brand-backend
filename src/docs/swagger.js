const swaggerDoc = {
  "paths": {
    "/": {
      "get": {
        "tags": ["Default"],
        "summary": "Default message on server",
        "operationId": "",
        "responses": {
          "200": {
            "description": "Message of successful request"
          }
        },
        "x-codegen-request-body-name": "body"
      }
    }
  },
  "swagger": "2.0",
  "info": {
    "version": "v1",
    "title": "My brand"
  }
}

export default swaggerDoc;