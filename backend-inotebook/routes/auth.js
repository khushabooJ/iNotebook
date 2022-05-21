const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const note = require("../db/Notesmodel")

const authentication = require("../middleware/authmiddleware")
const jwt = require("jsonwebtoken")

const user = require("../db/Usermodel");



// ROUTE1
router.post("/", async (req, res) => {
    try {
        success = false;
        const password = req.body.password
        const cpassword = req.body.confirmpassword
        if (password === cpassword) {
            const addingusers = new user({
                name: req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            })


            success = true
            //hasingpassword
            const token = await addingusers.generateAuthToken()
            console.log(`lallalalal ${token}`)
            const insertusers = await addingusers.save()
            console.log(addingusers)
            res.json({ success, insertusers, token });



        }
    } catch (e) {
        success = false;
        res.status(400).json({ success, e: "user exists" })

    }

})

// ROUTE2: TOGET USER DETAILS
router.post("/login", async (req, res) => {
    try {

        let success = false;
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await user.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userEmail.password)
        console.log(isMatch)


        if (isMatch) {
            const payload = {
                userdata: {
                    id: userEmail.id
                }
            }
            const token = await userEmail.generateAuthToken();

            success = true;
            console.log(payload)
            res.json({ success, token });

        } else {
            success = false;
            res.json("Wrong email or password")

        }

    } catch (e) {

        res.status(400).json(e)
        console.log("Wrong email or password")
    }



})


// ROUTE3: GET LOGGIN USER DETAIL, LOGIN REQUIRED.DONE USING JWT TOKEN
router.post("/getuser", authentication, async (req, res) => {

    try {
        const userId = req.user.id;
        const userfind = await user.findByIdAndUpdate(userId).select("-password")
        //    const registeredone = user.findOne({_id:userId.id}).select("-password")
        res.status(201).send(userfind)
        console.log(userfind)
        console.log(userId)


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error");
    }
})




module.exports = router