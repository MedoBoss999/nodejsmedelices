require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schemas/users");
const validate = require("mongoose-validator");

const saltRounds = 10;

exports.createUser = (req, res) => {
  if (!req.body.nom || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Champs requis manquants." });
  }

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) return res.status(500).json({ error: err });

    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      motDePasse: hash,
      dateInscription: req.body.date || new Date(),
    });

    user.save()
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(400).json(error)); // garder 400 pour erreurs de validation
  });
};

  
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Vérifie que les champs sont présents
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
      }

      // Compare avec le bon champ : motDePasse
      bcrypt.compare(password, user.motDePasse)
        .then((valide) => {
          if (!valide) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
          }

          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Connexion réussie.",
            token: token,
            user: {
              id: user._id,
              nom: user.nom,
              email: user.email,
              dateInscription: user.dateInscription
            }
          });
        })
        .catch((error) => res.status(500).json({ error: "Erreur lors de la comparaison du mot de passe." }));
    })
    .catch((error) => res.status(500).json({ error: "Erreur lors de la recherche de l'utilisateur." }));
};
