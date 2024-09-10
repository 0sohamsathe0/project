import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "soham",
    database: "project",
  })
  .promise();

//Get all players
async function getPlayers() {
  const [rows] = await pool.query(`select * from player_request ;`);
  return rows;
}

async function getSinglePlayer(pid) {
  const [rows] = await pool.query(
    `select * from player_request where pid=${pid};`
  );
  return rows;
}

async function lastId() {
  const [rows] = await pool.query(
    `select LAST_INSERT_ID(pid) from player_request;`
  );
  return rows;
}

async function insertplayer(
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
  photo,
  aadharCardPhoto
) {
  const query = `
    INSERT INTO player_request (
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
      photo,
      aadharCardPhoto
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // // Execute the query with the provided values
  await pool.query(query, [
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
    photo,
    aadharCardPhoto
  ]);
}



//admin related functions
async function getPendingPlayers() {
  const [rows] = await pool.query(`select * from player_request where requestStatus = "pending";`);
  return rows;
}


async function acceptPlayer(pid) {
  await pool.query(`update player_request set requestStatus = "Accepted" where pid = ${pid};`);
}


async function rejectPlayer(pid) {
  await pool.query(`update player_request set requestStatus = "Rejected" where pid = ${pid};`);
  
}



export { getPlayers, getSinglePlayer, lastId, insertplayer ,getPendingPlayers, acceptPlayer , rejectPlayer};
