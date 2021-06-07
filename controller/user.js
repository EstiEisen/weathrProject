const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const Admin = require('../models/admin')
dotenv.config();
const login = async (req, res) => {
    try {
        const theUser = await User.findById({ _id: req.params.id })
        const token = jwt.sign({ name: theUser.name, password: theUser.password }, process.env.MY_SECRET)
        res.send(token)
    }
    catch {
        res.send("not found the user -plese try again")
    }


}

const addUser = async (req, res) => {
    try {
        const currentUser = new User(req.body)
        await currentUser.save()
        await sendmail(req.body.mail, req.body.name)
        await Admin.findByIdAndUpdate({ _id: req.body.adminId }, { $push: { 'usersList': currentUser._id } })
        res.status(200).json({ user: currentUser })
    }
    catch {
        res.status(404).send("error in register")
    }



}


function sendmail(email, name) {
    console.log(name)
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estieisen@gmail.com',
            pass: '318750858'
        }
    });

    console.log("transporter : ", transporter)

    var mailOptions = {
        from: 'estieisen@gmail.com',
        to: email,
        subject: 'wellcom',
        text: `hello ${name}`
    };

    console.log("mailOptions : ", mailOptions)

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error");
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = { addUser, login }
