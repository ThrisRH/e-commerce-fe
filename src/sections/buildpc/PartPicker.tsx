import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import { AddCircleOutline, CheckCircle } from '@mui/icons-material';
import { formatCurrency } from '../../components/utils/FormatCurrency';
import type { PCPart, PartCategory } from '../../types/buildpc';

interface PartPickerProps {
  category: PartCategory;
  title: string;
  parts: PCPart[];
  selected: PCPart | null;
  onSelect: (part: PCPart) => void;
  onRemove: () => void;
}

const PartPicker: React.FC<PartPickerProps> = ({
  category,
  title,
  parts,
  selected,
  onSelect,
  onRemove,
}) => {
  const filtered = parts.filter((p) => p.category === category);

  return (
    <Box id={`part-picker-${category}`} sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'neutral.100',
          px: 3,
          py: 1.5,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'neutral.900' }}>
          {title}
        </Typography>
        {selected && (
          <Chip
            label={`Đã chọn: ${selected.name}`}
            color="primary"
            size="small"
            onDelete={onRemove}
            sx={{ maxWidth: 280, fontWeight: 600 }}
          />
        )}
      </Box>

      <Grid container spacing={2}>
        {filtered.map((part) => {
          const isSelected = selected?.id === part.id;
          return (
            <Grid key={part.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card
                elevation={0}
                sx={{
                  border: isSelected
                    ? '2px solid'
                    : '1px solid',
                  borderColor: isSelected ? 'primary.main' : '#efefef',
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {isSelected && (
                  <CheckCircle
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      color: 'primary.main',
                      fontSize: 28,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      zIndex: 1,
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  image={part.image_url}
                  alt={part.name}
                  sx={{
                    height: 160,
                    objectFit: 'contain',
                    p: 2,
                    bgcolor: 'neutral.50',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/200x160?text=No+Image';
                  }}
                />
                <CardContent sx={{ flexGrow: 1, px: 2, py: 1.5 }}>
                  <Chip
                    label={part.brand}
                    size="small"
                    sx={{
                      mb: 0.5,
                      fontSize: 10,
                      height: 20,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 700,
                    }}
                  />
                  <Tooltip title={part.name} placement="top">
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.4,
                        mb: 0.5,
                        fontSize: 13,
                      }}
                    >
                      {part.name}
                    </Typography>
                  </Tooltip>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'neutral.500',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.3,
                    }}
                  >
                    {part.specs}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'primary.main', fontWeight: 700, mt: 1 }}
                  >
                    {formatCurrency(part.price)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant={isSelected ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    startIcon={isSelected ? <CheckCircle /> : <AddCircleOutline />}
                    onClick={() => (isSelected ? onRemove() : onSelect(part))}
                    sx={{ fontWeight: 600, textTransform: 'none' }}
                  >
                    {isSelected ? 'Đã chọn' : 'Chọn linh kiện'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PartPicker;
