import { FoodItem } from '../types/FoodItem';

const categories = [
  'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian', 'French', 'Thai', 'Chinese', 'Japanese'
];

const ingredients = [
  'tomatoes', 'onions', 'garlic', 'olive oil', 'basil', 'oregano', 'cheese', 'pasta', 'rice', 'chicken',
  'beef', 'fish', 'shrimp', 'mushrooms', 'bell peppers', 'spinach', 'avocado', 'cilantro', 'ginger', 'soy sauce'
];

const tags = [
  'spicy', 'mild', 'sweet', 'savory', 'creamy', 'crispy', 'tender', 'fresh', 'aromatic', 'hearty'
];

const foodNames = [
  'Margherita Pizza', 'Chicken Tacos', 'Pad Thai', 'Caesar Salad', 'Beef Stir Fry', 'Fish Tacos',
  'Pasta Carbonara', 'Chicken Curry', 'Sushi Roll', 'Greek Salad', 'BBQ Ribs', 'Vegetable Soup',
  'Chicken Wings', 'Fried Rice', 'Burger Deluxe', 'Shrimp Scampi', 'Chicken Parmesan', 'Vegetable Stir Fry',
  'Beef Tacos', 'Salmon Teriyaki', 'Pasta Primavera', 'Chicken Fried Rice', 'Vegetable Curry', 'Beef Burger',
  'Chicken Salad', 'Fish and Chips', 'Vegetable Pasta', 'Chicken Teriyaki', 'Beef Noodles', 'Shrimp Fried Rice'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateFoodItem(id: number): FoodItem {
  const name = getRandomElement(foodNames);
  const category = getRandomElement(categories);
  const ingredientCount = Math.floor(Math.random() * 5) + 3;
  const tagCount = Math.floor(Math.random() * 3) + 1;
  
  return {
    id,
    name: `${name} ${id}`,
    description: `Delicious ${name.toLowerCase()} with fresh ingredients and authentic flavors. Perfect for any occasion.`,
    category,
    price: Math.round((Math.random() * 25 + 5) * 100) / 100,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    imageUrl: `https://picsum.photos/300/200?random=${id}`,
    calories: Math.floor(Math.random() * 800) + 200,
    prepTime: Math.floor(Math.random() * 45) + 15,
    ingredients: getRandomElements(ingredients, ingredientCount),
    isVegetarian: Math.random() > 0.6,
    isGlutenFree: Math.random() > 0.7,
    tags: getRandomElements(tags, tagCount)
  };
}

export function generateFoodData(count: number = 1500): FoodItem[] {
  return Array.from({ length: count }, (_, index) => generateFoodItem(index + 1));
}

