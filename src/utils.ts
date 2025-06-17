export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Project {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  language: 'JavaScript' | 'TypeScript' | 'Mixed';
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'travel' | 'work' | 'hobbies';
  caption: string;
}

// TypeScript utility functions
export const calculateProgress = (level: number): string => {
  return `${Math.min(level, 100)}%`;
};

export const getSkillColor = (level: number): string => {
  if (level >= 90) return 'bg-green-500';
  if (level >= 70) return 'bg-blue-500';
  if (level >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// TypeScript class
export class APIHelper {
  private static instance: APIHelper;
  
  public static getInstance(): APIHelper {
    if (!APIHelper.instance) {
      APIHelper.instance = new APIHelper();
    }
    return APIHelper.instance;
  }

  public async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json() as T;
  }

  public formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}