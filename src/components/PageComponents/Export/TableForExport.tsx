import { translator } from "utils";

export function TableForExport(props: { data: any[] }) {

  return (
    <table id="Table2XLSX" style={{ display: "none" }}>
      <thead>
        <tr>
          {
            Object.keys(props.data[0]).map(key => (
              <th>
                {translator(key)}
              </th>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          props.data.map((_item: any) =>
            <tr>
              {
                Object.entries(_item).map(([_key, _value]) => (
                  <td>
                    {String(_value)}
                  </td>
                ))
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}
