import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';

export function OrderNotes(props: OrderNotesProps) {

  const pRef = useRef<any>(null);

  useEffect(() => {
    pRef.current!.innerHTML = props.notes;
  }, [])

  return <Div ref={pRef}></Div>
}

interface OrderNotesProps {
  notes: string
}

const Div = styled.div`
  p {
    display: inline-block;
    
    margin-left: 1rem;
  }
`
