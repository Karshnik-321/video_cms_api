const { z } = require("zod")

const domainSchema = z.object({
    domain_url: z
        .string({required_error: "Domain URL is required"})
        .trim()
        .min(1, {message: "Domain URL is required"}),
});

const profileUpdateSchema = z.object({
    first_name: z.
        string({required_error: "First name is required"})
        .trim()
        .min(1, {message: "First name is required"})
        .max(255, {message: "First name must not be more than 255 characters"})
        .optional(),
    last_name: z.
        string({required_error: "Last name is required"})
        .trim()
        .min(1, {message: "Last name is required"})
        .max(255, {message: "Last name must not be more than 255 characters"})
        .optional(),
    date_of_birth: z
        .coerce.date({errorMap: (issue, ctx) => ({ message: 'Not a valid date format. Required in YYYY-MM-DD' })})
        .optional()
        .or(z.literal('')),
    gender: z
        .enum(["", "male", "female"], {errorMap: (issue, ctx) => ({ message: 'Gender only accepts male or female' })})
        .optional()
});

const profileeSchema = z.object({
    first_name: z.
        string({required_error: "First name is required"})
        .trim()
        .min(1, {message: "First name is required"})
        .max(255, {message: "First name must not be more than 255 characters"})
        .optional(),
    last_name: z.
        string({required_error: "Last name is required"})
        .trim()
        .min(1, {message: "Last name is required"})
        .max(255, {message: "Last name must not be more than 255 characters"})
        .optional(),
    date_of_birth: z
        .coerce.date({errorMap: (issue, ctx) => ({ message: 'Not a valid date format. Required in YYYY-MM-DD' })})
        .optional()
        .or(z.literal('')),
    gender: z
        .enum(["", "male", "female"], {errorMap: (issue, ctx) => ({ message: 'Gender only accepts male or female' })})
        .optional(),
});

const mobileUpdateSchema = z.object({
    mobile_no: z
        .string({required_error: "Mobile number is required"})
        .trim()
        .length(10, {message: "Mobile number must be of 10 characters"})
        .regex(/^\d{10}$/, { message: "Mobile number must contain only digits" }),
});

const verifyOtpSchema = z.object({
    otp: z
        .string({required_error: "OTP is required"})
        .trim()
        .length(6, {message: "Invalid OTP"}),  
});

const googleSchema = z.object({
    g_access_token: z
        .string({required_error: "Google access token is required"})
        .trim()
        .min(1, {message: "Google access token is required"}),
});
  
const personalizationCategorySchema = domainSchema.extend({
    category_ids: z
        .string({required_error: "Category ids is required", invalid_type_error: "Category ids must be an array of strings",})
        .array()
        .nonempty({ message: "Category ids cannot be empty. Please provide at least one id." })
});



module.exports = {profileUpdateSchema, profileeSchema, mobileUpdateSchema, verifyOtpSchema, googleSchema, domainSchema, personalizationCategorySchema}