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
const menus = [
  {
    href: '/controle',
    icon: <DashboardIcon />,
    children: 'Dashboard',
  },
  {
    href: '/controle/colaborador',
    icon: <ColaboradorIcon />,
    children: 'Colaborador',
  },
  {
    href: '/controle/modalidade',
    icon: <ModalidadeIcon />,
    children: 'Modalidade',
  },
  {
    href: '/controle/atleta',
    icon: <AtletaIcon />,
    children: 'Atleta',
  },
  {
    href: '/controle/estoque',
    icon: <EstoqueIcon />,
    children: 'Estoque',
  },
  {
    href: '/controle/caixa',
    icon: <BancoIcon />,
    children: 'Caixa',
  },
  {
    href: '/controle/usuario',
    icon: <UsuarioIcon />,
    children: 'Usuario',
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
          ></NavItem>
        ))}
      </div>
    </nav>
  );
}
