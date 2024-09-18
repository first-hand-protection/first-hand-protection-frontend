import CheckIcon from "@mui/icons-material/Check"; // Import CheckIcon
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/joy";
import { usePageEffect } from "../core/page";

export const Component = function Pricing(): JSX.Element {
  usePageEffect({ title: "Get First Hand Protection!" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h2" gutterBottom>
        Subscribe now to Flexible Plans for Every Need
      </Typography>
      <Typography variant="body1" paragraph>
        Empower your digital life with our robust security solutions. Choose the
        plan that aligns with your needs and enjoy peace of mind.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(auto-fit, minmax(300px, 1fr))",
          },
          gap: 2,
        }}
      >
        {/* Free Tier */}
        <Card>
          <CardContent sx={{ minHeight: 300 }}>
            <Typography variant="h3" component="div">
              Fundamentals
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Perfect for individuals and testing the waters.
            </Typography>

            <Button onClick={() => {}} fullWidth sx={{ mt: 2 }}>
              Get Started
            </Button>

            <Typography sx={{ mt: 2 }}>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Comprehensive
              testing against latest relevant threats
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> User-Friendly
              Self-Service Platform
            </Typography>
          </CardContent>
        </Card>

        {/* Family Tier */}
        <Card>
          <CardContent sx={{ minHeight: 300 }}>
            <Typography variant="h3" component="div">
              Family
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Safeguard your loved ones online. Comprehensive protection for the
              entire family.
            </Typography>

            <Button onClick={() => {}} fullWidth sx={{ mt: 2 }}>
              Get Started
            </Button>

            <Typography sx={{ mt: 2 }}>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Real-Time Threat
              Database Updates
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Schedule
              Personalized Security Scans
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Dedicated Support
              Team at Your Service
            </Typography>
          </CardContent>
        </Card>

        {/* SME Tier */}
        <Card>
          <CardContent sx={{ minHeight: 300 }}>
            <Typography variant="h3" component="div">
              SME
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure your business operations with our advanced cybersecurity
              solutions tailored for small and medium enterprises.
            </Typography>

            <Button onClick={() => {}} fullWidth sx={{ mt: 2 }}>
              Get Started
            </Button>

            <Typography sx={{ mt: 2 }}>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Stay Ahead of
              Threats with Continuous Database Updates
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Gain Actionable
              Insights with Comprehensive Reporting
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> 24/7 Priority
              Support for Uninterrupted Peace of Mind
            </Typography>
          </CardContent>
        </Card>

        {/* Enterprise Tier */}
        <Card sx={{ gridColumn: "span 3" }}>
          <CardContent sx={{ minHeight: 300 }}>
            <Typography variant="h3" component="div">
              Enterprise
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tailored cybersecurity solutions designed to meet the unique needs
              of your large organization.
            </Typography>

            <Button onClick={() => {}} fullWidth sx={{ mt: 2 }}>
              Contact Sales
            </Button>

            <Typography sx={{ mt: 2 }}>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Comprehensive
              Self-Service Security Management
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Advanced Reporting
              and Analytics for Proactive Security
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Achieve and
              Maintain Industry-Leading Security Certifications
            </Typography>
            <Typography>
              <CheckIcon sx={{ fontSize: "small", mr: 1 }} /> Dedicated Account
              Manager for Personalized Support
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
