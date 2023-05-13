const { Router } = require("express");
const { Rcreate , Rread, Rupdate, Rdelete } = require("../controller/img.controller");

const router = Router();


router.get("/images/read", Rread )
router.post("/images/create", Rcreate )
router.put("/images/update/:id", Rupdate )
router.delete("/images/delete/:id", Rdelete )

module.exports = router;