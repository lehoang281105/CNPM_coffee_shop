---
title: BOT_AGENT
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# BOT_AGENT

        Base frame with FastAPI micro framework + Postgresql
            - Login/Register with JWT
            - Permission
            - CRUD User
            - Unit testing with Pytest
            - Dockerize
        

Base URLs:

# Authentication

# [Current] Health Check

<a id="opIdget_api_health_check_get"></a>

## GET Get

GET /api/health-check

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[BaseResponse](#schemabaseresponse)|

# [Current] Auth

<a id="opIdlogin_basic_api_auth_login_post"></a>

## POST Login Basic

POST /api/auth/login

> Body Parameters

```json
{
  "username": "string",
  "password": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)| yes | LoginRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "access_token": "string",
    "expires_in": 604800,
    "refresh_expires_in": 604800,
    "token_type": "Bearer"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_TokenResponse_](#schemadataresponse_tokenresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdlogin_keycloak_api_auth_login_keycloak_post"></a>

## POST Login Keycloak

POST /api/auth/login-keycloak

> Body Parameters

```json
{
  "username": "string",
  "password": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[LoginRequest](#schemaloginrequest)| yes | LoginRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "access_token": "string",
    "expires_in": 604800,
    "refresh_expires_in": 604800,
    "token_type": "Bearer"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_TokenResponse_](#schemadataresponse_tokenresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdregister_api_auth_register_post"></a>

## POST Register

POST /api/auth/register

> Body Parameters

```json
{
  "email": "user@example.com",
  "username": "string",
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[RegisterRequest](#schemaregisterrequest)| yes | RegisterRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_bot

<a id="opIdget_all_api_bots_all_get"></a>

## GET Get All

GET /api/bots/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "language": [
        "string"
      ],
      "role_prompt": "string",
      "temperature": 0,
      "max_tokens": 0,
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BotBaseResponse__](#schemadataresponse_list_botbaseresponse__)|

<a id="opIdget_by_filter_api_bots_get"></a>

## GET Get By Filter

GET /api/bots

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "language": [
        "string"
      ],
      "role_prompt": "string",
      "temperature": 0,
      "max_tokens": 0,
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BotBaseResponse__](#schemadataresponse_list_botbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_bots_post"></a>

## POST Create

POST /api/bots

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "active",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BotCreateRequest](#schemabotcreaterequest)| yes | BotCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_bots__bot_id__get"></a>

## GET Get By Id

GET /api/bots/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_bots__bot_id__put"></a>

## PUT Update By Id

PUT /api/bots/{bot_id}

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|
|body|body|[BotUpdateRequest](#schemabotupdaterequest)| yes | BotUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_bots__bot_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/bots/{bot_id}

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|
|body|body|[BotUpdateRequest](#schemabotupdaterequest)| yes | BotUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_bots__bot_id__delete"></a>

## DELETE Delete By Id

DELETE /api/bots/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_bot

<a id="opIdget_all_api_v1_bots_all_get"></a>

## GET Get All

GET /api/v1/bots/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "language": [
        "string"
      ],
      "role_prompt": "string",
      "temperature": 0,
      "max_tokens": 0,
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BotBaseResponse__](#schemadataresponse_list_botbaseresponse__)|

<a id="opIdget_by_filter_api_v1_bots_get"></a>

## GET Get By Filter

GET /api/v1/bots

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "language": [
        "string"
      ],
      "role_prompt": "string",
      "temperature": 0,
      "max_tokens": 0,
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BotBaseResponse__](#schemadataresponse_list_botbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_bots_post"></a>

## POST Create

POST /api/v1/bots

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "active",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BotCreateRequest](#schemabotcreaterequest)| yes | BotCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_bots__bot_id__get"></a>

## GET Get By Id

GET /api/v1/bots/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_bots__bot_id__put"></a>

## PUT Update By Id

PUT /api/v1/bots/{bot_id}

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|
|body|body|[BotUpdateRequest](#schemabotupdaterequest)| yes | BotUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_bots__bot_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/bots/{bot_id}

> Body Parameters

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|
|body|body|[BotUpdateRequest](#schemabotupdaterequest)| yes | BotUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BotBaseResponse_](#schemadataresponse_botbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_bots__bot_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/bots/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_branch

<a id="opIdget_all_api_branches_all_get"></a>

## GET Get All

GET /api/branches/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "address": "string",
      "google_map_url": "string",
      "latitude": "string",
      "longitude": "string",
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BranchBaseResponse__](#schemadataresponse_list_branchbaseresponse__)|

<a id="opIdget_by_filter_api_branches_get"></a>

## GET Get By Filter

GET /api/branches

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "address": "string",
      "google_map_url": "string",
      "latitude": "string",
      "longitude": "string",
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BranchBaseResponse__](#schemadataresponse_list_branchbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_branches_post"></a>

## POST Create

POST /api/branches

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "active",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BranchCreateRequest](#schemabranchcreaterequest)| yes | BranchCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_branches__branch_id__get"></a>

## GET Get By Id

GET /api/branches/{branch_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_branches__branch_id__put"></a>

## PUT Update By Id

PUT /api/branches/{branch_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|
|body|body|[BranchUpdateRequest](#schemabranchupdaterequest)| yes | BranchUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_branches__branch_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/branches/{branch_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|
|body|body|[BranchUpdateRequest](#schemabranchupdaterequest)| yes | BranchUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_branches__branch_id__delete"></a>

## DELETE Delete By Id

DELETE /api/branches/{branch_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_branch

<a id="opIdget_all_api_v1_branches_all_get"></a>

## GET Get All

GET /api/v1/branches/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "address": "string",
      "google_map_url": "string",
      "latitude": "string",
      "longitude": "string",
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BranchBaseResponse__](#schemadataresponse_list_branchbaseresponse__)|

<a id="opIdget_by_filter_api_v1_branches_get"></a>

## GET Get By Filter

GET /api/v1/branches

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "address": "string",
      "google_map_url": "string",
      "latitude": "string",
      "longitude": "string",
      "status": "string",
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BranchBaseResponse__](#schemadataresponse_list_branchbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_branches_post"></a>

## POST Create

POST /api/v1/branches

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "active",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BranchCreateRequest](#schemabranchcreaterequest)| yes | BranchCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_branches__branch_id__get"></a>

## GET Get By Id

GET /api/v1/branches/{branch_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_branches__branch_id__put"></a>

## PUT Update By Id

PUT /api/v1/branches/{branch_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|
|body|body|[BranchUpdateRequest](#schemabranchupdaterequest)| yes | BranchUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_branches__branch_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/branches/{branch_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|
|body|body|[BranchUpdateRequest](#schemabranchupdaterequest)| yes | BranchUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BranchBaseResponse_](#schemadataresponse_branchbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_branches__branch_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/branches/{branch_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|branch_id|path|string| yes | Branch Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_brand

<a id="opIdget_all_api_brands_all_get"></a>

## GET Get All

GET /api/brands/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BrandBaseResponse__](#schemadataresponse_list_brandbaseresponse__)|

<a id="opIdget_by_filter_api_brands_get"></a>

## GET Get By Filter

GET /api/brands

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BrandBaseResponse__](#schemadataresponse_list_brandbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_brands_post"></a>

## POST Create

POST /api/brands

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BrandCreateRequest](#schemabrandcreaterequest)| yes | BrandCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_brands__brand_id__get"></a>

## GET Get By Id

GET /api/brands/{brand_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_brands__brand_id__put"></a>

## PUT Update By Id

PUT /api/brands/{brand_id}

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|
|body|body|[BrandUpdateRequest](#schemabrandupdaterequest)| yes | BrandUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_brands__brand_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/brands/{brand_id}

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|
|body|body|[BrandUpdateRequest](#schemabrandupdaterequest)| yes | BrandUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_brands__brand_id__delete"></a>

## DELETE Delete By Id

DELETE /api/brands/{brand_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_brand

<a id="opIdget_all_api_v1_brands_all_get"></a>

## GET Get All

GET /api/v1/brands/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BrandBaseResponse__](#schemadataresponse_list_brandbaseresponse__)|

<a id="opIdget_by_filter_api_v1_brands_get"></a>

## GET Get By Filter

GET /api/v1/brands

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_BrandBaseResponse__](#schemadataresponse_list_brandbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_brands_post"></a>

## POST Create

POST /api/v1/brands

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[BrandCreateRequest](#schemabrandcreaterequest)| yes | BrandCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_brands__brand_id__get"></a>

## GET Get By Id

GET /api/v1/brands/{brand_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_brands__brand_id__put"></a>

## PUT Update By Id

PUT /api/v1/brands/{brand_id}

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|
|body|body|[BrandUpdateRequest](#schemabrandupdaterequest)| yes | BrandUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_brands__brand_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/brands/{brand_id}

> Body Parameters

```json
{
  "name": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|
|body|body|[BrandUpdateRequest](#schemabrandupdaterequest)| yes | BrandUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_BrandBaseResponse_](#schemadataresponse_brandbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_brands__brand_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/brands/{brand_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|brand_id|path|string| yes | Brand Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_catalog

<a id="opIdget_all_api_catalogs_all_get"></a>

## GET Get All

GET /api/catalogs/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "category_name": "string",
      "service_ids": [
        null
      ],
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_CatalogBaseResponse__](#schemadataresponse_list_catalogbaseresponse__)|

<a id="opIdget_by_filter_api_catalogs_get"></a>

## GET Get By Filter

GET /api/catalogs

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "category_name": "string",
      "service_ids": [
        null
      ],
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_CatalogBaseResponse__](#schemadataresponse_list_catalogbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_catalogs_post"></a>

## POST Create

POST /api/catalogs

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[CatalogCreateRequest](#schemacatalogcreaterequest)| yes | CatalogCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_catalogs__catalog_id__get"></a>

## GET Get By Id

GET /api/catalogs/{catalog_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_catalogs__catalog_id__put"></a>

## PUT Update By Id

PUT /api/catalogs/{catalog_id}

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|
|body|body|[CatalogUpdateRequest](#schemacatalogupdaterequest)| yes | CatalogUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_catalogs__catalog_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/catalogs/{catalog_id}

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|
|body|body|[CatalogUpdateRequest](#schemacatalogupdaterequest)| yes | CatalogUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_catalogs__catalog_id__delete"></a>

## DELETE Delete By Id

DELETE /api/catalogs/{catalog_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_catalog

<a id="opIdget_all_api_v1_catalogs_all_get"></a>

## GET Get All

GET /api/v1/catalogs/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "category_name": "string",
      "service_ids": [
        null
      ],
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_CatalogBaseResponse__](#schemadataresponse_list_catalogbaseresponse__)|

<a id="opIdget_by_filter_api_v1_catalogs_get"></a>

## GET Get By Filter

GET /api/v1/catalogs

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "category_name": "string",
      "service_ids": [
        null
      ],
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_CatalogBaseResponse__](#schemadataresponse_list_catalogbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_catalogs_post"></a>

## POST Create

POST /api/v1/catalogs

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[CatalogCreateRequest](#schemacatalogcreaterequest)| yes | CatalogCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_catalogs__catalog_id__get"></a>

## GET Get By Id

GET /api/v1/catalogs/{catalog_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_catalogs__catalog_id__put"></a>

## PUT Update By Id

PUT /api/v1/catalogs/{catalog_id}

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|
|body|body|[CatalogUpdateRequest](#schemacatalogupdaterequest)| yes | CatalogUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_catalogs__catalog_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/catalogs/{catalog_id}

> Body Parameters

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|
|body|body|[CatalogUpdateRequest](#schemacatalogupdaterequest)| yes | CatalogUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_CatalogBaseResponse_](#schemadataresponse_catalogbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_catalogs__catalog_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/catalogs/{catalog_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|catalog_id|path|string| yes | Catalog Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_chat

<a id="opIdchat_api_chat_post"></a>

## POST Chat

POST /api/chat

> Body Parameters

```json
{
  "user": {
    "user_id": "string",
    "name": "string",
    "phone": "string",
    "description": "string",
    "gender": "string",
    "language": "string"
  },
  "history": [
    {}
  ],
  "message": "string",
  "bot_id": "string",
  "brand_id": "string",
  "payload": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[ChatRequest](#schemachatrequest)| yes | ChatRequest|none|

> Response Examples

> 200 Response

```json
{
  "response": [
    "string"
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[ChatResponse](#schemachatresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_chat

<a id="opIdchat_api_v1_chat_post"></a>

## POST Chat

POST /api/v1/chat

> Body Parameters

```json
{
  "user": {
    "user_id": "string",
    "name": "string",
    "phone": "string",
    "description": "string",
    "gender": "string",
    "language": "string"
  },
  "history": [
    {}
  ],
  "message": "string",
  "bot_id": "string",
  "brand_id": "string",
  "payload": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[ChatRequest](#schemachatrequest)| yes | ChatRequest|none|

> Response Examples

> 200 Response

```json
{
  "response": [
    "string"
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[ChatResponse](#schemachatresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_document

<a id="opIdget_all_api_documents_all_get"></a>

## GET Get All

GET /api/documents/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "title": "string",
      "page_content": "string",
      "meta_data": {},
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentBaseResponse__](#schemadataresponse_list_documentbaseresponse__)|

<a id="opIdget_by_filter_api_documents_get"></a>

## GET Get By Filter

GET /api/documents

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "title": "string",
      "page_content": "string",
      "meta_data": {},
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentBaseResponse__](#schemadataresponse_list_documentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_documents_post"></a>

## POST Create

POST /api/documents

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[DocumentCreateRequest](#schemadocumentcreaterequest)| yes | DocumentCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdsearch_documents_api_documents_search_post"></a>

## POST Search Documents

POST /api/documents/search

> Body Parameters

```json
{
  "question": "string",
  "brand_id": "string",
  "limit": 5,
  "score_threshold": 0,
  "metadata_filter": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[DocumentSearchRequest](#schemadocumentsearchrequest)| yes | DocumentSearchRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": null,
      "score": 0,
      "text": "string",
      "metadata": {},
      "payload": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentSearchHitResponse__](#schemadataresponse_list_documentsearchhitresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_documents__document_id__get"></a>

## GET Get By Id

GET /api/documents/{document_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_documents__document_id__put"></a>

## PUT Update By Id

PUT /api/documents/{document_id}

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|
|body|body|[DocumentUpdateRequest](#schemadocumentupdaterequest)| yes | DocumentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_documents__document_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/documents/{document_id}

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|
|body|body|[DocumentUpdateRequest](#schemadocumentupdaterequest)| yes | DocumentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_documents__document_id__delete"></a>

## DELETE Delete By Id

DELETE /api/documents/{document_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_document

<a id="opIdget_all_api_v1_documents_all_get"></a>

## GET Get All

GET /api/v1/documents/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "title": "string",
      "page_content": "string",
      "meta_data": {},
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentBaseResponse__](#schemadataresponse_list_documentbaseresponse__)|

<a id="opIdget_by_filter_api_v1_documents_get"></a>

## GET Get By Filter

GET /api/v1/documents

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "title": "string",
      "page_content": "string",
      "meta_data": {},
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentBaseResponse__](#schemadataresponse_list_documentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_documents_post"></a>

## POST Create

POST /api/v1/documents

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[DocumentCreateRequest](#schemadocumentcreaterequest)| yes | DocumentCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdsearch_documents_api_v1_documents_search_post"></a>

## POST Search Documents

POST /api/v1/documents/search

> Body Parameters

```json
{
  "question": "string",
  "brand_id": "string",
  "limit": 5,
  "score_threshold": 0,
  "metadata_filter": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[DocumentSearchRequest](#schemadocumentsearchrequest)| yes | DocumentSearchRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": null,
      "score": 0,
      "text": "string",
      "metadata": {},
      "payload": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_DocumentSearchHitResponse__](#schemadataresponse_list_documentsearchhitresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_documents__document_id__get"></a>

## GET Get By Id

GET /api/v1/documents/{document_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_documents__document_id__put"></a>

## PUT Update By Id

PUT /api/v1/documents/{document_id}

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|
|body|body|[DocumentUpdateRequest](#schemadocumentupdaterequest)| yes | DocumentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_documents__document_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/documents/{document_id}

> Body Parameters

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|
|body|body|[DocumentUpdateRequest](#schemadocumentupdaterequest)| yes | DocumentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_DocumentBaseResponse_](#schemadataresponse_documentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_documents__document_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/documents/{document_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|document_id|path|string| yes | Document Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_faq

<a id="opIdget_all_api_faqs_all_get"></a>

## GET Get All

GET /api/faqs/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "question": "string",
      "answer": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_FAQBaseResponse__](#schemadataresponse_list_faqbaseresponse__)|

<a id="opIdget_by_filter_api_faqs_get"></a>

## GET Get By Filter

GET /api/faqs

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "question": "string",
      "answer": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_FAQBaseResponse__](#schemadataresponse_list_faqbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_faqs_post"></a>

## POST Create

POST /api/faqs

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[FAQCreateRequest](#schemafaqcreaterequest)| yes | FAQCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_faqs__faq_id__get"></a>

## GET Get By Id

GET /api/faqs/{faq_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_faqs__faq_id__put"></a>

## PUT Update By Id

PUT /api/faqs/{faq_id}

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|
|body|body|[FAQUpdateRequest](#schemafaqupdaterequest)| yes | FAQUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_faqs__faq_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/faqs/{faq_id}

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|
|body|body|[FAQUpdateRequest](#schemafaqupdaterequest)| yes | FAQUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_faqs__faq_id__delete"></a>

## DELETE Delete By Id

DELETE /api/faqs/{faq_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_faq

<a id="opIdget_all_api_v1_faqs_all_get"></a>

## GET Get All

GET /api/v1/faqs/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "question": "string",
      "answer": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_FAQBaseResponse__](#schemadataresponse_list_faqbaseresponse__)|

<a id="opIdget_by_filter_api_v1_faqs_get"></a>

## GET Get By Filter

GET /api/v1/faqs

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "question": "string",
      "answer": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_FAQBaseResponse__](#schemadataresponse_list_faqbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_faqs_post"></a>

## POST Create

POST /api/v1/faqs

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[FAQCreateRequest](#schemafaqcreaterequest)| yes | FAQCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_faqs__faq_id__get"></a>

## GET Get By Id

GET /api/v1/faqs/{faq_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_faqs__faq_id__put"></a>

## PUT Update By Id

PUT /api/v1/faqs/{faq_id}

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|
|body|body|[FAQUpdateRequest](#schemafaqupdaterequest)| yes | FAQUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_faqs__faq_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/faqs/{faq_id}

> Body Parameters

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|
|body|body|[FAQUpdateRequest](#schemafaqupdaterequest)| yes | FAQUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_FAQBaseResponse_](#schemadataresponse_faqbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_faqs__faq_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/faqs/{faq_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|faq_id|path|string| yes | Faq Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_goal

<a id="opIdget_all_api_goals_all_get"></a>

## GET Get All

GET /api/goals/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "script": "string",
      "intent_id": "string",
      "bot_id": "string",
      "rule": "string",
      "target_goal": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_GoalBaseResponse__](#schemadataresponse_list_goalbaseresponse__)|

<a id="opIdget_by_filter_api_goals_get"></a>

## GET Get By Filter

GET /api/goals

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "script": "string",
      "intent_id": "string",
      "bot_id": "string",
      "rule": "string",
      "target_goal": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_GoalBaseResponse__](#schemadataresponse_list_goalbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_goals_post"></a>

## POST Create

POST /api/goals

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[GoalCreateRequest](#schemagoalcreaterequest)| yes | GoalCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_goals__goal_id__get"></a>

## GET Get By Id

GET /api/goals/{goal_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_goals__goal_id__put"></a>

## PUT Update By Id

PUT /api/goals/{goal_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|
|body|body|[GoalUpdateRequest](#schemagoalupdaterequest)| yes | GoalUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_goals__goal_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/goals/{goal_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|
|body|body|[GoalUpdateRequest](#schemagoalupdaterequest)| yes | GoalUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_goals__goal_id__delete"></a>

## DELETE Delete By Id

DELETE /api/goals/{goal_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_goal

<a id="opIdget_all_api_v1_goals_all_get"></a>

## GET Get All

GET /api/v1/goals/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "script": "string",
      "intent_id": "string",
      "bot_id": "string",
      "rule": "string",
      "target_goal": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_GoalBaseResponse__](#schemadataresponse_list_goalbaseresponse__)|

<a id="opIdget_by_filter_api_v1_goals_get"></a>

## GET Get By Filter

GET /api/v1/goals

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "script": "string",
      "intent_id": "string",
      "bot_id": "string",
      "rule": "string",
      "target_goal": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_GoalBaseResponse__](#schemadataresponse_list_goalbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_goals_post"></a>

## POST Create

POST /api/v1/goals

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[GoalCreateRequest](#schemagoalcreaterequest)| yes | GoalCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_goals__goal_id__get"></a>

## GET Get By Id

GET /api/v1/goals/{goal_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_goals__goal_id__put"></a>

## PUT Update By Id

PUT /api/v1/goals/{goal_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|
|body|body|[GoalUpdateRequest](#schemagoalupdaterequest)| yes | GoalUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_goals__goal_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/goals/{goal_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|
|body|body|[GoalUpdateRequest](#schemagoalupdaterequest)| yes | GoalUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_GoalBaseResponse_](#schemadataresponse_goalbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_goals__goal_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/goals/{goal_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|goal_id|path|string| yes | Goal Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_intent

<a id="opIdget_all_api_intents_all_get"></a>

## GET Get All

GET /api/intents/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|

<a id="opIdget_by_filter_api_intents_get"></a>

## GET Get By Filter

GET /api/intents

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_intents_post"></a>

## POST Create

POST /api/intents

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[IntentCreateRequest](#schemaintentcreaterequest)| yes | IntentCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_bot_id_api_intents_by_bot__bot_id__get"></a>

## GET Get By Bot Id

GET /api/intents/by-bot/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_intents__intent_id__get"></a>

## GET Get By Id

GET /api/intents/{intent_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_intents__intent_id__put"></a>

## PUT Update By Id

PUT /api/intents/{intent_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|
|body|body|[IntentUpdateRequest](#schemaintentupdaterequest)| yes | IntentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_intents__intent_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/intents/{intent_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|
|body|body|[IntentUpdateRequest](#schemaintentupdaterequest)| yes | IntentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_intents__intent_id__delete"></a>

## DELETE Delete By Id

DELETE /api/intents/{intent_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_intent

<a id="opIdget_all_api_v1_intents_all_get"></a>

## GET Get All

GET /api/v1/intents/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|

<a id="opIdget_by_filter_api_v1_intents_get"></a>

## GET Get By Filter

GET /api/v1/intents

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_intents_post"></a>

## POST Create

POST /api/v1/intents

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[IntentCreateRequest](#schemaintentcreaterequest)| yes | IntentCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_bot_id_api_v1_intents_by_bot__bot_id__get"></a>

## GET Get By Bot Id

GET /api/v1/intents/by-bot/{bot_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|bot_id|path|string| yes | Bot Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_IntentBaseResponse__](#schemadataresponse_list_intentbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_intents__intent_id__get"></a>

## GET Get By Id

GET /api/v1/intents/{intent_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_intents__intent_id__put"></a>

## PUT Update By Id

PUT /api/v1/intents/{intent_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|
|body|body|[IntentUpdateRequest](#schemaintentupdaterequest)| yes | IntentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_intents__intent_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/intents/{intent_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|
|body|body|[IntentUpdateRequest](#schemaintentupdaterequest)| yes | IntentUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_IntentBaseResponse_](#schemadataresponse_intentbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_intents__intent_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/intents/{intent_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|intent_id|path|string| yes | Intent Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_location

<a id="opIdsearch_api_search_post"></a>

## POST Search

POST /api/search

> Body Parameters

```json
{
  "address": "string",
  "search_formation": "nearest"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[SearchRequest](#schemasearchrequest)| yes | SearchRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "message": "string",
    "user_location": "string",
    "stores": [
      {
        "idStore": 0,
        "province": "string",
        "address": "string",
        "storeImage": "string",
        "mapUrl": "string",
        "latitude": 0,
        "longitude": 0,
        "active": true,
        "under": true,
        "businessLicense": "string",
        "timeOpenClose": "string",
        "description": "string",
        "nameTypeStore": "string"
      }
    ],
    "distance_km": 0
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SearchResponse_](#schemadataresponse_searchresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_location

<a id="opIdsearch_api_v1_search_post"></a>

## POST Search

POST /api/v1/search

> Body Parameters

```json
{
  "address": "string",
  "search_formation": "nearest"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[SearchRequest](#schemasearchrequest)| yes | SearchRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "message": "string",
    "user_location": "string",
    "stores": [
      {
        "idStore": 0,
        "province": "string",
        "address": "string",
        "storeImage": "string",
        "mapUrl": "string",
        "latitude": 0,
        "longitude": 0,
        "active": true,
        "under": true,
        "businessLicense": "string",
        "timeOpenClose": "string",
        "description": "string",
        "nameTypeStore": "string"
      }
    ],
    "distance_km": 0
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SearchResponse_](#schemadataresponse_searchresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_longterm

<a id="opIdget_all_api_longterms_all_get"></a>

## GET Get All

GET /api/longterms/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "user_id": "string",
      "name": "string",
      "gender": "string",
      "phone": "string",
      "description": "string",
      "language": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_LongTermBaseResponse__](#schemadataresponse_list_longtermbaseresponse__)|

<a id="opIdget_by_filter_api_longterms_get"></a>

## GET Get By Filter

GET /api/longterms

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "user_id": "string",
      "name": "string",
      "gender": "string",
      "phone": "string",
      "description": "string",
      "language": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_LongTermBaseResponse__](#schemadataresponse_list_longtermbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_longterms_post"></a>

## POST Create

POST /api/longterms

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[LongTermCreateRequest](#schemalongtermcreaterequest)| yes | LongTermCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_longterms__longterm_id__get"></a>

## GET Get By Id

GET /api/longterms/{longterm_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_longterms__longterm_id__put"></a>

## PUT Update By Id

PUT /api/longterms/{longterm_id}

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|
|body|body|[LongTermUpdateRequest](#schemalongtermupdaterequest)| yes | LongTermUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_longterms__longterm_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/longterms/{longterm_id}

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|
|body|body|[LongTermUpdateRequest](#schemalongtermupdaterequest)| yes | LongTermUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_longterms__longterm_id__delete"></a>

## DELETE Delete By Id

DELETE /api/longterms/{longterm_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_longterm

<a id="opIdget_all_api_v1_longterms_all_get"></a>

## GET Get All

GET /api/v1/longterms/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "user_id": "string",
      "name": "string",
      "gender": "string",
      "phone": "string",
      "description": "string",
      "language": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_LongTermBaseResponse__](#schemadataresponse_list_longtermbaseresponse__)|

<a id="opIdget_by_filter_api_v1_longterms_get"></a>

## GET Get By Filter

GET /api/v1/longterms

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "user_id": "string",
      "name": "string",
      "gender": "string",
      "phone": "string",
      "description": "string",
      "language": "string",
      "bot_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_LongTermBaseResponse__](#schemadataresponse_list_longtermbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_longterms_post"></a>

## POST Create

POST /api/v1/longterms

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[LongTermCreateRequest](#schemalongtermcreaterequest)| yes | LongTermCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_longterms__longterm_id__get"></a>

## GET Get By Id

GET /api/v1/longterms/{longterm_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_longterms__longterm_id__put"></a>

## PUT Update By Id

PUT /api/v1/longterms/{longterm_id}

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|
|body|body|[LongTermUpdateRequest](#schemalongtermupdaterequest)| yes | LongTermUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_longterms__longterm_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/longterms/{longterm_id}

> Body Parameters

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|
|body|body|[LongTermUpdateRequest](#schemalongtermupdaterequest)| yes | LongTermUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_LongTermBaseResponse_](#schemadataresponse_longtermbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_longterms__longterm_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/longterms/{longterm_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|longterm_id|path|string| yes | Longterm Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_message

<a id="opIdget_all_api_messages_all_get"></a>

## GET Get All

GET /api/messages/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "content": "string",
      "sender_type": "user",
      "metadata_info": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_MessageBaseResponse__](#schemadataresponse_list_messagebaseresponse__)|

<a id="opIdget_by_filter_api_messages_get"></a>

## GET Get By Filter

GET /api/messages

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "content": "string",
      "sender_type": "user",
      "metadata_info": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_MessageBaseResponse__](#schemadataresponse_list_messagebaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_messages_post"></a>

## POST Create

POST /api/messages

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[MessageCreateRequest](#schemamessagecreaterequest)| yes | MessageCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_messages__message_id__get"></a>

## GET Get By Id

GET /api/messages/{message_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_messages__message_id__put"></a>

## PUT Update By Id

PUT /api/messages/{message_id}

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|
|body|body|[MessageUpdateRequest](#schemamessageupdaterequest)| yes | MessageUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_messages__message_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/messages/{message_id}

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|
|body|body|[MessageUpdateRequest](#schemamessageupdaterequest)| yes | MessageUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_messages__message_id__delete"></a>

## DELETE Delete By Id

DELETE /api/messages/{message_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_message

<a id="opIdget_all_api_v1_messages_all_get"></a>

## GET Get All

GET /api/v1/messages/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "content": "string",
      "sender_type": "user",
      "metadata_info": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_MessageBaseResponse__](#schemadataresponse_list_messagebaseresponse__)|

<a id="opIdget_by_filter_api_v1_messages_get"></a>

## GET Get By Filter

GET /api/v1/messages

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "content": "string",
      "sender_type": "user",
      "metadata_info": {}
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_MessageBaseResponse__](#schemadataresponse_list_messagebaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_messages_post"></a>

## POST Create

POST /api/v1/messages

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[MessageCreateRequest](#schemamessagecreaterequest)| yes | MessageCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_messages__message_id__get"></a>

## GET Get By Id

GET /api/v1/messages/{message_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_messages__message_id__put"></a>

## PUT Update By Id

PUT /api/v1/messages/{message_id}

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|
|body|body|[MessageUpdateRequest](#schemamessageupdaterequest)| yes | MessageUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_messages__message_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/messages/{message_id}

> Body Parameters

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|
|body|body|[MessageUpdateRequest](#schemamessageupdaterequest)| yes | MessageUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_MessageBaseResponse_](#schemadataresponse_messagebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_messages__message_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/messages/{message_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|message_id|path|string| yes | Message Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_service

<a id="opIdget_all_api_services_all_get"></a>

## GET Get All

GET /api/services/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "service_metadata": null,
      "status": "string",
      "brand_id": "string",
      "branch_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_ServiceBaseResponse__](#schemadataresponse_list_servicebaseresponse__)|

<a id="opIdget_by_filter_api_services_get"></a>

## GET Get By Filter

GET /api/services

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "service_metadata": null,
      "status": "string",
      "brand_id": "string",
      "branch_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_ServiceBaseResponse__](#schemadataresponse_list_servicebaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_services_post"></a>

## POST Create

POST /api/services

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": null,
  "status": "active",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[ServiceCreateRequest](#schemaservicecreaterequest)| yes | ServiceCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_services__service_id__get"></a>

## GET Get By Id

GET /api/services/{service_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_services__service_id__put"></a>

## PUT Update By Id

PUT /api/services/{service_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": {},
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|
|body|body|[ServiceUpdateRequest](#schemaserviceupdaterequest)| yes | ServiceUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_services__service_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/services/{service_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": {},
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|
|body|body|[ServiceUpdateRequest](#schemaserviceupdaterequest)| yes | ServiceUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_services__service_id__delete"></a>

## DELETE Delete By Id

DELETE /api/services/{service_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_service

<a id="opIdget_all_api_v1_services_all_get"></a>

## GET Get All

GET /api/v1/services/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "service_metadata": null,
      "status": "string",
      "brand_id": "string",
      "branch_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_ServiceBaseResponse__](#schemadataresponse_list_servicebaseresponse__)|

<a id="opIdget_by_filter_api_v1_services_get"></a>

## GET Get By Filter

GET /api/v1/services

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "service_metadata": null,
      "status": "string",
      "brand_id": "string",
      "branch_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_ServiceBaseResponse__](#schemadataresponse_list_servicebaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_services_post"></a>

## POST Create

POST /api/v1/services

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": null,
  "status": "active",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[ServiceCreateRequest](#schemaservicecreaterequest)| yes | ServiceCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_services__service_id__get"></a>

## GET Get By Id

GET /api/v1/services/{service_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_services__service_id__put"></a>

## PUT Update By Id

PUT /api/v1/services/{service_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": {},
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|
|body|body|[ServiceUpdateRequest](#schemaserviceupdaterequest)| yes | ServiceUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_services__service_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/services/{service_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": {},
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|
|body|body|[ServiceUpdateRequest](#schemaserviceupdaterequest)| yes | ServiceUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_ServiceBaseResponse_](#schemadataresponse_servicebaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_services__service_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/services/{service_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|service_id|path|string| yes | Service Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_skill

<a id="opIdget_all_api_skills_all_get"></a>

## GET Get All

GET /api/skills/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "endpoint": "string",
      "method": "string",
      "parameters": {},
      "fixed_parameters": {},
      "headers": {},
      "is_active": true,
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_SkillBaseResponse__](#schemadataresponse_list_skillbaseresponse__)|

<a id="opIdget_by_filter_api_skills_get"></a>

## GET Get By Filter

GET /api/skills

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "endpoint": "string",
      "method": "string",
      "parameters": {},
      "fixed_parameters": {},
      "headers": {},
      "is_active": true,
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_SkillBaseResponse__](#schemadataresponse_list_skillbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_skills_post"></a>

## POST Create

POST /api/skills

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[SkillCreateRequest](#schemaskillcreaterequest)| yes | SkillCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_skills__skill_id__get"></a>

## GET Get By Id

GET /api/skills/{skill_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_skills__skill_id__put"></a>

## PUT Update By Id

PUT /api/skills/{skill_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|
|body|body|[SkillUpdateRequest](#schemaskillupdaterequest)| yes | SkillUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_skills__skill_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/skills/{skill_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|
|body|body|[SkillUpdateRequest](#schemaskillupdaterequest)| yes | SkillUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_skills__skill_id__delete"></a>

## DELETE Delete By Id

DELETE /api/skills/{skill_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_skill

<a id="opIdget_all_api_v1_skills_all_get"></a>

## GET Get All

GET /api/v1/skills/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "endpoint": "string",
      "method": "string",
      "parameters": {},
      "fixed_parameters": {},
      "headers": {},
      "is_active": true,
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_SkillBaseResponse__](#schemadataresponse_list_skillbaseresponse__)|

<a id="opIdget_by_filter_api_v1_skills_get"></a>

## GET Get By Filter

GET /api/v1/skills

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "endpoint": "string",
      "method": "string",
      "parameters": {},
      "fixed_parameters": {},
      "headers": {},
      "is_active": true,
      "brand_id": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_SkillBaseResponse__](#schemadataresponse_list_skillbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_skills_post"></a>

## POST Create

POST /api/v1/skills

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[SkillCreateRequest](#schemaskillcreaterequest)| yes | SkillCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_skills__skill_id__get"></a>

## GET Get By Id

GET /api/v1/skills/{skill_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_skills__skill_id__put"></a>

## PUT Update By Id

PUT /api/v1/skills/{skill_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|
|body|body|[SkillUpdateRequest](#schemaskillupdaterequest)| yes | SkillUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdpartial_update_by_id_api_v1_skills__skill_id__patch"></a>

## PATCH Partial Update By Id

PATCH /api/v1/skills/{skill_id}

> Body Parameters

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|
|body|body|[SkillUpdateRequest](#schemaskillupdaterequest)| yes | SkillUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_SkillBaseResponse_](#schemadataresponse_skillbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_skills__skill_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/skills/{skill_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|skill_id|path|string| yes | Skill Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# [Current] v1 - api_test

<a id="opIdget_api_test_hello_world_get"></a>

## GET Get

GET /api/test/hello-world

> Response Examples

> 200 Response

```json
"string"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|string|

# v1 - api_test

<a id="opIdget_api_v1_test_hello_world_get"></a>

## GET Get

GET /api/v1/test/hello-world

> Response Examples

> 200 Response

```json
"string"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|string|

# [Current] v1 - api_user

<a id="opIdget_all_api_users_all_get"></a>

## GET Get All

GET /api/users/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "sso_key": "string",
      "username": "string",
      "email": "user@example.com",
      "dob": 0,
      "gender": "string",
      "first_name": "string",
      "last_name": "string",
      "full_name": "string",
      "phone": "string",
      "address": "string",
      "identity_card": "string",
      "identity_card_date": 0,
      "identity_card_place": "string",
      "is_active": true,
      "last_login": 0,
      "roles": [
        "string"
      ]
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_UserBaseResponse__](#schemadataresponse_list_userbaseresponse__)|

<a id="opIdget_by_filter_api_users_get"></a>

## GET Get By Filter

GET /api/users

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "sso_key": "string",
      "username": "string",
      "email": "user@example.com",
      "dob": 0,
      "gender": "string",
      "first_name": "string",
      "last_name": "string",
      "full_name": "string",
      "phone": "string",
      "address": "string",
      "identity_card": "string",
      "identity_card_date": 0,
      "identity_card_place": "string",
      "is_active": true,
      "last_login": 0,
      "roles": [
        "string"
      ]
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_UserBaseResponse__](#schemadataresponse_list_userbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_users_post"></a>

## POST Create

POST /api/users

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "username": "string",
  "email": "user@example.com",
  "is_active": true,
  "roles": [
    "Guest"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[UserCreateRequest](#schemausercreaterequest)| yes | UserCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_users__user_id__get"></a>

## GET Get By Id

GET /api/users/{user_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_users__user_id__put"></a>

## PUT Update By Id

PUT /api/users/{user_id}

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "roles": [
    "string"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|
|body|body|[UserUpdateRequest](#schemauserupdaterequest)| yes | UserUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_users__user_id__patch"></a>

## PATCH Update By Id

PATCH /api/users/{user_id}

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "roles": [
    "string"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|
|body|body|[UserUpdateRequest](#schemauserupdaterequest)| yes | UserUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_users__user_id__delete"></a>

## DELETE Delete By Id

DELETE /api/users/{user_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v1 - api_user

<a id="opIdget_all_api_v1_users_all_get"></a>

## GET Get All

GET /api/v1/users/all

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "sso_key": "string",
      "username": "string",
      "email": "user@example.com",
      "dob": 0,
      "gender": "string",
      "first_name": "string",
      "last_name": "string",
      "full_name": "string",
      "phone": "string",
      "address": "string",
      "identity_card": "string",
      "identity_card_date": 0,
      "identity_card_place": "string",
      "is_active": true,
      "last_login": 0,
      "roles": [
        "string"
      ]
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_UserBaseResponse__](#schemadataresponse_list_userbaseresponse__)|

<a id="opIdget_by_filter_api_v1_users_get"></a>

## GET Get By Filter

GET /api/v1/users

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|sort_by|query|any| no | Sort By|none|
|order|query|any| no | Order|none|
|page_size|query|any| no | Page Size|none|
|page|query|any| no | Page|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "sso_key": "string",
      "username": "string",
      "email": "user@example.com",
      "dob": 0,
      "gender": "string",
      "first_name": "string",
      "last_name": "string",
      "full_name": "string",
      "phone": "string",
      "address": "string",
      "identity_card": "string",
      "identity_card_date": 0,
      "identity_card_place": "string",
      "is_active": true,
      "last_login": 0,
      "roles": [
        "string"
      ]
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_List_UserBaseResponse__](#schemadataresponse_list_userbaseresponse__)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdcreate_api_v1_users_post"></a>

## POST Create

POST /api/v1/users

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "username": "string",
  "email": "user@example.com",
  "is_active": true,
  "roles": [
    "Guest"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|body|body|[UserCreateRequest](#schemausercreaterequest)| yes | UserCreateRequest|none|

> Response Examples

> 201 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdget_by_id_api_v1_users__user_id__get"></a>

## GET Get By Id

GET /api/v1/users/{user_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_users__user_id__put"></a>

## PUT Update By Id

PUT /api/v1/users/{user_id}

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "roles": [
    "string"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|
|body|body|[UserUpdateRequest](#schemauserupdaterequest)| yes | UserUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIdupdate_by_id_api_v1_users__user_id__patch"></a>

## PATCH Update By Id

PATCH /api/v1/users/{user_id}

> Body Parameters

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "roles": [
    "string"
  ]
}
```

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|
|body|body|[UserUpdateRequest](#schemauserupdaterequest)| yes | UserUpdateRequest|none|

> Response Examples

> 200 Response

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DataResponse_UserBaseResponse_](#schemadataresponse_userbaseresponse_)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<a id="opIddelete_by_id_api_v1_users__user_id__delete"></a>

## DELETE Delete By Id

DELETE /api/v1/users/{user_id}

### Params

|Name|Location|Type|Required|Title|Description|
|---|---|---|---|---|---|
|user_id|path|string| yes | User Id|none|

> Response Examples

> 422 Response

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Successful Response|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

# v2 - api_test

<a id="opIdget_api_v2_test_hello_world_get"></a>

## GET Get

GET /api/v2/test/hello-world

> Response Examples

> 200 Response

```json
"string"
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|string|

# Data Schema

<h2 id="tocS_BaseResponse">BaseResponse</h2>

<a id="schemabaseresponse"></a>
<a id="schema_BaseResponse"></a>
<a id="tocSbaseresponse"></a>
<a id="tocsbaseresponse"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  }
}

```

BaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|

<h2 id="tocS_BotBaseResponse">BotBaseResponse</h2>

<a id="schemabotbaseresponse"></a>
<a id="schema_BotBaseResponse"></a>
<a id="tocSbotbaseresponse"></a>
<a id="tocsbotbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}

```

BotBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|language|[string]|true|none|Language|none|
|role_prompt|string|true|none|Role Prompt|none|
|temperature|any|false|none|Temperature|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|max_tokens|any|false|none|Max Tokens|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|status|string|true|none|Status|none|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BotCreateRequest">BotCreateRequest</h2>

<a id="schemabotcreaterequest"></a>
<a id="schema_BotCreateRequest"></a>
<a id="tocSbotcreaterequest"></a>
<a id="tocsbotcreaterequest"></a>

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "active",
  "brand_id": "string"
}

```

BotCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|language|[string]|true|none|Language|none|
|role_prompt|string|true|none|Role Prompt|none|
|temperature|any|false|none|Temperature|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|max_tokens|any|false|none|Max Tokens|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BotUpdateRequest">BotUpdateRequest</h2>

<a id="schemabotupdaterequest"></a>
<a id="schema_BotUpdateRequest"></a>
<a id="tocSbotupdaterequest"></a>
<a id="tocsbotupdaterequest"></a>

```json
{
  "name": "string",
  "language": [
    "string"
  ],
  "role_prompt": "string",
  "temperature": 0,
  "max_tokens": 0,
  "status": "string",
  "brand_id": "string"
}

```

BotUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|language|any|false|none|Language|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[string]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|role_prompt|any|false|none|Role Prompt|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|temperature|any|false|none|Temperature|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|max_tokens|any|false|none|Max Tokens|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BranchBaseResponse">BranchBaseResponse</h2>

<a id="schemabranchbaseresponse"></a>
<a id="schema_BranchBaseResponse"></a>
<a id="tocSbranchbaseresponse"></a>
<a id="tocsbranchbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}

```

BranchBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|string|true|none|Address|none|
|google_map_url|string|true|none|Google Map Url|none|
|latitude|string|true|none|Latitude|none|
|longitude|string|true|none|Longitude|none|
|status|string|true|none|Status|none|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BranchCreateRequest">BranchCreateRequest</h2>

<a id="schemabranchcreaterequest"></a>
<a id="schema_BranchCreateRequest"></a>
<a id="tocSbranchcreaterequest"></a>
<a id="tocsbranchcreaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "active",
  "brand_id": "string"
}

```

BranchCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|string|true|none|Address|none|
|google_map_url|string|true|none|Google Map Url|none|
|latitude|string|true|none|Latitude|none|
|longitude|string|true|none|Longitude|none|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BranchUpdateRequest">BranchUpdateRequest</h2>

<a id="schemabranchupdaterequest"></a>
<a id="schema_BranchUpdateRequest"></a>
<a id="tocSbranchupdaterequest"></a>
<a id="tocsbranchupdaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "address": "string",
  "google_map_url": "string",
  "latitude": "string",
  "longitude": "string",
  "status": "string",
  "brand_id": "string"
}

```

BranchUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|any|false|none|Address|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|google_map_url|any|false|none|Google Map Url|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|latitude|any|false|none|Latitude|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|longitude|any|false|none|Longitude|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_BrandBaseResponse">BrandBaseResponse</h2>

<a id="schemabrandbaseresponse"></a>
<a id="schema_BrandBaseResponse"></a>
<a id="tocSbrandbaseresponse"></a>
<a id="tocsbrandbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string"
}

```

BrandBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|

<h2 id="tocS_BrandCreateRequest">BrandCreateRequest</h2>

<a id="schemabrandcreaterequest"></a>
<a id="schema_BrandCreateRequest"></a>
<a id="tocSbrandcreaterequest"></a>
<a id="tocsbrandcreaterequest"></a>

```json
{
  "name": "string"
}

```

BrandCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|

<h2 id="tocS_BrandUpdateRequest">BrandUpdateRequest</h2>

<a id="schemabrandupdaterequest"></a>
<a id="schema_BrandUpdateRequest"></a>
<a id="tocSbrandupdaterequest"></a>
<a id="tocsbrandupdaterequest"></a>

```json
{
  "name": "string"
}

```

BrandUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_CatalogBaseResponse">CatalogBaseResponse</h2>

<a id="schemacatalogbaseresponse"></a>
<a id="schema_CatalogBaseResponse"></a>
<a id="tocScatalogbaseresponse"></a>
<a id="tocscatalogbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}

```

CatalogBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|category_name|string|true|none|Category Name|none|
|service_ids|[any]|true|none|Service Ids|none|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_CatalogCreateRequest">CatalogCreateRequest</h2>

<a id="schemacatalogcreaterequest"></a>
<a id="schema_CatalogCreateRequest"></a>
<a id="tocScatalogcreaterequest"></a>
<a id="tocscatalogcreaterequest"></a>

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}

```

CatalogCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|category_name|string|true|none|Category Name|none|
|service_ids|[any]|true|none|Service Ids|none|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_CatalogUpdateRequest">CatalogUpdateRequest</h2>

<a id="schemacatalogupdaterequest"></a>
<a id="schema_CatalogUpdateRequest"></a>
<a id="tocScatalogupdaterequest"></a>
<a id="tocscatalogupdaterequest"></a>

```json
{
  "category_name": "string",
  "service_ids": [
    null
  ],
  "brand_id": "string"
}

```

CatalogUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|category_name|any|false|none|Category Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|service_ids|any|false|none|Service Ids|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[any]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_ChatRequest">ChatRequest</h2>

<a id="schemachatrequest"></a>
<a id="schema_ChatRequest"></a>
<a id="tocSchatrequest"></a>
<a id="tocschatrequest"></a>

```json
{
  "user": {
    "user_id": "string",
    "name": "string",
    "phone": "string",
    "description": "string",
    "gender": "string",
    "language": "string"
  },
  "history": [
    {}
  ],
  "message": "string",
  "bot_id": "string",
  "brand_id": "string",
  "payload": {}
}

```

ChatRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|user|[UserInfo](#schemauserinfo)|true|none||Information about the user|
|history|any|false|none|History|Chat history between the user and the bot (Optional, now managed on server)|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[object]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|string|true|none|Message|none|
|bot_id|string|true|none|Bot Id|none|
|brand_id|string|true|none|Brand Id|none|
|payload|any|false|none|Payload|Additional data for processing the chat|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|object|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_ChatResponse">ChatResponse</h2>

<a id="schemachatresponse"></a>
<a id="schema_ChatResponse"></a>
<a id="tocSchatresponse"></a>
<a id="tocschatresponse"></a>

```json
{
  "response": [
    "string"
  ]
}

```

ChatResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|response|[string]|true|none|Response|none|

<h2 id="tocS_DataResponse_BotBaseResponse_">DataResponse_BotBaseResponse_</h2>

<a id="schemadataresponse_botbaseresponse_"></a>
<a id="schema_DataResponse_BotBaseResponse_"></a>
<a id="tocSdataresponse_botbaseresponse_"></a>
<a id="tocsdataresponse_botbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "language": [
      "string"
    ],
    "role_prompt": "string",
    "temperature": 0,
    "max_tokens": 0,
    "status": "string",
    "brand_id": "string"
  }
}

```

DataResponse[BotBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[BotBaseResponse](#schemabotbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_BranchBaseResponse_">DataResponse_BranchBaseResponse_</h2>

<a id="schemadataresponse_branchbaseresponse_"></a>
<a id="schema_DataResponse_BranchBaseResponse_"></a>
<a id="tocSdataresponse_branchbaseresponse_"></a>
<a id="tocsdataresponse_branchbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "address": "string",
    "google_map_url": "string",
    "latitude": "string",
    "longitude": "string",
    "status": "string",
    "brand_id": "string"
  }
}

```

DataResponse[BranchBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[BranchBaseResponse](#schemabranchbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_BrandBaseResponse_">DataResponse_BrandBaseResponse_</h2>

<a id="schemadataresponse_brandbaseresponse_"></a>
<a id="schema_DataResponse_BrandBaseResponse_"></a>
<a id="tocSdataresponse_brandbaseresponse_"></a>
<a id="tocsdataresponse_brandbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string"
  }
}

```

DataResponse[BrandBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[BrandBaseResponse](#schemabrandbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_CatalogBaseResponse_">DataResponse_CatalogBaseResponse_</h2>

<a id="schemadataresponse_catalogbaseresponse_"></a>
<a id="schema_DataResponse_CatalogBaseResponse_"></a>
<a id="tocSdataresponse_catalogbaseresponse_"></a>
<a id="tocsdataresponse_catalogbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "category_name": "string",
    "service_ids": [
      null
    ],
    "brand_id": "string"
  }
}

```

DataResponse[CatalogBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[CatalogBaseResponse](#schemacatalogbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_DocumentBaseResponse_">DataResponse_DocumentBaseResponse_</h2>

<a id="schemadataresponse_documentbaseresponse_"></a>
<a id="schema_DataResponse_DocumentBaseResponse_"></a>
<a id="tocSdataresponse_documentbaseresponse_"></a>
<a id="tocsdataresponse_documentbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "title": "string",
    "page_content": "string",
    "meta_data": {},
    "brand_id": "string"
  }
}

```

DataResponse[DocumentBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[DocumentBaseResponse](#schemadocumentbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_FAQBaseResponse_">DataResponse_FAQBaseResponse_</h2>

<a id="schemadataresponse_faqbaseresponse_"></a>
<a id="schema_DataResponse_FAQBaseResponse_"></a>
<a id="tocSdataresponse_faqbaseresponse_"></a>
<a id="tocsdataresponse_faqbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "question": "string",
    "answer": "string",
    "bot_id": "string"
  }
}

```

DataResponse[FAQBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[FAQBaseResponse](#schemafaqbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_GoalBaseResponse_">DataResponse_GoalBaseResponse_</h2>

<a id="schemadataresponse_goalbaseresponse_"></a>
<a id="schema_DataResponse_GoalBaseResponse_"></a>
<a id="tocSdataresponse_goalbaseresponse_"></a>
<a id="tocsdataresponse_goalbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "script": "string",
    "intent_id": "string",
    "bot_id": "string",
    "rule": "string",
    "target_goal": "string"
  }
}

```

DataResponse[GoalBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[GoalBaseResponse](#schemagoalbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_IntentBaseResponse_">DataResponse_IntentBaseResponse_</h2>

<a id="schemadataresponse_intentbaseresponse_"></a>
<a id="schema_DataResponse_IntentBaseResponse_"></a>
<a id="tocSdataresponse_intentbaseresponse_"></a>
<a id="tocsdataresponse_intentbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "target_goal": "string",
    "example": {},
    "bot_id": "string"
  }
}

```

DataResponse[IntentBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[IntentBaseResponse](#schemaintentbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_List_BotBaseResponse__">DataResponse_List_BotBaseResponse__</h2>

<a id="schemadataresponse_list_botbaseresponse__"></a>
<a id="schema_DataResponse_List_BotBaseResponse__"></a>
<a id="tocSdataresponse_list_botbaseresponse__"></a>
<a id="tocsdataresponse_list_botbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "language": [
        "string"
      ],
      "role_prompt": "string",
      "temperature": 0,
      "max_tokens": 0,
      "status": "string",
      "brand_id": "string"
    }
  ]
}

```

DataResponse[List[BotBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[BotBaseResponse](#schemabotbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_BranchBaseResponse__">DataResponse_List_BranchBaseResponse__</h2>

<a id="schemadataresponse_list_branchbaseresponse__"></a>
<a id="schema_DataResponse_List_BranchBaseResponse__"></a>
<a id="tocSdataresponse_list_branchbaseresponse__"></a>
<a id="tocsdataresponse_list_branchbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "address": "string",
      "google_map_url": "string",
      "latitude": "string",
      "longitude": "string",
      "status": "string",
      "brand_id": "string"
    }
  ]
}

```

DataResponse[List[BranchBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[BranchBaseResponse](#schemabranchbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_BrandBaseResponse__">DataResponse_List_BrandBaseResponse__</h2>

<a id="schemadataresponse_list_brandbaseresponse__"></a>
<a id="schema_DataResponse_List_BrandBaseResponse__"></a>
<a id="tocSdataresponse_list_brandbaseresponse__"></a>
<a id="tocsdataresponse_list_brandbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string"
    }
  ]
}

```

DataResponse[List[BrandBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[BrandBaseResponse](#schemabrandbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_CatalogBaseResponse__">DataResponse_List_CatalogBaseResponse__</h2>

<a id="schemadataresponse_list_catalogbaseresponse__"></a>
<a id="schema_DataResponse_List_CatalogBaseResponse__"></a>
<a id="tocSdataresponse_list_catalogbaseresponse__"></a>
<a id="tocsdataresponse_list_catalogbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "category_name": "string",
      "service_ids": [
        null
      ],
      "brand_id": "string"
    }
  ]
}

```

DataResponse[List[CatalogBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[CatalogBaseResponse](#schemacatalogbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_DocumentBaseResponse__">DataResponse_List_DocumentBaseResponse__</h2>

<a id="schemadataresponse_list_documentbaseresponse__"></a>
<a id="schema_DataResponse_List_DocumentBaseResponse__"></a>
<a id="tocSdataresponse_list_documentbaseresponse__"></a>
<a id="tocsdataresponse_list_documentbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "title": "string",
      "page_content": "string",
      "meta_data": {},
      "brand_id": "string"
    }
  ]
}

```

DataResponse[List[DocumentBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[DocumentBaseResponse](#schemadocumentbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_DocumentSearchHitResponse__">DataResponse_List_DocumentSearchHitResponse__</h2>

<a id="schemadataresponse_list_documentsearchhitresponse__"></a>
<a id="schema_DataResponse_List_DocumentSearchHitResponse__"></a>
<a id="tocSdataresponse_list_documentsearchhitresponse__"></a>
<a id="tocsdataresponse_list_documentsearchhitresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": null,
      "score": 0,
      "text": "string",
      "metadata": {},
      "payload": {}
    }
  ]
}

```

DataResponse[List[DocumentSearchHitResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[DocumentSearchHitResponse](#schemadocumentsearchhitresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_FAQBaseResponse__">DataResponse_List_FAQBaseResponse__</h2>

<a id="schemadataresponse_list_faqbaseresponse__"></a>
<a id="schema_DataResponse_List_FAQBaseResponse__"></a>
<a id="tocSdataresponse_list_faqbaseresponse__"></a>
<a id="tocsdataresponse_list_faqbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "question": "string",
      "answer": "string",
      "bot_id": "string"
    }
  ]
}

```

DataResponse[List[FAQBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[FAQBaseResponse](#schemafaqbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_GoalBaseResponse__">DataResponse_List_GoalBaseResponse__</h2>

<a id="schemadataresponse_list_goalbaseresponse__"></a>
<a id="schema_DataResponse_List_GoalBaseResponse__"></a>
<a id="tocSdataresponse_list_goalbaseresponse__"></a>
<a id="tocsdataresponse_list_goalbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "script": "string",
      "intent_id": "string",
      "bot_id": "string",
      "rule": "string",
      "target_goal": "string"
    }
  ]
}

```

DataResponse[List[GoalBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[GoalBaseResponse](#schemagoalbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_IntentBaseResponse__">DataResponse_List_IntentBaseResponse__</h2>

<a id="schemadataresponse_list_intentbaseresponse__"></a>
<a id="schema_DataResponse_List_IntentBaseResponse__"></a>
<a id="tocSdataresponse_list_intentbaseresponse__"></a>
<a id="tocsdataresponse_list_intentbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "target_goal": "string",
      "example": {},
      "bot_id": "string"
    }
  ]
}

```

DataResponse[List[IntentBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[IntentBaseResponse](#schemaintentbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_LongTermBaseResponse__">DataResponse_List_LongTermBaseResponse__</h2>

<a id="schemadataresponse_list_longtermbaseresponse__"></a>
<a id="schema_DataResponse_List_LongTermBaseResponse__"></a>
<a id="tocSdataresponse_list_longtermbaseresponse__"></a>
<a id="tocsdataresponse_list_longtermbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "user_id": "string",
      "name": "string",
      "gender": "string",
      "phone": "string",
      "description": "string",
      "language": "string",
      "bot_id": "string"
    }
  ]
}

```

DataResponse[List[LongTermBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[LongTermBaseResponse](#schemalongtermbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_MessageBaseResponse__">DataResponse_List_MessageBaseResponse__</h2>

<a id="schemadataresponse_list_messagebaseresponse__"></a>
<a id="schema_DataResponse_List_MessageBaseResponse__"></a>
<a id="tocSdataresponse_list_messagebaseresponse__"></a>
<a id="tocsdataresponse_list_messagebaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "content": "string",
      "sender_type": "user",
      "metadata_info": {}
    }
  ]
}

```

DataResponse[List[MessageBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[MessageBaseResponse](#schemamessagebaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_ServiceBaseResponse__">DataResponse_List_ServiceBaseResponse__</h2>

<a id="schemadataresponse_list_servicebaseresponse__"></a>
<a id="schema_DataResponse_List_ServiceBaseResponse__"></a>
<a id="tocSdataresponse_list_servicebaseresponse__"></a>
<a id="tocsdataresponse_list_servicebaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "service_metadata": null,
      "status": "string",
      "brand_id": "string",
      "branch_id": "string"
    }
  ]
}

```

DataResponse[List[ServiceBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[ServiceBaseResponse](#schemaservicebaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_SkillBaseResponse__">DataResponse_List_SkillBaseResponse__</h2>

<a id="schemadataresponse_list_skillbaseresponse__"></a>
<a id="schema_DataResponse_List_SkillBaseResponse__"></a>
<a id="tocSdataresponse_list_skillbaseresponse__"></a>
<a id="tocsdataresponse_list_skillbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "name": "string",
      "description": "string",
      "endpoint": "string",
      "method": "string",
      "parameters": {},
      "fixed_parameters": {},
      "headers": {},
      "is_active": true,
      "brand_id": "string"
    }
  ]
}

```

DataResponse[List[SkillBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[SkillBaseResponse](#schemaskillbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_List_UserBaseResponse__">DataResponse_List_UserBaseResponse__</h2>

<a id="schemadataresponse_list_userbaseresponse__"></a>
<a id="schema_DataResponse_List_UserBaseResponse__"></a>
<a id="tocSdataresponse_list_userbaseresponse__"></a>
<a id="tocsdataresponse_list_userbaseresponse__"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": [
    {
      "id": "string",
      "created_at": 0,
      "updated_at": 0,
      "sso_key": "string",
      "username": "string",
      "email": "user@example.com",
      "dob": 0,
      "gender": "string",
      "first_name": "string",
      "last_name": "string",
      "full_name": "string",
      "phone": "string",
      "address": "string",
      "identity_card": "string",
      "identity_card_date": 0,
      "identity_card_place": "string",
      "is_active": true,
      "last_login": 0,
      "roles": [
        "string"
      ]
    }
  ]
}

```

DataResponse[List[UserBaseResponse]]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|any|false|none|Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[[UserBaseResponse](#schemauserbaseresponse)]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DataResponse_LongTermBaseResponse_">DataResponse_LongTermBaseResponse_</h2>

<a id="schemadataresponse_longtermbaseresponse_"></a>
<a id="schema_DataResponse_LongTermBaseResponse_"></a>
<a id="tocSdataresponse_longtermbaseresponse_"></a>
<a id="tocsdataresponse_longtermbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "user_id": "string",
    "name": "string",
    "gender": "string",
    "phone": "string",
    "description": "string",
    "language": "string",
    "bot_id": "string"
  }
}

```

DataResponse[LongTermBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[LongTermBaseResponse](#schemalongtermbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_MessageBaseResponse_">DataResponse_MessageBaseResponse_</h2>

<a id="schemadataresponse_messagebaseresponse_"></a>
<a id="schema_DataResponse_MessageBaseResponse_"></a>
<a id="tocSdataresponse_messagebaseresponse_"></a>
<a id="tocsdataresponse_messagebaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "content": "string",
    "sender_type": "user",
    "metadata_info": {}
  }
}

```

DataResponse[MessageBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[MessageBaseResponse](#schemamessagebaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_SearchResponse_">DataResponse_SearchResponse_</h2>

<a id="schemadataresponse_searchresponse_"></a>
<a id="schema_DataResponse_SearchResponse_"></a>
<a id="tocSdataresponse_searchresponse_"></a>
<a id="tocsdataresponse_searchresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "message": "string",
    "user_location": "string",
    "stores": [
      {
        "idStore": 0,
        "province": "string",
        "address": "string",
        "storeImage": "string",
        "mapUrl": "string",
        "latitude": 0,
        "longitude": 0,
        "active": true,
        "under": true,
        "businessLicense": "string",
        "timeOpenClose": "string",
        "description": "string",
        "nameTypeStore": "string"
      }
    ],
    "distance_km": 0
  }
}

```

DataResponse[SearchResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[SearchResponse](#schemasearchresponse)|false|none||none|

<h2 id="tocS_DataResponse_ServiceBaseResponse_">DataResponse_ServiceBaseResponse_</h2>

<a id="schemadataresponse_servicebaseresponse_"></a>
<a id="schema_DataResponse_ServiceBaseResponse_"></a>
<a id="tocSdataresponse_servicebaseresponse_"></a>
<a id="tocsdataresponse_servicebaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "service_metadata": null,
    "status": "string",
    "brand_id": "string",
    "branch_id": "string"
  }
}

```

DataResponse[ServiceBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[ServiceBaseResponse](#schemaservicebaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_SkillBaseResponse_">DataResponse_SkillBaseResponse_</h2>

<a id="schemadataresponse_skillbaseresponse_"></a>
<a id="schema_DataResponse_SkillBaseResponse_"></a>
<a id="tocSdataresponse_skillbaseresponse_"></a>
<a id="tocsdataresponse_skillbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "name": "string",
    "description": "string",
    "endpoint": "string",
    "method": "string",
    "parameters": {},
    "fixed_parameters": {},
    "headers": {},
    "is_active": true,
    "brand_id": "string"
  }
}

```

DataResponse[SkillBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[SkillBaseResponse](#schemaskillbaseresponse)|false|none||none|

<h2 id="tocS_DataResponse_TokenResponse_">DataResponse_TokenResponse_</h2>

<a id="schemadataresponse_tokenresponse_"></a>
<a id="schema_DataResponse_TokenResponse_"></a>
<a id="tocSdataresponse_tokenresponse_"></a>
<a id="tocsdataresponse_tokenresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "access_token": "string",
    "expires_in": 604800,
    "refresh_expires_in": 604800,
    "token_type": "Bearer"
  }
}

```

DataResponse[TokenResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[TokenResponse](#schematokenresponse)|false|none||none|

<h2 id="tocS_DataResponse_UserBaseResponse_">DataResponse_UserBaseResponse_</h2>

<a id="schemadataresponse_userbaseresponse_"></a>
<a id="schema_DataResponse_UserBaseResponse_"></a>
<a id="tocSdataresponse_userbaseresponse_"></a>
<a id="tocsdataresponse_userbaseresponse_"></a>

```json
{
  "http_code": 200,
  "success": true,
  "message": "string",
  "metadata": {
    "page": 0,
    "page_size": 0,
    "total": 0
  },
  "data": {
    "id": "string",
    "created_at": 0,
    "updated_at": 0,
    "sso_key": "string",
    "username": "string",
    "email": "user@example.com",
    "dob": 0,
    "gender": "string",
    "first_name": "string",
    "last_name": "string",
    "full_name": "string",
    "phone": "string",
    "address": "string",
    "identity_card": "string",
    "identity_card_date": 0,
    "identity_card_place": "string",
    "is_active": true,
    "last_login": 0,
    "roles": [
      "string"
    ]
  }
}

```

DataResponse[UserBaseResponse]

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|http_code|any|false|none|Http Code|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|success|any|false|none|Success|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata|[MetadataResponse](#schemametadataresponse)|false|none||none|
|data|[UserBaseResponse](#schemauserbaseresponse)|false|none||none|

<h2 id="tocS_DocumentBaseResponse">DocumentBaseResponse</h2>

<a id="schemadocumentbaseresponse"></a>
<a id="schema_DocumentBaseResponse"></a>
<a id="tocSdocumentbaseresponse"></a>
<a id="tocsdocumentbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}

```

DocumentBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|title|string|true|none|Title|none|
|page_content|string|true|none|Page Content|none|
|meta_data|any|false|none|Meta Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|object|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_DocumentCreateRequest">DocumentCreateRequest</h2>

<a id="schemadocumentcreaterequest"></a>
<a id="schema_DocumentCreateRequest"></a>
<a id="tocSdocumentcreaterequest"></a>
<a id="tocsdocumentcreaterequest"></a>

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}

```

DocumentCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|title|string|true|none|Title|none|
|page_content|string|true|none|Page Content|none|
|meta_data|any|false|none|Meta Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|object|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_DocumentSearchHitResponse">DocumentSearchHitResponse</h2>

<a id="schemadocumentsearchhitresponse"></a>
<a id="schema_DocumentSearchHitResponse"></a>
<a id="tocSdocumentsearchhitresponse"></a>
<a id="tocsdocumentsearchhitresponse"></a>

```json
{
  "id": null,
  "score": 0,
  "text": "string",
  "metadata": {},
  "payload": {}
}

```

DocumentSearchHitResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|any|true|none|Id|none|
|score|any|false|none|Score|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|text|string|true|none|Text|none|
|metadata|object|false|none|Metadata|none|
|payload|object|false|none|Payload|none|

<h2 id="tocS_DocumentSearchRequest">DocumentSearchRequest</h2>

<a id="schemadocumentsearchrequest"></a>
<a id="schema_DocumentSearchRequest"></a>
<a id="tocSdocumentsearchrequest"></a>
<a id="tocsdocumentsearchrequest"></a>

```json
{
  "question": "string",
  "brand_id": "string",
  "limit": 5,
  "score_threshold": 0,
  "metadata_filter": {}
}

```

DocumentSearchRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|question|string|true|none|Question|none|
|brand_id|string|true|none|Brand Id|none|
|limit|integer|false|none|Limit|none|
|score_threshold|any|false|none|Score Threshold|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|metadata_filter|any|false|none|Metadata Filter|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|object|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_DocumentUpdateRequest">DocumentUpdateRequest</h2>

<a id="schemadocumentupdaterequest"></a>
<a id="schema_DocumentUpdateRequest"></a>
<a id="tocSdocumentupdaterequest"></a>
<a id="tocsdocumentupdaterequest"></a>

```json
{
  "title": "string",
  "page_content": "string",
  "meta_data": {},
  "brand_id": "string"
}

```

DocumentUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|title|any|false|none|Title|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|page_content|any|false|none|Page Content|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|meta_data|any|false|none|Meta Data|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|object|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_FAQBaseResponse">FAQBaseResponse</h2>

<a id="schemafaqbaseresponse"></a>
<a id="schema_FAQBaseResponse"></a>
<a id="tocSfaqbaseresponse"></a>
<a id="tocsfaqbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}

```

FAQBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|question|string|true|none|Question|none|
|answer|string|true|none|Answer|none|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_FAQCreateRequest">FAQCreateRequest</h2>

<a id="schemafaqcreaterequest"></a>
<a id="schema_FAQCreateRequest"></a>
<a id="tocSfaqcreaterequest"></a>
<a id="tocsfaqcreaterequest"></a>

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}

```

FAQCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|question|string|true|none|Question|none|
|answer|string|true|none|Answer|none|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_FAQUpdateRequest">FAQUpdateRequest</h2>

<a id="schemafaqupdaterequest"></a>
<a id="schema_FAQUpdateRequest"></a>
<a id="tocSfaqupdaterequest"></a>
<a id="tocsfaqupdaterequest"></a>

```json
{
  "question": "string",
  "answer": "string",
  "bot_id": "string"
}

```

FAQUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|question|any|false|none|Question|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|answer|any|false|none|Answer|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|any|false|none|Bot Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_GoalBaseResponse">GoalBaseResponse</h2>

<a id="schemagoalbaseresponse"></a>
<a id="schema_GoalBaseResponse"></a>
<a id="tocSgoalbaseresponse"></a>
<a id="tocsgoalbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "rule": "string",
  "target_goal": "string"
}

```

GoalBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|script|any|false|none|Script|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|intent_id|any|false|none|Intent Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|
|rule|any|false|none|Rule|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_GoalCreateRequest">GoalCreateRequest</h2>

<a id="schemagoalcreaterequest"></a>
<a id="schema_GoalCreateRequest"></a>
<a id="tocSgoalcreaterequest"></a>
<a id="tocsgoalcreaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}

```

GoalCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|script|string|true|none|Script|none|
|intent_id|any|false|none|Intent Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|rule|any|false|none|Rule|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_GoalUpdateRequest">GoalUpdateRequest</h2>

<a id="schemagoalupdaterequest"></a>
<a id="schema_GoalUpdateRequest"></a>
<a id="tocSgoalupdaterequest"></a>
<a id="tocsgoalupdaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "script": "string",
  "intent_id": "string",
  "bot_id": "string",
  "target_goal": "string",
  "rule": "string"
}

```

GoalUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|script|any|false|none|Script|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|intent_id|any|false|none|Intent Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|any|false|none|Bot Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|rule|any|false|none|Rule|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_HTTPValidationError">HTTPValidationError</h2>

<a id="schemahttpvalidationerror"></a>
<a id="schema_HTTPValidationError"></a>
<a id="tocShttpvalidationerror"></a>
<a id="tocshttpvalidationerror"></a>

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

HTTPValidationError

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|detail|[[ValidationError](#schemavalidationerror)]|false|none|Detail|none|

<h2 id="tocS_IntentBaseResponse">IntentBaseResponse</h2>

<a id="schemaintentbaseresponse"></a>
<a id="schema_IntentBaseResponse"></a>
<a id="tocSintentbaseresponse"></a>
<a id="tocsintentbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}

```

IntentBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|example|any|false|none|Example|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_IntentCreateRequest">IntentCreateRequest</h2>

<a id="schemaintentcreaterequest"></a>
<a id="schema_IntentCreateRequest"></a>
<a id="tocSintentcreaterequest"></a>
<a id="tocsintentcreaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}

```

IntentCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|example|any|false|none|Example|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_IntentUpdateRequest">IntentUpdateRequest</h2>

<a id="schemaintentupdaterequest"></a>
<a id="schema_IntentUpdateRequest"></a>
<a id="tocSintentupdaterequest"></a>
<a id="tocsintentupdaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "target_goal": "string",
  "example": {},
  "bot_id": "string"
}

```

IntentUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|target_goal|any|false|none|Target Goal|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|example|any|false|none|Example|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|any|false|none|Bot Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_LoginRequest">LoginRequest</h2>

<a id="schemaloginrequest"></a>
<a id="schema_LoginRequest"></a>
<a id="tocSloginrequest"></a>
<a id="tocsloginrequest"></a>

```json
{
  "username": "string",
  "password": "string"
}

```

LoginRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|username|string|true|none|Username|none|
|password|string|true|none|Password|none|

<h2 id="tocS_LongTermBaseResponse">LongTermBaseResponse</h2>

<a id="schemalongtermbaseresponse"></a>
<a id="schema_LongTermBaseResponse"></a>
<a id="tocSlongtermbaseresponse"></a>
<a id="tocslongtermbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}

```

LongTermBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|user_id|string|true|none|User Id|none|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|language|any|false|none|Language|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_LongTermCreateRequest">LongTermCreateRequest</h2>

<a id="schemalongtermcreaterequest"></a>
<a id="schema_LongTermCreateRequest"></a>
<a id="tocSlongtermcreaterequest"></a>
<a id="tocslongtermcreaterequest"></a>

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}

```

LongTermCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|user_id|string|true|none|User Id|none|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|language|any|false|none|Language|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|string|true|none|Bot Id|none|

<h2 id="tocS_LongTermUpdateRequest">LongTermUpdateRequest</h2>

<a id="schemalongtermupdaterequest"></a>
<a id="schema_LongTermUpdateRequest"></a>
<a id="tocSlongtermupdaterequest"></a>
<a id="tocslongtermupdaterequest"></a>

```json
{
  "user_id": "string",
  "name": "string",
  "gender": "string",
  "phone": "string",
  "description": "string",
  "language": "string",
  "bot_id": "string"
}

```

LongTermUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|user_id|any|false|none|User Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|language|any|false|none|Language|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|bot_id|any|false|none|Bot Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_MessageBaseResponse">MessageBaseResponse</h2>

<a id="schemamessagebaseresponse"></a>
<a id="schema_MessageBaseResponse"></a>
<a id="tocSmessagebaseresponse"></a>
<a id="tocsmessagebaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}

```

MessageBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|content|string|true|none|Content|none|
|sender_type|[SenderType](#schemasendertype)|true|none||none|
|metadata_info|any|false|none|Metadata Info|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_MessageCreateRequest">MessageCreateRequest</h2>

<a id="schemamessagecreaterequest"></a>
<a id="schema_MessageCreateRequest"></a>
<a id="tocSmessagecreaterequest"></a>
<a id="tocsmessagecreaterequest"></a>

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}

```

MessageCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|content|string|true|none|Content|none|
|sender_type|[SenderType](#schemasendertype)|true|none||none|
|metadata_info|any|false|none|Metadata Info|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_MessageUpdateRequest">MessageUpdateRequest</h2>

<a id="schemamessageupdaterequest"></a>
<a id="schema_MessageUpdateRequest"></a>
<a id="tocSmessageupdaterequest"></a>
<a id="tocsmessageupdaterequest"></a>

```json
{
  "content": "string",
  "sender_type": "user",
  "metadata_info": {}
}

```

MessageUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|content|any|false|none|Content|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|sender_type|[SenderType](#schemasendertype)|false|none||none|
|metadata_info|any|false|none|Metadata Info|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_MetadataResponse">MetadataResponse</h2>

<a id="schemametadataresponse"></a>
<a id="schema_MetadataResponse"></a>
<a id="tocSmetadataresponse"></a>
<a id="tocsmetadataresponse"></a>

```json
{
  "page": 0,
  "page_size": 0,
  "total": 0
}

```

MetadataResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|page|integer|true|none|Page|none|
|page_size|integer|true|none|Page Size|none|
|total|integer|true|none|Total|none|

<h2 id="tocS_RegisterRequest">RegisterRequest</h2>

<a id="schemaregisterrequest"></a>
<a id="schema_RegisterRequest"></a>
<a id="tocSregisterrequest"></a>
<a id="tocsregisterrequest"></a>

```json
{
  "email": "user@example.com",
  "username": "string",
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string"
}

```

RegisterRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|email|string(email)|true|none|Email|none|
|username|string|true|none|Username|none|
|password|string|true|none|Password|none|
|dob|any|true|none|Dob|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|true|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|first_name|any|true|none|First Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|last_name|any|true|none|Last Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|full_name|any|true|none|Full Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|true|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|any|true|none|Address|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card|any|true|none|Identity Card|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_date|any|true|none|Identity Card Date|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_place|any|true|none|Identity Card Place|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_SearchRequest">SearchRequest</h2>

<a id="schemasearchrequest"></a>
<a id="schema_SearchRequest"></a>
<a id="tocSsearchrequest"></a>
<a id="tocssearchrequest"></a>

```json
{
  "address": "string",
  "search_formation": "nearest"
}

```

SearchRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|string|true|none|Address|none|
|search_formation|string|false|none|Search Formation|none|

#### Enum

|Name|Value|
|---|---|
|search_formation|nearest|
|search_formation|in_area|

<h2 id="tocS_SearchResponse">SearchResponse</h2>

<a id="schemasearchresponse"></a>
<a id="schema_SearchResponse"></a>
<a id="tocSsearchresponse"></a>
<a id="tocssearchresponse"></a>

```json
{
  "message": "string",
  "user_location": "string",
  "stores": [
    {
      "idStore": 0,
      "province": "string",
      "address": "string",
      "storeImage": "string",
      "mapUrl": "string",
      "latitude": 0,
      "longitude": 0,
      "active": true,
      "under": true,
      "businessLicense": "string",
      "timeOpenClose": "string",
      "description": "string",
      "nameTypeStore": "string"
    }
  ],
  "distance_km": 0
}

```

SearchResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|message|any|false|none|Message|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|user_location|any|false|none|User Location|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|stores|[[Store](#schemastore)]|true|none|Stores|none|
|distance_km|any|false|none|Distance Km|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_SenderType">SenderType</h2>

<a id="schemasendertype"></a>
<a id="schema_SenderType"></a>
<a id="tocSsendertype"></a>
<a id="tocssendertype"></a>

```json
"user"

```

SenderType

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|SenderType|string|false|none|SenderType|none|

#### Enum

|Name|Value|
|---|---|
|SenderType|user|
|SenderType|ai|

<h2 id="tocS_ServiceBaseResponse">ServiceBaseResponse</h2>

<a id="schemaservicebaseresponse"></a>
<a id="schema_ServiceBaseResponse"></a>
<a id="tocSservicebaseresponse"></a>
<a id="tocsservicebaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "description": "string",
  "service_metadata": null,
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}

```

ServiceBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|service_metadata|any|true|none|Service Metadata|none|
|status|string|true|none|Status|none|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|branch_id|any|false|none|Branch Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_ServiceCreateRequest">ServiceCreateRequest</h2>

<a id="schemaservicecreaterequest"></a>
<a id="schema_ServiceCreateRequest"></a>
<a id="tocSservicecreaterequest"></a>
<a id="tocsservicecreaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": null,
  "status": "active",
  "brand_id": "string",
  "branch_id": "string"
}

```

ServiceCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|description|string|true|none|Description|none|
|service_metadata|any|true|none|Service Metadata|none|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|branch_id|any|false|none|Branch Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_ServiceUpdateRequest">ServiceUpdateRequest</h2>

<a id="schemaserviceupdaterequest"></a>
<a id="schema_ServiceUpdateRequest"></a>
<a id="tocSserviceupdaterequest"></a>
<a id="tocsserviceupdaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "service_metadata": {},
  "status": "string",
  "brand_id": "string",
  "branch_id": "string"
}

```

ServiceUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|service_metadata|any|false|none|Service Metadata|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|status|any|false|none|Status|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|branch_id|any|false|none|Branch Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_SkillBaseResponse">SkillBaseResponse</h2>

<a id="schemaskillbaseresponse"></a>
<a id="schema_SkillBaseResponse"></a>
<a id="tocSskillbaseresponse"></a>
<a id="tocsskillbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}

```

SkillBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|name|string|true|none|Name|none|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|endpoint|any|false|none|Endpoint|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|method|any|false|none|Method|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|parameters|any|false|none|Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|fixed_parameters|any|false|none|Fixed Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|headers|any|false|none|Headers|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|is_active|boolean|true|none|Is Active|none|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_SkillCreateRequest">SkillCreateRequest</h2>

<a id="schemaskillcreaterequest"></a>
<a id="schema_SkillCreateRequest"></a>
<a id="tocSskillcreaterequest"></a>
<a id="tocsskillcreaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}

```

SkillCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|string|true|none|Name|none|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|endpoint|any|false|none|Endpoint|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|method|any|false|none|Method|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|parameters|any|false|none|Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|fixed_parameters|any|false|none|Fixed Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|headers|any|false|none|Headers|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|is_active|any|false|none|Is Active|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|string|true|none|Brand Id|none|

<h2 id="tocS_SkillUpdateRequest">SkillUpdateRequest</h2>

<a id="schemaskillupdaterequest"></a>
<a id="schema_SkillUpdateRequest"></a>
<a id="tocSskillupdaterequest"></a>
<a id="tocsskillupdaterequest"></a>

```json
{
  "name": "string",
  "description": "string",
  "endpoint": "string",
  "method": "string",
  "parameters": {},
  "fixed_parameters": {},
  "headers": {},
  "is_active": true,
  "brand_id": "string"
}

```

SkillUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|name|any|false|none|Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|endpoint|any|false|none|Endpoint|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|method|any|false|none|Method|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|parameters|any|false|none|Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|fixed_parameters|any|false|none|Fixed Parameters|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|headers|any|false|none|Headers|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|any|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|is_active|any|false|none|Is Active|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|brand_id|any|false|none|Brand Id|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_Store">Store</h2>

<a id="schemastore"></a>
<a id="schema_Store"></a>
<a id="tocSstore"></a>
<a id="tocsstore"></a>

```json
{
  "idStore": 0,
  "province": "string",
  "address": "string",
  "storeImage": "string",
  "mapUrl": "string",
  "latitude": 0,
  "longitude": 0,
  "active": true,
  "under": true,
  "businessLicense": "string",
  "timeOpenClose": "string",
  "description": "string",
  "nameTypeStore": "string"
}

```

Store

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|idStore|integer|true|none|Idstore|none|
|province|string|true|none|Province|none|
|address|string|true|none|Address|none|
|storeImage|any|false|none|Storeimage|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|mapUrl|any|false|none|Mapurl|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|latitude|number|true|none|Latitude|none|
|longitude|number|true|none|Longitude|none|
|active|boolean|true|none|Active|none|
|under|boolean|true|none|Under|none|
|businessLicense|any|false|none|Businesslicense|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|timeOpenClose|any|false|none|Timeopenclose|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|nameTypeStore|any|false|none|Nametypestore|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_TokenResponse">TokenResponse</h2>

<a id="schematokenresponse"></a>
<a id="schema_TokenResponse"></a>
<a id="tocStokenresponse"></a>
<a id="tocstokenresponse"></a>

```json
{
  "access_token": "string",
  "expires_in": 604800,
  "refresh_expires_in": 604800,
  "token_type": "Bearer"
}

```

TokenResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|access_token|string|true|none|Access Token|none|
|expires_in|any|false|none|Expires In|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|refresh_expires_in|any|false|none|Refresh Expires In|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|token_type|any|false|none|Token Type|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_UserBaseResponse">UserBaseResponse</h2>

<a id="schemauserbaseresponse"></a>
<a id="schema_UserBaseResponse"></a>
<a id="tocSuserbaseresponse"></a>
<a id="tocsuserbaseresponse"></a>

```json
{
  "id": "string",
  "created_at": 0,
  "updated_at": 0,
  "sso_key": "string",
  "username": "string",
  "email": "user@example.com",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "last_login": 0,
  "roles": [
    "string"
  ]
}

```

UserBaseResponse

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|id|string|true|none|Id|none|
|created_at|number|true|none|Created At|none|
|updated_at|number|true|none|Updated At|none|
|sso_key|any|false|none|Sso Key|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|username|any|false|none|Username|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|email|string(email)|true|none|Email|none|
|dob|any|false|none|Dob|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|first_name|any|false|none|First Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|last_name|any|false|none|Last Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|full_name|any|false|none|Full Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|any|false|none|Address|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card|any|false|none|Identity Card|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_date|any|false|none|Identity Card Date|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_place|any|false|none|Identity Card Place|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|is_active|any|false|none|Is Active|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|last_login|any|false|none|Last Login|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|roles|[string]|true|none|Roles|none|

<h2 id="tocS_UserCreateRequest">UserCreateRequest</h2>

<a id="schemausercreaterequest"></a>
<a id="schema_UserCreateRequest"></a>
<a id="tocSusercreaterequest"></a>
<a id="tocsusercreaterequest"></a>

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "username": "string",
  "email": "user@example.com",
  "is_active": true,
  "roles": [
    "Guest"
  ]
}

```

UserCreateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|password|string|true|none|Password|none|
|dob|any|false|none|Dob|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|first_name|any|false|none|First Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|last_name|any|false|none|Last Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|full_name|any|false|none|Full Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|any|false|none|Address|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card|any|false|none|Identity Card|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_date|any|false|none|Identity Card Date|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_place|any|false|none|Identity Card Place|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|username|any|true|none|Username|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|email|string(email)|true|none|Email|none|
|is_active|any|false|none|Is Active|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|roles|[string]|false|none|Roles|none|

<h2 id="tocS_UserInfo">UserInfo</h2>

<a id="schemauserinfo"></a>
<a id="schema_UserInfo"></a>
<a id="tocSuserinfo"></a>
<a id="tocsuserinfo"></a>

```json
{
  "user_id": "string",
  "name": "string",
  "phone": "string",
  "description": "string",
  "gender": "string",
  "language": "string"
}

```

UserInfo

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|user_id|string|true|none|User Id|Unique identifier for the user|
|name|any|false|none|Name|Name of the user|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|Phone number of the user|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|description|any|false|none|Description|Description of the user|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|Gender of the user|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|language|any|false|none|Language|Language of the user|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_UserUpdateRequest">UserUpdateRequest</h2>

<a id="schemauserupdaterequest"></a>
<a id="schema_UserUpdateRequest"></a>
<a id="tocSuserupdaterequest"></a>
<a id="tocsuserupdaterequest"></a>

```json
{
  "password": "string",
  "dob": 0,
  "gender": "string",
  "first_name": "string",
  "last_name": "string",
  "full_name": "string",
  "phone": "string",
  "address": "string",
  "identity_card": "string",
  "identity_card_date": 0,
  "identity_card_place": "string",
  "is_active": true,
  "roles": [
    "string"
  ]
}

```

UserUpdateRequest

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|password|any|false|none|Password|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|dob|any|false|none|Dob|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|gender|any|false|none|Gender|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|first_name|any|false|none|First Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|last_name|any|false|none|Last Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|full_name|any|false|none|Full Name|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|phone|any|false|none|Phone|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|address|any|false|none|Address|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card|any|false|none|Identity Card|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_date|any|false|none|Identity Card Date|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|number|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|identity_card_place|any|false|none|Identity Card Place|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|is_active|any|false|none|Is Active|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|boolean|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|roles|any|false|none|Roles|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|[string]|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|null|false|none||none|

<h2 id="tocS_ValidationError">ValidationError</h2>

<a id="schemavalidationerror"></a>
<a id="schema_ValidationError"></a>
<a id="tocSvalidationerror"></a>
<a id="tocsvalidationerror"></a>

```json
{
  "loc": [
    "string"
  ],
  "msg": "string",
  "type": "string"
}

```

ValidationError

### Attribute

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|loc|[anyOf]|true|none|Location|none|

anyOf

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|string|false|none||none|

or

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|» *anonymous*|integer|false|none||none|

continued

|Name|Type|Required|Restrictions|Title|Description|
|---|---|---|---|---|---|
|msg|string|true|none|Message|none|
|type|string|true|none|Error Type|none|

