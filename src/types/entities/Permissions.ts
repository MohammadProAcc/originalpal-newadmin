export type Permission =
  | 'browse-amin'
  | 'browse-bread'
  | 'browse-database'
  | 'browse-media'
  | 'browse-compass'
  | 'browse-hooks'
  | 'browse-menu'
  | 'read-menu'
  | 'edit-menu'
  | 'add-menu'
  | 'delete-menu'
  | 'browse-role'
  | 'read-role'
  | 'edit-role'
  | 'add-role'
  | 'delete-role'
  | 'browse-user'
  | 'read-user'
  | 'edit-user'
  | 'add-user'
  | 'delete-user'
  | 'browse-settings'
  | 'read-settings'
  | 'edit-settings'
  | 'add-settings'
  | 'delete-settings'
  | 'browse-stock'
  | 'read-stock'
  | 'edit-stock'
  | 'add-stock'
  | 'delete-stock'
  | 'browse-product'
  | 'read-product'
  | 'edit-product'
  | 'add-product'
  | 'delete-product'
  | 'browse-brand'
  | 'read-brand'
  | 'edit-brand'
  | 'add-brand'
  | 'delete-brand'
  | 'browse-order'
  | 'read-order'
  | 'edit-order'
  | 'add-order'
  | 'delete-order'
  | 'browse-payment'
  | 'read-payment'
  | 'edit-payment'
  | 'add-payment'
  | 'delete-payment'
  | 'browse-store'
  | 'read-store'
  | 'edit-store'
  | 'add-store'
  | 'delete-store'
  | 'browse-category'
  | 'read-category'
  | 'edit-category'
  | 'add-category'
  | 'delete-category'
  | 'browse-gateway-transaction'
  | 'read-gateway-transaction'
  | 'edit-gateway-transaction'
  | 'add-gateway-transaction'
  | 'delete-gateway-transaction'
  | 'browse-melli-transaction'
  | 'read-melli-transaction'
  | 'edit-melli-transaction'
  | 'add-melli-transaction'
  | 'delete-melli-transaction'
  | 'browse-post'
  | 'read-post'
  | 'edit-post'
  | 'add-post'
  | 'delete-post'
  | 'browse-news'
  | 'read-news'
  | 'edit-news'
  | 'add-news'
  | 'delete-news'
  | 'browse-blog'
  | 'read-blog'
  | 'edit-blog'
  | 'add-blog'
  | 'delete-blog'
  | 'browse-set'
  | 'read-set'
  | 'edit-set'
  | 'add-set'
  | 'delete-set'
  | 'browse-coupon'
  | 'read-coupon'
  | 'edit-coupon'
  | 'add-coupon'
  | 'delete-coupon'
  | 'browse-comment'
  | 'read-comment'
  | 'edit-comment'
  | 'add-comment'
  | 'delete-comment'
  | 'browse-stand'
  | 'read-stand'
  | 'edit-stand'
  | 'add-stand'
  | 'delete-stand'
  | 'browse-address'
  | 'read-address'
  | 'edit-address'
  | 'add-address'
  | 'delete-address'
  | 'browse-order-item'
  | 'read-order-item'
  | 'edit-order-item'
  | 'add-order-item'
  | 'delete-order-item'

export const PERMISSIONS = [
  'browse-amin',
  'browse-bread',
  'browse-database',
  'browse-media',
  'browse-compass',
  'browse-hooks',

  'aggregate-discount',
  'sms',
  'user-details',
  'export',

  'general',

  'browse-menu',
  'read-menu',
  'edit-menu',
  'add-menu',
  'delete-menu',

  'browse-main-page-section',
  'read-main-page-section',
  'edit-main-page-section',
  'add-main-page-section',
  'delete-main-page-section',

  'banners',

  'browse-stand',
  'read-stand',
  'edit-stand',
  'add-stand',
  'delete-stand',

  'browse-slide',
  'read-slide',
  'edit-slide',
  'add-slide',
  'delete-slide',

  'stocks',

  'browse-brand',
  'read-brand',
  'edit-brand',
  'add-brand',
  'delete-brand',

  'browse-tag',
  'read-tag',
  'edit-tag',
  'add-tag',
  'delete-tag',

  'browse-product',
  'read-product',
  'edit-product',
  'add-product',
  'delete-product',

  'browse-stock',
  'read-stock',
  'edit-stock',
  'add-stock',
  'delete-stock',

  'browse-coupon',
  'read-coupon',
  'edit-coupon',
  'add-coupon',
  'delete-coupon',

  'users',

  'browse-user',
  'read-user',
  'edit-user',
  'add-user',
  'delete-user',

  'browse-order',
  'read-order',
  'edit-order',
  'add-order',
  'delete-order',

  'browse-order-item',
  'read-order-item',
  'edit-order-item',
  'add-order-item',
  'delete-order-item',

  'browse-gateway-transaction',
  'read-gateway-transaction',
  'edit-gateway-transaction',
  'add-gateway-transaction',
  'delete-gateway-transaction',

  'browse-melli-transaction',
  'read-melli-transaction',
  'edit-melli-transaction',
  'add-melli-transaction',
  'delete-melli-transaction',

  'browse-address',
  'read-address',
  'edit-address',
  'add-address',
  'delete-address',

  'browse-comment',
  'read-comment',
  'edit-comment',
  'add-comment',
  'delete-comment',

  'browse-role',
  'read-role',
  'edit-role',
  'add-role',
  'delete-role',

  'blog-and-news',

  'browse-blog',
  'read-blog',
  'edit-blog',
  'add-blog',
  'delete-blog',

  'read-news',
  'edit-news',
  'add-news',
  'delete-news',

  'browse-post',
  'read-post',
  'edit-post',
  'add-post',
  'delete-post',

  'browse-blog-category',
  'read-blog-category',
  'edit-blog-category',
  'add-blog-category',
  'delete-blog-category',

  'browse-settings',
  'read-settings',
  'edit-settings',
  'add-settings',
  'delete-settings',

  'browse-payment',
  'read-payment',
  'edit-payment',
  'add-payment',
  'delete-payment',

  'browse-store',
  'read-store',
  'edit-store',
  'add-store',
  'delete-store',

  'browse-set',
  'read-set',
  'edit-set',
  'add-set',
  'delete-set',

]

export enum PermissionEnum {

  browseAmin = 'browse-amin',
  browseBread = 'browse-bread',
  browseDatabase = 'browse-database',
  browseMedia = 'browse-media',
  browsecompass = 'browse-compass',
  browsehooks = 'browse-hooks',

  aggregateDiscount = 'aggregate-discount',
  sms = 'sms',
  userDetails = 'user-details',
  export = 'export',

  general = 'general',

  browseMenu = 'browse-menu',
  readMenu = 'read-menu',
  editMenu = 'edit-menu',
  addMenu = 'add-menu',
  deleteMenu = 'delete-menu',

  browseMainPageSection = 'browse-main-page-section',
  readMainPageSection = 'read-main-page-section',
  editMainPageSection = 'edit-main-page-section',
  addNainPageSection = 'add-main-page-section',
  deleteMainPageSection = 'delete-main-page-section',

  banners = 'banners',

  browseStand = 'browse-stand',
  readStand = 'read-stand',
  editStand = 'edit-stand',
  addStand = 'add-stand',
  deleteStand = 'delete-stand',

  browseSlide = 'browse-slide',
  readSlide = 'read-slide',
  editSlide = 'edit-slide',
  addSlide = 'add-slide',
  deleteSlide = 'delete-slide',

  stocks = 'stocks',

  browseBrand = 'browse-brand',
  readBrand = 'read-brand',
  editBrand = 'edit-brand',
  addBrand = 'add-brand',
  deleteBrand = 'delete-brand',

  browseTag = 'browse-tag',
  readTag = 'read-tag',
  editTag = 'edit-tag',
  addTag = 'add-tag',
  deleteTag = 'delete-tag',

  browseProduct = 'browse-product',
  readProduct = 'read-product',
  editProduct = 'edit-product',
  addProduct = 'add-product',
  deleteProduct = 'delete-product',

  browseStock = 'browse-stock',
  readStock = 'read-stock',
  editStock = 'edit-stock',
  addStock = 'add-stock',
  deleteStock = 'delete-stock',

  browseCoupon = 'browse-coupon',
  readCoupon = 'read-coupon',
  editCoupon = 'edit-coupon',
  addCoupon = 'add-coupon',
  deleteCoupon = 'delete-coupon',

  users = 'users',

  browseUser = 'browse-user',
  readUser = 'read-user',
  editUser = 'edit-user',
  addUser = 'add-user',
  deleteUser = 'delete-user',

  browseOrder = 'browse-order',
  readOrder = 'read-order',
  editOrder = 'edit-order',
  addOrder = 'add-order',
  deleteOrder = 'delete-order',

  browseOrderItem = 'browse-order-item',
  readOrderOtem = 'read-order-item',
  editOrderItem = 'edit-order-item',
  addOrderitem = 'add-order-item',
  deleteOrderitem = 'delete-order-item',

  browseQatewayTransaction = 'browse-gateway-transaction',
  readGatewayTransaction = 'read-gateway-transaction',
  editGatewayTransaction = 'edit-gateway-transaction',
  addGatewayTransaction = 'add-gateway-transaction',
  deleteGatewayTransaction = 'delete-gateway-transaction',

  browseMelliTransaction = 'browse-melli-transaction',
  readMelliTransaction = 'read-melli-transaction',
  editMelliTransaction = 'edit-melli-transaction',
  addMelliTransaction = 'add-melli-transaction',
  deleteMelliTransaction = 'delete-melli-transaction',

  browseAddress = 'browse-address',
  readAddress = 'read-address',
  editAddress = 'edit-address',
  addAddress = 'add-address',
  deleteAddress = 'delete-address',

  browseComment = 'browse-comment',
  readComment = 'read-comment',
  editComment = 'edit-comment',
  addComment = 'add-comment',
  deleteComment = 'delete-comment',

  browseRole = 'browse-role',
  readRole = 'read-role',
  editRole = 'edit-role',
  addRole = 'add-role',
  deleteRole = 'delete-role',

  blogAndNews = 'blog-and-news',

  browseBlog = 'browse-blog',
  readBlog = 'read-blog',
  editBlog = 'edit-blog',
  addBlog = 'add-blog',
  deleteBlog = 'delete-blog',

  readNews = 'read-news',
  editNews = 'edit-news',
  addNews = 'add-news',
  deleteNews = 'delete-news',

  browsePost = 'browse-post',
  readPost = 'read-post',
  editPost = 'edit-post',
  addPost = 'add-post',
  deletePost = 'delete-post',

  browseBlogCategory = 'browse-blog-category',
  readBlogCategory = 'read-blog-category',
  editBlogCategory = 'edit-blog-category',
  addBlogCategory = 'add-blog-category',
  deleteBlogCategory = 'delete-blog-category',

  browseSettings = 'browse-settings',
  readSettings = 'read-settings',
  editSettings = 'edit-settings',
  addSettings = 'add-settings',
  deleteSettings = 'delete-settings',

  browsePayment = 'browse-payment',
  readPayment = 'read-payment',
  editPayment = 'edit-payment',
  addPayment = 'add-payment',
  deletePayment = 'delete-payment',

  browseStore = 'browse-store',
  readStore = 'read-store',
  editStore = 'edit-store',
  addStore = 'add-store',
  deleteStore = 'delete-store',

  browseSet = 'browse-set',
  readSet = 'read-set',
  editSet = 'edit-set',
  addSet = 'add-set',
  deleteSet = 'delete-set',

}
