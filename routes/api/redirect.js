const express = require("express");
const router = express.Router();

//GET Request --> api/redirect
router.get("/", async (req, res) => {
  const hash = req.headers.hash;
  try {
    const data = await URL.findOne({ id: hash });
    const json = await res.json({ url: data.url });
    return json;
  } catch (error) {
    return res.status(400).json({ error: "Error occurred" });
  }
});

module.exports = router;
