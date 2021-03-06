var express = require('express');
var nodemailer=require('nodemailer');
var router = express.Router();


/* GET home page. */
router.get('/', ensureAuth,function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

function ensureAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/users/login');
}

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact');
});
router.post('/contact/send', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'password'
        }
    });

    var mailOptions = {
        from: 'Your Name <youremail@gmail.com',
        to: 'youtoemail@gmail.com',
        subject: 'Website Submission',
        text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: '+info.response);
            res.redirect('/');
        }
    });
});

module.exports = router;
