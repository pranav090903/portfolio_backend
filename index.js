
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sendEmail = require("./sendEmail"); // Import the email function

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://portfolio-edpu.vercel.app",
  methods: ["POST"],
  credentials: true
}));
app.use(express.json());

// Contact form route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Please fill all required fields." 
    });
  }

  try {
    // Call the imported email function
    await sendEmail(name, email, message);

    res.json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send email. Check your App Password and try again." 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});