const db = require('./db');
const helper = require('../helper');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require("jsonwebtoken")
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, 10);
  const rows = await db.query(
    `SELECT * FROM USER LIMIT ${offset},${10}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function createUser(fname, mname, lname, pcode, pnumber, genderID, age){
  try{
    let newID = uuid.v4();
    await db.query(`INSERT INTO user (ID, FNAME, MNAME, LNAME, PCODE, PNUMBER, GenderID, AGE) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`,[newID,fname, mname, lname, pcode, pnumber, genderID, age])
    return newID
  }
  catch(e){
    console.log(e)
  }
}

async function signup(res,emailid,password){
  try{
    await db.query(`SELECT * FROM credentials WHERE LOWER(emailid) = LOWER(?);`,[emailid]).then( (result)=>{
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } 
      else {
        // username is available
        bcrypt.hash(password, 10, async(err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            const userID = await createUser(null, null,null,null,null, null, null)
            await db.query(
              `INSERT INTO credentials (id, emailid, password, userid) VALUES (?,?,?,?)`, [uuid.v4(), emailid, hash,userID]).then(()=>{
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }).catch((err)=>{
                return res.status(400).send({
                  msg: err
                });
              })
          }
        });
      }
    })
  }
  catch(ex){
    console.log(ex)
  }
}

async function login(res,emailid,password){
  const maxAge = 7 * 24 * 60 * 60; // Total of 3 days
  db.query(`SELECT * FROM credentials WHERE emailid = ?`,[emailid])
  .then((result)=>{
    if (!result.length) {
      return res.status(401).send({
        msg: 'Username or password is incorrect!'
      });
    }
    // check password
    bcrypt.compare(
      password,
      result[0]['PASSWORD'],
      (bErr, bResult) => {
        // wrong password
        if (bErr) {
          throw bErr;
        }
        if (bResult) {
          const token = jwt.sign({
              email: result[0]['EMAILID'],
              userId: result[0]['ID']  
            },
            'SECRETKEY', {
              expiresIn: '7d'
            }
          );
          res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: true,
            maxAge:1000*maxAge,
          });
          return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]['EMAILID']
          });
        }
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
    );
  }
  )
  .catch((err)=>{
    console.log(err);
    res.status(500).send("Something went wrong...")
  })
      
}

module.exports = {
  getMultiple,
  createUser,
  signup,
  login
}