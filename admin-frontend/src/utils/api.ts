const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

const handleAuthError = (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }
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
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  handleAuthError(response);

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

  const response = await fetch(`${API_URL}/api/project-euler?${params.toString()}`, {
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();
};

export const getProjectEulerArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`, {
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }

  return response.json();
};

export const updateProjectEulerArticle = async (id: string, data: Partial<ProjectEulerArticleData>) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  handleAuthError(response);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to update article');
  }

  return result;
};

export const deleteProjectEulerArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/api/project-euler/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to delete article');
  }

  return response.json();
};

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export const getMessages = async (page = 1, limit = 20, sort = '-createdAt') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
  });

  const response = await fetch(`${API_URL}/api/messages?${params.toString()}`, {
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  return response.json();
};

export const getMessage = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}`, {
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }

  return response.json();
};

export const markMessageAsRead = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to mark message as read');
  }

  return response.json();
};

export const deleteMessage = async (id: string) => {
  const response = await fetch(`${API_URL}/api/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  handleAuthError(response);

  if (!response.ok) {
    throw new Error('Failed to delete message');
  }

  return response.json();
};

