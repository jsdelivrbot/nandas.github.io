/**
 * Created by nandakumar on 5/24/17.
 */
var mongoose=require('mongoose');
var bcrypt=require("bcryptjs");
//mongoose.connect('mongodb://localhost/nodeauth');
mongoose.connect('mongodb://nanda:password@ds151941.mlab.com:51941/rentalmontitor');

var db=mongoose.connection;

var userSchema=mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    profileImage:{
        type:String
    }
});

var User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
}


module.exports.createUser=function(newUser,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}