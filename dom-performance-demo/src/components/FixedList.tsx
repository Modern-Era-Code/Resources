import { FixedSizeList } from "react-window";
import { FoodCard } from "./FoodCard";
import { FoodItem } from "../types/FoodItem";

interface RowData {
  foods: FoodItem[];
  onCardClick: (food: FoodItem) => void;
  onAddToCart: (food: FoodItem) => void;
  onToggleFavorite: (food: FoodItem) => void;
  loadMoreItems: () => void;
}

// Row component that renders FoodCard
const Row = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: RowData;
}) => (
  <div style={style}>
    <FoodCard
      food={data.foods[index]}
      onCardClick={data.onCardClick}
      onAddToCart={data.onAddToCart}
      onToggleFavorite={data.onToggleFavorite}
    />
  </div>
);

interface FixedListProps {
  foods: FoodItem[];
  onCardClick: (food: FoodItem) => void;
  onAddToCart: (food: FoodItem) => void;
  onToggleFavorite: (food: FoodItem) => void;
  loadMoreItems: () => void;
}

// List component that uses FoodCard in a virtualized list
export const FixedList: React.FC<FixedListProps> = ({
  foods,
  onCardClick,
  onAddToCart,
  onToggleFavorite,
  loadMoreItems,
}) => {
  const itemData: RowData = {
    foods,
    onCardClick,
    onAddToCart,
    onToggleFavorite,
    loadMoreItems,
  };

  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={foods.length}
      itemSize={320}
      itemData={itemData}
      overscanCount={2}
      className="food-list"
      onItemsRendered={({ visibleStopIndex }) => {
        if (visibleStopIndex >= foods.length - 5) {
          loadMoreItems();
        }
      }}
    >
      {Row}
    </FixedSizeList>
  );
};
