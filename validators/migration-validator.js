const {z} = require("zod");

const migrationTokenSchema = z.object({
    iup: z
        .string({required_error: "iup token is required"})
        .trim()
        .min(1, {message: "iup token is required"})
        .max(255, {message: "iup token must not be more than 255 characters"})
});

const migrationProfileSchema = z.object({
    iup: z
        .string({required_error: "iup token is required"})
        .trim()
        .min(1, {message: "iup token is required"})
        .max(255, {message: "iup token must not be more than 255 characters"}),
    mobile_no: z
        .string({required_error: "Mobile number is required"})
        .trim()
        .length(10, {message: "Mobile number must be of 10 characters"}),
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Invalid email address"})
        .min(3, {message: "Email must be atleast 3 characters"})
        .max(255, {message: "Email must not be more than 255 characters"})
});

module.exports = {migrationTokenSchema, migrationProfileSchema};