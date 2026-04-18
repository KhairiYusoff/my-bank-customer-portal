import React, { useState } from "react";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { Testimonial } from "../constants/testimonials";
import {
  FlipCard,
  FlipCardInner,
  FlipCardFront,
  FlipCardBack,
  FlipCardAvatar,
  FlipBackContent,
  QuoteCircle,
  FlipHintText,
} from "./styles";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const [flipped, setFlipped] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCardClick = () => {
    if (!isMobile) {
      setFlipped(!flipped);
    }
  };

  return (
    <FlipCard
      elevation={4}
      onClick={handleCardClick}
      className={flipped ? "flipped" : ""}
    >
      <FlipCardInner flipped={flipped}>
        <FlipCardFront className="flip-content-front">
          <FlipCardAvatar src={testimonial.avatar} alt={testimonial.name} />
          <Typography
            variant="body1"
            fontStyle="italic"
            paragraph
            align="center"
            sx={{
              mb: 3,
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "text.secondary",
            }}
          >
            {testimonial.text}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color="primary"
            sx={{ mt: "auto" }}
          >
            {testimonial.name}
          </Typography>
          {isMobile && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              Tap to flip
            </Typography>
          )}
        </FlipCardFront>

        <FlipCardBack>
          <FlipBackContent>
            <QuoteCircle>
              <Box component="span" sx={{ fontSize: "2.5rem", lineHeight: 1 }}>
                ❝
              </Box>
            </QuoteCircle>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 700, mb: 2, color: "common.white" }}
            >
              Thank You!
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, opacity: 0.9, color: "common.white" }}
            >
              We appreciate your feedback and are thrilled to have you as our
              valued customer.
            </Typography>
            {!isMobile && <FlipHintText>Click to flip back</FlipHintText>}
          </FlipBackContent>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default TestimonialCard;
