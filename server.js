const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//require('dotnev').config();


const app = express();
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(_dirname + '/public'));
//Here we're setting the views diredtory to be ./views
//thereby letting the app know where to find the template files
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Christopher',
      lastName: 'Lim',
    }
  }
// Notice now the data is the second argument passed to the template render method
res.render('index', data);
});

app.get('/', (req,res) =>{
    res.render('contact');
});

app.post('/thanks', (req,res)=> {
  const msg = {
    to: 'toffer.lim87@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
  res.render("thanks", {contact: req.body})
});

app.get("*", function (req,res){
  res.send("Opps. Something went wrong!...Err 404").status(404);
})

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});

