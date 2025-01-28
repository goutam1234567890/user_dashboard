# User Management Dashboard

## IMPORTANT NOTE
I have used mockapi.io because the jsonplaceholder was not able to get edit has we are unable to change the data of backend.

## Overview
The **User Management Dashboard** is a React-based application for managing user data. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of users. It supports pagination for easy navigation through data and includes a user-friendly interface for adding or editing user details.

## Features
- **View Users**: Displays a paginated list of users in a table format.
- **Add New User**: Provides a form to add a new user to the database.
- **Edit User**: Allows editing existing user details.
- **Delete User**: Deletes a user and removes them from the database.
- **Pagination**: Navigate between pages to view more users.
- **Error Handling**: Displays error messages for network or API failures.

## Technologies Used
- **React**: For building the user interface.
- **CSS**: For styling the components.
- **MockAPI**: For simulating backend API operations.

## Folder Structure
src/
├── components/             # Reusable UI components
│   ├── Header/
│   │   ├── index.js       # Header component
│   │   ├── index.css # Scoped styles for Header 
│   │          
│   ├── Dashboard/
│   │   ├── index.js    # Main Dashboard component
│   │   ├── index.css
│   │
│   ├── UserForm/
│   │   ├── index.js     # User Form component
│   │   ├── index.css
│
├── Services/               # API service files
│   ├── UserService.js      # CRUD operations for User
│
├── App.js                  # Main application component
├── index.js                # Entry point to render the application
└── package.json            # Project metadata and dependencies



## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/goutam1234567890/user_dashboard
   cd user-management-dashboard
   npm install
   npm start
Open the application in your browser at http://localhost:3000.

## API Endpoints
This project uses the MockAPI for user management operations. Replace <base_url> with the MockAPI base URL:
1. Fetch Users: GET <base_url>/users?page=<pageNumber>&limit=<pageSize>
2. Add User: POST <base_url>/users
3. Update User: PUT <base_url>/users/:id
4. Delete User: DELETE <base_url>/users/:id


## Components Description
## Dashboard
    Fetches and displays the list of users in a paginated table.
    Contains "Add User" and navigation buttons for pagination.
    Handles error states and loading indicators.

## Header
    Displays the application's title: "User Management Dashboard.

## UserForm
    Renders a form for adding or editing user details.
    Handles input validation and API calls for saving or updating user data.

## Future Improvements
1. Add search functionality to filter users.
2. Implement server-side pagination for better performance.
3. Enhance error messages with more details.
4. Add unit tests for components and API calls.
