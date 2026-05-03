{
  "openapi": "3.1.0",
  "info": {
    "title": "BOT_AGENT",
    "description": "\n        Base frame with FastAPI micro framework + Postgresql\n            - Login/Register with JWT\n            - Permission\n            - CRUD User\n            - Unit testing with Pytest\n            - Dockerize\n        ",
    "version": "0.1.0"
  },
  "paths": {
    "/api/health-check": {
      "get": {
        "tags": [
          "[Current] Health Check"
        ],
        "summary": "Get",
        "operationId": "get_api_health_check_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BaseResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": [
          "[Current] Auth"
        ],
        "summary": "Login Basic",
        "operationId": "login_basic_api_auth_login_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_TokenResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/login-keycloak": {
      "post": {
        "tags": [
          "[Current] Auth"
        ],
        "summary": "Login Keycloak",
        "operationId": "login_keycloak_api_auth_login_keycloak_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_TokenResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/auth/register": {
      "post": {
        "tags": [
          "[Current] Auth"
        ],
        "summary": "Register",
        "operationId": "register_api_auth_register_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/bots/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_bots_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BotBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/bots": {
      "get": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_bots_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BotBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Create",
        "operationId": "create_api_bots_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/bots/{bot_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_bots__bot_id__get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_bots__bot_id__put",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_bots__bot_id__patch",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_bot"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_bots__bot_id__delete",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/bots/all": {
      "get": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_bots_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BotBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/bots": {
      "get": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_bots_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BotBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_bots_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/bots/{bot_id}": {
      "get": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_bots__bot_id__get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_bots__bot_id__put",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_bots__bot_id__patch",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BotUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BotBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_bot"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_bots__bot_id__delete",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/branches/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_branches_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BranchBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/branches": {
      "get": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_branches_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BranchBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Create",
        "operationId": "create_api_branches_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/branches/{branch_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_branches__branch_id__get",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_branches__branch_id__put",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_branches__branch_id__patch",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_branch"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_branches__branch_id__delete",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/branches/all": {
      "get": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_branches_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BranchBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/branches": {
      "get": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_branches_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BranchBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_branches_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/branches/{branch_id}": {
      "get": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_branches__branch_id__get",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_branches__branch_id__put",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_branches__branch_id__patch",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BranchUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BranchBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_branch"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_branches__branch_id__delete",
        "parameters": [
          {
            "name": "branch_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Branch Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/brands/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_brands_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BrandBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/brands": {
      "get": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_brands_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BrandBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Create",
        "operationId": "create_api_brands_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/brands/{brand_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_brands__brand_id__get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_brands__brand_id__put",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_brands__brand_id__patch",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_brand"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_brands__brand_id__delete",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/brands/all": {
      "get": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_brands_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BrandBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/brands": {
      "get": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_brands_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_BrandBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_brands_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/brands/{brand_id}": {
      "get": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_brands__brand_id__get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_brands__brand_id__put",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_brands__brand_id__patch",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/BrandUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_BrandBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_brand"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_brands__brand_id__delete",
        "parameters": [
          {
            "name": "brand_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/catalogs/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_catalogs_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_CatalogBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/catalogs": {
      "get": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_catalogs_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_CatalogBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Create",
        "operationId": "create_api_catalogs_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/catalogs/{catalog_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_catalogs__catalog_id__get",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_catalogs__catalog_id__put",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_catalogs__catalog_id__patch",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_catalog"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_catalogs__catalog_id__delete",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/catalogs/all": {
      "get": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_catalogs_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_CatalogBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/catalogs": {
      "get": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_catalogs_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_CatalogBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_catalogs_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/catalogs/{catalog_id}": {
      "get": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_catalogs__catalog_id__get",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_catalogs__catalog_id__put",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_catalogs__catalog_id__patch",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CatalogUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_CatalogBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_catalog"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_catalogs__catalog_id__delete",
        "parameters": [
          {
            "name": "catalog_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/chat": {
      "post": {
        "tags": [
          "[Current] v1 - api_chat",
          "Chat"
        ],
        "summary": "Chat",
        "operationId": "chat_api_chat_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChatRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChatResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/chat/reset": {
      "delete": {
        "tags": [
          "[Current] v1 - api_chat",
          "Chat"
        ],
        "summary": "Reset Session",
        "description": "Xóa toàn bộ LongTerm, GoalProgress và Message của User trong Bot này (coi như chat lại từ đầu).",
        "operationId": "reset_session_api_chat_reset_delete",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetSessionRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/chat": {
      "post": {
        "tags": [
          "v1 - api_chat",
          "Chat"
        ],
        "summary": "Chat",
        "operationId": "chat_api_v1_chat_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChatRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChatResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/chat/reset": {
      "delete": {
        "tags": [
          "v1 - api_chat",
          "Chat"
        ],
        "summary": "Reset Session",
        "description": "Xóa toàn bộ LongTerm, GoalProgress và Message của User trong Bot này (coi như chat lại từ đầu).",
        "operationId": "reset_session_api_v1_chat_reset_delete",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetSessionRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/documents/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_documents_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/documents": {
      "get": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_documents_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Create",
        "operationId": "create_api_documents_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/documents/search": {
      "post": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Search Documents",
        "operationId": "search_documents_api_documents_search_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentSearchHitResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/documents/{document_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_documents__document_id__get",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_documents__document_id__put",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_documents__document_id__patch",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_document"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_documents__document_id__delete",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/documents/all": {
      "get": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_documents_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/documents": {
      "get": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_documents_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_documents_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/documents/search": {
      "post": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Search Documents",
        "operationId": "search_documents_api_v1_documents_search_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentSearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_DocumentSearchHitResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/documents/{document_id}": {
      "get": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_documents__document_id__get",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_documents__document_id__put",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_documents__document_id__patch",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DocumentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_DocumentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_document"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_documents__document_id__delete",
        "parameters": [
          {
            "name": "document_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Document Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/faqs/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_faqs_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FAQBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/faqs": {
      "get": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_faqs_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FAQBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Create",
        "operationId": "create_api_faqs_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/faqs/{faq_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_faqs__faq_id__get",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_faqs__faq_id__put",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_faqs__faq_id__patch",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_faq"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_faqs__faq_id__delete",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/faqs/all": {
      "get": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_faqs_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FAQBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/faqs": {
      "get": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_faqs_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FAQBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_faqs_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/faqs/{faq_id}": {
      "get": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_faqs__faq_id__get",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_faqs__faq_id__put",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_faqs__faq_id__patch",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FAQUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FAQBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_faq"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_faqs__faq_id__delete",
        "parameters": [
          {
            "name": "faq_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Faq Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks": {
      "get": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Lấy danh sách feedback theo bot_id (dùng cho dashboard)",
        "operationId": "get_feedbacks_by_bot_api_feedbacks_get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          },
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FeedbackBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Tạo feedback mới cho một câu hội thoại",
        "operationId": "create_feedback_api_feedbacks_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_feedbacks__feedback_id__get",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Xóa feedback",
        "operationId": "delete_feedback_api_feedbacks__feedback_id__delete",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/rate": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Đánh giá câu trả lời 👍 / 👎",
        "operationId": "rate_feedback_api_feedbacks__feedback_id__rate_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackRatingRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/save-to-faq": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Lưu câu trả lời đã chỉnh sửa vào FAQ (upsert theo question + bot_id)",
        "operationId": "save_to_faq_api_feedbacks__feedback_id__save_to_faq_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackSaveRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/report-dev": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Đánh dấu feedback cần Dev Team review",
        "operationId": "report_feedback_to_dev_api_feedbacks__feedback_id__report_dev_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackReportDevRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/mark-fixed": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Dev đánh dấu đã fix xong, chờ chủ DN xác nhận",
        "operationId": "mark_dev_fixed_api_feedbacks__feedback_id__mark_fixed_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/confirm-fix": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Chủ DN xác nhận đồng ý → feedback chuyển sang dismissed",
        "operationId": "confirm_fix_api_feedbacks__feedback_id__confirm_fix_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/feedbacks/{feedback_id}/dismiss": {
      "patch": {
        "tags": [
          "[Current] v1 - api_feedback"
        ],
        "summary": "Đánh dấu bỏ qua feedback này",
        "operationId": "dismiss_feedback_api_feedbacks__feedback_id__dismiss_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks": {
      "get": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Lấy danh sách feedback theo bot_id (dùng cho dashboard)",
        "operationId": "get_feedbacks_by_bot_api_v1_feedbacks_get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          },
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_FeedbackBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Tạo feedback mới cho một câu hội thoại",
        "operationId": "create_feedback_api_v1_feedbacks_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}": {
      "get": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_feedbacks__feedback_id__get",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Xóa feedback",
        "operationId": "delete_feedback_api_v1_feedbacks__feedback_id__delete",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/rate": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Đánh giá câu trả lời 👍 / 👎",
        "operationId": "rate_feedback_api_v1_feedbacks__feedback_id__rate_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackRatingRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/save-to-faq": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Lưu câu trả lời đã chỉnh sửa vào FAQ (upsert theo question + bot_id)",
        "operationId": "save_to_faq_api_v1_feedbacks__feedback_id__save_to_faq_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackSaveRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/report-dev": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Đánh dấu feedback cần Dev Team review",
        "operationId": "report_feedback_to_dev_api_v1_feedbacks__feedback_id__report_dev_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FeedbackReportDevRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/mark-fixed": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Dev đánh dấu đã fix xong, chờ chủ DN xác nhận",
        "operationId": "mark_dev_fixed_api_v1_feedbacks__feedback_id__mark_fixed_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/confirm-fix": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Chủ DN xác nhận đồng ý → feedback chuyển sang dismissed",
        "operationId": "confirm_fix_api_v1_feedbacks__feedback_id__confirm_fix_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/feedbacks/{feedback_id}/dismiss": {
      "patch": {
        "tags": [
          "v1 - api_feedback"
        ],
        "summary": "Đánh dấu bỏ qua feedback này",
        "operationId": "dismiss_feedback_api_v1_feedbacks__feedback_id__dismiss_patch",
        "parameters": [
          {
            "name": "feedback_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Feedback Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_FeedbackBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/goals/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_goals_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_GoalBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/goals": {
      "get": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_goals_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_GoalBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Create",
        "operationId": "create_api_goals_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/goals/{goal_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_goals__goal_id__get",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_goals__goal_id__put",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_goals__goal_id__patch",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_goal"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_goals__goal_id__delete",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/goals/all": {
      "get": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_goals_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_GoalBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/goals": {
      "get": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_goals_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_GoalBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_goals_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/goals/{goal_id}": {
      "get": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_goals__goal_id__get",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_goals__goal_id__put",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_goals__goal_id__patch",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/GoalUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_GoalBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_goal"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_goals__goal_id__delete",
        "parameters": [
          {
            "name": "goal_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Goal Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/conversations": {
      "get": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get Conversations",
        "description": "Lấy danh sách các cuộc trò chuyện của một brand.",
        "operationId": "get_conversations_api_inbox_conversations_get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InboxConversationListResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/messages": {
      "get": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get Messages",
        "description": "Lấy chi tiết tin nhắn của một cuộc trò chuyện.",
        "operationId": "get_messages_api_inbox_messages_get",
        "parameters": [
          {
            "name": "user_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InboxMessageListResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/takeover": {
      "post": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Takeover Conversation",
        "description": "Human agent can thiệp vào cuộc trò chuyện, bot sẽ im lặng.",
        "operationId": "takeover_conversation_api_inbox_takeover_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxTakeoverRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/resolve": {
      "post": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Resolve Conversation",
        "description": "Trả lại quyền trả lời cho AI bot.",
        "operationId": "resolve_conversation_api_inbox_resolve_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxResolveRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/reply": {
      "post": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Reply To User",
        "description": "Human agent gửi tin nhắn cho khách hàng.",
        "operationId": "reply_to_user_api_inbox_reply_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxReplyRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/inbox/conversations/{user_id}/{bot_id}/profile": {
      "get": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get User Profile",
        "description": "Lấy thông tin profile/CRM của người dùng.",
        "operationId": "get_user_profile_api_inbox_conversations__user_id___bot_id__profile_get",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Update User Profile",
        "description": "Nhân viên cập nhật thông tin profile/CRM của người dùng.",
        "operationId": "update_user_profile_api_inbox_conversations__user_id___bot_id__profile_put",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserProfileUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/conversations": {
      "get": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get Conversations",
        "description": "Lấy danh sách các cuộc trò chuyện của một brand.",
        "operationId": "get_conversations_api_v1_inbox_conversations_get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InboxConversationListResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/messages": {
      "get": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get Messages",
        "description": "Lấy chi tiết tin nhắn của một cuộc trò chuyện.",
        "operationId": "get_messages_api_v1_inbox_messages_get",
        "parameters": [
          {
            "name": "user_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InboxMessageListResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/takeover": {
      "post": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Takeover Conversation",
        "description": "Human agent can thiệp vào cuộc trò chuyện, bot sẽ im lặng.",
        "operationId": "takeover_conversation_api_v1_inbox_takeover_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxTakeoverRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/resolve": {
      "post": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Resolve Conversation",
        "description": "Trả lại quyền trả lời cho AI bot.",
        "operationId": "resolve_conversation_api_v1_inbox_resolve_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxResolveRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/reply": {
      "post": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Reply To User",
        "description": "Human agent gửi tin nhắn cho khách hàng.",
        "operationId": "reply_to_user_api_v1_inbox_reply_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InboxReplyRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {

                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/inbox/conversations/{user_id}/{bot_id}/profile": {
      "get": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Get User Profile",
        "description": "Lấy thông tin profile/CRM của người dùng.",
        "operationId": "get_user_profile_api_v1_inbox_conversations__user_id___bot_id__profile_get",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_inbox",
          "Inbox"
        ],
        "summary": "Update User Profile",
        "description": "Nhân viên cập nhật thông tin profile/CRM của người dùng.",
        "operationId": "update_user_profile_api_v1_inbox_conversations__user_id___bot_id__profile_put",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          },
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserProfileUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/intents/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_intents_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/intents": {
      "get": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_intents_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Create",
        "operationId": "create_api_intents_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/intents/by-bot/{bot_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Get By Bot Id",
        "operationId": "get_by_bot_id_api_intents_by_bot__bot_id__get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/intents/{intent_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_intents__intent_id__get",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_intents__intent_id__put",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_intents__intent_id__patch",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_intent"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_intents__intent_id__delete",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/intents/all": {
      "get": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_intents_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/intents": {
      "get": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_intents_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_intents_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/intents/by-bot/{bot_id}": {
      "get": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Get By Bot Id",
        "operationId": "get_by_bot_id_api_v1_intents_by_bot__bot_id__get",
        "parameters": [
          {
            "name": "bot_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Bot Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_IntentBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/intents/{intent_id}": {
      "get": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_intents__intent_id__get",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_intents__intent_id__put",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_intents__intent_id__patch",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/IntentUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_IntentBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_intent"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_intents__intent_id__delete",
        "parameters": [
          {
            "name": "intent_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Intent Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/search": {
      "post": {
        "tags": [
          "[Current] v1 - api_location"
        ],
        "summary": "Search",
        "operationId": "search_api_search_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SearchResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/search": {
      "post": {
        "tags": [
          "v1 - api_location"
        ],
        "summary": "Search",
        "operationId": "search_api_v1_search_post",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SearchRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SearchResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/longterms/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_longterms_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_LongTermBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/longterms": {
      "get": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_longterms_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_LongTermBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Create",
        "operationId": "create_api_longterms_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/longterms/{longterm_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_longterms__longterm_id__get",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_longterms__longterm_id__put",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_longterms__longterm_id__patch",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_longterm"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_longterms__longterm_id__delete",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/longterms/all": {
      "get": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_longterms_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_LongTermBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/longterms": {
      "get": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_longterms_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_LongTermBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_longterms_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/longterms/{longterm_id}": {
      "get": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_longterms__longterm_id__get",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_longterms__longterm_id__put",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_longterms__longterm_id__patch",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LongTermUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_LongTermBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_longterm"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_longterms__longterm_id__delete",
        "parameters": [
          {
            "name": "longterm_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Longterm Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/messages/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_messages_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_MessageBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/messages": {
      "get": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_messages_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_MessageBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Create",
        "operationId": "create_api_messages_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/messages/{message_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_messages__message_id__get",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_messages__message_id__put",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_messages__message_id__patch",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_message"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_messages__message_id__delete",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/messages/all": {
      "get": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_messages_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_MessageBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/messages": {
      "get": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_messages_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_MessageBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_messages_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/messages/{message_id}": {
      "get": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_messages__message_id__get",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_messages__message_id__put",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_messages__message_id__patch",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_MessageBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_message"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_messages__message_id__delete",
        "parameters": [
          {
            "name": "message_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Message Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_services_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_ServiceBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/services": {
      "get": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_services_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_ServiceBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Create",
        "operationId": "create_api_services_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services/{service_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_services__service_id__get",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_services__service_id__put",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_services__service_id__patch",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_service"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_services__service_id__delete",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services/all": {
      "get": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_services_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_ServiceBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services": {
      "get": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_services_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_ServiceBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_services_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services/{service_id}": {
      "get": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_services__service_id__get",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_services__service_id__put",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_services__service_id__patch",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ServiceUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_ServiceBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_service"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_services__service_id__delete",
        "parameters": [
          {
            "name": "service_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services-search/catalogs": {
      "get": {
        "tags": [
          "[Current] v1 - api_service_search"
        ],
        "summary": "Get Catalogs",
        "description": "Skill 1 — Danh sách danh mục:\nTrả về tất cả nhóm dịch vụ của brand. Dùng khi user hỏi chung chung.",
        "operationId": "get_catalogs_api_services_search_catalogs_get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Catalogs Api Services Search Catalogs Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services-search/by-catalog": {
      "get": {
        "tags": [
          "[Current] v1 - api_service_search"
        ],
        "summary": "Get Services By Catalog",
        "description": "Skill 2 — Dịch vụ theo danh mục:\nTrả về danh sách tóm tắt dịch vụ trong 1 nhóm. Dùng khi user hỏi về 1 loại cụ thể.\nHỗ trợ fuzzy match tên danh mục (không phân biệt dấu, viết tắt).",
        "operationId": "get_services_by_catalog_api_services_search_by_catalog_get",
        "parameters": [
          {
            "name": "catalog_name",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Name"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Services By Catalog Api Services Search By Catalog Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services-search/detail": {
      "get": {
        "tags": [
          "[Current] v1 - api_service_search"
        ],
        "summary": "Get Service Detail",
        "description": "Skill 3 — Chi tiết dịch vụ:\nTrả về thông tin đầy đủ (giá, mô tả, các gói) của 1 dịch vụ cụ thể.\nHỗ trợ fuzzy match tên. Nếu không tìm thấy, trả suggestions để bot hỏi lại user.",
        "operationId": "get_service_detail_api_services_search_detail_get",
        "parameters": [
          {
            "name": "service_name",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Name"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Service Detail Api Services Search Detail Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/services-search/documents": {
      "get": {
        "tags": [
          "[Current] v1 - api_service_search"
        ],
        "summary": "Search Documents Skill",
        "description": "Skill — Tìm kiếm tài liệu:\nTìm kiếm tài liệu, chính sách, quy trình trong knowledge base.\nTrả về message text tổng hợp để bot dùng trực tiếp.",
        "operationId": "search_documents_skill_api_services_search_documents_get",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Query"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Search Documents Skill Api Services Search Documents Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services-search/catalogs": {
      "get": {
        "tags": [
          "v1 - api_service_search"
        ],
        "summary": "Get Catalogs",
        "description": "Skill 1 — Danh sách danh mục:\nTrả về tất cả nhóm dịch vụ của brand. Dùng khi user hỏi chung chung.",
        "operationId": "get_catalogs_api_v1_services_search_catalogs_get",
        "parameters": [
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Catalogs Api V1 Services Search Catalogs Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services-search/by-catalog": {
      "get": {
        "tags": [
          "v1 - api_service_search"
        ],
        "summary": "Get Services By Catalog",
        "description": "Skill 2 — Dịch vụ theo danh mục:\nTrả về danh sách tóm tắt dịch vụ trong 1 nhóm. Dùng khi user hỏi về 1 loại cụ thể.\nHỗ trợ fuzzy match tên danh mục (không phân biệt dấu, viết tắt).",
        "operationId": "get_services_by_catalog_api_v1_services_search_by_catalog_get",
        "parameters": [
          {
            "name": "catalog_name",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Catalog Name"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Services By Catalog Api V1 Services Search By Catalog Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services-search/detail": {
      "get": {
        "tags": [
          "v1 - api_service_search"
        ],
        "summary": "Get Service Detail",
        "description": "Skill 3 — Chi tiết dịch vụ:\nTrả về thông tin đầy đủ (giá, mô tả, các gói) của 1 dịch vụ cụ thể.\nHỗ trợ fuzzy match tên. Nếu không tìm thấy, trả suggestions để bot hỏi lại user.",
        "operationId": "get_service_detail_api_v1_services_search_detail_get",
        "parameters": [
          {
            "name": "service_name",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Service Name"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Get Service Detail Api V1 Services Search Detail Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/services-search/documents": {
      "get": {
        "tags": [
          "v1 - api_service_search"
        ],
        "summary": "Search Documents Skill",
        "description": "Skill — Tìm kiếm tài liệu:\nTìm kiếm tài liệu, chính sách, quy trình trong knowledge base.\nTrả về message text tổng hợp để bot dùng trực tiếp.",
        "operationId": "search_documents_skill_api_v1_services_search_documents_get",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Query"
            }
          },
          {
            "name": "brand_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Brand Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "title": "Response Search Documents Skill Api V1 Services Search Documents Get"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/skills/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_skills_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_SkillBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/skills": {
      "get": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_skills_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_SkillBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Create",
        "operationId": "create_api_skills_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/skills/{skill_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_skills__skill_id__get",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_skills__skill_id__put",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_skills__skill_id__patch",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_skill"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_skills__skill_id__delete",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/skills/all": {
      "get": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_skills_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_SkillBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/skills": {
      "get": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_skills_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_SkillBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_skills_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/skills/{skill_id}": {
      "get": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_skills__skill_id__get",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_skills__skill_id__put",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Partial Update By Id",
        "operationId": "partial_update_by_id_api_v1_skills__skill_id__patch",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SkillUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_SkillBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_skill"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_skills__skill_id__delete",
        "parameters": [
          {
            "name": "skill_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Skill Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/test/hello-world": {
      "get": {
        "tags": [
          "[Current] v1 - api_test"
        ],
        "summary": "Get",
        "operationId": "get_api_test_hello_world_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "title": "Response Get Api Test Hello World Get"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/test/hello-world": {
      "get": {
        "tags": [
          "v1 - api_test"
        ],
        "summary": "Get",
        "operationId": "get_api_v1_test_hello_world_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "title": "Response Get Api V1 Test Hello World Get"
                }
              }
            }
          }
        }
      }
    },
    "/api/users/all": {
      "get": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_users_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_UserBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/users": {
      "get": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_users_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_UserBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Create",
        "operationId": "create_api_users_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/users/{user_id}": {
      "get": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_users__user_id__get",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_users__user_id__put",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_users__user_id__patch",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "[Current] v1 - api_user"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_users__user_id__delete",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/users/all": {
      "get": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Get All",
        "operationId": "get_all_api_v1_users_all_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_UserBaseResponse__"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/users": {
      "get": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Get By Filter",
        "operationId": "get_by_filter_api_v1_users_get",
        "parameters": [
          {
            "name": "sort_by",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "id",
              "title": "Sort By"
            }
          },
          {
            "name": "order",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "enum": [
                    "asc",
                    "desc"
                  ],
                  "type": "string"
                },
                {
                  "type": "null"
                }
              ],
              "default": "desc",
              "title": "Order"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 10,
              "title": "Page Size"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "anyOf": [
                {
                  "type": "integer"
                },
                {
                  "type": "null"
                }
              ],
              "default": 1,
              "title": "Page"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_List_UserBaseResponse__"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Create",
        "operationId": "create_api_v1_users_post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserCreateRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/users/{user_id}": {
      "get": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Get By Id",
        "operationId": "get_by_id_api_v1_users__user_id__get",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_users__user_id__put",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "patch": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Update By Id",
        "operationId": "update_by_id_api_v1_users__user_id__patch",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserUpdateRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DataResponse_UserBaseResponse_"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "v1 - api_user"
        ],
        "summary": "Delete By Id",
        "operationId": "delete_by_id_api_v1_users__user_id__delete",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "title": "User Id"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Successful Response"
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/api/v2/test/hello-world": {
      "get": {
        "tags": [
          "v2 - api_test"
        ],
        "summary": "Get",
        "operationId": "get_api_v2_test_hello_world_get",
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "title": "Response Get Api V2 Test Hello World Get"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "BaseResponse": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "BaseResponse"
      },
      "BotBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "language": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Language"
          },
          "role_prompt": {
            "type": "string",
            "title": "Role Prompt"
          },
          "temperature": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Temperature"
          },
          "max_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Tokens"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "working_hours": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Working Hours"
          },
          "timezone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timezone"
          },
          "crm_schema": {
            "anyOf": [
              {
                "items": {

                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Crm Schema"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "language",
          "role_prompt",
          "status"
        ],
        "title": "BotBaseResponse"
      },
      "BotCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "language": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Language"
          },
          "role_prompt": {
            "type": "string",
            "title": "Role Prompt"
          },
          "temperature": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Temperature"
          },
          "max_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Tokens"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status",
            "default": "active"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "working_hours": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Working Hours"
          },
          "timezone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timezone",
            "default": "Asia/Ho_Chi_Minh"
          },
          "crm_schema": {
            "anyOf": [
              {
                "items": {

                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Crm Schema"
          }
        },
        "type": "object",
        "required": [
          "name",
          "language",
          "role_prompt"
        ],
        "title": "BotCreateRequest"
      },
      "BotUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "language": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "role_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Role Prompt"
          },
          "temperature": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Temperature"
          },
          "max_tokens": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Max Tokens"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "working_hours": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Working Hours"
          },
          "timezone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timezone"
          },
          "crm_schema": {
            "anyOf": [
              {
                "items": {

                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Crm Schema"
          }
        },
        "type": "object",
        "title": "BotUpdateRequest"
      },
      "BranchBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "address": {
            "type": "string",
            "title": "Address"
          },
          "google_map_url": {
            "type": "string",
            "title": "Google Map Url"
          },
          "latitude": {
            "type": "string",
            "title": "Latitude"
          },
          "longitude": {
            "type": "string",
            "title": "Longitude"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "address",
          "google_map_url",
          "latitude",
          "longitude",
          "status"
        ],
        "title": "BranchBaseResponse"
      },
      "BranchCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "address": {
            "type": "string",
            "title": "Address"
          },
          "google_map_url": {
            "type": "string",
            "title": "Google Map Url"
          },
          "latitude": {
            "type": "string",
            "title": "Latitude"
          },
          "longitude": {
            "type": "string",
            "title": "Longitude"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status",
            "default": "active"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "address",
          "google_map_url",
          "latitude",
          "longitude"
        ],
        "title": "BranchCreateRequest"
      },
      "BranchUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "google_map_url": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Google Map Url"
          },
          "latitude": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Latitude"
          },
          "longitude": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Longitude"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          }
        },
        "type": "object",
        "title": "BranchUpdateRequest"
      },
      "BrandBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name"
        ],
        "title": "BrandBaseResponse"
      },
      "BrandCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          }
        },
        "type": "object",
        "required": [
          "name"
        ],
        "title": "BrandCreateRequest"
      },
      "BrandUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          }
        },
        "type": "object",
        "title": "BrandUpdateRequest"
      },
      "CatalogBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "category_name": {
            "type": "string",
            "title": "Category Name"
          },
          "service_ids": {
            "items": {

            },
            "type": "array",
            "title": "Service Ids"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "category_name",
          "service_ids",
          "brand_id"
        ],
        "title": "CatalogBaseResponse"
      },
      "CatalogCreateRequest": {
        "properties": {
          "category_name": {
            "type": "string",
            "title": "Category Name"
          },
          "service_ids": {
            "items": {

            },
            "type": "array",
            "title": "Service Ids"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          }
        },
        "type": "object",
        "required": [
          "category_name",
          "service_ids",
          "brand_id"
        ],
        "title": "CatalogCreateRequest"
      },
      "CatalogUpdateRequest": {
        "properties": {
          "category_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Category Name"
          },
          "service_ids": {
            "anyOf": [
              {
                "items": {

                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Service Ids"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          }
        },
        "type": "object",
        "title": "CatalogUpdateRequest"
      },
      "ChatRequest": {
        "properties": {
          "user": {
            "$ref": "#/components/schemas/UserInfo",
            "description": "Information about the user"
          },
          "history": {
            "anyOf": [
              {
                "items": {
                  "additionalProperties": true,
                  "type": "object"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "History",
            "description": "Chat history between the user and the bot (Optional, now managed on server)"
          },
          "message": {
            "type": "string",
            "title": "Message"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          },
          "payload": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Payload",
            "description": "Additional data for processing the chat"
          }
        },
        "type": "object",
        "required": [
          "user",
          "message",
          "bot_id",
          "brand_id"
        ],
        "title": "ChatRequest"
      },
      "ChatResponse": {
        "properties": {
          "response": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Response"
          },
          "reasoning": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Reasoning"
              },
              {
                "type": "null"
              }
            ]
          },
          "giai_thich": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/Explainability"
              },
              {
                "type": "null"
              }
            ]
          },
          "rewritten_question": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rewritten Question"
          },
          "rewritten_question_reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rewritten Question Reason"
          },
          "answer_reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Answer Reason"
          },
          "skill_calls": {
            "items": {
              "$ref": "#/components/schemas/SkillCallInfo"
            },
            "type": "array",
            "title": "Skill Calls"
          },
          "completed_goals": {
            "items": {
              "$ref": "#/components/schemas/CompletedGoal"
            },
            "type": "array",
            "title": "Completed Goals"
          },
          "message_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message Id"
          },
          "user_message_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "User Message Id"
          }
        },
        "type": "object",
        "required": [
          "response"
        ],
        "title": "ChatResponse"
      },
      "CompletedGoal": {
        "properties": {
          "goal_id": {
            "type": "string",
            "title": "Goal Id"
          },
          "goal_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Goal Name"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          }
        },
        "type": "object",
        "required": [
          "goal_id"
        ],
        "title": "CompletedGoal"
      },
      "DataResponse_BotBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/BotBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[BotBaseResponse]"
      },
      "DataResponse_BranchBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/BranchBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[BranchBaseResponse]"
      },
      "DataResponse_BrandBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/BrandBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[BrandBaseResponse]"
      },
      "DataResponse_CatalogBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/CatalogBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[CatalogBaseResponse]"
      },
      "DataResponse_DocumentBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/DocumentBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[DocumentBaseResponse]"
      },
      "DataResponse_FAQBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/FAQBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[FAQBaseResponse]"
      },
      "DataResponse_FeedbackBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/FeedbackBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[FeedbackBaseResponse]"
      },
      "DataResponse_GoalBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/GoalBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[GoalBaseResponse]"
      },
      "DataResponse_IntentBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/IntentBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[IntentBaseResponse]"
      },
      "DataResponse_List_BotBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/BotBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[BotBaseResponse]]"
      },
      "DataResponse_List_BranchBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/BranchBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[BranchBaseResponse]]"
      },
      "DataResponse_List_BrandBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/BrandBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[BrandBaseResponse]]"
      },
      "DataResponse_List_CatalogBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/CatalogBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[CatalogBaseResponse]]"
      },
      "DataResponse_List_DocumentBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/DocumentBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[DocumentBaseResponse]]"
      },
      "DataResponse_List_DocumentSearchHitResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/DocumentSearchHitResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[DocumentSearchHitResponse]]"
      },
      "DataResponse_List_FAQBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/FAQBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[FAQBaseResponse]]"
      },
      "DataResponse_List_FeedbackBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/FeedbackBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[FeedbackBaseResponse]]"
      },
      "DataResponse_List_GoalBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/GoalBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[GoalBaseResponse]]"
      },
      "DataResponse_List_IntentBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/IntentBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[IntentBaseResponse]]"
      },
      "DataResponse_List_LongTermBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/LongTermBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[LongTermBaseResponse]]"
      },
      "DataResponse_List_MessageBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/MessageBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[MessageBaseResponse]]"
      },
      "DataResponse_List_ServiceBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/ServiceBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[ServiceBaseResponse]]"
      },
      "DataResponse_List_SkillBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/SkillBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[SkillBaseResponse]]"
      },
      "DataResponse_List_UserBaseResponse__": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "items": {
                  "$ref": "#/components/schemas/UserBaseResponse"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Data"
          }
        },
        "type": "object",
        "title": "DataResponse[List[UserBaseResponse]]"
      },
      "DataResponse_LongTermBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/LongTermBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[LongTermBaseResponse]"
      },
      "DataResponse_MessageBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MessageBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[MessageBaseResponse]"
      },
      "DataResponse_SearchResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SearchResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[SearchResponse]"
      },
      "DataResponse_ServiceBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/ServiceBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[ServiceBaseResponse]"
      },
      "DataResponse_SkillBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SkillBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[SkillBaseResponse]"
      },
      "DataResponse_TokenResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/TokenResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[TokenResponse]"
      },
      "DataResponse_UserBaseResponse_": {
        "properties": {
          "http_code": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Http Code",
            "default": 200
          },
          "success": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Success",
            "default": true
          },
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "metadata": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/MetadataResponse"
              },
              {
                "type": "null"
              }
            ]
          },
          "data": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/UserBaseResponse"
              },
              {
                "type": "null"
              }
            ]
          }
        },
        "type": "object",
        "title": "DataResponse[UserBaseResponse]"
      },
      "DocumentBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "title": {
            "type": "string",
            "title": "Title"
          },
          "page_content": {
            "type": "string",
            "title": "Page Content"
          },
          "meta_data": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Meta Data"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "title",
          "page_content",
          "brand_id"
        ],
        "title": "DocumentBaseResponse"
      },
      "DocumentCreateRequest": {
        "properties": {
          "title": {
            "type": "string",
            "title": "Title"
          },
          "page_content": {
            "type": "string",
            "title": "Page Content"
          },
          "meta_data": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Meta Data"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "title",
          "page_content",
          "brand_id"
        ],
        "title": "DocumentCreateRequest"
      },
      "DocumentSearchHitResponse": {
        "properties": {
          "id": {
            "title": "Id"
          },
          "score": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Score"
          },
          "text": {
            "type": "string",
            "title": "Text"
          },
          "metadata": {
            "additionalProperties": true,
            "type": "object",
            "title": "Metadata",
            "default": {

            }
          },
          "payload": {
            "additionalProperties": true,
            "type": "object",
            "title": "Payload",
            "default": {

            }
          }
        },
        "type": "object",
        "required": [
          "id",
          "text"
        ],
        "title": "DocumentSearchHitResponse"
      },
      "DocumentSearchRequest": {
        "properties": {
          "question": {
            "type": "string",
            "title": "Question"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          },
          "limit": {
            "type": "integer",
            "title": "Limit",
            "default": 5
          },
          "score_threshold": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Score Threshold"
          },
          "metadata_filter": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata Filter"
          }
        },
        "type": "object",
        "required": [
          "question",
          "brand_id"
        ],
        "title": "DocumentSearchRequest"
      },
      "DocumentUpdateRequest": {
        "properties": {
          "title": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Title"
          },
          "page_content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Page Content"
          },
          "meta_data": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Meta Data"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          }
        },
        "type": "object",
        "title": "DocumentUpdateRequest"
      },
      "EvidenceDoc": {
        "properties": {
          "title": {
            "type": "string",
            "title": "Title"
          },
          "content": {
            "type": "string",
            "title": "Content"
          }
        },
        "type": "object",
        "required": [
          "title",
          "content"
        ],
        "title": "EvidenceDoc"
      },
      "Explainability": {
        "properties": {
          "tai_lieu_lay_ra": {
            "items": {
              "$ref": "#/components/schemas/EvidenceDoc"
            },
            "type": "array",
            "title": "Tai Lieu Lay Ra"
          },
          "tai_lieu_su_dung": {
            "items": {
              "$ref": "#/components/schemas/EvidenceDoc"
            },
            "type": "array",
            "title": "Tai Lieu Su Dung"
          }
        },
        "type": "object",
        "title": "Explainability"
      },
      "FAQBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "question": {
            "type": "string",
            "title": "Question"
          },
          "answer": {
            "type": "string",
            "title": "Answer"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "question",
          "answer",
          "bot_id"
        ],
        "title": "FAQBaseResponse"
      },
      "FAQCreateRequest": {
        "properties": {
          "question": {
            "type": "string",
            "title": "Question"
          },
          "answer": {
            "type": "string",
            "title": "Answer"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "question",
          "answer",
          "bot_id"
        ],
        "title": "FAQCreateRequest"
      },
      "FAQUpdateRequest": {
        "properties": {
          "question": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Question"
          },
          "answer": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Answer"
          },
          "bot_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Bot Id"
          }
        },
        "type": "object",
        "title": "FAQUpdateRequest"
      },
      "FeedbackBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "message_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message Id"
          },
          "original_question": {
            "type": "string",
            "title": "Original Question"
          },
          "original_answer": {
            "type": "string",
            "title": "Original Answer"
          },
          "corrected_answer": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Corrected Answer"
          },
          "rating": {
            "type": "string",
            "title": "Rating"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "faq_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Faq Id"
          },
          "note": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Note"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "bot_id",
          "original_question",
          "original_answer",
          "rating",
          "status"
        ],
        "title": "FeedbackBaseResponse"
      },
      "FeedbackCreateRequest": {
        "properties": {
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "message_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message Id"
          },
          "original_question": {
            "type": "string",
            "title": "Original Question"
          },
          "original_answer": {
            "type": "string",
            "title": "Original Answer"
          },
          "rating": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rating",
            "default": "pending"
          },
          "note": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Note"
          }
        },
        "type": "object",
        "required": [
          "bot_id",
          "original_question",
          "original_answer"
        ],
        "title": "FeedbackCreateRequest"
      },
      "FeedbackRatingRequest": {
        "properties": {
          "rating": {
            "type": "string",
            "title": "Rating"
          }
        },
        "type": "object",
        "required": [
          "rating"
        ],
        "title": "FeedbackRatingRequest",
        "description": "Chỉ cập nhật rating 👍/👎"
      },
      "FeedbackReportDevRequest": {
        "properties": {
          "note": {
            "type": "string",
            "title": "Note"
          }
        },
        "type": "object",
        "required": [
          "note"
        ],
        "title": "FeedbackReportDevRequest",
        "description": "Gửi feedback cho Dev Team review"
      },
      "FeedbackSaveRequest": {
        "properties": {
          "corrected_answer": {
            "type": "string",
            "title": "Corrected Answer"
          },
          "note": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Note"
          }
        },
        "type": "object",
        "required": [
          "corrected_answer"
        ],
        "title": "FeedbackSaveRequest",
        "description": "Lưu câu trả lời đã chỉnh sửa vào FAQ"
      },
      "GoalBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "script": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Script"
          },
          "intent_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Intent Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "rule": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rule"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "description",
          "bot_id"
        ],
        "title": "GoalBaseResponse"
      },
      "GoalCandidate": {
        "properties": {
          "goal_id": {
            "type": "string",
            "title": "Goal Id"
          },
          "goal_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Goal Name"
          },
          "confidence": {
            "type": "integer",
            "title": "Confidence"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          }
        },
        "type": "object",
        "required": [
          "goal_id",
          "confidence"
        ],
        "title": "GoalCandidate"
      },
      "GoalCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "script": {
            "type": "string",
            "title": "Script"
          },
          "intent_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Intent Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          },
          "rule": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rule"
          }
        },
        "type": "object",
        "required": [
          "name",
          "description",
          "script",
          "bot_id"
        ],
        "title": "GoalCreateRequest"
      },
      "GoalReasoning": {
        "properties": {
          "ids": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Ids"
          },
          "names": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Names"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          },
          "thought": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Thought"
          },
          "confidence": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Confidence"
          }
        },
        "type": "object",
        "title": "GoalReasoning"
      },
      "GoalUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "script": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Script"
          },
          "intent_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Intent Id"
          },
          "bot_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Bot Id"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          },
          "rule": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Rule"
          }
        },
        "type": "object",
        "title": "GoalUpdateRequest"
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "InboxConversationItem": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "user_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "User Name"
          },
          "last_message_content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Message Content"
          },
          "last_message_time": {
            "anyOf": [
              {
                "type": "string",
                "format": "date-time"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Message Time"
          },
          "is_read": {
            "type": "boolean",
            "title": "Is Read",
            "default": false
          },
          "is_human_takeover": {
            "type": "boolean",
            "title": "Is Human Takeover",
            "default": false
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "InboxConversationItem"
      },
      "InboxConversationListResponse": {
        "properties": {
          "data": {
            "items": {
              "$ref": "#/components/schemas/InboxConversationItem"
            },
            "type": "array",
            "title": "Data"
          }
        },
        "type": "object",
        "required": [
          "data"
        ],
        "title": "InboxConversationListResponse"
      },
      "InboxMessageItem": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "content": {
            "type": "string",
            "title": "Content"
          },
          "sender_type": {
            "type": "string",
            "title": "Sender Type"
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "title": "Created At"
          },
          "is_read": {
            "type": "boolean",
            "title": "Is Read"
          }
        },
        "type": "object",
        "required": [
          "id",
          "content",
          "sender_type",
          "created_at",
          "is_read"
        ],
        "title": "InboxMessageItem"
      },
      "InboxMessageListResponse": {
        "properties": {
          "data": {
            "items": {
              "$ref": "#/components/schemas/InboxMessageItem"
            },
            "type": "array",
            "title": "Data"
          }
        },
        "type": "object",
        "required": [
          "data"
        ],
        "title": "InboxMessageListResponse"
      },
      "InboxReplyRequest": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "content": {
            "type": "string",
            "title": "Content"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id",
          "content"
        ],
        "title": "InboxReplyRequest"
      },
      "InboxResolveRequest": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "InboxResolveRequest"
      },
      "InboxTakeoverRequest": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "InboxTakeoverRequest"
      },
      "IntentBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          },
          "example": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Example"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "description",
          "bot_id"
        ],
        "title": "IntentBaseResponse"
      },
      "IntentCandidate": {
        "properties": {
          "intent_id": {
            "type": "string",
            "title": "Intent Id"
          },
          "intent_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Intent Name"
          },
          "confidence": {
            "type": "integer",
            "title": "Confidence"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          }
        },
        "type": "object",
        "required": [
          "intent_id",
          "confidence"
        ],
        "title": "IntentCandidate"
      },
      "IntentCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          },
          "example": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Example"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "description",
          "bot_id"
        ],
        "title": "IntentCreateRequest"
      },
      "IntentReasoning": {
        "properties": {
          "id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          },
          "thought": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Thought"
          },
          "confidence": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Confidence"
          }
        },
        "type": "object",
        "title": "IntentReasoning"
      },
      "IntentUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "target_goal": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Target Goal"
          },
          "example": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Example"
          },
          "bot_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Bot Id"
          }
        },
        "type": "object",
        "title": "IntentUpdateRequest"
      },
      "LoginRequest": {
        "properties": {
          "username": {
            "type": "string",
            "title": "Username"
          },
          "password": {
            "type": "string",
            "title": "Password"
          }
        },
        "type": "object",
        "required": [
          "username",
          "password"
        ],
        "title": "LoginRequest"
      },
      "LongTermBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "user_id",
          "bot_id"
        ],
        "title": "LongTermBaseResponse"
      },
      "LongTermCreateRequest": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "LongTermCreateRequest"
      },
      "LongTermUpdateRequest": {
        "properties": {
          "user_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "User Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "bot_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Bot Id"
          }
        },
        "type": "object",
        "title": "LongTermUpdateRequest"
      },
      "MessageBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "content": {
            "type": "string",
            "title": "Content"
          },
          "sender_type": {
            "$ref": "#/components/schemas/SenderType"
          },
          "metadata_info": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata Info"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "content",
          "sender_type"
        ],
        "title": "MessageBaseResponse"
      },
      "MessageCreateRequest": {
        "properties": {
          "content": {
            "type": "string",
            "title": "Content"
          },
          "sender_type": {
            "$ref": "#/components/schemas/SenderType"
          },
          "metadata_info": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata Info"
          }
        },
        "type": "object",
        "required": [
          "content",
          "sender_type"
        ],
        "title": "MessageCreateRequest"
      },
      "MessageUpdateRequest": {
        "properties": {
          "content": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Content"
          },
          "sender_type": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/SenderType"
              },
              {
                "type": "null"
              }
            ]
          },
          "metadata_info": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Metadata Info"
          }
        },
        "type": "object",
        "title": "MessageUpdateRequest"
      },
      "MetadataResponse": {
        "properties": {
          "page": {
            "type": "integer",
            "title": "Page"
          },
          "page_size": {
            "type": "integer",
            "title": "Page Size"
          },
          "total": {
            "type": "integer",
            "title": "Total"
          }
        },
        "type": "object",
        "required": [
          "page",
          "page_size",
          "total"
        ],
        "title": "MetadataResponse"
      },
      "Reasoning": {
        "properties": {
          "intent": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/IntentReasoning"
              },
              {
                "type": "null"
              }
            ]
          },
          "goal": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/GoalReasoning"
              },
              {
                "type": "null"
              }
            ]
          },
          "intent_khac": {
            "items": {
              "$ref": "#/components/schemas/IntentCandidate"
            },
            "type": "array",
            "title": "Intent Khac"
          },
          "goal_khac": {
            "items": {
              "$ref": "#/components/schemas/GoalCandidate"
            },
            "type": "array",
            "title": "Goal Khac"
          }
        },
        "type": "object",
        "title": "Reasoning"
      },
      "RegisterRequest": {
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "username": {
            "type": "string",
            "title": "Username"
          },
          "password": {
            "type": "string",
            "title": "Password"
          },
          "dob": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Dob"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "first_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "First Name"
          },
          "last_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Name"
          },
          "full_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Full Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "identity_card": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card"
          },
          "identity_card_date": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Date"
          },
          "identity_card_place": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Place"
          }
        },
        "type": "object",
        "required": [
          "email",
          "username",
          "password",
          "dob",
          "gender",
          "first_name",
          "last_name",
          "full_name",
          "phone",
          "address",
          "identity_card",
          "identity_card_date",
          "identity_card_place"
        ],
        "title": "RegisterRequest"
      },
      "ResetSessionRequest": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id",
            "description": "ID của người dùng cần reset"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id",
            "description": "ID của bot liên kết"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "ResetSessionRequest"
      },
      "SearchRequest": {
        "properties": {
          "address": {
            "type": "string",
            "title": "Address"
          },
          "search_formation": {
            "type": "string",
            "enum": [
              "nearest",
              "in_area"
            ],
            "title": "Search Formation",
            "default": "nearest"
          }
        },
        "type": "object",
        "required": [
          "address"
        ],
        "title": "SearchRequest"
      },
      "SearchResponse": {
        "properties": {
          "message": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Message"
          },
          "user_location": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "User Location"
          },
          "stores": {
            "items": {
              "$ref": "#/components/schemas/Store"
            },
            "type": "array",
            "title": "Stores"
          },
          "distance_km": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Distance Km"
          }
        },
        "type": "object",
        "required": [
          "stores"
        ],
        "title": "SearchResponse"
      },
      "SenderType": {
        "type": "string",
        "enum": [
          "user",
          "ai",
          "human_agent"
        ],
        "title": "SenderType"
      },
      "ServiceBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "service_metadata": {
            "title": "Service Metadata"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "branch_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Branch Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "description",
          "service_metadata",
          "status"
        ],
        "title": "ServiceBaseResponse"
      },
      "ServiceCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "type": "string",
            "title": "Description"
          },
          "service_metadata": {
            "title": "Service Metadata"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status",
            "default": "active"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "branch_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Branch Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "description",
          "service_metadata"
        ],
        "title": "ServiceCreateRequest"
      },
      "ServiceUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "service_metadata": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Service Metadata"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          },
          "branch_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Branch Id"
          }
        },
        "type": "object",
        "title": "ServiceUpdateRequest"
      },
      "SkillBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "endpoint": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Endpoint"
          },
          "method": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Method"
          },
          "parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Parameters"
          },
          "fixed_parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Fixed Parameters"
          },
          "headers": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Headers"
          },
          "is_active": {
            "type": "boolean",
            "title": "Is Active"
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "name",
          "is_active",
          "brand_id"
        ],
        "title": "SkillBaseResponse"
      },
      "SkillCallInfo": {
        "properties": {
          "skill_name": {
            "type": "string",
            "title": "Skill Name"
          },
          "reason": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Reason"
          },
          "confidence": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Confidence"
          },
          "status": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Status"
          },
          "skipped": {
            "type": "boolean",
            "title": "Skipped",
            "default": false
          }
        },
        "type": "object",
        "required": [
          "skill_name"
        ],
        "title": "SkillCallInfo"
      },
      "SkillCreateRequest": {
        "properties": {
          "name": {
            "type": "string",
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "endpoint": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Endpoint"
          },
          "method": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Method"
          },
          "parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Parameters"
          },
          "fixed_parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Fixed Parameters"
          },
          "headers": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Headers"
          },
          "is_active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Active",
            "default": true
          },
          "brand_id": {
            "type": "string",
            "title": "Brand Id"
          }
        },
        "type": "object",
        "required": [
          "name",
          "brand_id"
        ],
        "title": "SkillCreateRequest"
      },
      "SkillUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "endpoint": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Endpoint"
          },
          "method": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Method"
          },
          "parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Parameters"
          },
          "fixed_parameters": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Fixed Parameters"
          },
          "headers": {
            "anyOf": [
              {

              },
              {
                "type": "null"
              }
            ],
            "title": "Headers"
          },
          "is_active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Active"
          },
          "brand_id": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Brand Id"
          }
        },
        "type": "object",
        "title": "SkillUpdateRequest"
      },
      "Store": {
        "properties": {
          "idStore": {
            "type": "integer",
            "title": "Idstore"
          },
          "province": {
            "type": "string",
            "title": "Province"
          },
          "address": {
            "type": "string",
            "title": "Address"
          },
          "storeImage": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Storeimage"
          },
          "mapUrl": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mapurl"
          },
          "latitude": {
            "type": "number",
            "title": "Latitude"
          },
          "longitude": {
            "type": "number",
            "title": "Longitude"
          },
          "active": {
            "type": "boolean",
            "title": "Active"
          },
          "under": {
            "type": "boolean",
            "title": "Under"
          },
          "businessLicense": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Businesslicense"
          },
          "timeOpenClose": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Timeopenclose"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "nameTypeStore": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Nametypestore"
          }
        },
        "type": "object",
        "required": [
          "idStore",
          "province",
          "address",
          "latitude",
          "longitude",
          "active",
          "under"
        ],
        "title": "Store"
      },
      "TokenResponse": {
        "properties": {
          "access_token": {
            "type": "string",
            "title": "Access Token"
          },
          "expires_in": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Expires In",
            "default": 604800
          },
          "refresh_expires_in": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Refresh Expires In",
            "default": 604800
          },
          "token_type": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Token Type",
            "default": "Bearer"
          }
        },
        "type": "object",
        "required": [
          "access_token"
        ],
        "title": "TokenResponse"
      },
      "UserBaseResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "created_at": {
            "type": "number",
            "title": "Created At"
          },
          "updated_at": {
            "type": "number",
            "title": "Updated At"
          },
          "sso_key": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Sso Key"
          },
          "username": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Username"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "dob": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Dob"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "first_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "First Name"
          },
          "last_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Name"
          },
          "full_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Full Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "identity_card": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card"
          },
          "identity_card_date": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Date"
          },
          "identity_card_place": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Place"
          },
          "is_active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Active"
          },
          "last_login": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Login"
          },
          "roles": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Roles"
          }
        },
        "type": "object",
        "required": [
          "id",
          "created_at",
          "updated_at",
          "email",
          "roles"
        ],
        "title": "UserBaseResponse"
      },
      "UserCreateRequest": {
        "properties": {
          "password": {
            "type": "string",
            "title": "Password"
          },
          "dob": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Dob"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "first_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "First Name"
          },
          "last_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Name"
          },
          "full_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Full Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "identity_card": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card"
          },
          "identity_card_date": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Date"
          },
          "identity_card_place": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Place"
          },
          "username": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Username"
          },
          "email": {
            "type": "string",
            "format": "email",
            "title": "Email"
          },
          "is_active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Active",
            "default": true
          },
          "roles": {
            "items": {
              "type": "string"
            },
            "type": "array",
            "title": "Roles",
            "default": [
              "Guest"
            ]
          }
        },
        "type": "object",
        "required": [
          "password",
          "username",
          "email"
        ],
        "title": "UserCreateRequest"
      },
      "UserInfo": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id",
            "description": "Unique identifier for the user"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name",
            "description": "Name of the user"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone",
            "description": "Phone number of the user"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description",
            "description": "Description of the user"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender",
            "description": "Gender of the user"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language",
            "description": "Language of the user"
          }
        },
        "type": "object",
        "required": [
          "user_id"
        ],
        "title": "UserInfo"
      },
      "UserProfileResponse": {
        "properties": {
          "user_id": {
            "type": "string",
            "title": "User Id"
          },
          "bot_id": {
            "type": "string",
            "title": "Bot Id"
          },
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "extra_data": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Extra Data"
          }
        },
        "type": "object",
        "required": [
          "user_id",
          "bot_id"
        ],
        "title": "UserProfileResponse"
      },
      "UserProfileUpdateRequest": {
        "properties": {
          "name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "description": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Description"
          },
          "language": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Language"
          },
          "extra_data": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Extra Data"
          }
        },
        "type": "object",
        "title": "UserProfileUpdateRequest"
      },
      "UserUpdateRequest": {
        "properties": {
          "password": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Password"
          },
          "dob": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Dob"
          },
          "gender": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Gender"
          },
          "first_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "First Name"
          },
          "last_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Last Name"
          },
          "full_name": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Full Name"
          },
          "phone": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Phone"
          },
          "address": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Address"
          },
          "identity_card": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card"
          },
          "identity_card_date": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Date"
          },
          "identity_card_place": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Identity Card Place"
          },
          "is_active": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Is Active"
          },
          "roles": {
            "anyOf": [
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              },
              {
                "type": "null"
              }
            ],
            "title": "Roles"
          }
        },
        "type": "object",
        "title": "UserUpdateRequest"
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      }
    }
  }
}