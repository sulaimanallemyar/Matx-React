import SecondarySidenavTheme from '../MatxTheme/SecondarySidenavTheme/SecondarySidenavTheme';
import SecondarySidebarContent from './SecondarySidebarContent';
import SecondarySidebarToggle from './SecondarySidebarToggle';
import { useSettingsStore } from '../../contexts/SettingsContext';

const SecondarySidebar = () => {
  const { settings } = useSettingsStore();
  const secondarySidebarTheme = settings.themes[settings.secondarySidebar.theme];

  return (
    <SecondarySidenavTheme theme={secondarySidebarTheme}>
      {settings.secondarySidebar.open && <SecondarySidebarContent />}
      <SecondarySidebarToggle />
    </SecondarySidenavTheme>
  );
};

export default SecondarySidebar;
