const express          = require('express'),
    passport         = require('passport'),
    session          = require('express-session'),
    cookieParser     = require('cookie-parser'),
    morgan           = require('morgan');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// const User = require('./models/user');

const authApi = require('./config/keys');

const app = express();
const port = process.env.PORT|| 5000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', authRouter);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//passport set up
app.use(session({
    secret: authApi.cookieSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    let error = new Error('Not Found!');
    error.status = 404;
    next();
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    })
});

app.listen(port, () => console.log(`Server started on port: ${port}`));


//Sign in with Google
// svg
// <svg class="svgIcon-use" width="25" height="25"><g fill="none" fill-rule="evenodd"><path d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z" fill="#4285F4"></path><path d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z" fill="#34A853"></path><path d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z" fill="#FBBC05"></path><path d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z" fill="#EA4335"></path></g></svg>

//Sign in with Facebook
// svg
// <svg class="svgIcon-use" width="25" height="25"><path d="M20.292 4H4.709A.709.709 0 0 0 4 4.708v15.584c0 .391.317.708.709.708h8.323v-6.375h-2.125v-2.656h2.125V9.844c0-2.196 1.39-3.276 3.348-3.276.938 0 1.745.07 1.98.1v2.295h-1.358c-1.066 0-1.314.507-1.314 1.25v1.756h2.656l-.531 2.656h-2.125L15.73 21h4.562a.708.708 0 0 0 .708-.708V4.708A.708.708 0 0 0 20.292 4" fill-rule="evenodd"></path></svg>

//Sign in with Twitter
// svg
// <svg class="svgIcon-use" width="25" height="25"><path d="M21.725 5.338c-.744.47-1.605.804-2.513 1.006a3.978 3.978 0 0 0-2.942-1.293c-2.22 0-4.02 1.81-4.02 4.02 0 .32.034.63.07.94-3.31-.18-6.27-1.78-8.255-4.23a4.544 4.544 0 0 0-.574 2.01c.04 1.43.74 2.66 1.8 3.38-.63-.01-1.25-.19-1.79-.5v.08c0 1.93 1.38 3.56 3.23 3.95-.34.07-.7.12-1.07.14-.25-.02-.5-.04-.72-.07.49 1.58 1.97 2.74 3.74 2.8a8.49 8.49 0 0 1-5.02 1.72c-.3-.03-.62-.04-.93-.07A11.447 11.447 0 0 0 8.88 21c7.386 0 11.43-6.13 11.414-11.414.015-.21.01-.38 0-.578a7.604 7.604 0 0 0 2.01-2.08 7.27 7.27 0 0 1-2.297.645 3.856 3.856 0 0 0 1.72-2.23"></path></svg>

//Sign in with email
// svg
//<svg class="svgIcon-use" width="25" height="25"><path d="M4 6v13h17V6H4zm5.906 7.968l2.594 2.124 2.594-2.124 4.146 4.02H5.76l4.146-4.02zm-4.888 3.326V9.966l4.097 3.354-4.097 3.974zm10.867-3.974l4.097-3.354v7.328l-4.097-3.974zm4.097-6.308v1.643L12.5 14.78 5.018 8.655V7.012h14.964z"></path></svg>