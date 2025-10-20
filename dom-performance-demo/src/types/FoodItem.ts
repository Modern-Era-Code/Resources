export interface FoodItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  calories: number;
  prepTime: number; // in minutes
  ingredients: string[];
  isVegetarian: boolean;
  isGlutenFree: boolean;
  tags: string[];
}
