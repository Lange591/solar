"use client"

import { useState } from "react"
import { Send, CheckCircle2 } from "lucide-react"
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

    const text = encodeURIComponent(`
Solar Universe Website Quote Request

Name: ${form.name}
Phone: ${form.phone}
Location: ${form.location}
System size: ${form.systemSize}
Budget: ${form.budget}
Use case: ${form.useCase}

Message:
${form.message}
    `.trim())

    setSubmitted(true)
    window.open(`https://wa.me/${site.phoneIntl.replace("+", "")}?text=${text}`, "_blank")
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-accent" />
        <h3 className="mt-4 text-xl font-bold">Message ready</h3>
        <p className="mt-2 text-muted-foreground">
          WhatsApp has opened with your quote details.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
          Send another quote
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 space-y-5">
      <input required placeholder="Full name" onChange={update("name")} className="input" />
      <input required placeholder="Phone number" onChange={update("phone")} className="input" />
      <input required placeholder="Location (Town / Area)" onChange={update("location")} className="input" />

      <select required onChange={update("systemSize")} className="input">
        <option value="">System size</option>
        <option>3kVA</option>
        <option>5kVA</option>
        <option>10kVA+</option>
        <option>Not sure</option>
      </select>

      <select required onChange={update("budget")} className="input">
        <option value="">Budget range</option>
        <option>Under $2,000</option>
        <option>$2,000 – $5,000</option>
        <option>$5,000+</option>
      </select>

      <select required onChange={update("useCase")} className="input">
        <option value="">Use case</option>
        <option>Home</option>
        <option>Business</option>
        <option>Farm</option>
      </select>

      <textarea
        required
        rows={4}
        placeholder="Additional notes"
        onChange={update("message")}
        className="input"
      />

      <Button type="submit" size="lg" className="w-full bg-accent">
        <Send className="size-4" />
        Send Quote via WhatsApp
      </Button>
    </form>
  )
}
