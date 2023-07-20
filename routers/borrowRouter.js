const router = require("express").Router()
const { borrowController } = require("../controllers")

router.post("/", borrowController.borrowBook)

module.exports = router