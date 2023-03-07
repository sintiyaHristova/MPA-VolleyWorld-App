const { Schema, model, Types } = require('mongoose');


const photoSchema = new Schema({
  name: { type: String, minLength: [2, 'Name must be at least 2 characters'] },
  image: {
    type: String, validate: {
      validator: value => /https?:\/\/.+/.test(value),
      message: 'Invalid image'
    }
  },
  description: { type: String, minLength: [5, 'Description must be at least 5 characters'], maxLength: [250, 'Description must be at most 250 characters'] },
  location: { type: String, minLength: [5, 'Location must be at least 5 characters'], maxLength: [40, 'Location must be at most 40 characters'] },
  commentList: {
    type: [{
      userId: { type: Types.ObjectId, ref: 'User' },
      comment: String
    }], default: []
  },
  owner: { type: Types.ObjectId, ref: 'User' },
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;