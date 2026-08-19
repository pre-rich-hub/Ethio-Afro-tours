'use client'

import Link from 'next/link'
import { contact } from '@/lib/site'
import { useLanguage, type LanguageCode } from '@/components/language-provider'

const lastUpdated = 'August 19, 2026'

type LegalItem = {
  heading: string
  text: string
}

type LegalSection = {
  label: string
  title: string
  items: LegalItem[]
}

type TermsCopy = {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  sections: LegalSection[]
  contactTitle: string
  contactCopy: string
  emailLabel: string
  contactPageLabel: string
  privacyBefore: string
  privacyLabel: string
  privacyEnd: string
}

const copies: Record<LanguageCode, TermsCopy> = {
  EN: {
    eyebrow: 'Legal',
    title: 'Terms and Conditions',
    intro:
      'These terms explain how private Ethiopia travel bookings, payments, cancellations, liability, insurance, and guest responsibilities are handled by EthioAfro Tours.',
    lastUpdated: 'Last updated',
    sections: [
      {
        label: 'Section 1',
        title: 'Booking Policy',
        items: [
          {
            heading: 'Reservation Process',
            text:
              'To secure a confirmed private journey with EthioAfro Tours, a 30% deposit is required at booking unless your written proposal states a different payment arrangement. The remaining balance is due no later than 60 days before departure. Bookings made within 60 days of departure require full payment at the time of confirmation.',
          },
          {
            heading: 'Confirmation',
            text:
              'After we receive the required deposit or full payment, we will send a written confirmation with your itinerary, included services, meeting details, and any practical information needed before travel.',
          },
          {
            heading: 'Booking Modifications',
            text:
              'Requests to change dates, accommodations, routing, activities, passenger details, or other arrangements must be made in writing at least 45 days before departure. Changes are subject to availability, supplier rules, price differences, and any additional administrative or service costs.',
          },
        ],
      },
      {
        label: 'Section 2',
        title: 'Payment Terms',
        items: [
          {
            heading: 'Accepted Payment Methods',
            text:
              'We may accept payment by bank transfer, major credit cards including Visa, MasterCard, and American Express where available, and PayPal where offered. Prices are quoted in US Dollars unless your written proposal states otherwise. Bank charges, card fees, transfer fees, and intermediary charges are the responsibility of the traveler unless otherwise agreed in writing.',
          },
          {
            heading: 'Payment Schedule',
            text:
              'The standard payment schedule is a 30% deposit at booking and the remaining balance 60 days before departure. If payment is late, supplier reservations may be released, services may change, or the booking may be cancelled under the applicable cancellation terms.',
          },
          {
            heading: 'Currency and Taxes',
            text:
              'Quoted prices include known local taxes and required service charges at the time of confirmation. Currency fluctuations, new government taxes, park or permit fee changes, fuel surcharges, or other external cost increases after confirmation may be passed on to the traveler when unavoidable.',
          },
        ],
      },
      {
        label: 'Section 3',
        title: 'Cancellation Rules',
        items: [
          {
            heading: 'Cancellation by Traveler',
            text:
              'Cancellation requests must be made in writing. More than 60 days before departure, refundable amounts are returned minus a USD 150 administrative fee and any non-refundable supplier costs. From 30 to 60 days before departure, up to 50% of recoverable tour costs may be refunded. From 15 to 29 days before departure, up to 25% of recoverable tour costs may be refunded. Less than 15 days before departure, payments are non-refundable except for any amounts recovered from suppliers at their discretion.',
          },
          {
            heading: 'Cancellation by EthioAfro Tours',
            text:
              'If we must cancel a confirmed tour due to safety, operational necessity, insufficient viability, or circumstances beyond our control, we will offer a refund of recoverable payments or the option to reschedule where practical. We are not responsible for separate expenses such as international flights, visas, insurance premiums, or personal costs unless required by applicable law.',
          },
          {
            heading: 'Force Majeure',
            text:
              'We are not liable for cancellations, delays, route changes, missed services, or additional costs caused by events beyond our reasonable control, including natural disasters, pandemics, civil unrest, government actions, border restrictions, airline disruption, strikes, severe weather, or security incidents.',
          },
        ],
      },
      {
        label: 'Section 4',
        title: 'Liability',
        items: [
          {
            heading: 'Limitation of Liability',
            text:
              'EthioAfro Tours arranges travel services delivered by independent suppliers such as hotels, lodges, airlines, restaurants, transport providers, local guides, parks, museums, and activity operators. We select partners carefully, but we are not responsible for every act, omission, delay, policy, or failure of independent suppliers.',
          },
          {
            heading: 'Personal Injury and Property',
            text:
              'To the fullest extent permitted by law, we are not responsible for personal injury, illness, death, loss, theft, or damage to personal property during travel except where caused by our proven negligence.',
          },
          {
            heading: 'Third-Party Services and Inherent Risks',
            text:
              'Activities such as trekking, wildlife viewing, boat travel, road journeys, remote-area travel, cultural visits, and outdoor experiences involve inherent risks. By joining an itinerary, you acknowledge those risks and agree to follow safety instructions from guides and service providers.',
          },
        ],
      },
      {
        label: 'Section 5',
        title: 'Insurance',
        items: [
          {
            heading: 'Travel Insurance Requirement',
            text:
              'Comprehensive travel insurance is required for all participants. Your policy should cover trip cancellation, interruption, medical emergencies, evacuation, repatriation, baggage, delays, and all activities included in your itinerary. We recommend medical and evacuation coverage of at least USD 100,000.',
          },
          {
            heading: 'Proof of Insurance',
            text:
              'We may request proof of adequate insurance at least 14 days before departure. Failure to provide suitable proof when requested may delay final travel documents or result in cancellation under the applicable terms.',
          },
          {
            heading: 'Recommended Coverage',
            text:
              'We strongly recommend coverage for cancellation or interruption, emergency medical treatment, medical evacuation, baggage loss, flight delays, supplier failure, and activity-specific risks such as trekking, highland travel, remote driving, or boat excursions.',
          },
        ],
      },
      {
        label: 'Section 6',
        title: 'Client Responsibilities',
        items: [
          {
            heading: 'Travel Documents',
            text:
              'You are responsible for valid passports, visas, entry permissions, vaccination or health requirements, transit documents, customs rules, and any documents required for specific activities. We can provide general guidance, but we are not responsible for denied entry, denied boarding, or missed services caused by incomplete or incorrect documentation.',
          },
          {
            heading: 'Health and Fitness',
            text:
              'You must disclose medical conditions, dietary requirements, accessibility needs, allergies, or physical limitations that may affect your participation. Some routes and activities require a reasonable level of fitness, flexibility, and comfort with changing local conditions.',
          },
          {
            heading: 'Conduct',
            text:
              'You agree to follow guide instructions, respect local customs and laws, observe conservation rules, and behave in a way that does not endanger yourself, other travelers, local communities, staff, or property. We may remove a participant whose behavior is unsafe, unlawful, abusive, or disruptive, without refund for unrecoverable costs.',
          },
          {
            heading: 'Accurate Information',
            text:
              'All information provided during enquiry, booking, and pre-travel preparation must be accurate and complete. False, incomplete, or misleading information may result in service changes, additional costs, denied participation, or cancellation without refund for unrecoverable costs.',
          },
        ],
      },
    ],
    contactTitle: 'Questions About Our Terms?',
    contactCopy:
      'If you have any questions about these terms and conditions, please contact us by email or through the contact page.',
    emailLabel: 'Email Us',
    contactPageLabel: 'Contact Page',
    privacyBefore: 'Please also read our',
    privacyLabel: 'Privacy Policy',
    privacyEnd: '.',
  },
  ES: {
    eyebrow: 'Legal',
    title: 'Términos y Condiciones',
    intro:
      'Estos términos explican cómo EthioAfro Tours gestiona reservas, pagos, cancelaciones, responsabilidad, seguro y obligaciones del viajero para viajes privados en Etiopía.',
    lastUpdated: 'Última actualización',
    sections: [
      {
        label: 'Sección 1',
        title: 'Política de Reservas',
        items: [
          {
            heading: 'Proceso de Reserva',
            text:
              'Para asegurar un viaje privado confirmado con EthioAfro Tours, se requiere un depósito del 30% al reservar, salvo que su propuesta escrita indique otra forma de pago. El saldo restante debe pagarse como máximo 60 días antes de la salida. Las reservas hechas dentro de los 60 días previos a la salida requieren pago completo al confirmar.',
          },
          {
            heading: 'Confirmación',
            text:
              'Después de recibir el depósito requerido o el pago completo, enviaremos una confirmación escrita con su itinerario, servicios incluidos, detalles de encuentro e información práctica necesaria antes del viaje.',
          },
          {
            heading: 'Modificaciones de Reserva',
            text:
              'Las solicitudes para cambiar fechas, alojamientos, ruta, actividades, datos de pasajeros u otros arreglos deben realizarse por escrito al menos 45 días antes de la salida. Los cambios están sujetos a disponibilidad, reglas de proveedores, diferencias de precio y costos administrativos o de servicio adicionales.',
          },
        ],
      },
      {
        label: 'Sección 2',
        title: 'Condiciones de Pago',
        items: [
          {
            heading: 'Métodos de Pago Aceptados',
            text:
              'Podemos aceptar pagos por transferencia bancaria, principales tarjetas de crédito como Visa, MasterCard y American Express cuando estén disponibles, y PayPal cuando se ofrezca. Los precios se cotizan en dólares estadounidenses salvo que su propuesta escrita indique otra moneda. Cargos bancarios, comisiones de tarjeta, transferencias y cargos intermediarios son responsabilidad del viajero salvo acuerdo escrito distinto.',
          },
          {
            heading: 'Calendario de Pago',
            text:
              'El calendario estándar es un depósito del 30% al reservar y el saldo 60 días antes de la salida. Si el pago se retrasa, las reservas de proveedores pueden liberarse, los servicios pueden cambiar o la reserva puede cancelarse según los términos aplicables.',
          },
          {
            heading: 'Moneda e Impuestos',
            text:
              'Los precios cotizados incluyen impuestos locales conocidos y cargos de servicio requeridos al momento de la confirmación. Fluctuaciones de moneda, nuevos impuestos gubernamentales, cambios en tarifas de parques o permisos, recargos de combustible u otros aumentos externos posteriores a la confirmación pueden trasladarse al viajero cuando sean inevitables.',
          },
        ],
      },
      {
        label: 'Sección 3',
        title: 'Reglas de Cancelación',
        items: [
          {
            heading: 'Cancelación por el Viajero',
            text:
              'Las solicitudes de cancelación deben hacerse por escrito. Más de 60 días antes de la salida, los importes reembolsables se devuelven menos una tarifa administrativa de USD 150 y costos no reembolsables de proveedores. Entre 30 y 60 días antes, puede reembolsarse hasta el 50% de los costos recuperables. Entre 15 y 29 días, hasta el 25% de los costos recuperables. Menos de 15 días antes, los pagos no son reembolsables salvo importes recuperados de proveedores a su discreción.',
          },
          {
            heading: 'Cancelación por EthioAfro Tours',
            text:
              'Si debemos cancelar un tour confirmado por seguridad, necesidad operativa, falta de viabilidad o circunstancias fuera de nuestro control, ofreceremos el reembolso de pagos recuperables o la opción de reprogramar cuando sea práctico. No somos responsables de gastos separados como vuelos internacionales, visas, primas de seguro o costos personales, salvo que la ley aplicable lo exija.',
          },
          {
            heading: 'Fuerza Mayor',
            text:
              'No somos responsables por cancelaciones, retrasos, cambios de ruta, servicios perdidos o costos adicionales causados por eventos fuera de nuestro control razonable, incluidos desastres naturales, pandemias, disturbios civiles, acciones gubernamentales, restricciones fronterizas, interrupciones aéreas, huelgas, clima severo o incidentes de seguridad.',
          },
        ],
      },
      {
        label: 'Sección 4',
        title: 'Responsabilidad',
        items: [
          {
            heading: 'Limitación de Responsabilidad',
            text:
              'EthioAfro Tours organiza servicios prestados por proveedores independientes como hoteles, lodges, aerolíneas, restaurantes, transporte, guías locales, parques, museos y operadores de actividades. Seleccionamos socios cuidadosamente, pero no somos responsables de cada acto, omisión, retraso, política o falla de proveedores independientes.',
          },
          {
            heading: 'Lesiones Personales y Propiedad',
            text:
              'En la máxima medida permitida por la ley, no somos responsables de lesiones personales, enfermedad, muerte, pérdida, robo o daño a bienes personales durante el viaje, salvo cuando sea causado por nuestra negligencia comprobada.',
          },
          {
            heading: 'Servicios de Terceros y Riesgos Inherentes',
            text:
              'Actividades como trekking, observación de fauna, viajes en barco, trayectos por carretera, viajes a zonas remotas, visitas culturales y experiencias al aire libre implican riesgos inherentes. Al unirse a un itinerario, usted reconoce esos riesgos y acepta seguir instrucciones de seguridad de guías y proveedores.',
          },
        ],
      },
      {
        label: 'Sección 5',
        title: 'Seguro',
        items: [
          {
            heading: 'Requisito de Seguro de Viaje',
            text:
              'El seguro de viaje integral es obligatorio para todos los participantes. Su póliza debe cubrir cancelación, interrupción, emergencias médicas, evacuación, repatriación, equipaje, retrasos y todas las actividades incluidas en su itinerario. Recomendamos cobertura médica y de evacuación de al menos USD 100,000.',
          },
          {
            heading: 'Comprobante de Seguro',
            text:
              'Podemos solicitar comprobante de seguro adecuado al menos 14 días antes de la salida. No proporcionar un comprobante adecuado cuando se solicite puede retrasar los documentos finales o provocar cancelación según los términos aplicables.',
          },
          {
            heading: 'Cobertura Recomendada',
            text:
              'Recomendamos firmemente cobertura para cancelación o interrupción, tratamiento médico de emergencia, evacuación médica, pérdida de equipaje, retrasos de vuelo, falla de proveedores y riesgos específicos de actividades como trekking, viajes de montaña, conducción remota o excursiones en barco.',
          },
        ],
      },
      {
        label: 'Sección 6',
        title: 'Responsabilidades del Cliente',
        items: [
          {
            heading: 'Documentos de Viaje',
            text:
              'Usted es responsable de pasaportes válidos, visas, permisos de entrada, vacunas o requisitos de salud, documentos de tránsito, normas aduaneras y documentos requeridos para actividades específicas. Podemos ofrecer orientación general, pero no somos responsables de denegación de entrada, embarque rechazado o servicios perdidos por documentación incompleta o incorrecta.',
          },
          {
            heading: 'Salud y Condición Física',
            text:
              'Debe informar condiciones médicas, requisitos alimentarios, necesidades de accesibilidad, alergias o limitaciones físicas que puedan afectar su participación. Algunas rutas y actividades requieren un nivel razonable de condición física, flexibilidad y comodidad ante condiciones locales cambiantes.',
          },
          {
            heading: 'Conducta',
            text:
              'Acepta seguir instrucciones de guías, respetar costumbres y leyes locales, observar normas de conservación y comportarse de forma que no ponga en peligro a usted, otros viajeros, comunidades locales, personal o propiedad. Podemos retirar a un participante cuya conducta sea insegura, ilegal, abusiva o disruptiva, sin reembolso de costos no recuperables.',
          },
          {
            heading: 'Información Precisa',
            text:
              'Toda la información proporcionada durante la consulta, reserva y preparación previa al viaje debe ser precisa y completa. Información falsa, incompleta o engañosa puede resultar en cambios de servicio, costos adicionales, participación denegada o cancelación sin reembolso de costos no recuperables.',
          },
        ],
      },
    ],
    contactTitle: '¿Preguntas Sobre Nuestros Términos?',
    contactCopy:
      'Si tiene preguntas sobre estos términos y condiciones, contáctenos por correo electrónico o mediante la página de contacto.',
    emailLabel: 'Envíenos un Email',
    contactPageLabel: 'Página de Contacto',
    privacyBefore: 'Lea también nuestra',
    privacyLabel: 'Política de Privacidad',
    privacyEnd: '.',
  },
  FR: {
    eyebrow: 'Juridique',
    title: 'Conditions Générales',
    intro:
      'Ces conditions expliquent comment EthioAfro Tours gère les réservations, paiements, annulations, responsabilités, assurances et obligations des voyageurs pour les voyages privés en Éthiopie.',
    lastUpdated: 'Dernière mise à jour',
    sections: [
      {
        label: 'Section 1',
        title: 'Politique de Réservation',
        items: [
          {
            heading: 'Processus de Réservation',
            text:
              'Pour garantir un voyage privé confirmé avec EthioAfro Tours, un acompte de 30% est requis à la réservation, sauf indication différente dans votre proposition écrite. Le solde doit être payé au plus tard 60 jours avant le départ. Les réservations effectuées dans les 60 jours précédant le départ nécessitent le paiement intégral à la confirmation.',
          },
          {
            heading: 'Confirmation',
            text:
              'Après réception de l’acompte requis ou du paiement complet, nous envoyons une confirmation écrite avec votre itinéraire, les services inclus, les détails de rendez-vous et les informations pratiques nécessaires avant le voyage.',
          },
          {
            heading: 'Modifications de Réservation',
            text:
              'Les demandes de modification de dates, hébergements, itinéraire, activités, informations voyageurs ou autres arrangements doivent être faites par écrit au moins 45 jours avant le départ. Les changements dépendent des disponibilités, règles fournisseurs, écarts de prix et frais administratifs ou de service supplémentaires.',
          },
        ],
      },
      {
        label: 'Section 2',
        title: 'Conditions de Paiement',
        items: [
          {
            heading: 'Modes de Paiement Acceptés',
            text:
              'Nous pouvons accepter les paiements par virement bancaire, principales cartes de crédit dont Visa, MasterCard et American Express lorsque disponibles, et PayPal lorsque proposé. Les prix sont indiqués en dollars américains sauf mention contraire dans votre proposition écrite. Frais bancaires, frais de carte, frais de transfert et frais intermédiaires sont à la charge du voyageur sauf accord écrit contraire.',
          },
          {
            heading: 'Calendrier de Paiement',
            text:
              'Le calendrier standard prévoit un acompte de 30% à la réservation et le solde 60 jours avant le départ. En cas de retard de paiement, les réservations fournisseurs peuvent être libérées, les services modifiés ou la réservation annulée selon les conditions applicables.',
          },
          {
            heading: 'Devise et Taxes',
            text:
              'Les prix indiqués incluent les taxes locales connues et frais de service obligatoires au moment de la confirmation. Les fluctuations de change, nouvelles taxes gouvernementales, changements de frais de parcs ou permis, suppléments carburant ou autres hausses externes après confirmation peuvent être répercutés au voyageur lorsqu’ils sont inévitables.',
          },
        ],
      },
      {
        label: 'Section 3',
        title: 'Règles d’Annulation',
        items: [
          {
            heading: 'Annulation par le Voyageur',
            text:
              'Les demandes d’annulation doivent être faites par écrit. Plus de 60 jours avant le départ, les montants remboursables sont restitués moins des frais administratifs de 150 USD et les coûts fournisseurs non remboursables. De 30 à 60 jours avant le départ, jusqu’à 50% des coûts récupérables peuvent être remboursés. De 15 à 29 jours, jusqu’à 25% des coûts récupérables peuvent être remboursés. Moins de 15 jours avant le départ, les paiements ne sont pas remboursables sauf montants récupérés auprès des fournisseurs à leur discrétion.',
          },
          {
            heading: 'Annulation par EthioAfro Tours',
            text:
              'Si nous devons annuler un circuit confirmé pour des raisons de sécurité, nécessité opérationnelle, viabilité insuffisante ou circonstances hors de notre contrôle, nous proposerons le remboursement des paiements récupérables ou une reprogrammation lorsque cela est pratique. Nous ne sommes pas responsables des dépenses séparées comme vols internationaux, visas, primes d’assurance ou frais personnels, sauf obligation légale applicable.',
          },
          {
            heading: 'Force Majeure',
            text:
              'Nous ne sommes pas responsables des annulations, retards, changements d’itinéraire, services manqués ou coûts supplémentaires causés par des événements hors de notre contrôle raisonnable, notamment catastrophes naturelles, pandémies, troubles civils, actions gouvernementales, restrictions frontalières, perturbations aériennes, grèves, météo sévère ou incidents de sécurité.',
          },
        ],
      },
      {
        label: 'Section 4',
        title: 'Responsabilité',
        items: [
          {
            heading: 'Limitation de Responsabilité',
            text:
              'EthioAfro Tours organise des services fournis par des prestataires indépendants comme hôtels, lodges, compagnies aériennes, restaurants, transporteurs, guides locaux, parcs, musées et opérateurs d’activités. Nous sélectionnons nos partenaires avec soin, mais nous ne sommes pas responsables de chaque acte, omission, retard, politique ou défaillance de prestataires indépendants.',
          },
          {
            heading: 'Dommages Corporels et Biens',
            text:
              'Dans toute la mesure permise par la loi, nous ne sommes pas responsables des blessures, maladies, décès, pertes, vols ou dommages aux biens personnels pendant le voyage, sauf lorsqu’ils sont causés par notre négligence prouvée.',
          },
          {
            heading: 'Services Tiers et Risques Inhérents',
            text:
              'Les activités comme trekking, observation de la faune, trajets en bateau, voyages routiers, zones reculées, visites culturelles et expériences de plein air comportent des risques inhérents. En rejoignant un itinéraire, vous reconnaissez ces risques et acceptez de suivre les consignes de sécurité des guides et prestataires.',
          },
        ],
      },
      {
        label: 'Section 5',
        title: 'Assurance',
        items: [
          {
            heading: 'Exigence d’Assurance Voyage',
            text:
              'Une assurance voyage complète est obligatoire pour tous les participants. Votre police doit couvrir annulation, interruption, urgences médicales, évacuation, rapatriement, bagages, retards et toutes les activités incluses dans votre itinéraire. Nous recommandons une couverture médicale et évacuation d’au moins 100 000 USD.',
          },
          {
            heading: 'Preuve d’Assurance',
            text:
              'Nous pouvons demander une preuve d’assurance adéquate au moins 14 jours avant le départ. L’absence de preuve adaptée lorsque demandée peut retarder les documents finaux ou entraîner une annulation selon les conditions applicables.',
          },
          {
            heading: 'Couverture Recommandée',
            text:
              'Nous recommandons vivement une couverture pour annulation ou interruption, traitement médical d’urgence, évacuation médicale, perte de bagages, retards de vol, défaillance fournisseur et risques spécifiques comme trekking, voyages en altitude, conduite en zone reculée ou excursions en bateau.',
          },
        ],
      },
      {
        label: 'Section 6',
        title: 'Responsabilités du Client',
        items: [
          {
            heading: 'Documents de Voyage',
            text:
              'Vous êtes responsable des passeports valides, visas, autorisations d’entrée, vaccins ou exigences sanitaires, documents de transit, règles douanières et documents requis pour certaines activités. Nous pouvons fournir des conseils généraux, mais nous ne sommes pas responsables d’un refus d’entrée, refus d’embarquement ou services manqués causés par une documentation incomplète ou incorrecte.',
          },
          {
            heading: 'Santé et Condition Physique',
            text:
              'Vous devez signaler toute condition médicale, exigence alimentaire, besoin d’accessibilité, allergie ou limitation physique pouvant affecter votre participation. Certains itinéraires et activités demandent une condition physique raisonnable, de la flexibilité et une aisance avec des conditions locales changeantes.',
          },
          {
            heading: 'Conduite',
            text:
              'Vous acceptez de suivre les instructions des guides, respecter les coutumes et lois locales, observer les règles de conservation et agir sans mettre en danger vous-même, les autres voyageurs, communautés locales, personnel ou biens. Nous pouvons retirer un participant dont la conduite est dangereuse, illégale, abusive ou perturbatrice, sans remboursement des coûts non récupérables.',
          },
          {
            heading: 'Informations Exactes',
            text:
              'Toutes les informations fournies pendant la demande, la réservation et la préparation pré-voyage doivent être exactes et complètes. Des informations fausses, incomplètes ou trompeuses peuvent entraîner des changements de service, coûts supplémentaires, refus de participation ou annulation sans remboursement des coûts non récupérables.',
          },
        ],
      },
    ],
    contactTitle: 'Des Questions Sur Nos Conditions ?',
    contactCopy:
      'Si vous avez des questions sur ces conditions générales, contactez-nous par e-mail ou via la page de contact.',
    emailLabel: 'Nous Écrire',
    contactPageLabel: 'Page de Contact',
    privacyBefore: 'Veuillez également lire notre',
    privacyLabel: 'Politique de Confidentialité',
    privacyEnd: '.',
  },
  DE: {
    eyebrow: 'Rechtliches',
    title: 'Allgemeine Geschäftsbedingungen',
    intro:
      'Diese Bedingungen erklären, wie EthioAfro Tours private Äthiopien-Reisebuchungen, Zahlungen, Stornierungen, Haftung, Versicherung und Pflichten der Gäste handhabt.',
    lastUpdated: 'Zuletzt aktualisiert',
    sections: [
      {
        label: 'Abschnitt 1',
        title: 'Buchungsbedingungen',
        items: [
          {
            heading: 'Reservierungsprozess',
            text:
              'Um eine bestätigte private Reise mit EthioAfro Tours zu sichern, ist bei Buchung eine Anzahlung von 30% erforderlich, sofern Ihr schriftliches Angebot keine andere Zahlungsregelung nennt. Der Restbetrag ist spätestens 60 Tage vor Abreise fällig. Buchungen innerhalb von 60 Tagen vor Abreise erfordern vollständige Zahlung bei Bestätigung.',
          },
          {
            heading: 'Bestätigung',
            text:
              'Nach Eingang der erforderlichen Anzahlung oder vollständigen Zahlung senden wir eine schriftliche Bestätigung mit Reiseroute, enthaltenen Leistungen, Treffpunktdetails und praktischen Informationen, die vor der Reise benötigt werden.',
          },
          {
            heading: 'Buchungsänderungen',
            text:
              'Anfragen zur Änderung von Daten, Unterkünften, Route, Aktivitäten, Passagierdaten oder anderen Arrangements müssen mindestens 45 Tage vor Abreise schriftlich erfolgen. Änderungen unterliegen Verfügbarkeit, Lieferantenregeln, Preisunterschieden sowie zusätzlichen Verwaltungs- oder Servicekosten.',
          },
        ],
      },
      {
        label: 'Abschnitt 2',
        title: 'Zahlungsbedingungen',
        items: [
          {
            heading: 'Akzeptierte Zahlungsmethoden',
            text:
              'Wir können Zahlungen per Banküberweisung, gängigen Kreditkarten einschließlich Visa, MasterCard und American Express soweit verfügbar, sowie PayPal soweit angeboten akzeptieren. Preise werden in US-Dollar angegeben, sofern Ihr schriftliches Angebot nichts anderes vorsieht. Bankgebühren, Kartengebühren, Überweisungsgebühren und Zwischenbankkosten trägt der Reisende, sofern schriftlich nichts anderes vereinbart ist.',
          },
          {
            heading: 'Zahlungsplan',
            text:
              'Der Standard-Zahlungsplan besteht aus 30% Anzahlung bei Buchung und Restzahlung 60 Tage vor Abreise. Bei verspäteter Zahlung können Lieferantenreservierungen freigegeben, Leistungen geändert oder die Buchung gemäß den geltenden Stornobedingungen storniert werden.',
          },
          {
            heading: 'Währung und Steuern',
            text:
              'Angebotene Preise enthalten bekannte lokale Steuern und erforderliche Servicegebühren zum Zeitpunkt der Bestätigung. Wechselkursschwankungen, neue staatliche Steuern, Änderungen von Park- oder Genehmigungsgebühren, Treibstoffzuschläge oder andere externe Kostensteigerungen nach Bestätigung können bei Unvermeidbarkeit an den Reisenden weitergegeben werden.',
          },
        ],
      },
      {
        label: 'Abschnitt 3',
        title: 'Stornierungsregeln',
        items: [
          {
            heading: 'Stornierung durch den Reisenden',
            text:
              'Stornierungsanfragen müssen schriftlich erfolgen. Mehr als 60 Tage vor Abreise werden erstattbare Beträge abzüglich einer Verwaltungsgebühr von 150 USD und nicht erstattbarer Lieferantenkosten zurückgezahlt. 30 bis 60 Tage vor Abreise können bis zu 50% der rückgewinnbaren Reisekosten erstattet werden. 15 bis 29 Tage vor Abreise können bis zu 25% der rückgewinnbaren Kosten erstattet werden. Weniger als 15 Tage vor Abreise sind Zahlungen nicht erstattbar, außer Beträge, die nach Ermessen der Lieferanten zurückgewonnen werden.',
          },
          {
            heading: 'Stornierung durch EthioAfro Tours',
            text:
              'Wenn wir eine bestätigte Tour aus Sicherheitsgründen, operativer Notwendigkeit, mangelnder Durchführbarkeit oder Umständen außerhalb unserer Kontrolle stornieren müssen, bieten wir eine Erstattung rückgewinnbarer Zahlungen oder eine Umbuchung an, sofern praktikabel. Für separate Ausgaben wie internationale Flüge, Visa, Versicherungsprämien oder persönliche Kosten haften wir nicht, sofern geltendes Recht nichts anderes verlangt.',
          },
          {
            heading: 'Höhere Gewalt',
            text:
              'Wir haften nicht für Stornierungen, Verzögerungen, Routenänderungen, verpasste Leistungen oder Zusatzkosten durch Ereignisse außerhalb unserer angemessenen Kontrolle, darunter Naturkatastrophen, Pandemien, Unruhen, Regierungsmaßnahmen, Grenzbeschränkungen, Flugstörungen, Streiks, extremes Wetter oder Sicherheitsvorfälle.',
          },
        ],
      },
      {
        label: 'Abschnitt 4',
        title: 'Haftung',
        items: [
          {
            heading: 'Haftungsbeschränkung',
            text:
              'EthioAfro Tours arrangiert Reiseleistungen, die von unabhängigen Lieferanten wie Hotels, Lodges, Fluggesellschaften, Restaurants, Transportunternehmen, lokalen Guides, Parks, Museen und Aktivitätsanbietern erbracht werden. Wir wählen Partner sorgfältig aus, sind jedoch nicht für jede Handlung, Unterlassung, Verzögerung, Richtlinie oder jeden Fehler unabhängiger Lieferanten verantwortlich.',
          },
          {
            heading: 'Personenschäden und Eigentum',
            text:
              'Soweit gesetzlich zulässig, sind wir nicht verantwortlich für Personenschäden, Krankheit, Tod, Verlust, Diebstahl oder Beschädigung persönlichen Eigentums während der Reise, außer wenn dies durch unsere nachgewiesene Fahrlässigkeit verursacht wurde.',
          },
          {
            heading: 'Drittleistungen und Inhärente Risiken',
            text:
              'Aktivitäten wie Trekking, Tierbeobachtung, Bootsfahrten, Straßenreisen, Reisen in abgelegene Gebiete, kulturelle Besuche und Outdoor-Erlebnisse bergen inhärente Risiken. Durch Teilnahme an einer Reiseroute erkennen Sie diese Risiken an und stimmen zu, Sicherheitsanweisungen von Guides und Dienstleistern zu befolgen.',
          },
        ],
      },
      {
        label: 'Abschnitt 5',
        title: 'Versicherung',
        items: [
          {
            heading: 'Reiseversicherungspflicht',
            text:
              'Eine umfassende Reiseversicherung ist für alle Teilnehmer erforderlich. Ihre Police sollte Stornierung, Reiseabbruch, medizinische Notfälle, Evakuierung, Rückführung, Gepäck, Verzögerungen und alle in Ihrer Reiseroute enthaltenen Aktivitäten abdecken. Wir empfehlen medizinische und Evakuierungsdeckung von mindestens 100.000 USD.',
          },
          {
            heading: 'Versicherungsnachweis',
            text:
              'Wir können mindestens 14 Tage vor Abreise einen Nachweis ausreichender Versicherung verlangen. Wird ein geeigneter Nachweis auf Anfrage nicht erbracht, kann dies finale Reisedokumente verzögern oder zu einer Stornierung gemäß den geltenden Bedingungen führen.',
          },
          {
            heading: 'Empfohlene Deckung',
            text:
              'Wir empfehlen dringend Deckung für Stornierung oder Reiseabbruch, medizinische Notfallbehandlung, medizinische Evakuierung, Gepäckverlust, Flugverspätungen, Lieferantenausfall und aktivitätsspezifische Risiken wie Trekking, Hochlandreisen, abgelegene Fahrten oder Bootsausflüge.',
          },
        ],
      },
      {
        label: 'Abschnitt 6',
        title: 'Pflichten des Kunden',
        items: [
          {
            heading: 'Reisedokumente',
            text:
              'Sie sind verantwortlich für gültige Pässe, Visa, Einreisegenehmigungen, Impf- oder Gesundheitsanforderungen, Transitdokumente, Zollregeln und Dokumente für bestimmte Aktivitäten. Wir können allgemeine Hinweise geben, sind aber nicht verantwortlich für Einreiseverweigerung, verweigertes Boarding oder verpasste Leistungen aufgrund unvollständiger oder falscher Dokumentation.',
          },
          {
            heading: 'Gesundheit und Fitness',
            text:
              'Sie müssen medizinische Bedingungen, Ernährungsanforderungen, Barrierefreiheitsbedürfnisse, Allergien oder körperliche Einschränkungen offenlegen, die Ihre Teilnahme beeinflussen können. Einige Routen und Aktivitäten erfordern angemessene Fitness, Flexibilität und Komfort mit wechselnden lokalen Bedingungen.',
          },
          {
            heading: 'Verhalten',
            text:
              'Sie stimmen zu, Anweisungen der Guides zu befolgen, lokale Bräuche und Gesetze zu respektieren, Naturschutzregeln zu beachten und sich so zu verhalten, dass Sie selbst, andere Reisende, lokale Gemeinschaften, Personal oder Eigentum nicht gefährdet werden. Wir können Teilnehmer entfernen, deren Verhalten unsicher, rechtswidrig, missbräuchlich oder störend ist, ohne Erstattung nicht rückgewinnbarer Kosten.',
          },
          {
            heading: 'Korrekte Informationen',
            text:
              'Alle Informationen während Anfrage, Buchung und Reisevorbereitung müssen korrekt und vollständig sein. Falsche, unvollständige oder irreführende Informationen können zu Leistungsänderungen, Zusatzkosten, verweigerter Teilnahme oder Stornierung ohne Erstattung nicht rückgewinnbarer Kosten führen.',
          },
        ],
      },
    ],
    contactTitle: 'Fragen zu Unseren Bedingungen?',
    contactCopy:
      'Wenn Sie Fragen zu diesen allgemeinen Geschäftsbedingungen haben, kontaktieren Sie uns bitte per E-Mail oder über die Kontaktseite.',
    emailLabel: 'E-Mail Senden',
    contactPageLabel: 'Kontaktseite',
    privacyBefore: 'Bitte lesen Sie auch unsere',
    privacyLabel: 'Datenschutzerklärung',
    privacyEnd: '.',
  },
  ZH: {
    eyebrow: '法律信息',
    title: '条款与条件',
    intro:
      '这些条款说明 EthioAfro Tours 如何处理埃塞俄比亚私人旅行的预订、付款、取消、责任、保险和客人义务。',
    lastUpdated: '最后更新',
    sections: [
      {
        label: '第 1 节',
        title: '预订政策',
        items: [
          {
            heading: '预订流程',
            text:
              '为了确认与 EthioAfro Tours 的私人行程，预订时需支付 30% 定金，除非您的书面方案另有付款安排。余款须不晚于出发前 60 天支付。出发前 60 天内预订的行程，须在确认时支付全款。',
          },
          {
            heading: '确认',
            text:
              '收到所需定金或全款后，我们会发送书面确认，包含您的行程、已包含服务、集合细节，以及出行前所需的实用信息。',
          },
          {
            heading: '预订修改',
            text:
              '如需更改日期、住宿、路线、活动、旅客信息或其他安排，须至少在出发前 45 天以书面形式提出。更改取决于可用性、供应商规则、价格差额，以及任何额外行政或服务费用。',
          },
        ],
      },
      {
        label: '第 2 节',
        title: '付款条款',
        items: [
          {
            heading: '接受的付款方式',
            text:
              '我们可能接受银行转账、主要信用卡，包括可用情况下的 Visa、MasterCard 和 American Express，以及提供时的 PayPal。除非您的书面方案另有说明，价格均以美元报价。银行费用、卡费、转账费和中介费用由旅客承担，除非另有书面约定。',
          },
          {
            heading: '付款时间',
            text:
              '标准付款安排为预订时支付 30% 定金，并在出发前 60 天支付余款。如付款延迟，供应商预留可能被释放，服务可能变更，或预订可能根据适用取消条款被取消。',
          },
          {
            heading: '货币与税费',
            text:
              '报价包含确认时已知的当地税费和必要服务费。确认后如出现汇率波动、新政府税费、公园或许可费用变化、燃油附加费或其他外部成本增加，在不可避免时可能转由旅客承担。',
          },
        ],
      },
      {
        label: '第 3 节',
        title: '取消规则',
        items: [
          {
            heading: '旅客取消',
            text:
              '取消请求须以书面形式提出。出发前 60 天以上取消，可退还金额将扣除 150 美元行政费和不可退款的供应商成本。出发前 30 至 60 天，可退还最多 50% 的可追回行程成本。出发前 15 至 29 天，可退还最多 25% 的可追回成本。出发前少于 15 天，付款不予退还，但供应商自行同意返还的金额除外。',
          },
          {
            heading: 'EthioAfro Tours 取消',
            text:
              '如果我们因安全、运营必要性、可行性不足或超出我们控制范围的情况必须取消已确认行程，我们将提供可追回付款的退款，或在可行情况下提供改期选择。除适用法律要求外，我们不对国际航班、签证、保险费或个人费用等单独支出负责。',
          },
          {
            heading: '不可抗力',
            text:
              '对于由超出我们合理控制范围的事件造成的取消、延误、路线变更、错过服务或额外费用，我们不承担责任，包括自然灾害、疫情、民间动荡、政府行动、边境限制、航空中断、罢工、恶劣天气或安全事件。',
          },
        ],
      },
      {
        label: '第 4 节',
        title: '责任',
        items: [
          {
            heading: '责任限制',
            text:
              'EthioAfro Tours 安排由独立供应商提供的旅行服务，例如酒店、旅馆、航空公司、餐厅、交通提供方、当地导游、公园、博物馆和活动运营方。我们谨慎选择合作伙伴，但不对独立供应商的每一项行为、遗漏、延误、政策或失误负责。',
          },
          {
            heading: '人身伤害与财产',
            text:
              '在法律允许的最大范围内，对于旅行期间的人身伤害、疾病、死亡、个人财产遗失、被盗或损坏，我们不承担责任，除非由我们经证实的疏忽造成。',
          },
          {
            heading: '第三方服务与固有风险',
            text:
              '徒步、野生动物观赏、船行、公路旅行、偏远地区旅行、文化访问和户外体验等活动具有固有风险。参加行程即表示您承认这些风险，并同意遵守导游和服务提供方的安全指示。',
          },
        ],
      },
      {
        label: '第 5 节',
        title: '保险',
        items: [
          {
            heading: '旅行保险要求',
            text:
              '所有参加者都必须购买全面旅行保险。保险应涵盖行程取消、中断、医疗紧急情况、撤离、遣返、行李、延误以及行程中包含的所有活动。我们建议医疗和撤离保障不少于 100,000 美元。',
          },
          {
            heading: '保险证明',
            text:
              '我们可能要求您至少在出发前 14 天提供充分保险证明。如在要求时未能提供合适证明，可能会延迟最终旅行文件，或根据适用条款导致取消。',
          },
          {
            heading: '建议保障范围',
            text:
              '我们强烈建议保障范围包括取消或中断、紧急医疗、医疗撤离、行李遗失、航班延误、供应商失约，以及徒步、高原旅行、偏远驾驶或船行等活动特定风险。',
          },
        ],
      },
      {
        label: '第 6 节',
        title: '客户责任',
        items: [
          {
            heading: '旅行文件',
            text:
              '您负责有效护照、签证、入境许可、疫苗或健康要求、过境文件、海关规定，以及特定活动所需文件。我们可以提供一般建议，但不对因文件不完整或不正确导致的拒绝入境、拒绝登机或错过服务负责。',
          },
          {
            heading: '健康与体能',
            text:
              '您必须披露可能影响参与的医疗状况、饮食要求、无障碍需求、过敏或身体限制。部分路线和活动需要合理体能、灵活性，以及适应当地条件变化的能力。',
          },
          {
            heading: '行为',
            text:
              '您同意遵守导游指示，尊重当地习俗和法律，遵守保护规则，并以不危及自己、其他旅客、当地社区、工作人员或财产的方式行事。对于行为不安全、违法、辱骂或扰乱行程的参加者，我们可以将其移除，且不退还不可追回成本。',
          },
          {
            heading: '准确信息',
            text:
              '咨询、预订和出行前准备过程中提供的所有信息必须准确完整。虚假、不完整或误导性信息可能导致服务变更、额外费用、拒绝参加，或取消且不退还不可追回成本。',
          },
        ],
      },
    ],
    contactTitle: '对我们的条款有疑问？',
    contactCopy: '如果您对这些条款与条件有任何疑问，请通过电子邮件或联系页面与我们联系。',
    emailLabel: '发送邮件',
    contactPageLabel: '联系页面',
    privacyBefore: '也请阅读我们的',
    privacyLabel: '隐私政策',
    privacyEnd: '。',
  },
}

export function TermsContent() {
  const { language } = useLanguage()
  const copy = copies[language] ?? copies.EN

  return (
    <main className="bg-background">
      <section className="border-b border-border">
        <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {copy.eyebrow}
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {copy.intro}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {copy.lastUpdated}: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="shell py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-12">
          {copy.sections.map((section) => (
            <section key={`${section.label}-${section.title}`}>
              <p className="eyebrow mb-3 text-accent">{section.label}</p>
              <h2 className="font-serif text-3xl text-foreground">{section.title}</h2>
              <div className="mt-6 space-y-6">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <h3 className="text-base font-semibold text-foreground">{item.heading}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-2xl text-foreground">{copy.contactTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.contactCopy}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <a className="text-primary hover:text-accent" href={`mailto:${contact.email}`}>
                {copy.emailLabel}
              </a>
              <Link className="text-primary hover:text-accent" href="/contact">
                {copy.contactPageLabel}
              </Link>
            </div>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {copy.privacyBefore}{' '}
              <Link className="text-primary hover:text-accent" href="/privacy">
                {copy.privacyLabel}
              </Link>
              {copy.privacyEnd}
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
