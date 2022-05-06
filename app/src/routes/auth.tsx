import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { withUnauthorizedUser } from '~/hoc/with-firebase-auth';
import NotFound from '~/pages/not-found';
import SignUp from '~/pages/sign-up';
import Signin from '~/pages/signin';

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default withUnauthorizedUser(AuthRoutes);
