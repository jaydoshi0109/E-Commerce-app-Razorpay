import { Request, Response } from "express";
import { User } from "../models/User.model";
import { generateToken } from "../utils/generateToken";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Please provide all fields" });
      return
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return 
    }

    // Check password (no bcrypt for now)
    if (user.password !== password) {
       res.status(401).json({ message: "Invalid email or password" });
       return
    }

    // Generate JWT
    const token = generateToken(user._id.toString(), user.isAdmin);

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
    return;
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
    return;
  }
};


export const signupUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            res.status(400).json({message: "Please provide all fields"})
            return;
        }
        const alreadyPresent = await User.findOne({email});
        if(alreadyPresent){
            res.status(400).json({message: "User already exists"});
            return;
        }
        const user = await User.create({
            username,
            email,
            password
        });
        const token = generateToken(user._id.toString(), user.isAdmin);
        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
        return;
    } catch (error) {
        console.error("signup error:", error);
        res.sendStatus(500).json({message: "Server error during signup"});
    }
}