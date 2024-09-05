const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();
var Movie_name = "";
var Director_name = "";
var Upload_movie_video = "";
var Duration = "";
var Movie_pic = "";
var Actor_name = "";
var Movie_releasedate = "";
var Movie_language = "";
var Movie_rating = "";
var Created_by = "";
var Video_defination = "";
var Movie_status = "";
app.set('view engine', 'ejs');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const dbName = 'moviedatabase'; // Replace with your desired database name
const db = client.db(dbName);
const collectionName = 'moviecollection'; // Replace with your desired collection name
const collection = db.collection(collectionName);
var details='';
var myCursor1 = '';
//const myCursor = '';
var myData = [];
var finalData = [];
var docs = '';
app.use(bodyParser.urlencoded({ extended: true }));
const port =process.env.PORT || 9000;
app.get('/',function(req,res){
    //res.sendFile(path.join(__dirname,'/cinehome.html'));
    res.render('pages/cinehome',{
    
      //finalData  : myData
   //   //docs : docs
    }); 
});
app.get('/login', function(req, res) {
  console.log('called this')
    res.render('pages/login');
});


app.post('/logincheck', function(req, res) {
  console.log('called this 11111')
    res.render('pages/moviedetail');
});

app.post('/Insert_movie', (req, res) => {
    Movie_name = req.body.Movie_name;
    Director_name = req.body.Director_name;
    Upload_movie_video = req.body.Upload_movie_video;
    Duration = req.body.Duration;
    Movie_pic = req.body.Movie_pic;
    Actor_name = req.body.Actor_name;
    Movie_releasedate = req.body.Movie_releasedate;
    Movie_language = req.body.Movie_language;
    Movie_rating = req.body.Movie_rating;
    Created_by = req.body.Created_by;
    Video_defination = req.body.Video_defination;
    Movie_status = req.body.Movie_status;
    client.connect().then(() => {
     console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Error connecting to MongoDB:', err);
    });
   // const dbName = 'moviedatabase'; // Replace with your desired database name
   // const db = client.db(dbName);
   // const collectionName = 'moviecollection'; // Replace with your desired collection name
   // const collection = db.collection(collectionName);
      console.log('333333333333333333333333')
        const document = {
        Movie_name: Movie_name,
        Director_name: Director_name,
        Upload_movie_video: Upload_movie_video,
        Duration: Duration,
        Movie_pic: Movie_pic,
        Actor_name: Actor_name,
        Movie_releasedate: Movie_releasedate,
        Movie_language: Movie_language,
        Movie_rating: Movie_rating,
        Created_by: Created_by,
        Video_defination: Video_defination,
        Movie_status: Movie_status,

      };
      console.log('444444444444444444444444')
      collection.insertOne(document, (err, result) => {
        
        if (err) {
         console.error('Error inserting document:');
        } else {
        console.log('Inserted ID:');
        console.log("result")
      }


   // client.close();
       
  })
  //Fetching Data  
 const myCursor = collection.find({});
//console.log(myCursor) 
//myCursor1 = myCursor;

   myCursor.forEach(function(docs) {
      myCursor1 = myCursor;
      myCursor1 = [
       { Movie_name: docs.Movie_name , 
        Director_name: docs.Director_name,
        Actor_name: docs.Actor_name,
        Movie_releasedate: docs.Movie_releasedate,
        Movie_language: docs.Movie_language,
        Movie_rating: docs.Movie_rating,
        Video_defination: docs.Video_defination,
        Movie_status: docs.Movie_status}
             
     ];
      myData.push(myCursor1)
      for (var i = 0; i < myData.length; i++) {
        details = myData[i];
          //console.log(details);
          details.forEach(function(doc) {
            finalData.push(doc)
         // console.log(doc.Movie_name + " is a " + doc.Director_name + " Movi Name.");
          
         
      });
        //console.log(details);
        //console.log(details.Movie_name);
      //console.log(details.Movie_name +"," +details.Director_name);
      }
// End Fetch
      //  console.log(myData)     

  });
  //console.log(myData) 
  finalData.push( myData);
  //console.log(finalData)  
   res.render('pages/movie',{
    
     finalData  : myData
  //   //docs : docs
   }); 

  
 
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


