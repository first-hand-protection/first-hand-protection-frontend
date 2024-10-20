/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/joy";
import TemplateDisplay from "../components/TemplateDisplay";
import TestDetail from "../components/TestDetail";
import TestInputContainer from "../components/TestInputContainer";
import TestSubjects from "../components/TestSubjects";
import { usePageEffect } from "../core/page";

export const Component = function Tests(): JSX.Element {
  usePageEffect({ title: "Create A Test" });

  return (
    <Container sx={{ py: 2, margin: 2 }}>
      <Typography level="h2" gutterBottom>
        Create a Test
      </Typography>

      <Typography>Coming soon...</Typography>

      <TestDetail />

      <TemplateDisplay />

      <TestInputContainer />

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {/* // <DateTimePicker
        //   label="Uncontrolled picker"
        //   // inputFormat="E MMM dd yyyy HH:MM:SS O"
        //   // defaultValue={dayjs("Wed Dec 25 2024 10:30:00 GMT+0000")}
        // /> */}
      {/* </LocalizationProvider> */}

      <TestSubjects />
    </Container>
  );
};
