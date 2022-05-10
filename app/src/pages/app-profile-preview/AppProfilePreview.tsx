import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import UserProfile from '~/components/UserProfile';
import { userState } from '~/store/user';

const AppProfilePreview: FC = () => {
  const user = useRecoilValue(userState);

  return <UserProfile user={user!} />;
};

export default AppProfilePreview;
