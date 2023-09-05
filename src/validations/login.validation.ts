export default {
    email:{
        isEmail: {
            errorMessage: 'Invalid email address.',
        },
        notEmpty: {
            errorMessage: "Enter your email address"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"Enter your login password"
        },
        isLength:{
            options: { min: 8 },
            errorMessage: 'enter correct password'
        }
    }
}