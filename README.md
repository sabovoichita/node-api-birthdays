node-api
Node JS CRUD API Example

store info in JSON file
store info in DB MySQL
store info in file similar to mongo format (check https://github.com/sergeyksv/tingodb)
UI Example for this app can be found in sabovoichita/recipes-calendar
Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update --> <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

Install
Usage
JSON file as storage
DB (MySQL) as storage

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

⚙ Install
sh
Copy code
git clone https://github.com/nmatei/node-api.git
cd node-api
npm install
Usage
sh
Copy code
npm start

# or (when you work inside code and want auto restart)

npm run devstart
Open http://localhost:3000 to see if it works

JSON file as storage
Recipes are stored inside data/recipes.json

js
Copy code
// GET recipes-json
fetch("http://localhost:3000/recipes-json", {
method: "GET",
headers: {
"Content-Type": "application/json"
}
});

// POST recipes-json/create
fetch("http://localhost:3000/recipes-json/create", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
title: "Carrot Cake",
image: "images/3.jpg",
ingredients: "155ml sunflower oil, 230g flour, 100g pecans...",
link: "https://www.deliciousmagazine.co.uk/recipes/paul-hollywoods-ultimate-carrot-cake/"
})
});

// DELETE recipes-json/delete
fetch("http://localhost:3000/recipes-json/delete", {
method: "DELETE",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT recipes-json/update
fetch("http://localhost:3000/recipes-json/update", {
method: "PUT",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
id: "fedcba1610310163146",
title: "Updated Carrot Cake",
image: "images/3.jpg",
ingredients: "Updated list of ingredients...",
link: "https://www.deliciousmagazine.co.uk/recipes/updated-carrot-cake/"
})
});
DB (MySQL) as storage
Recipes are stored in MySQL

configure user & pass for MySQL connection routes/recipes-db.js
create a database named recipes
run http://localhost:3000/recipes/install
now you can run all CRUD operations
the same as for JSON but change the URL from "recipes-json" -> "recipes"
TODOs
in case port is used...

give hints...
and change the port if not possible.
Add port config.
