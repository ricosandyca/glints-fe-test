import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { usePubliUserFetcher } from '~/hooks/use-public-user';
import Loading from '~/pages/loading';
import NotFound from '~/pages/not-found';
import UserProfile from '~/components/UserProfile';

const PublicProfile: FC = () => {
  const { userKey } = useParams();
  const { publicUser, isLoading } = usePubliUserFetcher(userKey!);

  if (isLoading) return <Loading />;
  if (!publicUser) return <NotFound />;

  return <UserProfile user={publicUser} />;
};

export default PublicProfile;
