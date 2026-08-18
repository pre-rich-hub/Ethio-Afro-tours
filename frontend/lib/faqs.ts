export type FaqItem = {
  question: string
  answer: string
}

export const tourFaqs: readonly FaqItem[] = [
  {
    question: 'Are these fixed group departures?',
    answer:
      'No. Our journeys are private and designed around the people travelling together. The routes on this page are starting points, not fixed departures.',
  },
  {
    question: 'Can I customize one of these tours?',
    answer:
      'Yes. We can adjust the pace, length, accommodation, activities and route around your dates, interests and comfort with road time or altitude.',
  },
  {
    question: 'Can two itineraries be combined?',
    answer:
      'Yes. Many guests combine parts of two routes. Tell us which places matter most and we will redraw them as one practical journey.',
  },
  {
    question: 'What is included in the price?',
    answer:
      'Each tour page lists its usual inclusions and exclusions. Your final proposal confirms the exact accommodation, transport, guiding, meals, flights and entrance fees covered by the quote.',
  },
  {
    question: 'How large are the tour groups?',
    answer:
      'Journeys are private, with the published routes designed for parties of up to ten guests. The exact suitable group size is shown on each tour page.',
  },
  {
    question: 'What happens after I enquire?',
    answer:
      'An Addis-based designer normally replies within 24 hours with questions and a first route. We revise it with you, and no deposit is taken until the itinerary reads right.',
  },
]

export const layoverFaqs: readonly FaqItem[] = [
  {
    question: 'Can every transit passenger leave Bole Airport?',
    answer:
      'No. It depends on passport nationality, visa status, immigration approval, baggage and the time between flights. We review the itinerary, but travellers must obtain the correct permission to enter Ethiopia.',
  },
  {
    question: 'What happens if the inbound flight is delayed?',
    answer:
      'We track the flight number you provide and adjust, shorten or cancel the sightseeing plan when the safe operating window changes. Your onward connection always takes priority.',
  },
  {
    question: 'Are meals, entrance fees and hotels included?',
    answer:
      'Your proposal will state exactly what is included. Package ideas are flexible, and no meal, entrance fee, room or domestic flight is included unless it appears in the confirmed quote.',
  },
  {
    question: 'Can I book an evening layover?',
    answer:
      'Yes. The evening route focuses on food, coffee, music and available viewpoints because museums and many heritage sites may be closed.',
  },
  {
    question: 'Is Lalibela suitable for a 48-hour connection?',
    answer:
      'We recommend at least 60–72 hours and only confirm the extension after checking domestic schedules and a safe return buffer before the international flight.',
  },
]
