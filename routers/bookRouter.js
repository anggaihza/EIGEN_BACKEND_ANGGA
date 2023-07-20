const router = require("express").Router()
const { bookController } = require("../controllers")

router.get("/", bookController.getAllBooks);
router.get("/available", bookController.getAvailableBooksCount);

module.exports = router