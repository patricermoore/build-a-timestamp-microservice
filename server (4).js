import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
// Endpoint to handle date requests
app.get("/api{/:date}", (req, res) => {

  const dateParam = req.params.date;
  let date;

  // 1. Handle empty date parameter (returns current time)
  if (!dateParam) {
    date = new Date();
  } else {
    // 2. Check if the parameter is a pure Unix timestamp number (string made only of digits)
    // If it is entirely digits, parse it as a base-10 integer, otherwise use it as a string
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam, 10));
    } else {
      date = new Date(dateParam);
    }
  }

  // 3. Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Return valid JSON payload with mathematical type Number for unix
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
