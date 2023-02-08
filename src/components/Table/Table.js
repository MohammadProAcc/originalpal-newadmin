import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell as _TableCell,
  TableContainer,
  TableHead,
  TableRow as _TableRow,
} from "@material-ui/core";
import styledEngine from "@mui/styled-engine-sc";
import { Popover } from "@paljs/ui";
import { OrderDetails } from "components/PageComponents/Orders/components/OrderDetails";
import { useNonInitialEffect } from "hooks";
import { useEffect, useState } from "react";
import { css } from "styled-components";

function createData(number, item, qty, price) {
  return { number, item, qty, price };
}

export function BasicTable({ columns, rows, getSelections, clearSelectionTriggerRef, isOrder = false }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const handleSelection = (id) => {
    selectedIds?.length > 0
      ? selectedIds?.includes(id)
        ? setSelectedIds(selectedIds?.filter((item) => item !== id))
        : setSelectedIds([...selectedIds, id])
      : setSelectedIds([id]);
  };

  function clearSelections() {
    setSelectedIds([]);
  }

  useNonInitialEffect(() => {
    getSelections(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    clearSelectionTriggerRef.current = clearSelections;
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#bdbdbd" }}>
          <TableRow>
            {columns?.map((column) => (
              <TableCell style={{ fontSize: "1.125rem" }} align="right">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <>
              {
                <TableRow selected={selectedIds?.includes(row[0])} key={row.number}>
                  {row.map((item, index) =>
                    index === 0 ? (
                      <TableCell primary align="right" component="th" scope="row">
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                          <Checkbox
                            checked={selectedIds?.includes(row[0])}
                            value={row[0]}
                            onClick={() => handleSelection(row[0])}
                          />
                          {isOrder ? (
                            <Popover placement="left" trigger="hover" overlay={<OrderDetails orderId={row[0]} />}>
                              {item}
                            </Popover>
                          ) : (
                            item
                          )}
                        </label>
                      </TableCell>
                    ) : (
                      <TableCell align="right">{item}</TableCell>
                    ),
                  )}
                </TableRow>
              }
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TableRow = styledEngine(_TableRow)`
    position: relative;
    
    transition: 150ms;

    background-color ${(p) => p.selected && "rgba(0,149,255,0.25)"};

    &:hover {
        background-color: rgba(0,149,255,0.2);
    }
`;

const TableCell = styledEngine(_TableCell)`
    transition: 50ms;

    ${(p) =>
      p.primary &&
      css`
        &:hover {
          background-color: rgba(0, 149, 255, 0.3);
        }
      `}   
`;
