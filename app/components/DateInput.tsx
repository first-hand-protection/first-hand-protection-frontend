import { css } from "@emotion/react";
import * as React from "react";
import InputWrapper from "./InputWrapper";

interface DateInputProps {
  label: string;
  value: string;
}

const inputStyles = css`
  justify-content: center;
  border-radius: 4px;
  border: 1px solid var(--Neutral-Neutral-3, #5e5e5e);
  background: var(--white, #fff);
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  color: var(--M3-sys-light-on-surface, #1c1b1f);
  white-space: nowrap;
  letter-spacing: 0.5px;
  padding: 12px 16px;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const DateInput: React.FC<DateInputProps> = ({ label, value }) => {
  return (
    <InputWrapper label={label}>
      <div css={inputStyles}>
        <div
          css={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "flex-start",
              gap: "4px",
              justifyContent: "flex-start",
              flex: 1,
              flexBasis: "0%",
            }}
          >
            <div css={{ opacity: 0.8, flex: 1, flexBasis: "0%" }}>{value}</div>
          </div>
          <div css={{ display: "flex", minHeight: "24px", gap: "8px" }} />
        </div>
      </div>
    </InputWrapper>
  );
};

export default DateInput;
