import { css } from "@emotion/react";
import * as React from "react";

const ImportContacts: React.FC = () => {
  return (
    <button css={styles.button}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0e79e1fc7fafe16eece510aede44a8d0d24f6b5eacfac774122c06a2a49b0bd?placeholderIfAbsent=true&apiKey=df8a5c3e46724a788a3a32f1abacc192"
        alt=""
        css={styles.icon}
      />
      <span>Import Contact List</span>
    </button>
  );
};

const styles = {
  button: css`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: start;
    width: 179px;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
  `,
  icon: css`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
  `,
};

export default ImportContacts;
