# Blogging-Platform-API-Demo

The purpose of this project is to show a simple API and simple/frequently used queries and interactions with JSON objects.

A simple RESTful API for managing blog posts. The API allows users to create, update, delete, and retrieve blog posts, and also provides functionality to filter posts using search terms. This project uses Node.js and Express, with data stored in a JSON file.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) VSCode extension (or Postman if preferred)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ernesto-B/Blogging-Platform-API-Demo.git
    ```
2. Navigate to the project directory:
   ```bash
   cd blog-post-api
   ```
3. Install dependencies:
   ```bash
    npm install
    ```

## Usage
1. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

## API Endpoints
### 1. Create a new post
- POST /posts
- Request body:
    ```json
    {
    "title": "Your Blog Post Title",
    "content": "Content of the blog post.",
    "category": "Category Name",
    "tags": ["Tag1", "Tag2"]
    }
    ``` 
- Response: `Post added successfully...`

### 2. Updating an Existing Post
- PUT /posts/:id
- Request body:
    ```json
    {
    "title": "Updated Blog Post Title",
    "content": "Updated content of the blog post.",
    "category": "Updated Category Name",
    "tags": ["Updated Tag1", "Updated Tag2"]
    }
    ```
- Response: `Post updated successfully...`

### 3. Deleting a Post
- DELETE /posts/:id
- Response: `Post deleted successfully...`

### 4. Retrieve a Post by ID
- GET /posts/:id
- Response: Post with the specified ID.

### 5. Retrieve all Posts
- GET /posts
- Response: Array of all posts.
- Optional query parameters:
    - `term`: Search for posts containing the specified term in their title, content, category, or tags. Example: `/posts?term=tech`

## Using Thunder Client
- Simply open `requests.REST` file and click on `Send Request` to test the API endpoints.
- Alternatively, you can use Postman or any other API testing tool of your choice.

## Notes
- IDs are incremented automatically for each post.
- If a post is deleted, the ID is not reused.
