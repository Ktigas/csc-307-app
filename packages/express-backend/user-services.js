//user-services.js
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

  function getUsers(name, job) {
    const query = {};
    if (name) query.name = name;
    if (job) query.job = job;
  
    return userModel.find(query);
  }
  
  function findUserById(id) {
    return userModel.findById(id);
  }
  
  function addUser(user) {
    const newUser = new userModel(user);
    return newUser.save();
  }
  
  // Delete user by ID
  function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
  }
  
  // Find a user by both name and job
  function findUserByNameAndJob(name, job) {
    return userModel.findOne({ name, job });
  }
  
  export default {
    getUsers,
    findUserById,
    addUser,
    deleteUserById,
    findUserByNameAndJob,
  };