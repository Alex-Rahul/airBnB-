const path = require('path');
const express = require('express');

const storeRouter = require("./routers/storeRouter");
const hostRouter = require("./routers/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controller/error");
const { mongoConnect, getDB } = require('./utils/database');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// Routes
app.use("/", storeRouter);
app.use("/host", hostRouter);

// 404 handler
app.use(errorController.error);

const PORT = 3002;

// MongoDB + Server start
mongoConnect(() => {
    const db = getDB();
    console.log("Connected DB name:", db.databaseName);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
});