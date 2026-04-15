"use client";

import { RevealOnView } from "@/app/components/shared/RevealOnView";
import { submitWeb3Forms } from "@/lib/web3formsConfig";
import React, { useEffect, useState } from "react";
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
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    if (!showThanks) return;
    const t = window.setTimeout(() => setShowThanks(false), 5000);
    return () => window.clearTimeout(t);
  }, [showThanks]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || submitting) return;
    setFormError(null);
    setSubmitting(true);
    try {
      await submitWeb3Forms({
        subject: "Website contact",
        email: formData.email.trim(),
        name: `${formData.firstname} ${formData.lastname}`.trim(),
        message: formData.Message.trim(),
        phone: formData.phnumber.trim(),
      });
      setShowThanks(true);
      setFormData(emptyForm);
    } catch (reason: unknown) {
      console.error("[contact] Web3Forms submit failed", reason);
      const msg =
        reason instanceof Error
          ? reason.message
          : "Could not send your message. Please try again.";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-14">
      <RevealOnView className="container">
        <div className="relative">
          <h2 className="mb-9  capitalize">Get in Touch</h2>
          <div className="relative border border-lightblue/35 px-6 py-2 rounded-2xl">
            <form
              onSubmit={(e) => void handleSubmit(e)}
              className="flex flex-wrap w-full m-auto justify-between"
            >
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
              </div>
              {formError ? (
                <p className="mx-0 my-2 w-full text-sm text-primary" role="alert">
                  {formError}
                </p>
              ) : null}
              <div className="mx-0 my-2.5 w-full">
                <button
                  type="submit"
                  disabled={!isFormValid || submitting}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || submitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer"
                    }`}
                >
                  {submitting ? "Sending…" : "Submit"}
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
      </RevealOnView>
    </section>
  );
};

export default ContactForm;
