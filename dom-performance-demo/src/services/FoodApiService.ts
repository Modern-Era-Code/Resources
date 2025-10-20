import { FoodItem } from "../types/FoodItem";
import { generateFoodData } from "../data/foodData";

// Simulate API delay
const API_DELAY = 1000; // 1 second

export class FoodApiService {
  private static foodData: FoodItem[] | null = null;

  static async fetchFoodItems(): Promise<FoodItem[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    // Generate data only once
    if (!this.foodData) {
      this.foodData = generateFoodData(1500);
    }

    return [...this.foodData]; // Return a copy
  }

  // Paginated fetch compatible with useInfiniteQuery
  static async fetchFoodPage({
    pageParam = 0,
    pageSize = 100,
  }: {
    pageParam?: number;
    pageSize?: number;
  }): Promise<{ items: FoodItem[]; nextCursor: number | undefined }> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, API_DELAY));

    if (!this.foodData) {
      this.foodData = generateFoodData(1500);
    }

    const start = pageParam;
    const end = Math.min(start + pageSize, this.foodData.length);
    const items = this.foodData.slice(start, end);
    const nextCursor = end < this.foodData.length ? end : undefined;

    return { items: [...items], nextCursor };
  }

  static async fetchFoodItemById(id: number): Promise<FoodItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!this.foodData) {
      this.foodData = generateFoodData(1500);
    }

    return this.foodData.find((item) => item.id === id) || null;
  }

  static async searchFoodItems(query: string): Promise<FoodItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!this.foodData) {
      this.foodData = generateFoodData(1500);
    }

    const lowercaseQuery = query.toLowerCase();
    return this.foodData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        item.category.toLowerCase().includes(lowercaseQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}

