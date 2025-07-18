import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getGroups, getRoles, saveGroups, saveRoles } from './localStorage';

interface GroupRole {
  group_id: number;
  user_id: string;
  role: string;
}

interface Group {
  group_id: number;
  group_name: string;
  date_created: string;
}

// Mock group operations using local storage
const getUserGroupRole = async (userId: string): Promise<GroupRole | null> => {
  const roles = await getRoles();
  return roles.find((role) => role.user_id === userId) || null;
};

const getGroupRoles = async (groupId: number): Promise<GroupRole[]> => {
  const roles = await getRoles();
  return roles.filter((role) => role.group_id === groupId);
};

const addUserToGroup = async (
  userId: string,
  groupId: number,
  role: string
): Promise<GroupRole> => {
  const roles = await getRoles();

  const newRole: GroupRole = {
    group_id: groupId,
    user_id: userId,
    role: role
  };

  const updatedRoles = [...roles, newRole];
  await saveRoles(updatedRoles);

  console.log('User added to group locally:', newRole);
  return newRole;
};

export const useUserGroup = (userId: string) => {
  const { data: userGroupRole, isLoading: userGroupRoleIsLoading } =
    useQuery<GroupRole | null>({
      queryKey: ['userGroupRole', userId],
      queryFn: () => getUserGroupRole(userId),
      enabled: !!userId
    });

  return { userGroupRole, userGroupRoleIsLoading };
};

export const useGroup = (groupId: number) => {
  const { data: roles, isLoading: rolesAreLoading } = useQuery<GroupRole[]>({
    queryKey: ['groupRoles', groupId],
    queryFn: () => getGroupRoles(groupId),
    enabled: !!groupId
  });

  return { roles, rolesAreLoading };
};

export const useGroupMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  const { mutate: addUserToGroupMutation } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      addUserToGroup(userId, groupId, role),
    onSuccess: () => {
      console.log('User added to group successfully');
      queryClient.invalidateQueries({ queryKey: ['groupRoles', groupId] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to add user to group. Code:', err);
    }
  });

  return { addUserToGroupMutation };
};
