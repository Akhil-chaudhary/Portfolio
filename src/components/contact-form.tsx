"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Trigger premium interactive confetti blast
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#a855f7", "#10b981", "#ffffff"],
      });

      setStatus("success");
      reset();

      // Open email draft with the form details in client's mailer
      const mailtoUrl = `mailto:akhilcodebugged@gmail.com?subject=${encodeURIComponent(
        data.subject || "Project Query"
      )}&body=${encodeURIComponent(
        `Hi Akhil,\n\nMy name is ${data.name} (${data.email}).\n\n${data.message}`
      )}`;
      
      // Delay opening mail to let user see success state first
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1000);
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0d0d12]/40 border border-[#1f1f2e]/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-[#3b82f6]/30 transition-all duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      {status === "success" ? (
        <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
          <div className="p-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
            Thank you! Your mail client will now open a pre-drafted message to complete delivery.
          </p>
          <Button
            onClick={() => setStatus("idle")}
            variant="outline"
            className="mt-8 rounded-full px-6 text-xs uppercase tracking-widest border-white/10 hover:bg-white/5 cursor-pointer text-white"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-blue-400 uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Drop a Line</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Your Name
            </label>
            <Input
              type="text"
              placeholder="e.g. John Doe"
              {...register("name", { required: "Name is required" })}
              className={`bg-white/5 border-white/5 focus:border-[#3b82f6]/50 focus:bg-white/10 rounded-xl py-6 text-white ${
                errors.name ? "border-red-500/50" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Your Email
            </label>
            <Input
              type="email"
              placeholder="e.g. john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`bg-white/5 border-white/5 focus:border-[#3b82f6]/50 focus:bg-white/10 rounded-xl py-6 text-white ${
                errors.email ? "border-red-500/50" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Subject
            </label>
            <Input
              type="text"
              placeholder="e.g. Collab Proposal"
              {...register("subject", { required: "Subject is required" })}
              className={`bg-white/5 border-white/5 focus:border-[#3b82f6]/50 focus:bg-white/10 rounded-xl py-6 text-white ${
                errors.subject ? "border-red-500/50" : ""
              }`}
            />
            {errors.subject && (
              <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.subject.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Message
            </label>
            <Textarea
              placeholder="Write your message here..."
              rows={5}
              {...register("message", { required: "Message is required" })}
              className={`bg-white/5 border-white/5 focus:border-[#3b82f6]/50 focus:bg-white/10 rounded-xl text-white ${
                errors.message ? "border-red-500/50" : ""
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-xs mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message.message}
              </span>
            )}
          </div>

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>Something went wrong. Please check your fields and try again.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-white hover:bg-neutral-200 text-black py-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors duration-300 shadow-xl shadow-white/5 cursor-pointer text-sm"
          >
            {status === "sending" ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
