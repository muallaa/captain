export default () => ({

    jwt: {
        secret: process.env.SECRET,
        access_token_expires_in: '60m',
        refresh_token_expires_in: '7d',
    },
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        base: process.env.DB_DATABSE
    },

    smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM,
  },
})