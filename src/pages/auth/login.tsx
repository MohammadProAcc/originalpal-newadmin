import { Button } from '@paljs/ui/Button'
import { InputGroup } from '@paljs/ui/Input'
import Auth, { Group } from 'components/Auth'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import Link from 'next/link'
import router from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { initialLoginResponseUser } from 'types'
import { login, useUserStore } from 'utils'

export default function Login() {
  const { setUser } = useUserStore((state) => ({
    setUser: state?.setUser,
  }))

  // const onCheckbox = () => {
  // v will be true or false
  // };

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm()

  const onFormSubmit = async (form: { username: string; password: string }) => {
    setLoading(true)
    const user = await login(form)
    if (user !== null) {
      Cookies.set('token', user.token)
      setUser!(user ?? initialLoginResponseUser)
      toast.success('خوش آمدید')
      router.push('/dashboard')
    } else {
      toast.error('ورود موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ورود">
      <Auth title="ورود" subTitle="">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <InputGroup fullWidth>
            <input {...register('username', { required: true })} type="email" placeholder="ایمیل" />
          </InputGroup>
          <InputGroup fullWidth>
            <input {...register('password', { required: true })} type="password" placeholder="رمز عبور" />
          </InputGroup>
          <Group>
            {/* <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox> */}
            <Link href="/auth/request-password">
              <a>رمز عبور خود را فراموش کرده ام</a>
            </Link>
          </Group>
          <Button status="Success" type="submit" disabled={loading} shape="SemiRound" fullWidth>
            {loading ? '...' : 'ورود'}
          </Button>
        </form>
        {/* <Socials /> */}
        {/* <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p> */}
      </Auth>
    </Layout>
  )
}
