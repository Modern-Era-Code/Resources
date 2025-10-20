import { useInfiniteQuery } from "@tanstack/react-query";
import { FoodApiService } from "./FoodApiService";
import { FoodItem } from "../types/FoodItem";

type FoodPage = { items: FoodItem[]; nextCursor?: number };

const fetchFoods = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<FoodPage> => {
  const pageSize = 100;
  const res = await FoodApiService.fetchFoodPage({ pageParam, pageSize });
  return { items: res.items, nextCursor: res.nextCursor };
};

export const useFoods = () => {
  return useInfiniteQuery<FoodPage, Error>({
    queryKey: ["foods"],
    queryFn: fetchFoods,
    getNextPageParam: (lastPage: FoodPage) => lastPage.nextCursor,
  });
};
