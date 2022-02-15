const path = require ('path')
const express = require('express') //1. Require
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // 2. Express is a function no arguments require 



//Define pads for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//SetUp handlebars engine and views location
app.set('view engine', 'hbs')//Get handle bars to setup
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //displays the html directly as localhost:3000/help.html


app.get('',(req, res) =>{

    res.render('index',{
        title: 'Weather',
        name: 'Misael'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Misael'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help',
        name: 'Misael',
        information: 'This is the help area'
    })

})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send('You must provide an Address')
    }

    geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})//sending error object 
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'Error',
        errorMessage: 'Help article not found.',
       name: 'Misael'
    })
    
})


app.get('/products',(req, res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query)

    res.send({
        products:[]
    })


})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        errorMessage: 'PAGE NOT FOUND',
        name: 'Misael'
        
    })

})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
}) //4. Starts up the server 


















//IMPORTANT NOTES

//Gets the actual folder we are in

// console.log(__dirname) 


//Sending an object and express stringify and send a JSON

// app.get('/help', (req, res)=>{ 
//     res.send({ 
//         name: 'Misel',   
//         age: 27
//     })
// })

//SENDING ARRAYS OF OBJECTS [{}]

// app.get('/help', (req, res)=>{ 
//     res.send([{ 
//         name: 'Misael'
//     },{
//         name: 'Tyrion'
//     }])
// })
