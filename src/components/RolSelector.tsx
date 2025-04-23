import { useState } from "react";
import { Rol } from "../services/auth/AuthServiceInterface";
import { updateRoles } from "../services/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchUsers } from "@/store/features/users/usersSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { FormattedMessage } from "react-intl";

export const RolSelector = ({ user, initActiveRoles }) => {
  const initialRoles = initActiveRoles?.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {}
  );

  const [roles, setRoles] = useState(initialRoles || {});
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckboxChange = (rol: Rol, checked: boolean) => {
    setRoles((prev) => ({
      ...prev,
      [rol]: checked,
    }));
  };

  const handleButton = async () => {
    await updateRoles(user.id, roles);
    dispatch(fetchUsers());
  };

  const selectedCount = Object.values(roles).filter(Boolean).length;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[200px] justify-start">
            {selectedCount > 0 ? (
              <>
                {selectedCount} <FormattedMessage id="dashboard.roles.select" />
              </>
            ) : (
              <FormattedMessage id="dashboard.roles.select.ph" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>
            <FormattedMessage id="dashboard.roles.select.ph" />
          </DropdownMenuLabel>
          {Object.values(Rol)?.map((rol) => (
            <DropdownMenuItem
              key={rol}
              onSelect={(e) => e.preventDefault()}
              className="focus:bg-accent/50"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={rol}
                  checked={roles[rol] || false}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(rol, !!checked)
                  }
                />
                <Label
                  htmlFor={rol}
                  className="text-sm font-medium leading-none capitalize"
                >
                  {rol.toLowerCase()}
                </Label>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={handleButton}>Actualizar roles</Button>
    </div>
  );
};
