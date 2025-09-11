import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import CourtForm from "./CourtForm";
import { getCourtById, updateCourt, deleteCourt } from "../../../api/Courts";

export default function EditCourt() {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetch = async () => {
      const data = await getCourtById(id);
      setCourt(data);
    };
    fetch();
  }, [id]);

  const { mutate: updateCourtMutate, isPending } = useMutation({
    mutationFn: (courtData) => updateCourt(id, courtData),
    onSuccess: (updatedCourt) => {
      toast.success("Court updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["courts"] });
      queryClient.setQueryData(["court", id], updatedCourt);

      navigate("/dashboard/courts");
    },
    onError: () => {
      toast.error("Failed to update court. Please try again.");
    },
  });

  const { mutate: deleteCourtMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCourt(id),
    onSuccess: () => {
      toast.success("Court deleted successfully!");

      queryClient.invalidateQueries({ queryKey: ["courts"] });

      queryClient.removeQueries({ queryKey: ["court", id] });

      navigate("/dashboard/courts");
    },
    onError: () => {
      toast.error("Failed to delete court. Please try again.");
    },
  });
  console.log(court);

  if (!court) return <div>Loading...</div>;

  return (
    <CourtForm
      initialData={court}
      onSubmit={updateCourtMutate}
      onDelete={deleteCourtMutate}
      isEdit
      loading={isPending || isDeleting}
    />
  );
}
