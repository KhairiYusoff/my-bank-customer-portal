import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SecurityIcon from '@mui/icons-material/Security';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import StarIcon from '@mui/icons-material/Star';
import { SvgIconComponent } from '@mui/icons-material';

export interface Feature {
  icon: SvgIconComponent;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  {
    icon: CreditScoreIcon,
    title: 'Seamless Account Opening',
    desc: 'Open your account online in minutes with instant approval and no paperwork.'
  },
  {
    icon: SecurityIcon,
    title: 'Bank-Grade Security',
    desc: 'Your data and money are protected with industry-leading security and encryption.'
  },
  {
    icon: SmartphoneIcon,
    title: 'Mobile First',
    desc: 'Enjoy full-featured banking on your phone, anytime, anywhere.'
  },
  {
    icon: StarIcon,
    title: 'Award-Winning Experience',
    desc: 'Recognized for excellence in digital banking and customer service.'
  },
];
