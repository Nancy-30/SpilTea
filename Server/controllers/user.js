const User = require("../model/user");
const brcypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isUsernameExist = await User.findOne({ username });

    // valid username
    if (isUsernameExist) {
      return res.json({ msg: "Username not available", status: false });
    }

    // valid email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.json({
        msg: "This email id is already registered",
        status: false,
      });
    }

    // password hashing
    const hashPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const tempUser = await User.findOne({ username });

    // valid username
    if (!tempUser) {
      return res.json({ msg: "User doesn't exist", status: false });
    }

    const isPasswordValid = await brcypt.compare(password, tempUser.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete tempUser.password;
    return res.json({ status: true, tempUser });
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.param.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarSet: true,
      avatarImage,
    });
    return res.json({ isSet: userData, isAvatarSet, image: userData.image });
  } catch (ex) {
    next(ex);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports = { register, login, setAvatar, getAllUsers };
