const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true, 
        trim: true,     
      },
      email: {
        type: String,
        required: true,
        unique: true,    
        lowercase: true, 
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,   
        default: "https://www.viverefermo.it/images/user.png",  
        required: false
      },
      phoneNumber: { 
        type: String, 
        required: false },
  },
  { timestamps: true },
);


module.exports = mongoose.model(
  'User',
  userSchema,
);
