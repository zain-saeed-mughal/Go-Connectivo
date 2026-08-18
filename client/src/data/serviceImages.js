import autoDialerImg from '../assets/services/illustrations/auto-dialer.webp';
import predictiveDialerImg from '../assets/services/illustrations/predictive-dialer.webp';
import powerDialerImg from '../assets/services/illustrations/power-dialer.webp';
import progressiveDialerImg from '../assets/services/illustrations/progressive-dialer.webp';
import businessVoipImg from '../assets/services/illustrations/business-voip.webp';
import hostedPbxImg from '../assets/services/illustrations/hosted-pbx.webp';
import sipTrunkingImg from '../assets/services/illustrations/sip-trunking.webp';
import mobileVoipImg from '../assets/services/illustrations/mobile-voip.webp';
import clickToCallImg from '../assets/services/illustrations/click-to-call.webp';
import inboundServicesImg from '../assets/services/illustrations/inbound-services.webp';
import tollFreeOriginationImg from '../assets/services/illustrations/toll-free-origination.webp';
import didServicesImg from '../assets/services/illustrations/did-services.webp';
import virtualNumbersImg from '../assets/services/illustrations/virtual-numbers.webp';
import outboundServicesImg from '../assets/services/illustrations/outbound-services.webp';
import tollFreeTerminationImg from '../assets/services/illustrations/toll-free-termination.webp';
import wholesaleTerminationImg from '../assets/services/illustrations/wholesale-termination.webp';
import voipTerminationImg from '../assets/services/illustrations/voip-termination.webp';
import callCenterSoftwareImg from '../assets/services/illustrations/call-center-software.webp';
import virtualContactCenterImg from '../assets/services/illustrations/virtual-contact-center.webp';
import ivrAutoAttendantImg from '../assets/services/illustrations/ivr-auto-attendant.webp';
import callRoutingQueuesImg from '../assets/services/illustrations/call-routing-queues.webp';
import callRecordingImg from '../assets/services/illustrations/call-recording.webp';
import callAnalyticsImg from '../assets/services/illustrations/call-analytics.webp';
import voiceApiImg from '../assets/services/illustrations/voice-api.webp';
import smsSolutionsImg from '../assets/services/illustrations/sms-solutions.webp';
import ringlessVoicemailImg from '../assets/services/illustrations/ringless-voicemail.webp';

/**
 * Unique PageHero illustration per service (flat vector, service-themed).
 * Hover-slider photos stay in ServicesHoverSlider.jsx.
 */
export const serviceHeroImages = {
  'auto-dialer': autoDialerImg,
  'predictive-dialer': predictiveDialerImg,
  'power-dialer': powerDialerImg,
  'progressive-dialer': progressiveDialerImg,
  'business-voip': businessVoipImg,
  'hosted-pbx': hostedPbxImg,
  'sip-trunking': sipTrunkingImg,
  'mobile-voip': mobileVoipImg,
  'click-to-call': clickToCallImg,
  'inbound-services': inboundServicesImg,
  'toll-free-origination': tollFreeOriginationImg,
  'did-services': didServicesImg,
  'virtual-numbers': virtualNumbersImg,
  'outbound-services': outboundServicesImg,
  'toll-free-termination': tollFreeTerminationImg,
  'wholesale-termination': wholesaleTerminationImg,
  'voip-termination': voipTerminationImg,
  'call-center-software': callCenterSoftwareImg,
  'virtual-contact-center': virtualContactCenterImg,
  'ivr-auto-attendant': ivrAutoAttendantImg,
  'call-routing-queues': callRoutingQueuesImg,
  'call-recording': callRecordingImg,
  'call-analytics': callAnalyticsImg,
  'voice-api': voiceApiImg,
  'sms-solutions': smsSolutionsImg,
  'ringless-voicemail': ringlessVoicemailImg,
};

export function getServiceHeroImage(serviceId) {
  return serviceHeroImages[serviceId] || callCenterSoftwareImg;
}
