import { UserModel } from './../models/user.model';
import { dataSource } from "../data-source";

export const getUserById = async (uid: string) => {
  const userRepository = dataSource.getRepository(UserModel);
  return userRepository.findOne({ where: { uid } });
};

export const getUserByPhoneNumber = async (phone: string) => {
  const userRepository = dataSource.getRepository(UserModel);
  return userRepository.findOne({ where: { phone } });
};

export const saveUser = async (data: Partial<UserModel>): Promise<UserModel> => {
  const userRepository = dataSource.getRepository(UserModel);
  const user =  userRepository.create(data);
  return userRepository.save(user);
};
