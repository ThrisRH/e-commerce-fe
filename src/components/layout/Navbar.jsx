import { Box, Container, Stack, Link } from '@mui/material';

const categories = [
  { label: 'PC', href: '#' },
  { label: 'Laptop văn phòng', href: '#' },
  { label: 'Laptop gaming', href: '#' },
  { label: 'Máy tính bảng', href: '#' },
  { label: 'Thiết bị âm thanh', href: '#' },
  { label: 'Phụ kiện', href: '#' },
  { label: '🔧 Build PC', href: '/build-pc' },
];

const Navbar = () => {
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
          {categories.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              underline="none"
              variant='caption'
              sx={{
                color: label.includes('Build PC') ? 'primary.main' : 'text.secondary',
                fontWeight: label.includes('Build PC') ? 700 : 400,
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {label}
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
