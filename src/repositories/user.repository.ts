import { dataSource } from "../data-source";
import { UserModel } from "../models/user.model";

export const getUserById = async (uid: string) => {
  const userReposỉtory = dataSource.getRepository(UserModel);
  return userReposỉtory.findOne({ where: { uid } });
};

export const getUserByPhoneNumber = async (phone: string) => {
  const userReposỉtory = dataSource.getRepository(UserModel);
  return userReposỉtory.findOne({ where: { phone } });
};
