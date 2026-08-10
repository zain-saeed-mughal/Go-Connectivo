import {
  Brain,
  Cloud,
  DollarSign,
  Globe,
  Grid3x3,
  Headphones,
  Headset,
  MapPin,
  Maximize2,
  Monitor,
  MousePointerClick,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  ShieldCheck,
  Sparkles,
  Voicemail,
  Zap,
} from 'lucide-react';

const iconMap = {
  Brain,
  Cloud,
  DollarSign,
  Globe,
  Grid3x3,
  Headphones,
  Headset,
  MapPin,
  Maximize2,
  Monitor,
  MousePointerClick,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  ShieldCheck,
  Sparkles,
  Voicemail,
  Zap,
};

export default function ServiceIcon({ name, size = 20, className = '' }) {
  const Icon = iconMap[name] || Sparkles;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
