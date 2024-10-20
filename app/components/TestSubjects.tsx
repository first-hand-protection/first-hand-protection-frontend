import { css } from "@emotion/react";
// import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import * as yup from "yup"; // Import yup for validation
import { supabase } from "../core/supabase";

interface Contact {
  name: string;
  firstname: string;
  lastname: string;
  position: string;
  email: string;
  phone: string;
  details: string;
}

// const contactSchema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   firstname: yup.string().required("First Name is required"),
//   lastname: yup.string().required("Last Name is required"),
//   position: yup.string(), // Position is optional
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phone: yup.string(), // Phone is optional
//   details: yup.string(), // Details are optional
// });

interface TestSubjectsProps {}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-top: 30px;
    font:
      400 16px "Noto Sans",
      sans-serif;
  `,
  title: css`
    color: var(--Primary-Blue, #2f64dc);
    font-size: 20px;
    font-weight: 500;
  `,
  inputContainer: css`
    display: block;
    margin-top: 30px;
    width: 100%;
    // align-items: start;
    gap: 25px;
    // justify-content: start;
    flex: row;
    @media (max-width: 991px) {
      max-width: 100%;
    }
  `,
  actionContainer: css`
    align-self: start;
    display: flex;
    margin-top: 30px;
    align-items: start;
    gap: 30px;
    color: var(--Link-Blue, #447be5);
    justify-content: start;
  `,
  in: css`
    margin: 16px;
  `,
};

interface Contact {
  name: string;
  firstname: string;
  lastname: string;
  position: string;
  email: string;
  phone: string;
  details: string;
}

const TestSubjects: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      name: "",
      firstname: "",
      lastname: "",
      position: "",
      email: "",
      phone: "",
      details: "",
    },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const methods = useForm({
    defaultValues: { contacts: [] }, // Initialize with an empty array
    resolver: yupResolver(yup.array().of(contactSchema)),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: { contacts: Contact[] }) => {
    setSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    try {
      const { error } = await supabase.from("target").insert(data.contacts);

      if (error) {
        console.error("Error submitting contacts:", error);
        setSubmissionError(error.message);
      } else {
        console.log("Contacts submitted successfully");
        setSubmissionSuccess(true);
        reset(); // Clear the form after successful submission
        setContacts([
          {
            name: "",
            firstname: "",
            lastname: "",
            position: "",
            email: "",
            phone: "",
            details: "",
          },
        ]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setSubmissionError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        name: "",
        firstname: "",
        lastname: "",
        position: "",
        email: "",
        phone: "",
        details: "",
      },
    ]);
  };

  const removeContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const handleInputChange = (
    index: number,
    field: keyof Contact,
    value: string,
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  return (
    <section css={styles.container}>
      <Typography level="h2" component="h2" css={styles.title}>
        Test Subjects
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={styles.formContainer}>
            {contacts.map((contact, index) => (
              <Box key={index} css={styles.contactContainer}>
                {/* ... Input fields, similar to previous example, but now using register */}
                <Input
                  {...methods.register(`contacts.${index}.name`)}
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  error={!!methods.formState.errors.contacts?.[index]?.name} // Display error if present
                  helperText={
                    methods.formState.errors.contacts?.[index]?.name?.message
                  }
                  sx={{ width: "100%", marginBottom: "8px" }}
                />

                {/* ... similar input fields for other contact properties */}
                <Button
                  variant="outlined"
                  color="danger"
                  size="sm"
                  onClick={() => removeContact(index)}
                  sx={{ alignSelf: "flex-end" }}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </div>

          <div css={styles.buttonContainer}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={addContact}
              type="button"
            >
              Add Participant
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
          {submissionSuccess && (
            <Alert severity="success">Contacts submitted successfully!</Alert>
          )}
          {submissionError && <Alert severity="error">{submissionError}</Alert>}
        </form>
      </FormProvider>
    </section>
  );
};

export default TestSubjects;
