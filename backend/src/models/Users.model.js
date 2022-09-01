const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const adminSchema = mongoose.Schema({
    id:{type:String, required:true},
    uuid:{type:String, required:true},
    name:{type:String, required:true},
    mobile: {
        type: Number
      },
    role:{type:String, required:true, default: "member"},
    status:{type:String, required:true,default: "active"},
    lastname:{type:String, required:true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String, required:true ,  minlength: 8,}
},{
   versionKey:false,
   timestamps:true,
});
adminSchema.path('mobile').validate(function validatePhone() {
    return ( this.mobile > 999999999 );
  });

adminSchema.methods.check=function(password){
    return bcrypt.compareSync(password,this.password)
}
adminSchema.pre("save",function(next){
    if(!this.isModified("password"))return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
})

module.exports =mongoose.model('admins', adminSchema)