import styled from 'styled-components';
import Link from 'next/link';
import { NextRouter } from 'next/router';

interface IProps {
  totalPages: number;
  activePage: number;
  router: NextRouter;
}
export const PaginationBar: React.FC<IProps> = ({ totalPages, activePage, router }) => {
  console.log(activePage);
  const pagesToRender = [];
  if (totalPages > 2) {
    for (let i = 1; i < totalPages - 1; i++) {
      if (activePage - 4 < i && activePage + 4 > i) {
        pagesToRender.push(i + 1);
      }
    }
  }

  return (
    <Component>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${activePage === 1 && 'active'}`}>
            <Link
              href={{
                query: {
                  ...router.query,
                  page: 1,
                },
              }}
            >
              <a className="page-link" href="#">
                1
              </a>
            </Link>
          </li>
          {activePage !== 1 && (
            <li className="page-item">
              <Link
                href={{
                  query: {
                    ...router.query,
                    page: activePage - 1,
                  },
                }}
              >
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </Link>
            </li>
          )}
          {pagesToRender?.map((page: number) => (
            <li className={`page-item ${activePage === page && 'active'}`}>
              <Link
                href={{
                  query: {
                    ...router.query,
                    page,
                  },
                }}
              >
                <a className="page-link" href="#">
                  {page}
                </a>
              </Link>
            </li>
          ))}
          {activePage !== totalPages && (
            <li className="page-item">
              <Link
                href={{
                  query: {
                    ...router.query,
                    page: activePage === totalPages ? totalPages : activePage + 1,
                  },
                }}
              >
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo; </span>
                  <span className="sr-only">Next</span>
                </a>
              </Link>
            </li>
          )}
          {totalPages > 1 && (
            <li className={`page-item ${activePage === totalPages && 'active'}`}>
              <Link
                href={{
                  query: {
                    ...router.query,
                    page: totalPages,
                  },
                }}
              >
                <a className="page-link" href="#">
                  {totalPages}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Component>
  );
};

const Component = styled.div`
  margin: 1rem 0;
`;
