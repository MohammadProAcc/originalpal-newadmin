import { admin } from 'utils/api/AdminApi'

export async function $_send_sms(data: SendSms) {
  try {
    const response = await admin().post('/sms', data)
    return response
  } catch (err) {
    return new Error('Request Failed')
  }
}

interface SendSms {
  type: 'template' | 'simple'
  phone_numbers: string[]
  content: string
  tokens: string[]
}
