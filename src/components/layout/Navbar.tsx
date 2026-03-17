import { Box, Container, Stack, Link } from '@mui/material';

const categories = [
  'PC',
  'Laptop văn phòng',
  'Laptop gaming',
  'Máy tính bảng',
  'Thiết bị âm thanh',
  'Phụ kiện',
];

const Navbar: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={4}
          sx={{ py: 1.5, overflowX: 'auto' }}
        >
          {categories.map((category) => (
            <Link
              key={category}
              href="#"
              underline="none"
              variant='caption'
              sx={{
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {category}
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
