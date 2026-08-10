import { body, validationResult } from 'express-validator';

export const contactRules = [
  body('name')
    .trim()
    .escape()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters.'),
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone number is too long.')
    .matches(/^[0-9+\-\s().]*$/)
    .withMessage('Phone number contains invalid characters.'),
  body('subject')
    .trim()
    .escape()
    .isLength({ min: 3, max: 120 })
    .withMessage('Subject must be between 3 and 120 characters.'),
  body('service')
    .optional({ values: 'falsy' })
    .trim()
    .escape()
    .isLength({ max: 80 })
    .withMessage('Service selection is invalid.'),
  body('message')
    .trim()
    .escape()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters.'),
];

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }
  return next();
}
