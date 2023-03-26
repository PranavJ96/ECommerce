const express = require('express');
const router = express.Router();
const user = require('../services/user');
const userMiddleware = require('../middleware/users.js');
router.get('/', async function(req, res, next) {
  try {
    res.json(await user.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting user data `, err.message);
    next(err);
  }
});
router.post('/', async function(req,res){
  try{
    const result = await user.createUser(req.body)
    console.log(result);
    res.status(201).send(result.insertId);
  }
  catch(err){
    console.log(`Error inserting data`)
  }
})
router.post('/sign-up', userMiddleware.validateRegister, async(req, res, next) => {
  try{
    const {emailid,password}= req.body;
    user.signup(res,emailid,password)
  }
  catch(e){
    console.log(e);
  }
});
router.post('/login', async(req, res) => {
  try{
    const {email,password}= req.body.value;
    await user.login(res,email,password)
  }
  catch(e){
    console.log(e);
  }
})
router.get('/test', userMiddleware.isLoggedIn, async(req,res)=>{
  try{
    console.log(req.userData.userId)
  }
  catch(ex){
    console.log(ex);
  }
})
module.exports = router;