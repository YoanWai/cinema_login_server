# Prequiesties

- nodejs 16+

# Installing

- `npm install`

# Configuring

- Copy `.env.example` to `.env`
- Edit `.env` content
- Done

# Starting

- `npm start`

---

# API

## `/authenticate`

Request:

```json
{
  "email": "my.em@il.com",
  "password": "userpassword"
}
```

Response (valid request)

```json
{
  "success": true,
  "message": "authenticated successfully",
  "data": {
    "token": "...."
  }
}
```

Response (invalid request)

```json
{
  "success": false,
  "message": "invalid request payload",
  "data": {}
}
```

Response (invalid credentials)

```json
{
  "success": false,
  "message": "invalid credentials",
  "data": {}
}
```
