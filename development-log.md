# Development Log - Assignment 2

## June 15, 2026

### Project Setup

* Created Assignment 2 project by copying Assignment 1.
* Created tools, views, and screenshots folders.

### Dataset Enhancement

* Added image information to the dataset using add-images.js.
* Generated dataset-with-images.json.
* Updated dataset.json with image fields.

### Middleware Implementation

* Added express.static().
* Added express.urlencoded().
* Added express.json().
* Implemented requestLogger middleware.

### Form Processing

* Created add.html form.
* Added GET /add route.
* Added POST /add route.

### Validation

* Created validateAddForm middleware.
* Added validation for restaurant name, cuisine, city, and rating.

### Table Views

* Implemented /table-js route using manually generated HTML.
* Installed EJS.
* Implemented /table route using EJS templates.
* Created views/table.ejs.

### Styling

* Added CSS styling for forms and tables.

### Testing

* Tested all routes in browser.
* Tested valid and invalid form submissions.
* Created Postman Collection and tested all required requests.

### Challenges

* After deleting node_modules, Express could not be found.
* Resolved the issue by running npm install.
