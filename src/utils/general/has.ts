import { client } from 'utils'

export function has(permissions: string[], target: string) {
  return permissions.some((_permission) => _permission.includes(target))
}

export async function asyncHas(target: string, token?: string) {
  const userProfile = await client(token).get('/dashboard/profile')
  return has(getUserPermissions(userProfile?.data?.data) as any, target)
}

function getUserPermissions(user: any) {
  return Array.from(new Set(user!.roles?.map((_role: any) => _role.permissions).flat()))
}
