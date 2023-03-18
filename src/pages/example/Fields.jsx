import { useState } from "react";

import {
  Stack,
  Box,
  TextField,
  MenuItem,
  Grid,
  Card,
  Switch,
  Autocomplete,
  useAutocomplete,
} from "@pankod/refine-mui";

import { Controller } from "@pankod/refine-react-hook-form";

export default function CompFields({
  register,
  control,
  errors,
  record,
  getValues,
}) {
  const [switchValue, setSwitchValue] = useState(getValues("switchValue"));
  const [selection, setSelection] = useState(getValues("selection"));
  const { autocompleteProps: relatedAutocomplete } = useAutocomplete({
    resource: "relatedResource",
  });

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column" }}
      autoComplete="off"
    >
      {/* Custom Data Visualization */}
      {record != null && (
        <Grid item md={3} mb={3}>
          <Card sx={{ p: 3, width: "100%" }}>
            <h2>
              Custom Text: {record.current} /{" "}
              {record.max > 0 ? record.max : "∞"}
            </h2>
          </Card>
        </Grid>
      )}
      {/* ---- Text ---- */}
      <TextField
        {...register("title", { required: "Title is required" })}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errors?.title}
        helperText={errors.title?.message}
        required
        fullWidth
        label="Title"
      />
      {/* ---- Switch ---- */}
      <Stack direction="row" alignItems="center" spacing={2} mt={3}>
        Switch
        <Switch
          {...register("switchValue", {})}
          control={control}
          checked={switchValue}
          defaultChecked={switchValue}
          onChange={(e) => {
            setSwitchValue(e.target.checked);
          }}
          label="Switch Value"
          name="switchValue"
        />
      </Stack>
      {/* ---- Select ---- */}
      <TextField
        {...register("selection", {})}
        error={!!errors?.selection}
        required={selection}
        fullWidth
        select
        label="Selection"
        value={selection}
        onChange={(e) => {
          setSelection(e.target.value);
        }}
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
        <MenuItem value="4">4</MenuItem>
      </TextField>
      {/* ---- AutoComplete ---- */}
      <Controller
        control={control}
        name="relatedResource"
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <Autocomplete
            {...relatedAutocomplete}
            {...field}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            value={field.value ? field.value : ""}
            getOptionLabel={(item) => {
              return item.name ? item.name : "";
            }}
            isOptionEqualToValue={(option, value) =>
              value === undefined || option.id.toString() === value.toString()
            }
            renderInput={(params) => (
              <TextField
                InputLabelProps={{ shrink: true }}
                {...params}
                label="Related Resource"
                variant="outlined"
                error={!!errors.relatedResource}
                helperText={errors.relatedResource?.message}
                required
              />
            )}
          />
        )}
      />
    </Box>
  );
}
