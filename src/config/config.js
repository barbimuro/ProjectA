import {config} from 'dotenv'

config();

export default {
    app:{
        PORT: process.env.PORT||8080,
    },
    mongo:{
        URL:process.env.MONGO_URL,
    },
    auth:{
        jwt:{
            COOKIE: process.env.JWT_COOKIE,
            SECRET: process.env.JWT_SECRET
        },
        github:{
            CLIENT_ID: process.env.GITHUB_CLIENT_ID,
            CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
        }
    }
}