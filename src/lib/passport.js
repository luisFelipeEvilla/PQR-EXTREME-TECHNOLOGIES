const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const query = require("./query");

const helpers = require("./helpers");
const {} = require("./helpers");

passport.use(
    "local.signin",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    async(req, email, password, done) => {
        try {
            const q = {
                text: 'SELECT * FROM users WHERE email = $1',
                values: [email]
            }

            const result = await query(q);
 
            if (result.rows.length > 0) {

                const user = result.rows[0];

                const validPassword = await helpers.mathPassword(password, user.password);
         
                if (validPassword) {
                    done(null, user, req.flash('success', `Bienvenido ${user.fullname}`));
                } else {
                    done(null, false, req.flash('message', 'Contraseña Incorrecta'));
                }
            } else {
                done(null, false, req.flash('message', 'El nombre de  usuario ingresado no existe'));
            }
        } catch (error) {
            
        }
    })
)

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { fullname, phone } = req.body;

      const newUser = {
        password,
        fullname,
        email,
        phone
      };

      try {
        newUser.password = await helpers.encrypPassword(password);
        console.log(newUser.password);
        const q = {
          text:
            "INSERT INTO users(password, fullname, email, phone, admin) VALUES($1, $2, $3, $4, $5) RETURNING id, email fullname",
          values: [newUser.password, newUser.fullname, newUser.email, newUser.phone, true],
        };
        const result = await query(q);
        newUser.id = result.rows[0].id;
        newUser.admin = result.rows[0].admin;
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
