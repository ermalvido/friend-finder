const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env;
      
module.exports = {
    email: async(req, res) => {
        const db = req.app.get('db')
        const {email} = req.body;
        const foundUser = await db.users.check_user({email})
        if(!foundUser[0]){
            return res.status(400).send('Email is not found')
        }
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });
            let info = await transporter.sendMail({
                from: `Elisha Malvido <${EMAIL}>`,
                to: email,
                subject: 'NodeMailer Test',
                text: 'This is a NodeMailer Test',
                html: `<div>This is a NodeMailer Test</div>
                       <img src="cid:unique@nodemailer.com"/>`,
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'unique@nodemailer.com',
                        path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                    }
                ]
            }, (err, res) => {
                if(err){
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            })
        } catch(err) {
            res.status(500).send(err);
        }
    }
}