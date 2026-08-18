import { Router } from 'express';
import { contactRules, handleValidation } from '../middleware/validateContact.js';
import { clientMeta } from '../middleware/adminAuth.js';
import { createInquiry } from '../services/contactService.js';

const router = Router();

router.post('/', contactRules, handleValidation, (req, res) => {
  try {
    const { name, email, phone, subject, service, message } = req.body;
    const meta = clientMeta(req);
    const saved = createInquiry({
      name,
      email,
      phone: phone || '',
      subject,
      service: service || '',
      message,
      ip: meta.ip,
      userAgent: meta.userAgent,
    });

    console.log('[contact] New inquiry:', {
      id: saved.id,
      name,
      email,
      subject,
    });

    return res.status(201).json({
      success: true,
      message: 'Thanks for reaching out. Our team will get back to you shortly.',
      data: { id: saved.id },
    });
  } catch (error) {
    console.error('[contact] Failed to process inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message. Please try again.',
    });
  }
});

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Contact API is healthy.' });
});

export default router;
