
// Ingredient list from your spreadsheet
const ingredients = [
  "cheddar cheese", "carrot", "egg", "pasta", "chicken breast", "ground beef",
  "broccoli", "bread", "tomato", "rice", "lettuce", "milk", "potato", "tuna"
];

// Recipes from your spreadsheet
const recipes = [
  { name: "Grilled Chicken Breast", ingredients: ["chicken breast"], time: 20 },
  { name: "Chicken Wrap", ingredients: ["chicken breast", "lettuce", "tomato", "cheddar cheese"], time: 31 },
  { name: "Chicken Fried Rice", ingredients: ["chicken breast", "rice", "carrot", "egg"], time: 39 },
  { name: "Beef Tacos", ingredients: ["ground beef", "lettuce", "tomato"], time: 45 },
  { name: "Spaghetti Bolognese", ingredients: ["pasta", "ground beef"], time: 12 },
  { name: "Beef and Broccoli", ingredients: ["ground beef", "broccoli"], time: 17 },
  { name: "Carrot Soup", ingredients: ["carrot", "potato", "milk"], time: 17 },
  { name: "Mashed Potatoes", ingredients: ["potato", "milk"], time: 43 },
  { name: "Scrambled Eggs", ingredients: ["egg", "milk", "cheddar cheese"], time: 13 },
  { name: "Omelette", ingredients: ["egg", "cheddar cheese", "tomato"], time: 28 }
  // Add more if needed...
];

// Populate ingredient checkboxes
const list = document.getElementById("ingredient-list");
ingredients.forEach(ing => {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" value="${ing}"> ${ing}`;
  list.appendChild(label);
});

// Handle recipe filtering
const form = document.getElementById("ingredient-form");
const tbody = document.querySelector("#recipe-results tbody");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const selected = new Set(
    [...document.querySelectorAll("input[type='checkbox']:checked")].map(i => i.value)
  );
  tbody.innerHTML = "";

  const results = recipes.map(recipe => {
    const required = new Set(recipe.ingredients);
    const missing = [...required].filter(i => !selected.has(i));
    const unused = [...selected].filter(i => !required.has(i));
    return {
      name: recipe.name,
      missing_count: missing.length,
      unused_count: unused.length,
      time: recipe.time,
      status: missing.length === 0 ? "✅ Can Make" : `❗ Missing (${missing.join(", ")})`
    };
  }).sort((a, b) => {
    return a.missing_count - b.missing_count ||
           a.unused_count - b.unused_count ||
           a.time - b.time;
  });

  results.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${r.name}</td><td>${r.missing_count}</td><td>${r.unused_count}</td><td>${r.time}</td><td>${r.status}</td>`;
    tbody.appendChild(row);
  });
});
