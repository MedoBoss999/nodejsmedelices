const Book = require("../schemas/books");


exports.createBook = (req, res) => {
  const book = new Book(req.body);
  book.save()
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(400).json({ message: "Erreur de création", error: err }));
};


exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ message: "Erreur serveur", error: err }));
};


exports.getBookById = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).json({ message: "Livre non trouvé" });
      res.status(200).json(book);
    })
    .catch((err) => res.status(400).json({ message: "ID invalide", error: err }));
};


exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((book) => {
      if (!book) return res.status(404).json({ message: "Livre non trouvé" });
      res.status(200).json(book);
    })
    .catch((err) => res.status(400).json({ message: "Erreur de mise à jour", error: err }));
};


exports.deleteBook = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).json({ message: "Livre non trouvé" });
      res.status(200).json({ message: "Livre supprimé avec succès" });
    })
    .catch((err) => res.status(400).json({ message: "Erreur de suppression", error: err }));
};
