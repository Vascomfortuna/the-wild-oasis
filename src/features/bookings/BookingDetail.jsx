import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const AlignedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {<BookingDataBox booking={booking} />}

      <ButtonGroup>
        <Modal.Open opens="deleteBooking">
          <Button variation="danger" onClick={moveBack}>
            <AlignedDiv>
              <HiTrash />
              Delete
            </AlignedDiv>
          </Button>
        </Modal.Open>

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check In</Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window name="deleteBooking">
        <ConfirmDelete
          resourceName="bookings"
          disabled={isDeleting}
          onConfirm={() => deleteBooking(id, navigate("/bookings"))}
          // other way to navigate to bookings after deleting
          /*
            onConfirm={() => deleteBooking(id, {
              onSettled: () => navigate("/bookings")
            })}
          */
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
