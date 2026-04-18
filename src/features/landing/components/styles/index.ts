import { alpha, Avatar, Box, Button, Card, Typography, styled } from "@mui/material";

// ─── HeroSection ─────────────────────────────────────────────────────────────

export const HeroBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
}));

export const HeroApplyButton = styled(Button)({
  paddingLeft: 48,
  paddingRight: 48,
  paddingTop: 16,
  paddingBottom: 16,
  fontSize: "1.2rem",
  borderRadius: 16,
  boxShadow: "var(--mui-shadows-3)",
}) as typeof Button;

export const HeroSignInButton = styled(Button)({
  paddingLeft: 48,
  paddingRight: 48,
  paddingTop: 16,
  paddingBottom: 16,
  fontSize: "1.2rem",
  borderRadius: 16,
  boxShadow: "var(--mui-shadows-3)",
  borderWidth: 2,
  "&:hover": {
    borderWidth: 2,
  },
}) as typeof Button;

// ─── FeaturesSection ─────────────────────────────────────────────────────────

export const FeatureCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 32,
  paddingBottom: 32,
});

// ─── TestimonialsSection ──────────────────────────────────────────────────────

export const TestimonialsSectionBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(14),
  backgroundColor: theme.palette.background.paper,
  position: "relative",
  overflow: "hidden",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    height: "100px",
    zIndex: 1,
  },
  "&::before": {
    top: 0,
    background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0)} 100%)`,
  },
  "&::after": {
    bottom: 0,
    background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0)} 100%)`,
  },
}));

export const TestimonialsGridBox = styled(Box)(({ theme }) => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: -40,
    left: 0,
    right: 0,
    height: 1,
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.black, 0.1)}, transparent)`,
  },
}));

// ─── TestimonialCard ──────────────────────────────────────────────────────────

export const QuoteCircle = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
}));

export const FlipHintText = styled("span")(({ theme }) => ({
  display: "block",
  marginTop: "auto",
  color: alpha(theme.palette.common.white, 0.8),
  fontSize: "0.75rem",
}));

// ─── TestimonialCard — flip card structure ───────────────────────────────────

export const FlipCard = styled(Card)(({ theme }) => ({
  height: "100%",
  minHeight: 300,
  position: "relative",
  transformStyle: "preserve-3d",
  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    "& .flip-content-front": {
      transform: "translateY(-8px)",
      boxShadow: theme.shadows[8],
    },
  },
}));

export const FlipCardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "flipped",
})<{ flipped: boolean }>(({ flipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.8s",
  transformStyle: "preserve-3d",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
}));

const FlipCardFace = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  borderRadius: "inherit",
  boxSizing: "border-box",
});

export const FlipCardFront = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
}));

export const FlipCardBack = styled(FlipCardFace)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  transform: "rotateY(180deg)",
  border: `1px solid ${theme.palette.primary.main}`,
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

export const FlipCardAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  margin: "0 auto 1.5rem",
  border: `4px solid ${theme.palette.primary.main}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[4],
  },
}));

export const FlipBackContent = styled(Box)({
  transform: "scale(0.9)",
});

// ─── TestimonialsSection — header ─────────────────────────────────────────────

export const TestimonialSectionHeading = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: theme.palette.primary.main,
    margin: "24px auto 0",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  },
  "&:hover::after": {
    width: "120px",
    backgroundColor: theme.palette.secondary.main,
  },
})) as typeof Typography;

// ─── ProductsSection ─────────────────────────────────────────────────────────

export const ProductApplyButton = styled(Button)(({ theme }) => ({
  paddingLeft: 40,
  paddingRight: 40,
  paddingTop: 12,
  paddingBottom: 12,
  borderRadius: 12,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
  boxShadow: `0 4px 6px ${alpha(theme.palette.common.black, 0.1)}`,
}));
