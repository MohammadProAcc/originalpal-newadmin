import { InputGroup, Select } from '@paljs/ui';
import { Button } from 'components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { search_in, translator } from 'utils';

export function SearchBar({
  entity,
  fields,
  callback,
  params,
}: {
  entity: string;
  params: any;
  fields: string[];
  callback: any;
}) {
  const searchFields = fields?.map((field) => ({ label: translator(field), value: field }));
  const searchTypes = [
    { label: 'موجود', value: 'contain' },
    { label: 'برابر', value: '=' },
  ];

  const { register, handleSubmit, control } = useForm();

  // const onSubmit = async (form: any) => {
  //     const { data: result } = await search_in(entity, form, params)
  //     result.data = result?.data?.filter((item: any) => item?.type === "slide")
  //     callback(result)
  // }

  return (
    <Component onSubmit={handleSubmit(callback)}>
      <Controller
        control={control}
        name="key"
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <StyledSelect
            onChange={({ value }: any) => field.onChange(value)}
            options={searchFields}
            placeholder="فیلد جستجو"
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <StyledSelect
            onChange={({ value }: any) => field.onChange(value)}
            options={searchTypes}
            placeholder="نوع جستجو"
          />
        )}
      />

      <InputGroup>
        <input
          {...register('value', { required: true })}
          style={{
            width: '100%',
            height: '2.25rem',
            margin: '0 0 0 1rem',
          }}
          placeholder="جستجو"
        />
      </InputGroup>

      <Button style={{ display: 'flex', alignItems: 'center' }} type="submit">
        جستجو
      </Button>
    </Component>
  );
}

const Component = styled.form`
  width: 100%;
  margin: 1rem 0;

  display: flex;
  height: 2.5rem;
  padding: 0.25rem;
  background-color: #f1f1f1;
`;

const StyledSelect = styled(Select)`
  width: 20rem;
  margin: 0 0 0 1rem;
`;
