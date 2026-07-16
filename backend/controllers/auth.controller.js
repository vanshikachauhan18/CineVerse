import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

   const hashedPassword = await bcrypt.hash(password, 10);

   const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
});

    res.status(201).json({
      message: "Signup Successful",
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
  });
}

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login Successful",
      token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
  },
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};