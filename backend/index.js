import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error.message));

// Define schemas and models
const GroupSchema = new mongoose.Schema({
  title: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const Group = mongoose.model('Group', GroupSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  internship: String,
  Sclass: String,
  Year: String,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


// Middleware
app.use(cors());

// Routes
app.post('/student', async (req, res) => {
  try {
    const { name, rollNumber, internship, Sclass,Year } = req.body;
    const newUser = new User({ name, rollNumber, internship, Sclass , Year });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.post('/group', async (req, res) => {
  try {
    const { title, userId } = req.body;
    const newGroup = new Group({ title, users: [userId] });
    await newGroup.save();
    const user = await User.findById(userId);
    user.group = newGroup;
    await user.save();
    res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
});

app.post('/group/join/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const group = await Group.findById(id);
    const user = await User.findById(userId);
    user.group = group;
    await user.save();
    group.users.push(user);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
});

app.get('/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

app.get('/group/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id).populate('users');
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
});

app.get('/groups', async (req, res) => {
  try {
    const groups = await Group.find().populate('users');
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
