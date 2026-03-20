import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Chip,
  Paper,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  BoltOutlined,
  WarningAmber,
} from '@mui/icons-material';
import { formatCurrency } from '../../components/utils/FormatCurrency';

const CATEGORY_LABELS = {
  cpu: 'CPU',
  mainboard: 'Mainboard',
  ram: 'RAM',
  storage: 'Ổ cứng',
  gpu: 'Card đồ họa',
  psu: 'Nguồn',
  case: 'Thùng máy',
  cooler: 'Tản nhiệt',
};

const BuildSummary = ({
  selected,
  onRemove,
  onReset,
  onAddToCart,
}) => {
  const parts = Object.entries(selected);

  const total = parts.reduce((sum, [, part]) => sum + (part?.price ?? 0), 0);

  const totalWattage = parts.reduce((sum, [, part]) => sum + (part?.wattage ?? 0), 0);
  const psuWattage = selected.psu?.wattage ?? 0;
  const wattagePercent = psuWattage > 0 ? Math.min((totalWattage / psuWattage) * 100, 100) : 0;
  const wattageOverload = psuWattage > 0 && totalWattage > psuWattage;

  const selectedCount = parts.filter(([, p]) => p !== null).length;
  const totalParts = parts.length;

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #eeeeee',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'sticky',
        top: 80,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
          Cấu Hình Của Bạn
        </Typography>
        <Chip
          label={`${selectedCount}/${totalParts}`}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 700,
            fontSize: 12,
          }}
        />
      </Box>

      {/* Parts list */}
      <List disablePadding>
        {parts.map(([cat, part], i) => (
          <React.Fragment key={cat}>
            <ListItem
              sx={{
                px: 2,
                py: 1,
                alignItems: 'flex-start',
                bgcolor: part ? 'white' : 'neutral.50',
              }}
              secondaryAction={
                part && (
                  <Tooltip title="Xóa">
                    <Box
                      sx={{
                        cursor: 'pointer',
                        color: 'neutral.400',
                        '&:hover': { color: 'primary.main' },
                        mt: 0.5,
                      }}
                      onClick={() => onRemove(cat)}
                    >
                      <Delete fontSize="small" />
                    </Box>
                  </Tooltip>
                )
              }
            >
              <ListItemAvatar sx={{ minWidth: 48 }}>
                {part ? (
                  <Avatar
                    src={part.image_url}
                    variant="rounded"
                    sx={{ width: 36, height: 36, bgcolor: 'neutral.100' }}
                    imgProps={{ style: { objectFit: 'contain', padding: 4 } }}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: 'neutral.200',
                      fontSize: 10,
                      color: 'neutral.500',
                    }}
                  >
                    ?
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: 'neutral.600', fontSize: 11 }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Typography>
                }
                secondary={
                  part ? (
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'neutral.900',
                        fontWeight: 500,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3,
                      }}
                    >
                      {part.name}
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      sx={{ color: 'neutral.400', fontStyle: 'italic' }}
                    >
                      Chưa chọn
                    </Typography>
                  )
                }
              />
            </ListItem>
            {i < parts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      {/* Wattage bar */}
      {totalWattage > 0 && (
        <Box sx={{ px: 2, py: 1.5, bgcolor: 'neutral.50', borderTop: '1px solid #eee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
            <BoltOutlined fontSize="small" sx={{ color: wattageOverload ? 'error.main' : 'primary.main' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'neutral.700' }}>
              Công suất tiêu thụ ước tính
            </Typography>
            {wattageOverload && (
              <Tooltip title="Nguồn không đủ công suất!">
                <WarningAmber fontSize="small" sx={{ color: 'error.main', ml: 'auto' }} />
              </Tooltip>
            )}
          </Box>
          <LinearProgress
            variant="determinate"
            value={wattagePercent}
            color={wattageOverload ? 'error' : wattagePercent > 80 ? 'warning' : 'primary'}
            sx={{ borderRadius: 1, height: 6 }}
          />
          <Typography variant="caption" sx={{ color: 'neutral.500', mt: 0.5, display: 'block' }}>
            {totalWattage}W / {psuWattage > 0 ? `${psuWattage}W` : 'N/A (chưa chọn nguồn)'}
          </Typography>
        </Box>
      )}

      {/* Total + actions */}
      <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'neutral.700' }}>
            Tổng cộng
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatCurrency(total)}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ShoppingCart />}
          disabled={selectedCount === 0}
          onClick={onAddToCart}
          sx={{ mb: 1, fontWeight: 700 }}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={onReset}
          disabled={selectedCount === 0}
          sx={{ fontWeight: 600 }}
        >
          Xóa tất cả
        </Button>
      </Box>
    </Paper>
  );
};

export default BuildSummary;
