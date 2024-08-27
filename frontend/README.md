## Project Overview

This project is a Next.js 14 application. The application features a product listing page with filter options for categories and price range, as well as a search functionality. The user can view the products, add products to the cart, create an account, log in, and can purchase the selected items.

## How It Was to Solve the Challenge

The development process was quite engaging, as I had to make several important decisions, such as choosing to store authentication data in local storage to simulate a login system.

During development, one of the main challenges I faced was implementing a filter and search system for products.

What I enjoyed most was developing the cart functions.

## Decisions Taken

1. **Login system**: I chose to implement a login system that stores authentication data in the browser's local storage. This approach was chosen to simulate an authentication process without having to set up a backend.

2. **State management with hooks**: Instead of using a global state management library, I chose to manage the state locally using React hooks (`useState` and `useEffect`) to simplify and keep the application lightweight.

3. **Custom hook for product logic**: A custom hook (`useProducts`) was created to encapsulate the logic for fetching products, filtering them based on selected criteria, and managing loading and error states. This makes the code more modular and easier to maintain.

4. **Server mocking with JSON Server**: I decided to use JSON Server to mock an API and fetch product data.

## Code Organization

The code is organized into several folders to keep components, hooks, and utilities separate and maintainable:

- **public/**: Contains images and other static assets.
- **src/**: Main source code folder.
  - **app/**: Contains all the routes and pages using the Next.js 14 App Router structure.
  - **components/**: Reusable UI components (e.g., `ProductItem`, `Container`, `SearchInput`).
  - **contexts/**: Contains global context providers (e.g., `AuthContext`).
  - **hooks/**: Custom hooks for handling logic and data fetching (`useProducts`).
  - **utils/**: Utility functions for common tasks (e.g., `numberUtils` for formatting).

### Instructions to Run the Project

1. **Clone the Repository**:

   `git clone https://github.com/your-username/your-repository.git`

2. **Install Dependencies**:

   `cd your-repository`
   
   `npm install`

3. **Set Up JSON Server**:

   Create a `products.json` file at the project root with the desired data structure. Example:

   ```
   {
     "products": [
       {
         "id": "1",
         "category": "Chinelos",
         "description": "Chinelo Havaianas - Branco",
         "originalPrice": "R$ 1500.00",
         "discountedPrice": "R$ 1200.00",
         "discountPercentage": "20%",
         "imageSrc": "/images/product1.jpg"
       }
       // more products
     ]
   }
   ```

4. **Start JSON Server**:

   `npx json-server --watch products.json --port 8000`

5. **Run the Application**:

   `npm run dev`

   The application will be available at `http://localhost:3000`.

