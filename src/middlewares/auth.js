
class Auth {
    async isAdmin(req, res, next) {
        try {
            if (req.session.user.isAdmin == undefined || req.session.user.isAdmin == false) {
                console.log('no es admin');
                return res.redirect('/auth/profile')
            }
            console.log('sos adm');
            return next()
        } catch (e) {
            console.log(e);
            return res.redirect('/auth/login')
        }
    }
    async connectionCheck(req, res, next) {
        try {
            let email = req.session.user.email;
            if (email == undefined || email == false) {
                console.log('no estás logeado');
                return res.redirect('/auth/register')
            }
            console.log('estas log');
            return next()
        } catch (e) {
            //console.log(e);
            console.log('no hay user en la session');
            return res.redirect('/auth/register')
        }
    }

    async currentSession(req, res, next) {
        if (req.session.user) {
            console.log('ya estas logeado');
            return res.redirect('/products')
        }
        console.log('podes loguearte/registrarte');
        return next()

    }
}


module.exports = Auth;