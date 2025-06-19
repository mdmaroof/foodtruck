import { colorStatusCircle, colorStatusRectangle } from "../helpers";

// Custom Circle Marker Icon
export const createCircleIcon = (status) => {
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" fill="${colorStatusCircle[status]}" stroke="white" stroke-width="2"/>
          <circle cx="10" cy="10" r="6" fill="${colorStatusCircle[status]}"/>
        </svg>
      `)}`,
    scaledSize: { width: 20, height: 20 },
    anchor: { x: 10, y: 10 },
  };
};

// Custom Rectangle Marker Icon
export const createRectangleIcon = (status) => {
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="22" height="14" rx="3" fill="${colorStatusRectangle[status]}" stroke="white" stroke-width="2"/>
          <rect x="3" y="3" width="18" height="10" rx="2" fill="${colorStatusRectangle[status]}"/>
        </svg>
      `)}`,
    scaledSize: { width: 32, height: 16 },
    anchor: { x: 16, y: 8 },
  };
};
