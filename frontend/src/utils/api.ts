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

export interface ProjectEulerArticle {
  _id?: string;
  problemNumber: number;
  title: string;
  description: string;
  problemStatement: string;
  solution: {
    code: string;
    language: string;
    explanation: string;
    timeComplexity?: string;
    spaceComplexity?: string;
  };
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectEulerArticleData {
  problemNumber: number;
  title: string;
  description: string;
  problemStatement: string;
  solution: {
    code: string;
    language: string;
    explanation: string;
    timeComplexity?: string;
    spaceComplexity?: string;
  };
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  published?: boolean;
}

export const createProjectEulerArticle = async (data: ProjectEulerArticleData) => {
  const response = await fetch(`${API_URL}/api/project-euler`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create article');
  }

  return result;
};

export const getProjectEulerArticles = async (
  page = 1,
  limit = 12,
  sort = '-problemNumber',
  search = '',
  difficulty = '',
  published = ''
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  if (search) params.append('search', search);
  if (difficulty) params.append('difficulty', difficulty);
  if (published) params.append('published', published);

  const response = await fetch(`${API_URL}/api/project-euler?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();
};

export const getProjectEulerArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }

  return response.json();
};

export const getProjectEulerArticleByNumber = async (number: number) => {
  const response = await fetch(`${API_URL}/api/project-euler/problem/${number}`);

  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }

  return response.json();
};

export const updateProjectEulerArticle = async (id: string, data: Partial<ProjectEulerArticleData>) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update article');
  }

  return result;
};

export const deleteProjectEulerArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete article');
  }

  return response.json();
};

export const getCvTheme = async () => {
  try {
    const response = await fetch(`${API_URL}/api/settings/cv-theme`);
    if (!response.ok) return { value: 'emerald' };
    return response.json();
  } catch (error) {
    return { value: 'emerald' };
  }
};

