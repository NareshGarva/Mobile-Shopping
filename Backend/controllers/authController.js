const User = require('../models/user'); // Sequelize model
const Admin = require('../models/admin'); // Sequelize model
const PasswordReset = require('../models/passwordReset'); // Sequelize model
const jwt = require('jsonwebtoken'); // jsonwebtoken for token generation
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const sendMail = require('../utils/mailer'); // nodemailer for sending emails

exports.register = async (req, res) =>{
  const {name, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  try{
    const user = await User.create({name, email, password:hashedPassword});

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
    .btn { display: inline-block; padding: 10px 20px; background-color:rgb(20, 20, 20); color: #fff; text-decoration: none; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Welcome to Mobile Shopping!</h2>
    <p>Hello ${name},</p>
    <p>Thank you for registering with us. We're excited to have you onboard.</p>
    <p>Start exploring our services by visiting your dashboard.</p>
    <a href="http://127.0.0.1:5500/Frontend/User%20Module/pages/Authentication.html" class="btn">Go to Dashboard</a>
    <p>If you have any questions, feel free to contact our support team.</p>
    <p>Best regards,<br>Team Mobile Shopping</p>
  </div>
</body>
</html>
`,
      "Welcome to Mobile Shopping",
      email
    );

    res.json({message: "User registered successfully", user});
  }
  catch(error){
    console.log("Error in registration:", error);
    res.status(500).json({message: "Can't register user"});
  }
}


exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    console.log("User ID not provided in the request.");
    return res.status(400).json({ message: "User ID not found" });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      console.log("User not found with the given ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", user :{
      name: user.name,
      email: user.email,
      mobile: user.mobile
    } });
    
  } catch (error) {
    console.error("Error while fetching user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateUserById = async (req, res) => {
  if (!req.body) {
    console.log("Updated body not provided");
    return res.status(400).json({ message: "Body not provided" });
  }

  const { userId, name, email, mobile } = req.body;

  try {
    // First, check if user exists
    const existingUser = await User.findOne({ where: { id: userId } });

    if (!existingUser) {
      console.log("User not found with the given ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user
    await User.update(
      { name, email, mobile },
      { where: { id: userId } }
    );

    // Get the updated user data
    const updatedUser = await User.findOne({ where: { id: userId } });

    return res.status(200).json({
      message: "User updated successfully"
    });

  } catch (error) {
    console.error("Error while updating user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.getProfile = async (req, res) => {
  // req.user was attached in middleware
  res.json({ message: "User profile accessed", user: req.user });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const expireTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ message: "User logged in successfully", token, id: user.id, expireTime });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const expireTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
  
  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ message: "Admin logged in successfully", token, id: admin.id, expireTime });
};

exports.getAdminProfile = async (req, res) => {
  // req.user was attached in middleware
  res.json({ message: "User profile accessed", admin: req.admin });
};




exports.forgotPassword = async (req, res) =>{
const {email} = req.body;

const user = await User.findOne({where: {email}});
if(!user){
  return res.status(404).json({message: "Email not found"});
}
// Generate a reset token and send it to the user's email
const Token = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '10m'});


//set expiry time for the token in the database or in-memory store
const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes from now

// Save to DB
await PasswordReset.create({
  userId: user.id,
  token: Token,
  tokenExpiry: new Date(expiryTime),
});

// Send email logic here (using nodemailer or similar)
const resetLink = `http://127.0.0.1:5500/Frontend/admin%20module/Reset%20password.html?token=${Token}&time=${expiryTime}`;

   const mailResult = await sendMail(
      `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 10 minutes.</p>`,
      "Reset your password",
      email
    );

        if (!mailResult.success) {
      return res.status(500).json({ message: "User registered but email failed", error: mailResult.error });
    }
res.status(200).json({ message: "Password reset link sent to your email." });

};






exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const resetEntry = await PasswordReset.findOne({ where: { token } });
    
    if (!resetEntry) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const currentTime = new Date();
    if (resetEntry.tokenExpiry < currentTime) {
      await PasswordReset.destroy({ where: { token } }); // Clean up expired token
      return res.status(400).json({ message: "Token has expired" });
    }

    const userId = resetEntry.userId;

    const user = await (User.findByPk(userId) || Admin.findByPk(userId)); // Check both User and Admin models
    if (!user) {
      await PasswordReset.destroy({ where: { token } }); // Clean up expired token
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { id: userId } });

    await PasswordReset.destroy({ where: { token } });

    const mailResult = await sendMail(
      `<p>Your Mobile shopping password reseted successfully, <a href="http://127.0.0.1:5500/Frontend/User%20Module/pages/account.html">Click here</a> to access you profile account.</p>`,
      "Password reseted",
      email
    );

    res.status(200).json({ message: "Password reset successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};























