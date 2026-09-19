export interface User {
  id: string;
  name: string;
  email: string;
}
export type OnLogout = () => void;

export interface LayoutProps {
  user: User | null;
  onLogout: OnLogout;
}