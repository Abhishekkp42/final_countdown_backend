const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");
const router = express.Router()

const Classes = require("../models/classes.model")
const crudController = require("./crud.controller")



router.post("", authenticate, authorise["admin", "teacher"], async (req, res) => {
    try {
        const user_id = req.user._id;
        const item = await Classes.create({
            grade: req.body.grade,
            section: req.body.section,
			subject: req.body.subject,
            user_id
        })
		return res.status(200).send(item)
        
    } catch (err) {
        return res.status(500).send({Error:err.message})
    }
})


router.get("", crudController(Classes).getAll);
router.get("/:id", crudController(Classes).getOne);
router.patch("/:id", crudController(Classes).updateOne);
router.delete("/:id", crudController(Classes).deleteOne);

module.exports = router;