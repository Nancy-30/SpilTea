const Messages = require("../model/message");

const addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      user: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Fail to add msg" });
  } catch (err) {
    next(err);
  }
};

const getAllMsgs = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMsgs = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(projectedMsgs);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addMsg, getAllMsgs };
