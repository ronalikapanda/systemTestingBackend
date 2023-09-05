// import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import passport from 'passport';

import bcrypt from 'bcryptjs';
import Customer from '../models/Customer';


// Local strategy for customer login

export const passportLocalStrategy = (passport: any) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email: string, password: string, done: any) => {
        try {
            const customer = await Customer.findOne({ where: { email } });
            // console.log("customer",customer?.password);

            if (!customer) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            const isPasswordValid = await bcrypt.compare(password, customer.password);

            if (!isPasswordValid) {
                console.log("invalid");

                return done(null, false, { message: 'Invalid email or password' });
            }
            // console.log("customer",customer);
            return done(null, customer);
        } catch (error) {
            return done(error);
        }
    }
    ));

}

// JWT strategy for authentication
export const JwtAuthenticate = (passport: any) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
    };
    passport.use(new JwtStrategy(jwtOptions, async (payload: any, done: any) => {
        try {
            const customer = await Customer.findOne({ where: { id: payload.id } });
            if (customer) {
                return done(null, customer);
            } else {
                // console.log("failed hello");
                return done(null, false);
            }
        } catch (error) {
            return done(error);
        }
    }));

}

// Serialize and deserialize customer data for sessions
/* passport.serializeUser((customer: Customer, done: any) => {
    done(null, customer.id);
});

passport.deserializeUser(async (id: number, done: any) => {
    try {
        const customer = await Customer.findByPk(id);
        done(null, customer);
    } catch (error) {
        done(error);
    }
}); */
