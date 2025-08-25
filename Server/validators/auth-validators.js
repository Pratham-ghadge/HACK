import { z } from 'zod';

const signupSchema = z.object({
    username : z
    .string({ required_error : "Name is required"})
    .trim()
    .min(6,{message:"Name must be at lest of 6 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),

    email : z
    .string({ required_error : "email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(6,{message:"email must be at lest of 6 characters"})
    .max(255,{message:"email must not be more than 255 characters"}),

   phone : z
    .string({ required_error : "Name is required"})
    .trim()
    .min(10,{message:"Phone Number must be at lest of 10 characters"})
    .max(20,{message:"Phone Number must not be more than 20 characters"}),

    password : z
    .string({ required_error : "Password is required"})
    .trim()
    .min(6,{message:"Password must be at lest of 6 characters"})
    .max(14,{message:"password must not be more than 14 characters"}),

});

export default signupSchema;