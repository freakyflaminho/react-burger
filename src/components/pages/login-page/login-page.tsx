import { ChangeEvent, useState } from 'react';

import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomForm from '../../custom-form/custom-form';

import { useLoginMutation } from '../../../services/api/user-api';

const LoginPage = () => {

  const [form, setValue] = useState({ email: '', password: '' });
  const [login, { isSuccess, isLoading, isFetching, isError }] = useLoginMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      <EmailInput
        name="email"
        autoComplete="email"
        errorText="Некорректный e-mail"
        value={form.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        autoComplete="current-password"
        value={form.password}
        onChange={handleChange}
      />
      {isError && <p className="input__error text_type_main-default">Некорректный e-mail или пароль</p>}
    </CustomForm>
  );
};

export default LoginPage;
