import { Button, InputGroup } from '@paljs/ui'
import { useFetchAll, useLoading, useNonInitialEffect } from 'hooks'
import Layout from 'Layouts'
import { useState } from 'react'
import _Select from 'react-select'
import styled from 'styled-components'
import { getUsersList, getOrdersList } from 'utils'
import { TableForExport } from './TableForExport'
import { utils, writeFile } from 'xlsx'

export function ExportPage() {
  const [result, setResult] = useState<any>(null)
  const [loadingList, toggleLoading] = useLoading()

  const [exportType, setExportType] = useState(exportTypeOptions[0])
  function exportTypeHandler(e: any) {
    setExportType(e ?? exportTypeOptions[0])
  }

  const [entityToExport, setEntityToExport] = useState(entityToExportOptions[0])
  function entityToExportHandler(e: any) {
    setEntityToExport(e ?? entityToExportOptions[0])
  }
  const xport = async () => {
    const table = document.getElementById('Table2XLSX')
    const wb = utils.table_to_book(table)

    writeFile(wb, 'SheetJSTable.xlsx')
  }

  async function onExport() {
    toggleLoading('exporting')
    let response

    switch (entityToExport.value) {
      case 'users':
        response = await getUsersList()
        if (response) {
          const all = await useFetchAll(response.data.last_page, getUsersList);
          console.log(all);
        }
        break

      case 'orders':
        response = await getOrdersList()
        if (response) {
          const allData = await useFetchAll(response.data.last_page, getOrdersList)
          setResult(allData)
        }
        break

      default:
        break
    }

    toggleLoading('exporting')
  }

  useNonInitialEffect(() => {
    if (result) xport()
  }, [result])

  return (
    <Layout title="خروجی">
      <SelectionList>
        <SelectionItem>
          <InputGroup fullWidth>
            <label>نوع خروجی :</label>
            <Select options={exportTypeOptions} defaultValue={exportTypeOptions[0]} onChange={exportTypeHandler} />
          </InputGroup>
        </SelectionItem>

        <SelectionItem>
          <InputGroup fullWidth>
            <label>هدف خروجی :</label>
            <Select
              options={entityToExportOptions}
              defaultValue={entityToExportOptions[0]}
              onChange={entityToExportHandler}
            />
          </InputGroup>
        </SelectionItem>
      </SelectionList>

      <Button status="Success" onClick={onExport} disabled={loadingList.includes('exporting')}>
        گرفتن خروجی
      </Button>

      {result && <TableForExport data={result} />}
    </Layout>
  )
}

const exportTypeOptions = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Excel', value: 'xsl' },
]

const entityToExportOptions = [
  { label: 'کاربران', value: 'users' },
  { label: 'سفارشات', value: 'orders' },
]

const SelectionList = styled.ul`
  padding: 0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid gray;

  display: flex;
  gap: 1rem;
`

const SelectionItem = styled.li`
  list-style: none;
`

const Select = styled(_Select)`
  min-width: 10rem;
`
