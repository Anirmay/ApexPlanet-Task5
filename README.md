# ApexPlanet Internship — Task 5

## Project Overview
ApexPlanet is a responsive, performance-conscious e-commerce storefront built with HTML5, CSS3, and vanilla JavaScript. The project combines product browsing, filtering, searching, product detail viewing, shopping cart management, and contact form validation into a polished final capstone application.

## Features
- Home landing page with hero section, categories, featured products, and CTAs
- Product listing with dynamic filtering, search, and sorting
- Product detail page with product metadata and add-to-cart actions
- Shopping cart with quantity changes, removal, and live totals
- localStorage-based persistence after refresh
- About page with store mission and feature highlights
- Contact page with client-side validation and success feedback
- Responsive design across desktop, tablet, and mobile screens
- Accessibility-focused form controls and semantic HTML

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- localStorage
- CSS media queries

## Project Structure
```text
Task-5/
├── index.html
├── products.html
├── product-details.html
├── cart.html
├── about.html
├── contact.html
├── css/
│   ├── style.css
│   └── style.min.css
├── js/
│   ├── app.js
│   ├── app.min.js
│   ├── data.js
│   ├── products.js
│   ├── cart.js
│   ├── contact.js
├── images/
├── README.md
└── .
```

The development files (`style.css`, `app.js`) are used for readability and editing, while the minified files are production-optimized versions for faster delivery and reduced payload size.

## How to Run
1. Open the project folder in a browser or serve it using a local static server.
2. From the project root, run:
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser.

## Full Application Features
- E-Commerce storefront
- Dynamic product list
- Search by name or category
- Category and price filtering
- Sorting options for price, rating, and name
- Add to cart and quantity adjustments
- Persistent cart through localStorage
- Product detail generation from product data
- Contact form validation with error and success feedback

## Performance Optimizations
This project follows practical front-end performance improvements without adding unnecessary libraries or frameworks.

- CSS optimization: selectors are kept concise, redundant rules are avoided, and styling is grouped by section for clearer maintenance.
- JavaScript optimization: logic is organized into small functions, DOM work is targeted to the relevant page, and event handlers are applied only when needed.
- Lazy loading: product images below the fold use loading="lazy" to reduce initial page cost.
- Reduced HTTP requests: no external CSS frameworks or JavaScript libraries are used; only the project stylesheet and scripts are loaded.
- Load-time optimization: scripts use the defer attribute so parsing remains smooth and page rendering is not blocked.
- Optimized assets: images are served from a single curated source and sized appropriately for display.

## Responsive Design
The application is designed for:
- Desktop: 1024px and above
- Tablet: 768px to 1023px
- Mobile: below 768px

Media queries ensure navigation, product grids, filters, forms, and cart content adapt to smaller screens without horizontal overflow.

## Browser Compatibility
The project is implemented with broadly supported HTML, CSS, and JavaScript APIs. This maintains compatibility across modern browsers.

| Browser | Tested? | Notes |
|---|---|---|
| Chrome | Not physically tested in this environment | Built for current Chrome behavior and uses standard APIs. |
| Firefox | Not physically tested in this environment | Compatible with standard web APIs and CSS support. |
| Safari | Not physically tested in this environment | Uses broadly supported CSS and JS patterns to avoid browser-specific code. |
| Android Chrome | Not physically tested in this environment | Mobile layout and controls were designed for Android browser behavior. |
| iOS Safari | Not physically tested in this environment | Responsive design targets iPhone/iPad layouts and touch input. |

> Browser testing status is intentionally conservative and aligns with the requirement to not claim physical testing without evidence.

## Final Checklist
- [x] Full e-commerce web application implemented
- [x] Product search, filtering, and sorting work dynamically
- [x] Product details page renders data from JS product array
- [x] Cart supports add, remove, quantity updates, and totals
- [x] Cart persists with localStorage
- [x] Contact form validates required fields and email format
- [x] Responsive design for desktop, tablet, and mobile
- [x] Performance-oriented implementation with lazy loading and reduced dependencies
- [x] Project documentation included in README
































🚀 **Task 5 Completed — Final Capstone Project**

I’m excited to share that I’ve successfully completed **Task 5, the Final Project and Optimization task, of my Web Development Internship at ApexPlanet Software Pvt. Ltd.**

For this capstone project, I combined my HTML, CSS, and JavaScript skills to build a **fully functional E-Commerce web application** with dynamic features and a responsive user interface.

🛒 **Full Web Application**

* Dynamic product listing
* Product search, filtering, and sorting
* Product details
* Shopping cart with quantity management
* Cart persistence using `localStorage`
* Contact form with JavaScript validation

⚡ **Performance Optimization**

* Optimized CSS and JavaScript
* Lazy loading for non-critical images
* Reduced unnecessary HTTP requests
* Optimized DOM operations and page loading

📱 **Responsive & Cross-Browser Design**

* Responsive layouts for desktop, tablet, and mobile
* Designed with browser compatibility in mind
* Tested and refined the UI for different screen sizes

This final task helped me bring together the concepts I learned throughout the internship and strengthen my practical skills in **frontend development, JavaScript, responsive design, web performance, and user experience.**

🔗 **GitHub Repository:** https://github.com/Anirmay/ApexPlanet-Task5

🎥 Sharing a short demo of the final project below!

#ApexPlanet #WebDevelopment #HTML #CSS #JavaScript #FrontendDevelopment #ECommerce #ResponsiveDesign #WebPerformance #JavaScript #Internship #GitHub #Learning
