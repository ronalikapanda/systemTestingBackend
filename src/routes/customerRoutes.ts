import express, { Request, Response, Router } from 'express';
import { CustomerAuthController } from '../controllers/CustomerAuthController';
import { checkSchema } from 'express-validator';
import loginValidation from '../validations/login.validation';
import passport from 'passport';
import registrationValidation from '../validations/registration.validation';
import { TaskController } from '../controllers/TaskController';
const customerRoutes: Router = express.Router();
const customerAuthProtectedRoute: Router = express.Router();

customerRoutes.post('/login', checkSchema(loginValidation), CustomerAuthController.login);
customerRoutes.post('/registers', checkSchema(registrationValidation), CustomerAuthController.registers);
// customerAuthProtectedRoute.use()
customerAuthProtectedRoute.use(passport.authenticate('jwt', { session: false }))

customerAuthProtectedRoute.get('/profile', CustomerAuthController.profileDetails)
customerAuthProtectedRoute.post('/logout', CustomerAuthController.logout)

customerAuthProtectedRoute.get('/task/list', TaskController.index)
customerAuthProtectedRoute.post('/task/create', TaskController.addTask)
customerAuthProtectedRoute.post('/task/update/:task_id', TaskController.update)
customerAuthProtectedRoute.delete('/task/delete/:task_id', TaskController.deleteTask)



// Export the router instance
export { customerRoutes, customerAuthProtectedRoute };
