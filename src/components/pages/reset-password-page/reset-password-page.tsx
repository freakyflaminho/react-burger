import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';

import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useChangePasswordMutation } from '../../../services/api/user-api';

const ResetPasswordPage = () => {

  const [form, setValue] = useState({ password: '', token: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const [changePassword, { data: user, isSuccess, isLoading, isError }] = useChangePasswordMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/login', { replace: true });
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      isFetching={isLoading || isSuccess}
      additionalActions={additionalActions}
    >
      <input
        name="username"
        autoComplete="username"
        hidden
      />
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
      />
      <Input
        name="token"
        placeholder="Введите код из письма"
        value={form.token}
        onChange={handleChange}
      />
      {isError && <p className="input__error text_type_main-default">Некорректный код</p>}
    </CustomForm>
  );
};

export default ResetPasswordPage;
