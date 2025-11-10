# Project Local Setup Guideline (Backend)


## Step 1. Clone the Repository

```bash
git clone https://github.com/S-M-Mazharul-Islam-RIfat/mind-mesh-ai-server.git
cd mind-mesh-ai
```
---

## Step 2. Install dependencies
```bash
npm install
```

---

## Step 3. Run Redis using Docker

---

## Step 4. Create an .env file
NODE_ENV=development <br>
SERVER_PORT=your_server_port <br>
CLIENT_PORT=your_client_port <br>
REDIS_HOST=127.0.0.1 <br>
REDIS_PORT=6379 <br>
DATABASE_URL=your_mongodb_database_url <br>
BCRYPT_SALT_ROUNDS=12 <br>
JWT_ACCESS_SECRET=your_jwt_access_secret <br>
JWT_REFRESH_SECRET=your_jwt_refresh_secret <br>
JWT_ACCESS_EXPIRES_IN=3d <br>
JWT_REFRESH_EXPIRES_IN=30d <br>
OPEN_API_KEY=your_open_api_key

---
## Step 5. Run the backend
npm run start:dev <br>
npm run start:worker