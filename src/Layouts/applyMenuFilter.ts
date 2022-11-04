import { CurrentItems } from './menuItem'
import _ from 'lodash'
import { has } from 'utils'

export function applyMenuFilter(menuItem: CurrentItems, permissions: string[]) {
  const filtered: any =
    menuItem.map((_item) => {
      switch (_item.title) {
        case 'داشبورد':
          return _item
        case 'عمومی':
          return has(permissions, 'menu')
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'menu');
                  case 1:
                    return has(permissions, 'main-page-section');
                  default:
                    return false;
                }
              })
            }
            : null
        case 'بنر ها':
          return has(permissions, 'banners')
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'stand');
                  case 1:
                    return has(permissions, 'slide');
                  default:
                    return false;
                }
              })
            }
            : null
        case 'انبار':
          return has(permissions, 'banners')
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'brand');
                  case 1:
                    return has(permissions, 'tag');
                  case 2:
                    return has(permissions, 'product');
                  case 3:
                    return has(permissions, 'stock');
                  case 4:
                    return has(permissions, 'coupon');
                  default:
                    return false;
                }
              })
            }
            : null
        case 'کاربران':
          return has(permissions, 'users')
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'user');
                  case 1:
                    return has(permissions, 'order');
                  case 2:
                    return has(permissions, 'payment');
                  case 3:
                    return has(permissions, 'address');
                  case 4:
                    return has(permissions, 'comment');
                  case 5:
                    return has(permissions, 'role');
                  default:
                    return false;
                }
              })
            }
            : null
        case 'وبلاگ و اخبار':
          return has(permissions, 'blog-and-news')
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'blog-category');
                  case 1:
                    return has(permissions, 'post');
                  default:
                    return false;
                }
              })
            }
            : null
        case 'ابزار':
          return has(permissions, 'aggregate-discount')
            || has(permissions, 'sms')
            || has(permissions, 'user-details')
            || has(permissions, "export")
            ? {
              ..._item, children: _item.children?.filter((_child, index) => {
                switch (index) {
                  case 0:
                    return has(permissions, 'aggregate-discount');
                  case 1:
                    return has(permissions, 'sms');
                  case 2:
                    return has(permissions, 'user-details');
                  case 3:
                    return has(permissions, 'export');
                  default:
                    return false;
                }
              })
            }
            : null
        default:
          return null
      }
    }).filter((_item: any) => !!_item)

  return filtered;
}

