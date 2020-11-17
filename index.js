const express = require('express')
const nodeMailer = require('nodemailer')

const app = express()

app.use(express.json())


app.post('/send-mail', (req,res) => {
  const {to, subject, text} = req.body

  if (!to || !subject || !text) {
    return res.json({error: 'wrong params'})
  }
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    to,
    subject,
    text
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({error})
    }
    res.json({info})
  })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Started Listening ...')
})