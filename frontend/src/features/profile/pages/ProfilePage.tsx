import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shared/components/CustomJumbotron";
import { PersonalInformationCard } from "../components/PersonalInformationCard";
import { ChangePasswordCard } from "../components/ChangePasswordCard";
import { PreferencesCard } from "../components/PreferencesCard";
import { ChangePhotoCard } from "../components/ChangePhotoCard";
import { Link } from "react-router";

export const ProfilePage = () => {
  return (
    <>
      <CustomJumbotron
        title="Mi perfil"
        subtitle="Datos de la cuenta y seguridad"
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <PersonalInformationCard />
          <ChangePasswordCard />
        </div>
        <div className="flex flex-col gap-4">
          <ChangePhotoCard />
          <PreferencesCard />

          <Link to={"/auth/login"}>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive w-full"
            >
              <LogOut className="size-4" /> Cerrar sesión
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
