import {
  Paper, Table,
  TableBody,
  TableCell as _TableCell,
  TableContainer,
  TableHead,
  TableRow as _TableRow
} from '@material-ui/core'
import styledEngine from '@mui/styled-engine-sc'
import { Popover } from '@paljs/ui'
import { OrderDetails } from 'components/PageComponents/Orders/components/OrderDetails'
import { useNonInitialEffect } from 'hooks'
import { useState } from 'react'
import { css } from 'styled-components'

function createData(number, item, qty, price) {
  return { number, item, qty, price }
}

export function BasicTable({ columns, rows, getSelections, isOrder = false }) {
  const [selectedIds, setSelectedIds] = useState([])
  const handleSelection = (id) => {
    selectedIds?.length > 0
      ? selectedIds?.includes(id)
        ? setSelectedIds(selectedIds?.filter((item) => item !== id))
        : setSelectedIds([...selectedIds, id])
      : setSelectedIds([id])
  }

  useNonInitialEffect(() => {
    getSelections(selectedIds)
  }, [selectedIds])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: '#bdbdbd' }}>
          <TableRow>
            {columns?.map((column) => (
              <TableCell style={{ fontSize: '1.125rem' }} align="right">
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
                      <TableCell
                        primary
                        align="right"
                        component="th"
                        scope="row"
                        onClick={() => handleSelection(row[0])}
                      >
                        {isOrder ? (
                          <Popover placement="bottom" trigger="hover" overlay={<OrderDetails orderId={row[0]} />}>
                            {item}
                          </Popover>
                        ) : (
                          item
                        )}
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
  )
}

const TableRow = styledEngine(_TableRow)`
    transition: 150ms;

    background-color ${(p) => p.selected && 'rgba(0,149,255,0.25)'};

    &:hover {
        background-color: rgba(0,149,255,0.2);
    }

    &::after {
      content: "-",
      position: absolute;
      top: 0;
      right: 0;
    }
`

const TableCell = styledEngine(_TableCell)`
    transition: 50ms;

    ${(p) =>
      p.primary &&
      css`
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 149, 255, 0.3);
        }
      `}   
`
