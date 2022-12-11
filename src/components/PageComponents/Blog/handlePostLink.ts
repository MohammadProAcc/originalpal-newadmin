import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { toast } from 'react-toastify'
import { PostLink } from 'types'

export const postLinkOptions = [
  { label: 'توئیتر', value: 'twitter' },
  { label: 'پینترست', value: 'pinterest' },
  { label: 'فیسبوک', value: 'facebook' },
]

export function handlePostLink(
  postLinkToAdd: PostLink | null,
  getter: any,
  setter: any,
  clearCallback: any,
) {
  if (postLinkToAdd && postLinkToAdd.href && postLinkToAdd.name) {
    if (getter('post_links')?.length > 0) {
      const exists = !!getter('post_links').find((_item: PostLink) => _item.name === postLinkToAdd.name)
      const newValue = exists
        ? getter('post_links').map((item: PostLink) => (item.name === postLinkToAdd.name ? postLinkToAdd : item))
        : getter('post_links').concat([postLinkToAdd])
      setter(newValue)
    } else {
      setter([postLinkToAdd])
    }
    clearCallback()
    toast.success('پیوند با موفقیت اضافه شد')
  } else if (postLinkToAdd && postLinkToAdd.href && !postLinkToAdd.name) {
    toast.warn('لطفا نام پیوند را وارد کنید')
  } else if (postLinkToAdd && postLinkToAdd.name && !postLinkToAdd.href) {
    toast.warn('لطفا پیوند را وارد کنید')
  } else {
    toast.warn('لطفا نام و پیوند را وارد کنید')
  }
}
