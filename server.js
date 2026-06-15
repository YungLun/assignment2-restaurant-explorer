/******************************************************************************
* ITE5315 - Assignment 2
* I declare that this assignment is my own work in accordance with Humber
* Academic Policy. No part of this assignment has been copied manually or
* electronically from any other source, including websites, or distributed
* to other students.
*
* I understand that I may use Generative AI for learning, debugging, and
* brainstorming, but the submitted work must be customized to my selected
* dataset and I must be able to explain the code and design decisions.
*
* Name: Yung-Lun Lee Student ID: N01721599 Date: June 15, 2026
******************************************************************************/

const express = require("express");
const path = require("path");

const app = express();
const port = 5500;
const restaurants= require ("./data/dataset.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function requestLogger(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
}

app.use(requestLogger);

//home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

//all data
app.get( "/data", (req,res) => {
    res.json(restaurants);
});

//record
app.get("/data/:id", (req, res) => {

  const restaurant = restaurants.find(
    r => r.id === parseInt(req.params.id)
  );

  if (!restaurant) {
    return res.status(404).json({
      message: "Restaurant not found"
    });
  }

  res.json(restaurant);

});

// search by restaurant name
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({
      message: "Please provide a search keyword"
    });
  }

  const results = restaurants.filter(r =>
    r.name.toLowerCase().includes(keyword.toLowerCase())
  );

  res.json(results);
});

// filter by cuisine
app.get("/filter", (req, res) => {

  const category = req.query.category;

  if (!category) {
    return res.status(400).json({
      message: "Please provide a category"
    });
  }

  const results = restaurants.filter(
    r => r.cuisine.toLowerCase() === category.toLowerCase()
  );

  res.json(results);

});

// display add restaurant form
app.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "add.html"));
});

//Validation Middleware
function validateAddForm(req, res, next) {

  const errors = [];

  if (!req.body.name) {
    errors.push("Restaurant name is required.");
  }

  if (!req.body.cuisine) {
    errors.push("Cuisine is required.");
  }

  if (!req.body.city) {
    errors.push("City is required.");
  }

  if (
    req.body.rating &&
    (
      isNaN(Number(req.body.rating))
      ||
      Number(req.body.rating) < 0
      ||
      Number(req.body.rating) > 5
    )
  ) {
    errors.push("Rating must be between 0 and 5.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors
    });
  }

  next();
}

//POST /add
app.post("/add", validateAddForm, (req, res) => {

  const newRestaurant = {

    id: restaurants.length + 1,

    ...req.body,

    imageUrl: "https://picsum.photos/seed/newrestaurant/600/400",
    imageAlt: `${req.body.name} image`,
    imageCredit: "Lorem Picsum",
    imageCreditUrl: "https://picsum.photos/"
  };

  restaurants.push(newRestaurant);

  res.status(201).json({
    message: "Restaurant added successfully.",
    record: newRestaurant
  });

});

// display table by manually building HTML in JavaScript
app.get("/table-js", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Restaurant Table - JavaScript Version</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <h1>Restaurant Table - JavaScript Version</h1>

    <table border="1">
      <tr>
        <th>ID</th>
        <th>Restaurant Name</th>
        <th>Cuisine</th>
        <th>City</th>
        <th>Rating</th>
        <th>Price Range</th>
        <th>Image</th>
      </tr>
  `;

  restaurants.forEach((restaurant) => {
    html += `
      <tr>
        <td>${restaurant.id}</td>
        <td>${restaurant.name}</td>
        <td>${restaurant.cuisine}</td>
        <td>${restaurant.city}</td>
        <td>${restaurant.rating}</td>
        <td>${restaurant.priceRange}</td>
        <td>
          <img src="${restaurant.imageUrl}" alt="${restaurant.imageAlt}" width="80">
        </td>
      </tr>
    `;
  });

  html += `
    </table>
  </body>
  </html>
  `;

  res.send(html);
});

// display table using EJS
app.get("/table", (req, res) => {
  res.render("table", {
    pageTitle: "Restaurant Explorer - EJS Table",
    restaurants: restaurants
  });
});

// custom feature: count restaurants by cuisine
app.get("/categories", (req, res) => {
  const categoryCounts = {};

  restaurants.forEach(r => {
    if (categoryCounts[r.cuisine]) {
      categoryCounts[r.cuisine]++;
    } else {
      categoryCounts[r.cuisine] = 1;
    }
  });

  res.json(categoryCounts);
});

// 404 handler for wrong routes
app.use((req, res) => {
  res.status(404).json({
    message: "Sorry, this route does not exist"
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});