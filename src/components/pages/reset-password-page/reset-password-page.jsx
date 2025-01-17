import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useChangePasswordMutation } from '../../../services/api/auth';
import withAuthRedirect from '../../../hocs/with-auth-redirect';

const ResetPasswordPage = () => {

  const [form, setValue] = useState({ password: '', token: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const [
    changePassword,
    {
      data: user,
      isSuccess,
      isLoading,
      isFetching
    }
  ] = useChangePasswordMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/login', { replace: true });
    }
  });

  const handleChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRestorePassword = () => {
    changePassword(form);
  };

  const additionalActions = [
    {
      text: 'Вспомнили пароль?',
      link: {
        text: 'Войти',
        to: '/login',
      },
    },
  ];

  if (!location.state?.isRedirected) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <CustomForm
      title="Восстановление пароля"
      submitButtonText="Сохранить"
      onSubmit={handleRestorePassword}
      isFetching={isLoading || isFetching || isSuccess}
      additionalActions={additionalActions}
    >
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        value={form.password}
        onChange={handleChange}
      />
      <Input
        name="token"
        placeholder="Введите код из письма"
        value={form.token}
        onChange={handleChange}
      />
    </CustomForm>
  );
};

export default withAuthRedirect(ResetPasswordPage);
