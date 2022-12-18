# Backend

Run using yarn (Node 16.13)

To migrate
```
yarn migrate up
```

Don't forget to docker-compose up first for database.

# Database Configuration

Set `DATABASE_URL` in this format 

```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

Example:
```
DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres
```

# Firebase Configuration

To get Firebase Config for `.env`, please follow this instruction here
[Add the Firebase Admin SDK to your server](https://firebase.google.com/docs/admin/setup#initialize-sdk)

TODO: disable auth check if it runs on dev instead
