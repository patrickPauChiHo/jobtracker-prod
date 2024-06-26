import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { useToast } from "./ui/use-toast";

const DeleteJobBtn = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "there was an error",
        });
        return;
      }
      {
        /* invalidate the query becasue i dont want the cached data still here 
    so need to delete it to prevent it shows up on the UI 
    "invalidate and refetch" */
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast({ description: "job removed" });
    },
  });
  return (
    <Button size="sm" disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? "deleting" : "delete"}
    </Button>
  );
};

export default DeleteJobBtn;
