const User = require('../models/user');

module.exports = (req, res, next) => {
    const email = req.body.email;
    let code;
    let newMail = "";
    let arobase = false;
    for (let i = 0, size = email.length; i < size; i++) {
        if (email[i] === "@") {
            arobase = true;
            newMail += "@";
            continue;
        }
        if (arobase && email[i] === ".") {
            newMail += email.slice(i);
            break;
        }
        code = email.charCodeAt(i) + 9;
        newMail += String.fromCharCode(code);
    }
    req.body.email = newMail;
    next();
}
   