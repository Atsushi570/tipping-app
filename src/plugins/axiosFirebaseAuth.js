import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const identityToolKitUrl = 'https://identitytoolkit.googleapis.com/'
const secureTokenUrl = 'https://securetoken.googleapis.com/'

const signUp = axios.create({
  baseURL: `${identityToolKitUrl}v1/accounts:signUp?key=${process.env.API_KEY}`
})

const update = axios.create({
  baseURL: `${identityToolKitUrl}v1/accounts:update?key=${process.env.API_KEY}`
})

const signIn = axios.create({
  baseURL: `${identityToolKitUrl}v1/accounts:signInWithPassword?key=${process.env.API_KEY}`
})

const refresh = axios.create({
  baseURL: `${secureTokenUrl}v1/token?key=${process.env.API_KEY}`
})

export { signUp, update, signIn, refresh }
