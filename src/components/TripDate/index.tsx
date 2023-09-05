import React, { useRef } from "react";
import { useDelayedUnmount } from "@/hooks";
import DatePick from "./DatePicker/DatePicker";

interface IProps {
  show: boolean;
  handleConfirm: (resetStepFlag?: boolean) => void;
  showCta: boolean;
}


const TripDate = (props: IProps) => {
  const isVisible = useDelayedUnmount(props.show);
  if (!isVisible) return;
  return <DatePick />;
};

export default TripDate;
