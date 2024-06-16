import express from 'express';
import User from '../Database/models/userModel.js';
import Group from '../Database/models/groupModel.js';

const router = express.Router();

router.post('/student', async (req, res) => {
    try {
      const { name, rollNumber, internship, Sclass,Year } = req.body;
      const newUser = new User({ name, rollNumber, internship, Sclass , Year });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.post('/group', async (req, res) => {
    try {
      const { title, userId } = req.body;
      const newGroup = new Group({ title, users: [userId] });
      await newGroup.save();
      const user = await User.findById(userId);
      user.group = newGroup;
      await user.save();
      res.status(201).json(newGroup);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.post('/group/join/:id', async (req, res) => {
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
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  export default router;