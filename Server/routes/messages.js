const express = require("express");
const { getAllMsgs, addMsg } = require("../controllers/message");

const router = express.Router();

router.post("/addmsg", addMsg);
router.get("/getmsg", getAllMsgs);

module.exports = router;
