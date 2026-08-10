import { Router } from 'express';
import { contactRules, handleValidation } from '../middleware/validateContact.js';

const router = Router();

// In-memory store for demo; replace with email/DB integration in production.
const inquiries = [];

router.post('/', contactRules, handleValidation, (req, res) => {
  try {
    const { name, email, phone, subject, service, message } = req.body;

    const inquiry = {
      id: `inq_${Date.now()}`,
      name,
      email,
      phone: phone || null,
      subject,
      service: service || null,
      message,
      receivedAt: new Date().toISOString(),
    };

    inquiries.push(inquiry);

    // Keep memory bounded in long-running demos.
    if (inquiries.length > 200) {
      inquiries.shift();
    }

    console.log('[contact] New inquiry:', {
      id: inquiry.id,
      name: inquiry.name,
      email: inquiry.email,
      subject: inquiry.subject,
      service: inquiry.service,
    });

    return res.status(201).json({
      success: true,
      message: 'Thanks for reaching out. Our team will get back to you shortly.',
      data: { id: inquiry.id },
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
