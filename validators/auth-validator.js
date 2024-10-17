const {z} = require("zod");

const customerSignupSchema = z.object({
    domain_url: z
        .string({required_error: "Domain URL is required"})
        .trim()
        .min(1, {message: "Domain URL is required"}),
    mobile_no: z
        .string({required_error: "Mobile number is required"})
        .trim()
        .length(10, {message: "Mobile number must be of 10 characters"})
        .regex(/^\d{10}$/, { message: "Mobile number must contain only digits" }),
});

const googleAuthSchema = z.object({
    domain_url: z
        .string({required_error: "Domain URL is required"})
        .trim()
        .min(1, {message: "Domain URL is required"}),
    g_access_token: z
        .string({required_error: "Google access token is required"})
        .trim()
        .min(1, {message: "Google access token is required"}),
    g_id_token: z
        .string({required_error: "Google id token is required"})
        .trim()
        .min(1, {message: "Google id token is required"}),
});

const googleAuthWithDataSchema = z.object({
    domain_url: z
        .string({required_error: "Domain URL is required"})
        .trim()
        .min(1, {message: "Domain URL is required"}),
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Invalid email address"})
        .min(3, {message: "Email must be atleast 3 characters"})
        .max(255, {message: "Email must not be more than 255 characters"}),
    given_name: z
        .string({required_error: "Given name is required"})
        .trim()
        .min(1, {message: "Given name is required"}),
    family_name: z
        .string({required_error: "Family name is required"})
        .trim()
        .min(1, {message: "Family name is required"}),
});

const verifyOtpSchema = z.object({
    login_token: z
        .string({required_error: "Login token is required"})
        .trim()
        .min(1, {message: "Login token is required"}),
    otp: z
        .string({required_error: "OTP is required"})
        .trim()
        .length(6, {message: "Invalid OTP"}),  
});

const logoutAllDevicesSchema = z.object({
    token: z
        .string({required_error: "Token is required"})
        .trim()
        .min(1, {message: "Token is required"}),
});

module.exports = {customerSignupSchema, googleAuthSchema, googleAuthWithDataSchema, verifyOtpSchema, logoutAllDevicesSchema};