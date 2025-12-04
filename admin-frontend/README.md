# Admin Frontend

Separate admin panel for managing Project Euler articles and messages.

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create `.env` file (for local development):
```
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
# or
yarn dev
```

The admin panel will run on `http://localhost:5174`

## Build

```bash
npm run build
# or
yarn build
```

## Deployment (Vercel)

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `VITE_API_URL` = `` (backend URL)

2. **Deploy:**
   ```bash
   vercel --prod
   ```

## Features

- Create, edit, and delete Project Euler articles
- Manage article metadata (tags, difficulty, publish status)
- Code editor for solutions
- Algorithm explanations
- Time and space complexity tracking
- View and manage contact messages
- Mark messages as read/unread
- JWT authentication

## API Configuration

The admin frontend requires a backend API. Make sure:

1. Backend is deployed and accessible
2. `VITE_API_URL` environment variable is set correctly
3. Backend CORS is configured to allow requests from admin frontend domain
