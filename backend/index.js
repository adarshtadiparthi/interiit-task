const express = require('express');
const mongoose = require('mongoose');
const {importData,importItemsData,importGodowns}= require('./database');
const app = express();

//mongodb connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adarshtadiparthi123:sPnLM7zyIdcZIwQq@godowns.w1dvt.mongodb.net/');
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

const PORT = 5000;
app.listen(PORT , async() => {
    console.log(`Server is running on ${PORT}`);
    await connectDB();
    // await importData();
    // await importItemsData();
    // await importGodowns();
});


