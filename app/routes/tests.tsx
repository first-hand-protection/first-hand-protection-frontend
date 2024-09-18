/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";

export const Component = function Tests(): JSX.Element {
  usePageEffect({ title: "Tests" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        Tests
      </Typography>
      <Typography>Coming soon...</Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {/* Sample Test */}
        <Card sx={{ gridArea: "1 / 1 / 2 / -1" }}>
          <CardContent sx={{ minHeight: 300 }}>
            <Typography level="h3">Test Name</Typography>
            <Typography>description</Typography>
            <Typography>start_date</Typography>
            <Typography>end_date</Typography>
            <Typography>status</Typography>
            <Typography>organization_id</Typography>
            <Typography>created_at</Typography>
            <Typography>updated_at</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
