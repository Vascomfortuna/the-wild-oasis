import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: (data) => {
      toast.success("Booking sucessfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      data?.onSuccess();
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteBooking,
  };
}
