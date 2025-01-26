import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import DataLoader from '../../data-loader/DataLoader';

import { useGetUserQuery, useUpdateUserMutation } from '../../../services/api/user-api';

import styles from './profile-edit-page.module.css';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { GetUserResponse, UpdateUserRequest, UpdateUserResponse } from '../../../utils/api-types.ts';

const ProfileEditPage = () => {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const fetchedData = useGetUserQuery<TypedUseQueryHookResult<GetUserResponse, FetchArgs, BaseQueryFn>>();
  const [updateUser, updatedData] = useUpdateUserMutation<TypedUseQueryHookResult<UpdateUserResponse, FetchArgs, BaseQueryFn>>();

  const actualData = updatedData.isUninitialized ? fetchedData : updatedData;
  const retry = actualData.refetch
    || (() => updateUser(actualData.originalArgs as UpdateUserRequest));

  const { data: actualUserData } = actualData;

  const isEdited = form.name !== actualUserData?.user.name
    || form.email !== actualUserData?.user.email
    || form.password !== '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setValue({
      name: actualUserData?.user.name || '',
      email: actualUserData?.user.email || '',
      password: '',
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
          isIcon={true}
          disabled={false}
          autoComplete="email"
          errorText="Некорректный e-mail"
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
