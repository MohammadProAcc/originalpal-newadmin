import styled from "styled-components";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Divider, Pagination } from "@mantine/core";

interface IProps {
  totalPages: number;
  activePage: number;
  router: NextRouter;
}
export const PaginationBar: React.FC<IProps> = ({ totalPages, activePage, router }) => {
  const pagesToRender = [];
  if (totalPages > 2) {
    for (let i = 1; i < totalPages - 1; i++) {
      if (activePage - 4 < i && activePage + 4 > i) {
        pagesToRender.push(i + 1);
      }
    }
  }

  function onChange(i: number) {
    router.push({
      query: {
        ...router.query,
        page: i,
      },
    });
  }

  return (
    <Component>
      <Divider my="md" />
      <Pagination
        page={activePage}
        onChange={onChange}
        total={10}
        color="teal"
        radius="xl"
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({ from: "blue", to: "cyan" }),
            },
          },
        })}
      />
    </Component>
  );
};

const Component = styled.div`
  margin: 1rem 0;
  position: relative;
  z-index: 0;
`;
