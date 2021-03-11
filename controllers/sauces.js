const Sauces = require('../models/sauces');



exports.addSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauces({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
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




  