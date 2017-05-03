const test = require('ava');
const imageminer = require('../lib');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const cwd = path.resolve(__dirname, 'fixture');

let basic = {
  from: path.resolve(cwd, './basic/image.jpg'),
  to: path.resolve(cwd, './basic-output')
};

let basicWithManifest = Object.assign({}, basic, {to: basic.to + '-manifest'});

test.cb.after(t => {
  // rimraf(
  //   basic.to,
  //   () => rimraf(
  //     basicWithManifest.to,
  //     t.end));
});

test.cb('Should optimise one image', t => {
  imageminer(basic.from, basic.to)
    .on('end', () => {
      fs.readdir(path.resolve(cwd, basic.to), (err, data) => {
        t.is(err, null);
        t.is(data[0], path.basename(basic.from));
        t.end();
      });
    });
});

test.cb('Should optimise one image and produce a manifest', t => {

  const options = {
    hash: true,
    manifest: 'hello-i-am-manifest.json'
  };

  imageminer(basicWithManifest.from, basicWithManifest.to, options)
    .on('end', () => {
      fs.readdir(path.resolve(cwd, basicWithManifest.to), (err, data) => {
        t.is(err, null);
        t.is(data.length, 2);
        t.is(data[0], 'hello-i-am-manifest.json');
        t.end();
      });
    });
});
