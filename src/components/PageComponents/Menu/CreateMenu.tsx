import { InputGroup, Select as _Select } from '@paljs/ui'
import { AdsMenuForm, TopSiteMenuForm } from 'components'
import Layout from 'Layouts'
import router from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { createMenu } from 'utils'

const menuTypes = [
  { label: 'بالای صفحه', value: 'top-site' },
  { label: 'تبلیغات', value: 'ad' },
  { label: 'پایین صفحه', value: 'bottom-site' },
]

export function CreateMenu() {
  const [loading, setLoading] = useState(false)

  const [selectedType, setSelectedType] = useState<any>(null)

  const createMenuCallback = async (type: 'ad' | 'top-site', form: any) => {
    setLoading(true)

    const response = await createMenu({ ...form, type })
    if (response === null) {
      toast.success('منو با موفقیت ساخته شد')
      router.push('/menu')
    } else {
      toast.error('ساخت منو موفیت آمیز نبود')
    }
    setLoading(false)
  }

  const renderForm = (type: any) => {
    switch (type) {
      case 'top-site':
        return <TopSiteMenuForm loading={loading} callback={console.log} />

      case 'ad':
        return <AdsMenuForm loading={loading} callback={(items: any) => createMenuCallback('ad', items)} />
    }
  }

  return (
    <Layout title="ساخت منو ">
      <H1>
        <span style={{ margin: '0 0 0 1rem' }}>ساخت منو</span>
      </H1>

      <InputGroup>
        <label>نوع منو</label>
        <Select
          options={menuTypes}
          onChange={(e: any) => {
            setSelectedType(e?.value)
          }}
        />
      </InputGroup>

      <hr />
      {renderForm(selectedType)}
    </Layout>
  )
}

const H1 = styled.h1`
  margin-bottom: 2rem;
`

const Select = styled(_Select)`
  width: 20rem;
`
