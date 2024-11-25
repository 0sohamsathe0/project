import{ getPlayers, getSinglePlayer, insertplayer ,pool ,getSpecificTournament} from"../database.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


//get player
async function getAllPlayers(req,res){
    const players = await getPlayers();
  if (!players) {
    res.status(204).json({ message: "Players Doesn't Exist " });
  } else {
    res.send(players);
  }
}

async function getPlayerDetail(req , res) {
    const { pid } = req.params;
  if (!pid) {
    return res.status(400).json({ message: "player id is required" });
  }
  const player = await getSinglePlayer(pid);
  res.send(player);
}



// Player Register
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
        schoolCollegeName,
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
        !schoolCollegeName
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }
    
      
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
        schoolCollegeName,
        photoUrl,
        aadharCardPhotoUrl
      );
    
      res.status(200).json({ Message :"Player registerd Successfullly"})
    
}

//login 
async function handleLogin(req,res) {
  const { aadharCardNumber ,dob } = req.body;   
  const [rows] = await pool.query(`select * from player_details where aadharCardNumber=${aadharCardNumber} and dob = "${dob}";`);
  const player = rows[0];  
  if (!player) {
    res.status(400).json({message : "player not found"})
  }
  
  res.send(player);
}



//get certificates
async function handleGetPartiCerti(req, res) {
    const { pid } = req.params;
  
    if (!pid) {
      return res.status(400).json({ message: "Pid is required" });
    }
  
    // Fetch participation certificates for the given pid
    const [certificates] = await pool.query(
      `SELECT * FROM certificate_of_participation WHERE pid = ${pid};`
    );
    // Fetch the tournament titles for each certificate
    const certificatesWithTitles = await Promise.all(
      certificates.map(async (certificate) => {
        const [tournament] = await getSpecificTournament(certificate.tid);
        console.log(tournament.title);
        
        return {
          title: tournament?.title || "Unknown Tournament", // Default title if none found
          certificateUrl: certificate.certficateUrl,
        };
      })
    );
  
    // Send the response
    res.json(certificatesWithTitles);
}
  
async function handleGeMeritCerti(req,res) {
  const { pid } = req.params;
  
    if (!pid) {
      return res.status(400).json({ message: "Pid is required" });
    }
  
    // Fetch participation certificates for the given pid
    const [certificates] = await pool.query(
      `SELECT * FROM certificate_of_merit WHERE pid = ${pid};`
    );
    // Fetch the tournament titles for each certificate
    const certificatesWithTitles = await Promise.all(
      certificates.map(async (certificate) => {
        const [tournament] = await getSpecificTournament(certificate.tid);
        console.log(tournament.title);
        
        return {
          title: tournament?.title || "Unknown Tournament", // Default title if none found
          certificateUrl: certificate.certficateUrl,
        };
      })
    );
  
    // Send the response
    res.json(certificatesWithTitles);
}




export { getAllPlayers, getPlayerDetail , registerPlayer ,handleGetPartiCerti ,handleGeMeritCerti , handleLogin}