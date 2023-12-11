//fetch data
let data = null;

function fetchData() {
  return fetch("../coffee-house/data/products.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}