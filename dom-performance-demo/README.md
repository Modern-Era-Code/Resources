# DOM Performance Demo

This project demonstrates the performance issues that occur when rendering a large number of DOM elements (1500 food items) at once.

## Features

- **1500 Food Items**: Realistic food data with images, descriptions, ratings, and metadata
- **Simulated API**: 1-second delay to simulate server fetching
- **Interactive Cards**: Click handlers, add to cart, favorites functionality
- **Performance Monitoring**: Real-time render time tracking
- **Responsive Design**: Works on desktop and mobile devices

## Performance Issues Demonstrated

1. **Initial Render Time**: Notice the delay when 1500 cards are rendered
2. **Scroll Performance**: Scrolling may be choppy with many DOM elements
3. **Memory Usage**: Browser memory consumption increases significantly
4. **Event Handler Overhead**: Each card has multiple event listeners

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Project Structure

```
src/
├── components/
│   ├── FoodCard.tsx      # Individual food item card
│   ├── FoodCard.css      # Card styling
│   ├── FoodList.tsx      # List container component
│   └── FoodList.css      # List styling
├── data/
│   └── foodData.ts       # Food data generator
├── services/
│   └── FoodApiService.ts # API simulation
├── types/
│   └── FoodItem.ts       # TypeScript interfaces
├── App.tsx               # Main application component
├── App.css               # Global styles
├── main.tsx              # React entry point
└── index.css             # Base styles
```

## Performance Solutions

This demo shows the problem. Common solutions include:

1. **Virtualization**: Only render visible items (react-window, react-virtualized)
2. **Pagination**: Load items in chunks
3. **Infinite Scrolling**: Load more items as user scrolls
4. **Memoization**: Use React.memo to prevent unnecessary re-renders
5. **Lazy Loading**: Load images and content on demand

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 (Grid, Flexbox, Animations)

