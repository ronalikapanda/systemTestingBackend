import express, { Express, Request, Response } from 'express';
import database from './models/Index'
import {customerRoutes,customerAuthProtectedRoute} from './routes/customerRoutes'
import {  customResponseHandler, notFound, routeErrors } from './handlers/errorHandlers';
import passport from 'passport';
import { JwtAuthenticate, passportLocalStrategy } from './config/passportConfig';
import cros from 'cors'
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cros())
passportLocalStrategy(passport)
JwtAuthenticate(passport)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customResponseHandler)

app.use('/customer', customerRoutes)
app.use('/customer', customerAuthProtectedRoute)

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    success: true,
    message: 'APi Working'
  });
})
app.use(routeErrors);
app.use(notFound)

const start = async (): Promise<void> => {
  try {
    await database.sync({force: false});
    app.listen(port, () => {
      console.log("Server started on port " + port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();