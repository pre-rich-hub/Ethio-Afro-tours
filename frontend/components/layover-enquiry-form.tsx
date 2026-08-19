'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { submitContact } from '@/lib/api'
import { useLanguage } from '@/components/language-provider'

type PackageOption = { slug: string; title: string }
const packageEvent = 'layover-package-selected'

export function LayoverPackageLink({
  title,
  label = 'Choose this package',
}: {
  title: string
  label?: string
}) {
  return (
    <a
      href="#layover-enquiry"
      onClick={() => window.dispatchEvent(new CustomEvent(packageEvent, { detail: title }))}
      className="inline-flex items-center justify-center bg-primary px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-charcoal"
    >
      {label}
    </a>
  )
}

export function LayoverEnquiryForm({
  packages,
}: {
  packages: PackageOption[]
}) {
  const { t } = useLanguage()
  const [selectedPackage, setSelectedPackage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const select = (event: Event) => setSelectedPackage((event as CustomEvent<string>).detail)
    window.addEventListener(packageEvent, select)
    return () => window.removeEventListener(packageEvent, select)
  }, [])

  if (submitted) {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center border border-border bg-card px-6 py-16 text-center">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-serif text-3xl text-foreground">{t('layover.form.successTitle', 'We have your flight details')}</h3>
        <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {t('layover.form.successText', 'Our Addis team will check the connection, visa considerations and operating window before recommending the right plan.')}
        </p>
      </div>
    )
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '').trim()
    const lines = [
      'Journey: Addis Ababa layover or stopover',
      `Package: ${value('package')}`,
      `Arrival: ${value('arrivalDate')} at ${value('arrivalTime')} · ${value('arrivalFlight')}`,
      `Departure: ${value('departureDate')} at ${value('departureTime')} · ${value('departureFlight')}`,
      `Passport nationality: ${value('nationality')}`,
      `Travellers: ${value('travellers')}`,
      `WhatsApp: ${value('whatsapp') || 'Not provided'}`,
      `Checked-through luggage: ${value('luggage')}`,
      `Hotel or day room: ${value('hotel')}`,
      `Dietary or mobility needs: ${value('requirements') || 'None provided'}`,
      '',
      value('notes') || 'No additional notes.',
    ]

    try {
      await submitContact({
        name: value('name'),
        email: value('email'),
        message: lines.join('\n'),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('form.error', 'Something went wrong — please try again.'))
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 border border-border bg-card p-6 shadow-[0_28px_70px_-40px_oklch(0.185_0.012_58/0.4)] sm:p-8 lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('form.fullName', 'Full name')} id="layover-name">
          <input id="layover-name" name="name" required minLength={2} className="input" placeholder={t('form.yourName', 'Your name')} />
        </Field>
        <Field label={t('form.email', 'Email address')} id="layover-email">
          <input id="layover-email" name="email" type="email" required className="input" placeholder="you@email.com" />
        </Field>
        <Field label={t('layover.form.whatsapp', 'WhatsApp number')} id="layover-whatsapp">
          <input id="layover-whatsapp" name="whatsapp" type="tel" className="input" placeholder={t('layover.form.whatsappPlaceholder', 'Country code + number')} />
        </Field>
        <Field label={t('layover.form.nationality', 'Passport nationality')} id="layover-nationality">
          <input id="layover-nationality" name="nationality" required className="input" placeholder={t('layover.form.nationalityPlaceholder', 'Nationality on your passport')} />
        </Field>
        <Field label={t('layover.form.package', 'Preferred package')} id="layover-package">
          <select id="layover-package" name="package" required value={selectedPackage} onChange={(event) => setSelectedPackage(event.target.value)} className="input">
            <option value="" disabled>{t('layover.form.selectPackage', 'Select a package')}</option>
            {packages.map((item) => <option key={item.slug} value={item.title}>{item.title}</option>)}
          </select>
        </Field>
        <Field label={t('form.travellers', 'Number of travellers')} id="layover-travellers">
          <input id="layover-travellers" name="travellers" required className="input" placeholder={t('layover.form.travellersPlaceholder', '2 adults, 1 child')} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t('layover.form.arrival', 'Arrival at Bole (ADD)')}</legend>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label={t('layover.form.date', 'Date')} id="layover-arrival-date"><input id="layover-arrival-date" name="arrivalDate" type="date" required className="input" /></Field>
          <Field label={t('layover.form.localTime', 'Local time')} id="layover-arrival-time"><input id="layover-arrival-time" name="arrivalTime" type="time" required className="input" /></Field>
          <Field label={t('layover.form.flight', 'Flight number')} id="layover-arrival-flight"><input id="layover-arrival-flight" name="arrivalFlight" required className="input" placeholder="ET 501" /></Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t('layover.form.departure', 'Onward departure')}</legend>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label={t('layover.form.date', 'Date')} id="layover-departure-date"><input id="layover-departure-date" name="departureDate" type="date" required className="input" /></Field>
          <Field label={t('layover.form.localTime', 'Local time')} id="layover-departure-time"><input id="layover-departure-time" name="departureTime" type="time" required className="input" /></Field>
          <Field label={t('layover.form.flight', 'Flight number')} id="layover-departure-flight"><input id="layover-departure-flight" name="departureFlight" required className="input" placeholder="ET 700" /></Field>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t('layover.form.luggage', 'Is your luggage checked through?')} id="layover-luggage">
          <select id="layover-luggage" name="luggage" required defaultValue="" className="input">
            <option value="" disabled>{t('layover.form.selectOne', 'Select one')}</option><option>{t('yes', 'Yes')}</option><option>{t('no', 'No')}</option><option>{t('notSure', 'Not sure')}</option>
          </select>
        </Field>
        <Field label={t('layover.form.hotel', 'Hotel or day room')} id="layover-hotel">
          <select id="layover-hotel" name="hotel" required defaultValue="Not needed" className="input">
            <option>{t('layover.form.notNeeded', 'Not needed')}</option><option>{t('layover.form.dayRoom', 'Day room requested')}</option><option>{t('layover.form.overnightHotel', 'Overnight hotel requested')}</option><option>{t('notSure', 'Not sure')}</option>
          </select>
        </Field>
      </div>

      <Field label={t('layover.form.requirements', 'Dietary, accessibility or mobility needs')} id="layover-requirements">
        <input id="layover-requirements" name="requirements" className="input" placeholder={t('layover.form.requirementsPlaceholder', 'Tell us what will make the visit comfortable')} />
      </Field>
      <Field label={t('layover.form.notes', 'Anything else we should know?')} id="layover-notes">
        <textarea id="layover-notes" name="notes" rows={4} className="input resize-none" placeholder={t('layover.form.notesPlaceholder', 'Interests, children’s ages, hotel preferences or questions')} />
      </Field>

      {error ? <p className="text-xs text-red-600" role="alert">{error}</p> : null}
      <button type="submit" className="group inline-flex w-full items-center justify-center gap-2.5 bg-primary px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors duration-300 hover:bg-charcoal sm:w-auto">
        {t('layover.form.submit', 'Check my connection')} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {t('layover.form.privacyNotice', 'Submitting an enquiry does not confirm visa eligibility or a booking. We reply personally within 24 hours. Your flight and travel details are handled as described in our')}{' '}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
      </p>
    </form>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return <label htmlFor={id} className="block"><span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</span>{children}</label>
}
