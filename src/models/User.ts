import IUser from '../interfaces/models/user'
import mongoose from '../providers/Database'

/**
 * Create the User model schema & register custom methods
 */

export interface IUserModel extends IUser, mongoose.Document {}

// Define the User Schema
export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<IUserModel>('User', UserSchema)

export default User
