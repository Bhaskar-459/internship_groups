import express from 'express';
import User from '../Database/models/userModel.js';
import Group from '../Database/models/groupModel.js';

const router = express.Router();

router.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find().populate('users');
      res.status(200).json(groups);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.get('/group/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const group = await Group.findById(id).populate('users');
      res.status(200).json(group);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.get('/student/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  router.get('/students', async (req, res) => {
    try {
      const users = await User.find().sort({ rollNumber: 1 });
      if (!users) {
        res.status(404).json({ message: 'No students found' });
        return;
      }
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

    export default router;