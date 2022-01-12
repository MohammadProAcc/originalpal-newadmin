import { UserActionsGenerator } from 'types';
import { setUserAction } from './setUser';

export const userActions: UserActionsGenerator = (set) => ({
  ...setUserAction(set),
});
