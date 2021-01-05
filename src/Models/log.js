const mongoose = require("mongoose");
const config = require("../db");

const LogSchema = mongoose.Schema({
  name: { type: String },
  status: { type: Number },
});

const Log = (module.exports = mongoose.model("Log", LogSchema));

module.exports.addLog = function (newLog, callback) {
  newLog.save(callback);
};

// module.exports.editLog = function (log, callback) {
//   Log.findByIdAndUpdate(log._id, { $set: log }, callback);
// };

module.exports.editLog = function (name, callback) {
  Log.findOneAndUpdate({ name: name }, { $set: { status: 1 } }, { new: true },callback);
};
