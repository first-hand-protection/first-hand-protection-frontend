import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bbfmuanxljgmhnpjfkek.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZm11YW54bGpnbWhucGpma2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxOTU5MjQsImV4cCI6MjA0MTc3MTkyNH0.q_YAG_Qd824h_aRp_Vzq8X04zkUoGJcrRlOxBTza_1k",
);
