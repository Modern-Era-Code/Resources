import React from 'react';
import { FoodItem } from '../types/FoodItem';
import './FoodCard.css';

interface FoodCardProps {
  food: FoodItem;
  onCardClick: (food: FoodItem) => void;
  onAddToCart: (food: FoodItem) => void;
  onToggleFavorite: (food: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  food,
  onCardClick,
  onAddToCart,
  onToggleFavorite
}) => {
  const handleCardClick = () => {
    onCardClick(food);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(food);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(food);
  };

  return (
    <div className="food-card" onClick={handleCardClick}>
      <div className="food-card-image">
        <img src={food.imageUrl} alt={food.name} />
        <button
          className="favorite-btn"
          onClick={handleToggleFavorite}
          aria-label="Toggle favorite"
        >
          ♥
        </button>
      </div>

      <div className="food-card-content">
        <div className="food-card-header">
          <h3 className="food-name">{food.name}</h3>
          <div className="food-rating">
            ⭐ {food.rating}
          </div>
        </div>

        <p className="food-description">{food.description}</p>

        <div className="food-meta">
          <span className="food-category">{food.category}</span>
          <span className="food-calories">{food.calories} cal</span>
          <span className="food-prep-time">{food.prepTime} min</span>
        </div>

        <div className="food-tags">
          {food.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
          {food.isVegetarian && <span className="tag vegetarian">Vegetarian</span>}
          {food.isGlutenFree && <span className="tag gluten-free">Gluten Free</span>}
        </div>

        <div className="food-card-footer">
          <div className="food-price">${food.price.toFixed(2)}</div>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

