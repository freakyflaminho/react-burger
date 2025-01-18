import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useLoginMutation } from '../../../services/api/auth';
import withAuthRedirect from '../../../hocs/with-auth-redirect';

const LoginPage = () => {

  const [form, setValue] = useState({ email: '8bhh7x5ci5@dygovil.com', password: 'testtest' });
  const navigate = useNavigate();
  const [login, { data: user, isSuccess, isLoading, isFetching }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/', { replace: true });
    }
  },[isSuccess, user, navigate]);

  const handleChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    login(form);
  };

  const additionalActions = [
    {
      text: 'Вы — новый пользователь?',
      link: {
        text: 'Зарегистрироваться',
        to: '/register',
      },
    },
    {
      text: 'Забыли пароль?',
      link: {
        text: 'Восстановить пароль',
        to: '/forgot-password',
      },
    },
  ];

  return (
    <CustomForm
      title="Вход"
      submitButtonText="Войти"
      onSubmit={handleLogin}
      isFetching={isLoading || isFetching || isSuccess}
      additionalActions={additionalActions}
    >
      <EmailInput value={form.email} onChange={handleChange} />
      <PasswordInput value={form.password} onChange={handleChange} />
    </CustomForm>
  );
};

export default withAuthRedirect(LoginPage);
