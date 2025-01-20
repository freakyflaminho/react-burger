import { useEffect, useState } from 'react';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useGetUserQuery, useUpdateUserMutation } from '../../../services/api/auth';

import styles from './profile-edit-page.module.css';

const ProfileEditPage = () => {

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const { data: userData, isLoading, isFetching, isSuccess, isError } = useGetUserQuery();
  const [updateUser, data] = useUpdateUserMutation();

  const isEdited = form.name !== userData?.user.name
    || form.email !== userData?.user.email
    || form.password !== '';

  const handleChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setValue({
      name: userData.user.name,
      email: userData.user.email,
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  };

  useEffect(() => {
    if (isSuccess && userData.success) {
      setValue({
        name: userData.user.name || '',
        email: userData.user.email || '',
        password: '',
      });
    }
  }, [userData, setValue]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        autoComplete="username"
        value={form.name}
        onChange={handleChange}
      />
      <EmailInput
        name="email"
        placeholder="Логин"
        icon="EditIcon"
        disabled={false}
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        icon="EditIcon"
        disabled={false}
        autoComplete="new-password"
        value={form.password}
        onChange={handleChange}
      />
      {isEdited &&
        <div>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
            Отменить
          </Button>
          <Button htmlType="submit">
            Сохранить
          </Button>
        </div>
      }
    </form>
  );
};

export default ProfileEditPage;
