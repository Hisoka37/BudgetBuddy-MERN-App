import Transaction from '../models/transaction.model'
const transactionResolver = {
    Query: {
        transactions: async (_, _, context) => {
            try {
                if(!context.getUser()) throw new Error('Unauthorized')
                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ user: userId })
                return transactions
            } catch (error) {
                console.error("Error in transaction query: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        transaction: async(_, { transactionId },) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
                
            } catch (error) {
                console.error("Error in transaction query: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },
    Mutation: {}
};

export default transactionResolver