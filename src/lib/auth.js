module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/signin');
        }
    },

    isNotLoggedIn: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/profile');
        }
    },

    isAdmin: (req, res, next) => {
        if (!req.user.admin) {
            req.flash('message', 'Necesitas permisos de administrador');
            res.redirect('/pqrs');
        } else {
            next();
        }
    }
};