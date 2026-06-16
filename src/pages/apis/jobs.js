import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import { fireDB } from '../../firebaseConfig';

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem('user'));
  try {
    await addDoc(collection(fireDB, 'jobs'), {
      ...payload,
      status: 'pending',
      postedByUserId: user.id,
      postedByUserName: user.name,
      postedOn: moment().format('DD-MM-YYYY HH:mm A'),
    });
    return {
      success: true,
      message: 'Job posted successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
