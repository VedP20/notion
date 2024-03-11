import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSettings } from "@/hooks/use-settings";
import React from "react";

const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-bottom pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <Label>Appearence</Label>
              <span className="text-[0.8rem] text-muted-foreground">
                Customize how Jotion looks on your device
              </span>
            </div>
            <ModeToggle />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
