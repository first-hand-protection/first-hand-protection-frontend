import { css } from "@emotion/react";
import * as React from "react";
import InputWrapper from "./InputWrapper";

interface TimeInputProps {
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
  padding: 12px 16px;
`;

const TimeInput: React.FC<TimeInputProps> = ({ label, value }) => {
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
              color: "var(--Neutral-Black, #121212)",
              justifyContent: "flex-start",
              flex: 1,
              flexBasis: "0%",
              font: "500 16px Noto Sans TC, sans-serif",
            }}
          >
            <div css={{ opacity: 0.8, flex: 1, flexBasis: "0%" }}>{value}</div>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              width: "24px",
            }}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec392c2b052cc505ad905d1ce8531ee00ae0a82be588aa476a825a93e472bda2?placeholderIfAbsent=true&apiKey=df8a5c3e46724a788a3a32f1abacc192"
              alt=""
              css={{
                aspectRatio: "1",
                objectFit: "contain",
                objectPosition: "center",
                width: "24px",
                alignSelf: "stretch",
                margin: "auto 0",
              }}
            />
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};

export default TimeInput;
