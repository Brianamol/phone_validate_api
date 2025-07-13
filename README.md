# 📱 Phone Validate API

This microservice provides:

- ✅ Kenyan phone number validation
- 🔍 Book listing lookup by client ID from MySQL

## 🧪 Endpoints

| Method | Endpoint                  | Description                  |
| ------ | ------------------------- | ---------------------------- |
| GET    | `/api/account/:client_id` | Fetch booklisting by ID      |
| POST   | `/validate`               | Validate Kenyan phone number |

## 🐳 Run with Docker

```bash
docker-compose up --build
```
