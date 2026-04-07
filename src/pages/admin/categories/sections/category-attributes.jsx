import {
    Box,
    Card,
    CardContent,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Switch,
    Typography,
  } from "@mui/material";
  
  export default function CategoryAttributes({ formData, setFormData, allAttributes }) {
    return (
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Thuộc Tính Danh Mục
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Chọn các thuộc tính mà sản phẩm thuộc danh mục này sẽ có.
          </Typography>
  
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, sm: 9 }}>
              <FormControl fullWidth>
                <InputLabel>Chọn thuộc tính</InputLabel>
                <Select
                  multiple
                  value={formData.attribute_ids || []}
                  onChange={(e) => {
                    setFormData((p) => ({
                      ...p,
                      attribute_ids: e.target.value,
                    }));
                  }}
                  input={<OutlinedInput label="Chọn thuộc tính" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            allAttributes.find((a) => a.id === value)?.name || value
                          }
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {allAttributes.map((attr) => (
                    <MenuItem key={attr.id} value={attr.id}>
                      <Checkbox
                        checked={(formData.attribute_ids || []).indexOf(attr.id) > -1}
                      />
                      {attr.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_required || false}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        is_required: e.target.checked,
                      }))
                    }
                  />
                }
                label="Bắt buộc?"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
