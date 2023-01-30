import { ChangeEvent, useState } from 'react';
import {
  CaretRight as ChevronRightIcon,
  CaretLeft as ChevronLeftIcon,
} from 'phosphor-react';
interface Props {
  resultsCount?: number;
  limit?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  perPage: number;
}
const Paginacao = ({
  resultsCount,
  limit,
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
}: Props) => {
  const [num, setNum] = useState(1);

  if (!resultsCount || !limit) return null;

  const remainder = resultsCount % limit;
  let numberOfPages = Math.floor(resultsCount / limit);
  if (remainder > 0) {
    numberOfPages++;
  }
  const pages = new Array(10).fill(null).map((item, index) => ({
    page: num + index,
  }));
  const prev = () => {
    setNum((prevState) => {
      const value = prevState - 1;
      return value < 1 ? 1 : value;
    });
  };

  const next = () => {
    setNum((prevState) => {
      const value = prevState + 1;
      return value > numberOfPages - 3 ? numberOfPages - 3 : value;
    });
  };
  const changeCurrentPage = (page: number) => {
    setCurrentPage(page - 1);
  };
  const handleSelected = (ev: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+ev.target.value);
  };
  return (
    <div className='flex justify-between items-center px-2 py-2'>
      <div className='flex jutify-between font-medium text-sm text-slate-400'>
        <span>
          Página {`${currentPage + 1}/${numberOfPages}`} de {resultsCount}{' '}
          registros
          <span className='ml-4'>Qtd Por Página</span>
          <select
            name='limit'
            id='limit'
            className='ml-2 w-14 border bg-green-50 text-center '
            value={perPage.toString()}
            onChange={handleSelected}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='50'>40</option>
          </select>
        </span>
      </div>
      <nav
        className='isolate inline-flex -space-x-px rounded-md shadow-sm data-[hidden=true]:hidden'
        aria-label='Pagination'
        data-hidden={numberOfPages === 1}
      >
        <button
          className='relative inline-flex items-center rounded-l-md border border-blue-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-blue-200 focus:z-20'
          onClick={prev}
        >
          <ChevronLeftIcon
            className='h-5 w-5 text-black-500'
            aria-hidden='true'
          />
        </button>
        {pages.map((pg, index) => (
          <button
            key={pg.page}
            disabled={pg.page > numberOfPages}
            className={`w-10 border border-blue-300 px-2 py-2 text-sm   hover:bg-blue-200 focus:z-20  disabled:text-gray-500 disabled:bg-gray-100 disabled:hidden ${
              currentPage + 1 === pg.page
                ? 'bg-blue-300 text-white font-bold'
                : 'bg-white text-gray-500 font-medium'
            }`}
            onClick={() => changeCurrentPage(pg.page)}
          >
            {pg.page}
          </button>
        ))}
        <button
          className='relative inline-flex items-center rounded-r-md border border-blue-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-blue-200 focus:z-20'
          onClick={next}
        >
          <ChevronRightIcon
            className='h-5 w-5 text-black-500'
            aria-hidden='true'
          />
        </button>
      </nav>
    </div>
  );
};

export { Paginacao };
