import express from 'express';
import { getRequestdPlayers } from "../controllers/admin.controller.js"

const router = express.Router()


router.post('/login' , (req , res)=>{
    // router code here
})


router.post('/accept-player', getRequestdPlayers)

export default router;