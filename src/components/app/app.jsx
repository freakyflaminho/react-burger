import { BrowserRouter, Routes, Route } from 'react-router';

import AppHeader from '../app-header/app-header';
import ConstructorPage from '../pages/constructor-page/constructor-page';

import styles from './app.module.css';
import withDataLoading from '../../hocs/with-data-loading';
import { useGetIngredientsQuery } from '../../services/burger-ingredients';
import LoginPage from '../pages/login-page/login-page';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
