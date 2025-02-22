import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useResetPasswordMutation } from '../../../services/api/user-api';

const ForgotPasswordPage = () => {

  const [form, setValue] = useState({ email: '' });
  const navigate = useNavigate();
  const [resetPassword, { data: user, isSuccess, isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/reset-password', { state: { isRedirected: true } });
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRestorePassword = () => {
    resetPassword(form);
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

  return (
    <CustomForm
      title="Восстановление пароля"
      submitButtonText="Восстановить"
      onSubmit={handleRestorePassword}
      isFetching={isLoading || isSuccess}
      additionalActions={additionalActions}
    >
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        autoComplete="email"
        errorText="Некорректный e-mail"
        value={form.email}
        onChange={handleChange}
      />
    </CustomForm>
  );
};

export default ForgotPasswordPage;
