// Controller
"use strict";
const galleryModel = require("../models/galleryModel");
const gallerys = galleryModel.gallerys;

const getGallerys = (req, res) => {
  res.json(gallerys);
};

module.exports = {
    getGallerys
};