import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '~/pages/not-found';

const IndexRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default IndexRoutes;
