import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Customer from "../models/Customer";
import passport from "passport";
import jwt from "jsonwebtoken";
import { query, validationResult } from "express-validator";
import UserProfileResource from "../resources/UserProfileResource";
import { Op, Transaction } from "sequelize";
import connection from "../models/Index";
export class CustomerAuthController {
  public static JWT_SECRET: string = "" + process.env.JWT_SECRET_KEY;

  /**
   * login
   */
  public static login(req: Request, res: any, next: any) {
    let jwt_secret: string = "" + process.env.JWT_SECRET_KEY;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.validationError(errors.array());
    }

    passport.authenticate("local", { session: false }, (err: any, user: any) => {
      if (err || !user) {
        console.log("err", err);
        return res.errorResponse("invalided credential", 403);
      }
      req.login(user, { session: false }, async (err: any) => {
        if (err) {
          throw err;
        }
        const access_token = jwt.sign({ id: user.id }, jwt_secret, {
          expiresIn: "1h",
        });
        const refresh_token = jwt.sign({ id: user.id }, jwt_secret, {
          expiresIn: "7d",
        });
        return res.successResponse({
          data: UserProfileResource(user),
          token: {
            access_token,
            refresh_token
          },
        });
      });
    }
    )(req, res, next);
  }

  /**
   * registers
   */
  public static async registers(req: Request, res: any) {
    let jwt_secret: string = "" + process.env.JWT_SECRET_KEY;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.validationError(errors.array());
    }

    try {
      const { country_code, mobile, email, password } = req.body;
      let request = req.body;
      // Hash the password
      let fin_mobile = country_code ? country_code + mobile : mobile;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newCustomer = await Customer.create({
        first_name: request.first_name,
        last_name: request.last_name,
        email: request.email,
        mobile: fin_mobile,
        password: hashedPassword,

      });

      const access_token = await jwt.sign({ id: newCustomer.id }, jwt_secret, {
        expiresIn: "1h",
      });
      const refresh_token = await jwt.sign({ id: newCustomer.id }, jwt_secret, {
        expiresIn: "7d",
      });
      return res.successResponse({
        data: UserProfileResource(newCustomer),
        token: {
          access_token,
          refresh_token
        },
      });

    } catch (error) {
      console.error(error);
      throw error
    }

    // res.json({ 'success': true, 'status': 'success', message: 'Register' });
  }



  public static async refreshToken(req: Request, res: any) {
    try {
      let request = req.body;
      let jwt_secret: string = "" + process.env.JWT_SECRET_KEY;
      let verify = await jwt.verify(request.refresh_token, jwt_secret);
      if (verify) {
        let jwtData: any = jwt.decode(request.refresh_token)

        const access_token = jwt.sign({ id: jwtData.id }, jwt_secret, {
          expiresIn: "1h",
        });
        const refresh_token = jwt.sign({ id: jwtData.id }, jwt_secret, {
          expiresIn: "7d",
        });

        return res.successResponse({ access_token, refresh_token }, "Token generated successfully")
      } else {
        return res.errorResponse('invalided refresh token', 403)
      }

      // res.json({ 'success': true, 'status': 'success', message: req.user });
    } catch (error) {
      return res.errorResponse()
    }
  }



  /*----------------------------------------------------------------------------- 
                        Authorize Route Function
  -----------------------------------------------------------------------------*/
  public static async profileDetails(req: Request, res: any) {
    try {
      // res.json({ 'success': true, 'status': 'success', message: req.user });
      res.successResponse({ data: UserProfileResource(req.user) });
    } catch (error) {
      throw error;
    }
  }

  public static async logout(req: Request, res: any) {
    return res.successResponse({}, "Logout successfully");
    // req.logout()
  }
}
