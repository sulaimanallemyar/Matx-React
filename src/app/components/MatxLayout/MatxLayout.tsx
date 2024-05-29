import { MatxSuspense } from '../../components';
import { MatxLayouts } from './index';
import { useSettingsStore } from '../../contexts/SettingsContext';

const MatxLayout = (props: any) => {
  const { settings }: any = useSettingsStore((state) => state);
  const Layout = MatxLayouts['layout1'];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;
