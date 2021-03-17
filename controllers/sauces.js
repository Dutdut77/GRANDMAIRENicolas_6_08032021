const Sauces = require('../models/sauces');



exports.addSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: "0",
    dislikes: "0",
    usersLiked: [`test`],
    usersDisliked: [`test`]
  });

  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => res.status(201).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


exports.updateSauce = (req, res, next) => {
  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteSauce = (req, res, next) => {
  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};


exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      if (like === 1 && sauce.usersLiked.includes(userId) == false) {
        sauce.likes += 1;
        sauce.usersLiked.push(userId);
      }
      if (like === -1 && sauce.usersDisliked.includes(userId) == false) {
        sauce.dislikes += 1;
        sauce.usersDisliked.push(userId);
      }
      if (like === 0 && sauce.usersLiked.includes(userId) == true) {
        sauce.likes -= 1;
        const index = sauce.usersLiked.indexOf(userId);
        if (index > -1) {
          sauce.usersLiked.splice(index, 1);
        }
      }
      if (like === 0 && sauce.usersDisliked.includes(userId) == true) {
        sauce.dislikes -= 1;
        const index = sauce.usersDisliked.indexOf(userId);
        if (index > -1) {
          sauce.usersDisliked.splice(index, 1);
        }
      }

      Sauces.updateOne({ _id: req.params.id }, {
        likes: sauce.likes,
        dislikes: sauce.dislikes,
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        _id: req.params.id
      })
        .then(() => res.status(200).json({ message: 'Like mis à jour !' }))
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(404).json({ error }));

};