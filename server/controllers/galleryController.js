// Controller
"use strict";
const galleryModel = require("../models/galleryModel");
const galleries = galleryModel.galleries;

const getGalleries = (req, res) => {
  res.json(galleries);
};

module.exports = {
    getGalleries
};