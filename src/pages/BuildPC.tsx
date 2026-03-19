import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { Build } from '@mui/icons-material';
import type { PCPart, SelectedParts, PartCategory } from '../types/buildpc';
import { PARTS_CATALOG } from '../sections/buildpc/buildpc.data';
import PartPicker from '../sections/buildpc/PartPicker';
import BuildSummary from '../sections/buildpc/BuildSummary';

const PART_SECTIONS: { category: PartCategory; title: string }[] = [
  { category: 'cpu', title: '🖥️ Bộ xử lý (CPU)' },
  { category: 'mainboard', title: '🔌 Bo mạch chủ (Mainboard)' },
  { category: 'ram', title: '💾 Bộ nhớ RAM' },
  { category: 'storage', title: '💿 Ổ cứng (Storage)' },
  { category: 'gpu', title: '🎮 Card đồ họa (GPU)' },
  { category: 'psu', title: '⚡ Nguồn máy tính (PSU)' },
  { category: 'case', title: '🗄️ Thùng máy (Case)' },
  { category: 'cooler', title: '❄️ Tản nhiệt (Cooler)' },
];

const INITIAL_SELECTED: SelectedParts = {
  cpu: null,
  mainboard: null,
  ram: null,
  storage: null,
  gpu: null,
  psu: null,
  case: null,
  cooler: null,
};

const BuildPC: React.FC = () => {
  const [selected, setSelected] = useState<SelectedParts>(INITIAL_SELECTED);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning';
  }>({ open: false, message: '', severity: 'success' });

  const handleSelect = (part: PCPart) => {
    setSelected((prev) => ({ ...prev, [part.category]: part }));
  };

  const handleRemove = (cat: PartCategory) => {
    setSelected((prev) => ({ ...prev, [cat]: null }));
  };

  const handleReset = () => {
    setSelected(INITIAL_SELECTED);
    setSnackbar({ open: true, message: 'Đã xóa toàn bộ cấu hình.', severity: 'info' });
  };

  const handleAddToCart = () => {
    const selectedCount = Object.values(selected).filter(Boolean).length;
    setSnackbar({
      open: true,
      message: `Đã thêm ${selectedCount} linh kiện vào giỏ hàng!`,
      severity: 'success',
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          pb: 2,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
        }}
      >
        <Build sx={{ fontSize: 36, color: 'primary.main' }} />
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, color: 'neutral.900', lineHeight: 1.2 }}>
            Tự Build PC theo Ý Muốn
          </Typography>
          <Typography variant="body2" sx={{ color: 'neutral.500', mt: 0.5 }}>
            Chọn từng linh kiện phù hợp với nhu cầu và ngân sách của bạn
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left: part pickers */}
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          {PART_SECTIONS.map(({ category, title }) => (
            <PartPicker
              key={category}
              category={category}
              title={title}
              parts={PARTS_CATALOG}
              selected={selected[category]}
              onSelect={handleSelect}
              onRemove={() => handleRemove(category)}
            />
          ))}
        </Grid>

        {/* Right: sticky summary */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <BuildSummary
            selected={selected}
            onRemove={handleRemove}
            onReset={handleReset}
            onAddToCart={handleAddToCart}
          />
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          variant="filled"
          sx={{ fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BuildPC;
