import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRouter from "../routes/userRoute.js";

const JWT_SECRET = "Your_jwt_secret_here";
const TOKEN_EXPIRES = "24h";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

};
// ===================================================================================
//Register a user
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  console.log("register user", registerUser);
  if (!name || !email || !password) {
    return res.status(400).json({
      successful: false,
      message: "All field are requireds.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(409).json({ success: false, message: "InvaLid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password should be more then 8 character",
    });
  }
  try {
    if (await userModel.findOne({ email })) {
      return res.status(409).json({
        success: false,
        message: "User already present",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashed });
    const token = createToken(user._id); //mongoDB ID
    console.log("token-found", token)
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "server Error",
    });
  }
}

//to login a user
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Both of the field are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = createToken(user._id);
    console.log("LOGIN TOKEN:", token);

    {
      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "server Error",
    });
  }
}

//to get login user details
export async function getCurrentUser(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "server error",
    });
  }
}

//to update a user profile
export async function updateProfile(req, res) {
  const { email, name } = req.body;
  if (!name || !email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "valid email and name are required",
    });
  }

  try {
    const exist = await userModel.findOne({ email, _id: { $ne: req.user.id } });
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "Email already in Use",
      });
    }
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true, select: "name email" },
    );
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "server error",
    });
  }
}

//to change user password
export async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: "false",
      message: "Password invalid or too Short",
    });
  }
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "current Password is incorrect.",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({
      success: true,
      message: "Password Changed",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "server error",
    });
  }
}
