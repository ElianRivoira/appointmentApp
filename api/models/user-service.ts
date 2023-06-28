import bcrypt from 'bcrypt';

import User, { UserAttrs } from './User.model';
import { generateToken } from '../utils/tokens';
import { ServerError } from '../errors/server-error';
import UserLogin from '../interfaces/UserLogin';
import { BranchOfficeDoc } from './BranchOffice.model';
import { BadRequestError } from '../errors/bad-request-error';

const signUp = async (data: UserAttrs) => {
  try {
    const user = User.build({ ...data, role: 'user' });
    await user.save();
    return user;
  } catch (e) {
    throw new ServerError(e);
  }
};

const postOperator = async (data: UserAttrs) => {
  try {
    const { name, email, dni, password, branch, phone } = data;
    const operator = User.build({
      name,
      email,
      dni,
      password,
      branch,
      role: 'operator',
      phone,
    });
    await operator.save();
    return operator;
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOperators = async () => {
  try {
    const operators = await User.find({ role: 'operator' }, { __v: 0, password: 0 }).populate('branch');
    return operators;
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOneOperator = async (id: string) => {
  try {
    const operator = await User.findOne({ role: 'operator', _id: id }, { __v: 0, password: 0 }).populate('branch');
    return operator;
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOneUser = async (data: {[key: string]: string}) => {
  try {
    const user = await User.findOne(data);
    return user;
  } catch (e) {
    throw new ServerError(e);
  }
};

async function userLogin(user: UserLogin) {
  try {
    const loggedUser = await User.findOne({ email: user.email });
    if (loggedUser) {
      const match = await bcrypt.compare(user.password, loggedUser.password);
      if (match) {
        const tokenPayload = {
          id: loggedUser._id,
          username: loggedUser.name,
          dni: loggedUser.dni,
          role: loggedUser.role,
        };
        const token = generateToken(tokenPayload);
        return {
          user: loggedUser,
          token,
        };
      }
    } else {
      throw new BadRequestError('Email o contraseña incorrectos')
    }
  } catch (e) {
    // throw new ServerError(e);
    throw new BadRequestError('Email o contraseña incorrectos')
  }
}

const getLoggedUser = async (id: string) => {
  try {
    const user = await User.findById(id, { password: 0, __v: 0 }).populate('branch');
    return user;
  } catch (e) {
    throw new ServerError(e);
  }
};

const updateUser = async (user: UserAttrs, branch: BranchOfficeDoc, id: string) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name: user.name, dni: user.dni, email: user.email, phone: user.phone, branch: branch?._id },
      {
        new: true,
      }
    );
    return updatedUser;
  } catch (e) {
    throw new ServerError(e);
  }
};

const updatePassword = async (id: string, pass: string) => {
  try {
    const hash = await bcrypt.hash(pass, 10);
    const user = await User.findByIdAndUpdate(
      id,
      { password: hash },
      {
        new: true,
      }
    );
    return user;
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  signUp,
  postOperator,
  getOperators,
  getOneOperator,
  getOneUser,
  userLogin,
  getLoggedUser,
  updateUser,
  updatePassword,
};
