import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10; // bcrypt salt rounds

export const registerUser = async (req, res) => {
  try {
    const { fullname = "", password = "", email = "" } = req.body;

    if (!fullname || !password || !email) {
      return res.status(400).send({ error: "Incomplete data" });
    }
    const isExist = await User.findOne({ email: email });

    if (isExist?._id) {
      return res.status(400).send({ error: "Email is in use" });
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = new User({ fullname, email, password: hashedPassword });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json({
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "email or password is missing" });
    }
    const isExist = await User.findOne({
      email: email,
    });
    if (!isExist?._id) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, isExist?.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: isExist._id, email: isExist.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ user: isExist, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
