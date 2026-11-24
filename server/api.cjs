const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = "mongodb://127.0.0.1:27017";
const databaseName = "database_mern-apilication";

// 1. GET all users from database_mern-apilication -> users collection
app.get("/users", (req, res) => {
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("users").find({}).toArray()
        .then(documents => {
          res.json(documents);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 2. GET categories from database_mern-apilication -> categories collection
app.get("/categories", (req, res) => {
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("categories").find({}).toArray()
        .then(documents => {
          res.json(documents);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 3. GET admin credentials from database_mern-apilication -> admin collection
app.get("/admin", (req, res) => {
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("admin").find({}).toArray()
        .then(documents => {
          res.json(documents);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 4. GET all videos from database_mern-apilication -> videos collection
app.get("/videos", (req, res) => {
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("videos").find({}).toArray()
        .then(documents => {
          res.json(documents);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 5. GET single video by ID
app.get("/video/:id", (req, res) => {
  const id = parseInt(req.params.id);
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("videos").findOne({ video_id: id })
        .then(document => {
          res.json(document);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 6. POST: Register new user into database_mern-apilication -> users collection
app.post("/add-user", (req, res) => {
  const user = {
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    password: req.body.password,
    email: req.body.email,
  };

  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("users").insertOne(user)
        .then(result => {
          console.log("User registered in MongoDB:", user.user_id);
          res.json({ success: true, message: "User registered successfully", insertedId: result.insertedId });
        })
        .catch(err => res.status(500).json({ success: false, error: err.message }));
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// 7. POST: Verify user login credentials against database_mern-apilication -> users collection
app.post("/login-user", (req, res) => {
  const userId = req.body.user_id;
  const password = req.body.password;

  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("users").findOne({
        $or: [{ user_id: userId }, { email: userId }],
        password: password
      })
      .then(user => {
        if (user) {
          console.log("User login successful:", user.user_id);
          res.json({ success: true, user: user });
        } else {
          res.status(401).json({ success: false, message: "Invalid User ID or Password" });
        }
      })
      .catch(err => res.status(500).json({ success: false, error: err.message }));
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// 8. POST: Add video into database_mern-apilication -> videos collection
app.post("/add-video", (req, res) => {
  const video = {
    video_id: parseInt(req.body.video_id),
    title: req.body.title,
    description: req.body.description,
    likes: parseInt(req.body.likes || 0),
    views: parseInt(req.body.views || 0),
    comments: req.body.comments || '',
    url: req.body.url,
    category_id: parseInt(req.body.category_id || 0),
  };

  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("videos").insertOne(video)
        .then(() => {
          console.log("Video added to MongoDB:", video.title);
          res.json({ success: true, message: "Video added successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 9. PUT: Edit video in database_mern-apilication -> videos collection
app.put("/edit-video/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const video = {
    video_id: parseInt(req.body.video_id),
    title: req.body.title,
    description: req.body.description,
    likes: parseInt(req.body.likes || 0),
    views: parseInt(req.body.views || 0),
    comments: req.body.comments || '',
    url: req.body.url,
    category_id: parseInt(req.body.category_id || 0),
  };

  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("videos").updateOne({ video_id: id }, { $set: video })
        .then(() => {
          console.log("Video edited in MongoDB:", id);
          res.json({ success: true, message: "Video updated successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// 10. DELETE: Delete video from database_mern-apilication -> videos collection
app.delete("/delete-video/:id", (req, res) => {
  const id = parseInt(req.params.id);
  mongoClient.connect(connectionString)
    .then(clientObject => {
      const database = clientObject.db(databaseName);
      database.collection("videos").deleteOne({ video_id: id })
        .then(() => {
          console.log("Video deleted from MongoDB:", id);
          res.json({ success: true, message: "Video deleted successfully" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = 6060;
app.listen(PORT, () => {
  console.log(`API started on http://127.0.0.1:${PORT}`);
  console.log(`Connected to MongoDB: ${connectionString}, Database: ${databaseName}`);
});
