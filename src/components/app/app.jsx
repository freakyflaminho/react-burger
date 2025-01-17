import { BrowserRouter, Route, Routes } from 'react-router';

import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';
import LoginPage from '../pages/login-page/login-page';
import RegisterPage from '../pages/register-page/register-page';

import withDataLoading from '../../hocs/with-data-loading';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';

import styles from './app.module.css';

const App = () => {
  const data = useGetIngredientsQuery();
  const WithDataLoadingConstructorPage = withDataLoading(data, data.refetch)(ConstructorPage);

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route index element={<WithDataLoadingConstructorPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
