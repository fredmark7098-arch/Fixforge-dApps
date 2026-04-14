"use client";

import { useForm, ValidationError } from "@formspree/react";
import {
  FORMSPREE_CONTACT_ACTION,
  FORMSPREE_CONTACT_FORM_ID,
} from "@/lib/formspreeConfig";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const emptyForm = {
  firstname: "",
  lastname: "",
  email: "",
  phnumber: "",
  Message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [showThanks, setShowThanks] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const successHandled = useRef(false);

  const [formspreeState, formspreeSubmit, resetFormspree] = useForm(
    FORMSPREE_CONTACT_FORM_ID
  );

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    if (!formspreeState.succeeded) {
      successHandled.current = false;
      return;
    }
    if (successHandled.current) return;
    successHandled.current = true;
    setShowThanks(true);
    setFormData(emptyForm);
    resetFormspree();
    const t = window.setTimeout(() => setShowThanks(false), 5000);
    return () => window.clearTimeout(t);
  }, [formspreeState.succeeded, resetFormspree]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    void formspreeSubmit(e).catch((reason: unknown) => {
      console.error("[contact] Formspree submit failed", reason);
      toast.error(
        reason instanceof Error
          ? reason.message
          : "Could not send your message. Please try again."
      );
    });
  };

  return (
    <section id="contact" className="scroll-mt-14">
      <div className="container">
        <div className="relative">
          <h2 className="mb-9  capitalize">Get in Touch</h2>
          <div className="relative border border-lightblue/35 px-6 py-2 rounded-2xl">
            <form
              action={FORMSPREE_CONTACT_ACTION}
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full m-auto justify-between"
            >
              <input type="hidden" name="_subject" value="Website contact" />
              <div className="sm:flex gap-6 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="fname"
                    className="pb-3 inline-block text-base text-lightpurple"
                  >
                    First Name
                  </label>
                  <input
                    id="fname"
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                  <ValidationError
                    prefix="First name"
                    field="firstname"
                    errors={formspreeState.errors}
                    className="mt-1 text-sm text-primary"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="lname"
                    className="pb-3 inline-block text-base text-lightpurple"
                  >
                    Last Name
                  </label>
                  <input
                    id="lname"
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                  <ValidationError
                    prefix="Last name"
                    field="lastname"
                    errors={formspreeState.errors}
                    className="mt-1 text-sm text-primary"
                  />
                </div>
              </div>
              <div className="sm:flex gap-6 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="email"
                    className="pb-3 inline-block text-base text-lightpurple"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={formspreeState.errors}
                    className="mt-1 text-sm text-primary"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label
                    htmlFor="Phnumber"
                    className="pb-3 inline-block text-base text-lightpurple"
                  >
                    Phone Number
                  </label>
                  <input
                    id="Phnumber"
                    type="tel"
                    name="phnumber"
                    placeholder="+1234567890"
                    value={formData.phnumber}
                    onChange={handleChange}
                    className="w-full text-base px-4 rounded-2xl py-2.5 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  />
                  <ValidationError
                    prefix="Phone"
                    field="phnumber"
                    errors={formspreeState.errors}
                    className="mt-1 text-sm text-primary"
                  />
                </div>
              </div>
              <div className="w-full mx-0 my-2.5 flex-1">
                <label
                  htmlFor="message"
                  className="text-base inline-block text-lightpurple"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  className="w-full mt-2 rounded-2xl px-5 py-3 border-lightblue/35 border transition-all duration-500 focus:border-primary focus:outline-0 placeholder:text-lightsky/40 text-white"
                  placeholder="Anything else you wanna communicate"
                />
                <ValidationError
                  prefix="Message"
                  field="Message"
                  errors={formspreeState.errors}
                  className="mt-1 text-sm text-primary"
                />
              </div>
              {formspreeState.errors
                ? formspreeState.errors.getFormErrors().map((err, i) => (
                    <p
                      key={`${err.code}-${i}`}
                      className="mx-0 my-2 w-full text-sm text-primary"
                      role="alert"
                    >
                      {err.message}
                    </p>
                  ))
                : null}
              <div className="mx-0 my-2.5 w-full">
                <button
                  type="submit"
                  disabled={!isFormValid || formspreeState.submitting}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || formspreeState.submitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer"
                    }`}
                >
                  {formspreeState.submitting ? "Sending…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
          {showThanks && (
            <div className="text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2">
              Thank you for contacting us! We will get back to you soon.
              <div className="w-3 h-3 rounded-full animate-spin border-2 border-lightblue border-t-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
