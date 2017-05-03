#!/usr/bin/env node

const program = require('commander');
const run = require('../lib');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<from> <to>')
  .arguments('<from> <to>')
  .option('-h, --hash', 'add hashes')
  .option('-m, --manifest', 'JSON manifest filename')
  .action(function (from, to, options) {
    run(from, to, options)
      .on('end', () => {
        console.log('END');
        process.exit(0);
      })
  })
  .parse(process.argv);
