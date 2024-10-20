import { css } from "@emotion/react";
import * as React from "react";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";

interface DateTimeSelectorProps {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const containerStyles = css`
  display: flex;
  margin-top: 30px;
  width: 100%;
  align-items: center;
  gap: 25px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
  startDate,
  startTime,
  endDate,
  endTime,
}) => {
  return (
    <section css={containerStyles}>
      <DateInput label="Start date" value={startDate} />
      <TimeInput label="Start time" value={startTime} />
      <DateInput label="End date" value={endDate} />
      <TimeInput label="End time" value={endTime} />
    </section>
  );
};

export default DateTimeSelector;
