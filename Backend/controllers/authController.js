const User = require('../models/user'); // Sequelize model
const Admin = require('../models/admin'); // Sequelize model
const PasswordReset = require('../models/passwordReset'); // Sequelize model
const jwt = require('jsonwebtoken'); // jsonwebtoken for token generation
const bcrypt = require('bcryptjs'); // bcryptjs for password hashing
const sendMail = require('../utils/mailer'); // nodemailer for sending emails

// Replace this with your frontend deployed URL
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || 'http://your-frontend-url.com';

// ---------------- REGISTER USER ----------------
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const mailResult = await sendMail(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Welcome to Mobile Shopping</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px; }
    .email-container { background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: auto; }
    h2 { color: #001F55; }
    p { font-size: 16px; }
    .btn { display: inline-block; padding: 10px 20px; background-color: rgb(20,20,20); color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Welcome to Mobile Shopping!</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering with us. We're excited to have you onboard.</p>
    <p>Start exploring our services by visiting your dashboard.</p>
    <a href="${FRONTEND_BASE_URL}/User/dashboard" class="btn">Go to Dashboard</a>
    <p>If you have any questions, feel free to contact our support team.</p>
    <p>Best regards,<br>Team Mobile Shopping</p>
  </div>
</body>
</html>
`,
      "Welcome to Mobile Shopping",
      email
    );

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Can't register user" });
  }
};

// ---------------- GET USER BY ID ----------------
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User ID not found" });

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User found",
      user: {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error("Error while fetching user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- UPDATE USER BY ID ----------------
exports.updateUserById = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "Body not provided" });

  const { userId, name, email, mobile } = req.body;

  try {
    const existingUser = await User.findOne({ where: { id: userId } });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    await User.update({ name, email, mobile }, { where: { id: userId } });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error while updating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- GET PROFILE ----------------
exports.getProfile = async (req, res) => {
  res.json({ message: "User profile accessed", user: req.user });
};

// ---------------- USER LOGIN ----------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const expireTime = Date.now() + 60 * 60 * 1000; // 1 hour

    res.json({ message: "User logged in successfully", token, id: user.id, expireTime });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- ADMIN LOGIN ----------------
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const expireTime = Date.now() + 60 * 60 * 1000;

    res.json({ message: "Admin logged in successfully", token, id: admin.id, expireTime });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- ADMIN PROFILE ----------------
exports.getAdminProfile = async (req, res) => {
  res.json({ message: "Admin profile accessed", admin: req.admin });
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    await PasswordReset.create({
      userId: user.id,
      token,
      tokenExpiry: new Date(expiryTime),
    });

    const resetLink = `${FRONTEND_BASE_URL}/admin/Reset-password?token=${token}&time=${expiryTime}`;

    const mailResult = await sendMail(
      `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 10 minutes.</p>`,
      "Reset your password",
      email
    );

    if (!mailResult.success) {
      return res.status(500).json({ message: "User registered but email failed", error: mailResult.error });
    }

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetEntry = await PasswordReset.findOne({ where: { token } });
    if (!resetEntry) return res.status(404).json({ message: "Invalid or expired token" });

    if (resetEntry.tokenExpiry < new Date()) {
      await PasswordReset.destroy({ where: { token } });
      return res.status(400).json({ message: "Token has expired" });
    }

    const userId = resetEntry.userId;
    const user = await User.findByPk(userId) || await Admin.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    await PasswordReset.destroy({ where: { token } });

    const mailResult = await sendMail(
      `<p>Your Mobile Shopping password has been reset successfully. <a href="${FRONTEND_BASE_URL}/User/account">Click here</a> to access your profile.</p>`,
      "Password Reset Successful",
      user.email
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
