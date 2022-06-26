const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  title: String,
  vers: [{ date: Date, body: String}],
})

module.exports = model("Document", Document)
