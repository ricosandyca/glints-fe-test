import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { withFloatingTheme } from '~/hoc/with-floating-theme';
import { withFirebaseAuth } from '~/hoc/with-firebase-auth';
import NotFound from '~/pages/not-found';
import PublicProfile from '~/pages/public-profile';
import AppRoutes from '~/routes/app';
import AuthRoutes from '~/routes/auth';

const IndexRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/app" />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="app/*" element={<AppRoutes />} />
        <Route path=":userKey" element={<PublicProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default withFirebaseAuth(withFloatingTheme(IndexRoutes));
