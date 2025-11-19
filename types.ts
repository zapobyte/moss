
export type Page = 'intro' | 'home' | 'shop' | 'about' | 'contact' | 'projects' | 'project-details';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  location?: string;
  client?: string;
  description?: string;
  content?: string[];
  gallery?: string[];
}
