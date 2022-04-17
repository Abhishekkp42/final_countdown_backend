const express = require("express");
const { path } = require("express/lib/application");

const authenticate = require("../middlewares/authenticate");

const authorise = require("../middlewares/authorise");

const Teacher =require("../models/teacher.model")

// const crudController = require("./crud.controller")

const router= express.Router();

router.post("", authorise(["admin"]), async (req, res) => {
	try{
		req.body.user_id= req.user._id
		const teacher= await Teacher.create(req.body)
		return res.send(teacher);
	} catch (err) {
	  return res.status(500).send({ message: err.message });
	}
})


		

		router.get("", async (req, res) => {
	try {
		const page = req.query.page || 1;
		const size = req.query.size || 5;
	  const teacher = await Teacher.find().skip((page - 1) * size)
      .limit(size)
	  .populate({path: "user_id"}).lean().exec()

	  const totalPages = Math.ceil(
		(await Teacher.find(query).countDocuments()) / size
	  );
  
	  return res.send({teacher, totalPages });
	} catch (err) {
	  return res.status(500).send({ message: err.message });
	}
  });


  router.get("/:gender", async (req, res) => {
	try {
	  const page = req.query.page || 1;
	  const size = req.query.size || 5;
  
	  const query = { gender: req.params.gender };
	  const teachers = await Teacher.find(query)
		.skip((page - 1) * size)
		.limit(size)
		.lean()
		.exec();
  
	  const totalPages = Math.ceil(
		(await Teacher.find(query).countDocuments()) / size
	  );
  
	  return res.send({ teachers, totalPages });
	} catch (err) {
	  return res.status(500).send({ message: err.message });
	}
  });


module.exports = router;
