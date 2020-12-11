const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const query = require("./query");

const helpers = require("./helpers");
const {} = require("./helpers");

passport.use(
    "local.signin",
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    async(req, username, password, done) => {
        try {
            const q = {
                text: 'SELECT * FROM users WHERE username = $1',
                values: [username]
            }

            const result = await query(q);
 
            if (result.rows.length > 0) {

                const user = result.rows[0];

                const validPassword = await helpers.mathPassword(password, user.password);
         
                if (validPassword) {
                    done(null, user, req.flash('success', `Bienvenido ${user.username}`));
                } else {
                    done(null, false, req.flash('message', 'Contraseña Incorrecta'));
                }
            } else {
                return done(null, false, req.flash('message', 'El nombre de  usuario ingresado no existe'));
            }
        } catch (error) {
            
        }
    })
)

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      const newUser = {
        username,
        password,
        fullname: fullname,
      };

      try {
        newUser.password = await helpers.encrypPassword(password);

        const q = {
          text:
            "INSERT INTO users(username, password, fullname) VALUES($1, $2, $3) RETURNING id, username, fullname",
          values: [newUser.username, newUser.password, newUser.fullname],
        };
        const result = await query(q);
        newUser.id = result.rows[0].id;
        done (null, newUser)
      } catch (error) {
          done(error);
      }
    }
  )
);

passport.serializeUser((usr, done) => {
    done(null, usr.id);
})

passport.deserializeUser(async (id, done) => {
    const q = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id]
    }

    const result = await query(q);
    done(null, result.rows[0])
})

module.exports = passport;
