import React, { useState, useEffect, useMemo, useTransition } from "react";
import { FoodItem } from "./types/FoodItem";
import { FoodApiService } from "./services/FoodApiService";
import { FoodList } from "./components/FoodList";
import "./App.css";
import { useFoods } from "./services/useFoods";
import { FixedList } from "./components/FixedList";

function App() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [renderTime, setRenderTime] = useState<number | null>(null);

  const { data, error, isLoading, fetchNextPage, hasNextPage, refetch } =
    useFoods();

  const [isPending, startTransition] = useTransition();

  const loadMoreItems = () => {
    if (hasNextPage) {
      startTransition(() => {
        fetchNextPage();
      });
    }
  };

  // Flatten pages into a single list
  const foods = useMemo(() => {
    if (!data?.pages) return [] as FoodItem[];
    return (data.pages as Array<{ items: FoodItem[] }>).flatMap((p) => p.items);
  }, [data]);

  // Measure render time when foods changes
  useEffect(() => {
    if (!data) return;
    const start = performance.now();
    // Wait for next paint to measure render cost

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const end = performance.now();
        setRenderTime(end - start);
      });
    });
  }, [foods]);

  const handleCardClick = (food: FoodItem) => {
    setSelectedFood(food);
    console.log("Selected food:", food);
  };

  const handleAddToCart = (food: FoodItem) => {
    setCart((prev) => [...prev, food]);
    console.log("Added to cart:", food.name);
  };

  const handleToggleFavorite = (food: FoodItem) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(food.id)) {
        newFavorites.delete(food.id);
      } else {
        newFavorites.add(food.id);
      }
      return newFavorites;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading delicious food items...</h2>
          <p>Simulating server fetch with 1 second delay</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Error loading food items</h2>
          <p>{error}</p>
          <button onClick={refetch} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍽️ Food Performance Demo</h1>
        <div className="performance-info">
          <div className="stats">
            <span>Items: {foods.length}</span>
            <span>Cart: {cart.length}</span>
            <span>Favorites: {favorites.size}</span>
            {renderTime && <span>Render: {renderTime.toFixed(2)}ms</span>}
          </div>
          <div className="actions">
            <button onClick={clearCart} className="action-btn">
              Clear Cart
            </button>
            <button onClick={clearFavorites} className="action-btn">
              Clear Favorites
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <FixedList
          foods={foods}
          onCardClick={handleCardClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          loadMoreItems={loadMoreItems}
        />
      </main>

      {selectedFood && (
        <div className="modal-overlay" onClick={() => setSelectedFood(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedFood.name}</h3>
            <p>{selectedFood.description}</p>
            <div className="modal-details">
              <p>
                <strong>Category:</strong> {selectedFood.category}
              </p>
              <p>
                <strong>Price:</strong> ${selectedFood.price.toFixed(2)}
              </p>
              <p>
                <strong>Calories:</strong> {selectedFood.calories}
              </p>
              <p>
                <strong>Prep Time:</strong> {selectedFood.prepTime} minutes
              </p>
              <p>
                <strong>Ingredients:</strong>{" "}
                {selectedFood.ingredients.join(", ")}
              </p>
            </div>
            <button onClick={() => setSelectedFood(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
