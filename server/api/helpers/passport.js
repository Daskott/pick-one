const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require(`${__dirname}/../../../database/models`);
const User = models.User;

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local', 
    new LocalStrategy( {usernameField: 'email'}, (email, password, done) => {
        
        User.findOne({ where: {email} })
        .then((user) => {
            if (!user){
                return done(null, false, { message: 'Your username or password is incorrect.'});
            }

            //compare password to hash password in db
            bcrypt.compare(password, user.password, (error, valid) => {
                if (error || !valid) {
                    return done(null, false, { message: 'Your username or password is incorrect.'});
                }
                return done(null, user);
            });
        })
    })
);

module.exports = passport;