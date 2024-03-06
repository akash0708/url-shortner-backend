const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleURLRedirect,
} = require("../controller/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.get("/:shortId", handleURLRedirect);

module.exports = router;
