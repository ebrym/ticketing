import mongoose from "mongoose";
import { Password } from "../services/password";
// check properties explicitly
interface IUserAtrributes {
    email: string;
    password: string;
}

// Describing the properties of the user model
interface UserModel extends mongoose.Model<userDocument> {
    build(attributes: IUserAtrributes): userDocument ;
}

// describes the properties of a user document
interface userDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done){
    if (this.isModified('password')){
        const hashedPassword = await Password.toHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    done();
});

userSchema.statics.build  = (attributes: IUserAtrributes) => {
    return new User(attributes);
};
const User = mongoose.model<userDocument, UserModel>('User', userSchema);




export { User };