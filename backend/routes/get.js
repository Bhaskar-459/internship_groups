import express from 'express';
import User from '../Database/models/userModel.js';
import Group from '../Database/models/groupModel.js';

const router = express.Router();

router.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find().populate('users');
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  });

  router.get('/group/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const group = await Group.findById(id).populate('users');
      res.status(200).json(group);
    } catch (error) {
      next(error);
    }
  });

  router.get('/student/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.get('/students', async (req, res) => {
    try {
      const users = await User.find().sort({ rollNumber: 1 });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

    export default router;