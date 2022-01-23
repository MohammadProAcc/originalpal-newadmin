import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core"
import { Popover } from "@paljs/ui";
import { OrderDetails } from "components/PageComponents/Orders/components/OrderDetails";

function createData(number, item, qty, price) {
    return { number, item, qty, price };
}

const rows = [
    createData(1, "Apple", 5, 3),
    createData(2, "Orange", 2, 2),
    createData(3, "Grapes", 3, 1),
    createData(4, "Tomato", 2, 1.6),
    createData(5, "Mango", 1.5, 4)
];

export function BasicTable({ columns, rows, isOrder = false }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead style={{ backgroundColor: "#bdbdbd" }}>
                    <TableRow>
                        {
                            columns?.map(column => <TableCell style={{ fontSize: "1.125rem" }} align="right">{column}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <>
                            {
                                <TableRow key={row.number}>
                                    {
                                        row.map((item, index) => index === 0
                                            ? (
                                                <TableCell align="right" component="th" scope="row">
                                                    {
                                                        isOrder
                                                            ? (
                                                                <Popover
                                                                    placement="bottom"
                                                                    trigger="hover"
                                                                    overlay={<OrderDetails orderId={row[0]} />}
                                                                >
                                                                    {item}
                                                                </Popover>
                                                            )
                                                            : (item)
                                                    }
                                                </TableCell>
                                            )
                                            : (
                                                <TableCell align="right">{item}</TableCell>
                                            )
                                        )
                                    }
                                </TableRow>
                            }

                        </>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}