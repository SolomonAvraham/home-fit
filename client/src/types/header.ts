export interface ClientHeaderProps {
  initialIsLoggedIn: boolean;
}

export type MenuItemProps = {
  text: string;
  path: string;
  icon: JSX.Element;
  dropdown?: boolean;
  dropdownMenu?: {
    text: string;
    path: string;
    icon: JSX.Element;
  }[];
  mobileMenuOpen?: boolean;
};

