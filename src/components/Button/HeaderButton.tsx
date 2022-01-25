import styledEngineSc from '@mui/styled-engine-sc'
import { Button as _Button, Status } from '@paljs/ui'
import Link from 'next/link'
import styled from 'styled-components'

interface IHeaderButtonProps {
  href?: string
  [key: string]: any
}
export const HeaderButton: React.FC<IHeaderButtonProps> = ({ children, href, ...props }) => (
  <>
    {href ? (
      <Link href={href}>
        <Button {...props} style={{ marginRight: '1rem' }}>
          {children}
        </Button>
      </Link>
    ) : (
      <Button {...props} style={{ marginRight: '1rem' }}>
        {children}
      </Button>
    )}
  </>
)

const Button = styledEngineSc(_Button)`
        height: 3rem;

        margin: auto 0;
`
