const app = require('~/app')
const { sequelize } = require('~/models')
require('dotenv/config')
;(async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
})()
