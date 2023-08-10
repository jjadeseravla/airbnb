const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //mongoose Id it will give you
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
}) 

const PlaceModel = mongoose.model("Place", placeSchema);

modile.exports = PlaceModel;