// isStudent.js
module.exports = async function (req, res, proceed) {
    if(req.session.user == undefined){
        return res.redirect("/user/login");
    }
    if (req.session.user.role == 'student') {
        return proceed();   //proceed to the next policy,
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.redirect("/user/login");
};