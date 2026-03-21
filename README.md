
---
# Backend 
## Backend setup
start development server 
```
npm start
```
## Backend docs
### MongoDB Connection Notes
- DB name comes from `MONGO_URI` from `.env` file (not schema/model)
- No DB in URI → defaults to `test`
- Add DB: `/db-name` before `?`
- Multiple hosts = same cluster (replica set)
- Mongoose pluralizes model → collection
