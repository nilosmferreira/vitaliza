import {
  DashboardIcon,
  ColaboradorIcon,
  ModalidadeIcon,
  AtletaIcon,
  EstoqueIcon,
  BancoIcon,
  UsuarioIcon,
} from '@/components/icons';
import clsx from 'clsx';
import { NavItem } from './nav-item';
interface NavBarProps {
  menu?: boolean;
}
export interface MenuItem {
  href: string;
  href_exact: boolean;
  children: string;
}
interface Menu {
  href: string;
  icon: JSX.Element;
  children: string;
  href_exact: boolean;
  sub_menu?: MenuItem[];
}
const menus: Menu[] = [
  {
    href: '/controle',
    icon: <DashboardIcon />,
    children: 'Dashboard',
    href_exact: true,
  },
  {
    href: '/controle/colaborador',
    icon: <ColaboradorIcon />,
    children: 'Colaborador',
    href_exact: false,
  },
  {
    href: '/controle/modalidade',
    icon: <ModalidadeIcon />,
    children: 'Modalidade',
    href_exact: false,
  },
  {
    href: '/controle/atleta',
    icon: <AtletaIcon />,
    children: 'Atleta',
    href_exact: false,
  },
  {
    href: '/controle/estoque',
    icon: <EstoqueIcon />,
    children: 'Estoque',
    href_exact: false,
  },
  {
    href: '/controle/caixa',
    icon: <BancoIcon />,
    children: 'Caixa',
    href_exact: false,
  },
  {
    href: '/controle/usuario',
    icon: <UsuarioIcon />,
    children: 'Usuario',
    href_exact: false,
    sub_menu: [
      {
        href: '/controle/usuario/novo',
        children: 'Novo Usuário',
        href_exact: true,
      },
      {
        href: '/controle/usuario',
        children: 'Lista de usuários',
        href_exact: true,
      },
      {
        href: '/controle/usuario/mudasenha',
        children: 'Muda a senha',
        href_exact: true,
      },
    ],
  },
];

export function NavBar({ menu = false }: NavBarProps) {
  return (
    <nav
      className={clsx({
        'mt-16': menu,
        'mt-6': menu === false,
      })}
    >
      <div>
        {menus.map((menu) => (
          <NavItem
            key={menu.href}
            href={menu.href}
            title={menu.children}
            icon={menu.icon}
            exact={menu.href_exact}
            sub_menus={menu.sub_menu}
          ></NavItem>
        ))}
      </div>
    </nav>
  );
}
