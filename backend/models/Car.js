const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
  title: 
    { 
        type: String, 
        required: true 
    },
  description: 
    { 
        type: String 
    },
  images: [String],
  tags: { type: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
