import { RolSelector } from "@/components/RolSelector";
import { fetchUsers } from "@/store/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { useEffect } from "react";

export default function DashboardPage() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <table className="striped">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            const { id, email, roles } = user;
            const activeRoles = roles
              ? Object.entries(roles)?.filter(([_, value]) => value)
              : [];
            return (
              <tr key={id}>
                <th scope="row" className="p-5 text-start">{email}</th>
                <td className="p-5 text-white">
                  <div style={{display: 'flex', gap: '1rem'}}>
                    {activeRoles?.map(([rol]) => (
                      <kbd className="rounded p-1" style={{backgroundColor: '#017FC0', textTransform: 'capitalize'}} key={`${id}-${rol}`}>{rol.toLocaleLowerCase()}</kbd>
                    ))}
                  </div>
                </td>
                <td className="p-5">
                  <RolSelector user={user} initActiveRoles={activeRoles}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}