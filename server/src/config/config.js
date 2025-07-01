require('dotenv').config()

const PORT = process.env.PORT || 5050
const DATABASE = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tinix.mongodb.net/EventManagement?retryWrites=true&w=majority&appName=Cluster0`;
const JWT_KEY = process.env.JWT_ACCESS_TOKEN;
const JWT_EXPIRE_TIME = 30 * 24 * 60 * 60;

const WEB_CACHE = false;
const MAX_JSON_SIZE = "50MB";
const URL_ENCODE = true;

const REQUEST_TIME = 15 * 60 * 1000;
const REQUEST_NUMBER = 3000;

module.exports = {
    PORT,
    DATABASE,
    JWT_KEY,
    JWT_EXPIRE_TIME,
    WEB_CACHE, 
    MAX_JSON_SIZE, 
    URL_ENCODE, 
    REQUEST_TIME, 
    REQUEST_NUMBER
};