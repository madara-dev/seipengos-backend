const { userModel,addressFinder, attribute_adder } = require('./mongo')
const express = require('express')
const router = express.Router()





router.get('/gts', async (req, res)=>{


      // for (let i = 0; i<10; i++) {


      res.json("api working")


})




router.post('/register',async (req, res) => {
   
   // console.log(req.headers.authorization);

   


    try {
      //  console.log(req.body.address);
       const result = await addressFinder(req.body.address)
 
       if (result === false) {
          // const user = (await userModel.find({ email: req.body.eaddress }).exec()).pop()
 
          const user = userModel({
             address: req.body.address,
             twitter: '',
             discord: '',
             quote_link: '',
             zily_username: ''
          })
 
          await user.save()
 
          const userdata = await (await userModel.find({ address: req.body.address }).exec()).pop()
          // res.cookie('token', authtoken, { expires: new Date(Date.now() + 86400000), secure: true })
 
          res.json({ success: 'loggedin', address: userdata.address, twitter: userdata.twitter, discord: userdata.discord, quote_link: userdata.quote_link, zily_username: userdata.zily_username });
 
       } else {
 
          const userdata = await (await userModel.find({ address: req.body.address }).exec()).pop()
          // res.cookie('token', authtoken, { expires: new Date(Date.now() + 86400000), secure: true })

         //  console.log(userdata);
 
 
          res.json({ success: 'loggedin', address: userdata.address, twitter: userdata.twitter, discord: userdata.discord, quote_link: userdata.quote_link, zily_username: userdata.zily_username });
 
       }
 
 
    } catch (error) {
       console.log(error);
    }








      
   })




   router.post('/attribute_adder', async (req, res) => {


      try {
         console.log(req.body);
         if (req.body.task === "Twitter") {
            try {
               await userModel.updateOne({ address: req.body.address }, { twitter: req.body.twitter })
               console.log('success');
               
             } catch (error) {
               return {error}
             }
         } else if(req.body.task === "discord"){
            try {
               await userModel.updateOne({ address: req.body.address }, { discord: req.body.discord })
               console.log('success');
               
             } catch (error) {
               return {error}
             }

         } else if(req.body.task === "quote_link"){
            try {
               await userModel.updateOne({ address: req.body.address }, { quote_link: req.body.quote_link })
               console.log('success');
               
             } catch (error) {
               return {error}
             }

         }else if(req.body.task === "zily_username"){
            try {
               await userModel.updateOne({ address: req.body.address }, { zily_username: req.body.zily_username })
               console.log('success');
               
             } catch (error) {
               return {error}
             }

         }
         
   

   
   
      } catch (error) {
         console.log(error);
      }
  
     })
  






// router.post('/login',
//    // username must be an email
//    body('username').not().isEmpty().withMessage("username or password is empty").custom(async (value, { req }) => {

//       if (await nameFinder(value) === false) {
//          throw new Error('name or password must be wrong')
//       }
//       return true;
//    }),
//    // password must be at least 5 chars long
//    body('password').not().isEmpty().withMessage("email or password is empty"),



//    async (req, res) => {






//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {

//          for (var i = 0; i < 1; i++) {
//             return res.status(400).json({ errors: errors.array()[i] })

//          }

//       }

//       try {
//          bcrypt.compare(req.body.password, await hashFinder(req.body.username), function (err, result) {
//             if (result === true) {
//                return res.status(200).json({ success: 'logged in' })
//             } else {
//                return res.status(400).json({ error: 'email or password must be wrong' })
//             }
//          });

//       } catch (error) {
//          return error
//       }










//       // else {

//       //    return res.status(200).json({ success: "logged in" });

//       // }



//    }


// );


// router.post('/logout', (req, res) => {
//    req.session.destroy()
//    res.redirect('/login')

// })



// router.get('*', (req, res) => {
//    res.redirect('/')
// })




module.exports = router;