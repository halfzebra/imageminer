var Ajv = require('ajv');
var ajv = new Ajv();

const imageminOptipngOptionSchema = require('../shemas/imageminOptipngOptionSchema.json');
const imageminGifsicleOptionSchema = require('../shemas/imageminGifsicleOptionSchema.json');
const imageminJpegtranOptionSchema = require('../shemas/imageminJpegtranOptionSchema.json');
const imageminSvgoOptionSchema = require('../shemas/imageminSvgoOptionSchema.json');

const shema = {
  'properties': {
    'plugins': {
      'properties': {
        'optipng': imageminOptipngOptionSchema,
        'gifsicle': imageminGifsicleOptionSchema,
        'jpegtran': imageminJpegtranOptionSchema,
        'svgo': imageminSvgoOptionSchema
      }
    }
  },
  'additionalProperties': false
};

module.exports = imageminerOptions => {
  const validate = ajv.compile(shema);
  const valid = validate(data);

  if (!valid) {
    return Promise.reject(validate.errors);
  } else {
    return Promise.resolve(data);
  }
};
