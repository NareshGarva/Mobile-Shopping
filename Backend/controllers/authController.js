const User = require('../models/user'); // Sequelize model
const Admin = require('../models/admin'); // Sequelize model
const PasswordReset = require('../models/passwordReset'); // Sequelize model
const jwt = require('jsonwebtoken'); // jsonwebtoken for token generation
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const transporterMail = require('../config/nodemailer'); // nodemailer for sending emails

exports.register = async (req, res) =>{
  const {name, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  try{
    const user = await User.create({name, email, password:hashedPassword});
    res.json({message: "User registered successfully", user});
  }
  catch(error){
    console.log("Error in registration:", error);
    res.status(500).json({message: "Can't register user"});
  }
}




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

  // Generate token with id and email, and an expiry time of 1 hour
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET_KEY,          // Secret key
    { expiresIn: '1h' }                 // Options: Expiry time
  );

  res.json({ message: "User logged in successfully", token });
};


exports.adminLogin = async (req, res) => {
  const {email, password} = req.body;


  const admin = await Admin.findOne({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {id: admin.id, email: admin.email },
    process.env.JWT_SECRET_KEY,
    {expiresIn: '5h'}
  );

  res.json({message: "User logged in successfully", token});

}

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

// Then send `resetLink` in the email
const transporter = transporterMail;

await transporter.sendMail({
  from: '"Mobile Shopping" <demoaddress0123456@gmail.com>', // sender address
  to: user.email,
  subject: "Password Reset",
  html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 10 minutes.</p>`
});

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

    res.status(200).json({ message: "Password reset successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};























