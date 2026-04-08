import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add as PlusIcon, Delete as TrashIcon } from "@mui/icons-material";

export default function ProductAttributes({ 
  formData, 
  attributes, 
  handleAttributeChange, 
  addAttribute, 
  removeAttribute 
}) {
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Thông Số Kỹ Thuật (Attributes)
          </Typography>
          <Button
            startIcon={<PlusIcon />}
            variant="outlined"
            size="small"
            onClick={addAttribute}
            sx={{ borderRadius: 2 }}
          >
            Thêm Thông Số
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {formData.attributes &&
          formData.attributes.map((attr, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ mb: 2, alignItems: "center" }}
            >
              <Grid sx={{ flex: 1 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Loại</InputLabel>
                  <Select
                    value={attr.id}
                    label="Loại"
                    onChange={(e) =>
                      handleAttributeChange(index, "id", e.target.value)
                    }
                  >
                    {attributes
                      .filter(
                        (attribute) =>
                          !formData.attributes.some(
                            (a, i) => i !== index && a.id === attribute.id
                          )
                      )
                      .map((attribute) => (
                        <MenuItem key={attribute.id} value={attribute.id}>
                          {attribute.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 7 }}>
                <TextField
                  fullWidth
                  label="Giá trị (VD: 16, Red)"
                  size="small"
                  value={attr.value || ""}
                  onChange={(e) =>
                    handleAttributeChange(index, "value", e.target.value)
                  }
                  slotProps={{
                    htmlInput: {
                      maxLength: 255,
                    },
                  }}
                />
              </Grid>

              <Grid>
                <IconButton color="error" onClick={() => removeAttribute(index)}>
                  <TrashIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

        {(!formData.attributes || formData.attributes.length === 0) && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 2 }}
          >
            Chưa có thông số kỹ thuật nào được tạo.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
