import { css } from "@emotion/react";
import * as React from "react";

interface TestDetailProps {
  title: string;
}

const testDetailStyles = css`
  color: var(--Primary-Blue, #2f64dc);
  font:
    500 20px "Noto Sans",
    sans-serif;
`;

const TestDetail: React.FC<TestDetailProps> = ({ title }) => {
  return (
    <section css={testDetailStyles}>
      <h2>{title}</h2>
    </section>
  );
};

export default TestDetail;
