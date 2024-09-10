import express from "express";
import{ getAllPlayers , getPlayerDetail , registerPlayer } from "../controllers/player.controller.js"
import { upload } from "../middlewares/multer.middelware.js";

const router = express.Router()

router.route("/all-players").get(getAllPlayers);

router.route("/")
 .get(getPlayerDetail)
 .post( upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'aadharCardPhoto', maxCount: 1 }]) ,registerPlayer);

export default router;