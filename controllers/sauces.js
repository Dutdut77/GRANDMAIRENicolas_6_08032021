const Sauces = require('../models/sauces');



exports.addSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: "0",
    dislikes: "0",
    usersLiked: `[]`,
    usersDisliked: `[]`
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


      //&& sauce.usersLiked.includes(userId) == false
      if (like === 1) {
          const newLike = sauce.likes += 1;
          //const newUsersLiked = sauce.usersLiked.push(userId);

          Sauces.updateOne({ _id: req.params.id }, {
          likes: newLike,
          //usersLiked: newUsersLiked,
          _id: req.params.id
        })
          .then(() => res.status(200).json(console.log(req.body)))
          .catch(error => res.status(400).json({ error }));

      }


    res.status(200).json({ message: 'Attention' })

    })
    .catch(error => res.status(404).json({ error }));



};