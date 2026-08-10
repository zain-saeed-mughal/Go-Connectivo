import callCenterImg from '../assets/services/call-center.png';
import dialerImg from '../assets/services/dialer.png';
import pbxImg from '../assets/services/pbx.png';
import inboundImg from '../assets/services/inbound.png';
import outboundImg from '../assets/services/outbound.png';
import aiImg from '../assets/services/ai.png';
import voicemailImg from '../assets/services/voicemail.png';
import clickImg from '../assets/services/click.png';
import networkImg from '../assets/services/network.png';

/** Flat illustration mapped to each service detail hero. */
export const serviceHeroImages = {
  'auto-dialer': dialerImg,
  'predictive-dialer': dialerImg,
  'power-dialer': dialerImg,
  'progressive-dialer': dialerImg,
  'ai-dialer': aiImg,
  'hosted-pbx': pbxImg,
  'ringless-voicemail': voicemailImg,
  'click-to-call': clickImg,
  'call-center-software': callCenterImg,
  'inbound-services': inboundImg,
  'outbound-services': outboundImg,
  'virtual-contact-center': callCenterImg,
  'toll-free-origination': inboundImg,
  'did-services': networkImg,
  'toll-free-termination': outboundImg,
  'wholesale-termination': networkImg,
};

export function getServiceHeroImage(serviceId) {
  return serviceHeroImages[serviceId] || callCenterImg;
}
