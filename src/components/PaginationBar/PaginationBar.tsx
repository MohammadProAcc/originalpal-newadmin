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
  const pagesCount = [];
  for (let i = 0; i < totalPages; i++) {
    pagesCount.push(i + 1);
  }

  return (
    <Component>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
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
          {pagesCount?.map((page: number) => (
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
        </ul>
      </nav>
    </Component>
  );
};

const Component = styled.div`
  margin: 1rem 0;
`;
