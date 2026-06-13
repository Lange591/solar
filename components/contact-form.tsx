"use client"

import type React from "react"
import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" })

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  const message = `
🔆 *Solar Universe – New Quotation Request*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email || "Not provided"}
⚡ Service: ${form.service}

📝 Message:
${form.message}
  `.trim()

  const text = encodeURIComponent(message)
  setSubmitted(true)

  window.open(
    `https://wa.me/${site.phoneIntl.replace("+", "")}?text=${text}`,
    "_blank"
  )
}

  const fieldClass =
    "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="mt-4 font-heading text-xl font-bold text-foreground">Thank you!</h3>
        <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
          Your message is on its way. We have opened WhatsApp so you can send it directly, or call
          us any time on {site.phone}.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full name
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={update("name")}
            className={fieldClass}
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={update("phone")}
              className={fieldClass}
              placeholder="07X XXX XXXX"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              className={fieldClass}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="service" className="text-sm font-medium text-foreground">
            Service needed
          </label>
          <select id="service" value={form.service} onChange={update("service")} className={fieldClass}>
            <option value="">Select a service</option>
            <option>Solar Panel Installation</option>
            <option>Battery Storage &amp; Inverters</option>
            <option>Solar Water Heating</option>
            <option>Maintenance &amp; Repairs</option>
            <option>Electrical Engineering</option>
            <option>Energy Consulting</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={form.message}
            onChange={update("message")}
            className={fieldClass}
            placeholder="Tell us about your project or energy needs..."
          />
        </div>

        <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Send className="size-4" />
          Send via WhatsApp
        </Button>
      </div>
    </form>
  )
}
