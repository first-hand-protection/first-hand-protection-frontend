import { css } from "@emotion/react";
import * as React from "react";

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
}

const wrapperStyles = css`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  justify-content: flex-start;
  flex-grow: 1;
  width: 188px;
  margin: auto 0;
`;

const labelStyles = css`
  align-self: flex-start;
  display: flex;
  padding-right: 16px;
  align-items: center;
  overflow: hidden;
  font-family:
    Noto Sans,
    sans-serif;
  color: var(--Neutral-Neutral-3, #5e5e5e);
  justify-content: flex-start;
`;

const InputWrapper: React.FC<InputWrapperProps> = ({ label, children }) => {
  return (
    <div css={wrapperStyles}>
      <div css={labelStyles}>
        <div css={{ opacity: 0.8, alignSelf: "stretch", margin: "auto 0" }}>
          {label}
        </div>
      </div>
      {children}
    </div>
  );
};

export default InputWrapper;
