const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotnev').config();


const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Here we're setting the views diredtory to be ./views
//thereby letting the app know where to find the template files
app.set('views', './view');

//Here we're setting the default engine to be ejs
//note we don't need to require it, express will do that for us
app.set('view engine', 'ejs');

//Now instead of using res.send we can use
//res.render to send the output of the template by filename
app.get('/', (requestAnimationFrame,res) =>{
    res.render('index');
});

app.listen(8080, () => {
    console.log('listening at http://localhost:8080');
});

app.get('/', (req, res) => {
    const data = {
      person: {
        firstName: 'Chris',
        lastName: 'Lim',
      }
    }
  
    // Notice now the data is the second argument passed to the template render method
    res.render('index', data);
  });