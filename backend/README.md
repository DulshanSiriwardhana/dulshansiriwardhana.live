# Backend API

Backend server for the personal portfolio website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Messages

- `POST /api/messages` - Create a new message
  - Body: `{ name, email, subject, message }`
  - Returns: Created message object

- `GET /api/messages` - Get all messages
  - Query params: `page`, `limit`, `sort`
  - Returns: Array of messages with pagination info

- `GET /api/messages/:id` - Get a single message by ID
  - Returns: Message object

- `PATCH /api/messages/:id/read` - Mark message as read
  - Returns: Updated message object

- `DELETE /api/messages/:id` - Delete a message
  - Returns: Success message

### Health Check

- `GET /api/health` - Check server status
  - Returns: `{ status: 'ok', message: 'Server is running' }`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

