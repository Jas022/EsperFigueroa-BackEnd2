const User = require("../models/user");


exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
