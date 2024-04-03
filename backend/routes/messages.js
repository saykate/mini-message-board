const express = require("express");
const router = express.Router();
const messages = require("../controllers/messageController");

//GET messages page
//Exposing data via Api
router.get("/", messages.list);

router.post("/", messages.newPost);

router.get("/:id", messages.getMessage);

router.put("/:id", messages.updateMessage);

router.delete("/:id", messages.deleteMessage);

module.exports = router;
