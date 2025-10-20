import React from 'react';
import { FoodItem } from '../types/FoodItem';
import { FoodCard } from './FoodCard';
import './FoodList.css';

interface FoodListProps {
  foods: FoodItem[];
  onCardClick: (food: FoodItem) => void;
  onAddToCart: (food: FoodItem) => void;
  onToggleFavorite: (food: FoodItem) => void;
}

export const FoodList: React.FC<FoodListProps> = ({
  foods,
  onCardClick,
  onAddToCart,
  onToggleFavorite
}) => {
  return (
    <div className="food-list">
      <div className="food-list-header">
        <h2>Food Items ({foods.length})</h2>
        <p>Click on any card to view details, or add items to cart</p>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onCardClick={onCardClick}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

