export type PropertyType = 'house' | 'apartment' | 'penthouse' | 'villa' | 'loft' | 'townhouse';
export type PropertyStatus = 'for-sale' | 'for-rent' | 'sold';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: PropertyType;
  status: PropertyStatus;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  images: string[];
  features: string[];
  agent: Agent;
  featured: boolean;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Filters {
  search: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  bathrooms: number | null;
  type: PropertyType | null;
  minArea: number;
  maxArea: number;
  status: PropertyStatus | null;
}
