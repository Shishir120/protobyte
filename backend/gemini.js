let weatherData = require("./weather.js");

ApiKey = "AIzaSyDf9zxxAbF2xQTbfvFQ4fpvg17phuMvk5Y";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const aiResponse = async (index) => {
    const genAI = new GoogleGenerativeAI(ApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let response = await weatherData();

    const weatherDataString = `Date: ${response[index].date}, 
    Avg Temp: ${response[index].avgTemperature}°C, 
    Max Temp: ${response[index].maxTemperature}°C, 
    Avg Humidity: ${response[index].avgHumidity}%, 
    Condition: ${response[index].weatherCondition}`;

    // Construct the prompt
    const prompt = `${weatherDataString}. Give suggestions to farmers in 100 words based on the above data and also show the data on top.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = aiResponse;