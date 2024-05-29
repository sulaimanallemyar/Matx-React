import { Suspense } from 'react';
import { MatxLoading } from '../components';

const MatxSuspense = ({ children }: { children: any }) => {
  return <Suspense fallback={<MatxLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
