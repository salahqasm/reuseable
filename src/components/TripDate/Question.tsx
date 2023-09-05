import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import {
  Card as CardTemplate,
  confirmButtonAnimate,
} from "../styles";
import { useDelayedUnmount, useFlyAnimation } from "@/hooks";
import { motion } from "framer-motion";


interface IProps {
  handleConfirm: (resetStepFlag?: boolean) => void;
  showCta: boolean;
  disableCta: boolean;
}


const InfomationWrapper = styled.div`
display: flex;
max-width: 425px;
flex-direction: column;
gap: 1rem;
width: 50%;
`;

const Footer = styled.div`
opacity: 0;
width: 100%;
max-width: 425px;
display: flex;
flex-direction: column;
gap: 1rem;
margin-top: auto;
p {
  color: #fff;
  font-size: 1.25rem;
}
`;

const ButtonWrapper = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: 1rem;
justify-content: center;
`;

const ConfirmButton = styled(motion.button)`
  all: unset;
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 2rem;
  border-radius: 42px;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ffffff;
  &.confirm {
    border: unset;
    background: #4b0cff;
    box-shadow: 0px 24px 24px rgba(24, 27, 126, 0.58);
    animation: 1s ease-in 1s infinite alternate-reverse ${confirmButtonAnimate};
  }
`;
const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: ${props => props.width || 'auto'};
`;
const SelectMonth = styled.select`
padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width:70%;
  
`;

const FooterSection = ({
  handleConfirm,
  disableCta
}: {
  handleConfirm: (resetStepFlag?: boolean) => void;
  disableCta: boolean;
}) => {
  const footerRef = useRef<HTMLDivElement>(null);
  useFlyAnimation(footerRef, footerRef, true);

  const handleConfirmCallback = useCallback(() => {
    handleConfirm();
  }, [handleConfirm]);


  return (
    <Footer ref={footerRef}>
      <p>Please select your preferred month and day</p>
      <ButtonWrapper>
        <SelectMonth id="month" name="month" >
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </SelectMonth>
        <InputField type="number" max={31} min={1} />
      </ButtonWrapper>

      <ButtonWrapper>
        <ConfirmButton
          className="confirm"
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmCallback}
          disabled={disableCta}
        >
          Confirm
        </ConfirmButton>

      </ButtonWrapper>
    </Footer>
  );
};

const Question = ({
  handleConfirm,
  showCta,
  disableCta,
}: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFlyAnimation(modalRef, modalRef, true);
  const isCtaVisible = useDelayedUnmount(showCta);

  return (
    <InfomationWrapper>
      {isCtaVisible && (
        <FooterSection
          handleConfirm={handleConfirm}
          disableCta={disableCta}
        />
      )}
    </InfomationWrapper>
  );
};

export default Question;
