# Crave — Food Delivery UI

A responsive food-delivery frontend demo built with **HTML, CSS, and vanilla JavaScript**. The design includes restaurant-style food cards, category filters, dish search, item details, a working shopping cart, and a checkout form.

## Features

- Responsive layout for desktop, tablet, and mobile
- Food cards with images, descriptions, categories, ratings, prices, and estimated preparation times
- Category filters and live search
- Food detail modal
- Shopping cart with quantity controls and remove actions
- Automatic subtotal, delivery fee, and total calculation
- Free delivery on orders of Rs. 2,000 or more
- Checkout form with browser validation
- Demo order confirmation
- Mobile navigation and keyboard shortcuts (`Ctrl/⌘ + K` to search, `Esc` to close overlays)

## Run locally

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in your browser, or use the **Live Server** extension for a better development workflow.

No build tools or package installation are required.

## Project structure

```text
food-delivery-ui/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Important limitations

This is a **frontend-only demo**. Checkout does not place a real order, process payments, send emails, or save customer information. The food images and Google Fonts are loaded from external URLs, so those assets require an internet connection.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

## Portfolio note

This project demonstrates frontend layout, responsive styling, DOM manipulation, event handling, filtering, form validation, and cart state management. Update the branding, menu items, and content to make the project your own before publishing.
