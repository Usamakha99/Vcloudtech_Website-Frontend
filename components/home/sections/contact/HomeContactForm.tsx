"use client";

import { type FormEvent, useState } from "react";

import { dt } from "@/components/marketing/design-test-theme";
import { designTestInquiryTypes } from "@/lib/marketing/contact-options";

type Props = {
  submitClassName?: string;
};

/** Shared homepage contact form — name, email, inquiry type, message. */
export function HomeContactForm({ submitClassName }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="dt-contact__success" role="status">
        <p className="dt-contact__success-title">Message received</p>
        <p className={`dt-contact__success-text ${dt.body}`}>
          Thank you for reaching out. A member of our team will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="dt-contact__form" onSubmit={handleSubmit} noValidate>
      <div className="dt-contact__field">
        <label htmlFor="contact-name" className="dt-contact__label">
          Full Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="dt-contact__input"
        />
      </div>

      <div className="dt-contact__field">
        <label htmlFor="contact-email" className="dt-contact__label">
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="dt-contact__input"
        />
      </div>

      <div className="dt-contact__field">
        <label htmlFor="contact-inquiry" className="dt-contact__label">
          Inquiry Type
        </label>
        <div className="dt-contact__select-wrap">
          <select
            id="contact-inquiry"
            name="inquiryType"
            required
            className="dt-contact__select"
            defaultValue=""
          >
            <option value="" disabled>
              Select an inquiry type
            </option>
            {designTestInquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dt-contact__field">
        <label htmlFor="contact-message" className="dt-contact__label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="dt-contact__textarea"
        />
      </div>

      <button
        type="submit"
        className={submitClassName ? `dt-contact__submit ${submitClassName}` : "dt-contact__submit"}
      >
        Send message
      </button>
    </form>
  );
}
