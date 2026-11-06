import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    // we add `last-${numDays}`, so that React Query knows when he needs to refetch the data
    // if `last-${numDays}` is the same, it wont refetch
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
