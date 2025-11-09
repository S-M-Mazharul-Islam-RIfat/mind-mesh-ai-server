import bcrypt from 'bcrypt';
import { model, Schema } from "mongoose";
import { TUser, UserModelType } from "./user.interface";
import config from '../../config';

const userSchema = new Schema<TUser, UserModelType>({
   fullName: {
      type: String,
      required: true
   },
   userName: {
      type: String,
      required: true,
      unique: true
   },
   email: {
      type: String,
      require: true
   },
   password: {
      type: String,
      required: true,
      select: 0
   },
   passwordChangedAt: {
      type: Date,
      default: Date.now()
   },
   role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: "user",
   },
   status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
   },
   memberSince: {
      type: String
   },
   isDeleted: {
      type: Boolean,
      default: false
   }
}, {
   timestamps: true
});

userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
   const user = this;
   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
   )
   next();
});

userSchema.post('save', function (doc, next) {
   doc.password = '';
   next();
})

userSchema.statics.isUserExistsByEmail = async function (email: string) {
   return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
   return await bcrypt.compare(plainTextPassword, hashedPassword);
}


export const UserModel = model<TUser, UserModelType>('User', userSchema);