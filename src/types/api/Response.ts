export type Response<T> = {
  status: 'success' | 'failed';
  data: T;
};
