import { MatxSuspense } from 'app/components';
import { MatxLayouts } from './index';
import { useSettingsStore } from 'app/contexts/SettingsContext';

const MatxLayout = (props) => {
  const { settings } = useSettingsStore();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;
