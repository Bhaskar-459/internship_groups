import express from 'express';
import User from '../Database/models/userModel.js';
import Group from '../Database/models/groupModel.js';

const router = express.Router();

router.delete('/group/leave/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const group = await
        Group.findByIdAndUpdate(id, {
            $pull: { users: userId }
        }, { new: true });
    const user = await User.findById(userId);
    user.group = null;
    await user.save();
   if (group.users.length === 0) {
        await Group.findByIdAndDelete(id);
    }

    res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
    }
);

export default router;
