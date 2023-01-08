
const mysql = require('mysql');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
});



exports.login = async (req, res) => {

    try{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).render("login",{message: 'You need email and password'})
        }


    db.query('SELECT * FROM users WHERE email = ?',[email], async (error, results) => {

         if(!results[0] || !(await bcrypt.compare(password, results[0].password)))
            res.status(401).render("login",{message: 'The email or password is incorrect'
        })
        else{
            const id = results[0].id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_COOKIE_EXPIRES_IN
            });

            const cookieOptions = {
                expires: new Date(
                    Date.now() + 60* 24 * 60 * 60 * 1000
                ),
                httpOnly: true,

            }
            res.cookie('jwt', token, cookieOptions);
            res.status(200).redirect('/');
        }
        
    })
    
 
    }catch(error){
        console.log(error);
    }

}

exports.signup = (req, res) => {
    
    
    
const {name, email, password, password2} = req.body;
db.query('SELECT email FROM users where email=?',[email],async (error, results,field) => {
   
    if(error){
        return error
    }
   if (results.length>0 ){
    return res.render("signup", {
        message : "Email already exists"
    })
       }
       
       
       else if (password !== password2) {
   
           return res.render("signup", {
               message : "The password is not the same"
           });
       }
       else{
   
           let pass = await bcrypt.hash(password, 10);
       
           db.query('INSERT INTO users SET ?',{ name: name, email: email, password: pass},(error,results)=>{
           if(error){
               console.log(error);
           }else{
               return res.render("about us");
       
               }
           })
       }
    
    
        

    
   



})

    


}




