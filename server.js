const fs = require("fs");   // File system module
const express = require("express");
const app = express();
app.use(express.json());    // To allow for JSON payload parsing

const filePath = "./example.json";

function readJSONFile() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } else {
        return { posts: [], nextId: 1 };
    }
}

function writeJSONFile(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
}



app.post("/posts", (req, res) => {
    const currTime = new Date().toISOString();
    try {
        const data = readJSONFile();

        const newPost = {
            "id": data.nextId,
            "title": req.body.title,
            "content": req.body.content,
            "category": req.body.category,
            "tags": req.body.tags,
            "createdAt": currTime,
            "updatedAt": currTime
        }

        data.posts.push(newPost);
        data.nextId += 1;
        writeJSONFile(data);

        res.status(200).send("Post added successfully...\n");

    } catch (error) {
        console.log(`Error adding post...\n`, error);
        res.status(400).send("Error adding post...\n");
    }
})

app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, category, tags } = req.body;
    const currTime = new Date().toISOString();

    try {
        const data = readJSONFile();
        const postIndex = data.posts.findIndex(post => post.id == postId);

        if (postIndex == -1) {
            res.status(404).send(`Post with ID ${postId} not found.\n`);
            return;
        }

        data.posts[postIndex] = {
            ...data.posts[postIndex],   // id only in this case
            title: title || data.posts[postIndex].title,
            content: content || data.posts[postIndex].content,
            category: category || data.posts[postIndex].category,
            tags: tags || data.posts[postIndex].tags,
            updatedAt: currTime
        };

        writeJSONFile(data);

        res.status(200).send(`Post updated successfully...\n`);

    } catch (error) {
        console.error("Error updating post...\n", error);
        res.status(500).send("Error updating post...\n");
    }
})

app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        const data = readJSONFile();

        const postIndex = data.posts.findIndex(post => post.id == postId);

        if (postIndex == -1) {
            res.status(404).send(`Post with ID ${postId} not found.\n`);
            return;
        }

        data.posts = data.posts.filter(post => post.id !== postId);

        writeJSONFile(data);

        res.status(200).send(`Post with ID ${postId} deleted...\n`);

    } catch (error) {
        console.error("Error deleting post...\n", error);
        res.status(500).send("Error deleting post...\n");
    }
})

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        const data = readJSONFile();
        const post = data.posts.find(post => post.id == postId);

        if (!post) {
            res.status(404).send(`Post with ID ${postId} not found.\n`);
            return;
        }

        res.status(200).json(post);

    } catch (error) {
        console.error("Error retrieving post...\n", error);
        res.status(500).send("Error retrieving post...\n");
    }
})

// Allows search querries in the request as well
app.get("/posts", (req, res) => {
    const searchTerm = req.query.term ? req.query.term.toLowerCase() : null;
    try {
        const data = readJSONFile();
        if (searchTerm) {
            data.posts = data.posts.filter(post =>
                (post.title && post.title.toLowerCase().includes(searchTerm)) ||
                (post.content && post.content.toLowerCase().includes(searchTerm)) ||
                (post.category && post.category.toLowerCase().includes(searchTerm)) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        }
        res.status(200).json(data.posts);

    } catch (error) {
        console.error("Error retrieving all posts...\n", error);
        res.status(500).send("Error retrieving all posts...\n");
    }
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})