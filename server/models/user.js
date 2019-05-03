const mongoose = require('mongoose'),
    { Schema } = mongoose,
    bcrypt = require('bcrypt'),
    passportLocalMongoose = require('passport-local-mongoose');

//db
const url = process.env.DATABASEURL || 'mongodb://localhost/emaily-dev';
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(url)
    .then(() =>  console.log('connection successful'))
    .catch((err) => console.error(err));

const UserSchema = new Schema({
    local: {
        username: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9));
UserSchema.methods.validPassword = password => bcrypt.compareSync(password, this.local.password);
// UserSchema.statics.findOrCreate = require('find-or-create');

module.exports = mongoose.model('User', UserSchema);

