import authAPI from '../api/authAPI';

const handleLogin = async () => {
  try {
    const res = await authAPI.login({ email, password });
    const { token, user } = res.data;

    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};

export default handleLogin;
