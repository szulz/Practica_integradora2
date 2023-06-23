
class Auth {
    async isAdmin(req, res, next) {
        if (req.session.isAdmin == undefined || req.session.isAdmin == false) {
            console.log('no es admin');
            return res.redirect('/auth/profile')
        }
        console.log('sos adm');
        return next()
    }
    async connectionCheck(req, res, next) {
        if (req.session.user.email == undefined || req.session.user.email == false) {
            console.log('no estás logeado');
            return res.redirect('/auth/register')
        }
        console.log('estas log');
        return next()
    }
}


module.exports = Auth;