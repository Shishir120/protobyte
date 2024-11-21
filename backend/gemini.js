let weatherData = require("./weather.js");

ApiKey = "AIzaSyDf9zxxAbF2xQTbfvFQ4fpvg17phuMvk5Y";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const aiResponse = async () => {
    const genAI = new GoogleGenerativeAI(ApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let response = await weatherData();

    const weatherDataString = `Date: ${response[1].date}, 
    Avg Temp: ${response[1].avgTemperature}°C, 
    Max Temp: ${response[1].maxTemperature}°C, 
    Avg Humidity: ${response[1].avgHumidity}%, 
    Condition: ${response[1].weatherCondition}`;

    // Construct the prompt
    const prompt = `${weatherDataString}. Give suggestions to farmers in 100 words based on the above data and also show the data on top.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = aiResponse;