import { useEffect, useState } from 'react';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import DataLoader from '../../data-loader/DataLoader';

import { useGetUserQuery, useUpdateUserMutation } from '../../../services/api/user-api';

import styles from './profile-edit-page.module.css';

const ProfileEditPage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const fetchedData = useGetUserQuery();
  const [updateUser, updatedData] = useUpdateUserMutation();

  const actualData = updatedData.isUninitialized ? fetchedData : updatedData;
  const retry = actualData.refetch
    || (() => updateUser(actualData.originalArgs));

  const { data: actualUserData } = actualData;

  const isEdited = form.name !== actualUserData?.user.name
    || form.email !== actualUserData?.user.email
    || form.password !== '';

  const handleChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setValue({
      name: actualUserData.user.name,
      email: actualUserData.user.email,
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  };

  useEffect(() => {
    setValue({
      name: actualUserData?.user.name || '',
      email: actualUserData?.user.email || '',
      password: '',
    });
  }, [actualUserData, setValue]);

  return (
    <DataLoader data={actualData} onRetry={retry}>
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
    </DataLoader>
  );
};

export default ProfileEditPage;
