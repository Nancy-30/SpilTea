const Messages = require("../model/message");

const addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Fail to add msg" });
  } catch (err) {
    next(err);
  }
};

const getAllMsgs = async (req, res, next) => {};

module.exports = { addMsg, getAllMsgs };
