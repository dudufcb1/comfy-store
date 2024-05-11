import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  console.log('Paginas', pageCount, 'Pagina actual', page);
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    //Dots
    if (page < pageCount) {
      pageButtons.push(
        <button
          key="dots-1"
          className="btn btn-xs sm:btn-md border-none join-item"
        >
          ...
        </button>
      );
    }

    // activa
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(
        addPageButton({ pageNumber: page, activeClass: page === page })
      );
    }
    //Dots
    if (page > 2) {
      pageButtons.push(
        <button
          key="dots-2"
          className="btn btn-xs sm:btn-md border-none join-item"
        >
          ...
        </button>
      );
    }
    // last
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;

//#region 20240510215042 Paginación del bot
/* import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = (pageNumber, activeClass) => {
    return (
      <button
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  if (pageCount < 2) return null;

  const pages = [
    page - 1 < 1 ? pageCount : page - 1,
    page,
    page + 1 > pageCount ? 1 : page + 1,
  ];

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            handlePageChange(pages[0]);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return addPageButton(pageNumber, pageNumber === page);
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            handlePageChange(pages[pages.length - 1]);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
 */
//#endregion
