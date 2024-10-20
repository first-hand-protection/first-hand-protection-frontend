import { css } from "@emotion/react";
import { Alert } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import { supabase } from "../core/supabase"; // Path to your Supabase client

interface Campaign {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (error) {
  console.error("Error fetching user:", error);
} else {
  console.log("User ID:", user.id); // This is the user_id
}

const TestInputContainer: React.FC = () => {
  const [campaignData, setCampaignData] = useState<Campaign>({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCampaignData({
      ...campaignData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setCampaignData({
      ...campaignData,
      start_date: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setCampaignData({
      ...campaignData,
      end_date: date ? date.format("YYYY-MM-DD") : "",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: supabaseError } = await supabase
        .from("campaign")
        .insert([
          {
            ...campaignData,
            organization_id: 7, // Replace with actual organization ID
            user_id: user.id, // actual user ID
            status: "active",
          },
        ])
        .select();

      if (supabaseError) {
        console.error("Error creating campaign:", supabaseError);
        setError(supabaseError.message);
      } else {
        console.log("Campaign created successfully");
        setSuccess(true);
        setCampaignData({
          name: "",
          description: "",
          start_date: "",
          end_date: "",
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid #ddd;
        background: #fff;
        margin: 32px auto;
        width: 90%;
        max-width: 600px;
        padding: 24px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        gap: 20px;

        @media (max-width: 991px) {
          width: 95%;
        }
      `}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Test Name"
          name="name"
          value={campaignData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Description"
          name="description"
          value={campaignData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={dayjs(campaignData.start_date)}
            onChange={handleStartDateChange}
            renderInput={(params) => (
              <TextField {...params} required margin="normal" />
            )}
          />
          <DatePicker
            label="End Date"
            value={dayjs(campaignData.end_date)}
            onChange={handleEndDateChange}
            renderInput={(params) => (
              <TextField {...params} required margin="normal" />
            )}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </Button>

        {success && (
          <Alert severity="success">Campaign created successfully!</Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
};

export default TestInputContainer;
