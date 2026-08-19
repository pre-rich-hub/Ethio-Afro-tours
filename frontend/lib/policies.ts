export type PolicySection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type PolicyDocument = {
  slug: 'privacy' | 'terms' | 'booking-policy' | 'responsible-tourism'
  eyebrow: string
  title: string
  description: string
  introduction: string
  sections: PolicySection[]
  related: { label: string; href: string }[]
}

export const policyEffectiveDate = '19 August 2026'

export const privacyPolicy: PolicyDocument = {
  slug: 'privacy',
  eyebrow: 'Privacy & data protection',
  title: 'Privacy Policy',
  description:
    'How Ethio Afro Tours collects, uses, stores and shares personal information when you visit our website or plan a journey with us.',
  introduction:
    'Ethio Afro Tours respects your privacy. This policy explains what information we handle through this website, why we need it, and the choices available to you.',
  sections: [
    {
      id: 'who-we-are',
      title: '1. Who we are',
      paragraphs: [
        'Ethio Afro Tours is a tour operator and destination management company based at Bole Medhaniallem, Cape Verde Street 1000, Addis Ababa, Ethiopia. For questions about this policy or your personal information, contact info@ethioafrotours.com.',
      ],
    },
    {
      id: 'information-we-collect',
      title: '2. Information we collect',
      paragraphs: [
        'We collect information you choose to provide and limited technical information generated when you use the website.',
      ],
      bullets: [
        'General and tour enquiries: your name, email address, preferred travel dates, number of travellers, journey interests and the message you send.',
        'Layover enquiries: your contact details, WhatsApp number, passport nationality, selected package, flight numbers and times, traveller count, luggage and hotel needs, and any dietary, accessibility or mobility information you choose to share.',
        'Bookings: your name, email, telephone number, country, selected tour and date, and numbers of adults and children.',
        'Newsletter: your email address.',
        'AI assistant: your messages, a randomly generated chat-session identifier, a hashed version of your IP address, message counts and operational timestamps.',
        'Website use: your saved language preference, anonymized and aggregated analytics, and security or server logs provided by our hosting infrastructure.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: '3. How we use your information',
      bullets: [
        'To answer questions, assess flight connections and prepare tailored itineraries and quotations.',
        'To arrange and administer a booking, including coordinating relevant services with guides, hotels, transport providers and other travel suppliers.',
        'To send the newsletter when you subscribe and to respond to requests to unsubscribe.',
        'To operate, secure, troubleshoot and improve the website and AI assistant.',
        'To comply with legal, tax, accounting, safety and fraud-prevention obligations and to establish or defend legal claims.',
      ],
      paragraphs: [
        'Depending on the context, we process information because you asked us to take steps toward a booking, because it is necessary to perform an agreed service, because you consented, because we have a legitimate operational or security interest, or because the law requires it.',
      ],
    },
    {
      id: 'sensitive-information',
      title: '4. Sensitive travel information',
      paragraphs: [
        'Dietary, accessibility or mobility details may reveal health-related information. Please provide only what is relevant to arranging your trip. We use this information to assess and deliver the requested service and share it only where reasonably necessary with the suppliers involved. Do not send passport scans, payment-card numbers or other unnecessary sensitive documents through an enquiry form or the AI assistant.',
      ],
    },
    {
      id: 'sharing-and-providers',
      title: '5. Sharing and service providers',
      paragraphs: [
        'We do not sell personal information. We share it only as reasonably necessary to provide, operate or protect our services. Recipients may include:',
      ],
      bullets: [
        'Travel suppliers such as hotels, guides, drivers, airlines or local operators involved in planning or delivering your itinerary.',
        'Our website host, database provider, email provider, content-delivery network and technical support providers.',
        'The configured AI provider—OpenAI or Google Gemini—when you use the AI assistant. Your message is sent to that provider so a response can be generated.',
        'Professional advisers, insurers, payment providers used outside this website, and public authorities where legally required.',
        'Some providers may process information outside Ethiopia. Where information is transferred internationally, we take reasonable steps to use reputable providers and appropriate contractual or legal safeguards.',
      ],
    },
    {
      id: 'analytics-and-storage',
      title: '6. Analytics, cookies and local storage',
      paragraphs: [
        'The public website uses Vercel Web Analytics to understand broad traffic patterns. It is designed to operate without analytics cookies and reports anonymized, aggregated information. The language selector stores your language choice in your browser’s local storage so the site can remember it. Essential authentication cookies may be used in the restricted administration area and are not part of the ordinary visitor experience.',
      ],
    },
    {
      id: 'retention',
      title: '7. How long we keep information',
      paragraphs: [
        'AI-chat sessions are scheduled for deletion after 30 days. Newsletter addresses are kept until you unsubscribe or ask us to delete them. Enquiry and booking records are kept only for as long as reasonably needed to respond, arrange or document travel, meet legal and accounting requirements, resolve disputes and protect the business. Backup copies and provider logs may remain for a limited additional period under standard security and recovery processes.',
      ],
    },
    {
      id: 'payments',
      title: '8. Payments',
      paragraphs: [
        'This website does not currently collect or store payment-card details. If you proceed with a booking, payment arrangements and the applicable provider will be identified in your written proposal or payment instructions. Review that provider’s privacy terms before submitting payment information.',
      ],
    },
    {
      id: 'your-choices',
      title: '9. Your choices and rights',
      paragraphs: [
        'You may ask to access, correct or delete personal information we hold about you, object to or restrict certain uses, or withdraw consent where processing relies on consent. You may unsubscribe from the newsletter at any time by emailing us. Some requests may be limited by legal, accounting, safety or record-keeping obligations. Send requests to info@ethioafrotours.com; we may need to verify your identity before acting.',
      ],
    },
    {
      id: 'security-and-children',
      title: '10. Security and children',
      paragraphs: [
        'We use reasonable technical and organizational measures to protect information, but no internet transmission or storage system is completely secure. Our website is intended for adults planning travel. A parent or guardian should provide any information needed about a child travelling in their party.',
      ],
    },
    {
      id: 'changes',
      title: '11. Changes to this policy',
      paragraphs: [
        'We may update this policy as our services or legal obligations change. The effective date at the top of this page shows when this version took effect. Material changes will be highlighted on the website where appropriate.',
      ],
    },
  ],
  related: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Booking & Cancellation Policy', href: '/booking-policy' },
  ],
}

export const termsPolicy: PolicyDocument = {
  slug: 'terms',
  eyebrow: 'Website & travel terms',
  title: 'Terms & Conditions',
  description:
    'The terms governing use of the Ethio Afro Tours website, travel enquiries, quotations and services.',
  introduction:
    'These terms govern your use of this website and form the general framework for travel services arranged by Ethio Afro Tours. Booking-specific terms in an accepted written proposal also apply.',
  sections: [
    {
      id: 'operator-and-acceptance',
      title: '1. Operator and acceptance',
      paragraphs: [
        'This website is operated by Ethio Afro Tours from Bole Medhaniallem, Cape Verde Street 1000, Addis Ababa, Ethiopia. By using the website, you agree to these terms. If you do not agree, please do not use it.',
      ],
    },
    {
      id: 'website-information',
      title: '2. Website information',
      paragraphs: [
        'We aim to keep destination, itinerary, price and availability information accurate, but travel conditions change. Website content is general information and is not a binding offer, guarantee or professional medical, immigration or legal advice. Images may illustrate a destination or style rather than a specific room, vehicle, view or departure.',
      ],
    },
    {
      id: 'acceptable-use',
      title: '3. Acceptable use',
      bullets: [
        'Use the website lawfully and do not interfere with its security, availability or operation.',
        'Do not submit false, unlawful, harmful or infringing content or impersonate another person.',
        'Do not scrape, copy, reverse-engineer or commercially exploit website content except where the law expressly permits it.',
        'Treat AI-assistant responses as general guidance and verify important travel, health, safety and visa information with an appropriate official source or our team.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '4. Intellectual property',
      paragraphs: [
        'The website design, brand, written itineraries, text, graphics and other original materials are owned by or licensed to Ethio Afro Tours and protected by applicable law. Third-party photographs, marks and platform names remain the property of their respective owners. You may use the site for personal trip planning but may not republish or commercially reuse its content without written permission.',
      ],
    },
    {
      id: 'enquiries-quotes-bookings',
      title: '5. Enquiries, quotations and bookings',
      paragraphs: [
        'Submitting a form, speaking with us or receiving a draft itinerary does not confirm a booking. A booking is confirmed only when we confirm it in writing after you accept the proposal and satisfy the stated deposit or payment requirement. Prices, inclusions, exclusions, payment dates and cancellation terms in the accepted written proposal form part of your agreement and control where they differ from general website wording.',
      ],
    },
    {
      id: 'traveller-responsibilities',
      title: '6. Traveller responsibilities',
      bullets: [
        'Provide complete, accurate and timely information, including names matching travel documents and any needs relevant to safe participation.',
        'Obtain and carry valid passports, visas, permits, vaccinations and other required documents.',
        'Review official travel advice and obtain comprehensive travel insurance covering cancellation, medical care, evacuation, baggage and the planned activities.',
        'Follow reasonable safety, cultural, environmental and guide instructions and comply with local law.',
        'Arrive on time and ensure you are physically able to undertake the itinerary and its altitude, climate and activities.',
      ],
    },
    {
      id: 'suppliers-and-changes',
      title: '7. Suppliers, itineraries and changes',
      paragraphs: [
        'Hotels, carriers, guides, parks and other services may be supplied by independent third parties under their own operating conditions. We select and coordinate suppliers with reasonable care but do not control every act, omission or schedule. Routes, accommodations and activities may change because of weather, road conditions, closures, safety concerns, government action, supplier availability or other operational reasons. We may make a reasonable substitute or alteration while preserving the trip’s overall character where practical.',
      ],
    },
    {
      id: 'force-majeure',
      title: '8. Events beyond reasonable control',
      paragraphs: [
        'Neither party is responsible for failing to perform an obligation where performance is prevented by events beyond reasonable control, including severe weather, natural disaster, epidemic, conflict, civil unrest, government restrictions, border or park closures, transport disruption or supplier failure. We will take reasonable steps to assist, but additional or unrecoverable costs may remain payable by the traveller or be addressed through insurance.',
      ],
    },
    {
      id: 'liability',
      title: '9. Liability',
      paragraphs: [
        'Nothing in these terms excludes or limits liability that cannot lawfully be excluded. To the fullest extent permitted by law, Ethio Afro Tours is not liable for indirect or consequential loss, loss caused by inaccurate information supplied by a traveller, failure to follow instructions, independent arrangements, or events beyond reasonable control. Any liability will be assessed under the accepted proposal and applicable Ethiopian law.',
      ],
    },
    {
      id: 'complaints',
      title: '10. Problems and complaints',
      paragraphs: [
        'Tell your guide or our Addis Ababa team promptly if a problem arises during travel so we have a fair opportunity to assist. If it is not resolved, send a written account with supporting information to info@ethioafrotours.com as soon as reasonably possible after the trip.',
      ],
    },
    {
      id: 'privacy-links',
      title: '11. Privacy and third-party links',
      paragraphs: [
        'Our Privacy Policy explains how we handle personal information. Links to third-party websites are provided for convenience; we do not control their availability, content, security or privacy practices.',
      ],
    },
    {
      id: 'law',
      title: '12. Governing law',
      paragraphs: [
        'These terms and disputes relating to the website or our services are governed by the laws of Ethiopia. Subject to any mandatory consumer rights or agreed dispute procedure, the competent courts of Ethiopia have jurisdiction. If one provision is unenforceable, the remaining provisions continue to apply.',
      ],
    },
  ],
  related: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Booking & Cancellation Policy', href: '/booking-policy' },
  ],
}

export const bookingPolicy: PolicyDocument = {
  slug: 'booking-policy',
  eyebrow: 'Before you confirm',
  title: 'Booking & Cancellation Policy',
  description:
    'How Ethio Afro Tours handles quotations, booking confirmation, payments, changes, cancellations and refunds.',
  introduction:
    'Every private journey has different suppliers and commitments. This policy explains our general process; the written proposal you accept contains the commercial terms for your specific booking.',
  sections: [
    {
      id: 'enquiry',
      title: '1. Enquiry and proposal',
      paragraphs: [
        'An online enquiry, telephone conversation, AI-assistant exchange or draft itinerary is not a reservation. Availability and prices may change until a booking is confirmed. Your written proposal will identify the itinerary, traveller count, price, inclusions, exclusions, payment schedule and any booking-specific conditions.',
      ],
    },
    {
      id: 'confirmation',
      title: '2. Booking confirmation',
      paragraphs: [
        'A booking is confirmed only after you accept the written proposal, pay the deposit or amount stated there, and receive written confirmation from Ethio Afro Tours. The person making the booking confirms that they are authorized to act for everyone named and will communicate these terms to the group.',
      ],
    },
    {
      id: 'payments',
      title: '3. Deposits and final payment',
      paragraphs: [
        'Deposit amounts, currency, payment method and final-payment dates vary according to the itinerary and supplier commitments and will be set out in your proposal. Missing a payment deadline may allow us to treat the booking as cancelled after reasonable notice. Bank, card, transfer and currency-conversion charges are normally the payer’s responsibility unless the proposal says otherwise.',
      ],
    },
    {
      id: 'traveller-cancellation',
      title: '4. Cancellation by the traveller',
      paragraphs: [
        'Cancellation must be sent in writing by the lead traveller and takes effect when we acknowledge it. The cancellation deadlines, refund percentages or charges in the accepted proposal control. Recoverable amounts depend on notice, work already performed and the terms imposed by hotels, airlines, parks and other suppliers. Deposits, permits, tickets and supplier payments may be partly or wholly non-refundable. We strongly recommend insurance that covers cancellation for circumstances relevant to you.',
      ],
    },
    {
      id: 'traveller-changes',
      title: '5. Changes requested by the traveller',
      paragraphs: [
        'Tell us promptly if you want to change dates, names, route, accommodation or group size. We will try to help but cannot guarantee a change. Any price difference, supplier fee, cancellation charge or additional planning cost will be explained before we proceed where reasonably possible. Reducing the group size may increase the per-person price for remaining travellers.',
      ],
    },
    {
      id: 'company-changes',
      title: '6. Changes or cancellation by us',
      paragraphs: [
        'Travel in Ethiopia may require route, timing, accommodation or activity changes. For a significant pre-departure change, we will explain the available reasonable options, which may include accepting a substitute, choosing an alternative where available, or receiving the recoverable amount specified under your proposal and applicable law. We may cancel or suspend services where payment is overdue, a traveller’s conduct creates a safety or legal risk, or operating the trip is not reasonably possible.',
      ],
    },
    {
      id: 'force-majeure',
      title: '7. Force majeure and supplier failure',
      paragraphs: [
        'Weather, natural disaster, illness outbreak, conflict, civil unrest, government action, border or park closure, transport disruption and similar events beyond reasonable control may affect a trip. We will act reasonably to assist and seek recoveries from suppliers, but cannot promise a refund of sums suppliers will not return. Rerouting, extra accommodation, transport or evacuation may create additional costs. Travel insurance is essential.',
      ],
    },
    {
      id: 'missed-services',
      title: '8. Late arrival and unused services',
      paragraphs: [
        'No refund is normally available for a service voluntarily declined or missed because of late arrival, an independently booked flight, incomplete documents, illness or another circumstance outside our control, subject to the accepted proposal and applicable law. We will provide reasonable assistance with alternatives where possible; resulting costs may be payable by the traveller.',
      ],
    },
    {
      id: 'layovers',
      title: '9. Layover and stopover bookings',
      paragraphs: [
        'Layover plans depend on confirmed flight times, immigration and visa permission, airport procedures, luggage arrangements, traffic and a safe return margin. An enquiry does not guarantee eligibility to leave the airport. Tell us immediately of a schedule change. We may shorten, adapt or cancel an outing where the available connection is no longer safe; the accepted proposal and supplier recoverability determine any refund.',
      ],
    },
    {
      id: 'refunds',
      title: '10. Refund timing and method',
      paragraphs: [
        'Where a refund is due, we calculate it after confirming recoverable supplier amounts and approved deductions. It will normally be returned using the original method or another agreed lawful method. Processing time can depend on banks and suppliers. Currency movements and non-refundable transaction charges may affect the amount received.',
      ],
    },
    {
      id: 'controlling-terms',
      title: '11. Which terms control',
      paragraphs: [
        'Your accepted written proposal controls deposit amounts, due dates, cancellation deadlines, refund percentages and supplier-specific charges where it differs from this general policy. These Booking and Cancellation terms should be read together with our Terms & Conditions and Privacy Policy.',
      ],
    },
  ],
  related: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

export const responsibleTourismPolicy: PolicyDocument = {
  slug: 'responsible-tourism',
  eyebrow: 'Our commitments',
  title: 'Responsible Tourism Policy',
  description:
    'The practical principles Ethio Afro Tours follows to respect Ethiopia’s people, cultures, heritage, wildlife and landscapes.',
  introduction:
    'Responsible travel is a daily operating practice, not a label. We aim to create rewarding journeys while respecting the dignity, choices and future of the communities and places that welcome our guests.',
  sections: [
    {
      id: 'local-benefit',
      title: '1. Keep value local',
      bullets: [
        'Prioritize qualified Ethiopian guides, drivers, accommodations, restaurants, artisans and community-based providers where practical.',
        'Agree services and compensation clearly and pay suppliers fairly and on time.',
        'Encourage travellers to buy directly from local makers and use respectful, proportionate bargaining.',
        'Avoid promising that every payment reaches a community directly; explain the supply chain honestly.',
      ],
    },
    {
      id: 'culture-and-consent',
      title: '2. Culture, dignity and consent',
      bullets: [
        'Brief travellers on local customs, dress, greetings and appropriate behaviour before sensitive visits.',
        'Ask permission before photographing or recording people, ceremonies, homes or livelihoods, and respect a refusal without pressure.',
        'Do not stage, sensationalize or market people as attractions, and never encourage intrusive contact with children or vulnerable people.',
        'Work with local hosts and guides to determine when a visit is welcome and how it should be conducted.',
      ],
    },
    {
      id: 'sacred-and-historic-places',
      title: '3. Sacred and historic places',
      bullets: [
        'Follow site rules on dress, footwear, access, photography, fasting periods and worship.',
        'Keep religious practice ahead of sightseeing and avoid obstructing ceremonies or private prayer.',
        'Do not touch, climb, remove or purchase unlawfully sourced cultural or archaeological material.',
        'Use knowledgeable local guides who can explain context without reducing living traditions to spectacle.',
      ],
    },
    {
      id: 'nature-and-wildlife',
      title: '4. Nature and wildlife',
      bullets: [
        'Stay on authorized routes, follow park guidance and keep a safe, non-disruptive distance from wildlife.',
        'Never feed, handle, bait or chase wildlife for a photograph.',
        'Reduce single-use items where services permit, carry waste out and use water and energy carefully.',
        'Choose group sizes, vehicles and camps appropriate to the location and avoid unnecessary off-road driving.',
      ],
    },
    {
      id: 'children-and-vulnerable-people',
      title: '5. Children and vulnerable people',
      paragraphs: [
        'We do not arrange orphanage visits or activities that turn hardship into entertainment. Travellers should not give money, sweets or gifts directly to children; our team can suggest accountable local initiatives or community-led channels. Any safeguarding concern should be reported immediately to the guide or our Addis Ababa office.',
      ],
    },
    {
      id: 'animal-welfare',
      title: '6. Animal welfare',
      paragraphs: [
        'We avoid activities that rely on cruelty, unsafe handling or poor living conditions. Where working animals form part of local transport, our team should consider loading, rest, equipment, water and visible health. A traveller may decline an activity if welfare conditions are not acceptable.',
      ],
    },
    {
      id: 'environmental-claims',
      title: '7. Honest environmental action',
      paragraphs: [
        'We work to reduce avoidable waste and unnecessary resource use, but do not describe a journey as impact-free. We will not claim carbon neutrality or conservation benefit without a credible method and evidence. When conditions require a trade-off between convenience and protection of a place, safety and stewardship guide our recommendation.',
      ],
    },
    {
      id: 'traveller-role',
      title: '8. What we ask of travellers',
      bullets: [
        'Listen to local guides and ask before taking photographs, entering private spaces or sharing identifiable images online.',
        'Use refillable bottles and bags where safe and practical, and leave natural and cultural objects where they belong.',
        'Choose respectful language and avoid promises, gifts or donations that have not been discussed with local hosts or guides.',
        'Tell us promptly if you see conduct that conflicts with this policy so it can be addressed.',
      ],
    },
    {
      id: 'improvement',
      title: '9. Accountability and improvement',
      paragraphs: [
        'Responsible practice depends on local feedback and changing conditions. We review supplier and traveller feedback, address concerns with the people involved and update routes or relationships where needed. Questions or reports may be sent to info@ethioafrotours.com.',
      ],
    },
  ],
  related: [
    { label: 'About Ethio Afro Tours', href: '/about' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

export const policies = {
  privacy: privacyPolicy,
  terms: termsPolicy,
  'booking-policy': bookingPolicy,
  'responsible-tourism': responsibleTourismPolicy,
} as const
