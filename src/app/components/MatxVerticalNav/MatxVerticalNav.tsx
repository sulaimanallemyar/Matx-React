import { Box, ButtonBase, Icon, styled } from '@mui/material';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Paragraph, Span } from '../Typography';
import MatxVerticalNavExpansionPanel from './MatxVerticalNavExpansionPanel';
import { useSettingsStore } from '../../contexts/SettingsContext';
import { useUser } from '../../contexts/JWTAuthContext';
import { checkAuthorities } from '../../auth/private-routes';
const ListLabel = styled(Paragraph)(
  ({ theme, mode }: { theme: any; mode: any }) =>
    ({
      fontSize: '12px',
      marginTop: '20px',
      marginLeft: '15px',
      marginBottom: '10px',
      textTransform: 'uppercase',
      display: mode === 'compact' && 'none',
      color: theme.palette.text.secondary
    } as any)
);

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important'
  },
  '& .icon': {
    fontSize: '18px',
    paddingLeft: '16px',
    paddingRight: '16px',
    verticalAlign: 'middle'
  }
};
const ExternalLink = styled('a' as any)(
  ({ theme }: any) =>
    ({
      ...ExtAndIntCommon,
      color: theme.palette.text.primary
    } as any)
);

const InternalLink = styled(Box)(({ theme }) => ({
  '& a': {
    ...ExtAndIntCommon,
    color: theme.palette.text.primary
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)'
  }
}));

const StyledText = styled(Span)(
  ({ mode }) =>
    ({
      fontSize: '0.875rem',
      paddingLeft: '0.8rem',
      display: mode === 'compact' && 'none'
    } as any)
);

const BulletIcon = styled('div')(({ theme }) => ({
  padding: '2px',
  marginLeft: '24px',
  marginRight: '8px',
  overflow: 'hidden',
  borderRadius: '300px',
  background: theme.palette.text.primary
}));

const BadgeValue = styled('div')(() => ({
  padding: '1px 8px',
  overflow: 'hidden',
  borderRadius: '300px'
}));

const MatxVerticalNav = () => {
  const { user } = useUser((state) => state);
  const { settings } = useSettingsStore();
  const { mode } = settings.layout1Settings.leftSidebar;

  const navigations = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard', isHidden: true },
    { label: 'Settings', type: 'label' },
    {
      name: 'Settings',
      icon: 'setting',
      children: [
        { name: 'Users', path: '/users/list' },
        {
          name: 'Roles',
          iconText: 'SU',
          path: '/roles/list',
          isHidden: !checkAuthorities(user.authorities, ['User:Read'])
        }
      ],
      isHidden: false
    },

    {
      name: 'Customs Reports',
      // icon: 'Report',
      children: [
        {
          name: 'DPS',
          children: [{ name: 'Sigtas Report', path: '/report' }]
        },
        { name: 'Transit', children: [{ name: 'Sigtas Report', path: '/report' }] },
        { name: 'Revenue', children: [{ name: 'Sigtas Report', path: '/report' }] },
        { name: 'Data Exchange', children: [{ name: 'Sigtas Report', path: '/report' }] },
        { name: 'Selectivity', children: [{ name: 'Sigtas Report', path: '/report' }] },
        { name: 'Manifest', children: [{ name: 'Sigtas Report', path: '/report' }] }
      ],
      isHidden: false
    }
  ];
  const renderLevels = (data: Array<any>) => {
    return data.map((item, index) => {
      if (!item?.isHidden) {
        if (item.type === 'label')
          return (
            <ListLabel key={index} mode={mode} className="sidenavHoverShow">
              {item.label}
            </ListLabel>
          );

        if (item.children) {
          return (
            <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
              {renderLevels(item.children)}
            </MatxVerticalNavExpansionPanel>
          );
        } else if (item.type === 'extLink') {
          return (
            <ExternalLink
              key={index}
              href={item.path}
              className={`${mode === 'compact' && 'compactNavItem'}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                {(() => {
                  if (item.icon) {
                    return <Icon className="icon">{item.icon}</Icon>;
                  } else {
                    return <span className="item-icon icon-text">{item.iconText}</span>;
                  }
                })()}
                <StyledText mode={mode} className="sidenavHoverShow">
                  {item.name}
                </StyledText>
                <Box mx="auto"></Box>
                {item.badge && <BadgeValue>{item.badge.value}</BadgeValue>}
              </ButtonBase>
            </ExternalLink>
          );
        } else {
          return (
            <InternalLink key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? `navItemActive ${mode === 'compact' && 'compactNavItem'}`
                    : `${mode === 'compact' && 'compactNavItem'}`
                }
              >
                <ButtonBase key={item.name} name="child" sx={{ width: '100%' }}>
                  {item?.icon ? (
                    <Icon className="icon" sx={{ width: 36 }}>
                      {item.icon}
                    </Icon>
                  ) : (
                    <Fragment>
                      <BulletIcon
                        className={`nav-bullet`}
                        sx={{ display: mode === 'compact' && 'none' } as any}
                      />
                      <Box
                        className="nav-bullet-text"
                        sx={
                          {
                            ml: '20px',
                            fontSize: '11px',
                            display: mode !== 'compact' && 'none'
                          } as any
                        }
                      >
                        {item.iconText}
                      </Box>
                    </Fragment>
                  )}
                  <StyledText mode={mode} className="sidenavHoverShow">
                    {item.name}
                  </StyledText>

                  <Box mx="auto" />

                  {item.badge && (
                    <BadgeValue className="sidenavHoverShow">{item.badge.value}</BadgeValue>
                  )}
                </ButtonBase>
              </NavLink>
            </InternalLink>
          );
        }
      }
    });
  };

  return <div className="navigation">{renderLevels(navigations)}</div>;
};

export default React.memo(MatxVerticalNav);
