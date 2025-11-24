const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface MessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface MessageResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: string;
    name: string;
    email: string;
    subject: string;
    createdAt: string;
  };
}

export const sendMessage = async (data: MessageData): Promise<MessageResponse> => {
  const response = await fetch(`${API_URL}/api/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to send message');
  }

  return result;
};

export const getMessages = async (page = 1, limit = 10, sort = '-createdAt') => {
  const response = await fetch(
    `${API_URL}/api/messages?page=${page}&limit=${limit}&sort=${sort}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  return response.json();
};

export const getMessage = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }

  return response.json();
};

export const markMessageAsRead = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}/read`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to mark message as read');
  }

  return response.json();
};

export const deleteMessage = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete message');
  }

  return response.json();
};

