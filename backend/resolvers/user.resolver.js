import { users } from '../data/data.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const userResolver = {
    Mutation: {
        singUp: async (_, { input }, context) => {
            try {
                const { useranme, name, password, gender } = input

                if (!useranme, !name, !password, !gender) {
                    throw new Error('All fields are required')
                }
                const existingUser = await User.findOne({ username })
                if (existingUser) {
                    throw new Error("User already exist")
                }

                const salt = await bcrypt.genSalt(10)
                const hashedPass = await bcrypt.hash(password, salt)

                const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashedPass,
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
        login: async (_, {input}, context) => {
            try {
                const { username, password } = input
                const { user } = await context.authenticate("graphql-local", { username, password })
                await context.login(user)
                return user
            } catch (error) {
                console.error("Error in Login: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        },
        logout: async (_, __,context) => {
            try {
                await context.logout();
                req.session.destroy((err) => {
                    if (err) throw err
                })

                res.clearCookie("connect.sid");
                return { message: "Logged Out Successfully" }

            } catch (error) {
                console.error("Error in logout: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },
    Query: {
        authUser: async (_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
                console.error("Error in authUser: ", error)
            } catch (error) {
                throw new Error(error.message || "Internal Server Error")
            }
        },

        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId)
                return user;
            } catch (error) {
                console.error("Error in user query: ", error)
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },
    Mutation: {}
};


export default userResolver