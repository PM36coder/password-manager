import express from "express"
import { userRegister ,userLogin,userLogout} from "../controller/userController.js"
import userAuthMiddleware from "../middleware/userAuth.js"

const router = express.Router()

router.post("/register",userRegister)
router.post("/login",userLogin)
router.post("/logout",userLogout)
router.get("/me", userAuthMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});
export default router