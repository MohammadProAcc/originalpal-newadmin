import { toast } from 'react-toastify'

export const removeItem = async (
  entity: string,
  removeId: any,
  removeCallback: any,
  clearCallback: any,
  toastMessege: [success: string, error: string],
) => {
  const response = await removeCallback(removeId)
  if (response?.status === 'success') {
    clearCallback && (await clearCallback(entity, removeId))
    await toast.success(toastMessege[0])
  } else {
    await toast.error(toastMessege[1])
  }
}
