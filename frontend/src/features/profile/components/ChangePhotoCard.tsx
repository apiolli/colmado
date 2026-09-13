import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ChangePhotoCard = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
        <Avatar className="size-20">
          <AvatarFallback className="bg-primary text-xl text-primary-foreground">
            CD
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">César Augusto Díaz</p>
          <p className="text-xs text-muted-foreground">cesar@stockflow.app</p>
        </div>
        <Badge variant="secondary">Administrador</Badge>
        <Button variant="outline" size="sm" className="mt-1">
          Cambiar foto
        </Button>
      </CardContent>
    </Card>
  );
};
