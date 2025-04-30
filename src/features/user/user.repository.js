// This file contains the UserRepository class, which interacts with the database to perform user-related operations.
// It includes methods for creating a user and finding a user by email.
import mongoose from "mongoose";
import { ApplicationError } from "../../middlewares/error.middleware.js";
import { UserSchema } from "./user.schema.js";

const userModel = mongoose.model('User', UserSchema); 

export class UserRepository {

  async createUser(userData) {
    try {
      const user = new userModel(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new ApplicationError(500,error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email }).select('+password');
      return user;
    } catch (error) {
      throw new ApplicationError(500,'Something went wrong in database, please try again!');
    }
  }

  async findUserById(userId) {
    try {
      const user = await userModel.findById(userId);
      return user;
    }catch (error) {
      return null;
    }
  }

  async findAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new ApplicationError(500,'Something went wrong in database, please try again!');
    }
  }

  async updateUserById(userId, userData) {
    try {
      const user = await userModel.findByIdAndUpdate(userId, userData, { new: true });
      return user;
    } catch (error) {
      throw new ApplicationError(500,'Something went wrong in database, please try again!');
    }
  }

}