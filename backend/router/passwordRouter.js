import express from "express"
import { getPassword,savePassword,deletePassword,updatePassword,getAllPasswords} from "../controller/passWordControll.js"
import userAuthMiddleware from "../middleware/userAuth.js"
const router = express.Router()

router.post("/add-password",userAuthMiddleware,savePassword)
router.get("/get-password/:id",userAuthMiddleware, getPassword)
router.get("/get-all-passwords", userAuthMiddleware,getAllPasswords)
router.delete("/delete-password/:id",userAuthMiddleware, deletePassword)
router.put("/edit-password/:id", userAuthMiddleware,updatePassword)

export default router