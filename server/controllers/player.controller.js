import{ getPlayers, getSinglePlayer, insertplayer } from"../database.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

async function getAllPlayers(req,res){
    const players = await getPlayers();
  if (!players) {
    res.status(204).json({ message: "Players Doesn't Exist " });
  } else {
    res.send(players);
  }
}

async function getPlayerDetail(req , res) {
    const { pid } = req.body;
  if (!pid) {
    return res.status(400).json({ message: "player id is required" });
  }
  const player = await getSinglePlayer(pid);
  res.send(player);
}

async function registerPlayer(req , res) {
    const {
        fullName,
        gender,
        dob,
        aadharCardNumber,
        eventName,
        email,
        phone,
        addressLine1,
        addressLine2,
        pincode,
        schoolCollageName,
        } = req.body;

        const {photo , aadharCardPhoto } = req.files;
        
        

        if (!photo || !aadharCardPhoto) {
          return res.status(400).send('Both photo and aadharCardPhoto are required.');
        }

      if (
        !fullName ||
        !gender ||
        !dob ||
        !aadharCardNumber ||
        !eventName ||
        !email ||
        !phone ||
        !addressLine1 ||
        !addressLine2 ||
        !pincode ||
        !schoolCollageName
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }
    

      console.log( photo[0].path);
      
    const photoUrl = await uploadOnCloudinary(photo[0].path);
    const aadharCardPhotoUrl = await uploadOnCloudinary(aadharCardPhoto[0].path);
    
      await insertplayer(
        fullName,
        gender,
        dob,
        aadharCardNumber,
        eventName,
        email,
        phone,
        addressLine1,
        addressLine2,
        pincode,
        schoolCollageName,
        photoUrl,
        aadharCardPhotoUrl
      );
    
      res.status(200).json({ Message :"Player registerd Successfullly"})
    
}




export { getAllPlayers, getPlayerDetail , registerPlayer }