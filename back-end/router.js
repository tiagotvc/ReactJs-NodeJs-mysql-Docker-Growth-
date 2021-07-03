const express = require("express")
const router = express.Router()
const {connectionBuilder} = require("./utils/connectionBuilder")
const {dbconnection} = require("./connection")
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.body.headers['x-acess-token'];

  
    if(!token){
        res.send({auth:false})
    } else {
        jwt.verify(token, "jwtSecret" , (err, decoded) => {
            if(err) {
                res.send({auth: false});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};
 
 // EndPoint de Login
 router.post("/login", async function(request, res) {
    const email = request.body.login;
    const password = request.body.senha;

    sqlQuery = 
                "SELECT * " +
                "FROM users " +
                "WHERE email = " + "'"+email+"'" + " AND password = " + "'"+password+"';"

   
    var response = await connectionBuilder(dbconnection, sqlQuery)
  
    if(response.status == 200 && response.data.length > 0){
      
        const id = response.data[0].id;
        const token = jwt.sign({id}, "jwtSecret",{
            expiresIn: 900,
        })
            res.send({auth: true, token: token, res:response});
    }else{
           
            res.send({generic: "Email ou senha inválidos" , auth: false});
        }
    });


router.post("/register", async function(request, res) {
    const email = request.body.login;
    const password = request.body.senha;
    
    sqlQuery = 
            "SELECT * " +
            "FROM users " +
            "WHERE email = " + "'"+email+"'" + " AND password = " + "'"+password+"';"
    
    var response = await connectionBuilder(dbconnection, sqlQuery)
        
    if(response.status == 200 && response.data.length > 0){
        res.send({hasUser: true});

    }else{

        sqlQuery2 = 
            " INSERT INTO users ( "+
            "   email, "+
            "   password "+
            " ) VALUES ( "+
            "   '"+email+"', "+
            "   '"+password+"' "+
            " ); "
       
        var response2 = await connectionBuilder(dbconnection, sqlQuery2)

        res.send({status:200})

                
            }
        });

//EndPoint de Favoritos
router.post("/addFavoritos", async function(request, res) {
    const title = request.body.title;
    const urlLink = request.body.urlLink;
    const userId = request.body.userId;

    sqlQuery1 = "SELECT * " +
               "FROM favorites " +
               "WHERE title = " + "'"+title+"';"

               
    var firstResponse = await connectionBuilder(dbconnection, sqlQuery1)

    
        if(firstResponse.data.length > 0){
       

            res.send({status:150})

        }else {
           

            sqlQuery2 = 
                "INSERT " +
                "INTO favorites " +
                "(title, imgUrl, userId) " +
                "VALUES ('"+title+"', '"+urlLink+"', '"+userId+"' ) ;"
    
    
            var response = await connectionBuilder(dbconnection, sqlQuery2)
      
            if(response.status == 200 ){
           
            res.send({status:200})
            }else{
            
            res.send({status:500})
                }

            }

        });


router.post("/getFavoritos", async function(request, res) {
    const userId = request.body.userId;
            
            sqlQuery = 
                        "SELECT * " +
                        "FROM favorites " +
                        "WHERE userId = " + "'" +userId+ "';"
                        
            
            
            var response = await connectionBuilder(dbconnection, sqlQuery)
              
                if(response.status == 200 ){
                
                   res.send(response.data)
                }else{
                  
                  res.send({status:500})
                    }
                });


    router.post("/isUserAuth", verifyJWT, (req, res) => {
        
       
        res.send({auth:true});
    });
    
 
 module.exports = router
 