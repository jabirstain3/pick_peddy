# PickPeddy

PickPeddy is a pet adoption platform that helps users find their perfect pet companion. The platform allows users to browse through various categories of pets, view detailed information about each pet, and adopt them with a simple and interactive process.

**Live link:** https://jabirstain3.github.io/pick_peddy/

## Key Features

 **Dynamic Pet Showcase**  
   - Displays a list of pets dynamically fetched from an API.
   - Allows users to filter pets by category.

 **Adoption Process**  
   - Users can adopt a pet with a countdown animation (3, 2, 1) before the adoption is confirmed.

 **Interactive Modal**  
   - Displays detailed information about a pet in a modal when the "Details" button is clicked.

 **Like Functionality**  
   - Users can "like" pets, and the liked pets are displayed in a separate section.

 **Loading Indicator**  
   - A visually appealing loader is displayed while fetching data from the API.


## ES6 Features Used

- **Arrow Functions**: Used for concise function expressions (e.g., `const hideLoader = () => { ... }`).

- **Template Literals**: Used for dynamically generating HTML content (e.g., `catagorybtn.innerHTML = \`<img src=${catagory.category_icon} ...>\``).

- **Destructuring**: Used to extract data from API responses (e.g., `const { pets } = data`).

- **Spread Operator**: Used for creating a copy of arrays (e.g., `const sortedData = [...currentData].sort(...)`).

- **Async/Await**: Used for handling asynchronous API calls (e.g., `const response = await fetch(...)`).



## How to Run the Project

1. Clone the repository to your local machine.
2. Open the `index.html` file in your browser.
3. Ensure you have an active internet connection to fetch data from the API.

 
**Enjoy exploring and adopting pets with PickPeddy!**