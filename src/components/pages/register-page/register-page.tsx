import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useRegisterMutation } from '../../../services/api/user-api';

const RegisterPage = () => {

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [register, { data: user, isSuccess, isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess && user?.success) {
      navigate('/', { replace: true });
    }
  }, [isSuccess, user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    register(form);
  };

  const additionalActions = [
    {
      text: 'Уже зарегистрированы?',
      link: {
        text: 'Войти',
        to: '/login',
      },
    },
  ];

  return (
    <CustomForm
      title="Регистрация"
      submitButtonText="Зарегистрироваться"
      onSubmit={handleRegister}
      isFetching={isLoading || isSuccess}
      additionalActions={additionalActions}
    >
      <Input
        name="name"
        placeholder="Имя"
        autoComplete="username"
        value={form.name}
        onChange={handleChange} />
      <EmailInput
        name="email"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
      />
    </CustomForm>
  );
};

export default RegisterPage;
