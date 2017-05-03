const fs = require('fs');
const path = require('path');
const validate = require('./validate-config');

function readPkg(cwd) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(cwd, 'package.json'), 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = function getConfig(cwd) {
  readPkg(cwd)
    .then(pkg => {
      if (pkg.imageminer) {
        return Promise.reject(reject(new Error('No imageminer property in package.json')));
      } else {
        return Promise.resolve(pkg.imageminer);
      }
    })
    .then(validate);
};
