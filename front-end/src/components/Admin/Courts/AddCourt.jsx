import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import CourtForm from "./CourtForm";
import { addCourt } from "../../../api/Courts";

export default function AddCourt() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addCourtMutate, isPending } = useMutation({
    mutationFn: addCourt,
    onSuccess: (newCourt) => {
      toast.success("Court added successfully!");

      queryClient.invalidateQueries({ queryKey: ["courts"] });

      // Seed single court cache so CourtView doesn’t need to refetch
      queryClient.setQueryData(["court", newCourt._id], newCourt);

      navigate("/dashboard/courts");
    },
    onError: () => {
      toast.error("Failed to add court. Please try again.");
    },
  });

  return <CourtForm onSubmit={addCourtMutate} loading={isPending} />;
}
