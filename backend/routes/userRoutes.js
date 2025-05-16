const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, getUserById } = require('../controllers/userController');
const router = express.Router()


router.post('/createUser', createUser)
router.get('/getUsers', getUsers)
router.put('/updateUser/:id', updateUser)
router.get('/getUserById/:id', getUserById)
router.delete('/deleteUser/:id', deleteUser)

module.exports = router;