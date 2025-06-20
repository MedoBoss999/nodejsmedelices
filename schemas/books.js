const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},  
  titre: { type: String, required: true },
  categorie: { type: String, required: true },
  annee: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
