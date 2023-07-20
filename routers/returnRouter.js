const router = require("express").Router()
const { returnController } = require("../controllers")

router.post("/", returnController.returnBook);

module.exports = router