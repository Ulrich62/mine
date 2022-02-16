const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, timestapms: true, unique: true },
    lastName: { type: String, required: true, timestapms: true, unique: true },
    nationality: { type: String, timestapms: true},
    birthday: { type: String, timestapms: true},
    speciality: { type: String, timestapms: true},
    email: { type: String, required: true, timestapms: true, unique: true },
    is_admin: { type: String, required: true, timestapms: true, default: "no" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
