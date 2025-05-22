import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const APIkey = process.env.API_KEY

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index.ejs", {weather: null, error: null});
});

app.post("/WeatherResult", async (req, res) => {

    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
    console.log("City received:", city);
console.log("API Key used:", APIkey);
console.log("Request URL:", url);

    try{
        const response = await axios.get(url);
        const weather = response.data;

        if(weather) {
            const WeatherResult = `Its ${weather.main.temp} degree in ${weather.name}`;
            res.render("index.ejs", {weather: WeatherResult, error: null});
        } else {
            res.render("index.ejs", {weather: null, error: "City not found, Please try again!"});
        }
    } catch(error) {
        res.render("index.ejs", {weather: null, error: "Error fetching weather data"});
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});