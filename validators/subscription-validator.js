const { z } = require("zod");

const initSubscriptionSchema = z.object({
    subscription_id: z
        .string({required_error: "Subscription id is required"})
        .trim()
        .min(1, {message: "Subscription id is required"}),
    return_url: z
        .string({required_error: "Response return url is required"})
        .trim()
        .min(1, {message: "Response return url is required"})
});

const getSubscriptionTxnSchema = z.object({
    transaction_id: z
        .string({required_error: "Transaction id is required"})
        .trim()
        .min(1, {message: "Transaction id is required"})
});

const completSubscriptionTxnSchema = z.object({
    txnid: z
        .string({required_error: "Transaction id is required"})
        .trim()
        .min(1, {message: "Transaction id is required"})
});
module.exports = {initSubscriptionSchema, getSubscriptionTxnSchema, completSubscriptionTxnSchema};