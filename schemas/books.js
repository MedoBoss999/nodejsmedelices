const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  anneePublication: { type: Number, required: true },
  genre: { type: String },
  dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
