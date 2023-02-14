import { Layout } from '@/components/layout';
import { Loading } from '@/components/loading';
import { AddUser } from '@/components/usuario/add';
import { EditUser } from '@/components/usuario/edit';
import { useRouter } from 'next/router';

export default function CRUDUsuario() {
  const router = useRouter();
  const { type } = router.query;
  // let currentPage = type === 'novo' ? 'add' : 'edit';
  const components = {
    edit: <EditUser />,
    add: <AddUser />,
  };
  if (!type) {
    return (
      <Layout>
        <div className='flex justify-center items-center w-full h-full '>
          <div className='fill-green-500'>
            <Loading />
          </div>
        </div>
      </Layout>
    );
  }
  return <Layout>{components[type === 'novo' ? 'add' : 'edit']}</Layout>;
}
