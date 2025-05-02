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
import { AuthContext } from "@/providers/AuthProvider";
import { firebaseDatabaseService } from "@/services/auth/firebase/FirebaseDatabaseService";
import { clearHouse } from "@/store/features/houseSlice";
import { fetchUsers } from "@/store/features/users/usersSlice";
import { Trash } from "lucide-react";
import { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";

export default function DashboardPage() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleRemove = async (id: string) => {
    await firebaseDatabaseService.restoreUserAppData(id);
    if (user.uid === id) dispatch(clearHouse());
  };

  return (
    <div>
      <table className="striped">
        <thead>
          <tr>
            <th scope="col">
              <FormattedMessage id="dashboard.email" />
            </th>
            <th scope="col">
              <FormattedMessage id="dashboard.roles" />
            </th>
            <th scope="col">
              <FormattedMessage id="dashboard.actions" />
            </th>
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
                        <FormattedMessage id="favs.btn" />
                        <Trash />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          <FormattedMessage id="favs.title" />
                        </DialogTitle>
                        <DialogDescription>
                          <FormattedMessage id="favs.desc" />
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">
                            <FormattedMessage id="favs.cancel" />
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={() => handleRemove(user.id)}>
                            <FormattedMessage id="favs.confirm" />
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
