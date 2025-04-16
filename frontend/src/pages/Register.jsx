import authAPI from '../api/authAPI';

const handleRegister = async () => {
  try {
    const res = await authAPI.register({ name, email, password });
    console.log('Đăng ký thành công:', res.data);
  } catch (error) {
    console.error('Register failed:', error.response.data.message);
  }
};

export default handleRegister;
