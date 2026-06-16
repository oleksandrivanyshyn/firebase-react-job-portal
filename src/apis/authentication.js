import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';
import CryptoJs from 'crypto-js';
export const LoginUser = async (payload) => {
  try {
    const qry = query(
      collection(fireDB, 'users'),
      where('email', '==', payload.email),
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'Email does not exist',
        data: null,
      };
    } else {
      const snapshotsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const user = snapshotsData[0];
      const decryptedPassword = CryptoJs.AES.decrypt(
        user.password,
        'sheyjobs-lite',
      ).toString(CryptoJs.enc.Utf8);
      if (decryptedPassword === payload.password) {
        return {
          success: true,
          message: 'Login successful',
          data: { ...user, password: '' },
        };
      } else {
        return {
          success: false,
          message: 'Password is incorrect',
          data: null,
        };
      }
    }
  } catch (error) {}
};
export const RegisterUser = async (payload) => {
  try {
    const qry = query(
      collection(fireDB, 'users'),
      where('email', '==', payload.email),
    );
    const querySnapshot = await getDocs(qry);
    if (!querySnapshot.empty) {
      return {
        success: false,
        message: 'Email already exists',
        data: null,
      };
    }
    payload.password = CryptoJs.AES.encrypt(
      payload.password,
      'sheyjobs-lite',
    ).toString();
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
