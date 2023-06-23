
class Auth {
    async isAdmin(req, res, next) {
        if (req.session.isAdmin == undefined || req.session.isAdmin == false) {
            console.log('no es admin');
            return res.redirect('/auth/login')
        }
        return next()
    }
    async connectionCheck(req, res, next) {
        if (!req.session.email) {
            console.log('no estás logeado');
            return res.redirect('/auth/register')
        }
        return next()
    }
}


module.exports = Auth;