import Customer from "../models/Customer";

export default {
    first_name: {
        notEmpty: {
            errorMessage: "Enter your name"
        }
    },
    mobile: {
        
        custom: {
            options: async (value: any, { req }: any) => {
                const existingUser = await Customer.findOne({ where: { mobile: value }, attributes: ['mobile'] });
                if (existingUser) {
                    throw new Error('mobile number should be unique');
                }
                return true;
            },
            errorMessage: "Contact number already use in another customer"
        },
        isLength: {
            options: { min: 10, max: 15 },
            errorMessage: 'Mobile number not correct'
        },
        notEmpty: {
            errorMessage: "Enter your mobile number"
        },
    },
    email: {
        custom: {
            options: async (value: any, data: any) => {
                const existingUser = await Customer.findOne({ where: { email: value }, attributes: ['email'] });
                if (existingUser) {
                    throw new Error('email should be unique');
                }
                return false;
            },
            errorMessage: "Already exist this email address"
        },
        isEmail: {
            errorMessage: 'Invalid email address.',
        },
        notEmpty: {
            errorMessage: "Enter your user email address"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Enter your login password registration"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'enter correct password'
        }
    },
}