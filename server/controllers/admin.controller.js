import { getPendingPlayers } from "../database.js"
const getRequestdPlayers = async(req,res)=>{
   const requestedPlayers = await getPendingPlayers();
   if(!requestedPlayers){
    return res.json( {message : "No Pending Players present" })
   }
   res.send(requestedPlayers);
}


export { getRequestdPlayers }