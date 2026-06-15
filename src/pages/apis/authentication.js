import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../../firebaseConfig';
export const LoginUser = async (payload) => {};
export const RegisterUser = async (payload) => {
  try {
    const response = await addDoc(collection(fireDB, 'users'), payload);
    return {
      success: true,
      message: 'User registered successfully',
      data: response,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
