import { users } from '../data/data.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const userResolver = {
    Mutation: {
        singUp: async(_, { input }, context) => {
            try {
                const {useranme, name, password, gender} = input

                if(!useranme, !name, !password, !gender) {
                    throw new Error('All fields are required')
                }
                const existingUser = await User.findOne( {username} )
                if(existingUser) {
                    throw new Error("User already exist")
                }

                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(password, salt)

                const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password:hashedPass,
                    gender,
                    profilePicture: gender === "male" ? maleProfile : femaleProfile
                })

                await newUser.save();
                await context.login(newUser)
                return newUser;
            } catch (error) {
                console.error("Error in signUp: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        logIn: async(_, input, context) => {
            try {
                const { username, password} = input
                const { user } = await context.authenticate("graphql-local", {username, password})
                await context.login(user)
                return user
            } catch (error) {
                console.error("Error in Login: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },
    Query: {
        users: () => {
            return users
        },

        user: (_, { userId }) => {
            return users.find((user) => user._id === userId)
        }
    },
    Mutation: {}
};


export default userResolver