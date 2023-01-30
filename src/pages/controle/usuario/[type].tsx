import { Layout } from '@/components/layout';
import { AddUser } from '@/components/usuario/add';
import { EditUser } from '@/components/usuario/edit';
import { useRouter } from 'next/router';

export default function CRUDUsuario() {
  const router = useRouter();
  const { type } = router.query;
  // let currentPage = type === 'novo' ? 'add' : 'edit';
  const components = {
    edit: <EditUser id='' />,
    add: <AddUser />,
  };
  return <Layout>{components[type === 'novo' ? 'add' : 'edit']}</Layout>;
}
