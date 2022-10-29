import { Button } from '@paljs/ui'
import { Actions } from '@paljs/ui/Actions'
import { breakpointDown } from '@paljs/ui/breakpoints'
import ContextMenu from '@paljs/ui/ContextMenu'
import { EvaIcon } from '@paljs/ui/Icon'
import { LayoutHeader } from '@paljs/ui/Layout'
import Select from '@paljs/ui/Select'
import User from '@paljs/ui/User'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { translator, useUserStore } from 'utils'

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`

const Label = styled.span`
  display: flex;
  align-items: center;
`

const SelectStyled = styled(Select)`
  min-width: 150px;
`

interface HeaderProps {
  toggleSidebar: () => void
  theme: {
    set: (value: DefaultTheme['name']) => void
    value: DefaultTheme['name']
  }
  changeDir: () => void
  dir: 'rtl' | 'ltr'
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter()

  const { user } = useUserStore((state) => ({ user: state?.user }))

  const themeOptions = () => [
    {
      value: 'default',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#a6c1ff' }} />
          Default
        </Label>
      ),
    },
    {
      value: 'dark',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#192038' }} />
          Dark
        </Label>
      ),
    },
    {
      value: 'cosmic',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#5a37b8' }} />
          Cosmic
        </Label>
      ),
    },
    {
      value: 'corporate',
      label: (
        <Label>
          <EvaIcon name="droplet" options={{ fill: '#3366ff' }} />
          Corporate
        </Label>
      ),
      selected: true,
    },
  ]
  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">اوریجینال پل | پنل ادمین</a>
                </Link>
              ),
            },
            {
              content: (
                <SelectStyled
                  instanceId="react-select-input"
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions().find((item) => item.value === props.theme.value)}
                  options={themeOptions()}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                />
              ),
            },
            // {
            //     content: (
            //         <Button size="Small" onClick={() => props.changeDir()}>
            //             {props.dir}
            //         </Button>
            //     ),
            // },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            // {
            //   content: (
            //     <a
            //       className="left"
            //       href={`https://github.com/paljs/nextjs-admin-template`}
            //       target="_blank"
            //       rel="noreferrer"
            //     >
            //       <span className="github">Support us in GitHub</span>
            //       <img src={`https://badgen.net/github/stars/paljs/nextjs-admin-template`} />
            //     </a>
            //   ),
            // },
            // {
            //   content: (
            //     <a href="https://discord.gg/NRmdvDxsT8" target="_blank" rel="noreferrer">
            //       <img height="20" src="/discord.svg" alt="slack" />
            //     </a>
            //   ),
            // },
            // {
            //   icon: 'twitter',
            //   url: { href: 'https://twitter.com/AhmedElywh', target: '_blank' },
            // },
            {
              content: (
                <ContextMenu
                  nextJs
                  style={{ cursor: 'pointer' }}
                  placement="bottom"
                  currentPath={router.pathname}
                  items={[
                    { title: 'Profile', link: { href: '/modal-overlays/tooltip' } },
                    { title: 'خروج', link: { href: '/logout' } },
                  ]}
                  Link={Link}
                >
                  <User
                    image="url('/icons/icon-72x72.png')"
                    name={`${user?.user.name} ${user?.user?.lastname}`}
                    title={translator(user?.user.role?.[0] ?? "")}
                    size="Medium"
                  />
                </ContextMenu>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  )
}
export default Header
