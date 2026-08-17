import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) {
      errs.name = 'Name is required.';
    }

    if (!data.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.message.trim()) {
      errs.message = 'Message is required.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Validate in real time
    const validationErrors = validate(updatedData);
    setErrors(validationErrors);
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.message.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Successful submission (mocked without backend API call)
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>

      <div className="contact-container">
        <article>
          <h3>Direct Details</h3>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:madaniritish2007@gmail.com" className="contact-link">
                madaniritish2007@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/madani-ritish-639a81373/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Madani Ritish
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Mobile</span>
              <span className="contact-value">+91 XXXXXXXXXX</span>
            </div>
          </div>
        </article>

        <article>
          <h3>Send a Message</h3>

          {isSubmitted && (
            <div className="success-message" role="status" aria-live="polite">
              ✓ Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? 'true' : 'false'}
                placeholder="Your full name"
                required
              />
              {errors.name && (
                <span id="name-error" className="error-text" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder="name@example.com"
                required
              />
              {errors.email && (
                <span id="email-error" className="error-text" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'input-error' : ''}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={errors.message ? 'true' : 'false'}
                placeholder="Type your message here..."
                required
              ></textarea>
              {errors.message && (
                <span id="message-error" className="error-text" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" disabled={!isFormValid}>
              Send Message
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Contact;
