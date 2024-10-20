import { css } from "@emotion/react";
import * as React from "react";

interface TemplateCardProps {
  name: string;
  number: string;
}

const containerStyle = css`
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000;
  text-align: center;
  letter-spacing: -0.16px;
  justify-content: start;
  padding: 63px 0;
  font:
    500 16px Poppins,
    sans-serif;
  border: 1px dashed #2f64dc;
`;

const contentStyle = css`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 0 20px;
`;

const numberStyle = css`
  margin-top: 10px;
`;

const TemplateCard: React.FC<TemplateCardProps> = ({ name, number }) => {
  return (
    <section css={containerStyle}>
      <div css={contentStyle}>
        <h2>{name}</h2>
        <p css={numberStyle}>{number}</p>
      </div>
    </section>
  );
};

export default TemplateCard;
