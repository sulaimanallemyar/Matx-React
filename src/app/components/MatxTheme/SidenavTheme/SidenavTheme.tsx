import { ThemeProvider, useTheme } from '@mui/material';
import { useSettingsStore } from '../../../contexts/SettingsContext';

const SidenavTheme = ({ children }: any) => {
  const theme = useTheme();
  const { settings }: any = useSettingsStore((state) => state);
  const sidenavTheme = settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
};

export default SidenavTheme;
