const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../app/models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({ where: { email: email } })
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
            return done(null, user, token);
        })
        .catch(error => {
            return done(error);
        });
}));
