const User = require('../models/userModel')

const createUser = async (req, res) => {
    const {name, email, phoneNo, message} = req.body
    try {

        const newUser = User({
            name, email, phoneNo, message
        })

        await newUser.save();
        res.status(200).json({status : 'success', msg : `User Created Successfully`, newUser});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({errors :`Error Creating User`, error})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({status:1, message:`Users Found`, userslist:users})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({errors :`Error fetching User`, error})
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById({_id : userId}) 
        if(!user) {
            return res.status(404).json({msg : `User Not Found`})
        }
        const newData = req.body;
        const updatedData = await User.findByIdAndUpdate({_id : userId}, newData)
        if(!updatedData) {
            return res.status(404).json({msg : `Data not updated`})
        }
        res.status(200).json({status:1, msg : `Data Updated Successfully`, updatedData})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({errors :`Error Updating User`, error})
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({_id : id})
        if(!user) {
            return res.status(200).json({msg: `User not Found`})
        }
        res.status(200).json({status : 1, msg:`User Found`, user : user});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({errors :`Error finding User`, error})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await User.findByIdAndDelete({_id : id})
        if(!deletedUser) {
            return res.status(404).json({msg : `User Not Found`})
        }

        res.status(200).json({msg : `User Deleted Successfully`, deletedUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({errors :`Error Deleting User`, error})
    }
}

module.exports = {createUser, getUsers, updateUser, getUserById, deleteUser}