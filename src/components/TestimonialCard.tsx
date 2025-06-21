import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Box, 
  CardActionArea,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Testimonial } from '../constants/testimonials';
import { styled } from '@mui/material/styles';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const FlipCard = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: 300,
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    '& .flip-content-front': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[8],
    },
  },
}));

const FlipCardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'flipped',
})<{ flipped: boolean }>(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.8s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
}));

const FlipCardFace = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  borderRadius: 'inherit',
  boxSizing: 'border-box',
});

const FlipCardFront = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
}));

const FlipCardBack = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  transform: 'rotateY(180deg)',
  border: `1px solid ${theme.palette.primary.main}`,
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  margin: '0 auto 1.5rem',
  border: `4px solid ${theme.palette.primary.main}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCardClick = () => {
    if (!isMobile) {
      setFlipped(!flipped);
    }
  };

  return (
    <FlipCard 
      elevation={4}
      onClick={handleCardClick}
      className={flipped ? 'flipped' : ''}
    >
      <FlipCardInner flipped={flipped}>
        <FlipCardFront className="flip-content-front">
          <StyledAvatar 
            src={testimonial.avatar} 
            alt={testimonial.name}
          />
          <Typography 
            variant="body1" 
            fontStyle="italic" 
            paragraph 
            align="center"
            sx={{ 
              mb: 3,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: 'text.secondary'
            }}
          >
            {testimonial.text}
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            color="primary"
            sx={{ mt: 'auto' }}
          >
            {testimonial.name}
          </Typography>
          {isMobile && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block', mt: 1 }}
            >
              Tap to flip
            </Typography>
          )}
        </FlipCardFront>
        
        <FlipCardBack>
          <Box sx={{ transform: 'scale(0.9)' }}>
            <Box 
              component="span"
              sx={{
                display: 'inline-flex',
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Box 
                component="span"
                sx={{
                  fontSize: '2.5rem',
                  lineHeight: 1,
                }}
              >
                ❝
              </Box>
            </Box>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: 'common.white',
              }}
            >
              Thank You!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                opacity: 0.9,
                color: 'common.white',
              }}
            >
              We appreciate your feedback and are thrilled to have you as our valued customer.
            </Typography>
            {!isMobile && (
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block',
                  mt: 'auto',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Click to flip back
              </Typography>
            )}
          </Box>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default TestimonialCard;
