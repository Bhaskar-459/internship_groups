import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    internship: String,
    Sclass: String,
    Year: String,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  }, { timestamps: true });
  
  const User = mongoose.model('User', UserSchema);

export default User;