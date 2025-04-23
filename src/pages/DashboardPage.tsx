import { RolSelector } from "@/components/RolSelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useRtk";
import { firebaseDatabaseService } from "@/services/auth/firebase/FirebaseDatabaseService";
import { fetchUsers } from "@/store/features/users/usersSlice";
import { Trash } from "lucide-react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleRemove = async (id: string) => {
    await firebaseDatabaseService.restoreUserAppData(id);
  };

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
                <th scope="row" className="p-5 text-start">
                  {email}
                </th>
                <td className="p-5 text-white">
                  <div style={{ display: "flex", gap: "1rem" }}>
                    {activeRoles?.map(([rol]) => (
                      <kbd
                        className="rounded p-1"
                        style={{
                          backgroundColor: "#017FC0",
                          textTransform: "capitalize",
                        }}
                        key={`${id}-${rol}`}
                      >
                        {rol.toLocaleLowerCase()}
                      </kbd>
                    ))}
                  </div>
                </td>
                <td className="p-5 flex flex-row gap-1">
                  <RolSelector user={user} initActiveRoles={activeRoles} />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hover:cursor-pointer hover:text-red-300">
                        Restaurar favoritos
                        <Trash />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={() => handleRemove(user.id)}>
                            Confirm
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
