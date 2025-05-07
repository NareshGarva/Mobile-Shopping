// products.js

// Step 1: Declare the products array
export let products = [];

// // Step 2: Create a custom event listener
// document.addEventListener('productsLoaded', () => {
//     console.log("🔥 Products are globally accessible now:", products);
// });

console.log(products);

// Step 3: Fetch products from the server
export async function allProducts() {
    try {
        const res = await fetch('http://localhost:3000/api/product/all');
        if (!res.ok) {
            alert("Product fetch failed");
            return [];
        }
        products = await res.json();
        console.log("Inside try block:", products);

        // Step 4: Dispatch the event when data is fetched
        document.dispatchEvent(new CustomEvent('productsLoaded'));
    } catch (error) {
        console.log(error);
        alert("Error fetching products");
    }
}

// Step 5: Call the function to fetch data when the script loads
allProducts();
