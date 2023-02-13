import { MutableRefObject, useCallback } from "react";
import styled from "styled-components";
import { translator } from "utils";

type Obj = { [key: string]: any };

export function TableForExport(props: TableForExportProps) {
  console.log(props.upperRef)
  const expand = useCallback((table: Obj[], id?: string, fields?: string[], ref?: any) => {
    return (
      <Table id={id} ref={ref}>
        <thead>
          <tr>
            {Object.keys(table[0])
              .filter((_key) => (fields ? fields.includes(_key) : true))
              .map((_key) => (
                <th>{translator(_key)}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {table.map((_item: any) => (
            <tr>
              {Object.entries(_item)
                .filter(([_key]) => (fields ? fields.includes(_key) : true))
                .map(([_key, _value]) =>
                  typeof _value === "object" ? <td>{expand([_value ?? {}])}</td> : <td>{String(_value)}</td>,
                )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }, []);

  return expand(props.data, "Table2XLSX", props.fields, props.upperRef);
}

interface TableForExportProps {
  data: any[];
  fields: string[];
  upperRef: MutableRefObject<any>;
}

const Table = styled.table`
  border: 1px solid;

  th,
  td {
    padding: 0 0.5rem;
    border: 1px solid;
  }

  td {
    white-space: nowrap;
  }
`;
