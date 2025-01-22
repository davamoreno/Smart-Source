import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import { useCookie } from '#app';
import { useUrlStore } from '~/stores/BaseUrl/Url';

export const useMemberAuthStore = defineStore('memberAuth', () => {
  // State variables
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const identifier = ref('');
  const token = ref(null);
  const isLogin = ref(false);
  const userProfile = ref({});
  const success = ref(false);
  const error = ref(null);
  const isLoading = ref(false);
  const role = ref(null);
  const selectedUniversity = ref('');
  const selectedFaculty = ref('');

  // URL Store
  const urlStore = useUrlStore();

  // Setters and Actions
  const setLoginStatus = (status) => {
    isLogin.value = status;
  };

  const clearFields = () => {
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    identifier.value = '';
  };

  const setError = (message) => {
    error.value = message;
  };

  const setSuccess = (status) => {
    success.value = status;
  };

  // Registration
  const register = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      success.value = false;

      if (password.value !== confirmPassword.value) {
        setError({ confirmPassword: ['Password confirmation does not match.'] });
        return;
      }

      const response = await axios.post(`${urlStore.url}member/register`, {
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      });

      console.log('Registration successful:', response.data);
      clearFields();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSuccess(true);
      isLoading.value = false;
    }
  };

  // Login
  const login = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      setLoginStatus(true);

      if (!identifier.value || !password.value) {
        throw new Error('Identifier and password are required');
      }

      const response = await axios.post(`${urlStore.url}member/login`, {
        identifier: identifier.value,
        password: password.value,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      token.value = response.data.access_token;
      role.value = response.data.role;
      const cookieToken = useCookie('jwt', { maxAge: 60 * 60 * 24 });
      cookieToken.value = token.value;

      clearFields();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      isLoading.value = false;
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const cookieToken = useCookie('jwt').value;
      if (cookieToken) {
        isLogin.value = true;
        const response = await axios.get(`${urlStore.url}user/profile`, {
          headers: {
            'Authorization': `Bearer ${cookieToken}`,
          },
        });

        userProfile.value = response.data;
      }
    } catch (err) {
      console.log('Error fetching user profile:', err);
    }
  };

  // Logout
  const logout = async () => {
    try {
      const cookieToken = useCookie('jwt').value;
      const response = await axios.post(`${urlStore.url}member/logout`, {}, {
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      const cookieTokenInstance = useCookie('jwt');
      cookieTokenInstance.value = null;
      token.value = null;
      setLoginStatus(false);
      userProfile.value = {};
      isLogin.value = false;

      console.log('Logout success');
    } catch (err) {
      console.log('Error during logout:', err);
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await axios.post(`${urlStore.url}user/edit/profile`, {
        username: username.value,
        faculty_id: selectedFaculty.value,
      }, {
        headers: {
          Authorization: `Bearer ${useCookie('jwt').value}`,
        },
      });

      userProfile.value = response.data.user;
      console.log('Profile updated successfully:', response.data);

      setSuccess(true);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors);
      } else if (err.response && err.response.status === 401) {
        setError('User not authenticated.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSuccess(false);
    } finally {
      isLoading.value = false;
    }
  };

  // Return actions and state
  return {
    // State variables
    username,
    email,
    password,
    confirmPassword,
    identifier,
    token,
    isLogin,
    isLoading,
    error,
    success,
    userProfile,
    selectedFaculty,
    selectedUniversity,

    setLoginStatus,
    clearFields,
    setError,
    setSuccess,
    register,
    login,
    getUserProfile,
    logout,
    updateProfile,
  };
});
