const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
	name: {type: String, required: true},
	gender: {type: String, required: true},
	age: {type: Number, required: true},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	  },
},
{
  versionKey: false,
  timestamps: true,
})

module.exports = mongoose.model("teacher", teacherSchema);
