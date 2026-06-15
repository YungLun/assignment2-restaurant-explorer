# Restaurant Explorer - Assignment 2

## Student Information

* Name: Yung-Lun Lee
* Student ID: N01721599
* Course: ITE5315 Web Programming and Framework 1
* Assignment: Assignment 2

---

## Project Description

Restaurant Explorer is an Express.js web application that allows users to browse, search, filter, and view restaurant information from a local JSON dataset. The application demonstrates middleware, form processing, validation, EJS template rendering, and API testing using Postman.

---

## Dataset Information

The dataset contains 30 restaurant records.

Fields include:

* id
* name
* cuisine
* city
* rating
* priceRange
* imageUrl
* imageAlt
* imageCredit
* imageCreditUrl

---

## Available Routes

| Method | Route                  | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | /                      | Home page                          |
| GET    | /about                 | About page                         |
| GET    | /data                  | Display all restaurant records     |
| GET    | /data/:id              | Display one restaurant by ID       |
| GET    | /search?keyword=value  | Search restaurants by name         |
| GET    | /filter?category=value | Filter restaurants by cuisine      |
| GET    | /categories            | Count restaurants by cuisine       |
| GET    | /add                   | Display add restaurant form        |
| POST   | /add                   | Submit restaurant form             |
| GET    | /table-js              | HTML table generated in JavaScript |
| GET    | /table                 | EJS rendered table                 |

---

## Middleware Used

### express.static()

Used to serve static files from the public folder.

### express.urlencoded()

Used to process submitted form data.

### express.json()

Used to process JSON request bodies.

### requestLogger

Logs the request method and URL in the terminal for debugging purposes.

---

## add-images.js Explanation

Command used:

node tools/add-images.js data/dataset.json data/dataset-with-images.json cuisine name

* Input file: data/dataset.json
* Output file: data/dataset-with-images.json
* Category field: cuisine
* Title field: name

If the specified category field does not exist, the script uses "general" as a fallback category.

---

## Validation Testing

### Valid Submission

The application accepts restaurant records when all required fields are provided.

### Invalid Submission

The application returns a validation error when required fields are missing or rating values are invalid.

Example error:

Validation failed

Restaurant name is required.

---

## EJS Reflection Questions

### What is the difference between /table-js and /table?

/table-js manually builds HTML inside server.js using string concatenation.

/table uses EJS templates and res.render() to separate application logic from HTML presentation.

### What does app.set("view engine", "ejs") do?

It tells Express to use EJS as the template engine.

### What does res.render("table", { restaurants }) do?

It renders the table.ejs file and passes restaurant data to the template.

### What did you change in table.ejs?

* Added restaurant-specific columns.
* Added image display.
* Added a View JSON link for each restaurant.
* Customized the page title to Restaurant Explorer.

### Why is the EJS version easier to maintain?

The HTML is separated from the application logic, making the code cleaner and easier to update.

---

## Postman Reflection Questions

### What is the purpose of a Postman Collection?

A Postman Collection organizes API requests and provides documentation and testing examples.

### Which route uses req.params?

GET /data/:id

### Which route uses req.query?

GET /search

GET /filter

### Which route receives POST form data?

POST /add

### What valid POST data did you test?

A restaurant with valid name, cuisine, city, rating, and priceRange values.

### What invalid POST data did you test?

A restaurant submission with an empty name field.

### What validation error was returned?

Restaurant name is required.

### How does this collection help other developers?

It provides examples of how each API endpoint should be called and what responses are expected.

---

## Deployment

The application was successfully deployed on Vercel.

Vercel Link:
https://assignment2-restaurant-explorer.vercel.app

GitHub Link:
https://github.com/YungLun/assignment2-restaurant-explorer