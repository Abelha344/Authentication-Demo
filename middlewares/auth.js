//  const jwt = require("jsonwebtoken");

//  const validateToken= async(req,res,nex) => {
//  const token = req.cookies.token;
//  if(token){
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "user is not authosized" });
//       }  
//       req.userData = decoded;
     
     
//     });
//     next();
// } else {
//     return res.status(401).json({ message: "user is not authosized" });
// }

// };
//  module.exports = validateToken;  








const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "User is not authorized" }); 
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User is not authorized" }); 
    }

    req.userData = decoded;
    next(); 
  });
};

module.exports = validateToken;