
"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function BackupButton() {
    const { toast } = useToast();

    const handleCreateBackup = () => {
        toast({
            title: "Backup Started",
            description: "A full system backup is being created in the background."
        });
    }

    return (
        <Button size="lg" onClick={handleCreateBackup}><PlusCircle className="mr-2"/> Create Backup Now</Button>
    )
}
