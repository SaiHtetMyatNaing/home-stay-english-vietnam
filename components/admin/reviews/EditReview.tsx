"use client";

import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
  Stack,
  Typography,
  Box,
  Divider,
  Rating,
  Avatar,
  TextField as MuiTextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useParsed } from "@refinedev/core";

type IReview = {
  id: string;
  rating: number;
  title: string;
  reviewText: string;
  stayDuration: string;
  nationality: string;
  approved: boolean;
  user?: { name?: string | null; image?: string | null };
};

export default function ReviewEdit() {
  const {id} = useParsed();
  const {
    saveButtonProps,
    refineCore: { query: queryResult },
    control,
    formState: { errors },
  } = useForm<IReview>({
    refineCoreProps: {
      resource: "reviews",
      action: "edit",
      id 
    },
  });

  const record = queryResult?.data?.data;

  if (!record) {
    return <Edit isLoading={true} />;
  }

  const userName = record.user?.name ?? "Anonymous Volunteer";
  const userInitial =
    userName !== "Anonymous Volunteer" ? userName[0].toUpperCase() : null;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={record.user?.image || undefined}
              alt={userName}
              sx={{ width: 64, height: 64 }}
            >
              {userInitial}
            </Avatar>

            <Controller
              name="rating"
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field }) => (
                <Rating
                  {...field}
                  value={field.value ?? 0}
                  precision={0.5}
                  size="large"
                  onChange={(_, value) => field.onChange(value ?? 0)}
                />
              )}
            />

            <Typography variant="h6" color="text.secondary">
              {(record.rating ?? 0).toFixed(1)} out of 5 stars
            </Typography>
          </Box>

          <MuiTextField
            label="Volunteer Name"
            value={userName}
            margin="normal"
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Divider />

        {/* Info Grid */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <MuiTextField
            label="Review ID"
            value={record.id}
            InputProps={{ readOnly: true }}
            sx={{ fontFamily: "monospace", fontWeight: 500 }}
            fullWidth
          />

          <Controller
            name="stayDuration"
            control={control}
            rules={{ required: "Stay Duration is required" }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                value={field.value ?? ""}
                label="Stay Duration"
                error={!!errors.stayDuration}
                helperText={
                  typeof errors.stayDuration?.message === "string"
                    ? errors.stayDuration.message
                    : undefined
                }
                fullWidth
              />
            )}
          />

          <Controller
            name="nationality"
            control={control}
            rules={{ required: "Nationality is required" }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                value={field.value ?? ""}
                label="Nationality"
                error={!!errors.nationality}
                helperText={
                  typeof errors.nationality?.message === "string"
                    ? errors.nationality.message
                    : undefined
                }
                fullWidth
              />
            )}
          />

          <Box display="flex" alignItems="center" justifyContent="center">
            <Controller
              name="approved"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="success"
                    />
                  }
                  label={field.value ? "Approved" : "Pending"}
                  labelPlacement="start"
                />
              )}
            />
          </Box>
        </Stack>

        <Divider />

        <Box>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Full Review
          </Typography>
          <Controller
            name="reviewText"
            control={control}
            rules={{ required: "Review text is required" }}
            render={({ field }) => (
              <MuiTextField
                {...field}
                value={field.value ?? ""}
                label="Full Review"
                multiline
                minRows={6}
                error={!!errors.reviewText}
                helperText={
                  typeof errors.reviewText?.message === "string"
                    ? errors.reviewText.message
                    : undefined
                }
                fullWidth
              />
            )}
          />
        </Box>
      </Stack>
    </Edit>
  );
}
