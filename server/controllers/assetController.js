const fs = require('fs');
const { resolve, join } = require('path');

const folderDir = resolve(__dirname, '../assets');
const assetController = {};

assetController.getFolders = (req, res, next) => {
  let folders = fs.readdirSync(folderDir, (err, folderList) => ((err) ? next(err) : folderList));
  // Remove hidden folders
  folders = folders.filter((folder) => !(/^\./).test(folder));
  res.locals.folders = [];
  // Remove any empty folders and push into res.locals.folderList
  folders.forEach((folder) => {
    const path = resolve(folderDir, folder);
    const files = fs.readdirSync(path, (err, file) => ((err) ? next(err) : file));
    if (files.length) res.locals.folders.push(folder);
  });
  return next();
};

assetController.getSlides = (req, res, next) => {
  const slidesDir = resolve(folderDir, req.headers.folder);
  let slides = fs.readdirSync(slidesDir, (err, slidesList) => ((err) ? next(err) : slidesList));
  slides = slides.filter((folder) => !(/^\./).test(folder));
  // Return an array of objects consisting of the name of the slides and their location
  res.locals.slides = slides.reduce((acc, slide) => {
    const slideInfo = { name: slide };
    slideInfo.url = join('assets', req.headers.folder, slide);
    acc.push(slideInfo);
    return acc;
  }, []);
  next();
};

assetController.getPDF = (req, res, next) => {
  console.log(req);
  next();
};

module.exports = assetController;
