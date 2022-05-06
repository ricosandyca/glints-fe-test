import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { withFloatingTheme } from '~/hoc/with-floating-theme';
import { withFirebaseAuth } from '~/hoc/with-firebase-auth';
import NotFound from '~/pages/not-found';
import AppRoutes from './app';
import AuthRoutes from './auth';

const IndexRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="app/*" element={<AppRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default withFirebaseAuth(withFloatingTheme(IndexRoutes));
