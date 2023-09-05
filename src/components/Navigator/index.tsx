import React from 'react'
import styles from "./navigator.module.css"
import { motion, AnimatePresence } from "framer-motion"
import {
  StepEnum
} from "@/interfaces/NextAPI.response.interface";
interface Props {
  stepsProgress: string[];
  stepId: string;
  show: boolean;
}
import back from "@/assets/icons/to-left-arrow.svg";
import Image from 'next/image';
export default function StageState({
  stepsProgress,
  stepId,
  show
}: Props) {

  return (<>{
    stepsProgress.includes(StepEnum.S1_30_10) &&
    < AnimatePresence >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.main}>
          {stages.map((e, index) =>
            <div className={`${styles.stage}`} key={index}>
              {
                stages[0] !== e && stages.length > 1 && <div
                  className={stepsProgress.length > 1 && stepsProgress.includes(stages[index].stepId) ? styles.solidLine : styles.line}
                ></div>
              }
              <div
                className={`${styles.circle}
              ${stepId === e.stepId ? styles.active : stepsProgress.includes(e.stepId) ? styles.visited : ""}`}
              >
                <p>{e.id + 1}</p>
                <span className={index == 0 && styles.firstStageName}>{e.name}</span>
              </div>

            </div>
          )}
          <div className={`${styles.stage}`}>
            {
              <div className={styles.line}></div>
            }
            <div
              className={`${styles.circle}`}
            >
              <Image src={back} alt='->' width={20} style={{ transform: "rotateZ(180deg)", margin: "auto" }} />
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  }
  </>
  )
}

let stages = [
  { id: 0, name: "Timeframe", stepId: "1-30-10" }
  , { id: 1, name: "Interests", stepId: "1-30-10-50" }
  , { id: 2, name: "Companions", stepId: "1-30-10-50" }
  , { id: 3, name: "Destination", stepId: "1-30-10-50-20" }
  , { id: 4, name: "Events", stepId: "1-30-10-50-20-20-10" }
  , { id: 5, name: "Budget", stepId: "1-30-10-50-20-20-10" }
  , { id: 6, name: "Summary", stepId: "1-30-10-50-20-20" }
]

