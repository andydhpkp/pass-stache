const session = require('express-session')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: 'This is a secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./controllers'))

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`))
}) 

