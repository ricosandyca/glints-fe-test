import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { withAuthorizedUser } from '~/hoc/with-firebase-auth';
import AppProfile from '~/pages/app-profile';
import AppProfilePreview from '~/pages/app-profile-preview';
import NotFound from '~/pages/not-found';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route index element={<AppProfile />} />
      <Route path="/preview" element={<AppProfilePreview />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default withAuthorizedUser(AppRoutes);
