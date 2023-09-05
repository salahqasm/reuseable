import React, { useEffect, useRef, useState } from 'react'
import styles from "./DatePicker.module.scss"
import FadeIn from '@/components/FadeIn';
import { useCitiesInterests } from '@/assets/zustand/CitiesInterests/Store';
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let days = Array.from({ length: 31 }, (_, i) => i + 1);
interface Dateobj {
  month: string;
  day: string;
}

export default function DatePick() {
  const useStore = useCitiesInterests();
  const animation = useRef<gsap.core.Tween>();
  const monthsRef = useRef(null);
  const dayRef = useRef(null);
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth() - 2];
  const currentDay = currentDate.getDate() - 2;

  const [date, setDate] = useState<Dateobj>({ month: currentMonth, day: currentDay.toString() });

  useEffect(() => {
    handleDragScroll(dayRef);
    handleDragScroll(monthsRef);
    scrollToInitialDate();

  }, []);
  const scrollToInitialDate = () => {
    const initialMonthElement = document.getElementById(currentMonth);
    const initialDayElement = document.getElementById(currentDay.toString());

    if (initialMonthElement) {
      initialMonthElement.scrollIntoView();
    }

    if (initialDayElement) {
      initialDayElement.scrollIntoView();
    }
  };
  const handleScrollMonth = () => {
    const container = monthsRef.current;

    const containerRect = container.getBoundingClientRect();
    const containerCenterY = containerRect.top + containerRect.height / 2;

    const elementAtCenter = document.elementFromPoint(
      containerRect.left + containerRect.width / 2,
      containerCenterY
    );

    if (elementAtCenter && elementAtCenter.id) {
      const elementIdInView = elementAtCenter.id;
      setDate(prev => ({
        ...prev,
        month: elementIdInView
      }))
      useStore.setDate(date)

      console.log(useStore.date)

    } else {
      console.log("No element with ID in view.");
    }
  };

  const handleScrollDay = () => {
    const container = dayRef.current;

    const containerRect = container.getBoundingClientRect();
    const containerCenterY = containerRect.top + containerRect.height / 2;

    const elementAtCenter = document.elementFromPoint(
      containerRect.left + containerRect.width / 2,
      containerCenterY
    );

    if (elementAtCenter && elementAtCenter.id) {
      const elementIdInView = elementAtCenter.id;
      setDate(prev => ({
        ...prev,
        day: elementIdInView
      }))
      useStore.setDate(date)

      console.log(useStore.date)
    } else {
      console.log("No element with ID in view.");
    }
  };

  return (
    <>
      <FadeIn
        ref={animation}
        variables={{ stagger: 0.1, y: 190 }}
        className="expandedButtonWrapper">
        <p className={styles.title}>Please select your preferred month and day</p>
        <div className={styles.picker} >
          <div className={styles["picker-window1"]}>
          </div>
          <ul
            className={styles["picker-month"]} id='months'
            ref={monthsRef}
            onScroll={handleScrollMonth} >
            {
              months.map((e, index) =>
                <li key={index} id={e} className={date.month === e ? styles.active : ''}>{e}</li>
              )
            }
          </ul>

          <div className={styles["picker-window2"]}>
          </div>
          <ul
            className={styles["picker-day"]}
            ref={dayRef}
            onScroll={handleScrollDay} >
            {
              days.map((e, index) =>
                <li id={e.toString()} key={index} className={date.day === e.toString() ? styles.active : ''}>{e.toString().length === 1 ? `0${e}` : e}</li>
              )
            }
          </ul>
        </div>
      </FadeIn>
    </>
  )
}


function handleDragScroll(ref: React.MutableRefObject<any>) {
  const ele = ref.current;
  ele.style.cursor = 'grab';

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  ele.addEventListener('mousedown', mouseDownHandler);

  return () => {
    ele.removeEventListener('mousedown', mouseDownHandler);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
}
