import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!){
        createTransaction(input: $input) {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`

export const UPDATE_TRANSACTION = gql`
    mutation updateTransaction($input: UpdateTransactionInput!){
        updateTransaction(input: $input) {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`

export const DELETE_TRANSACTION = gql`
    mutation deletedTransaction($transactionId: ID!) {
        deleteTransaction(transactionId: $transactionId){
            _id 
        }
    }
`