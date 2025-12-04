const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

