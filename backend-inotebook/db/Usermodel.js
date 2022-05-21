const validator = require("validator");
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    confirmpassword:{
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"note"
  
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generating token
userSchema.methods.generateAuthToken = async function () {

    try {
        const token = jwt.sign({ id: this._id }, process.env.REACT_APP_JWT_TOKEN);
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;

        
    } catch (e) {
        res.status(400).send("ERROR!")
        console.log(e);
    }



}

userSchema.pre("save", async function (next) {


    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`the current password ia ${this.password}`);

        this.confirmpassword = await bcrypt.hash(this.password,10);
    }
    next();
})





const user = new mongoose.model("user", userSchema)

module.exports = user;