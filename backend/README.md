# Backend

Run using yarn (Node 16.13)

To migrate
```
yarn run migrate up
```

Don't forget to docker-compose up first for database.

If deploying on prod, change `DATABASE_URL` on `.env`