import { css } from "@emotion/react";
import * as React from "react";
import TemplateCard from "./TemplateCard";

interface Template {
  name: string;
  testNumber: string;
}

const templates: Template[] = [
  { name: "Test Template Name", testNumber: "Test 01" },
  { name: "Test Template Name", testNumber: "Test 02" },
  { name: "Test Template Name", testNumber: "Test 03" },
  { name: "Test Template Name", testNumber: "Test 04" },
  { name: "Test Template Name", testNumber: "Test 05" },
];

const containerStyles = css`
  align-self: stretch;
  display: flex;
  width: 100%;
  flex-direction: column;
  font-weight: 500;
  justify-content: start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const titleStyles = css`
  color: var(--Primary-Blue, #2f64dc);
  font:
    20px Noto Sans,
    sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const cardContainerStyles = css`
  display: flex;
  margin-top: 30px;
  width: 100%;
  align-items: center;
  gap: 40px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  letter-spacing: -0.16px;
  justify-content: start;
  flex-wrap: wrap;
  font:
    16px Poppins,
    sans-serif;
  @media (max-width: 991px) {
    max-width: 50%;
  }
`;

const TemplateDisplay: React.FC = () => {
  return (
    <section css={containerStyles}>
      <h2 css={titleStyles}>Choose test templates</h2>
      <div css={cardContainerStyles}>
        {templates.map(({ name, testNumber }) => (
          <TemplateCard key={testNumber} name={name} testNumber={testNumber} />
        ))}
      </div>
    </section>
  );
};

export default TemplateDisplay;
