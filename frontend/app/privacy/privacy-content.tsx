'use client'

import Link from 'next/link'
import { contact } from '@/lib/site'
import { useLanguage, type LanguageCode } from '@/components/language-provider'

const lastUpdated = 'August 19, 2026'

type LegalSection = {
  title: string
  body: string[]
}

type PrivacyCopy = {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  sections: LegalSection[]
  contactTitle: string
  contactBeforeEmail: string
  contactAfterEmail: string
  contactBeforePage: string
  contactPage: string
  contactEnd: string
}

const copies: Record<LanguageCode, PrivacyCopy> = {
  EN: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'This policy explains how EthioAfro Tours handles information shared by guests, website visitors, and travel partners.',
    lastUpdated: 'Last updated',
    sections: [
      {
        title: 'Information We Collect',
        body: [
          'We collect information you choose to send through our website, email, phone, WhatsApp, newsletter forms, enquiry forms, and booking conversations. This may include your name, email address, phone number, country, preferred destinations, travel dates, group size, budget range, accommodation preferences, dietary needs, accessibility needs, and other details needed to design your trip.',
          'If a trip is confirmed, we may request additional travel information such as passport details, flight details, emergency contact information, insurance details, and special requirements needed by hotels, airlines, guides, or local authorities.',
          'Our website may also collect technical information such as IP address, browser type, device information, pages visited, referral source, and cookie or analytics data.',
        ],
      },
      {
        title: 'How We Use Information',
        body: [
          'We use personal information to respond to enquiries, prepare private itineraries, provide quotes, arrange confirmed travel services, communicate important trip updates, process administrative records, improve our website, and protect the security of our services.',
          'If you subscribe to updates, we may send occasional travel stories or offers. You can unsubscribe at any time by using the unsubscribe link or contacting us directly.',
        ],
      },
      {
        title: 'Sharing With Travel Partners',
        body: [
          'We share only the information reasonably needed to operate your itinerary with trusted service providers such as hotels, lodges, domestic airlines, transport providers, guides, restaurants, activity providers, payment processors, technology vendors, and professional advisers.',
          'We do not sell personal information. We do not share guest information with unrelated third parties for their independent marketing.',
        ],
      },
      {
        title: 'Payments',
        body: [
          'When card or online payments are available, payment information is handled by secure payment processors. EthioAfro Tours does not intentionally store full card numbers on this website.',
        ],
      },
      {
        title: 'Cookies and Analytics',
        body: [
          'Our website may use cookies and analytics tools to keep the site working, understand visitor activity, measure performance, and improve content. You can control cookies through your browser settings, although some site features may not work as expected if cookies are disabled.',
        ],
      },
      {
        title: 'Security and Retention',
        body: [
          'We use reasonable administrative, technical, and organizational safeguards to protect personal information. No website, email system, or online service can be guaranteed to be completely secure.',
          'We keep information only as long as reasonably needed for enquiries, bookings, accounting, legal obligations, dispute handling, and service improvement. When information is no longer needed, we delete, archive, or anonymize it where practical.',
        ],
      },
      {
        title: 'International Travel Data',
        body: [
          'Because travel services often involve hotels, airlines, local operators, technology providers, and guests in different countries, your information may be processed or transferred outside your home country. We handle those transfers only as needed to provide requested travel services or operate our business.',
        ],
      },
      {
        title: 'Your Choices',
        body: [
          'You may ask us to access, correct, update, or delete personal information we hold about you, subject to legal, accounting, security, and operational limits. You may also opt out of marketing messages at any time.',
        ],
      },
      {
        title: 'Children',
        body: [
          'Our website is intended for adults planning travel. We do not knowingly collect personal information from children without appropriate involvement from a parent or guardian.',
        ],
      },
      {
        title: 'Updates',
        body: [
          'We may update this Privacy Policy from time to time. The latest version will be posted on this page with the updated date.',
        ],
      },
    ],
    contactTitle: 'Contact Us',
    contactBeforeEmail: 'Questions about privacy or data requests can be sent to',
    contactAfterEmail: '. You can also reach us at',
    contactBeforePage: 'or visit our',
    contactPage: 'contact page',
    contactEnd: '.',
  },
  ES: {
    eyebrow: 'Legal',
    title: 'Política de Privacidad',
    intro:
      'Esta política explica cómo EthioAfro Tours gestiona la información compartida por huéspedes, visitantes del sitio web y socios de viaje.',
    lastUpdated: 'Última actualización',
    sections: [
      {
        title: 'Información Que Recopilamos',
        body: [
          'Recopilamos la información que usted decide enviarnos a través de nuestro sitio web, correo electrónico, teléfono, WhatsApp, formularios de boletín, formularios de consulta y conversaciones de reserva. Esto puede incluir su nombre, correo electrónico, número de teléfono, país, destinos preferidos, fechas de viaje, tamaño del grupo, rango de presupuesto, preferencias de alojamiento, necesidades alimentarias, necesidades de accesibilidad y otros detalles necesarios para diseñar su viaje.',
          'Si se confirma un viaje, podemos solicitar información adicional como datos de pasaporte, vuelos, contacto de emergencia, seguro y requisitos especiales necesarios para hoteles, aerolíneas, guías o autoridades locales.',
          'Nuestro sitio web también puede recopilar información técnica como dirección IP, tipo de navegador, información del dispositivo, páginas visitadas, fuente de referencia y datos de cookies o analítica.',
        ],
      },
      {
        title: 'Cómo Usamos La Información',
        body: [
          'Usamos la información personal para responder consultas, preparar itinerarios privados, proporcionar cotizaciones, organizar servicios de viaje confirmados, comunicar actualizaciones importantes, procesar registros administrativos, mejorar nuestro sitio web y proteger la seguridad de nuestros servicios.',
          'Si se suscribe a nuestras actualizaciones, podemos enviar historias de viaje u ofertas ocasionales. Puede darse de baja en cualquier momento usando el enlace de cancelación o contactándonos directamente.',
        ],
      },
      {
        title: 'Compartir Con Socios De Viaje',
        body: [
          'Compartimos solo la información razonablemente necesaria para operar su itinerario con proveedores de confianza como hoteles, lodges, aerolíneas nacionales, transporte, guías, restaurantes, actividades, procesadores de pago, proveedores tecnológicos y asesores profesionales.',
          'No vendemos información personal. No compartimos información de huéspedes con terceros no relacionados para su marketing independiente.',
        ],
      },
      {
        title: 'Pagos',
        body: [
          'Cuando estén disponibles pagos con tarjeta u online, la información de pago será gestionada por procesadores seguros. EthioAfro Tours no almacena intencionalmente números completos de tarjeta en este sitio web.',
        ],
      },
      {
        title: 'Cookies Y Analítica',
        body: [
          'Nuestro sitio web puede usar cookies y herramientas de analítica para mantener el sitio en funcionamiento, comprender la actividad de visitantes, medir el rendimiento y mejorar el contenido. Puede controlar las cookies desde la configuración de su navegador, aunque algunas funciones pueden no operar correctamente si las desactiva.',
        ],
      },
      {
        title: 'Seguridad Y Conservación',
        body: [
          'Usamos medidas administrativas, técnicas y organizativas razonables para proteger la información personal. Ningún sitio web, sistema de correo electrónico o servicio online puede garantizarse como completamente seguro.',
          'Conservamos la información solo durante el tiempo razonablemente necesario para consultas, reservas, contabilidad, obligaciones legales, gestión de disputas y mejora del servicio. Cuando ya no sea necesaria, la eliminamos, archivamos o anonimizamos cuando sea práctico.',
        ],
      },
      {
        title: 'Datos De Viajes Internacionales',
        body: [
          'Como los servicios de viaje suelen involucrar hoteles, aerolíneas, operadores locales, proveedores tecnológicos y huéspedes en distintos países, su información puede procesarse o transferirse fuera de su país de origen. Gestionamos esas transferencias solo cuando son necesarias para prestar los servicios solicitados u operar nuestro negocio.',
        ],
      },
      {
        title: 'Sus Opciones',
        body: [
          'Puede pedirnos acceder, corregir, actualizar o eliminar la información personal que tengamos sobre usted, sujeto a límites legales, contables, de seguridad y operativos. También puede excluirse de mensajes de marketing en cualquier momento.',
        ],
      },
      {
        title: 'Menores',
        body: [
          'Nuestro sitio web está destinado a adultos que planifican viajes. No recopilamos conscientemente información personal de menores sin la participación adecuada de un padre, madre o tutor.',
        ],
      },
      {
        title: 'Actualizaciones',
        body: [
          'Podemos actualizar esta Política de Privacidad ocasionalmente. La versión más reciente se publicará en esta página con la fecha actualizada.',
        ],
      },
    ],
    contactTitle: 'Contáctenos',
    contactBeforeEmail: 'Las preguntas sobre privacidad o solicitudes de datos pueden enviarse a',
    contactAfterEmail: '. También puede comunicarse con nosotros al',
    contactBeforePage: 'o visitar nuestra',
    contactPage: 'página de contacto',
    contactEnd: '.',
  },
  FR: {
    eyebrow: 'Juridique',
    title: 'Politique de Confidentialité',
    intro:
      'Cette politique explique comment EthioAfro Tours traite les informations partagées par les voyageurs, les visiteurs du site et les partenaires de voyage.',
    lastUpdated: 'Dernière mise à jour',
    sections: [
      {
        title: 'Informations Que Nous Collectons',
        body: [
          'Nous collectons les informations que vous choisissez de nous transmettre via notre site web, e-mail, téléphone, WhatsApp, formulaires de newsletter, formulaires de demande et échanges de réservation. Cela peut inclure votre nom, adresse e-mail, numéro de téléphone, pays, destinations préférées, dates de voyage, taille du groupe, budget, préférences d’hébergement, besoins alimentaires, besoins d’accessibilité et autres détails nécessaires à la conception de votre voyage.',
          'Si un voyage est confirmé, nous pouvons demander des informations supplémentaires comme les détails du passeport, des vols, un contact d’urgence, des informations d’assurance et des besoins particuliers requis par les hôtels, compagnies aériennes, guides ou autorités locales.',
          'Notre site web peut aussi collecter des informations techniques comme l’adresse IP, le type de navigateur, les informations de l’appareil, les pages visitées, la source de référence et les données de cookies ou d’analyse.',
        ],
      },
      {
        title: 'Comment Nous Utilisons Les Informations',
        body: [
          'Nous utilisons les informations personnelles pour répondre aux demandes, préparer des itinéraires privés, fournir des devis, organiser des services de voyage confirmés, communiquer des mises à jour importantes, traiter les dossiers administratifs, améliorer notre site web et protéger la sécurité de nos services.',
          'Si vous vous abonnez à nos actualités, nous pouvons envoyer occasionnellement des récits de voyage ou des offres. Vous pouvez vous désabonner à tout moment via le lien de désabonnement ou en nous contactant directement.',
        ],
      },
      {
        title: 'Partage Avec Les Partenaires De Voyage',
        body: [
          'Nous partageons uniquement les informations raisonnablement nécessaires à l’organisation de votre itinéraire avec des prestataires de confiance tels que hôtels, lodges, compagnies aériennes intérieures, transporteurs, guides, restaurants, prestataires d’activités, processeurs de paiement, fournisseurs technologiques et conseillers professionnels.',
          'Nous ne vendons pas les informations personnelles. Nous ne partageons pas les informations des voyageurs avec des tiers non liés pour leur marketing indépendant.',
        ],
      },
      {
        title: 'Paiements',
        body: [
          'Lorsque les paiements par carte ou en ligne sont disponibles, les informations de paiement sont traitées par des processeurs sécurisés. EthioAfro Tours ne stocke pas intentionnellement les numéros complets de carte sur ce site web.',
        ],
      },
      {
        title: 'Cookies Et Analyse',
        body: [
          'Notre site web peut utiliser des cookies et des outils d’analyse pour assurer son fonctionnement, comprendre l’activité des visiteurs, mesurer la performance et améliorer le contenu. Vous pouvez contrôler les cookies dans les paramètres de votre navigateur, même si certaines fonctionnalités peuvent ne pas fonctionner comme prévu si les cookies sont désactivés.',
        ],
      },
      {
        title: 'Sécurité Et Conservation',
        body: [
          'Nous utilisons des mesures administratives, techniques et organisationnelles raisonnables pour protéger les informations personnelles. Aucun site web, système d’e-mail ou service en ligne ne peut être garanti comme totalement sécurisé.',
          'Nous conservons les informations uniquement aussi longtemps que raisonnablement nécessaire pour les demandes, réservations, obligations comptables et légales, gestion des litiges et amélioration du service. Lorsqu’elles ne sont plus nécessaires, nous les supprimons, archivons ou anonymisons lorsque cela est pratique.',
        ],
      },
      {
        title: 'Données De Voyage Internationales',
        body: [
          'Comme les services de voyage impliquent souvent des hôtels, compagnies aériennes, opérateurs locaux, fournisseurs technologiques et voyageurs dans différents pays, vos informations peuvent être traitées ou transférées hors de votre pays d’origine. Nous effectuons ces transferts uniquement lorsque cela est nécessaire pour fournir les services demandés ou exploiter notre activité.',
        ],
      },
      {
        title: 'Vos Choix',
        body: [
          'Vous pouvez nous demander d’accéder aux informations personnelles que nous détenons sur vous, de les corriger, les mettre à jour ou les supprimer, sous réserve des limites légales, comptables, de sécurité et opérationnelles. Vous pouvez aussi vous opposer aux messages marketing à tout moment.',
        ],
      },
      {
        title: 'Enfants',
        body: [
          'Notre site web est destiné aux adultes qui planifient un voyage. Nous ne collectons pas sciemment d’informations personnelles d’enfants sans l’implication appropriée d’un parent ou tuteur.',
        ],
      },
      {
        title: 'Mises À Jour',
        body: [
          'Nous pouvons mettre cette Politique de Confidentialité à jour de temps à autre. La dernière version sera publiée sur cette page avec la date mise à jour.',
        ],
      },
    ],
    contactTitle: 'Nous Contacter',
    contactBeforeEmail: 'Les questions sur la confidentialité ou les demandes de données peuvent être envoyées à',
    contactAfterEmail: '. Vous pouvez aussi nous joindre au',
    contactBeforePage: 'ou visiter notre',
    contactPage: 'page de contact',
    contactEnd: '.',
  },
  DE: {
    eyebrow: 'Rechtliches',
    title: 'Datenschutzerklärung',
    intro:
      'Diese Erklärung erläutert, wie EthioAfro Tours Informationen verarbeitet, die von Gästen, Website-Besuchern und Reisepartnern geteilt werden.',
    lastUpdated: 'Zuletzt aktualisiert',
    sections: [
      {
        title: 'Welche Informationen Wir Erheben',
        body: [
          'Wir erheben Informationen, die Sie uns über unsere Website, per E-Mail, Telefon, WhatsApp, Newsletter-Formulare, Anfrageformulare und Buchungsgespräche übermitteln. Dazu können Name, E-Mail-Adresse, Telefonnummer, Land, bevorzugte Reiseziele, Reisedaten, Gruppengröße, Budgetrahmen, Unterkunftswünsche, Ernährungsbedürfnisse, Barrierefreiheitsanforderungen und weitere Details gehören, die zur Gestaltung Ihrer Reise nötig sind.',
          'Wenn eine Reise bestätigt wird, können wir zusätzliche Reiseinformationen anfordern, etwa Passdaten, Flugdaten, Notfallkontakt, Versicherungsinformationen und besondere Anforderungen, die von Hotels, Fluggesellschaften, Guides oder lokalen Behörden benötigt werden.',
          'Unsere Website kann außerdem technische Informationen wie IP-Adresse, Browsertyp, Geräteinformationen, besuchte Seiten, Verweisquelle sowie Cookie- oder Analysedaten erfassen.',
        ],
      },
      {
        title: 'Wie Wir Informationen Verwenden',
        body: [
          'Wir verwenden personenbezogene Informationen, um Anfragen zu beantworten, private Reiserouten vorzubereiten, Angebote zu erstellen, bestätigte Reiseleistungen zu arrangieren, wichtige Reisehinweise zu kommunizieren, administrative Unterlagen zu bearbeiten, unsere Website zu verbessern und die Sicherheit unserer Dienste zu schützen.',
          'Wenn Sie Updates abonnieren, können wir gelegentlich Reisegeschichten oder Angebote senden. Sie können sich jederzeit über den Abmeldelink oder durch direkte Kontaktaufnahme abmelden.',
        ],
      },
      {
        title: 'Weitergabe An Reisepartner',
        body: [
          'Wir teilen nur die Informationen, die vernünftigerweise für die Durchführung Ihrer Reiseroute erforderlich sind, mit vertrauenswürdigen Dienstleistern wie Hotels, Lodges, Inlandsfluggesellschaften, Transportunternehmen, Guides, Restaurants, Aktivitätsanbietern, Zahlungsdienstleistern, Technologieanbietern und professionellen Beratern.',
          'Wir verkaufen keine personenbezogenen Informationen. Wir teilen Gästeinformationen nicht mit unabhängigen Dritten für deren eigenes Marketing.',
        ],
      },
      {
        title: 'Zahlungen',
        body: [
          'Wenn Karten- oder Online-Zahlungen verfügbar sind, werden Zahlungsinformationen von sicheren Zahlungsdienstleistern verarbeitet. EthioAfro Tours speichert auf dieser Website nicht absichtlich vollständige Kartennummern.',
        ],
      },
      {
        title: 'Cookies Und Analyse',
        body: [
          'Unsere Website kann Cookies und Analyse-Tools verwenden, um den Betrieb der Website sicherzustellen, Besucheraktivität zu verstehen, Leistung zu messen und Inhalte zu verbessern. Sie können Cookies über Ihre Browsereinstellungen steuern, auch wenn einige Funktionen möglicherweise nicht wie erwartet funktionieren, wenn Cookies deaktiviert sind.',
        ],
      },
      {
        title: 'Sicherheit Und Aufbewahrung',
        body: [
          'Wir verwenden angemessene administrative, technische und organisatorische Schutzmaßnahmen, um personenbezogene Informationen zu schützen. Keine Website, kein E-Mail-System und kein Online-Dienst kann als vollständig sicher garantiert werden.',
          'Wir bewahren Informationen nur so lange auf, wie es für Anfragen, Buchungen, Buchhaltung, gesetzliche Pflichten, Streitbeilegung und Serviceverbesserung angemessen erforderlich ist. Wenn Informationen nicht mehr benötigt werden, löschen, archivieren oder anonymisieren wir sie, soweit praktikabel.',
        ],
      },
      {
        title: 'Internationale Reisedaten',
        body: [
          'Da Reiseleistungen häufig Hotels, Fluggesellschaften, lokale Betreiber, Technologieanbieter und Gäste in verschiedenen Ländern einbeziehen, können Ihre Informationen außerhalb Ihres Heimatlandes verarbeitet oder übertragen werden. Wir handhaben solche Übertragungen nur, soweit dies zur Erbringung der gewünschten Reiseleistungen oder zum Betrieb unseres Geschäfts erforderlich ist.',
        ],
      },
      {
        title: 'Ihre Wahlmöglichkeiten',
        body: [
          'Sie können uns bitten, personenbezogene Informationen, die wir über Sie gespeichert haben, einzusehen, zu korrigieren, zu aktualisieren oder zu löschen, vorbehaltlich gesetzlicher, buchhalterischer, sicherheitsbezogener und betrieblicher Grenzen. Sie können Marketingnachrichten außerdem jederzeit abbestellen.',
        ],
      },
      {
        title: 'Kinder',
        body: [
          'Unsere Website richtet sich an Erwachsene, die Reisen planen. Wir erheben wissentlich keine personenbezogenen Informationen von Kindern ohne angemessene Beteiligung eines Elternteils oder Erziehungsberechtigten.',
        ],
      },
      {
        title: 'Aktualisierungen',
        body: [
          'Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Die aktuelle Version wird auf dieser Seite mit dem aktualisierten Datum veröffentlicht.',
        ],
      },
    ],
    contactTitle: 'Kontakt',
    contactBeforeEmail: 'Fragen zum Datenschutz oder Datenanfragen können gesendet werden an',
    contactAfterEmail: '. Sie erreichen uns auch unter',
    contactBeforePage: 'oder über unsere',
    contactPage: 'Kontaktseite',
    contactEnd: '.',
  },
  ZH: {
    eyebrow: '法律信息',
    title: '隐私政策',
    intro:
      '本政策说明 EthioAfro Tours 如何处理客人、网站访问者和旅行合作伙伴提供的信息。',
    lastUpdated: '最后更新',
    sections: [
      {
        title: '我们收集的信息',
        body: [
          '我们会收集您通过网站、电子邮件、电话、WhatsApp、通讯订阅表、咨询表和预订沟通主动提供的信息。这可能包括您的姓名、电子邮箱、电话号码、所在国家、偏好目的地、旅行日期、团队人数、预算范围、住宿偏好、饮食需求、无障碍需求，以及设计行程所需的其他信息。',
          '如果行程已确认，我们可能会要求提供更多旅行信息，例如护照信息、航班信息、紧急联系人、保险信息，以及酒店、航空公司、导游或当地机构所需的特殊要求。',
          '我们的网站也可能收集技术信息，例如 IP 地址、浏览器类型、设备信息、访问页面、来源渠道，以及 Cookie 或分析数据。',
        ],
      },
      {
        title: '我们如何使用信息',
        body: [
          '我们使用个人信息来回复咨询、准备私人行程、提供报价、安排已确认的旅行服务、沟通重要行程更新、处理行政记录、改进网站，并保护服务安全。',
          '如果您订阅更新，我们可能会不定期发送旅行故事或优惠信息。您可以随时通过退订链接或直接联系我们取消订阅。',
        ],
      },
      {
        title: '与旅行合作伙伴共享',
        body: [
          '我们只会向可信服务提供方共享运行您的行程所合理需要的信息，例如酒店、旅馆、国内航空公司、交通提供方、导游、餐厅、活动提供方、支付处理方、技术供应商和专业顾问。',
          '我们不会出售个人信息，也不会为了无关第三方的独立营销而共享客人信息。',
        ],
      },
      {
        title: '付款',
        body: [
          '当可以使用银行卡或在线付款时，付款信息由安全的支付处理方处理。EthioAfro Tours 不会有意在本网站存储完整银行卡号。',
        ],
      },
      {
        title: 'Cookie 与分析',
        body: [
          '我们的网站可能使用 Cookie 和分析工具，以保持网站运行、了解访客活动、衡量性能并改进内容。您可以通过浏览器设置控制 Cookie，但如果禁用 Cookie，部分网站功能可能无法按预期运行。',
        ],
      },
      {
        title: '安全与保留',
        body: [
          '我们采取合理的行政、技术和组织保护措施来保护个人信息。任何网站、电子邮件系统或在线服务都无法保证完全安全。',
          '我们只会在处理咨询、预订、会计、法律义务、争议处理和服务改进所合理需要的期限内保留信息。当信息不再需要时，我们会在可行情况下删除、归档或匿名化。',
        ],
      },
      {
        title: '国际旅行数据',
        body: [
          '由于旅行服务通常涉及不同国家的酒店、航空公司、当地运营方、技术提供方和客人，您的信息可能会在您的本国之外被处理或传输。我们只会在提供所请求的旅行服务或运营业务所需时进行此类传输。',
        ],
      },
      {
        title: '您的选择',
        body: [
          '您可以要求我们访问、更正、更新或删除我们持有的关于您的个人信息，但需受法律、会计、安全和运营限制约束。您也可以随时选择不接收营销信息。',
        ],
      },
      {
        title: '儿童',
        body: [
          '我们的网站面向计划旅行的成年人。我们不会在没有父母或监护人适当参与的情况下，故意收集儿童的个人信息。',
        ],
      },
      {
        title: '更新',
        body: [
          '我们可能会不时更新本隐私政策。最新版本将发布在本页面，并标明更新日期。',
        ],
      },
    ],
    contactTitle: '联系我们',
    contactBeforeEmail: '有关隐私或数据请求的问题可以发送至',
    contactAfterEmail: '。您也可以致电',
    contactBeforePage: '，或访问我们的',
    contactPage: '联系页面',
    contactEnd: '。',
  },
}

export function PrivacyContent() {
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
        <div className="mx-auto max-w-3xl space-y-10">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-pretty leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-2xl text-foreground">{copy.contactTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {copy.contactBeforeEmail}{' '}
              <a className="text-primary hover:text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              {copy.contactAfterEmail} {contact.phone} {copy.contactBeforePage}{' '}
              <Link className="text-primary hover:text-accent" href="/contact">
                {copy.contactPage}
              </Link>
              {copy.contactEnd}
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}
