const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const Weather = require('../models/weathre')

dotenv.config();


const login = async (req, res) => {
    try {
        const theAdmin = await Admin.findById({ _id: req.params.id })
        const token = jwt.sign({ name: theAdmin.name, password: theAdmin.password }, process.env.MY_SECRET)
        res.send(token)
    }
    catch {
        res.send("not found the admin somthing wrong!! -plese try again")
    }


}

const addAdmin = async (req, res) => {
    try {
        const currentadmin = new Admin(req.body)
        await currentadmin.save()
        await sendmail(req.body.mail, req.body.name)
        res.status(200).json({ admin: currentadmin })
    }
    catch {
        res.status(404).send("error in register")
    }

}


//return all user 
const getAllUser = async (req, res) => {

    try {
        const admin = await Admin.findById({ _id: req.params.id }).populate({ path: 'usersList', select: 'name' })
        res.status(200).json({ users: admin.usersList })
    }
    catch {
        res.status(400).send("cant find ")
    }


}
//the function is delete user and all his weathers he looked for
const deleteUserAndHisHistory = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.userId })
        await Weather.deleteMany({ _id: { $in: user.whetherList } })
        await User.findByIdAndDelete({ _id: req.params.userId })
        Admin.findByIdAndUpdate({ _id: req.params.id }, { $pull: { 'usersList': req.params.userId } })
        res.status(200).send("delete")
    }
    catch {
        res.status(400).send("cant delete")
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
        text: `hello ${name} -admin`
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
module.exports = { addAdmin, login, getAllUser, deleteUserAndHisHistory }
