import { css } from "@emotion/react";
import * as React from "react";

const ScheduleButton: React.FC = () => {
  return (
    <button css={styles.button}>
      <span css={styles.text}>Schedule Test</span>
    </button>
  );
};

const styles = {
  button: css`
    display: flex;
    margin-top: 30px;
    min-height: 70px;
    width: 412px;
    max-width: 100%;
    flex-direction: column;
    font-family: "Noto Sans HK", sans-serif;
    color: var(--White-FFFFFF, var(--white, #fff));
    text-align: center;
    justify-content: center;
    border-radius: 100px;
    background-color: rgba(159, 159, 159, 1);
    border: none;
    cursor: pointer;
  `,
  text: css`
    align-self: stretch;
    padding: 10px 24px;
    @media (max-width: 991px) {
      padding: 0 20px;
    }
  `,
};

export default ScheduleButton;
