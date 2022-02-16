const { url } = require('inspector');
const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String},
  state: { type: String, default:'todo'},
  started_time: { type: String},
  finished_time: { type: String},
  userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
},
{
  timestamps : true
});

module.exports = mongoose.model('Task', TaskSchema);
