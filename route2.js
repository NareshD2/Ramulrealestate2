const express = require('express');
const fs = require('fs');
const url = require('url');
const multer=require('multer');
const session = require('express-session');
const {MongoClient,ObjectId}=require('mongodb');
const client1= new MongoClient('mongodb+srv://garlapatidhatrinaresh:Supriya987@cluster0.wcqxqxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const usersCollection=client1.db('credentials').collection('users');
const productsenglish=client1.db('credentials').collection('productsenglish');
const adminCollection=client1.db('credentials').collection('admins');
const cookieParser = require('cookie-parser');
const storage = multer.memoryStorage(); // Use memory storage to avoid saving files on disk
const upload = multer({ storage: storage }).fields([
    { name: 'images[]', maxCount: 20 } // Allow up to 20 images
]);

const connectTodataBase=async()=>{
    try{
        await client1.connect();
        console.log('mongo db connected');
    }catch(err){
        console.log("cannot connect to database")
    }
}
const custommodule = require('./realprodcustom.js');
const custommodule2 = require('./raelsingleprodcustom.js');
//var database=require('./database');
const path=require('path');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const path=require('path');
app.use(express.static(path.join(__dirname)));
//const collections=require('./mongodb');
//const collections1=require('./mongodb1');

app.use(session({
    secret: '9618', // Replace with your own secret key
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000  } // For development; set to true in production with HTTPS
}));
const mainpage = fs.readFileSync('./homepage.html');
const payment = fs.readFileSync('./payment.html','utf-8');
const trackorder = fs.readFileSync('./trackorder.html','utf-8');
const html = fs.readFileSync('./index3.html', 'utf-8');
const producthtml = fs.readFileSync('./realestateproducts.html', 'utf-8');
const singleprodhtml = fs.readFileSync('./realestatesingleprod.html', 'utf-8');
const login = fs.readFileSync('./login2.html', 'utf-8');
const signup = fs.readFileSync('./signup.html', 'utf-8');
const adminhtml = fs.readFileSync('./admin.html', 'utf-8');
const adminsignuphtml = fs.readFileSync('./adminsignup.html', 'utf-8');
const additems = fs.readFileSync('./additems.html', 'utf-8');
const admininterface = fs.readFileSync('./items.html', 'utf-8');
const accountSid = 'AC4ac3690bd57261ef2935d5dbcb7d2758';
const authToken = '9653c4456a842c62d7dd64fb3f84c354';

/*const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'OTP FOR RAMUL REAL ESTATE CONSULTANCY LOGIN',
    to: '+919347522630', // Text your number
    from: '+12184437065', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));*/




  var authenticate=function isAuthenticated(req, res, next) {
    if (req.session && req.session.username) {
        return next();
    } else {
        res.redirect('/login.html');
    }
}
var authenticate1=function isAuthenticated1(req, res, next) {
    if (req.session && req.session.username1) {
        return next();
    } else {
        res.redirect('/admin.html');
    }
}
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(login);
    const userdata1=req.cookies.user;
    const username3=JSON.parse(userdata1).username;
    if(username3){
        req.session.username = username3;
        res.redirect('/products');}
    res.redirect('/login.html');
    res.end();
});

app.get('/logout', (req, res) => {
    //res.clearCookie('user');
    res.redirect('/login.html');
});

app.get('/login.html', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(login);
    res.end();
});

app.get('/signup.html', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(signup);
    res.end();
});
app.get('/admin.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(adminhtml);
    res.end();

});
app.get('/adminsignup.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(adminsignuphtml);
    res.end();


});
app.get('/payment.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(payment);
    res.end();

})
app.get('/additems.html',authenticate1,(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(additems);
    res.end();


});
app.get('/paynow.html',(req,res)=>{
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.write(trackorder);
    res.end();


});
app.post('/additems.html',upload,async(req, res) => {
    //console.log('Request files:', req.files);
    //,upload.array('images', 20)
    try{
        await connectTodataBase();
    //const { category, name, price, area, length, breadth, shape, soilColor, type, specifications, location, pincode, phoneNumber, description } = req.body;

        const images1 = req.files['images[]'].map(file => ({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer.toString('base64')
        }));
    
 
       /* const newItem = {
            category, name, price, area, length, breadth, shape, soilColor, type, specifications, location, pincode, phoneNumber, description
        };*/
        const data={
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        area: req.body.area,
        length: req.body.length,
        breadth: req.body.breadth,
        shape: req.body.shape,
        soilcolor: req.body.soilcolor,
        type1: req.body.type1,
        specifications: req.body.specifications,
        location: req.body.location,
        pincode: req.body.pincode,
        phonenumber: req.body.phonenumber,
        description: req.body.description,
        images:images1
        }
        

        const result = await productsenglish.insertOne(data);
        if (result.acknowledged) {
            res.redirect('/');
        } else {
            res.status(500).send('Error adding item to the database');
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the item');
    }
    //res.send('Product added successfully');
});

app.post('/signup',async (req,res)=>{
        await connectTodataBase();
        var check= await usersCollection.findOne({name:req.body.username});
        if(check && check.password===req.body.password ){
            res.redirect('/signup.html?signupFailure=true'); 
        }else{
            await connectTodataBase()
            const data={
                name:req.body.username,
                password:req.body.password,
                phonenumber:req.body.phonenumber
            }
            //await data.save();
            const temp =await usersCollection.insertOne(data);
            console.log(temp);
            res.redirect('/signup.html?signupSuccess=true');
            
        }
});


app.post('/adminsignup', async(req, res) => {
        await connectTodataBase();
        var check= await adminCollection.findOne({name:req.body.username});
        if(check && check.password===req.body.password){
            res.redirect('/adminsignup.html?adminsignupFailure=true'); 

        }else{
            //await connectTodataBase()
            const data={
                name:req.body.username,
                password:req.body.password,
                phonenumber:req.body.phonenumber
            }
            const temp=await adminCollection.insertOne(data);
            console.log(temp);
            res.redirect('/adminsignup.html?adminsignupSuccess=true');
            
        }
    
});

app.post('/login',async(req,res)=>{
    try{
        await connectTodataBase()
        var check= await usersCollection.findOne({name:req.body.username});
        if(check && check.password===req.body.password){
            req.session.username = req.body.username;
            //res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
            //res.end(html.replace('{{%CONTENT%}}', mainpage));
            res.cookie('user',JSON.stringify(check),{
                maxAge:900000,
                httpOnly:true,
                security:false,
                sameSite:'Strict'});
            res.redirect('/products')

        }else{
            res.redirect('/login.html?loginFailure=true');
        }
    }catch{
        res.redirect('/login.html?loginFailure=true');
    }

});
app.post('/admin', async(req, res) => {
    try{
        await connectTodataBase();
        var check= await adminCollection.findOne({name:req.body.username});

        if(check.password===req.body.password){
            req.session.username1 = req.body.username;
            //res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
            res.redirect('./additems.html');

        }else{
            res.redirect('/admin.html?adminFailure=true');
        }
    }catch{
        res.redirect('/admin.html?adminFailure=true');
    }
    
});

app.get('/about',authenticate, (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'you are in About page'));
});

app.get('/contact',authenticate, (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'you are in Contact page'));
});

app.get('/products',authenticate, async(req, res) => {
    
    await connectTodataBase();
    let productjson=await productsenglish.find().toArray();
    let producthtmlcopy = producthtml.slice();
    if (!req.query.id) {
        let producthtmlArray = productjson.map((prod) => {
            return custommodule.htmlreplace(producthtmlcopy, prod);
        });
        //console.log(producthtmlArray);
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(html.replace('{{%CONTENT%}}', producthtmlArray));
    } else {
        await connectTodataBase();
        var pid=req.query.id;
        //console.log(pid);
        let product =await productsenglish.findOne({_id:new ObjectId(pid)});
        //console.log(product);
        let sam = custommodule2.htmlreplace(singleprodhtml, product);
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(html.replace('{{%CONTENT%}}', sam));
    }
});

app.use((req, res) => {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(html.replace('{{%CONTENT%}}', 'Page not found'));
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
