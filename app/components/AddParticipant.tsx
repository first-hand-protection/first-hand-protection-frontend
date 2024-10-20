import { css } from "@emotion/react";
import * as React from "react";

const AddParticipant: React.FC = () => {
  return (
    <button css={styles.button}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/69cea082ed86649abc5cbea063e63b0078ad7f99286e8aaf6f8ef94f85109621?placeholderIfAbsent=true&apiKey=df8a5c3e46724a788a3a32f1abacc192"
        alt=""
        css={styles.icon}
      />
      <span>Add more participants</span>
    </button>
  );
};

const styles = {
  button: css`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: start;
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

export default AddParticipant;
