## 🔴 Demo

### 🔴 🖼️ Screenshot

<a href="https://pridebnath.github.io/future-blink-assessment">
<img height="480" src="frontend/public/future-blink-assessment-by-pritam-debnath.png" />
</a>


### 🔴 🎥 Video

https://github.com/user-attachments/assets/92bee06f-802d-4be4-90b3-9d84773cc928


⬇️ <a href="frontend/public/future-blink-assessment-by-pritam-debnath.webm" download="future-blink-assessment.mp4">
  Download Demo Video
</a>



### 🔴 ↗️ Link
https://pridebnath.github.io/future-blink-assessment



---
# Set Up 
## Frontend Set Up
```
cd future-blink-assessment
``` 
```
pnpm install
``` 
```
npm run corepack:enable
``` 
```
cd frontend
``` 
```
npm run dev
``` 
## Backend Set Up
```
cd future-blink-assessment
``` 
```
pnpm install
``` 
```
npm run corepack:enable
``` 
```
cd backend
``` 
```
npm run dev
```
---

#  Docs
## Backend docs
### MongoDB Connection Notes
- DB name comes from `MONGO_URI` from `.env` file (not schema/model)
- No DB in URI → defaults to `test`
- Add DB: `/db-name` before `?`
- Multiple hosts = same cluster (replica set)
- Mongoose pluralizes model → collection
