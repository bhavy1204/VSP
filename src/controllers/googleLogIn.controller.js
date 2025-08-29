import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogIn = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists or create a new one
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, name, avatar: picture });
    }

    // Create your own JWT for session
    const appToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send token to frontend
    res.json({ success: true, token: appToken, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Google login failed" });
  }
};

export {googleLogIn}
