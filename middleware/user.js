const User = require('../models/user');

// function isGetToken(token){
//     if(token === ''){
//         return -1;
//     }
//     return token;
// }
function isGetToken(str){
    return (str || !(0 === str.length));
}

module.exports = async function(req, res, next){
    if(!req.session.user){
        return next();
    }
    req.user = await User.findById(req.session.user._id);
    res.locals.isToken = isGetToken(req.user.groupToken);
    next();
}