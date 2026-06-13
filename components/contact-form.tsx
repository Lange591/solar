"use client"

import { useState } from "react"
import { Send, CheckCircle2, Phone, Building, MapPin, Target, DollarSign, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

type QuoteForm = {
  name: string
  phone: string
  location: string
  systemSize: string
  budget: string
  useCase: string
  message: string
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState<QuoteForm>({
    name: "",
    phone: "",
    location: "",
    systemSize: "",
    budget: "",
    useCase: "",
    message: "",
  })

  function update(field: keyof QuoteForm) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const text = encodeURIComponent(`
🏠 SOLAR UNIVERSE - QUOTE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${form.name}
📱 Phone: ${form.phone}
📍 Location: ${form.location}
⚡ System Size: ${form.systemSize}
💰 Budget: ${form.budget}
🏢 Use Case: ${form.useCase}

📝 Message:
${form.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from Solar Universe Website
    `.trim())

    setSubmitted(true)
    setIsSubmitting(false)
    window.open(`https://wa.me/${site.phoneIntl.replace("+", "")}?text=${text}`, "_blank")
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-foreground">Quote Request Ready!</h3>
        <p className="mt-2 text-muted-foreground">
          WhatsApp has opened with your pre-filled quote details.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Just review and send to get a response from our team.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => {
            setSubmitted(false)
            setForm({
              name: "",
              phone: "",
              location: "",
              systemSize: "",
              budget: "",
              useCase: "",
              message: "",
            })
          }}
        >
          Submit Another Quote
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-lg space-y-5">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground">Request a Free Quote</h3>
        <p className="text-sm text-muted-foreground">Fill in your details and we'll get back to you quickly</p>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <span className="text-accent">*</span> Full Name
        </label>
        <input
          required
          placeholder="John Doe"
          onChange={update("name")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">*</span> Phone Number
        </label>
        <input
          required
          type="tel"
          placeholder="0770010502"
          onChange={update("phone")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">*</span> Location
        </label>
        <input
          required
          placeholder="Mutare, Zimbabwe"
          onChange={update("location")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Target className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">*</span> System Size
        </label>
        <select
          required
          onChange={update("systemSize")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="">Select system size</option>
          <option>3kVA (Basic Home Backup)</option>
          <option>5kVA (Standard Home)</option>
          <option>7.5kVA (Large Home)</option>
          <option>10kVA+ (Business/Farm)</option>
          <option>Not sure - Need advice</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <DollarSign className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">*</span> Budget Range
        </label>
        <select
          required
          onChange={update("budget")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="">Select budget range (USD)</option>
          <option>Under $2,000</option>
          <option>$2,000 – $5,000</option>
          <option>$5,000 – $10,000</option>
          <option>$10,000 – $20,000</option>
          <option>$20,000+</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Building className="h-3.5 w-3.5 text-accent" />
          <span className="text-accent">*</span> Property Type
        </label>
        <select
          required
          onChange={update("useCase")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="">Select property type</option>
          <option>Residential Home</option>
          <option>Commercial Business</option>
          <option>Farm / Agricultural</option>
          <option>Industrial</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5 text-accent" />
          Additional Notes
        </label>
        <textarea
          rows={4}
          placeholder="Tell us more about your energy needs..."
          onChange={update("message")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
      >
        {isSubmitting ? (
          "Processing..."
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Quote via WhatsApp
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        We'll respond within 24 hours via WhatsApp or phone call
      </p>
    </form>
  )
}