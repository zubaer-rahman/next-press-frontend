"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateMyProfile } from "../_actions/profileActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type ProfileFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    profile: {
      bio: string | null;
      profilePhoto: string | null;
    };
  };
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, action, pending] = useActionState(updateMyProfile, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Profile updated!");
    } else {
      toast.error(state.message || "Failed to update profile");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={user.name}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={user.email}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={user.profile?.bio ?? ""}
            className="min-h-24"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profilePhoto">Profile Photo URL</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            defaultValue={user.profile?.profilePhoto ?? ""}
            placeholder="https://..."
          />
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </form>
  );
}
