const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const expHbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const addRoutes = require('./routes/add');
const getListRoutes = require('./routes/getList');
const userListsRoutes = require('./routes/userLists');
const messageRoutes = require('./routes/writeMessage');
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user');
const errorHandler = require('./middleware/error');
const keys = require('./keys');

const PORT = process.env.PORT || 3000;

const app = express();

//подключение hbs, его регистрация в приложении и использование, а также указываем папку, где будем хранить hbs файлы
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI,
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

//регистрируем папку как публичную
app.use(express.static(path.join(__dirname,'scripts')));
app.use(express.static(path.join(__dirname,'styles')));
app.use(express.static(path.join(__dirname,'images')));
app.use(express.urlencoded({
    extended: true,
}));

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
}));


app.use(csrf());
app.use(flash());
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);


//регистрация роутов
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/about', aboutRoutes);
app.use('/getList', getListRoutes);
app.use('/userLists', userListsRoutes);
app.use('/writeMessage', messageRoutes);
app.use('/auth', authRoutes);


app.use(errorHandler);


async function start(){
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();