import UserCreationMutation from './UserCreationMutation';
import AssignGroupMutation from './AssignGroupMutation';
import UserToGroupOwner from './UserToGroupOwnerMutation';

export default {
  createUser: UserCreationMutation,
  assignGroup: AssignGroupMutation,
  userToGroupOwner: UserToGroupOwner,
};
