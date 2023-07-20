const router = require("express").Router()
const { memberController } = require("../controllers")

router.get("/", memberController.getAllMembers);
router.get("/borrowed-books-count", memberController.getBorrowedBooksCount);

module.exports = router