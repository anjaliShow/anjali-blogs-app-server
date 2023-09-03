# Node.js Blog Application Documentation

## 1. Introduction

### Overview

Welcome to the Blog Application documentation! This comprehensive guide will walk you through the features, functionalities, and usage of our impressive React-based blog application. Our Blog Application is a user-friendly, React-based web application that allows users to read and manage blogs. It provides a seamless and engaging experience for both blog creators and readers.

### Key Features

- View All Blogs, Blog Details, and Comments

- User Registration and Authentication

- Create, Update, and Delete Your Own Blogs

- Add and Delete Comments on Blogs

### Prerequisites

Before getting started with our application, you should have the following prerequisites:

- Node.js and npm installed on your system

- Basic knowledge of React

- An internet connection for API requests

## 2. Getting Started

### Installation

To install the Awesome Blog Application on your local machine, follow these steps:

- Clone the repository

```
git clone https://github.com/anjaliShow/anjali-blogs-app-server.git

```

- Install dependencies

```
npm install

```

### Running the Application

To start the application, use the following command:

```
npm run start:dev
```

### Env Variables

Make Sure to Create a .env file and add appropriate variables in order to use the app.

**Essential Variables**

- PORT =

- DB = mongodb...

- AWS_ACCESS_KEY =

- AWS_SECRET_KEY =

- AWS_REGION =

- AWS_BUCKET_NAME =

- JWT_SECRET =

- JWT_EXPIRE =

- COOKIE_EXPIRES =

## 3. User Authentication

### Registering a New User

To create a new user account, click on the "Register" link and fill out the registration form.

### Logging In

After registering, you can log in using your credentials on the login page.

### User Authentication Flow

Our application provides secure user authentication to protect user data and allow authorized access to blog management features.

## 4. Blog Management

### Viewing All Blogs

On the home page, you can view a list of all blogs available in the application.

### Viewing Blog Details

Click on a blog to view its details, including comments and author information.

### Creating a Blog

Logged-in users can create their own blogs by clicking the "Create Blog" button and filling out the blog creation form.

### Updating Your Blogs

You can edit your own blogs by clicking the "Edit" button on the blog details page.

### Deleting Your Blogs

To delete a blog you've created, go to the blog details page and click the "Delete" button.

## 5. Commenting System

### Adding Comments

Logged-in users can add comments to blogs by entering their comments in the comment section.

### Deleting Comments

You can delete your own comments by clicking the "Delete" button next to your comment.

## 6. API Documentation

For developers interested in interacting with the API directly, here is the API documentation detailing available endpoints and authentication requirements.

### API Endpoints

- /api/v1/post/get: Retrieve all blogs

- /api/v1/post/get/:id: Retrieve a specific blog

- /api/v1/post/get-my-posts: Retrieve authenticated user's all created blogs

- /api/v1/post/create: Create a new blog

- /api/v1/post/update/:id: Update an existing blog

- /api/v1/post/delete/:id: Delete a blog

- /api/v1/post/add-comment/:id: Create a comment

- /api/v1/post/get-comments/:id: get all comments by specific blog posts

- /api/v1/post/delete-comments/:postid/:commentId: Delete a comment

- /api/v1/user/register: Register a new user

- /api/v1/user/login: Log in a user

- /api/v1/user/logout: Logout a user

- /api/v1/user/get-profile: get user profile

### Authentication Tokens

Authentication tokens are required for accessing certain certain API endpoints. Include the token in the request header as Authorization: YOUR_TOKEN.

## 8. Contributing

### Reporting Bugs

If you encounter any bugs or issues, please report them in our issue tracker.

`Build with 💛 by Anjali Show`
