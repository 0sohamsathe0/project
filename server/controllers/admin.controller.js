import { getPendingPlayers , acceptPlayer , rejectPlayer , addTournament, addPartiCerti , addMeritCerti ,getAllTournaments} from "../database.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const handleGetRequestdPlayers = async (req, res) => {
  const requestedPlayers = await getPendingPlayers();
  if (!requestedPlayers) {
    return res.json({ message: "No Pending Players present" });
  }
  res.send(requestedPlayers);
};


//player realted controllers
const handleAcceptPlayer = async(req,res)=>{
   const pid = req.params.pid;
   try {
      await acceptPlayer(pid);
   } catch (error) {
      console.log(error);
   }
   res.status(200).json({message : `player Accepted with player id ${pid}`})
}

const handleRejectPlayer = async(req,res)=>{
   const pid = req.params.pid;
   try {
      await rejectPlayer(pid);
   } catch (error) {
      console.log(error);
   }
   res.status(200).json({message : `player rejected with player id ${pid}`})
}


//tournament realted controllers
const handleAddTournament = async(req,res)=>{
 const { 
   title,
   startingDate,
   endDate,
   locationState,
   locationCity,
   tlevel
} = req.body

console.log(title);


if(!title || !startingDate || !endDate || !locationState || !locationCity || !tlevel){
   return res.status(400).json({ message : "all fields are required"})
}

await addTournament(title,startingDate,endDate,locationState,locationCity,tlevel);

res.status(200).json({ message : `Tournament added successfully `,title : `${title}`})
}

const handleGetAllTournament =async (req,res) => {
   const allTournaments = await getAllTournaments();
   if(!allTournaments){return res.status(400).json({ message : "No tournaments Available to display"})}
   res.send(allTournaments)
}



//result related controllers
const handleAddIndividualResult = async (req,res) => {
   
}

const handleAddTeamResult = async (req,res) => {
   
}



//certificates related controllers
const handleAddMeritCertificate = async (req,res) => {
   const { tid , pid} = req.body;
   const certificatePhoto = req.file;
   if(!tid || !pid || !certificatePhoto ){
      return res.status(400).json({ message : "all fields are required"})
   }
   const certificateUrl = await uploadOnCloudinary(certificatePhoto.path);

   await addMeritCerti(tid,pid,certificateUrl);
   res.status(200).json({ message : "Merit cerificate added successfully " })
  
}

const handleAddParticipationCertificate = async (req,res) => {
   const { tid , pid} = req.body;
   const certificatePhoto = req.file;
   if(!tid || !pid || !certificatePhoto ){
      return res.status(400).json({ message : "all fields are required"})
   }
   const certificateUrl = await uploadOnCloudinary(certificatePhoto.path);

   await addPartiCerti(tid,pid,certificateUrl);
   res.status(200).json({ message : "participation cerificate added successfully " })
}





export { handleGetRequestdPlayers , handleAcceptPlayer ,handleRejectPlayer ,handleAddTournament ,handleAddMeritCertificate ,handleAddParticipationCertificate ,handleAddIndividualResult,handleAddTeamResult , handleGetAllTournament};
