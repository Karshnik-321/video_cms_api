const {z} = require("zod");

const eventRegistrationSchema = z.object({
    event_type: z
        .string({required_error: "Event type is required"})
        .trim()
        .min(3, {message: "Event type is required"})
        .max(255, {message: "Event type must not be more than 255 characters"})
});

const agriSummitRegistrationSchema = z.object({
    name: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, {message: "Name is required"})
        .max(255, {message: "Name must not be more than 255 characters"}),
    phone: z
        .string({required_error: "Phone number is required"})
        .trim()
        .length(10, {message: "Phone number must be of 10 characters"})
        .regex(/^\d{10}$/, { message: "Mobile number must contain only digits" }),
    city: z
        .string({required_error: "City is required"})
        .trim()
        .min(3, {message: "City is required"})
        .max(255, {message: "City must not be more than 255 characters"}),
    occupation: z
        .string({required_error: "Occupation is required"})
        .trim()
        .min(3, {message: "Occupation is required"})
        .max(255, {message: "Occupation must not be more than 255 characters"}),
    company: z
        .string({required_error: "Company is required"})
        .trim()
        .min(3, {message: "Company is required"})
        .max(255, {message: "Company must not be more than 255 characters"}),
});

const IndendependenceDayRegistrationSchema = z.object({
    name: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, {message: "Name is required"})
        .max(255, {message: "Name must not be more than 255 characters"}),
    phone: z
        .string({required_error: "Phone number is required"})
        .trim()
        .length(10, {message: "Phone number must be of 10 characters"})
        .regex(/^\d{10}$/, { message: "Mobile number must contain only digits" }),
    city: z
        .string({required_error: "City is required"})
        .trim()
        .min(3, {message: "City is required"})
        .max(255, {message: "City must not be more than 255 characters"}),
    occupation: z
        .string({required_error: "Occupation is required"})
        .trim()
        .min(3, {message: "Occupation is required"})
        .max(255, {message: "Occupation must not be more than 255 characters"}),
    company: z
        .string({required_error: "Company is required"})
        .trim()
        .min(3, {message: "Company is required"})
        .max(255, {message: "Company must not be more than 255 characters"}),
});

const basicEventRegistrationSchema = z.object({
    name: z
        .string({required_error: "Name is required"})
        .trim()
        .min(3, {message: "Name is required"})
        .max(255, {message: "Name must not be more than 255 characters"}),
    email: z
        .string({required_error: "Email is required"})
        .trim()
        .email({message: "Invalid email address"})
        .min(3, {message: "Email must be atleast 3 characters"})
        .max(255, {message: "Email must not be more than 255 characters"}),
    phone: z
        .string({required_error: "Phone number is required"})
        .trim()
        .length(10, {message: "Phone number must be of 10 characters"})
        .regex(/^\d{10}$/, { message: "Mobile number must contain only digits" }),
});

module.exports = {eventRegistrationSchema, agriSummitRegistrationSchema, basicEventRegistrationSchema};