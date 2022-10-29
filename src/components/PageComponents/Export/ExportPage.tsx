import { Button, InputGroup } from "@paljs/ui";
import Layout from "Layouts"
import { useState } from "react"
import Select from "react-select"
import styled from "styled-components";
import { getUsersList } from "utils";

export function ExportPage() {

  const [exportType, setExportType] = useState(exportTypeOptions[0]);
  function exportTypeHandler(e: any) {
    setExportType(e ?? exportTypeOptions[0])
  }

  const [entityToExport, setEntityToExport] = useState(entityToExportOptions[0]);
  function entityToExportHandler(e: any) {
    setEntityToExport(e ?? entityToExportOptions[0])
  }

  async function onExport() {
    switch (entityToExport.value) {
      case 'users':
        const response = await getUsersList();
        console.log(response);
        break;
      default:
        break;
    }
  }

  return (
    <Layout title="خروجی">
      <SelectionList>
        <SelectionItem>
          <InputGroup>
            <label>نوع خروجی :</label>
            <Select
              options={exportTypeOptions}
              onChange={exportTypeHandler}
            />
          </InputGroup>
        </SelectionItem>

        <SelectionItem>
          <InputGroup>
            <label>هدف خروجی :</label>
            <Select
              options={entityToExportOptions}
              onChange={entityToExportHandler}
            />
          </InputGroup>
        </SelectionItem>
      </SelectionList>

      <Button status="Success" onClick={onExport}>
        گرفتن خروجی
      </Button>
    </Layout>
  )
}

const exportTypeOptions = [
  { "label": "PDF", "value": "pdf" },
  { "label": "Excel", "value": "xsl" },
]

const entityToExportOptions = [
  { "label": "کاربران", "value": "users" },
  { "label": "سفارشات", "value": "orders" },
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
