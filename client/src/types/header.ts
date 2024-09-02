export interface ClientHeaderProps {
  initialIsLoggedIn: boolean;
}

export type MenuItemProps = {
  item: {
    text: string;
    path: string;
    icon: JSX.Element;
    dropdown?: boolean;
    dropdownMenu?: {
      text: string;
      path: string;
      icon: JSX.Element;
      dropdown?: boolean;
      dropdownMenu?: {
        text: string;
        path: string;
        icon: JSX.Element;
      }[];
    }[];
  };
  index: number;
  isMobile: boolean;
  drawerOpen: boolean;
  dropdownOpen: number | null;
  handleDropdownToggle: (index: number) => void;
  handleDrawerToggle: () => void;
  setDropdownOpen: (value: number | null) => void;
};
