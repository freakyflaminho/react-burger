import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useResetPasswordMutation } from '../../../services/api/auth';
import withAuthRedirect from '../../../hocs/with-auth-redirect';

const ForgotPasswordPage = () => {

  const [form, setValue] = useState({ email: '' });
  const navigate = useNavigate();
  const [resetPassword, { data: user, isSuccess, isLoading, isFetching }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/reset-password');
    }
  });

  const handleChange = e => {
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
      isFetching={isLoading || isFetching || isSuccess}
      additionalActions={additionalActions}
    >
      <EmailInput
        name="email"
        placeholder="Укажите e-mail"
        value={form.email}
        onChange={handleChange}
      />
    </CustomForm>
  );
};

export default withAuthRedirect(ForgotPasswordPage);
