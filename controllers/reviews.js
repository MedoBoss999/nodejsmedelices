
const Review = require('../shema/Review');
const Book = require('../shema/Books');
const User = require('../shema/Users');

// 👉 Créer une review
exports.createReview = (req, res) => {
  const { user, book, comment, rating } = req.body;

  // Vérifier que l'utilisateur et le livre existent
  Promise.all([
    User.findById(user),
    Book.findById(book)
  ])
  .then(([foundUser, foundBook]) => {
    if (!foundUser || !foundBook) {
      return res.status(404).json({ message: "Utilisateur ou Livre introuvable" });
    }

    const review = new Review({ user, book, comment, rating });

    review.save()
      .then(savedReview => res.status(201).json(savedReview))
      .catch(err => res.status(400).json({ error: err.message }));
  })
  .catch(err => res.status(500).json({ error: err.message }));
};