'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type LanguageCode = 'EN' | 'ES' | 'FR' | 'DE' | 'ZH'

type Dictionary = Record<string, string>

export const languageOptions: { code: LanguageCode; label: string }[] = [
  { code: 'EN', label: 'English' },
  { code: 'ES', label: 'Español' },
  { code: 'FR', label: 'Français' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'ZH', label: '中文' },
]

const storageKey = 'ethioafro-language'

const htmlLang: Record<LanguageCode, string> = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  ZH: 'zh-CN',
}

const dictionaries: Record<LanguageCode, Dictionary> = {
  EN: {},
  ES: {
    'skip.content': 'Saltar al contenido',
    'nav.rail': 'Propiedad local en Addis Abeba · Viajes privados desde 2008',
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.destinations': 'Destinos',
    'nav.tours': 'Tours',
    'nav.layover': 'Escala',
    'nav.journal': 'Diario',
    'nav.request': 'Solicitar Su Viaje',
    'nav.language': 'Idioma',
    'nav.changeLanguage': 'Cambiar idioma',
    'nav.closeMenu': 'Cerrar menú',
    'nav.openMenu': 'Abrir menú',
    'nav.destinations.eyebrow': 'Etiopía',
    'nav.destinations.title': 'Nuestros Destinos',
    'nav.destinations.text':
      'Desde iglesias monolíticas talladas en roca sólida hasta paisajes tectónicos al borde del mundo. Explore la antigua cuna de la civilización.',
    'nav.destinations.cta': 'Ver Todos los Destinos',
    'nav.tours.eyebrow': 'Viajes Curados',
    'nav.tours.title': 'Itinerarios Exclusivos',
    'nav.tours.text':
      'Expediciones privadas diseñadas por expertos que combinan alojamientos de lujo, guías especialistas y acceso cultural exclusivo.',
    'nav.tours.cta': 'Explorar Todos los Tours',
    from: 'Desde',
    'hero.alt':
      'Bet Giyorgis, la Iglesia de San Jorge en Lalibela, Etiopía',
    'hero.title': 'Descubra el alma de Etiopía',
    'hero.copy':
      'Viaje por civilizaciones antiguas, paisajes dramáticos y tradiciones vivas con experiencias privadas diseñadas alrededor de usted.',
    'hero.primary': 'Diseñar Mi Viaje',
    'hero.secondary': 'Explorar Etiopía',
    'trust.0.title': '16+ Años',
    'trust.0.label': 'Experiencia',
    'trust.1.title': 'Lujo y A Medida',
    'trust.1.label': 'Itinerarios',
    'trust.2.title': 'Auténticas Locales',
    'trust.2.label': 'Experiencias',
    'trust.3.title': 'Cómodo',
    'trust.3.label': 'Transporte',
    'trust.4.title': 'Sostenible',
    'trust.4.label': 'Turismo',
    'trust.5.title': 'Grupos Pequeños y',
    'trust.5.label': 'Tours Privados',
    'brand.eyebrow': 'Nuestra Filosofía',
    'brand.title': 'Cada viaje comienza con una historia',
    'brand.p1':
      'Durante miles de años, Etiopía ha recibido a exploradores, comerciantes, peregrinos, artistas y soñadores. Es una tierra de iglesias excavadas en la roca, reinos de las tierras altas y el lugar de origen del café.',
    'brand.p2':
      'EthioAfro existe para ayudarle a vivir ese legado mediante viajes creados con cuidado, conocimiento y autenticidad: no paquetes, sino experiencias diseñadas alrededor del viajero que usted es.',
    'brand.principle.0.bold': 'Escuchamos',
    'brand.principle.0.rest': 'antes de recomendar',
    'brand.principle.1.bold': 'Diseñamos',
    'brand.principle.1.rest': 'viajes, no paquetes',
    'brand.principle.2.bold': 'Permanecemos',
    'brand.principle.2.rest': 'presentes, antes y después',
    'destinations.eyebrow': 'Destinos Exclusivos',
    'destinations.title': 'Un país de variedad imposible',
    'destinations.aside':
      'Desde catedrales de las tierras altas hasta tierras bajas volcánicas, cada región revela un capítulo diferente de la historia de Etiopía.',
    'destinations.cta': 'Explorar Todos los Destinos',
    'destination.lalibela.tag': 'Patrimonio UNESCO',
    'destination.lalibela.region': 'Tierras Altas del Norte',
    'destination.lalibela.teaser':
      'Once iglesias talladas hacia abajo en roca viva, todavía llenas de oración.',
    'destination.addis-ababa.tag': 'Capital',
    'destination.addis-ababa.region': 'Etiopía Central',
    'destination.addis-ababa.teaser':
      'Museos, mercados y vida etíope moderna en la puerta de entrada al país.',
    'destination.simien-mountains.region': 'Tierras Altas del Norte',
    'destination.simien-mountains.tag': 'Parque Nacional',
    'destination.simien-mountains.teaser':
      'Un techo de África donde los geladas pastan sobre caídas de dos mil metros.',
    'destination.danakil-depression.region': 'Tierras Bajas de Afar',
    'destination.danakil-depression.tag': 'Expedición',
    'destination.danakil-depression.teaser':
      'El lugar habitado más caluroso de la Tierra, pintado de azufre y sal.',
    'destination.omo-valley.tag': 'Inmersión Cultural',
    'destination.omo-valley.region': 'Rift del Sur',
    'destination.omo-valley.teaser':
      'Un mosaico vivo de comunidades que han modelado esta tierra durante milenios.',
    'journeys.eyebrow': 'Tours Destacados',
    'journeys.title': 'Viajes curados, nunca paquetes',
    'journeys.lede':
      'Un punto de partida para conversar. Cada itinerario se adapta a su ritmo, sus intereses y el viaje que ha imaginado.',
    'journeys.cta': 'Explorar Todos los Tours',
    'tour.the-historic-route.title': 'Norte Histórico Clásico',
    'tour.the-historic-route.style': 'Cultural · Privado',
    'tour.the-historic-route.teaser':
      'Siga la peregrinación de reyes desde los castillos de Gondar hasta las iglesias rupestres de Lalibela.',
    'tour.omo-valley-immersion.title': 'Descubrimiento Cultural del Valle del Omo',
    'tour.omo-valley-immersion.style': 'Cultural · Privado',
    'tour.omo-valley-immersion.teaser':
      'Días de mercado, ceremonia y conversación en uno de los valles con mayor densidad cultural del mundo.',
    'tour.danakil-expedition.title': 'Expedición Danakil y Erta Ale',
    'tour.danakil-expedition.style': 'Expedición · Grupo Pequeño',
    'tour.danakil-expedition.teaser':
      'Manantiales de azufre, un lago de lava permanente y caravanas de sal sobre la llanura blanca.',
    'tour.bale-mountains-and-sof-omar.title':
      'Aventura Bale Mountains y Sof Omar',
    'tour.bale-mountains-and-sof-omar.style': 'Aventura · Privado',
    'tour.bale-mountains-and-sof-omar.teaser':
      'Rastree lobos etíopes en la meseta Sanetti, descienda al bosque Harenna y camine por las cámaras calizas de Sof Omar.',
    'tour.simien-mountains-trek.title': 'Trekking en las Montañas Simien',
    'tour.simien-mountains-trek.style': 'Trekking · Privado',
    'tour.simien-mountains-trek.teaser':
      'Camine por el escarpe entre geladas, cascadas y grandes vistas de las tierras altas.',
    'tour.grand-ethiopia-highlights.title': 'Grandes Highlights de Etiopía',
    'tour.grand-ethiopia-highlights.style': 'Cultural · Privado',
    'tour.grand-ethiopia-highlights.teaser':
      'El norte histórico, ciudades orientales, culturas del sur y vida silvestre de montaña en un gran viaje.',
    'tour.view': 'Ver Itinerario',
    'why.eyebrow': 'Por Qué Etiopía',
    'why.title': '¿Por qué aquí y no en otro lugar?',
    'why.p1':
      'Mientras el resto del continente ofrece lo familiar, Etiopía ofrece lo extraordinario. Es la cuna del café, hogar de antiguos reinos cristianos y un paisaje que va desde cumbres envueltas en nubes hasta el lugar más bajo y caluroso de la Tierra.',
    'why.p2':
      'Los viajeros no solo visitan Etiopía. Se marchan con una nueva sensación de lo antiguo, variado y acogedor que puede ser el mundo.',
    'why.fact.0': 'años de civilización continua',
    'why.fact.1': 'Sitios Patrimonio Mundial de la UNESCO',
    'why.fact.2': 'lenguas y culturas vivas',
    'why.fact.3': 'meses en el calendario etíope',
    'experiences.eyebrow': 'Experiencias de Lujo',
    'experiences.title': 'Los momentos que permanecen',
    'experience.private-coffee-journeys.title': 'Viajes Privados de Café',
    'experience.private-coffee-journeys.text':
      'Siga el grano desde el bosque silvestre hasta la ceremonia, tostado sobre brasas por familias que han recibido huéspedes durante generaciones.',
    'experience.photography-expeditions.title': 'Expediciones Fotográficas',
    'experience.photography-expeditions.text':
      'Persiga la luz dorada sobre escarpes de montaña y salares, guiado por quienes saben exactamente dónde aparecerá el momento.',
    'experience.luxury-cultural-immersions.title':
      'Inmersiones Culturales de Lujo',
    'experience.luxury-cultural-immersions.text':
      'Comparta una mañana con maestros artesanos, una comida local y tradiciones llevadas a través de los siglos.',
    'experience.signature-hospitality.title': 'Hospitalidad Exclusiva',
    'experience.signature-hospitality.text':
      'Retírese cada noche a eco-lodges al borde del mundo, donde el silencio y el confort se encuentran con lo salvaje.',
    discover: 'Descubrir',
    'layover.eyebrow': 'Tours de Escala en Addis',
    'layover.title': 'Convierta una conexión larga en una introducción',
    'layover.copy':
      'Comparta ambos vuelos y su nacionalidad de pasaporte. Revisaremos la ventana útil y diseñaremos una visita privada a Addis considerando inmigración, tráfico y regreso protegido al aeropuerto.',
    'layover.cta': 'Explorar tours de escala',
    'layover.stopover': 'Escala larga',
    'testimonial.eyebrow': 'En Sus Palabras',
    'testimonial.quote':
      '“Hemos viajado por el mundo, pero nada nos preparó para Etiopía. Cada detalle fue considerado, cada guía extraordinario. No nos sentimos turistas: nos sentimos invitados de un viejo amigo.”',
    'testimonial.route': 'La Ruta Histórica · Reino Unido',
    'gallery.eyebrow': 'La Exposición',
    'gallery.title': 'Etiopía, vista lentamente',
    'gallery.copy':
      'Una galería de momentos tranquilos capturados en nuestros viajes: la luz, la textura y la escala humana de una tierra antigua.',
    'gallery.index': 'Exposición',
    'gallery.captured': 'Momentos Capturados',
    'plan.eyebrow': 'Planifique Su Viaje',
    'plan.title': 'Diseñemos su viaje por Etiopía',
    'plan.copy':
      'Cada itinerario comienza con una conversación. Sin plantillas, sin compromisos: solo un viaje diseñado completamente alrededor de usted. Un diseñador de viajes responde en 24 horas.',
    'plan.point.0': 'Diseño local, guía privada',
    'plan.point.1': 'Precios transparentes y a medida',
    'plan.point.2': 'Concierge 24/7 antes, durante y después',
    'form.successTitle': 'Su viaje comienza aquí',
    'form.successCopy':
      'Un diseñador de viajes ya está revisando su visión y comenzará a crear un itinerario personalizado. Recibirá noticias nuestras en 24 horas.',
    'form.enquiryAbout': 'Consulta sobre',
    'form.fullName': 'Nombre completo',
    'form.yourName': 'Su nombre',
    'form.email': 'Correo electrónico',
    'form.dates': 'Fechas preferidas de viaje',
    'form.datesPlaceholder': 'p. ej. marzo de 2026',
    'form.travellers': 'Número de viajeros',
    'form.travellersPlaceholder': '2 adultos',
    'form.kind': '¿Qué tipo de viaje imagina?',
    'form.dream': 'Cuéntenos sobre el viaje que ha imaginado',
    'form.dreamPlaceholder':
      'Un viaje privado de café, mañanas sobre las nubes, noches junto al fuego...',
    'form.submit': 'Iniciar la conversación',
    'form.note':
      'Respondemos personalmente en 24 horas. Sus datos nunca se comparten.',
    'form.error': 'Algo salió mal; inténtelo de nuevo.',
    'footer.copy':
      'Presentamos a los viajeros una de las civilizaciones más antiguas de la humanidad, con cuidado, conocimiento y lujo discreto.',
    'footer.destinations': 'Destinos',
    'footer.tours': 'Tours',
    'footer.explore': 'Explorar',
    'footer.custom': 'Itinerarios a Medida',
    'footer.about': 'Sobre Nosotros',
    'footer.layover': 'Escala en Addis',
    'footer.journal': 'Diario de Viaje',
    'footer.responsible': 'Turismo Responsable',
    'footer.when': 'Cuándo Viajar',
    'footer.contact': 'Contacto',
    'footer.platforms': 'Plataformas de Viaje de Confianza',
    'footer.platformsCopy': 'Encuéntrenos donde planifican viajeros exigentes.',
    'footer.accept': 'Aceptamos',
    'footer.acceptCopy': 'Métodos seguros de procesamiento de pagos.',
    'footer.newsletter':
      'Suscríbase a nuestro boletín para historias de viaje curadas',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'newsletter.email': 'Correo electrónico',
    'newsletter.placeholder': 'Su correo',
    'newsletter.button': 'Suscribirse',
    'newsletter.done': 'Gracias; la próxima carta le encontrará.',
    'chat.whatsapp': 'Chatear por WhatsApp',
    'chat.ai': 'Asistente de viaje IA',
    'chat.title': 'Guía IA de EthioAfro',
    'chat.status': 'Soporte experto · En línea',
    'chat.welcome':
      '¡Selam! Soy su Asistente IA de EthioAfro. ¿Cómo puedo ayudarle a diseñar hoy su viaje privado por el alma de Etiopía?',
    'chat.placeholder': 'Pregunte algo sobre Etiopía...',
    'chat.send': 'Enviar mensaje',
  },
  FR: {
    'skip.content': 'Aller au contenu',
    'nav.rail': 'Entreprise locale à Addis-Abeba · Voyages privés depuis 2008',
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.destinations': 'Destinations',
    'nav.tours': 'Circuits',
    'nav.layover': 'Escale',
    'nav.journal': 'Journal',
    'nav.request': 'Demander Votre Voyage',
    'nav.language': 'Langue',
    'nav.changeLanguage': 'Changer de langue',
    'nav.closeMenu': 'Fermer le menu',
    'nav.openMenu': 'Ouvrir le menu',
    'nav.destinations.eyebrow': 'Éthiopie',
    'nav.destinations.title': 'Nos Destinations',
    'nav.destinations.text':
      'Des églises monolithiques taillées dans la roche aux paysages tectoniques du bout du monde. Explorez l’ancien berceau de la civilisation.',
    'nav.destinations.cta': 'Voir Toutes les Destinations',
    'nav.tours.eyebrow': 'Voyages Sélectionnés',
    'nav.tours.title': 'Itinéraires Signature',
    'nav.tours.text':
      'Des expéditions privées conçues par des experts, mêlant hébergements de luxe, guides spécialistes et accès culturel exclusif.',
    'nav.tours.cta': 'Explorer Tous les Circuits',
    from: 'À partir de',
    'hero.alt': 'Bet Giyorgis, église Saint-Georges à Lalibela, Éthiopie',
    'hero.title': 'Découvrez l’âme de l’Éthiopie',
    'hero.copy':
      'Traversez civilisations anciennes, paysages spectaculaires et traditions vivantes avec des expériences privées conçues autour de vous.',
    'hero.primary': 'Créer Mon Voyage',
    'hero.secondary': 'Explorer l’Éthiopie',
    'trust.0.title': '16+ Ans',
    'trust.0.label': 'Expérience',
    'trust.1.title': 'Luxe et Sur Mesure',
    'trust.1.label': 'Itinéraires',
    'trust.2.title': 'Locales Authentiques',
    'trust.2.label': 'Expériences',
    'trust.3.title': 'Confortable',
    'trust.3.label': 'Transport',
    'trust.4.title': 'Durable',
    'trust.4.label': 'Tourisme',
    'trust.5.title': 'Petits Groupes et',
    'trust.5.label': 'Circuits Privés',
    'brand.eyebrow': 'Notre Philosophie',
    'brand.title': 'Chaque voyage commence par une histoire',
    'brand.p1':
      'Depuis des millénaires, l’Éthiopie accueille explorateurs, marchands, pèlerins, artistes et rêveurs. C’est une terre d’églises rupestres, de royaumes d’altitude et le berceau du café.',
    'brand.p2':
      'EthioAfro vous fait vivre cet héritage grâce à des voyages créés avec soin, connaissance et authenticité : non pas des forfaits, mais des expériences pensées pour le voyageur que vous êtes.',
    'brand.principle.0.bold': 'Nous écoutons',
    'brand.principle.0.rest': 'avant de recommander',
    'brand.principle.1.bold': 'Nous concevons',
    'brand.principle.1.rest': 'des voyages, pas des forfaits',
    'brand.principle.2.bold': 'Nous restons',
    'brand.principle.2.rest': 'présents, avant et après',
    'destinations.eyebrow': 'Destinations Signature',
    'destinations.title': 'Un pays d’une variété impossible',
    'destinations.aside':
      'Des cathédrales d’altitude aux basses terres volcaniques, chaque région révèle un chapitre différent de l’histoire éthiopienne.',
    'destinations.cta': 'Explorer Toutes les Destinations',
    'destination.lalibela.tag': 'Patrimoine UNESCO',
    'destination.lalibela.region': 'Hautes Terres du Nord',
    'destination.lalibela.teaser':
      'Onze églises creusées vers le bas dans la roche vive, toujours habitées par la prière.',
    'destination.addis-ababa.tag': 'Capitale',
    'destination.addis-ababa.region': 'Éthiopie Centrale',
    'destination.addis-ababa.teaser':
      'Musées, marchés et vie éthiopienne contemporaine à la porte d’entrée du pays.',
    'destination.simien-mountains.region': 'Hautes Terres du Nord',
    'destination.simien-mountains.tag': 'Parc National',
    'destination.simien-mountains.teaser':
      'Un toit de l’Afrique où les geladas paissent au-dessus d’à-pics de deux mille mètres.',
    'destination.danakil-depression.region': 'Basses Terres Afar',
    'destination.danakil-depression.tag': 'Expédition',
    'destination.danakil-depression.teaser':
      'Le lieu habité le plus chaud de la Terre, peint de soufre et de sel.',
    'destination.omo-valley.tag': 'Immersion Culturelle',
    'destination.omo-valley.region': 'Rift du Sud',
    'destination.omo-valley.teaser':
      'Une mosaïque vivante de communautés qui façonnent cette terre depuis des millénaires.',
    'journeys.eyebrow': 'Circuits en Vedette',
    'journeys.title': 'Des voyages sélectionnés, jamais des forfaits',
    'journeys.lede':
      'Un point de départ pour la conversation. Chaque itinéraire est remodelé selon votre rythme, vos intérêts et le voyage que vous imaginez.',
    'journeys.cta': 'Explorer Tous les Circuits',
    'tour.the-historic-route.title': 'Nord Historique Classique',
    'tour.the-historic-route.style': 'Culturel · Privé',
    'tour.the-historic-route.teaser':
      'Suivez le pèlerinage des rois, des châteaux de Gondar aux églises rupestres de Lalibela.',
    'tour.omo-valley-immersion.title': 'Découverte Culturelle de la Vallée de l’Omo',
    'tour.omo-valley-immersion.style': 'Culturel · Privé',
    'tour.omo-valley-immersion.teaser':
      'Jours de marché, cérémonies et conversations dans l’une des vallées les plus denses culturellement au monde.',
    'tour.danakil-expedition.title': 'Expédition Danakil et Erta Ale',
    'tour.danakil-expedition.style': 'Expédition · Petit Groupe',
    'tour.danakil-expedition.teaser':
      'Sources sulfureuses, lac de lave permanent et caravanes de sel sur la plaine blanche.',
    'tour.bale-mountains-and-sof-omar.title':
      'Aventure Montagnes Bale et Sof Omar',
    'tour.bale-mountains-and-sof-omar.style': 'Aventure · Privé',
    'tour.bale-mountains-and-sof-omar.teaser':
      'Pistez les loups d’Éthiopie sur le plateau de Sanetti, descendez dans la forêt d’Harenna et traversez les chambres calcaires de Sof Omar.',
    'tour.simien-mountains-trek.title': 'Trek des Montagnes du Simien',
    'tour.simien-mountains-trek.style': 'Trekking · Privé',
    'tour.simien-mountains-trek.teaser':
      'Marchez sur l’escarpement parmi les geladas, les cascades et les vastes vues d’altitude.',
    'tour.grand-ethiopia-highlights.title': 'Grands Incontournables d’Éthiopie',
    'tour.grand-ethiopia-highlights.style': 'Culturel · Privé',
    'tour.grand-ethiopia-highlights.teaser':
      'Le nord historique, les villes orientales, les cultures du sud et la faune d’altitude en un grand voyage.',
    'tour.view': 'Voir l’Itinéraire',
    'why.eyebrow': 'Pourquoi l’Éthiopie',
    'why.title': 'Pourquoi ici, et pas ailleurs ?',
    'why.p1':
      'Quand le reste du continent offre le familier, l’Éthiopie offre l’extraordinaire. C’est le berceau du café, la terre d’anciens royaumes chrétiens et un paysage allant des sommets enveloppés de nuages au lieu le plus bas et le plus chaud de la Terre.',
    'why.p2':
      'Les voyageurs ne font pas que visiter l’Éthiopie. Ils repartent avec une autre idée de l’ancienneté, de la diversité et de l’accueil du monde.',
    'why.fact.0': 'années de civilisation continue',
    'why.fact.1': 'sites du patrimoine mondial de l’UNESCO',
    'why.fact.2': 'langues et cultures vivantes',
    'why.fact.3': 'mois dans le calendrier éthiopien',
    'experiences.eyebrow': 'Expériences de Luxe',
    'experiences.title': 'Les moments qui restent avec vous',
    'experience.private-coffee-journeys.title': 'Voyages Privés du Café',
    'experience.private-coffee-journeys.text':
      'Suivez le grain de la forêt sauvage à la cérémonie, torréfié sur les braises par des familles qui accueillent des hôtes depuis des générations.',
    'experience.photography-expeditions.title': 'Expéditions Photographiques',
    'experience.photography-expeditions.text':
      'Poursuivez la lumière dorée sur les escarpements d’altitude et les plaines salées, guidé par ceux qui savent où le moment surgira.',
    'experience.luxury-cultural-immersions.title':
      'Immersions Culturelles de Luxe',
    'experience.luxury-cultural-immersions.text':
      'Partagez une matinée avec des maîtres artisans, un repas local et des traditions transmises depuis des siècles.',
    'experience.signature-hospitality.title': 'Hospitalité Signature',
    'experience.signature-hospitality.text':
      'Retrouvez chaque soir des écolodges au bord du monde, là où le silence et le confort rencontrent le sauvage.',
    discover: 'Découvrir',
    'layover.eyebrow': 'Circuits d’Escale à Addis',
    'layover.title': 'Transformez une longue connexion en introduction',
    'layover.copy':
      'Partagez vos deux vols et votre nationalité de passeport. Nous vérifierons le temps utile et créerons une visite privée d’Addis autour de l’immigration, du trafic et d’un retour protégé à l’aéroport.',
    'layover.cta': 'Explorer les circuits d’escale',
    'layover.stopover': 'Escale',
    'testimonial.eyebrow': 'Leurs Mots',
    'testimonial.quote':
      '« Nous avons parcouru le monde, mais rien ne nous avait préparés à l’Éthiopie. Chaque détail était pensé, chaque guide extraordinaire. Nous ne nous sommes pas sentis touristes : nous étions les invités d’un vieil ami. »',
    'testimonial.route': 'La Route Historique · Royaume-Uni',
    'gallery.eyebrow': 'L’Exposition',
    'gallery.title': 'L’Éthiopie, vue lentement',
    'gallery.copy':
      'Une galerie de moments calmes capturés lors de nos voyages : la lumière, la texture et l’échelle humaine d’une terre ancienne.',
    'gallery.index': 'Exposition',
    'gallery.captured': 'Moments Capturés',
    'plan.eyebrow': 'Planifier Votre Voyage',
    'plan.title': 'Créons votre voyage éthiopien',
    'plan.copy':
      'Chaque itinéraire commence par une conversation. Pas de modèles, pas de compromis : seulement un voyage conçu entièrement autour de vous. Un designer de voyage répond sous 24 heures.',
    'plan.point.0': 'Conçu localement, guidé en privé',
    'plan.point.1': 'Prix transparents et sur mesure',
    'plan.point.2': 'Conciergerie 24/7 avant, pendant et après',
    'footer.copy':
      'Présenter aux voyageurs l’une des plus anciennes civilisations de l’humanité, avec soin, connaissance et luxe discret.',
    'footer.destinations': 'Destinations',
    'footer.tours': 'Circuits',
    'footer.explore': 'Explorer',
    'footer.custom': 'Itinéraires Sur Mesure',
    'footer.about': 'À Propos',
    'footer.layover': 'Escale à Addis',
    'footer.journal': 'Journal de Voyage',
    'footer.responsible': 'Tourisme Responsable',
    'footer.when': 'Quand Partir',
    'footer.contact': 'Contact',
    'footer.platforms': 'Plateformes de Voyage de Confiance',
    'footer.platformsCopy': 'Retrouvez-nous là où les voyageurs exigeants planifient.',
    'footer.accept': 'Nous Acceptons',
    'footer.acceptCopy': 'Méthodes de paiement sécurisées.',
    'footer.newsletter':
      'Abonnez-vous à notre newsletter pour des récits de voyage sélectionnés',
    'footer.rights': 'Tous droits réservés.',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'newsletter.email': 'Adresse e-mail',
    'newsletter.placeholder': 'Votre e-mail',
    'newsletter.button': 'S’abonner',
    'newsletter.done': 'Merci ; la prochaine lettre vous trouvera.',
    'form.successTitle': 'Votre voyage commence ici',
    'form.successCopy':
      'Un designer de voyage examine déjà votre vision et commencera à créer un itinéraire personnalisé. Vous aurez de nos nouvelles sous 24 heures.',
    'form.enquiryAbout': 'Demande concernant',
    'form.fullName': 'Nom complet',
    'form.yourName': 'Votre nom',
    'form.email': 'Adresse e-mail',
    'form.dates': 'Dates de voyage souhaitées',
    'form.datesPlaceholder': 'ex. mars 2026',
    'form.travellers': 'Nombre de voyageurs',
    'form.travellersPlaceholder': '2 adultes',
    'form.kind': 'Quel type de voyage imaginez-vous ?',
    'form.dream': 'Parlez-nous du voyage que vous imaginez',
    'form.dreamPlaceholder':
      'Un voyage privé autour du café, des matins au-dessus des nuages, des soirées près du feu...',
    'form.submit': 'Commencer la conversation',
    'form.note':
      'Nous répondons personnellement sous 24 heures. Vos informations ne sont jamais partagées.',
    'form.error': 'Une erreur est survenue ; veuillez réessayer.',
    'chat.whatsapp': 'Discuter sur WhatsApp',
    'chat.ai': 'Assistant de voyage IA',
    'chat.title': 'Guide IA EthioAfro',
    'chat.status': 'Support expert · En ligne',
    'chat.welcome':
      'Selam ! Je suis votre assistant IA EthioAfro. Comment puis-je vous aider à concevoir aujourd’hui votre voyage privé au cœur de l’Éthiopie ?',
    'chat.placeholder': 'Posez une question sur l’Éthiopie...',
    'chat.send': 'Envoyer le message',
  },
  DE: {
    'skip.content': 'Zum Inhalt springen',
    'nav.rail': 'Lokal geführt in Addis Abeba · Private Reisen seit 2008',
    'nav.home': 'Startseite',
    'nav.about': 'Über Uns',
    'nav.destinations': 'Reiseziele',
    'nav.tours': 'Touren',
    'nav.layover': 'Zwischenstopp',
    'nav.journal': 'Journal',
    'nav.request': 'Reise Anfragen',
    'nav.language': 'Sprache',
    'nav.changeLanguage': 'Sprache ändern',
    'nav.closeMenu': 'Menü schließen',
    'nav.openMenu': 'Menü öffnen',
    'nav.destinations.eyebrow': 'Äthiopien',
    'nav.destinations.title': 'Unsere Reiseziele',
    'nav.destinations.text':
      'Von monolithischen Kirchen im Fels bis zu tektonischen Landschaften am Rand der Welt. Entdecken Sie die alte Wiege der Zivilisation.',
    'nav.destinations.cta': 'Alle Reiseziele Ansehen',
    'nav.tours.eyebrow': 'Kuratierte Reisen',
    'nav.tours.title': 'Signature-Reiserouten',
    'nav.tours.text':
      'Privat geführte Expeditionen mit luxuriösen Unterkünften, erfahrenen Fachguides und exklusivem kulturellem Zugang.',
    'nav.tours.cta': 'Alle Touren Entdecken',
    from: 'Ab',
    'hero.alt': 'Bet Giyorgis, die St.-Georgs-Kirche in Lalibela, Äthiopien',
    'hero.title': 'Entdecken Sie die Seele Äthiopiens',
    'hero.copy':
      'Reisen Sie durch alte Zivilisationen, dramatische Landschaften und lebendige Traditionen mit privaten Erlebnissen, die um Sie herum gestaltet werden.',
    'hero.primary': 'Meine Reise Gestalten',
    'hero.secondary': 'Äthiopien Entdecken',
    'brand.eyebrow': 'Unsere Philosophie',
    'brand.title': 'Jede Reise beginnt mit einer Geschichte',
    'brand.p1':
      'Seit Jahrtausenden empfängt Äthiopien Entdecker, Händler, Pilger, Künstler und Träumer. Es ist ein Land der Felsenkirchen, Hochlandkönigreiche und der Ursprung des Kaffees.',
    'brand.p2':
      'EthioAfro hilft Ihnen, dieses Erbe durch Reisen zu erleben, die mit Sorgfalt, Wissen und Authentizität gestaltet sind: keine Pakete, sondern Erlebnisse rund um die Person, die Sie als Reisender sind.',
    'brand.principle.0.bold': 'Wir hören zu',
    'brand.principle.0.rest': 'bevor wir empfehlen',
    'brand.principle.1.bold': 'Wir gestalten',
    'brand.principle.1.rest': 'Reisen, keine Pakete',
    'brand.principle.2.bold': 'Wir bleiben',
    'brand.principle.2.rest': 'vor und nach der Reise präsent',
    'trust.0.title': '16+ Jahre',
    'trust.0.label': 'Erfahrung',
    'trust.1.title': 'Luxus und Maßarbeit',
    'trust.1.label': 'Reiserouten',
    'trust.2.title': 'Authentische Lokale',
    'trust.2.label': 'Erlebnisse',
    'trust.3.title': 'Komfortabler',
    'trust.3.label': 'Transport',
    'trust.4.title': 'Nachhaltiger',
    'trust.4.label': 'Tourismus',
    'trust.5.title': 'Kleine Gruppen und',
    'trust.5.label': 'Private Touren',
    'destinations.eyebrow': 'Ausgewählte Reiseziele',
    'destinations.title': 'Ein Land von unmöglicher Vielfalt',
    'destinations.aside':
      'Von Hochlandkathedralen bis zu vulkanischen Tiefländern erzählt jede Region ein anderes Kapitel Äthiopiens.',
    'destinations.cta': 'Alle Reiseziele Entdecken',
    'destination.lalibela.tag': 'UNESCO-Welterbe',
    'destination.lalibela.region': 'Nördliches Hochland',
    'destination.lalibela.teaser':
      'Elf Kirchen, nach unten in lebenden Fels gehauen und bis heute von Gebet erfüllt.',
    'destination.addis-ababa.tag': 'Hauptstadt',
    'destination.addis-ababa.region': 'Zentraläthiopien',
    'destination.addis-ababa.teaser':
      'Museen, Märkte und modernes äthiopisches Leben am Tor des Landes.',
    'destination.simien-mountains.tag': 'Nationalpark',
    'destination.simien-mountains.region': 'Nördliches Hochland',
    'destination.simien-mountains.teaser':
      'Ein Dach Afrikas, wo Geladas über zweitausend Meter tiefen Abbrüchen grasen.',
    'destination.danakil-depression.tag': 'Expedition',
    'destination.danakil-depression.region': 'Afar-Tiefland',
    'destination.danakil-depression.teaser':
      'Der heißeste bewohnte Ort der Erde, gemalt aus Schwefel und Salz.',
    'destination.omo-valley.tag': 'Kulturelle Immersion',
    'destination.omo-valley.region': 'Südlicher Rift',
    'destination.omo-valley.teaser':
      'Ein lebendiges Mosaik von Gemeinschaften, die dieses Land seit Jahrtausenden prägen.',
    'journeys.eyebrow': 'Ausgewählte Touren',
    'journeys.title': 'Kuratierte Reisen, niemals Standardpakete',
    'journeys.lede':
      'Ein Ausgangspunkt für ein Gespräch. Jede Route wird nach Ihrem Tempo, Ihren Interessen und Ihrer Vorstellung angepasst.',
    'journeys.cta': 'Alle Touren Entdecken',
    'tour.the-historic-route.title': 'Klassischer Historischer Norden',
    'tour.the-historic-route.style': 'Kultur · Privat',
    'tour.the-historic-route.teaser':
      'Folgen Sie der Pilgerroute der Könige von den Burgen Gondars zu den Felsenkirchen Lalibelas.',
    'tour.omo-valley-immersion.title': 'Kulturelle Entdeckung im Omo-Tal',
    'tour.omo-valley-immersion.style': 'Kultur · Privat',
    'tour.omo-valley-immersion.teaser':
      'Markttage, Zeremonien und Gespräche in einem der kulturell dichtesten Täler der Erde.',
    'tour.danakil-expedition.title': 'Danakil-Depression und Erta Ale Expedition',
    'tour.danakil-expedition.style': 'Expedition · Kleine Gruppe',
    'tour.danakil-expedition.teaser':
      'Schwefelquellen, ein permanenter Lavasee und Salzkarawanen auf der weißen Ebene.',
    'tour.bale-mountains-and-sof-omar.title':
      'Bale Mountains und Sof Omar Abenteuer',
    'tour.bale-mountains-and-sof-omar.style': 'Abenteuer · Privat',
    'tour.bale-mountains-and-sof-omar.teaser':
      'Spüren Sie äthiopische Wölfe auf dem Sanetti-Plateau auf, steigen Sie in den Harenna-Wald hinab und gehen Sie durch die Kalksteinhallen von Sof Omar.',
    'tour.simien-mountains-trek.title': 'Simien Mountains Trek',
    'tour.simien-mountains-trek.style': 'Trekking · Privat',
    'tour.simien-mountains-trek.teaser':
      'Wandern Sie entlang des Escarpments zwischen Geladas, Wasserfällen und weitem Hochlandblick.',
    'tour.grand-ethiopia-highlights.title': 'Große Höhepunkte Äthiopiens',
    'tour.grand-ethiopia-highlights.style': 'Kultur · Privat',
    'tour.grand-ethiopia-highlights.teaser':
      'Der historische Norden, östliche Städte, südliche Kulturen und Hochlandwildnis in einer großen Reise.',
    'tour.view': 'Reiseplan Ansehen',
    'why.eyebrow': 'Warum Äthiopien',
    'why.title': 'Warum hier und nicht anderswo?',
    'why.p1':
      'Während der Rest des Kontinents Vertrautes bietet, bietet Äthiopien das Außergewöhnliche. Es ist die Wiege des Kaffees, Heimat alter christlicher Königreiche und eine Landschaft von wolkenverhangenen Gipfeln bis zum tiefsten und heißesten Ort der Erde.',
    'why.p2':
      'Reisende besuchen Äthiopien nicht einfach. Sie gehen mit einem veränderten Gefühl dafür, wie alt, vielfältig und gastfreundlich die Welt sein kann.',
    'why.fact.0': 'Jahre kontinuierlicher Zivilisation',
    'why.fact.1': 'UNESCO-Welterbestätten',
    'why.fact.2': 'lebendige Sprachen und Kulturen',
    'why.fact.3': 'Monate im äthiopischen Kalender',
    'experiences.eyebrow': 'Luxuserlebnisse',
    'experiences.title': 'Die Momente, die bleiben',
    'experience.private-coffee-journeys.title': 'Private Kaffeereisen',
    'experience.private-coffee-journeys.text':
      'Folgen Sie der Bohne vom wilden Wald bis zur Zeremonie, über Kohlen geröstet von Familien, die seit Generationen Gäste empfangen.',
    'experience.photography-expeditions.title': 'Fotografie-Expeditionen',
    'experience.photography-expeditions.text':
      'Jagen Sie goldenes Licht über Hochlandkanten und Salzflächen, geführt von Menschen, die den richtigen Moment genau kennen.',
    'experience.luxury-cultural-immersions.title':
      'Luxuriöse Kulturimmersionen',
    'experience.luxury-cultural-immersions.text':
      'Verbringen Sie einen Morgen mit Meisterhandwerkern, teilen Sie eine Mahlzeit und erleben Sie Traditionen, die seit Jahrhunderten weitergegeben werden.',
    'experience.signature-hospitality.title': 'Signature-Gastfreundschaft',
    'experience.signature-hospitality.text':
      'Ziehen Sie sich jeden Abend in Eco-Lodges am Rand der Welt zurück, wo Ruhe und Komfort auf Wildnis treffen.',
    discover: 'Entdecken',
    'layover.eyebrow': 'Addis Zwischenstopp-Touren',
    'layover.title': 'Machen Sie aus einer langen Verbindung eine Einführung',
    'layover.copy':
      'Teilen Sie beide Flüge und Ihre Passnationalität. Wir prüfen das nutzbare Zeitfenster und gestalten einen privaten Addis-Besuch rund um Einreise, Verkehr und gesicherte Rückkehr zum Flughafen.',
    'layover.cta': 'Zwischenstopp-Touren Entdecken',
    'layover.stopover': 'Stopover',
    'testimonial.eyebrow': 'In Ihren Worten',
    'testimonial.quote':
      '„Wir sind um die Welt gereist, doch nichts hat uns auf Äthiopien vorbereitet. Jedes Detail war bedacht, jeder Guide außergewöhnlich. Wir fühlten uns nicht wie Touristen, sondern wie Gäste eines alten Freundes.“',
    'testimonial.route': 'Die Historische Route · Vereinigtes Königreich',
    'gallery.eyebrow': 'Die Ausstellung',
    'gallery.title': 'Äthiopien, langsam gesehen',
    'gallery.copy':
      'Eine Galerie stiller Momente unserer Reisen: Licht, Textur und der menschliche Maßstab eines alten Landes.',
    'gallery.index': 'Ausstellung',
    'gallery.captured': 'Festgehaltene Momente',
    'plan.eyebrow': 'Reise Planen',
    'plan.title': 'Lassen Sie uns Ihre Äthiopienreise gestalten',
    'plan.copy':
      'Jede Route beginnt mit einem Gespräch. Keine Vorlagen, keine Kompromisse: nur eine Reise, die vollständig um Sie herum gestaltet wird. Ein Reisedesigner antwortet innerhalb von 24 Stunden.',
    'plan.point.0': 'Lokal gestaltet, privat geführt',
    'plan.point.1': 'Transparente Preise nach Maß',
    'plan.point.2': '24/7 Concierge vor, während und nach der Reise',
    'footer.copy':
      'Wir stellen Reisenden eine der ältesten Zivilisationen der Menschheit vor: mit Sorgfalt, Wissen und leiser Eleganz.',
    'footer.destinations': 'Reiseziele',
    'footer.tours': 'Touren',
    'footer.explore': 'Entdecken',
    'footer.custom': 'Individuelle Reiserouten',
    'footer.about': 'Über Uns',
    'footer.layover': 'Zwischenstopp in Addis',
    'footer.journal': 'Reisejournal',
    'footer.responsible': 'Verantwortlicher Tourismus',
    'footer.when': 'Beste Reisezeit',
    'footer.contact': 'Kontakt',
    'footer.platforms': 'Vertrauenswürdige Reiseplattformen',
    'footer.platformsCopy': 'Finden Sie uns dort, wo anspruchsvolle Reisende planen.',
    'footer.accept': 'Wir Akzeptieren',
    'footer.acceptCopy': 'Sichere Zahlungsabwicklung.',
    'footer.newsletter':
      'Abonnieren Sie unseren Newsletter für kuratierte Reisegeschichten',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'newsletter.email': 'E-Mail-Adresse',
    'newsletter.placeholder': 'Ihre E-Mail',
    'newsletter.button': 'Abonnieren',
    'newsletter.done': 'Danke; der nächste Brief findet Sie.',
    'form.successTitle': 'Ihre Reise beginnt hier',
    'form.successCopy':
      'Ein Reisedesigner prüft bereits Ihre Vorstellung und beginnt mit einer personalisierten Route. Wir melden uns innerhalb von 24 Stunden.',
    'form.enquiryAbout': 'Anfrage zu',
    'form.fullName': 'Vollständiger Name',
    'form.yourName': 'Ihr Name',
    'form.email': 'E-Mail-Adresse',
    'form.dates': 'Gewünschte Reisedaten',
    'form.datesPlaceholder': 'z. B. März 2026',
    'form.travellers': 'Anzahl der Reisenden',
    'form.travellersPlaceholder': '2 Erwachsene',
    'form.kind': 'Welche Art von Reise stellen Sie sich vor?',
    'form.dream': 'Erzählen Sie uns von Ihrer Reiseidee',
    'form.dreamPlaceholder':
      'Eine private Kaffeereise, Morgen über den Wolken, Abende am Feuer...',
    'form.submit': 'Gespräch Beginnen',
    'form.note':
      'Wir antworten persönlich innerhalb von 24 Stunden. Ihre Daten werden nie weitergegeben.',
    'form.error': 'Etwas ist schiefgelaufen; bitte versuchen Sie es erneut.',
    'chat.whatsapp': 'Auf WhatsApp schreiben',
    'chat.ai': 'KI-Reiseassistent',
    'chat.title': 'EthioAfro KI-Guide',
    'chat.status': 'Expertensupport · Online',
    'chat.welcome':
      'Selam! Ich bin Ihr EthioAfro KI-Assistent. Wie kann ich Ihnen heute helfen, Ihre private Reise durch die Seele Äthiopiens zu gestalten?',
    'chat.placeholder': 'Stellen Sie eine Frage zu Äthiopien...',
    'chat.send': 'Nachricht senden',
  },
  ZH: {
    'skip.content': '跳到内容',
    'nav.rail': '亚的斯亚贝巴本地经营 · 2008 年起提供私人旅程',
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.destinations': '目的地',
    'nav.tours': '行程',
    'nav.layover': '中转',
    'nav.journal': '日志',
    'nav.request': '定制旅程',
    'nav.language': '语言',
    'nav.changeLanguage': '切换语言',
    'nav.closeMenu': '关闭菜单',
    'nav.openMenu': '打开菜单',
    'nav.destinations.eyebrow': '埃塞俄比亚',
    'nav.destinations.title': '我们的目的地',
    'nav.destinations.text':
      '从整块岩石中开凿出的教堂，到世界边缘般的地质景观，探索文明古国的源头。',
    'nav.destinations.cta': '查看所有目的地',
    'nav.tours.eyebrow': '精选旅程',
    'nav.tours.title': '招牌行程',
    'nav.tours.text':
      '由专家设计的私人探险，结合奢华住宿、专业向导与独家文化体验。',
    'nav.tours.cta': '探索所有行程',
    from: '起价',
    'hero.alt': '埃塞俄比亚拉利贝拉的圣乔治岩石教堂 Bet Giyorgis',
    'hero.title': '发现埃塞俄比亚的灵魂',
    'hero.copy':
      '穿越古老文明、壮丽地貌与鲜活传统，体验围绕您定制的私人旅程。',
    'hero.primary': '定制我的旅程',
    'hero.secondary': '探索埃塞俄比亚',
    'brand.eyebrow': '我们的理念',
    'brand.title': '每一次旅程都始于一个故事',
    'brand.p1':
      '数千年来，埃塞俄比亚迎接过探险者、商人、朝圣者、艺术家与梦想家。这里有岩石教堂、高原王国，也是咖啡的故乡。',
    'brand.p2':
      'EthioAfro 以细致、知识与真实感为您呈现这份遗产。我们提供的不是套餐，而是围绕您本人设计的旅行体验。',
    'brand.principle.0.bold': '我们先倾听',
    'brand.principle.0.rest': '再提出建议',
    'brand.principle.1.bold': '我们设计',
    'brand.principle.1.rest': '旅程，而不是套餐',
    'brand.principle.2.bold': '我们始终在场',
    'brand.principle.2.rest': '从出发前到归来后',
    'trust.0.title': '16+ 年',
    'trust.0.label': '经验',
    'trust.1.title': '奢华定制',
    'trust.1.label': '行程',
    'trust.2.title': '真实本地',
    'trust.2.label': '体验',
    'trust.3.title': '舒适',
    'trust.3.label': '交通',
    'trust.4.title': '可持续',
    'trust.4.label': '旅游',
    'trust.5.title': '小团与',
    'trust.5.label': '私人旅行',
    'destinations.eyebrow': '精选目的地',
    'destinations.title': '一个拥有惊人多样性的国度',
    'destinations.aside':
      '从高原教堂到火山低地，每个地区都揭开埃塞俄比亚故事的不同篇章。',
    'destinations.cta': '探索所有目的地',
    'destination.lalibela.tag': '联合国教科文组织遗产',
    'destination.lalibela.region': '北部高原',
    'destination.lalibela.teaser':
      '十一座向下开凿于活岩中的教堂，至今仍回响着祈祷。',
    'destination.addis-ababa.tag': '首都城市',
    'destination.addis-ababa.region': '埃塞俄比亚中部',
    'destination.addis-ababa.teaser':
      '博物馆、市场与现代埃塞俄比亚生活，是进入这个国家的门户。',
    'destination.simien-mountains.tag': '国家公园',
    'destination.simien-mountains.region': '北部高原',
    'destination.simien-mountains.teaser':
      '非洲屋脊，狮尾狒狒在两千米落差之上觅食。',
    'destination.danakil-depression.tag': '探险',
    'destination.danakil-depression.region': '阿法尔低地',
    'destination.danakil-depression.teaser':
      '地球上最炎热的有人居住之地，被硫磺与盐染成奇异色彩。',
    'destination.omo-valley.tag': '文化沉浸',
    'destination.omo-valley.region': '南部裂谷',
    'destination.omo-valley.teaser':
      '由多个世代塑造土地的社区组成的鲜活马赛克。',
    'journeys.eyebrow': '精选行程',
    'journeys.title': '精心策划的旅程，不是固定套餐',
    'journeys.lede':
      '这是一次对话的起点。每条路线都会按照您的节奏、兴趣和想象重新设计。',
    'journeys.cta': '探索所有行程',
    'tour.the-historic-route.title': '经典北部历史之旅',
    'tour.the-historic-route.style': '文化 · 私人',
    'tour.the-historic-route.teaser':
      '从贡德尔城堡到拉利贝拉岩石教堂，追随昔日王者的朝圣路线。',
    'tour.omo-valley-immersion.title': '奥莫河谷文化发现',
    'tour.omo-valley-immersion.style': '文化 · 私人',
    'tour.omo-valley-immersion.teaser':
      '在世界上文化密度最高的河谷之一，体验集市日、仪式与真实交流。',
    'tour.danakil-expedition.title': '达纳基尔与 Erta Ale 探险',
    'tour.danakil-expedition.style': '探险 · 小团',
    'tour.danakil-expedition.teaser':
      '硫磺泉、永久熔岩湖，以及穿越白色盐原的盐队。',
    'tour.bale-mountains-and-sof-omar.title': '巴莱山与 Sof Omar 探险',
    'tour.bale-mountains-and-sof-omar.style': '冒险 · 私人',
    'tour.bale-mountains-and-sof-omar.teaser':
      '在 Sanetti 高原寻找埃塞俄比亚狼，深入 Harenna 森林，并走进 Sof Omar 石灰岩洞厅。',
    'tour.simien-mountains-trek.title': 'Simien 山脉徒步',
    'tour.simien-mountains-trek.style': '徒步 · 私人',
    'tour.simien-mountains-trek.teaser':
      '沿着断崖行走，在狮尾狒狒、瀑布与辽阔高原景观之间前行。',
    'tour.grand-ethiopia-highlights.title': '埃塞俄比亚全景精华',
    'tour.grand-ethiopia-highlights.style': '文化 · 私人',
    'tour.grand-ethiopia-highlights.teaser':
      '一次旅程串联历史北部、东部城市、南方文化与高原野生自然。',
    'tour.view': '查看行程',
    'why.eyebrow': '为何选择埃塞俄比亚',
    'why.title': '为什么是这里，而不是别处？',
    'why.p1':
      '当非洲其他地方呈现熟悉景象时，埃塞俄比亚呈现的是非凡。这里是咖啡的诞生地、古老基督教王国的家园，地貌从云雾缭绕的山峰延伸到地球上最低且最炎热的地区。',
    'why.p2':
      '旅行者不只是到访埃塞俄比亚。他们会带着对世界之古老、多样与温暖的新理解离开。',
    'why.fact.0': '连续文明历史',
    'why.fact.1': '处联合国教科文组织世界遗产',
    'why.fact.2': '种仍在使用的语言与文化',
    'why.fact.3': '个月的埃塞俄比亚历法',
    'experiences.eyebrow': '奢华体验',
    'experiences.title': '留下长久记忆的瞬间',
    'experience.private-coffee-journeys.title': '私人咖啡之旅',
    'experience.private-coffee-journeys.text':
      '从野生森林到咖啡仪式，追随咖啡豆的旅程，由世代待客的家庭在炭火上烘焙。',
    'experience.photography-expeditions.title': '摄影探险',
    'experience.photography-expeditions.text':
      '在高原断崖与盐滩追逐金色光线，由真正了解瞬间会在哪里出现的人带领。',
    'experience.luxury-cultural-immersions.title': '奢华文化沉浸',
    'experience.luxury-cultural-immersions.text':
      '与大师级工匠共度清晨，分享一餐，见证跨越数百年的手艺传统。',
    'experience.signature-hospitality.title': '精选款待',
    'experience.signature-hospitality.text':
      '每晚回到位于世界边缘的生态旅舍，在宁静与舒适中靠近荒野。',
    discover: '发现',
    'layover.eyebrow': '亚的斯中转游',
    'layover.title': '把漫长转机变成一次初识',
    'layover.copy':
      '请提供两段航班和护照国籍。我们会核算可用时间，并围绕入境、交通和安全返场安排私人亚的斯游览。',
    'layover.cta': '探索中转游',
    'layover.stopover': '停留',
    'testimonial.eyebrow': '客人心声',
    'testimonial.quote':
      '“我们走过世界很多地方，但没有什么能让我们预先理解埃塞俄比亚。每个细节都被考虑到，每位向导都出色。我们不像游客，更像老朋友的客人。”',
    'testimonial.route': '历史路线 · 英国',
    'gallery.eyebrow': '影像展',
    'gallery.title': '慢慢观看埃塞俄比亚',
    'gallery.copy':
      '一组旅途中捕捉的安静瞬间：光线、质地，以及这片古老土地里人的尺度。',
    'gallery.index': '影像',
    'gallery.captured': '定格瞬间',
    'plan.eyebrow': '规划旅程',
    'plan.title': '让我们设计您的埃塞俄比亚旅程',
    'plan.copy':
      '每一条路线都从一次对话开始。没有模板，没有妥协，只有完全围绕您设计的旅程。旅行设计师会在 24 小时内回复。',
    'plan.point.0': '本地设计，私人向导',
    'plan.point.1': '透明、定制化报价',
    'plan.point.2': '出行前、中、后 24/7 礼宾支持',
    'footer.copy':
      '以细致、知识与低调奢华，带旅行者认识人类最古老文明之一。',
    'footer.destinations': '目的地',
    'footer.tours': '行程',
    'footer.explore': '探索',
    'footer.custom': '定制行程',
    'footer.about': '关于我们',
    'footer.layover': '亚的斯中转',
    'footer.journal': '旅行日志',
    'footer.responsible': '负责任旅游',
    'footer.when': '何时前往',
    'footer.contact': '联系我们',
    'footer.platforms': '可信旅行平台',
    'footer.platformsCopy': '在高端旅行者规划行程的平台找到我们。',
    'footer.accept': '支付方式',
    'footer.acceptCopy': '安全支付处理方式。',
    'footer.newsletter': '订阅我们的通讯，获取精选旅行故事',
    'footer.rights': '版权所有。',
    'footer.privacy': '隐私',
    'footer.terms': '条款',
    'newsletter.email': '电子邮箱',
    'newsletter.placeholder': '您的邮箱',
    'newsletter.button': '订阅',
    'newsletter.done': '谢谢；下一封信会抵达您身边。',
    'form.successTitle': '您的旅程从这里开始',
    'form.successCopy':
      '旅行设计师已经在阅读您的想法，并将开始定制个性化行程。我们会在 24 小时内联系您。',
    'form.enquiryAbout': '咨询内容',
    'form.fullName': '全名',
    'form.yourName': '您的姓名',
    'form.email': '电子邮箱',
    'form.dates': '期望旅行日期',
    'form.datesPlaceholder': '例如 2026 年 3 月',
    'form.travellers': '旅行人数',
    'form.travellersPlaceholder': '2 位成人',
    'form.kind': '您想象中的旅程是什么类型？',
    'form.dream': '告诉我们您想象中的旅程',
    'form.dreamPlaceholder': '私人咖啡之旅、云海之上的清晨、火炉旁的夜晚...',
    'form.submit': '开始沟通',
    'form.note': '我们会在 24 小时内亲自回复。您的信息绝不会被分享。',
    'form.error': '出现错误；请重试。',
    'chat.whatsapp': 'WhatsApp 咨询',
    'chat.ai': 'AI 旅行助手',
    'chat.title': 'EthioAfro AI 向导',
    'chat.status': '专家支持 · 在线',
    'chat.welcome':
      'Selam！我是您的 EthioAfro AI 助手。今天我可以如何帮助您定制穿越埃塞俄比亚灵魂的私人旅程？',
    'chat.placeholder': '询问关于埃塞俄比亚的问题...',
    'chat.send': '发送消息',
  },
}

Object.assign(dictionaries.ES, {
  'about.hero.eyebrow': 'Sobre Ethio Afro Tours',
  'about.hero.title':
    'Viajes privados por Etiopía, diseñados con experiencia local',
  'about.hero.lede':
    'Un operador turístico con licencia, basado en Addis Abeba, que crea viajes privados, personalizados y profundamente auténticos por toda Etiopía.',
  'about.hero.imageAlt':
    'Las iglesias excavadas en la roca de Lalibela bajo una cálida luz de tarde',
  'about.meta.experience': 'Experiencia',
  'about.meta.experienceValue': '15+ Años',
  'about.meta.base': 'Base',
  'about.meta.memberships': 'Membresías',
  'about.meta.style': 'Estilo',
  'about.meta.styleValue': 'Lujo Privado',
  'about.who.eyebrow': 'Quiénes Somos',
  'about.who.title':
    'Etiopía, diseñada con autoridad local y precisión discreta',
  'about.who.p1':
    'Ethio Afro Tours es un operador turístico de lujo y empresa de gestión de destinos con licencia completa, con sede en Addis Abeba, Etiopía. Con más de 15 años de experiencia, creamos viajes privados, personalizados y auténticos por todo el país.',
  'about.who.p2':
    'La empresa está oficialmente autorizada en Etiopía y es miembro de la Ethiopian Tour Operators Association y de Tourism Ethiopia.',
  'about.who.p3':
    'Desde las antiguas iglesias excavadas en la roca de Lalibela y las impresionantes montañas Simien hasta las diversas culturas del Valle del Omo y los paisajes extraordinarios de la Depresión de Danakil, ayudamos a los viajeros a vivir lo mejor de Etiopía.',
  'about.who.p4':
    'Cada tour se diseña cuidadosamente según los intereses, horarios, comodidad, estilo de viaje y presupuesto de nuestros huéspedes.',
  'about.destination.1': 'Montañas Simien',
  'about.destination.2': 'Valle del Omo',
  'about.destination.3': 'Depresión de Danakil',
  'about.who.imageAlt':
    'Un viajero contemplando las tierras altas de Etiopía',
  'about.who.cardEyebrow': 'Oficialmente Autorizados',
  'about.who.cardTitle':
    'Con licencia en Etiopía y conectados con las principales organizaciones turísticas del país',
  'about.credentials.eyebrow': 'Credenciales',
  'about.credentials.title':
    'Con licencia, locales y conectados profesionalmente',
  'about.credentials.aside':
    'Nuestra operación está arraigada en Etiopía, con las autorizaciones, membresías y relaciones locales necesarias para coordinar viajes privados complejos con confianza.',
  'about.credential.0': 'Operador turístico de lujo con licencia completa',
  'about.credential.1':
    'Empresa de gestión de destinos con sede en Addis Abeba',
  'about.credential.2': 'Autorizado por el Ministerio de Comercio de Etiopía',
  'about.credential.3':
    'Miembro de la Ethiopian Tour Operators Association',
  'about.credential.4': 'Miembro de Tourism Ethiopia',
  'about.vision.eyebrow': 'Nuestra Visión',
  'about.vision.title':
    'Ser uno de los operadores turísticos de lujo más confiables de Etiopía.',
  'about.vision.text':
    'Reconocidos por un servicio excepcional, experiencias auténticas, turismo responsable y conexiones significativas con las comunidades locales.',
  'about.mission.eyebrow': 'Nuestra Misión',
  'about.mission.title':
    'Ofrecer tours seguros, profesionales, personalizados y de alta calidad.',
  'about.mission.text':
    'Apoyamos a las comunidades locales y protegemos el patrimonio cultural y natural de Etiopía mientras creamos viajes personales, refinados y honestos.',
  'about.travel.eyebrow': 'Cómo Viajamos',
  'about.travel.title':
    'Viajes diseñados según la forma en que desea vivir Etiopía',
  'about.travel.aside':
    'Organizamos vacaciones de lujo, viajes culturales e históricos, aventuras de vida silvestre, expediciones de trekking, tours fotográficos y vacaciones familiares.',
  'about.tripStyle.0': 'Vacaciones de lujo',
  'about.tripStyle.1': 'Viajes culturales e históricos',
  'about.tripStyle.2': 'Aventuras de vida silvestre',
  'about.tripStyle.3': 'Expediciones de trekking',
  'about.tripStyle.4': 'Tours fotográficos',
  'about.tripStyle.5': 'Vacaciones familiares',
  'about.why.eyebrow': '¿Por Qué Viajar Con Ethio Afro Tours?',
  'about.why.title': 'El lujo está en los detalles que no debe perseguir',
  'about.why.item.0.title': 'Más de 15 años de experiencia',
  'about.why.item.0.text':
    'Nuestro amplio conocimiento local nos permite planificar cada viaje profesionalmente y cuidar cada detalle importante.',
  'about.why.item.1.title': 'Tours privados y de lujo',
  'about.why.item.1.text':
    'Ofrecemos alojamientos cuidadosamente seleccionados, transporte cómodo, guías experimentados, horarios flexibles, privacidad y atención personal.',
  'about.why.item.2.title': 'Itinerarios personalizados',
  'about.why.item.2.text':
    'Cada viaje se diseña según sus intereses, tiempo disponible, ritmo preferido, estilo de alojamiento y presupuesto.',
  'about.why.item.3.title': 'Experiencias etíopes auténticas',
  'about.why.item.3.text':
    'Nuestros tours le presentan la historia antigua de Etiopía, sus diversas culturas, cocina tradicional, herencia cafetera, vida silvestre, paisajes dramáticos y cálida hospitalidad.',
  'about.why.item.4.title': 'Guías locales expertos',
  'about.why.item.4.text':
    'Nuestros guías locales ofrecen un servicio profesional, amable y responsable durante todo su viaje.',
  'about.why.item.5.title': 'Turismo responsable',
  'about.why.item.5.text':
    'Siempre que es posible, apoyamos a guías, conductores, alojamientos, restaurantes, artesanos y proveedores comunitarios locales.',
  'about.why.item.6.title': 'Soporte local confiable',
  'about.why.item.6.text':
    'Nuestro equipo en Addis Abeba coordina cuidadosamente su tour desde la llegada hasta la salida, para que explore Etiopía con comodidad y confianza.',
  'about.cta.imageAlt': 'Un lodge de lujo preparado para viajeros en Etiopía',
  'about.cta.eyebrow': 'Descubra Etiopía Con Nosotros',
  'about.cta.title':
    'Permita que nuestro equipo local cree un tour privado por Etiopía diseñado especialmente para usted.',
  'about.cta.text':
    'Desde la llegada hasta la salida, nuestro equipo basado en Addis Abeba coordina su ruta, guías, alojamientos, vehículos y ritmo para que explore Etiopía con comodidad y confianza.',
  'about.cta.primary': 'Planifique Su Tour Por Etiopía',
  'about.cta.secondary': 'Ver Tours Exclusivos',
})

Object.assign(dictionaries.FR, {
  'about.hero.eyebrow': 'À Propos d’Ethio Afro Tours',
  'about.hero.title':
    'Voyages privés en Éthiopie, façonnés par une expertise locale',
  'about.hero.lede':
    'Un opérateur touristique agréé basé à Addis-Abeba, créant des voyages privés, personnalisés et profondément authentiques à travers l’Éthiopie.',
  'about.hero.imageAlt':
    'Les églises rupestres de Lalibela dans une chaude lumière du soir',
  'about.meta.experience': 'Expérience',
  'about.meta.experienceValue': '15+ Ans',
  'about.meta.base': 'Base',
  'about.meta.memberships': 'Adhésions',
  'about.meta.style': 'Style',
  'about.meta.styleValue': 'Luxe Privé',
  'about.who.eyebrow': 'Qui Nous Sommes',
  'about.who.title':
    'L’Éthiopie, conçue avec autorité locale et précision discrète',
  'about.who.p1':
    'Ethio Afro Tours est un opérateur de voyages de luxe et une société de gestion de destination entièrement agréés, basés à Addis-Abeba, en Éthiopie. Avec plus de 15 ans d’expérience, nous créons des voyages privés, personnalisés et authentiques dans tout le pays.',
  'about.who.p2':
    'La société est officiellement autorisée en Éthiopie et membre de l’Ethiopian Tour Operators Association et de Tourism Ethiopia.',
  'about.who.p3':
    'Des anciennes églises rupestres de Lalibela aux montagnes spectaculaires du Simien, des cultures diverses de la vallée de l’Omo aux paysages extraordinaires de la dépression du Danakil, nous aidons les voyageurs à vivre le meilleur de l’Éthiopie.',
  'about.who.p4':
    'Chaque circuit est soigneusement conçu autour des intérêts, du calendrier, du confort, du style de voyage et du budget de nos hôtes.',
  'about.destination.1': 'Montagnes du Simien',
  'about.destination.2': 'Vallée de l’Omo',
  'about.destination.3': 'Dépression du Danakil',
  'about.who.imageAlt':
    'Un voyageur contemplant les hautes terres éthiopiennes',
  'about.who.cardEyebrow': 'Officiellement Autorisé',
  'about.who.cardTitle':
    'Agréé en Éthiopie et relié aux principales organisations touristiques du pays',
  'about.credentials.eyebrow': 'Références',
  'about.credentials.title':
    'Agréé, local et professionnellement connecté',
  'about.credentials.aside':
    'Notre opération est enracinée en Éthiopie, avec les autorisations, adhésions et relations locales nécessaires pour coordonner des voyages privés complexes en toute confiance.',
  'about.credential.0': 'Opérateur de voyages de luxe entièrement agréé',
  'about.credential.1':
    'Société de gestion de destination basée à Addis-Abeba',
  'about.credential.2': 'Autorisé par le ministère du Commerce d’Éthiopie',
  'about.credential.3':
    'Membre de l’Ethiopian Tour Operators Association',
  'about.credential.4': 'Membre de Tourism Ethiopia',
  'about.vision.eyebrow': 'Notre Vision',
  'about.vision.title':
    'Être l’un des opérateurs de voyages de luxe les plus fiables d’Éthiopie.',
  'about.vision.text':
    'Reconnu pour un service exceptionnel, des expériences authentiques, un tourisme responsable et des liens significatifs avec les communautés locales.',
  'about.mission.eyebrow': 'Notre Mission',
  'about.mission.title':
    'Proposer des circuits sûrs, professionnels, personnalisés et de haute qualité.',
  'about.mission.text':
    'Nous soutenons les communautés locales et protégeons le patrimoine culturel et naturel de l’Éthiopie tout en créant des voyages personnels, raffinés et honnêtes.',
  'about.travel.eyebrow': 'Notre Façon de Voyager',
  'about.travel.title':
    'Des voyages façonnés selon votre manière de vivre l’Éthiopie',
  'about.travel.aside':
    'Nous organisons vacances de luxe, voyages culturels et historiques, aventures animalières, expéditions de trekking, circuits photographiques et séjours en famille.',
  'about.tripStyle.0': 'Vacances de luxe',
  'about.tripStyle.1': 'Voyages culturels et historiques',
  'about.tripStyle.2': 'Aventures animalières',
  'about.tripStyle.3': 'Expéditions de trekking',
  'about.tripStyle.4': 'Circuits photographiques',
  'about.tripStyle.5': 'Vacances en famille',
  'about.why.eyebrow': 'Pourquoi Voyager Avec Ethio Afro Tours ?',
  'about.why.title':
    'Le luxe se trouve dans les détails que vous n’avez jamais à chercher',
  'about.why.item.0.title': 'Plus de 15 ans d’expérience',
  'about.why.item.0.text':
    'Notre vaste connaissance locale nous permet de planifier chaque voyage avec professionnalisme et de gérer chaque détail important avec soin.',
  'about.why.item.1.title': 'Circuits privés et de luxe',
  'about.why.item.1.text':
    'Nous proposons des hébergements soigneusement sélectionnés, un transport confortable, des guides expérimentés, des horaires flexibles, de l’intimité et une attention personnelle.',
  'about.why.item.2.title': 'Itinéraires personnalisés',
  'about.why.item.2.text':
    'Chaque voyage est conçu autour de vos intérêts, de votre temps disponible, de votre rythme, de votre style d’hébergement et de votre budget.',
  'about.why.item.3.title': 'Expériences éthiopiennes authentiques',
  'about.why.item.3.text':
    'Nos circuits vous font découvrir l’histoire ancienne de l’Éthiopie, ses cultures diverses, sa cuisine traditionnelle, son héritage du café, sa faune, ses paysages spectaculaires et son hospitalité chaleureuse.',
  'about.why.item.4.title': 'Guides locaux experts',
  'about.why.item.4.text':
    'Nos guides locaux compétents offrent un service professionnel, amical et responsable tout au long de votre voyage.',
  'about.why.item.5.title': 'Tourisme responsable',
  'about.why.item.5.text':
    'Lorsque c’est possible, nous soutenons les guides, chauffeurs, hébergements, restaurants, artisans et prestataires communautaires locaux.',
  'about.why.item.6.title': 'Support local fiable',
  'about.why.item.6.text':
    'Notre équipe basée à Addis-Abeba coordonne soigneusement votre circuit de l’arrivée au départ, afin que vous exploriez l’Éthiopie avec confort et confiance.',
  'about.cta.imageAlt': 'Un lodge de luxe préparé pour des voyageurs en Éthiopie',
  'about.cta.eyebrow': 'Découvrez l’Éthiopie Avec Nous',
  'about.cta.title':
    'Laissez notre équipe locale créer un circuit privé en Éthiopie conçu spécialement pour vous.',
  'about.cta.text':
    'De l’arrivée au départ, notre équipe basée à Addis-Abeba coordonne votre route, vos guides, vos hébergements, vos véhicules et votre rythme afin que vous exploriez l’Éthiopie avec confort et confiance.',
  'about.cta.primary': 'Planifier Votre Circuit en Éthiopie',
  'about.cta.secondary': 'Voir les Circuits Signature',
})

Object.assign(dictionaries.DE, {
  'about.hero.eyebrow': 'Über Ethio Afro Tours',
  'about.hero.title':
    'Private Reisen durch Äthiopien, gestaltet mit lokaler Expertise',
  'about.hero.lede':
    'Ein lizenzierter Reiseveranstalter mit Sitz in Addis Abeba, der private, personalisierte und authentische Reisen durch ganz Äthiopien gestaltet.',
  'about.hero.imageAlt':
    'Die Felsenkirchen von Lalibela im warmen Abendlicht',
  'about.meta.experience': 'Erfahrung',
  'about.meta.experienceValue': '15+ Jahre',
  'about.meta.base': 'Standort',
  'about.meta.memberships': 'Mitgliedschaften',
  'about.meta.style': 'Stil',
  'about.meta.styleValue': 'Privater Luxus',
  'about.who.eyebrow': 'Wer Wir Sind',
  'about.who.title':
    'Äthiopien, gestaltet mit lokaler Autorität und ruhiger Präzision',
  'about.who.p1':
    'Ethio Afro Tours ist ein vollständig lizenzierter Luxusreiseveranstalter und eine Destination-Management-Company mit Sitz in Addis Abeba, Äthiopien. Mit mehr als 15 Jahren Erfahrung gestalten wir private, personalisierte und authentische Reisen im ganzen Land.',
  'about.who.p2':
    'Das Unternehmen ist in Äthiopien offiziell autorisiert und Mitglied der Ethiopian Tour Operators Association sowie von Tourism Ethiopia.',
  'about.who.p3':
    'Von den alten Felsenkirchen Lalibelas und den atemberaubenden Simien-Bergen bis zu den vielfältigen Kulturen des Omo-Tals und den außergewöhnlichen Landschaften der Danakil-Depression helfen wir Reisenden, das Beste Äthiopiens zu erleben.',
  'about.who.p4':
    'Jede Tour wird sorgfältig um die Interessen, den Zeitplan, den Komfort, den Reisestil und das Budget unserer Gäste herum gestaltet.',
  'about.destination.1': 'Simien-Berge',
  'about.destination.2': 'Omo-Tal',
  'about.destination.3': 'Danakil-Depression',
  'about.who.imageAlt':
    'Ein Reisender mit Blick auf das äthiopische Hochland',
  'about.who.cardEyebrow': 'Offiziell Autorisiert',
  'about.who.cardTitle':
    'In Äthiopien lizenziert und mit den führenden Tourismusorganisationen des Landes verbunden',
  'about.credentials.eyebrow': 'Referenzen',
  'about.credentials.title':
    'Lizenziert, lokal und professionell vernetzt',
  'about.credentials.aside':
    'Unsere Arbeit ist in Äthiopien verwurzelt, mit den Genehmigungen, Mitgliedschaften und lokalen Beziehungen, die nötig sind, um komplexe Privatreisen sicher zu koordinieren.',
  'about.credential.0': 'Vollständig lizenzierter Luxusreiseveranstalter',
  'about.credential.1':
    'Destination-Management-Company mit Sitz in Addis Abeba',
  'about.credential.2': 'Autorisiert durch das Handelsministerium Äthiopiens',
  'about.credential.3':
    'Mitglied der Ethiopian Tour Operators Association',
  'about.credential.4': 'Mitglied von Tourism Ethiopia',
  'about.vision.eyebrow': 'Unsere Vision',
  'about.vision.title':
    'Einer der vertrauenswürdigsten Luxusreiseveranstalter Äthiopiens zu sein.',
  'about.vision.text':
    'Anerkannt für außergewöhnlichen Service, authentische Erlebnisse, verantwortungsvollen Tourismus und bedeutungsvolle Verbindungen zu lokalen Gemeinschaften.',
  'about.mission.eyebrow': 'Unsere Mission',
  'about.mission.title':
    'Sichere, professionelle, personalisierte und hochwertige Touren anzubieten.',
  'about.mission.text':
    'Wir unterstützen lokale Gemeinschaften und schützen Äthiopiens kulturelles und natürliches Erbe, während wir Reisen schaffen, die persönlich, hochwertig und ehrlich wirken.',
  'about.travel.eyebrow': 'Wie Wir Reisen',
  'about.travel.title':
    'Reisen, gestaltet nach der Art, wie Sie Äthiopien erleben möchten',
  'about.travel.aside':
    'Wir arrangieren Luxusurlaube, Kultur- und Geschichtsreisen, Wildtierabenteuer, Trekking-Expeditionen, Fotoreisen und Familienurlaube.',
  'about.tripStyle.0': 'Luxusurlaube',
  'about.tripStyle.1': 'Kultur- und Geschichtsreisen',
  'about.tripStyle.2': 'Wildtierabenteuer',
  'about.tripStyle.3': 'Trekking-Expeditionen',
  'about.tripStyle.4': 'Fotoreisen',
  'about.tripStyle.5': 'Familienurlaube',
  'about.why.eyebrow': 'Warum Mit Ethio Afro Tours Reisen?',
  'about.why.title':
    'Luxus liegt in den Details, denen Sie nie hinterherlaufen müssen',
  'about.why.item.0.title': 'Mehr als 15 Jahre Erfahrung',
  'about.why.item.0.text':
    'Unsere umfassende lokale Kenntnis ermöglicht es uns, jede Reise professionell zu planen und jedes wichtige Detail sorgfältig zu steuern.',
  'about.why.item.1.title': 'Private und luxuriöse Touren',
  'about.why.item.1.text':
    'Wir bieten sorgfältig ausgewählte Unterkünfte, komfortablen Transport, erfahrene Guides, flexible Zeitpläne, Privatsphäre und persönliche Aufmerksamkeit.',
  'about.why.item.2.title': 'Personalisierte Reiserouten',
  'about.why.item.2.text':
    'Jede Reise wird um Ihre Interessen, verfügbare Zeit, Ihr bevorzugtes Tempo, Ihren Unterkunftsstil und Ihr Budget herum gestaltet.',
  'about.why.item.3.title': 'Authentische äthiopische Erlebnisse',
  'about.why.item.3.text':
    'Unsere Touren führen Sie zu Äthiopiens alter Geschichte, vielfältigen Kulturen, traditioneller Küche, Kaffeeerbe, Tierwelt, dramatischen Landschaften und warmer Gastfreundschaft.',
  'about.why.item.4.title': 'Erfahrene lokale Guides',
  'about.why.item.4.text':
    'Unsere sachkundigen lokalen Guides bieten während Ihrer gesamten Reise professionellen, freundlichen und verantwortungsvollen Service.',
  'about.why.item.5.title': 'Verantwortungsvoller Tourismus',
  'about.why.item.5.text':
    'Wo immer möglich unterstützen wir lokale Guides, Fahrer, Unterkünfte, Restaurants, Kunsthandwerker und gemeindebasierte Tourismusanbieter.',
  'about.why.item.6.title': 'Zuverlässige lokale Unterstützung',
  'about.why.item.6.text':
    'Unser Team in Addis Abeba koordiniert Ihre Tour sorgfältig von der Ankunft bis zur Abreise, damit Sie Äthiopien komfortabel und sicher erkunden können.',
  'about.cta.imageAlt': 'Eine Luxuslodge, vorbereitet für Reisende in Äthiopien',
  'about.cta.eyebrow': 'Entdecken Sie Äthiopien Mit Uns',
  'about.cta.title':
    'Lassen Sie unser lokales Team eine private Äthiopienreise speziell für Sie gestalten.',
  'about.cta.text':
    'Von der Ankunft bis zur Abreise koordiniert unser Team in Addis Abeba Ihre Route, Guides, Unterkünfte, Fahrzeuge und das Tempo, damit Sie Äthiopien komfortabel und sicher erleben.',
  'about.cta.primary': 'Äthiopienreise Planen',
  'about.cta.secondary': 'Signature-Touren Ansehen',
})

Object.assign(dictionaries.ZH, {
  'about.hero.eyebrow': '关于 Ethio Afro Tours',
  'about.hero.title': '以本地专业经验打造的埃塞俄比亚私人旅程',
  'about.hero.lede':
    '一家位于亚的斯亚贝巴、拥有完整许可的旅行社，为埃塞俄比亚全境打造私人、个性化且真实深入的旅程。',
  'about.hero.imageAlt': '傍晚暖光中的拉利贝拉岩石教堂',
  'about.meta.experience': '经验',
  'about.meta.experienceValue': '15+ 年',
  'about.meta.base': '基地',
  'about.meta.memberships': '会员资质',
  'about.meta.style': '风格',
  'about.meta.styleValue': '私人奢华',
  'about.who.eyebrow': '我们是谁',
  'about.who.title': '以本地权威与低调精准设计埃塞俄比亚',
  'about.who.p1':
    'Ethio Afro Tours 是一家位于埃塞俄比亚亚的斯亚贝巴、拥有完整许可的豪华旅行社和目的地管理公司。凭借超过 15 年经验，我们在全国范围内打造私人、个性化且真实的旅程。',
  'about.who.p2':
    '公司在埃塞俄比亚获得官方授权，并且是 Ethiopian Tour Operators Association 与 Tourism Ethiopia 的成员。',
  'about.who.p3':
    '从拉利贝拉古老的岩石教堂和壮丽的 Simien 山脉，到奥莫河谷多元文化与达纳基尔洼地非凡景观，我们帮助旅行者体验埃塞俄比亚最精彩的一面。',
  'about.who.p4':
    '每一次旅行都围绕客人的兴趣、时间、舒适度、旅行风格和预算精心设计。',
  'about.destination.1': 'Simien 山脉',
  'about.destination.2': '奥莫河谷',
  'about.destination.3': '达纳基尔洼地',
  'about.who.imageAlt': '俯瞰埃塞俄比亚高原的旅行者',
  'about.who.cardEyebrow': '官方授权',
  'about.who.cardTitle': '在埃塞俄比亚获得许可，并连接该国主要旅游组织',
  'about.credentials.eyebrow': '资质',
  'about.credentials.title': '拥有许可、本地运营、专业连接',
  'about.credentials.aside':
    '我们的运营扎根埃塞俄比亚，拥有协调复杂私人旅行所需的授权、会员资质与本地关系。',
  'about.credential.0': '拥有完整许可的豪华旅行社',
  'about.credential.1': '位于亚的斯亚贝巴的目的地管理公司',
  'about.credential.2': '由埃塞俄比亚贸易部授权',
  'about.credential.3': 'Ethiopian Tour Operators Association 成员',
  'about.credential.4': 'Tourism Ethiopia 成员',
  'about.vision.eyebrow': '我们的愿景',
  'about.vision.title': '成为埃塞俄比亚最值得信赖的豪华旅行社之一。',
  'about.vision.text':
    '以卓越服务、真实体验、负责任旅游以及与本地社区有意义的连接而被认可。',
  'about.mission.eyebrow': '我们的使命',
  'about.mission.title': '提供安全、专业、个性化且高品质的旅行服务。',
  'about.mission.text':
    '我们支持本地社区，保护埃塞俄比亚文化与自然遗产，同时打造个人化、精致且真诚的旅程。',
  'about.travel.eyebrow': '我们的旅行方式',
  'about.travel.title': '围绕您体验埃塞俄比亚的方式来设计旅程',
  'about.travel.aside':
    '我们安排豪华假期、文化与历史旅程、野生动物探险、徒步远征、摄影之旅和家庭假期。',
  'about.tripStyle.0': '豪华假期',
  'about.tripStyle.1': '文化与历史旅程',
  'about.tripStyle.2': '野生动物探险',
  'about.tripStyle.3': '徒步远征',
  'about.tripStyle.4': '摄影之旅',
  'about.tripStyle.5': '家庭假期',
  'about.why.eyebrow': '为什么选择 Ethio Afro Tours？',
  'about.why.title': '奢华体现在您不必追赶的每个细节里',
  'about.why.item.0.title': '超过 15 年经验',
  'about.why.item.0.text':
    '我们深厚的本地知识让我们能够专业规划每段旅程，并细致管理每个重要细节。',
  'about.why.item.1.title': '私人奢华旅行',
  'about.why.item.1.text':
    '我们提供精心挑选的住宿、舒适交通、经验丰富的向导、灵活日程、隐私与个人关注。',
  'about.why.item.2.title': '个性化行程',
  'about.why.item.2.text':
    '每段旅程都围绕您的兴趣、可用时间、偏好节奏、住宿风格与预算来设计。',
  'about.why.item.3.title': '真实的埃塞俄比亚体验',
  'about.why.item.3.text':
    '我们的旅程带您了解埃塞俄比亚古老历史、多元文化、传统美食、咖啡遗产、野生动物、壮丽景观与温暖待客之道。',
  'about.why.item.4.title': '本地专家向导',
  'about.why.item.4.text':
    '知识丰富的本地向导将在整个旅程中提供专业、友好且负责任的服务。',
  'about.why.item.5.title': '负责任旅游',
  'about.why.item.5.text':
    '只要可能，我们支持本地向导、司机、住宿、餐厅、手工艺人和社区旅游服务者。',
  'about.why.item.6.title': '可靠的本地支持',
  'about.why.item.6.text':
    '我们位于亚的斯亚贝巴的团队会从抵达到离境细致协调您的旅程，让您舒适、自信地探索埃塞俄比亚。',
  'about.cta.imageAlt': '为埃塞俄比亚旅行者准备的豪华旅舍',
  'about.cta.eyebrow': '与我们一起发现埃塞俄比亚',
  'about.cta.title': '让我们的本地团队为您专属设计一次埃塞俄比亚私人旅行。',
  'about.cta.text':
    '从抵达到离境，我们位于亚的斯亚贝巴的团队会协调路线、向导、住宿、车辆和节奏，让您舒适、自信地探索埃塞俄比亚。',
  'about.cta.primary': '规划您的埃塞俄比亚之旅',
  'about.cta.secondary': '查看精选行程',
})

const layoverPackageSlugs = [
  'addis-highlights-layover',
  'addis-culture-and-coffee',
  'full-day-addis-experience',
  'addis-evening-experience',
  'overnight-addis-and-highlands',
  'lalibela-stopover-extension',
]

const layoverCommon = {
  ES: {
    include: [
      'Recogida en el aeropuerto y traslado de regreso',
      'Vehículo privado y guía de habla inglesa',
      'Planificación del itinerario según horarios de vuelo confirmados',
    ],
    exclude: [
      'Visa etíope y seguro de viaje',
      'Compras personales, propinas y servicios no listados',
      'Comidas y entradas salvo que estén confirmadas en su cotización',
    ],
  },
  FR: {
    include: [
      'Accueil à l’aéroport et transfert retour',
      'Véhicule privé et guide anglophone',
      'Planification selon les horaires de vol confirmés',
    ],
    exclude: [
      'Visa éthiopien et assurance voyage',
      'Achats personnels, pourboires et services non listés',
      'Repas et droits d’entrée sauf mention dans le devis confirmé',
    ],
  },
  DE: {
    include: [
      'Abholung am Flughafen und Rücktransfer',
      'Privates Fahrzeug und englischsprachiger Guide',
      'Routenplanung anhand bestätigter Flugzeiten',
    ],
    exclude: [
      'Äthiopisches Visum und Reiseversicherung',
      'Persönliche Ausgaben, Trinkgelder und nicht aufgeführte Leistungen',
      'Mahlzeiten und Eintrittsgelder, sofern nicht im Angebot bestätigt',
    ],
  },
  ZH: {
    include: [
      '机场接送与返回机场 transfer',
      '私人车辆与英语向导',
      '根据已确认航班时间规划行程',
    ],
    exclude: [
      '埃塞俄比亚签证与旅行保险',
      '个人消费、小费及未列明服务',
      '餐食和门票，除非在确认报价中注明',
    ],
  },
} satisfies Record<Exclude<LanguageCode, 'EN'>, { include: string[]; exclude: string[] }>

for (const language of ['ES', 'FR', 'DE', 'ZH'] as const) {
  for (const slug of layoverPackageSlugs) {
    layoverCommon[language].include.forEach((value, index) => {
      dictionaries[language][`layover.package.${slug}.include.${index}`] = value
    })
    layoverCommon[language].exclude.forEach((value, index) => {
      dictionaries[language][`layover.package.${slug}.exclude.${index}`] = value
    })
  }
}

Object.assign(dictionaries.ES, {
  'yes': 'Sí',
  'no': 'No',
  'notSure': 'No estoy seguro',
  'cta.call': 'O llámenos directamente al',
  'layover.page.hero.eyebrow': 'Tours de Escala en Addis',
  'layover.page.hero.title': 'Una conexión larga no es una sala de espera',
  'layover.page.hero.lede':
    'Una conexión larga puede convertirse en una introducción privada a Etiopía, planificada según sus vuelos confirmados, requisitos de entrada y regreso protegido a Bole.',
  'layover.page.hero.imageAlt':
    'Aeropuerto Internacional Bole en Addis Abeba, Etiopía',
  'layover.meta.packages': 'Paquetes',
  'layover.meta.minimum': 'Mínimo',
  'layover.meta.pricing': 'Precio',
  'layover.meta.airport': 'Aeropuerto',
  'layover.price.custom': 'Cotización a medida',
  'layover.packages.eyebrow': 'Elija Su Ventana',
  'layover.packages.title': '5 escalas y una parada más larga',
  'layover.packages.aside':
    'Envíenos ambos números de vuelo y confirmaremos honestamente qué encaja después de inmigración, tráfico y el margen obligatorio de regreso al aeropuerto.',
  'layover.type.layover': 'Escala',
  'layover.type.stopover': 'Parada',
  'layover.card.minimum': 'Conexión mínima',
  'layover.card.length': 'Duración de la experiencia',
  'layover.card.day': 'El Día',
  'layover.card.included': 'Incluido',
  'layover.card.notIncluded': 'No incluido',
  'layover.card.bestFor': 'Ideal para:',
  'layover.card.choose': 'Elegir este paquete',
  'layover.package.addis-highlights-layover.title': 'Escala Highlights de Addis',
  'layover.package.addis-highlights-layover.price': 'Cotización a medida',
  'layover.package.addis-highlights-layover.hours': 'Aproximadamente 4 horas',
  'layover.package.addis-highlights-layover.teaser':
    'Una introducción cuidadosamente cronometrada a Addis Abeba con un mirador de altura, lugares emblemáticos y café etíope.',
  'layover.package.addis-highlights-layover.itinerary.0':
    'Encuentro después de inmigración y confirmación del horario de regreso',
  'layover.package.addis-highlights-layover.itinerary.1':
    'Subida a Entoto para una panorámica de la ciudad cuando las condiciones lo permitan',
  'layover.package.addis-highlights-layover.itinerary.2':
    'Ruta flexible por lugares clave del centro de Addis Abeba',
  'layover.package.addis-highlights-layover.itinerary.3':
    'Pausa para una experiencia de café etíope',
  'layover.package.addis-highlights-layover.itinerary.4':
    'Regreso a Bole con el margen acordado para el check-in internacional',
  'layover.package.addis-highlights-layover.best':
    'Quienes visitan por primera vez con una conexión diurna',
  'layover.package.addis-culture-and-coffee.title': 'Cultura y Café en Addis',
  'layover.package.addis-culture-and-coffee.price': 'Cotización a medida',
  'layover.package.addis-culture-and-coffee.hours': 'Aproximadamente 5–6 horas',
  'layover.package.addis-culture-and-coffee.teaser':
    'Una mirada más profunda a la capital a través de un museo o sitio cultural, tradiciones artesanales, almuerzo y café.',
  'layover.package.addis-culture-and-coffee.itinerary.0':
    'Encuentro en Bole y revisión de tráfico y horarios de apertura',
  'layover.package.addis-culture-and-coffee.itinerary.1':
    'Visita al Museo Nacional o la mejor alternativa cultural disponible',
  'layover.package.addis-culture-and-coffee.itinerary.2':
    'Exploración de un barrio artesanal, textil o histórico con su guía',
  'layover.package.addis-culture-and-coffee.itinerary.3':
    'Disfrute de una comida tradicional etíope',
  'layover.package.addis-culture-and-coffee.itinerary.4':
    'Final con café antes del regreso cronometrado al aeropuerto',
  'layover.package.addis-culture-and-coffee.best':
    'Viajeros que desean cultura, historia y gastronomía en una sola visita',
  'layover.package.full-day-addis-experience.title': 'Experiencia de Día Completo en Addis',
  'layover.package.full-day-addis-experience.price': 'Cotización a medida',
  'layover.package.full-day-addis-experience.hours': 'Aproximadamente 8–9 horas',
  'layover.package.full-day-addis-experience.teaser':
    'Un día completo flexible que combina miradores, patrimonio, barrios, cocina y cultura cafetera de Addis Abeba.',
  'layover.package.full-day-addis-experience.itinerary.0':
    'Bienvenida en el aeropuerto y revisión de ruta según las condiciones del día',
  'layover.package.full-day-addis-experience.itinerary.1':
    'Inicio en Entoto u otro mirador panorámico de la ciudad',
  'layover.package.full-day-addis-experience.itinerary.2':
    'Visita a museos, monumentos o lugares de culto seleccionados que estén abiertos',
  'layover.package.full-day-addis-experience.itinerary.3':
    'Exploración de un mercado o distrito artesanal con su guía privado',
  'layover.package.full-day-addis-experience.itinerary.4':
    'Tiempo para almuerzo y ceremonia de café etíope',
  'layover.package.full-day-addis-experience.itinerary.5':
    'Parada opcional en habitación diurna si se solicita y está disponible',
  'layover.package.full-day-addis-experience.itinerary.6':
    'Regreso a Bole con el margen de check-in acordado',
  'layover.package.full-day-addis-experience.exclude.3':
    'Habitación diurna salvo que esté incluida en la cotización confirmada',
  'layover.package.full-day-addis-experience.best':
    'Conexiones diurnas largas con espacio para una visita relajada por la ciudad',
  'layover.package.addis-evening-experience.title': 'Experiencia Nocturna en Addis',
  'layover.package.addis-evening-experience.price': 'Cotización a medida',
  'layover.package.addis-evening-experience.hours': 'Aproximadamente 4–5 horas',
  'layover.package.addis-evening-experience.teaser':
    'Una alternativa fuera de horario centrada en comida etíope, café, música y Addis Abeba de noche.',
  'layover.package.addis-evening-experience.itinerary.0':
    'Encuentro después de inmigración y confirmación del horario nocturno',
  'layover.package.addis-evening-experience.itinerary.1':
    'Breve recorrido iluminado por la ciudad o parada en un mirador',
  'layover.package.addis-evening-experience.itinerary.2':
    'Cena etíope seleccionada según sus preferencias',
  'layover.package.addis-evening-experience.itinerary.3':
    'Café y actuación cultural opcional cuando esté disponible',
  'layover.package.addis-evening-experience.itinerary.4':
    'Regreso a Bole con el margen de check-in acordado',
  'layover.package.addis-evening-experience.best':
    'Llegadas nocturnas cuando museos y atracciones diurnas están cerrados',
  'layover.package.overnight-addis-and-highlands.title': 'Noche en Addis y Tierras Altas',
  'layover.package.overnight-addis-and-highlands.price': 'Cotización a medida',
  'layover.package.overnight-addis-and-highlands.hours': 'Una noche',
  'layover.package.overnight-addis-and-highlands.teaser':
    'Descanse por la noche y explore Addis o haga una excursión de altura cuidadosamente cronometrada antes de regresar a Bole.',
  'layover.package.overnight-addis-and-highlands.itinerary.0':
    'Bienvenida en el aeropuerto y traslado privado al hotel',
  'layover.package.overnight-addis-and-highlands.itinerary.1':
    'Cena o descanso según su hora de llegada',
  'layover.package.overnight-addis-and-highlands.itinerary.2':
    'Elija una mañana en Addis o una excursión de altura tras revisar ruta y clima',
  'layover.package.overnight-addis-and-highlands.itinerary.3':
    'Almuerzo y última parada flexible',
  'layover.package.overnight-addis-and-highlands.itinerary.4':
    'Regreso a Bole con el margen acordado para la salida internacional',
  'layover.package.overnight-addis-and-highlands.exclude.3':
    'Alojamiento salvo que esté incluido en la cotización confirmada',
  'layover.package.overnight-addis-and-highlands.best':
    'Conexiones nocturnas que permiten hotel y un segundo día flexible',
  'layover.package.lalibela-stopover-extension.title': 'Extensión de Parada en Lalibela',
  'layover.package.lalibela-stopover-extension.price': 'Cotización a medida',
  'layover.package.lalibela-stopover-extension.hours': 'Dos noches',
  'layover.package.lalibela-stopover-extension.teaser':
    'Convierta una parada de varios días en una visita privada guiada a Lalibela, sujeta a horarios domésticos y margen seguro antes del vuelo siguiente.',
  'layover.package.lalibela-stopover-extension.itinerary.0':
    'Llegada a Addis y revisión del plan confirmado de vuelo doméstico',
  'layover.package.lalibela-stopover-extension.itinerary.1':
    'Vuelo a Lalibela y encuentro con su guía local',
  'layover.package.lalibela-stopover-extension.itinerary.2':
    'Exploración de los grupos de iglesias rupestres según horarios de apertura y servicios',
  'layover.package.lalibela-stopover-extension.itinerary.3':
    'Noche en Lalibela y continuación de la visita a la mañana siguiente',
  'layover.package.lalibela-stopover-extension.itinerary.4':
    'Vuelo de regreso a Addis con margen preacordado antes del viaje siguiente',
  'layover.package.lalibela-stopover-extension.exclude.3':
    'Vuelos domésticos y alojamiento salvo que estén incluidos en la cotización confirmada',
  'layover.package.lalibela-stopover-extension.best':
    'Paradas planificadas de al menos 60–72 horas con viaje posterior flexible',
  'layover.logistics.eyebrow': 'Logística Primero',
  'layover.logistics.title': 'En una escala, el tiempo es todo el producto',
  'layover.logistics.lede':
    'Los lugares son fáciles. No perder su vuelo siguiente es la parte que requiere experiencia.',
  'layover.assurance.0.title': 'Monitoreamos su vuelo de llegada',
  'layover.assurance.0.text':
    'Comparta su número de vuelo y seguiremos la llegada, luego ajustaremos la ruta al tiempo útil restante.',
  'layover.assurance.1.title': 'Orientación de visa antes de llegar',
  'layover.assurance.1.text':
    'Le ayudamos a revisar los requisitos oficiales actuales para su pasaporte. La aprobación de entrada y la visa correcta siguen siendo responsabilidad del viajero.',
  'layover.assurance.2.title': 'Margen protegido de regreso',
  'layover.assurance.2.text':
    'Acordamos la hora de regreso al aeropuerto antes de salir y acortamos la ruta si el tráfico, inmigración o vuelos lo requieren.',
  'layover.assurance.3.title': 'Equipaje caso por caso',
  'layover.assurance.3.text':
    'El equipaje facturado hasta destino depende de sus billetes y aerolíneas. Díganos su situación para planificar recogida, almacenamiento o espacio en vehículo.',
  'layover.enquiry.eyebrow': 'Reservar Una Escala',
  'layover.enquiry.title': 'Envíenos sus números de vuelo',
  'layover.enquiry.copy':
    'Envíe ambos vuelos y la nacionalidad de su pasaporte. Evaluaremos la ventana útil, explicaremos lo que falta confirmar y propondremos el paquete adecuado.',
  'layover.enquiry.point.0': 'Factibilidad revisada antes de confirmar cualquier reserva',
  'layover.enquiry.point.1': 'Una ruta privada diseñada alrededor de su conexión',
  'layover.enquiry.point.2': 'Inclusiones, exclusiones y hora de regreso claramente definidas',
  'layover.form.successTitle': 'Tenemos los detalles de su vuelo',
  'layover.form.successText':
    'Nuestro equipo en Addis revisará la conexión, consideraciones de visa y ventana operativa antes de recomendar el plan correcto.',
  'layover.form.whatsapp': 'Número de WhatsApp',
  'layover.form.whatsappPlaceholder': 'Código de país + número',
  'layover.form.nationality': 'Nacionalidad del pasaporte',
  'layover.form.nationalityPlaceholder': 'Nacionalidad en su pasaporte',
  'layover.form.package': 'Paquete preferido',
  'layover.form.selectPackage': 'Seleccione un paquete',
  'layover.form.travellersPlaceholder': '2 adultos, 1 niño',
  'layover.form.arrival': 'Llegada a Bole (ADD)',
  'layover.form.departure': 'Salida siguiente',
  'layover.form.date': 'Fecha',
  'layover.form.localTime': 'Hora local',
  'layover.form.flight': 'Número de vuelo',
  'layover.form.luggage': '¿Su equipaje está facturado hasta destino?',
  'layover.form.selectOne': 'Seleccione una opción',
  'layover.form.hotel': 'Hotel o habitación diurna',
  'layover.form.notNeeded': 'No necesario',
  'layover.form.dayRoom': 'Solicitar habitación diurna',
  'layover.form.overnightHotel': 'Solicitar hotel nocturno',
  'layover.form.requirements': 'Necesidades dietéticas, accesibilidad o movilidad',
  'layover.form.requirementsPlaceholder': 'Cuéntenos qué hará cómoda la visita',
  'layover.form.notes': '¿Algo más que debamos saber?',
  'layover.form.notesPlaceholder': 'Intereses, edades de niños, preferencias de hotel o preguntas',
  'layover.form.submit': 'Revisar mi conexión',
  'layover.form.note':
    'Enviar una consulta no confirma elegibilidad de visa ni reserva. Respondemos personalmente en 24 horas.',
  'layover.faq.eyebrow': 'Antes de Salir del Aeropuerto',
  'layover.faq.title': 'Preguntas de escala, respondidas claramente',
  'layover.faq.0.question': '¿Todo pasajero en tránsito puede salir del Aeropuerto Bole?',
  'layover.faq.0.answer':
    'No. Depende de la nacionalidad del pasaporte, visa, aprobación migratoria, equipaje y tiempo entre vuelos. Revisamos el itinerario, pero el viajero debe obtener el permiso correcto para entrar a Etiopía.',
  'layover.faq.1.question': '¿Qué pasa si el vuelo de llegada se retrasa?',
  'layover.faq.1.answer':
    'Monitoreamos el número de vuelo que proporciona y ajustamos, acortamos o cancelamos la visita cuando cambia la ventana segura. Su conexión siguiente siempre tiene prioridad.',
  'layover.faq.2.question': '¿Están incluidas comidas, entradas y hoteles?',
  'layover.faq.2.answer':
    'Su propuesta indicará exactamente qué está incluido. Las ideas de paquete son flexibles, y ninguna comida, entrada, habitación o vuelo doméstico está incluido salvo que figure en la cotización confirmada.',
  'layover.faq.3.question': '¿Puedo reservar una escala nocturna?',
  'layover.faq.3.answer':
    'Sí. La ruta nocturna se centra en comida, café, música y miradores disponibles porque museos y muchos sitios patrimoniales pueden estar cerrados.',
  'layover.faq.4.question': '¿Lalibela es adecuada para una conexión de 48 horas?',
  'layover.faq.4.answer':
    'Recomendamos al menos 60–72 horas y solo confirmamos la extensión después de revisar horarios domésticos y un margen seguro antes del vuelo internacional.',
  'layover.cta.title': '¿Tiene al menos 60–72 horas? Considere Lalibela.',
  'layover.cta.text':
    'Una parada más larga puede incluir las iglesias excavadas en la roca cuando los horarios domésticos y un margen seguro antes de su vuelo siguiente coinciden. Lo confirmamos solo después de revisar ambos.',
  'layover.cta.primary': 'Planear Una Parada',
  'layover.cta.secondary': 'Ver Tours',
})

type LayoverPackageTranslation = {
  title: string
  price: string
  hours: string
  teaser: string
  itinerary: string[]
  best: string
  extraExcludes?: Record<number, string>
}

function assignLayoverPackages(
  language: Exclude<LanguageCode, 'EN'>,
  packages: Record<string, LayoverPackageTranslation>,
) {
  for (const [slug, item] of Object.entries(packages)) {
    dictionaries[language][`layover.package.${slug}.title`] = item.title
    dictionaries[language][`layover.package.${slug}.price`] = item.price
    dictionaries[language][`layover.package.${slug}.hours`] = item.hours
    dictionaries[language][`layover.package.${slug}.teaser`] = item.teaser
    dictionaries[language][`layover.package.${slug}.best`] = item.best
    item.itinerary.forEach((step, index) => {
      dictionaries[language][`layover.package.${slug}.itinerary.${index}`] = step
    })
    for (const [index, value] of Object.entries(item.extraExcludes ?? {})) {
      dictionaries[language][`layover.package.${slug}.exclude.${index}`] = value
    }
  }
}

Object.assign(dictionaries.FR, {
  yes: 'Oui',
  no: 'Non',
  notSure: 'Pas sûr',
  'cta.call': 'Ou appelez-nous directement au',
  'layover.page.hero.eyebrow': 'Circuits d’Escale à Addis',
  'layover.page.hero.title': 'Une longue connexion n’est pas une salle d’attente',
  'layover.page.hero.lede':
    'Une longue connexion peut devenir une introduction privée à l’Éthiopie, planifiée autour de vos vols confirmés, des exigences d’entrée et d’un retour sécurisé à Bole.',
  'layover.page.hero.imageAlt':
    'Aéroport international de Bole à Addis-Abeba, Éthiopie',
  'layover.meta.packages': 'Forfaits',
  'layover.meta.minimum': 'Minimum',
  'layover.meta.pricing': 'Prix',
  'layover.meta.airport': 'Aéroport',
  'layover.price.custom': 'Devis sur mesure',
  'layover.packages.eyebrow': 'Choisissez Votre Fenêtre',
  'layover.packages.title': '5 escales et un stopover plus long',
  'layover.packages.aside':
    'Envoyez-nous les deux numéros de vol et nous confirmerons honnêtement ce qui convient après l’immigration, le trafic et la marge de retour obligatoire à l’aéroport.',
  'layover.type.layover': 'Escale',
  'layover.type.stopover': 'Stopover',
  'layover.card.minimum': 'Connexion minimale',
  'layover.card.length': 'Durée de l’expérience',
  'layover.card.day': 'La Journée',
  'layover.card.included': 'Inclus',
  'layover.card.notIncluded': 'Non Inclus',
  'layover.card.bestFor': 'Idéal pour :',
  'layover.card.choose': 'Choisir ce forfait',
  'layover.logistics.eyebrow': 'La Logistique D’Abord',
  'layover.logistics.title': 'En escale, le timing est tout le produit',
  'layover.logistics.lede':
    'Les sites sont faciles. Ne pas manquer votre prochain vol demande l’expérience.',
  'layover.assurance.0.title': 'Nous suivons votre vol entrant',
  'layover.assurance.0.text':
    'Partagez votre numéro de vol et nous surveillerons l’arrivée, puis adapterons l’itinéraire au temps utile restant.',
  'layover.assurance.1.title': 'Conseils visa avant l’arrivée',
  'layover.assurance.1.text':
    'Nous vous aidons à vérifier les exigences officielles actuelles pour votre passeport. L’autorisation d’entrée et le bon visa restent la responsabilité du voyageur.',
  'layover.assurance.2.title': 'Une marge de retour protégée',
  'layover.assurance.2.text':
    'Nous convenons de l’heure de retour à l’aéroport avant le départ et raccourcissons l’itinéraire si le trafic, l’immigration ou les horaires de vol l’exigent.',
  'layover.assurance.3.title': 'Bagages vérifiés au cas par cas',
  'layover.assurance.3.text':
    'L’enregistrement des bagages jusqu’à destination dépend de vos billets et compagnies. Indiquez-nous votre situation pour prévoir récupération, stockage ou espace véhicule.',
  'layover.enquiry.eyebrow': 'Réserver Une Escale',
  'layover.enquiry.title': 'Envoyez-nous vos numéros de vol',
  'layover.enquiry.copy':
    'Envoyez les deux vols et votre nationalité de passeport. Nous évaluerons le temps utile, expliquerons ce qui reste à confirmer et proposerons le bon forfait.',
  'layover.enquiry.point.0':
    'Faisabilité vérifiée avant confirmation de toute réservation',
  'layover.enquiry.point.1': 'Un itinéraire privé construit autour de votre connexion',
  'layover.enquiry.point.2':
    'Inclus, exclusions et heure de retour à l’aéroport clairement indiqués',
  'layover.form.successTitle': 'Nous avons vos détails de vol',
  'layover.form.successText':
    'Notre équipe d’Addis vérifiera la connexion, les considérations de visa et la fenêtre opérationnelle avant de recommander le bon plan.',
  'layover.form.whatsapp': 'Numéro WhatsApp',
  'layover.form.whatsappPlaceholder': 'Indicatif pays + numéro',
  'layover.form.nationality': 'Nationalité du passeport',
  'layover.form.nationalityPlaceholder': 'Nationalité indiquée sur votre passeport',
  'layover.form.package': 'Forfait souhaité',
  'layover.form.selectPackage': 'Sélectionnez un forfait',
  'layover.form.travellersPlaceholder': '2 adultes, 1 enfant',
  'layover.form.arrival': 'Arrivée à Bole (ADD)',
  'layover.form.departure': 'Départ suivant',
  'layover.form.date': 'Date',
  'layover.form.localTime': 'Heure locale',
  'layover.form.flight': 'Numéro de vol',
  'layover.form.luggage': 'Vos bagages sont-ils enregistrés jusqu’à destination ?',
  'layover.form.selectOne': 'Sélectionnez une option',
  'layover.form.hotel': 'Hôtel ou chambre de jour',
  'layover.form.notNeeded': 'Non nécessaire',
  'layover.form.dayRoom': 'Chambre de jour demandée',
  'layover.form.overnightHotel': 'Hôtel de nuit demandé',
  'layover.form.requirements': 'Besoins alimentaires, accessibilité ou mobilité',
  'layover.form.requirementsPlaceholder':
    'Dites-nous ce qui rendra la visite confortable',
  'layover.form.notes': 'Autre chose à savoir ?',
  'layover.form.notesPlaceholder':
    'Centres d’intérêt, âge des enfants, préférences d’hôtel ou questions',
  'layover.form.submit': 'Vérifier ma connexion',
  'layover.form.note':
    'Envoyer une demande ne confirme pas l’éligibilité au visa ni une réservation. Nous répondons personnellement sous 24 heures.',
  'layover.faq.eyebrow': 'Avant de Quitter l’Aéroport',
  'layover.faq.title': 'Questions d’escale, réponses claires',
  'layover.faq.0.question': 'Chaque passager en transit peut-il quitter l’aéroport de Bole ?',
  'layover.faq.0.answer':
    'Non. Cela dépend de la nationalité du passeport, du visa, de l’autorisation d’immigration, des bagages et du temps entre les vols. Nous vérifions l’itinéraire, mais les voyageurs doivent obtenir l’autorisation correcte pour entrer en Éthiopie.',
  'layover.faq.1.question': 'Que se passe-t-il si le vol entrant est retardé ?',
  'layover.faq.1.answer':
    'Nous suivons le numéro de vol fourni et ajustons, raccourcissons ou annulons la visite lorsque la fenêtre sûre change. Votre correspondance suivante passe toujours en priorité.',
  'layover.faq.2.question': 'Repas, entrées et hôtels sont-ils inclus ?',
  'layover.faq.2.answer':
    'Votre proposition indiquera exactement ce qui est inclus. Les forfaits sont flexibles, et aucun repas, entrée, chambre ou vol intérieur n’est inclus sauf s’il apparaît dans le devis confirmé.',
  'layover.faq.3.question': 'Puis-je réserver une escale en soirée ?',
  'layover.faq.3.answer':
    'Oui. L’itinéraire du soir privilégie cuisine, café, musique et points de vue disponibles, car les musées et beaucoup de sites patrimoniaux peuvent être fermés.',
  'layover.faq.4.question': 'Lalibela convient-elle à une connexion de 48 heures ?',
  'layover.faq.4.answer':
    'Nous recommandons au moins 60–72 heures et confirmons l’extension seulement après vérification des horaires intérieurs et d’une marge sûre avant le vol international.',
  'layover.cta.title': 'Vous avez au moins 60–72 heures ? Pensez à Lalibela.',
  'layover.cta.text':
    'Un stopover plus long peut inclure les églises rupestres lorsque les horaires intérieurs et une marge sûre avant votre prochain vol s’alignent. Nous ne le confirmons qu’après les avoir vérifiés.',
  'layover.cta.primary': 'Planifier un Stopover',
  'layover.cta.secondary': 'Voir les Circuits',
})

assignLayoverPackages('FR', {
  'addis-highlights-layover': {
    title: 'Escale Highlights d’Addis',
    price: 'Devis sur mesure',
    hours: 'Environ 4 heures',
    teaser:
      'Une introduction soigneusement chronométrée à Addis-Abeba avec point de vue d’altitude, repères urbains et café éthiopien.',
    itinerary: [
      'Accueil après l’immigration et confirmation de l’horaire de retour',
      'Montée à Entoto pour un panorama de la ville si les conditions le permettent',
      'Boucle flexible dans le centre d’Addis-Abeba',
      'Pause pour une expérience de café éthiopien',
      'Retour à Bole avec la marge de check-in international convenue',
    ],
    best: 'Premiers visiteurs avec une connexion de jour',
  },
  'addis-culture-and-coffee': {
    title: 'Culture et Café à Addis',
    price: 'Devis sur mesure',
    hours: 'Environ 5–6 heures',
    teaser:
      'Un regard plus profond sur la capitale à travers un musée ou site culturel, des traditions artisanales, un déjeuner et du café.',
    itinerary: [
      'Accueil à Bole et vérification du trafic et des horaires d’ouverture',
      'Visite du Musée national ou de la meilleure alternative culturelle disponible',
      'Découverte d’un quartier artisanal, textile ou historique avec votre guide',
      'Repas traditionnel éthiopien',
      'Fin autour d’un café avant le retour chronométré à l’aéroport',
    ],
    best: 'Voyageurs souhaitant culture, histoire et cuisine en une visite',
  },
  'full-day-addis-experience': {
    title: 'Expérience Addis Journée Complète',
    price: 'Devis sur mesure',
    hours: 'Environ 8–9 heures',
    teaser:
      'Une journée flexible mêlant points de vue, patrimoine, quartiers, cuisine et culture du café d’Addis-Abeba.',
    itinerary: [
      'Accueil à l’aéroport et vérification de l’itinéraire selon les conditions du jour',
      'Début à Entoto ou à un autre point de vue panoramique',
      'Visite de musées, monuments ou lieux de culte ouverts',
      'Découverte d’un marché ou quartier d’artisans avec votre guide privé',
      'Temps pour déjeuner et cérémonie du café éthiopien',
      'Arrêt optionnel en chambre de jour si demandé et disponible',
      'Retour à Bole avec la marge de check-in convenue',
    ],
    best: 'Longues connexions de jour permettant une visite détendue',
    extraExcludes: { 3: 'Chambre de jour sauf si incluse dans le devis confirmé' },
  },
  'addis-evening-experience': {
    title: 'Expérience Addis en Soirée',
    price: 'Devis sur mesure',
    hours: 'Environ 4–5 heures',
    teaser:
      'Une alternative après les heures d’ouverture autour de la cuisine éthiopienne, du café, de la musique et d’Addis-Abeba la nuit.',
    itinerary: [
      'Accueil après l’immigration et confirmation du programme du soir',
      'Court parcours illuminé ou arrêt à un point de vue',
      'Dîner éthiopien choisi selon vos préférences',
      'Café et performance culturelle optionnelle si disponible',
      'Retour à Bole avec la marge de check-in convenue',
    ],
    best: 'Arrivées du soir lorsque musées et attractions de jour sont fermés',
  },
  'overnight-addis-and-highlands': {
    title: 'Nuit à Addis et Hautes Terres',
    price: 'Devis sur mesure',
    hours: 'Une nuit',
    teaser:
      'Reposez-vous une nuit, puis explorez Addis ou faites une excursion d’altitude soigneusement chronométrée avant de revenir à Bole.',
    itinerary: [
      'Accueil à l’aéroport et transfert privé à l’hôtel',
      'Dîner ou repos selon votre heure d’arrivée',
      'Choix entre une matinée à Addis ou une excursion d’altitude après vérification route et météo',
      'Déjeuner et dernier arrêt flexible',
      'Retour à Bole avec la marge convenue avant le départ international',
    ],
    best: 'Connexions de nuit permettant un hôtel et une deuxième journée flexible',
    extraExcludes: { 3: 'Hébergement sauf s’il est inclus dans le devis confirmé' },
  },
  'lalibela-stopover-extension': {
    title: 'Extension Stopover à Lalibela',
    price: 'Devis sur mesure',
    hours: 'Deux nuits',
    teaser:
      'Transformez un stopover de plusieurs jours en visite privée guidée de Lalibela, selon les horaires intérieurs et une marge sûre avant le vol suivant.',
    itinerary: [
      'Arrivée à Addis et revue du plan de vol intérieur confirmé',
      'Vol vers Lalibela et rencontre avec votre guide local',
      'Exploration des groupes d’églises rupestres selon ouvertures et offices',
      'Nuit à Lalibela et poursuite de la visite le lendemain matin',
      'Retour en vol à Addis avec une marge convenue avant la suite du voyage',
    ],
    best: 'Stopovers planifiés d’au moins 60–72 heures avec suite flexible',
    extraExcludes: {
      3: 'Vols intérieurs et hébergement sauf s’ils sont inclus dans le devis confirmé',
    },
  },
})

Object.assign(dictionaries.DE, {
  yes: 'Ja',
  no: 'Nein',
  notSure: 'Nicht sicher',
  'cta.call': 'Oder rufen Sie uns direkt an unter',
  'layover.page.hero.eyebrow': 'Addis Zwischenstopp-Touren',
  'layover.page.hero.title': 'Eine lange Verbindung ist kein Wartezimmer',
  'layover.page.hero.lede':
    'Eine lange Verbindung kann zu einer privaten Einführung in Äthiopien werden, geplant rund um bestätigte Flüge, Einreiseanforderungen und eine geschützte Rückkehr nach Bole.',
  'layover.page.hero.imageAlt':
    'Bole International Airport in Addis Abeba, Äthiopien',
  'layover.meta.packages': 'Pakete',
  'layover.meta.minimum': 'Minimum',
  'layover.meta.pricing': 'Preis',
  'layover.meta.airport': 'Flughafen',
  'layover.price.custom': 'Individuelles Angebot',
  'layover.packages.eyebrow': 'Wählen Sie Ihr Zeitfenster',
  'layover.packages.title': '5 Zwischenstopps und ein längerer Stopover',
  'layover.packages.aside':
    'Senden Sie uns beide Flugnummern. Wir bestätigen ehrlich, was nach Einreise, Verkehr und nötigem Rückkehrpuffer zum Flughafen passt.',
  'layover.type.layover': 'Zwischenstopp',
  'layover.type.stopover': 'Stopover',
  'layover.card.minimum': 'Mindestverbindung',
  'layover.card.length': 'Dauer des Erlebnisses',
  'layover.card.day': 'Der Tag',
  'layover.card.included': 'Inklusive',
  'layover.card.notIncluded': 'Nicht inklusive',
  'layover.card.bestFor': 'Ideal für:',
  'layover.card.choose': 'Dieses Paket wählen',
  'layover.logistics.eyebrow': 'Logistik Zuerst',
  'layover.logistics.title': 'Bei einem Zwischenstopp ist Timing das ganze Produkt',
  'layover.logistics.lede':
    'Sehenswürdigkeiten sind einfach. Den Anschlussflug nicht zu verpassen, ist der Teil, der Erfahrung braucht.',
  'layover.assurance.0.title': 'Wir verfolgen Ihren eingehenden Flug',
  'layover.assurance.0.text':
    'Teilen Sie Ihre Flugnummer. Wir überwachen die Ankunft und passen die Route an die verbleibende nutzbare Zeit an.',
  'layover.assurance.1.title': 'Visa-Hinweise vor der Ankunft',
  'layover.assurance.1.text':
    'Wir helfen Ihnen, aktuelle offizielle Anforderungen für Ihren Pass zu prüfen. Einreisegenehmigung und korrektes Visum bleiben Verantwortung des Reisenden.',
  'layover.assurance.2.title': 'Ein geschützter Rückkehrpuffer',
  'layover.assurance.2.text':
    'Wir vereinbaren die Rückkehrzeit zum Flughafen vor der Abfahrt und kürzen die Route, wenn Verkehr, Einreise oder Flugzeiten es erfordern.',
  'layover.assurance.3.title': 'Gepäck wird fallweise geprüft',
  'layover.assurance.3.text':
    'Durchgechecktes Gepäck hängt von Tickets und Airlines ab. Sagen Sie uns Ihre Gepäcklösung, damit wir Abholung, Lagerung oder Fahrzeugplatz planen.',
  'layover.enquiry.eyebrow': 'Zwischenstopp Buchen',
  'layover.enquiry.title': 'Senden Sie uns Ihre Flugnummern',
  'layover.enquiry.copy':
    'Senden Sie beide Flüge und Ihre Passnationalität. Wir prüfen das nutzbare Zeitfenster, erklären offene Punkte und schlagen das passende Paket vor.',
  'layover.enquiry.point.0': 'Machbarkeit wird vor jeder Buchungsbestätigung geprüft',
  'layover.enquiry.point.1': 'Eine private Route rund um Ihre Verbindung',
  'layover.enquiry.point.2': 'Klare Inklusivleistungen, Ausschlüsse und Rückkehrzeit',
  'layover.form.successTitle': 'Wir haben Ihre Flugdaten',
  'layover.form.successText':
    'Unser Team in Addis prüft Verbindung, Visa-Aspekte und nutzbares Zeitfenster, bevor es den richtigen Plan empfiehlt.',
  'layover.form.whatsapp': 'WhatsApp-Nummer',
  'layover.form.whatsappPlaceholder': 'Ländervorwahl + Nummer',
  'layover.form.nationality': 'Passnationalität',
  'layover.form.nationalityPlaceholder': 'Nationalität in Ihrem Pass',
  'layover.form.package': 'Gewünschtes Paket',
  'layover.form.selectPackage': 'Paket auswählen',
  'layover.form.travellersPlaceholder': '2 Erwachsene, 1 Kind',
  'layover.form.arrival': 'Ankunft in Bole (ADD)',
  'layover.form.departure': 'Weiterflug',
  'layover.form.date': 'Datum',
  'layover.form.localTime': 'Ortszeit',
  'layover.form.flight': 'Flugnummer',
  'layover.form.luggage': 'Ist Ihr Gepäck durchgecheckt?',
  'layover.form.selectOne': 'Eine Option wählen',
  'layover.form.hotel': 'Hotel oder Tageszimmer',
  'layover.form.notNeeded': 'Nicht benötigt',
  'layover.form.dayRoom': 'Tageszimmer gewünscht',
  'layover.form.overnightHotel': 'Übernachtungshotel gewünscht',
  'layover.form.requirements': 'Ernährung, Barrierefreiheit oder Mobilität',
  'layover.form.requirementsPlaceholder':
    'Sagen Sie uns, was den Besuch komfortabel macht',
  'layover.form.notes': 'Was sollten wir noch wissen?',
  'layover.form.notesPlaceholder':
    'Interessen, Alter der Kinder, Hotelwünsche oder Fragen',
  'layover.form.submit': 'Meine Verbindung prüfen',
  'layover.form.note':
    'Eine Anfrage bestätigt weder Visa-Eignung noch Buchung. Wir antworten persönlich innerhalb von 24 Stunden.',
  'layover.faq.eyebrow': 'Bevor Sie den Flughafen verlassen',
  'layover.faq.title': 'Zwischenstopp-Fragen, klar beantwortet',
  'layover.faq.0.question': 'Kann jeder Transitpassagier den Flughafen Bole verlassen?',
  'layover.faq.0.answer':
    'Nein. Es hängt von Passnationalität, Visum, Einreisegenehmigung, Gepäck und Zeit zwischen den Flügen ab. Wir prüfen den Reiseplan, aber Reisende müssen die korrekte Erlaubnis zur Einreise nach Äthiopien besitzen.',
  'layover.faq.1.question': 'Was passiert, wenn der eingehende Flug verspätet ist?',
  'layover.faq.1.answer':
    'Wir verfolgen die angegebene Flugnummer und passen die Besichtigung an, kürzen oder stornieren sie, wenn sich das sichere Zeitfenster ändert. Ihr Anschlussflug hat immer Vorrang.',
  'layover.faq.2.question': 'Sind Mahlzeiten, Eintrittsgelder und Hotels enthalten?',
  'layover.faq.2.answer':
    'Ihr Vorschlag nennt genau, was enthalten ist. Paketideen sind flexibel; keine Mahlzeit, kein Eintritt, Zimmer oder Inlandsflug ist enthalten, sofern es nicht im bestätigten Angebot steht.',
  'layover.faq.3.question': 'Kann ich einen Abend-Zwischenstopp buchen?',
  'layover.faq.3.answer':
    'Ja. Die Abendroute konzentriert sich auf Essen, Kaffee, Musik und verfügbare Aussichtspunkte, da Museen und viele Kulturerbestätten geschlossen sein können.',
  'layover.faq.4.question': 'Ist Lalibela für eine 48-Stunden-Verbindung geeignet?',
  'layover.faq.4.answer':
    'Wir empfehlen mindestens 60–72 Stunden und bestätigen die Erweiterung erst nach Prüfung der Inlandsflugzeiten und eines sicheren Puffers vor dem internationalen Flug.',
  'layover.cta.title': 'Mindestens 60–72 Stunden? Erwägen Sie Lalibela.',
  'layover.cta.text':
    'Ein längerer Stopover kann die Felsenkirchen einschließen, wenn Inlandsflüge und sicherer Puffer vor Ihrem Weiterflug passen. Wir bestätigen dies erst nach Prüfung beider Punkte.',
  'layover.cta.primary': 'Stopover Planen',
  'layover.cta.secondary': 'Touren Ansehen',
})

assignLayoverPackages('DE', {
  'addis-highlights-layover': {
    title: 'Addis Highlights Zwischenstopp',
    price: 'Individuelles Angebot',
    hours: 'Etwa 4 Stunden',
    teaser:
      'Eine sorgfältig getaktete Einführung in Addis Abeba mit Hochlandblick, Stadtmarken und äthiopischem Kaffee.',
    itinerary: [
      'Treffen nach der Einreise und Bestätigung des Rückkehrplans',
      'Fahrt nach Entoto für ein Stadtpanorama, wenn Bedingungen es zulassen',
      'Flexible Runde durch zentrale Sehenswürdigkeiten von Addis Abeba',
      'Pause für ein äthiopisches Kaffeeerlebnis',
      'Rückkehr nach Bole mit vereinbartem Puffer für den internationalen Check-in',
    ],
    best: 'Erstbesucher mit Tagesverbindung',
  },
  'addis-culture-and-coffee': {
    title: 'Addis Kultur und Kaffee',
    price: 'Individuelles Angebot',
    hours: 'Etwa 5–6 Stunden',
    teaser:
      'Ein tieferer Blick auf die Hauptstadt durch Museum oder Kulturstätte, lokale Handwerkstraditionen, Mittagessen und Kaffee.',
    itinerary: [
      'Treffen in Bole und Prüfung von Verkehr und Öffnungszeiten',
      'Besuch des Nationalmuseums oder der besten verfügbaren Kultur-Alternative',
      'Erkundung eines Handwerks-, Textil- oder historischen Viertels mit Guide',
      'Traditionelles äthiopisches Essen',
      'Abschluss mit Kaffee vor der getakteten Rückkehr zum Flughafen',
    ],
    best: 'Reisende, die Kultur, Geschichte und Essen in einem Besuch möchten',
  },
  'full-day-addis-experience': {
    title: 'Ganztägiges Addis Erlebnis',
    price: 'Individuelles Angebot',
    hours: 'Etwa 8–9 Stunden',
    teaser:
      'Ein flexibler ganzer Tag mit Aussichtspunkten, Erbe, Vierteln, Küche und Kaffeekultur von Addis Abeba.',
    itinerary: [
      'Begrüßung am Flughafen und Routenprüfung nach Tagesbedingungen',
      'Start in Entoto oder an einem anderen panoramischen Stadtblick',
      'Besuch ausgewählter geöffneter Museen, Monumente oder Gebetsorte',
      'Erkundung eines Markts oder Kunsthandwerkerviertels mit privatem Guide',
      'Zeit für Mittagessen und äthiopische Kaffeezeremonie',
      'Optionaler Tageszimmer-Stopp, wenn gewünscht und verfügbar',
      'Rückkehr nach Bole mit vereinbartem Check-in-Puffer',
    ],
    best: 'Lange Tagesverbindungen mit Raum für einen entspannten Stadtbesuch',
    extraExcludes: { 3: 'Tageszimmer, sofern nicht im bestätigten Angebot enthalten' },
  },
  'addis-evening-experience': {
    title: 'Addis Abend Erlebnis',
    price: 'Individuelles Angebot',
    hours: 'Etwa 4–5 Stunden',
    teaser:
      'Eine Alternative nach Öffnungszeiten rund um äthiopisches Essen, Kaffee, Musik und Addis Abeba bei Nacht.',
    itinerary: [
      'Treffen nach der Einreise und Bestätigung des Abendplans',
      'Kurze beleuchtete Stadtrundfahrt oder Aussichtspunkt',
      'Äthiopisches Abendessen nach Ihren Vorlieben',
      'Kaffee und optionale Kulturvorführung, wenn verfügbar',
      'Rückkehr nach Bole mit vereinbartem Check-in-Puffer',
    ],
    best: 'Abendankünfte, wenn Museen und Tagesattraktionen geschlossen sind',
  },
  'overnight-addis-and-highlands': {
    title: 'Übernachtung Addis und Hochland',
    price: 'Individuelles Angebot',
    hours: 'Eine Nacht',
    teaser:
      'Übernachten, dann Addis erkunden oder einen sorgfältig getakteten Hochlandausflug vor der Rückkehr nach Bole unternehmen.',
    itinerary: [
      'Begrüßung am Flughafen und privater Hoteltransfer',
      'Abendessen oder Ruhe je nach Ankunftszeit',
      'Wahl zwischen Addis-Morgen oder Hochlandausflug nach Routen- und Wetterprüfung',
      'Mittagessen und flexibler letzter Halt',
      'Rückkehr nach Bole mit vereinbartem Puffer vor dem internationalen Abflug',
    ],
    best: 'Übernacht-Verbindungen mit Hotelaufenthalt und flexiblem zweiten Tag',
    extraExcludes: { 3: 'Unterkunft, sofern nicht im bestätigten Angebot enthalten' },
  },
  'lalibela-stopover-extension': {
    title: 'Lalibela Stopover Erweiterung',
    price: 'Individuelles Angebot',
    hours: 'Zwei Nächte',
    teaser:
      'Verwandeln Sie einen mehrtägigen Stopover in einen privat geführten Besuch in Lalibela, abhängig von Inlandsflugzeiten und sicherem Puffer vor dem Weiterflug.',
    itinerary: [
      'Ankunft in Addis und Prüfung des bestätigten Inlandsflugplans',
      'Flug nach Lalibela und Treffen mit lokalem Guide',
      'Erkundung der Felsenkirchengruppen nach Öffnungs- und Gottesdienstzeiten',
      'Übernachtung in Lalibela und Fortsetzung am nächsten Morgen',
      'Rückflug nach Addis mit vorab vereinbartem Puffer vor der Weiterreise',
    ],
    best: 'Geplante Stopovers von mindestens 60–72 Stunden mit flexibler Weiterreise',
    extraExcludes: {
      3: 'Inlandsflüge und Unterkunft, sofern nicht im bestätigten Angebot enthalten',
    },
  },
})

Object.assign(dictionaries.ZH, {
  yes: '是',
  no: '否',
  notSure: '不确定',
  'cta.call': '或直接致电',
  'layover.page.hero.eyebrow': '亚的斯中转游',
  'layover.page.hero.title': '漫长转机不只是等待',
  'layover.page.hero.lede':
    '一段长转机可以成为对埃塞俄比亚的私人初识，围绕已确认航班、入境要求和安全返回 Bole 机场来规划。',
  'layover.page.hero.imageAlt': '埃塞俄比亚亚的斯亚贝巴 Bole 国际机场',
  'layover.meta.packages': '套餐',
  'layover.meta.minimum': '最短',
  'layover.meta.pricing': '价格',
  'layover.meta.airport': '机场',
  'layover.price.custom': '定制报价',
  'layover.packages.eyebrow': '选择您的时间窗口',
  'layover.packages.title': '5 个中转游和 1 个更长停留',
  'layover.packages.aside':
    '请发送两段航班号。我们会根据入境、交通和必要机场返回缓冲，诚实确认可行安排。',
  'layover.type.layover': '中转',
  'layover.type.stopover': '停留',
  'layover.card.minimum': '最短连接时间',
  'layover.card.length': '体验时长',
  'layover.card.day': '当天安排',
  'layover.card.included': '包含',
  'layover.card.notIncluded': '不包含',
  'layover.card.bestFor': '适合：',
  'layover.card.choose': '选择此套餐',
  'layover.logistics.eyebrow': '物流优先',
  'layover.logistics.title': '中转旅行里，时间就是核心产品',
  'layover.logistics.lede': '景点并不难。确保不误后续航班，才需要经验。',
  'layover.assurance.0.title': '我们追踪您的抵达航班',
  'layover.assurance.0.text':
    '提供航班号后，我们会监控抵达情况，并根据剩余可用时间调整路线。',
  'layover.assurance.1.title': '抵达前签证指导',
  'layover.assurance.1.text':
    '我们帮助您核对护照对应的当前官方要求。入境批准和正确签证仍由旅行者负责。',
  'layover.assurance.2.title': '受保护的返场缓冲',
  'layover.assurance.2.text':
    '出发前先约定返场时间，并在交通、入境或航班时间需要时缩短路线。',
  'layover.assurance.3.title': '行李逐案确认',
  'layover.assurance.3.text':
    '行李是否直挂取决于机票和航空公司。请告知行李安排，以便规划提取、寄存或车辆空间。',
  'layover.enquiry.eyebrow': '预订中转游',
  'layover.enquiry.title': '发送您的航班号',
  'layover.enquiry.copy':
    '发送两段航班和护照国籍。我们会评估可用时间、说明仍需确认事项，并推荐合适套餐。',
  'layover.enquiry.point.0': '任何预订确认前都会先检查可行性',
  'layover.enquiry.point.1': '围绕您的转机打造私人路线',
  'layover.enquiry.point.2': '清晰说明包含、不包含和机场返回时间',
  'layover.form.successTitle': '我们已收到您的航班信息',
  'layover.form.successText':
    '我们的亚的斯团队会检查连接时间、签证因素和可操作窗口，再推荐合适方案。',
  'layover.form.whatsapp': 'WhatsApp 号码',
  'layover.form.whatsappPlaceholder': '国家区号 + 号码',
  'layover.form.nationality': '护照国籍',
  'layover.form.nationalityPlaceholder': '护照上的国籍',
  'layover.form.package': '首选套餐',
  'layover.form.selectPackage': '选择套餐',
  'layover.form.travellersPlaceholder': '2 位成人，1 位儿童',
  'layover.form.arrival': '抵达 Bole (ADD)',
  'layover.form.departure': '后续出发',
  'layover.form.date': '日期',
  'layover.form.localTime': '当地时间',
  'layover.form.flight': '航班号',
  'layover.form.luggage': '您的行李是否直挂？',
  'layover.form.selectOne': '请选择',
  'layover.form.hotel': '酒店或日间房',
  'layover.form.notNeeded': '不需要',
  'layover.form.dayRoom': '需要日间房',
  'layover.form.overnightHotel': '需要过夜酒店',
  'layover.form.requirements': '饮食、无障碍或行动需求',
  'layover.form.requirementsPlaceholder': '告诉我们怎样会让这次游览更舒适',
  'layover.form.notes': '还有什么需要说明？',
  'layover.form.notesPlaceholder': '兴趣、儿童年龄、酒店偏好或问题',
  'layover.form.submit': '检查我的连接时间',
  'layover.form.note':
    '提交咨询不代表签证资格或预订已确认。我们会在 24 小时内亲自回复。',
  'layover.faq.eyebrow': '离开机场之前',
  'layover.faq.title': '中转问题，清楚回答',
  'layover.faq.0.question': '所有中转旅客都能离开 Bole 机场吗？',
  'layover.faq.0.answer':
    '不能。取决于护照国籍、签证状态、入境批准、行李和两段航班间隔。我们会审查行程，但旅客必须取得正确入境许可。',
  'layover.faq.1.question': '如果抵达航班延误怎么办？',
  'layover.faq.1.answer':
    '我们会追踪您提供的航班号，并在安全窗口变化时调整、缩短或取消游览计划。后续航班始终优先。',
  'layover.faq.2.question': '餐食、门票和酒店包含吗？',
  'layover.faq.2.answer':
    '您的方案会清楚列出包含内容。套餐想法可灵活调整，任何餐食、门票、房间或国内航班只有写入确认报价才包含。',
  'layover.faq.3.question': '可以预订晚间中转游吗？',
  'layover.faq.3.answer':
    '可以。晚间路线以餐食、咖啡、音乐和可开放观景点为主，因为博物馆和许多遗产景点可能关闭。',
  'layover.faq.4.question': '48 小时连接适合去 Lalibela 吗？',
  'layover.faq.4.answer':
    '我们建议至少 60–72 小时，并且只会在确认国内航班时刻和国际航班前安全缓冲后安排。',
  'layover.cta.title': '至少有 60–72 小时？可以考虑 Lalibela。',
  'layover.cta.text':
    '如果国内航班时间和后续航班前安全缓冲都合适，更长停留可包含岩石教堂。我们只会在核对两者后确认。',
  'layover.cta.primary': '规划停留',
  'layover.cta.secondary': '查看行程',
})

assignLayoverPackages('ZH', {
  'addis-highlights-layover': {
    title: '亚的斯精华中转游',
    price: '定制报价',
    hours: '约 4 小时',
    teaser: '精确安排的亚的斯亚贝巴初识，包含高地观景、城市地标和埃塞俄比亚咖啡。',
    itinerary: [
      '入境后会合并确认返回时间',
      '条件允许时前往 Entoto 俯瞰城市',
      '灵活游览亚的斯亚贝巴市中心地标',
      '停留体验埃塞俄比亚咖啡',
      '按约定国际值机缓冲返回 Bole',
    ],
    best: '首次到访且拥有日间连接的旅客',
  },
  'addis-culture-and-coffee': {
    title: '亚的斯文化与咖啡',
    price: '定制报价',
    hours: '约 5–6 小时',
    teaser: '通过博物馆或文化地点、本地手工传统、午餐和咖啡深入了解首都。',
    itinerary: [
      '在 Bole 会合并检查交通和开放时间',
      '参观国家博物馆或当天最佳文化替代地点',
      '与向导探索手工、纺织或历史街区',
      '享用传统埃塞俄比亚餐',
      '以咖啡结束，并按时间返回机场',
    ],
    best: '希望一次体验文化、历史和美食的旅客',
  },
  'full-day-addis-experience': {
    title: '亚的斯全天体验',
    price: '定制报价',
    hours: '约 8–9 小时',
    teaser: '灵活全天结合亚的斯亚贝巴的观景点、遗产、街区、美食和咖啡文化。',
    itinerary: [
      '机场欢迎，并根据当天情况核对路线',
      '从 Entoto 或其他城市全景点开始',
      '参观开放的博物馆、纪念地或宗教场所',
      '与私人向导探索市场或工匠街区',
      '安排午餐和埃塞俄比亚咖啡仪式',
      '如有需求且可用，可安排日间房停留',
      '按约定值机缓冲返回 Bole',
    ],
    best: '有充足时间轻松游览城市的长日间连接',
    extraExcludes: { 3: '日间房，除非写入确认报价' },
  },
  'addis-evening-experience': {
    title: '亚的斯夜间体验',
    price: '定制报价',
    hours: '约 4–5 小时',
    teaser: '围绕埃塞俄比亚餐食、咖啡、音乐和夜色中的亚的斯打造的非日间选择。',
    itinerary: [
      '入境后会合并确认夜间安排',
      '短途夜景车游或观景点停留',
      '按偏好安排埃塞俄比亚晚餐',
      '咖啡体验，可用时加入文化表演',
      '按约定值机缓冲返回 Bole',
    ],
    best: '夜间抵达且博物馆和日间景点关闭的旅客',
  },
  'overnight-addis-and-highlands': {
    title: '亚的斯与高地过夜',
    price: '定制报价',
    hours: '一晚',
    teaser: '过夜休息，然后探索亚的斯，或在返回 Bole 前安排精确计时的高地短途。',
    itinerary: [
      '机场欢迎和私人酒店接送',
      '根据抵达时间安排晚餐或休息',
      '经路线和天气检查后，选择亚的斯上午或高地短途',
      '午餐和灵活最后一站',
      '按约定国际出发缓冲返回 Bole',
    ],
    best: '允许酒店住宿和灵活第二天的过夜连接',
    extraExcludes: { 3: '住宿，除非写入确认报价' },
  },
  'lalibela-stopover-extension': {
    title: 'Lalibela 停留延伸',
    price: '定制报价',
    hours: '两晚',
    teaser: '将多日停留变成私人向导带领的 Lalibela 之旅，需符合国内航班时刻和后续航班安全缓冲。',
    itinerary: [
      '抵达亚的斯并核对已确认的国内航班计划',
      '飞往 Lalibela 并会合本地向导',
      '按开放和礼拜时间探索岩石教堂群',
      '在 Lalibela 过夜，次日上午继续参观',
      '按预先约定缓冲飞回亚的斯，再衔接后续旅程',
    ],
    best: '至少 60–72 小时且后续旅行灵活的计划停留',
    extraExcludes: { 3: '国内航班和住宿，除非写入确认报价' },
  },
})

type PostTranslation = {
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
}

function assignBlogTranslations(
  language: Exclude<LanguageCode, 'EN'>,
  shared: Dictionary,
  posts: Record<string, PostTranslation>,
) {
  Object.assign(dictionaries[language], shared)
  for (const [slug, post] of Object.entries(posts)) {
    dictionaries[language][`post.${slug}.title`] = post.title
    dictionaries[language][`post.${slug}.date`] = post.date
    dictionaries[language][`post.${slug}.readTime`] = post.readTime
    dictionaries[language][`post.${slug}.excerpt`] = post.excerpt
    dictionaries[language][`postCategory.${post.category}`] =
      dictionaries[language][`postCategory.${post.category}`] ?? post.category
  }
}

assignBlogTranslations(
  'ES',
  {
    'blog.hero.eyebrow': 'El Diario',
    'blog.hero.title': 'Notas de campo desde las tierras altas',
    'blog.hero.lede':
      'Escrito por las personas que dirigen estos viajes: cuándo venir, qué empacar, cómo participar correctamente en una ceremonia del café y por qué trabajamos como trabajamos.',
    'blog.hero.imageAlt': 'Cerezas de café creciendo en Etiopía',
    'blog.latest': 'Último Envío',
    'blog.archive.eyebrow': 'Archivo',
    'blog.archive.title': 'Todo lo que hemos escrito',
    'blog.archive.aside':
      'Seis ensayos y contando, organizados por aquello para lo que realmente sirven.',
    'blog.filter.aria': 'Filtrar artículos por categoría',
    'blog.filter.all': 'Todos los Textos',
    'blog.empty': 'Todavía no hay nada archivado aquí.',
    'blog.cta.eyebrow': 'Hablar Con Un Diseñador',
    'blog.cta.title': '¿Leyó algo que cambió su perspectiva?',
    'blog.cta.text':
      'La mayoría de estos ensayos comenzaron como respuesta a una pregunta de un huésped. Haga la suya y quizá se convierta en el próximo.',
    'blog.cta.primary': 'Planifique Su Viaje',
    'blog.cta.secondary': 'Ver Tours',
    'postCategory.Planning': 'Planificación',
    'postCategory.Destinations': 'Destinos',
    'postCategory.Culture': 'Cultura',
    'postCategory.Practical': 'Práctico',
    'postCategory.Responsible Travel': 'Turismo Responsable',
    'postCategory.Layover': 'Escala',
  },
  {
    'when-to-visit-ethiopia': {
      title: 'Cuándo visitar Etiopía: una lectura mes a mes de la luz',
      category: 'Planning',
      date: '18 de junio de 2026',
      readTime: '9 min de lectura',
      excerpt:
        'Etiopía tiene trece meses de sol, pero no todos son iguales. Así es como elegimos realmente las fechas para nuestros huéspedes.',
    },
    'lalibela-at-dawn': {
      title: 'Lalibela al amanecer: cómo ver correctamente las iglesias rupestres',
      category: 'Destinations',
      date: '30 de mayo de 2026',
      readTime: '7 min de lectura',
      excerpt:
        'La mayoría de visitantes llega a las diez de la mañana y ve un monumento. Llegue a las cinco y verá una ciudad viva.',
    },
    'the-coffee-ceremony': {
      title: 'La ceremonia del café no es una actuación',
      category: 'Culture',
      date: '9 de mayo de 2026',
      readTime: '6 min de lectura',
      excerpt:
        'Tres rondas, una hora de su tiempo y pequeñas cortesías que transforman por completo la experiencia.',
    },
    'packing-for-the-highlands': {
      title: 'Empacar para 4.000 metros y 45 grados en una sola maleta',
      category: 'Practical',
      date: '22 de abril de 2026',
      readTime: '5 min de lectura',
      excerpt:
        'Etiopía le pide empacar para dos climas a la vez. Una lista breve y directa tras años de hacerlo.',
    },
    'responsible-travel-in-the-omo': {
      title: 'Lo que realmente exige viajar responsablemente en el Valle del Omo',
      category: 'Responsible Travel',
      date: '3 de abril de 2026',
      readTime: '8 min de lectura',
      excerpt:
        'La economía de pagar por foto es una elección, no una inevitabilidad. Así trabajamos nosotros y esto pedimos a los huéspedes.',
    },
    'twelve-hours-in-addis': {
      title: 'Doce horas en Addis: una escala que merece salir del aeropuerto',
      category: 'Layover',
      date: '14 de marzo de 2026',
      readTime: '6 min de lectura',
      excerpt:
        'Bole es uno de los grandes centros de conexión de África. Si su vuelo sale en más de ocho horas, la ciudad está ahí mismo.',
    },
  },
)

assignBlogTranslations(
  'FR',
  {
    'blog.hero.eyebrow': 'Le Journal',
    'blog.hero.title': 'Notes de terrain depuis les hautes terres',
    'blog.hero.lede':
      'Écrit par celles et ceux qui organisent ces voyages : quand venir, quoi emporter, comment vivre correctement une cérémonie du café et pourquoi nous travaillons ainsi.',
    'blog.hero.imageAlt': 'Cerises de café poussant en Éthiopie',
    'blog.latest': 'Dernière Dépêche',
    'blog.archive.eyebrow': 'Archives',
    'blog.archive.title': 'Tout ce que nous avons écrit',
    'blog.archive.aside':
      'Six essais, et d’autres à venir, classés selon leur réelle utilité.',
    'blog.filter.aria': 'Filtrer les articles par catégorie',
    'blog.filter.all': 'Tous les Articles',
    'blog.empty': 'Rien n’est encore classé ici.',
    'blog.cta.eyebrow': 'Parler à un Designer',
    'blog.cta.title': 'Quelque chose a changé votre regard ?',
    'blog.cta.text':
      'La plupart de ces essais ont commencé comme une réponse à une question de voyageur. Posez la vôtre, elle deviendra peut-être la prochaine.',
    'blog.cta.primary': 'Planifier Votre Voyage',
    'blog.cta.secondary': 'Voir les Circuits',
    'postCategory.Planning': 'Planification',
    'postCategory.Destinations': 'Destinations',
    'postCategory.Culture': 'Culture',
    'postCategory.Practical': 'Pratique',
    'postCategory.Responsible Travel': 'Voyage Responsable',
    'postCategory.Layover': 'Escale',
  },
  {
    'when-to-visit-ethiopia': {
      title: 'Quand visiter l’Éthiopie : une lecture mensuelle de la lumière',
      category: 'Planning',
      date: '18 juin 2026',
      readTime: '9 min de lecture',
      excerpt:
        'L’Éthiopie a treize mois de soleil, mais ils ne se ressemblent pas tous. Voici comment nous choisissons réellement les dates pour nos hôtes.',
    },
    'lalibela-at-dawn': {
      title: 'Lalibela à l’aube : comment voir correctement les églises rupestres',
      category: 'Destinations',
      date: '30 mai 2026',
      readTime: '7 min de lecture',
      excerpt:
        'La plupart des visiteurs arrivent à dix heures et voient un monument. Arrivez à cinq heures et vous verrez une ville vivante.',
    },
    'the-coffee-ceremony': {
      title: 'La cérémonie du café n’est pas un spectacle',
      category: 'Culture',
      date: '9 mai 2026',
      readTime: '6 min de lecture',
      excerpt:
        'Trois tournées, une heure de votre temps et quelques petites attentions qui changent entièrement l’expérience.',
    },
    'packing-for-the-highlands': {
      title: 'Faire sa valise pour 4 000 mètres et 45 degrés',
      category: 'Practical',
      date: '22 avril 2026',
      readTime: '5 min de lecture',
      excerpt:
        'L’Éthiopie vous demande de préparer deux climats à la fois. Une liste courte et directe issue de l’expérience du terrain.',
    },
    'responsible-travel-in-the-omo': {
      title: 'Ce qu’exige vraiment un voyage responsable dans la vallée de l’Omo',
      category: 'Responsible Travel',
      date: '3 avril 2026',
      readTime: '8 min de lecture',
      excerpt:
        'L’économie de la photo payante est un choix, pas une fatalité. Voici comment nous travaillons et ce que nous demandons aux voyageurs.',
    },
    'twelve-hours-in-addis': {
      title: 'Douze heures à Addis : une escale qui mérite de sortir de l’aéroport',
      category: 'Layover',
      date: '14 mars 2026',
      readTime: '6 min de lecture',
      excerpt:
        'Bole est l’un des grands hubs de connexion d’Afrique. Si votre prochain vol est dans plus de huit heures, la ville est juste là.',
    },
  },
)

assignBlogTranslations(
  'DE',
  {
    'blog.hero.eyebrow': 'Das Journal',
    'blog.hero.title': 'Feldnotizen aus dem Hochland',
    'blog.hero.lede':
      'Geschrieben von den Menschen, die diese Reisen durchführen: wann man kommt, was man einpackt, wie man richtig an einer Kaffeezeremonie teilnimmt und warum wir so arbeiten.',
    'blog.hero.imageAlt': 'Kaffeekirschen wachsen in Äthiopien',
    'blog.latest': 'Neueste Notiz',
    'blog.archive.eyebrow': 'Archiv',
    'blog.archive.title': 'Alles, was wir aufgeschrieben haben',
    'blog.archive.aside':
      'Sechs Essays und weitere folgen, sortiert danach, wofür sie wirklich nützlich sind.',
    'blog.filter.aria': 'Artikel nach Kategorie filtern',
    'blog.filter.all': 'Alle Beiträge',
    'blog.empty': 'Hier ist noch nichts abgelegt.',
    'blog.cta.eyebrow': 'Mit Einem Designer Sprechen',
    'blog.cta.title': 'Hat etwas Ihre Sicht verändert?',
    'blog.cta.text':
      'Die meisten dieser Essays begannen als Antwort auf eine Gästefrage. Stellen Sie Ihre, vielleicht wird sie die nächste.',
    'blog.cta.primary': 'Reise Planen',
    'blog.cta.secondary': 'Touren Durchsehen',
    'postCategory.Planning': 'Planung',
    'postCategory.Destinations': 'Reiseziele',
    'postCategory.Culture': 'Kultur',
    'postCategory.Practical': 'Praktisch',
    'postCategory.Responsible Travel': 'Verantwortliches Reisen',
    'postCategory.Layover': 'Zwischenstopp',
  },
  {
    'when-to-visit-ethiopia': {
      title: 'Wann Äthiopien besuchen: das Licht Monat für Monat gelesen',
      category: 'Planning',
      date: '18. Juni 2026',
      readTime: '9 Min. Lesezeit',
      excerpt:
        'Äthiopien hat dreizehn Monate Sonnenschein, aber sie sind nicht alle gleich. So wählen wir tatsächlich Termine für unsere Gäste.',
    },
    'lalibela-at-dawn': {
      title: 'Lalibela im Morgengrauen: wie man die Felsenkirchen richtig sieht',
      category: 'Destinations',
      date: '30. Mai 2026',
      readTime: '7 Min. Lesezeit',
      excerpt:
        'Die meisten Besucher kommen um zehn Uhr und sehen ein Monument. Kommen Sie um fünf und Sie sehen eine lebendige Stadt.',
    },
    'the-coffee-ceremony': {
      title: 'Die Kaffeezeremonie ist keine Vorstellung',
      category: 'Culture',
      date: '9. Mai 2026',
      readTime: '6 Min. Lesezeit',
      excerpt:
        'Drei Runden, eine Stunde Zeit und kleine Höflichkeiten, die das Erlebnis vollständig verändern.',
    },
    'packing-for-the-highlands': {
      title: 'Packen für 4.000 Meter und 45 Grad in einem Koffer',
      category: 'Practical',
      date: '22. April 2026',
      readTime: '5 Min. Lesezeit',
      excerpt:
        'Äthiopien verlangt Gepäck für zwei Klimazonen zugleich. Eine kurze, klare Liste aus jahrelanger Erfahrung.',
    },
    'responsible-travel-in-the-omo': {
      title: 'Was verantwortliches Reisen im Omo-Tal wirklich verlangt',
      category: 'Responsible Travel',
      date: '3. April 2026',
      readTime: '8 Min. Lesezeit',
      excerpt:
        'Die Bezahl-pro-Foto-Ökonomie ist eine Entscheidung, keine Unvermeidlichkeit. So arbeiten wir, und das bitten wir Gäste zu respektieren.',
    },
    'twelve-hours-in-addis': {
      title: 'Zwölf Stunden in Addis: ein Zwischenstopp, für den man den Flughafen verlässt',
      category: 'Layover',
      date: '14. März 2026',
      readTime: '6 Min. Lesezeit',
      excerpt:
        'Bole ist einer der großen Verbindungsknoten Afrikas. Wenn Ihr Weiterflug mehr als acht Stunden entfernt ist, liegt die Stadt direkt vor Ihnen.',
    },
  },
)

assignBlogTranslations(
  'ZH',
  {
    'blog.hero.eyebrow': '旅行日志',
    'blog.hero.title': '来自高原的现场笔记',
    'blog.hero.lede':
      '由真正执行这些旅程的人撰写：何时前来、该带什么、如何得体地参与咖啡仪式，以及我们为何这样工作。',
    'blog.hero.imageAlt': '生长在埃塞俄比亚的咖啡果',
    'blog.latest': '最新文章',
    'blog.archive.eyebrow': '归档',
    'blog.archive.title': '我们写下的所有内容',
    'blog.archive.aside': '目前六篇文章，按真正有用的主题整理。',
    'blog.filter.aria': '按分类筛选文章',
    'blog.filter.all': '全部文章',
    'blog.empty': '这个分类下还没有内容。',
    'blog.cta.eyebrow': '与旅行设计师沟通',
    'blog.cta.title': '读到让您改变想法的内容了吗？',
    'blog.cta.text':
      '这些文章大多源自客人的真实问题。提出您的问题，它也许会成为下一篇。',
    'blog.cta.primary': '规划您的旅程',
    'blog.cta.secondary': '浏览行程',
    'postCategory.Planning': '规划',
    'postCategory.Destinations': '目的地',
    'postCategory.Culture': '文化',
    'postCategory.Practical': '实用',
    'postCategory.Responsible Travel': '负责任旅行',
    'postCategory.Layover': '中转',
  },
  {
    'when-to-visit-ethiopia': {
      title: '何时前往埃塞俄比亚：按月份阅读光线',
      category: 'Planning',
      date: '2026 年 6 月 18 日',
      readTime: '9 分钟阅读',
      excerpt:
        '埃塞俄比亚有十三个月的阳光，但每个月都不一样。以下是我们为客人真正选择日期的方式。',
    },
    'lalibela-at-dawn': {
      title: '黎明时的 Lalibela：如何真正看懂岩石教堂',
      category: 'Destinations',
      date: '2026 年 5 月 30 日',
      readTime: '7 分钟阅读',
      excerpt:
        '多数游客上午十点抵达，看到的是纪念碑。五点抵达，您看到的是一座仍在呼吸的城市。',
    },
    'the-coffee-ceremony': {
      title: '咖啡仪式不是表演',
      category: 'Culture',
      date: '2026 年 5 月 9 日',
      readTime: '6 分钟阅读',
      excerpt:
        '三轮咖啡，一小时的时间，还有一些小礼节，会彻底改变这段体验。',
    },
    'packing-for-the-highlands': {
      title: '一个行李箱同时应对 4,000 米高原和 45 度低地',
      category: 'Practical',
      date: '2026 年 4 月 22 日',
      readTime: '5 分钟阅读',
      excerpt:
        '埃塞俄比亚要求您同时为两种气候准备行李。这是一份来自多年经验的简短实用清单。',
    },
    'responsible-travel-in-the-omo': {
      title: '奥莫河谷负责任旅行真正需要什么',
      category: 'Responsible Travel',
      date: '2026 年 4 月 3 日',
      readTime: '8 分钟阅读',
      excerpt:
        '按照片付费的经济不是必然，而是一种选择。这里说明我们如何工作，也说明我们对客人的期待。',
    },
    'twelve-hours-in-addis': {
      title: '亚的斯十二小时：值得离开机场的中转',
      category: 'Layover',
      date: '2026 年 3 月 14 日',
      readTime: '6 分钟阅读',
      excerpt:
        'Bole 是非洲重要航空枢纽之一。如果您的后续航班在八小时之后，城市就在眼前。',
    },
  },
)

type DestinationSummaryTranslation = {
  name: string
  region: string
  tag: string
  teaser: string
  intro: string
  bestTime?: string
  duration?: string
}

function assignDestinationTranslations(
  language: Exclude<LanguageCode, 'EN'>,
  shared: Dictionary,
  destinations: Record<string, DestinationSummaryTranslation>,
) {
  Object.assign(dictionaries[language], shared)
  for (const [slug, destination] of Object.entries(destinations)) {
    dictionaries[language][`destination.${slug}.name`] = destination.name
    dictionaries[language][`destination.${slug}.region`] = destination.region
    dictionaries[language][`destination.${slug}.tag`] = destination.tag
    dictionaries[language][`destination.${slug}.teaser`] = destination.teaser
    dictionaries[language][`destination.${slug}.intro`] = destination.intro
    if (destination.bestTime) {
      dictionaries[language][`destination.${slug}.bestTime`] = destination.bestTime
    }
    if (destination.duration) {
      dictionaries[language][`destination.${slug}.duration`] = destination.duration
    }
  }
}

assignDestinationTranslations(
  'ES',
  {
    'destinationsPage.hero.eyebrow': 'Dónde Viajamos',
    'destinationsPage.hero.title': 'Veinte lugares y las rutas entre ellos',
    'destinationsPage.hero.lede':
      'Desde iglesias talladas hacia abajo en la roca hasta un lago de lava bajo el nivel del mar. Estos son veinte lugares que nuestros diseñadores conectan en viajes bien pensados por Etiopía.',
    'destinationsPage.hero.imageAlt':
      'Iglesia rupestre Bet Giyorgis en Lalibela, Etiopía',
    'destinationsPage.meta.destinations': 'Destinos',
    'destinationsPage.meta.unesco': 'Sitios UNESCO',
    'destinationsPage.meta.altitude': 'Rango de altitud',
    'destinationsPage.meta.months': 'Mejores meses',
    'destinationsPage.meta.monthsValue': 'Oct – Mar',
    'destinationsPage.map.eyebrow': 'El Mapa',
    'destinationsPage.map.title': 'Regiones alrededor de las que diseñamos viajes',
    'destinationsPage.map.aside':
      'La mayoría de itinerarios combina tres o cuatro de estas regiones. Díganos cuáles le atraen y trazaremos la ruta entre ellas.',
    'destinationsPage.cta.title': '¿No sabe cuál Etiopía es la suya?',
    'destinationsPage.cta.text':
      'Envíenos una frase sobre el viaje que imagina: altitud, ritmo, época del año, y un diseñador responderá con dos o tres rutas que vale la pena considerar.',
    'destinationDetail.meta.bestTime': 'Mejor época',
    'destinationDetail.meta.stay': 'Estancia sugerida',
    'destinationDetail.meta.altitude': 'Altitud',
    'destinationDetail.meta.region': 'Región',
    'destinationDetail.why.eyebrow': 'Por Qué Vamos',
    'destinationDetail.highlights': 'Highlights',
    'destinationDetail.combined.prefix': 'Mejor combinado con una estancia de',
    'destinationDetail.combined.middle': 'viajando',
    'destinationDetail.enquire': 'Consultar sobre',
    'destinationDetail.dossier.eyebrow': 'Dossier del Destino',
    'destinationDetail.dossier.title': 'Una lectura más profunda antes de llegar',
    'destinationDetail.dossier.copy':
      'Contexto de campo conciso sobre cómo funciona este destino en un itinerario privado: qué lo define, cómo vivirlo bien y qué debe planificarse antes de llegar.',
    'destinationDetail.dossier.defines': 'Qué Lo Define',
    'destinationDetail.dossier.how': 'Cómo Vivirlo',
    'destinationDetail.dossier.notes': 'Notas de Planificación',
    'destinationDetail.dossier.pairs': 'Combina Bien Con',
    'destinationDetail.related.eyebrow': 'Viajes Que Incluyen',
    'destinationDetail.related.title': 'Rutas que pasan por aquí',
    'destinationDetail.related.allTours': 'Todos los tours',
    'destinationDetail.plan.eyebrow': 'Planificar Este Destino',
    'destinationDetail.plan.titlePrefix': 'Incluya',
    'destinationDetail.plan.titleSuffix': 'en su viaje',
    'destinationDetail.plan.copy':
      'Nada aquí es fijo. Díganos cuánto tiempo tiene y qué más desea ver, y un diseñador trazará la ruta, incluidos vuelos, guías y las horas que importan.',
    'destinationDetail.also': 'También Considere',
    'destinationDetail.cta.title': 'Hable con alguien que haya estado allí esta temporada',
    'destinationDetail.cta.text':
      'Nuestros diseñadores recorren estas rutas personalmente. Pregunte por carreteras, festivales o qué lodge tiene mejor vista y recibirá una respuesta directa.',
    'destinationDetail.cta.secondary': 'Todos los Destinos',
    'destinationDetail.genericHow':
      'Vívelo con un guía local, tiempo suficiente y una ruta privada ajustada a clima, accesos y ritmo.',
    'destinationDetail.genericHighlight.0': 'Guía privada con contexto local',
    'destinationDetail.genericHighlight.1': 'Ritmo flexible y horarios cuidados',
    'destinationDetail.genericHighlight.2': 'Acceso responsable y respetuoso',
    'destinationDetail.genericHighlight.3': 'Conexiones naturales con otras regiones',
    'destinationDetail.genericNote.0': 'La mejor secuencia depende de clima, accesos y horarios locales.',
    'destinationDetail.genericNote.1': 'La etiqueta local y la vestimenta respetuosa importan.',
    'destinationDetail.genericNote.2': 'Las rutas privadas permiten mejores tiempos y menos prisa.',
  },
  {
    lalibela: {
      name: 'Lalibela',
      region: 'Tierras Altas del Norte',
      tag: 'Patrimonio UNESCO',
      teaser: 'Once iglesias talladas hacia abajo en roca viva, todavía llenas de oración.',
      intro:
        'Una capital medieval donde una ciudad santa entera fue excavada en la montaña y donde, ocho siglos después, la liturgia nunca se ha detenido.',
      bestTime: 'Octubre – Marzo',
      duration: '2 – 3 días',
    },
    'addis-ababa': {
      name: 'Addis Abeba',
      region: 'Etiopía Central',
      tag: 'Capital',
      teaser: 'Museos, mercados y vida etíope moderna en la puerta de entrada al país.',
      intro:
        'La capital de altura de Etiopía reúne historia antigua, cultura viva y una ciudad contemporánea ambiciosa al comienzo de casi todo viaje.',
      bestTime: 'Octubre – Mayo',
      duration: '1 – 2 días',
    },
    'simien-mountains': {
      name: 'Parque Nacional Montañas Simien',
      region: 'Tierras Altas del Norte',
      tag: 'Parque Nacional',
      teaser: 'Un techo de África donde los geladas pastan sobre caídas de dos mil metros.',
      intro:
        'Picos basálticos, escarpes que caen hacia las nubes y grandes tropas de primates caminando junto a usted.',
      bestTime: 'Octubre – Abril',
      duration: '3 – 5 días',
    },
    'danakil-depression': {
      name: 'Depresión de Danakil y Erta Ale',
      region: 'Tierras Bajas de Afar',
      tag: 'Expedición',
      teaser: 'El lugar habitado más caluroso de la Tierra, pintado de azufre y sal.',
      intro:
        'Cien metros bajo el nivel del mar: manantiales ácidos, un lago de lava permanente y caravanas de sal casi intactas por siglos.',
      bestTime: 'Noviembre – Febrero',
      duration: '3 – 4 días',
    },
    'omo-valley': {
      name: 'Valle del Omo',
      region: 'Rift del Sur',
      tag: 'Inmersión Cultural',
      teaser: 'Un mosaico vivo de comunidades que han modelado esta tierra durante milenios.',
      intro:
        'El bajo Omo es una de las regiones culturalmente más densas del planeta y exige viajar despacio, con permiso y respeto.',
      bestTime: 'Junio – Septiembre, Diciembre – Marzo',
      duration: '5 – 8 días',
    },
    gondar: {
      name: 'Gondar',
      region: 'Tierras Altas del Norte',
      tag: 'Ciudad Imperial',
      teaser: 'El Camelot de África: palacios, baños y techos pintados de un imperio de altura.',
      intro:
        'Una capital imperial del siglo XVII con castillos de piedra y capillas perfumadas de cedro, donde Timkat aún llena el baño real.',
      bestTime: 'Octubre – Marzo',
      duration: '1 – 2 días',
    },
    axum: {
      name: 'Aksum',
      region: 'Tigray',
      tag: 'Capital Antigua',
      teaser: 'Obeliscos de granito, tumbas sumergidas y el supuesto reposo del Arca.',
      intro:
        'Sede de un imperio comercial que acuñaba moneda propia y centro espiritual de la ortodoxia etíope.',
      bestTime: 'Octubre – Marzo',
      duration: '1 – 2 días',
    },
    'lake-tana': {
      name: 'Bahir Dar, Lago Tana y Cataratas del Nilo Azul',
      region: 'Amhara',
      tag: 'Viaje Lento',
      teaser: 'Monasterios isleños, barcos de papiro y la fuente del Nilo Azul.',
      intro:
        'El lago más grande de Etiopía guarda monasterios isleños que han protegido manuscritos iluminados durante siglos.',
      bestTime: 'Septiembre – Marzo',
      duration: '1 – 2 días',
    },
    'bale-mountains': {
      name: 'Parque Nacional Montañas Bale',
      region: 'Tierras Altas de Oromia',
      tag: 'Vida Silvestre',
      teaser: 'Páramo afroalpino donde vive el cánido más raro del mundo: el lobo etíope.',
      intro:
        'La meseta Sanetti es el mayor hábitat afroalpino de África y el mejor lugar para ver un lobo salvaje cazando.',
      bestTime: 'Noviembre – Abril',
      duration: '3 – 4 días',
    },
    harar: {
      name: 'Harar Jugol',
      region: 'Etiopía Oriental',
      tag: 'Patrimonio UNESCO',
      teaser: 'Una ciudad amurallada de casas pintadas, callejones y siglos de erudición islámica.',
      intro:
        'Tras las puertas antiguas de Harar, mezquitas, mercados y hogares harari forman una de las ciudades históricas vivas más notables de África.',
      bestTime: 'Octubre – Marzo',
      duration: '2 – 3 días',
    },
    'arba-minch': {
      name: 'Arba Minch',
      region: 'Etiopía del Sur',
      tag: 'Lagos y Vida Silvestre',
      teaser: 'Un escarpe verde sobre lagos gemelos del Rift y los bosques de Nech Sar.',
      intro:
        'Puerta natural del sur de Etiopía, con vistas a los lagos Abaya y Chamo, fauna, humedales y comunidades de altura cercanas.',
      bestTime: 'Octubre – Marzo',
      duration: '2 – 3 días',
    },
    konso: {
      name: 'Paisaje Cultural Konso',
      region: 'Etiopía del Sur',
      tag: 'Patrimonio UNESCO',
      teaser: 'Aldeas amuralladas de piedra y terrazas moldeadas por generaciones de agricultores.',
      intro:
        'Las aldeas fortificadas, terrazas agrícolas y tradiciones comunales de Konso revelan un paisaje cultural refinado durante siglos.',
      bestTime: 'Junio – Marzo',
      duration: '1 – 2 días',
    },
    'sof-omar-cave': {
      name: 'Cueva Sof Omar',
      region: 'Oromia',
      tag: 'Maravilla Geológica',
      teaser: 'Un mundo calizo tallado por río, con cámaras inmensas, pilares y memoria sagrada.',
      intro:
        'El río Web atraviesa un enorme sistema de cuevas calizas cuyas galerías combinan drama geológico y significado espiritual.',
      bestTime: 'Octubre – Junio',
      duration: '1 día',
    },
    hawassa: {
      name: 'Hawassa',
      region: 'Sidama',
      tag: 'Valle del Rift',
      teaser: 'Una ciudad lacustre relajada con mercados de pescado, jardines y abundante avifauna.',
      intro:
        'Junto al lago Hawassa, la capital sidama ofrece una entrada suave al Rift con vida frente al agua, café cercano y ritmo tranquilo.',
      bestTime: 'Octubre – Mayo',
      duration: '1 – 2 días',
    },
    'wonchi-crater-lake': {
      name: 'Lago Cráter Wonchi',
      region: 'Oromia',
      tag: 'Paisaje Volcánico',
      teaser: 'Un lago azul de cráter rodeado de granjas, senderos de bosque y manantiales minerales.',
      intro:
        'Al oeste de Addis Abeba, la caldera de Wonchi ofrece lago de altura, islas y rutas rurales para un día activo o una escapada breve.',
      bestTime: 'Octubre – Mayo',
      duration: '1 – 2 días',
    },
    dorze: {
      name: 'Aldea Dorze',
      region: 'Tierras Altas de Gamo',
      tag: 'Cultura Viva',
      teaser: 'Tradiciones textiles de altura y notables casas de bambú sobre el Rift.',
      intro:
        'En las colinas frescas sobre Arba Minch, las comunidades dorze destacan por tejido, casas de bambú y alimentos del enset.',
      bestTime: 'Octubre – Marzo',
      duration: '1 día',
    },
    tiya: {
      name: 'Sitio Arqueológico de Tiya',
      region: 'Etiopía Central',
      tag: 'Patrimonio UNESCO',
      teaser: 'Estelas talladas que guardan preguntas antiguas en el campo al sur de Addis.',
      intro:
        'Tiya es un campo megalítico compacto pero importante, ligado a tradiciones funerarias y preguntas arqueológicas aún abiertas.',
      bestTime: 'Octubre – Mayo',
      duration: 'Medio día',
    },
    'debre-libanos': {
      name: 'Monasterio Debre Libanos',
      region: 'Oromia',
      tag: 'Patrimonio Sagrado',
      teaser: 'Historia monástica ortodoxa junto al dramático paisaje del desfiladero de Jemma.',
      intro:
        'Debre Libanos combina una de las historias monásticas más importantes de Etiopía con paisajes de garganta al norte de Addis Abeba.',
      bestTime: 'Octubre – Mayo',
      duration: '1 día',
    },
    'dire-dawa': {
      name: 'Dire Dawa',
      region: 'Etiopía Oriental',
      tag: 'Ciudad Ferroviaria',
      teaser: 'Una ciudad oriental de comercio y ferrocarril entre las tierras altas, Harar y Djibouti.',
      intro:
        'Dire Dawa conserva la memoria del ferrocarril, mercados activos y la cultura comercial que conecta el este etíope.',
      bestTime: 'Octubre – Febrero',
      duration: '1 día',
    },
    'adadi-mariam': {
      name: 'Iglesia Rupestre Adadi Mariam',
      region: 'Oromia',
      tag: 'Patrimonio Sagrado',
      teaser: 'Una iglesia ortodoxa excavada en roca viva en el campo al sur de Addis.',
      intro:
        'Adadi Mariam es una iglesia ortodoxa rupestre en funcionamiento, vinculada por tradición al rey Lalibela.',
      bestTime: 'Octubre – Mayo',
      duration: 'Medio día',
    },
  },
)

assignDestinationTranslations(
  'FR',
  {
    'destinationsPage.hero.eyebrow': 'Où Nous Voyageons',
    'destinationsPage.hero.title': 'Vingt lieux, et les routes entre eux',
    'destinationsPage.hero.lede':
      'Des églises creusées dans la roche à un lac de lave sous le niveau de la mer, voici vingt lieux que nos designers relient en voyages réfléchis à travers l’Éthiopie.',
    'destinationsPage.hero.imageAlt':
      'Église rupestre Bet Giyorgis à Lalibela, Éthiopie',
    'destinationsPage.meta.destinations': 'Destinations',
    'destinationsPage.meta.unesco': 'Sites UNESCO',
    'destinationsPage.meta.altitude': 'Amplitude d’altitude',
    'destinationsPage.meta.months': 'Meilleurs mois',
    'destinationsPage.meta.monthsValue': 'Oct – Mar',
    'destinationsPage.map.eyebrow': 'La Carte',
    'destinationsPage.map.title': 'Les régions autour desquelles nous créons les voyages',
    'destinationsPage.map.aside':
      'La plupart des itinéraires combinent trois ou quatre de ces régions. Dites-nous celles qui vous attirent et nous tracerons la route.',
    'destinationsPage.cta.title': 'Vous ne savez pas quelle Éthiopie est la vôtre ?',
    'destinationsPage.cta.text':
      'Envoyez-nous une phrase sur le voyage que vous imaginez : altitude, rythme, saison, et un designer reviendra avec deux ou trois routes à considérer.',
    'destinationDetail.meta.bestTime': 'Meilleure période',
    'destinationDetail.meta.stay': 'Séjour suggéré',
    'destinationDetail.meta.altitude': 'Altitude',
    'destinationDetail.meta.region': 'Région',
    'destinationDetail.why.eyebrow': 'Pourquoi Nous Y Allons',
    'destinationDetail.highlights': 'Temps Forts',
    'destinationDetail.combined.prefix': 'À combiner idéalement avec un séjour de',
    'destinationDetail.combined.middle': 'en voyageant',
    'destinationDetail.enquire': 'Demander à propos de',
    'destinationDetail.dossier.eyebrow': 'Dossier Destination',
    'destinationDetail.dossier.title': 'Une lecture plus profonde avant d’arriver',
    'destinationDetail.dossier.copy':
      'Un contexte de terrain concis sur la place de cette destination dans un itinéraire privé : ce qui la définit, comment bien la vivre et ce qu’il faut prévoir.',
    'destinationDetail.dossier.defines': 'Ce Qui La Définit',
    'destinationDetail.dossier.how': 'Comment La Vivre',
    'destinationDetail.dossier.notes': 'Notes de Planification',
    'destinationDetail.dossier.pairs': 'Se Combine Bien Avec',
    'destinationDetail.related.eyebrow': 'Voyages Incluant',
    'destinationDetail.related.title': 'Routes qui passent par ici',
    'destinationDetail.related.allTours': 'Tous les circuits',
    'destinationDetail.plan.eyebrow': 'Planifier Cette Destination',
    'destinationDetail.plan.titlePrefix': 'Intégrer',
    'destinationDetail.plan.titleSuffix': 'à votre voyage',
    'destinationDetail.plan.copy':
      'Rien ici n’est fixe. Dites-nous combien de temps vous avez et ce que vous voulez voir, et un designer dessinera la route, vols, guides et heures importantes compris.',
    'destinationDetail.also': 'À Considérer Aussi',
    'destinationDetail.cta.title': 'Parlez à quelqu’un qui y est allé cette saison',
    'destinationDetail.cta.text':
      'Nos designers parcourent eux-mêmes ces routes. Demandez les conditions de route, les dates de festival ou le lodge avec la meilleure vue : vous aurez une réponse directe.',
    'destinationDetail.cta.secondary': 'Toutes les Destinations',
    'destinationDetail.genericHow':
      'Vivez-la avec un guide local, assez de temps et une route privée adaptée à la météo, aux accès et à votre rythme.',
    'destinationDetail.genericHighlight.0': 'Guidage privé avec contexte local',
    'destinationDetail.genericHighlight.1': 'Rythme flexible et horaires soignés',
    'destinationDetail.genericHighlight.2': 'Accès responsable et respectueux',
    'destinationDetail.genericHighlight.3': 'Connexions naturelles avec d’autres régions',
    'destinationDetail.genericNote.0': 'La meilleure séquence dépend de la météo, des accès et des horaires locaux.',
    'destinationDetail.genericNote.1': 'L’étiquette locale et une tenue respectueuse comptent.',
    'destinationDetail.genericNote.2': 'Les routes privées permettent de meilleurs horaires et moins de précipitation.',
  },
  {
    lalibela: {
      name: 'Lalibela',
      region: 'Hautes Terres du Nord',
      tag: 'Patrimoine UNESCO',
      teaser: 'Onze églises creusées dans la roche vive, toujours habitées par la prière.',
      intro:
        'Une capitale médiévale où une ville sainte entière fut excavée de la montagne et où, huit siècles plus tard, la liturgie ne s’est jamais arrêtée.',
      bestTime: 'Octobre – Mars',
      duration: '2 – 3 jours',
    },
    'addis-ababa': {
      name: 'Addis-Abeba',
      region: 'Éthiopie Centrale',
      tag: 'Capitale',
      teaser: 'Musées, marchés et vie éthiopienne contemporaine à la porte du pays.',
      intro:
        'La capitale d’altitude de l’Éthiopie rassemble histoire ancienne, culture vivante et ville contemporaine ambitieuse au début de presque chaque voyage.',
      bestTime: 'Octobre – Mai',
      duration: '1 – 2 jours',
    },
    'simien-mountains': {
      name: 'Parc National des Montagnes du Simien',
      region: 'Hautes Terres du Nord',
      tag: 'Parc National',
      teaser: 'Un toit de l’Afrique où les geladas paissent au-dessus d’à-pics de deux mille mètres.',
      intro:
        'Pinnacles basaltiques, escarpements tombant dans les nuages et grandes troupes de primates marchant à vos côtés.',
      bestTime: 'Octobre – Avril',
      duration: '3 – 5 jours',
    },
    'danakil-depression': {
      name: 'Dépression du Danakil et Erta Ale',
      region: 'Basses Terres Afar',
      tag: 'Expédition',
      teaser: 'Le lieu habité le plus chaud de la Terre, peint de soufre et de sel.',
      intro:
        'Cent mètres sous le niveau de la mer : sources acides, lac de lave permanent et caravanes de sel presque inchangées depuis des siècles.',
      bestTime: 'Novembre – Février',
      duration: '3 – 4 jours',
    },
    'omo-valley': {
      name: 'Vallée de l’Omo',
      region: 'Rift du Sud',
      tag: 'Immersion Culturelle',
      teaser: 'Une mosaïque vivante de communautés qui façonnent cette terre depuis des millénaires.',
      intro:
        'Le bas Omo est l’une des régions les plus denses culturellement au monde et demande de voyager lentement, avec permission et respect.',
      bestTime: 'Juin – Septembre, Décembre – Mars',
      duration: '5 – 8 jours',
    },
    gondar: {
      name: 'Gondar',
      region: 'Hautes Terres du Nord',
      tag: 'Ville Impériale',
      teaser: 'Le Camelot de l’Afrique : palais, bains et plafonds peints d’un empire d’altitude.',
      intro:
        'Une capitale impériale du XVIIe siècle, faite de châteaux de pierre et de chapelles parfumées au cèdre, où Timkat remplit encore le bain royal.',
      bestTime: 'Octobre – Mars',
      duration: '1 – 2 jours',
    },
    axum: {
      name: 'Aksum',
      region: 'Tigray',
      tag: 'Capitale Antique',
      teaser: 'Obélisques de granit, tombes enfouies et lieu revendiqué du repos de l’Arche.',
      intro:
        'Le siège d’un empire marchand qui frappait sa propre monnaie et le centre spirituel de l’orthodoxie éthiopienne.',
      bestTime: 'Octobre – Mars',
      duration: '1 – 2 jours',
    },
    'lake-tana': {
      name: 'Bahir Dar, Lac Tana et Chutes du Nil Bleu',
      region: 'Amhara',
      tag: 'Voyage Lent',
      teaser: 'Monastères insulaires, bateaux de papyrus et source du Nil Bleu.',
      intro:
        'Le plus grand lac d’Éthiopie cache des monastères insulaires qui protègent des manuscrits enluminés depuis des siècles.',
      bestTime: 'Septembre – Mars',
      duration: '1 – 2 jours',
    },
    'bale-mountains': {
      name: 'Parc National des Montagnes Bale',
      region: 'Hautes Terres d’Oromia',
      tag: 'Faune',
      teaser: 'Moorland afro-alpin abritant le canidé le plus rare du monde : le loup d’Éthiopie.',
      intro:
        'Le plateau de Sanetti est le plus vaste habitat afro-alpin d’Afrique et le meilleur lieu pour voir un loup sauvage chasser.',
      bestTime: 'Novembre – Avril',
      duration: '3 – 4 jours',
    },
    harar: {
      name: 'Harar Jugol',
      region: 'Éthiopie Orientale',
      tag: 'Patrimoine UNESCO',
      teaser: 'Une ville fortifiée de maisons peintes, ruelles étroites et siècles d’érudition islamique.',
      intro:
        'Derrière les anciennes portes de Harar, mosquées, marchés et maisons harari forment l’une des grandes villes historiques vivantes d’Afrique.',
      bestTime: 'Octobre – Mars',
      duration: '2 – 3 jours',
    },
    'arba-minch': {
      name: 'Arba Minch',
      region: 'Éthiopie du Sud',
      tag: 'Lacs et Faune',
      teaser: 'Un escarpement vert au-dessus de deux lacs du Rift et des forêts de Nech Sar.',
      intro:
        'Porte naturelle du sud éthiopien, dominant les lacs Abaya et Chamo avec faune, zones humides et communautés d’altitude à proximité.',
      bestTime: 'Octobre – Mars',
      duration: '2 – 3 jours',
    },
    konso: {
      name: 'Paysage Culturel Konso',
      region: 'Éthiopie du Sud',
      tag: 'Patrimoine UNESCO',
      teaser: 'Villages de pierre fortifiés et collines en terrasses façonnées par des générations d’agriculteurs.',
      intro:
        'Les villages fortifiés, terrasses agricoles et traditions communautaires de Konso révèlent un paysage culturel affiné pendant des siècles.',
      bestTime: 'Juin – Mars',
      duration: '1 – 2 jours',
    },
    'sof-omar-cave': {
      name: 'Grotte de Sof Omar',
      region: 'Oromia',
      tag: 'Merveille Géologique',
      teaser: 'Un monde calcaire creusé par la rivière, avec chambres immenses, piliers et mémoire sacrée.',
      intro:
        'La rivière Web traverse un vaste système de grottes calcaires où galeries spectaculaires et mémoire spirituelle se rencontrent.',
      bestTime: 'Octobre – Juin',
      duration: '1 jour',
    },
    hawassa: {
      name: 'Hawassa',
      region: 'Sidama',
      tag: 'Vallée du Rift',
      teaser: 'Une ville lacustre détendue, entre marché aux poissons, jardins et abondante avifaune.',
      intro:
        'Au bord du lac Hawassa, la capitale sidama offre une entrée douce dans le Rift par la vie au bord de l’eau, le café et un rythme plus léger.',
      bestTime: 'Octobre – Mai',
      duration: '1 – 2 jours',
    },
    'wonchi-crater-lake': {
      name: 'Lac de Cratère Wonchi',
      region: 'Oromia',
      tag: 'Paysage Volcanique',
      teaser: 'Un lac de cratère bleu entouré de fermes, sentiers forestiers et sources minérales.',
      intro:
        'À l’ouest d’Addis-Abeba, la caldeira de Wonchi offre lac d’altitude, îlots et chemins ruraux pour une journée active ou une courte échappée.',
      bestTime: 'Octobre – Mai',
      duration: '1 – 2 jours',
    },
    dorze: {
      name: 'Village Dorze',
      region: 'Hautes Terres Gamo',
      tag: 'Culture Vivante',
      teaser: 'Traditions de tissage d’altitude et remarquables maisons de bambou au-dessus du Rift.',
      intro:
        'Dans les collines fraîches au-dessus d’Arba Minch, les communautés dorze sont connues pour le tissage, les maisons de bambou et la cuisine à base d’enset.',
      bestTime: 'Octobre – Mars',
      duration: '1 jour',
    },
    tiya: {
      name: 'Site Archéologique de Tiya',
      region: 'Éthiopie Centrale',
      tag: 'Patrimoine UNESCO',
      teaser: 'Des stèles sculptées gardant d’anciennes questions dans la campagne au sud d’Addis.',
      intro:
        'Tiya est un champ mégalithique compact mais important, lié à des traditions funéraires et à des questions archéologiques encore ouvertes.',
      bestTime: 'Octobre – Mai',
      duration: 'Demi-journée',
    },
    'debre-libanos': {
      name: 'Monastère de Debre Libanos',
      region: 'Oromia',
      tag: 'Patrimoine Sacré',
      teaser: 'Histoire monastique orthodoxe et paysage spectaculaire des gorges de Jemma.',
      intro:
        'Debre Libanos associe l’une des grandes histoires monastiques d’Éthiopie aux paysages de gorge au nord d’Addis-Abeba.',
      bestTime: 'Octobre – Mai',
      duration: '1 jour',
    },
    'dire-dawa': {
      name: 'Dire Dawa',
      region: 'Éthiopie Orientale',
      tag: 'Ville Ferroviaire',
      teaser: 'Une ville orientale de commerce et de chemin de fer entre hautes terres, Harar et Djibouti.',
      intro:
        'Dire Dawa conserve mémoire ferroviaire, marchés actifs et culture commerçante reliant l’est éthiopien.',
      bestTime: 'Octobre – Février',
      duration: '1 jour',
    },
    'adadi-mariam': {
      name: 'Église Rupestre Adadi Mariam',
      region: 'Oromia',
      tag: 'Patrimoine Sacré',
      teaser: 'Une église orthodoxe creusée dans la roche vive dans la campagne au sud d’Addis.',
      intro:
        'Adadi Mariam est une église orthodoxe rupestre toujours active, que la tradition associe au roi Lalibela.',
      bestTime: 'Octobre – Mai',
      duration: 'Demi-journée',
    },
  },
)

Object.assign(dictionaries.ES, {
  'destinationRegion.Northern Highlands': 'Tierras Altas del Norte',
  'destinationRegion.Central Ethiopia': 'Etiopía Central',
  'destinationRegion.Afar Lowlands': 'Tierras Bajas de Afar',
  'destinationRegion.Southern Rift': 'Rift del Sur',
  'destinationRegion.Tigray': 'Tigray',
  'destinationRegion.Amhara': 'Amhara',
  'destinationRegion.Oromia Highlands': 'Tierras Altas de Oromia',
  'destinationRegion.Eastern Ethiopia': 'Etiopía Oriental',
  'destinationRegion.Southern Ethiopia': 'Etiopía del Sur',
  'destinationRegion.Oromia': 'Oromia',
  'destinationRegion.Sidama': 'Sidama',
  'destinationRegion.Gamo Highlands': 'Tierras Altas de Gamo',
})

Object.assign(dictionaries.FR, {
  'destinationRegion.Northern Highlands': 'Hautes Terres du Nord',
  'destinationRegion.Central Ethiopia': 'Éthiopie Centrale',
  'destinationRegion.Afar Lowlands': 'Basses Terres Afar',
  'destinationRegion.Southern Rift': 'Rift du Sud',
  'destinationRegion.Tigray': 'Tigray',
  'destinationRegion.Amhara': 'Amhara',
  'destinationRegion.Oromia Highlands': 'Hautes Terres d’Oromia',
  'destinationRegion.Eastern Ethiopia': 'Éthiopie Orientale',
  'destinationRegion.Southern Ethiopia': 'Éthiopie du Sud',
  'destinationRegion.Oromia': 'Oromia',
  'destinationRegion.Sidama': 'Sidama',
  'destinationRegion.Gamo Highlands': 'Hautes Terres Gamo',
})

assignDestinationTranslations(
  'DE',
  {
    'destinationsPage.hero.eyebrow': 'Wohin Wir Reisen',
    'destinationsPage.hero.title': 'Zwanzig Orte und die Routen dazwischen',
    'destinationsPage.hero.lede':
      'Von in den Fels gehauenen Kirchen bis zu einem Lavasee unter dem Meeresspiegel: Diese zwanzig Orte verbinden unsere Designer zu durchdachten Reisen durch Äthiopien.',
    'destinationsPage.hero.imageAlt': 'Felsenkirche Bet Giyorgis in Lalibela, Äthiopien',
    'destinationsPage.meta.destinations': 'Reiseziele',
    'destinationsPage.meta.unesco': 'UNESCO-Stätten',
    'destinationsPage.meta.altitude': 'Höhenbereich',
    'destinationsPage.meta.months': 'Beste Monate',
    'destinationsPage.meta.monthsValue': 'Okt – Mär',
    'destinationsPage.map.eyebrow': 'Die Karte',
    'destinationsPage.map.title': 'Regionen, um die wir Reisen bauen',
    'destinationsPage.map.aside':
      'Die meisten Routen kombinieren drei oder vier dieser Regionen. Sagen Sie uns, welche Sie anziehen, und wir zeichnen die Verbindung.',
    'destinationsPage.cta.title': 'Nicht sicher, welches Äthiopien Ihres ist?',
    'destinationsPage.cta.text':
      'Senden Sie uns einen Satz zu Ihrer Reiseidee: Höhe, Tempo, Jahreszeit. Ein Designer meldet sich mit zwei oder drei sinnvollen Routen.',
    'destinationDetail.meta.bestTime': 'Beste Reisezeit',
    'destinationDetail.meta.stay': 'Empfohlener Aufenthalt',
    'destinationDetail.meta.altitude': 'Höhe',
    'destinationDetail.meta.region': 'Region',
    'destinationDetail.why.eyebrow': 'Warum Wir Hinreisen',
    'destinationDetail.highlights': 'Höhepunkte',
    'destinationDetail.combined.prefix': 'Am besten kombiniert mit einem Aufenthalt von',
    'destinationDetail.combined.middle': 'bei Reisezeit',
    'destinationDetail.enquire': 'Anfragen zu',
    'destinationDetail.dossier.eyebrow': 'Destinations-Dossier',
    'destinationDetail.dossier.title': 'Eine tiefere Einordnung vor der Ankunft',
    'destinationDetail.dossier.copy':
      'Kompakter Feldkontext dazu, wie dieses Ziel in einer Privatreise funktioniert: was es prägt, wie man es gut erlebt und was vorher geplant werden muss.',
    'destinationDetail.dossier.defines': 'Was Es Prägt',
    'destinationDetail.dossier.how': 'Wie Man Es Erlebt',
    'destinationDetail.dossier.notes': 'Planungshinweise',
    'destinationDetail.dossier.pairs': 'Passt Gut Zu',
    'destinationDetail.related.eyebrow': 'Reisen Mit',
    'destinationDetail.related.title': 'Routen, die hier vorbeiführen',
    'destinationDetail.related.allTours': 'Alle Touren',
    'destinationDetail.plan.eyebrow': 'Dieses Ziel Planen',
    'destinationDetail.plan.titlePrefix': 'Bauen Sie',
    'destinationDetail.plan.titleSuffix': 'in Ihre Reise ein',
    'destinationDetail.plan.copy':
      'Nichts hier ist fest. Sagen Sie uns, wie lange Sie haben und was Sie sehen möchten; ein Designer zeichnet die Route mit Flügen, Guides und wichtigen Zeiten.',
    'destinationDetail.also': 'Auch Empfehlenswert',
    'destinationDetail.cta.title': 'Sprechen Sie mit jemandem, der diese Saison dort war',
    'destinationDetail.cta.text':
      'Unsere Designer bereisen diese Routen selbst. Fragen Sie nach Straßen, Festivaldaten oder dem Lodge-Ausblick; Sie bekommen eine klare Antwort.',
    'destinationDetail.cta.secondary': 'Alle Reiseziele',
    'destinationDetail.genericHow':
      'Erleben Sie es mit lokalem Guide, genug Zeit und einer privaten Route, die Wetter, Zugang und Tempo berücksichtigt.',
    'destinationDetail.genericHighlight.0': 'Private Führung mit lokalem Kontext',
    'destinationDetail.genericHighlight.1': 'Flexibles Tempo und sorgfältige Zeiten',
    'destinationDetail.genericHighlight.2': 'Respektvoller und verantwortlicher Zugang',
    'destinationDetail.genericHighlight.3': 'Natürliche Verbindungen zu anderen Regionen',
    'destinationDetail.genericNote.0': 'Die beste Reihenfolge hängt von Wetter, Zugang und lokalen Zeiten ab.',
    'destinationDetail.genericNote.1': 'Lokale Etikette und respektvolle Kleidung zählen.',
    'destinationDetail.genericNote.2': 'Private Routen ermöglichen bessere Zeiten und weniger Eile.',
    'destinationRegion.Northern Highlands': 'Nördliches Hochland',
    'destinationRegion.Central Ethiopia': 'Zentraläthiopien',
    'destinationRegion.Afar Lowlands': 'Afar-Tiefland',
    'destinationRegion.Southern Rift': 'Südlicher Rift',
    'destinationRegion.Tigray': 'Tigray',
    'destinationRegion.Amhara': 'Amhara',
    'destinationRegion.Oromia Highlands': 'Oromia-Hochland',
    'destinationRegion.Eastern Ethiopia': 'Ostäthiopien',
    'destinationRegion.Southern Ethiopia': 'Südäthiopien',
    'destinationRegion.Oromia': 'Oromia',
    'destinationRegion.Sidama': 'Sidama',
    'destinationRegion.Gamo Highlands': 'Gamo-Hochland',
  },
  {
    lalibela: { name: 'Lalibela', region: 'Nördliches Hochland', tag: 'UNESCO-Welterbe', teaser: 'Elf Kirchen, nach unten in lebenden Fels gehauen und bis heute von Gebet erfüllt.', intro: 'Eine mittelalterliche Hauptstadt, in der eine ganze heilige Stadt aus dem Berg gegraben wurde und die Liturgie acht Jahrhunderte später nie aufgehört hat.', bestTime: 'Oktober – März', duration: '2 – 3 Tage' },
    'addis-ababa': { name: 'Addis Abeba', region: 'Zentraläthiopien', tag: 'Hauptstadt', teaser: 'Museen, Märkte und modernes äthiopisches Leben am Tor des Landes.', intro: 'Äthiopiens Hochlandhauptstadt verbindet alte Geschichte, lebendige Kultur und eine ehrgeizige Gegenwartsstadt am Beginn fast jeder Reise.', bestTime: 'Oktober – Mai', duration: '1 – 2 Tage' },
    'simien-mountains': { name: 'Simien-Mountains-Nationalpark', region: 'Nördliches Hochland', tag: 'Nationalpark', teaser: 'Ein Dach Afrikas, wo Geladas über zweitausend Meter tiefen Abbrüchen grasen.', intro: 'Basaltzinnen, Escarpments, die in Wolken fallen, und große Primatengruppen, neben denen man wirklich wandert.', bestTime: 'Oktober – April', duration: '3 – 5 Tage' },
    'danakil-depression': { name: 'Danakil-Depression und Erta Ale', region: 'Afar-Tiefland', tag: 'Expedition', teaser: 'Der heißeste bewohnte Ort der Erde, gemalt aus Schwefel und Salz.', intro: 'Hundert Meter unter dem Meeresspiegel: Säurequellen, ein permanenter Lavasee und Salzkarawanen, die seit Jahrhunderten kaum verändert sind.', bestTime: 'November – Februar', duration: '3 – 4 Tage' },
    'omo-valley': { name: 'Omo-Tal', region: 'Südlicher Rift', tag: 'Kulturelle Immersion', teaser: 'Ein lebendiges Mosaik von Gemeinschaften, die dieses Land seit Jahrtausenden prägen.', intro: 'Das untere Omo ist eine der kulturell dichtesten Regionen der Erde und verlangt langsames Reisen mit Erlaubnis und Respekt.', bestTime: 'Juni – September, Dezember – März', duration: '5 – 8 Tage' },
    gondar: { name: 'Gondar', region: 'Nördliches Hochland', tag: 'Kaiserstadt', teaser: 'Das Camelot Afrikas: Paläste, Bäder und bemalte Decken eines Hochlandreiches.', intro: 'Eine kaiserliche Hauptstadt des 17. Jahrhunderts mit Steinburgen und zedernaromatischen Kapellen, deren königliches Bad zu Timkat bis heute gefüllt wird.', bestTime: 'Oktober – März', duration: '1 – 2 Tage' },
    axum: { name: 'Aksum', region: 'Tigray', tag: 'Antike Hauptstadt', teaser: 'Granitobelisken, versunkene Gräber und der beanspruchte Ruheort der Bundeslade.', intro: 'Sitz eines Handelsreiches mit eigener Münzprägung und spirituelles Zentrum der äthiopischen Orthodoxie.', bestTime: 'Oktober – März', duration: '1 – 2 Tage' },
    'lake-tana': { name: 'Bahir Dar, Tana-See und Blaue-Nil-Fälle', region: 'Amhara', tag: 'Langsames Reisen', teaser: 'Inselklöster, Papyrusboote und die Quelle des Blauen Nils.', intro: 'Äthiopiens größter See verbirgt Inselklöster, die seit Jahrhunderten illuminierte Handschriften bewahren.', bestTime: 'September – März', duration: '1 – 2 Tage' },
    'bale-mountains': { name: 'Bale-Mountains-Nationalpark', region: 'Oromia-Hochland', tag: 'Wildtiere', teaser: 'Afro-alpine Moorlandschaft mit dem seltensten Caniden der Erde: dem äthiopischen Wolf.', intro: 'Das Sanetti-Plateau ist Afrikas größtes afro-alpines Habitat und der beste Ort, einen wilden Wolf bei der Jagd zu sehen.', bestTime: 'November – April', duration: '3 – 4 Tage' },
    harar: { name: 'Harar Jugol', region: 'Ostäthiopien', tag: 'UNESCO-Welterbe', teaser: 'Eine ummauerte Stadt aus bemalten Häusern, engen Gassen und Jahrhunderten islamischer Gelehrsamkeit.', intro: 'Hinter Harars alten Toren bilden Moscheen, Märkte und Harari-Häuser eine der bemerkenswertesten lebendigen historischen Städte Afrikas.', bestTime: 'Oktober – März', duration: '2 – 3 Tage' },
    'arba-minch': { name: 'Arba Minch', region: 'Südäthiopien', tag: 'Seen und Wildtiere', teaser: 'Ein grüner Escarpment über zwei Rift-Seen und den Wäldern von Nech Sar.', intro: 'Das natürliche Tor nach Südäthiopien mit Blick auf Abaya und Chamo, Wildtieren, Feuchtgebieten und nahen Hochlandgemeinschaften.', bestTime: 'Oktober – März', duration: '2 – 3 Tage' },
    konso: { name: 'Konso-Kulturlandschaft', region: 'Südäthiopien', tag: 'UNESCO-Welterbe', teaser: 'Steinummauerte Siedlungen und Terrassenhügel, geformt von Generationen erfahrener Bauern.', intro: 'Konsos befestigte Dörfer, Terrassen und Gemeinschaftstraditionen zeigen eine über Jahrhunderte verfeinerte Kulturlandschaft.', bestTime: 'Juni – März', duration: '1 – 2 Tage' },
    'sof-omar-cave': { name: 'Sof-Omar-Höhle', region: 'Oromia', tag: 'Geologisches Wunder', teaser: 'Eine vom Fluss geschaffene Kalksteinwelt mit großen Hallen, Säulen und spiritueller Erinnerung.', intro: 'Der Web-Fluss durchquert ein riesiges Kalksteinhöhlensystem, dessen Hallen geologische Dramatik und tiefe spirituelle Bedeutung tragen.', bestTime: 'Oktober – Juni', duration: '1 Tag' },
    hawassa: { name: 'Hawassa', region: 'Sidama', tag: 'Rift Valley', teaser: 'Eine entspannte Seestadt mit Fischmärkten, Gärten und reicher Vogelwelt.', intro: 'Am Hawassa-See bietet die Sidama-Hauptstadt einen leichten Einstieg ins Rift Valley mit Uferleben, Kaffeezugang und ruhigem Tempo.', bestTime: 'Oktober – Mai', duration: '1 – 2 Tage' },
    'wonchi-crater-lake': { name: 'Wonchi-Kratersee', region: 'Oromia', tag: 'Vulkanlandschaft', teaser: 'Ein blauer Kratersee, umgeben von Farmen, Waldwegen und Mineralquellen.', intro: 'Westlich von Addis Abeba bietet Wonchis Caldera einen Hochlandsee, Inseln und ländliche Wege für einen aktiven Tag oder kurzen Ausflug.', bestTime: 'Oktober – Mai', duration: '1 – 2 Tage' },
    dorze: { name: 'Dorze-Dorf', region: 'Gamo-Hochland', tag: 'Lebendige Kultur', teaser: 'Hochland-Webtraditionen und bemerkenswerte Bambushäuser über dem Rift Valley.', intro: 'In den kühlen Hügeln oberhalb von Arba Minch sind Dorze-Gemeinschaften für Weberei, Bambushäuser und Enset-Speisen bekannt.', bestTime: 'Oktober – März', duration: '1 Tag' },
    tiya: { name: 'Archäologische Stätte Tiya', region: 'Zentraläthiopien', tag: 'UNESCO-Welterbe', teaser: 'Gemeißelte Stelen, die alte Fragen in der Landschaft südlich von Addis bewahren.', intro: 'Tiya ist ein kompaktes, wichtiges Megalithfeld, verbunden mit Bestattungstraditionen und offenen archäologischen Fragen.', bestTime: 'Oktober – Mai', duration: 'Halber Tag' },
    'debre-libanos': { name: 'Debre-Libanos-Kloster', region: 'Oromia', tag: 'Heiliges Erbe', teaser: 'Orthodoxe Klostergeschichte neben der dramatischen Landschaft der Jemma-Schlucht.', intro: 'Debre Libanos verbindet eine der großen Klostergeschichten Äthiopiens mit Schluchtlandschaften nördlich von Addis Abeba.', bestTime: 'Oktober – Mai', duration: '1 Tag' },
    'dire-dawa': { name: 'Dire Dawa', region: 'Ostäthiopien', tag: 'Eisenbahnstadt', teaser: 'Eine östliche Handels- und Eisenbahnstadt zwischen Hochland, Harar und Dschibuti.', intro: 'Dire Dawa bewahrt Eisenbahnerbe, aktive Märkte und die Handelskultur, die den äthiopischen Osten verbindet.', bestTime: 'Oktober – Februar', duration: '1 Tag' },
    'adadi-mariam': { name: 'Felsenkirche Adadi Mariam', region: 'Oromia', tag: 'Heiliges Erbe', teaser: 'Eine aktive orthodoxe Felsenkirche in der Landschaft südlich von Addis.', intro: 'Adadi Mariam ist eine aktive orthodoxe Felsenkirche, die der Tradition nach mit König Lalibela verbunden ist.', bestTime: 'Oktober – Mai', duration: 'Halber Tag' },
  },
)

assignDestinationTranslations(
  'ZH',
  {
    'destinationsPage.hero.eyebrow': '我们的旅行目的地',
    'destinationsPage.hero.title': '二十个地点，以及连接它们的路线',
    'destinationsPage.hero.lede':
      '从向下凿入岩石的教堂，到海平面以下燃烧的熔岩湖，这二十个地点被我们的设计师串联成细致的埃塞俄比亚旅程。',
    'destinationsPage.hero.imageAlt': '埃塞俄比亚 Lalibela 的 Bet Giyorgis 岩石教堂',
    'destinationsPage.meta.destinations': '目的地',
    'destinationsPage.meta.unesco': 'UNESCO 遗产',
    'destinationsPage.meta.altitude': '海拔范围',
    'destinationsPage.meta.months': '最佳月份',
    'destinationsPage.meta.monthsValue': '10月 – 3月',
    'destinationsPage.map.eyebrow': '地图',
    'destinationsPage.map.title': '我们围绕这些地区设计旅程',
    'destinationsPage.map.aside':
      '多数行程会组合其中三到四个地区。告诉我们哪些地方吸引您，我们会画出合适路线。',
    'destinationsPage.cta.title': '不确定哪一种埃塞俄比亚适合您？',
    'destinationsPage.cta.text':
      '用一句话告诉我们您想象的旅程：海拔、节奏、季节。旅行设计师会回复两三条值得考虑的路线。',
    'destinationDetail.meta.bestTime': '最佳时间',
    'destinationDetail.meta.stay': '建议停留',
    'destinationDetail.meta.altitude': '海拔',
    'destinationDetail.meta.region': '地区',
    'destinationDetail.why.eyebrow': '为何前往',
    'destinationDetail.highlights': '亮点',
    'destinationDetail.combined.prefix': '建议停留',
    'destinationDetail.combined.middle': '旅行时间',
    'destinationDetail.enquire': '咨询',
    'destinationDetail.dossier.eyebrow': '目的地档案',
    'destinationDetail.dossier.title': '抵达前更深入了解',
    'destinationDetail.dossier.copy':
      '简明说明这个目的地如何融入私人行程：它的核心、如何更好体验，以及抵达前需要规划什么。',
    'destinationDetail.dossier.defines': '它的核心',
    'destinationDetail.dossier.how': '如何体验',
    'destinationDetail.dossier.notes': '规划提示',
    'destinationDetail.dossier.pairs': '适合搭配',
    'destinationDetail.related.eyebrow': '包含',
    'destinationDetail.related.title': '经过这里的路线',
    'destinationDetail.related.allTours': '所有行程',
    'destinationDetail.plan.eyebrow': '规划此目的地',
    'destinationDetail.plan.titlePrefix': '把',
    'destinationDetail.plan.titleSuffix': '加入您的旅程',
    'destinationDetail.plan.copy':
      '这里没有固定模板。告诉我们您的时间和想看的地方，设计师会规划路线，包括航班、向导和关键时段。',
    'destinationDetail.also': '也可考虑',
    'destinationDetail.cta.title': '和本季去过那里的人聊一聊',
    'destinationDetail.cta.text':
      '我们的设计师亲自走这些路线。询问道路、节庆日期或哪家 lodge 景色更好，您会得到直接回答。',
    'destinationDetail.cta.secondary': '所有目的地',
    'destinationDetail.genericHow':
      '建议配合本地向导、充足时间和私人路线，并根据天气、通行和节奏调整。',
    'destinationDetail.genericHighlight.0': '带本地背景的私人向导',
    'destinationDetail.genericHighlight.1': '灵活节奏与精心安排的时间',
    'destinationDetail.genericHighlight.2': '负责任且尊重当地的访问',
    'destinationDetail.genericHighlight.3': '自然连接其他地区',
    'destinationDetail.genericNote.0': '最佳顺序取决于天气、通行和当地开放时间。',
    'destinationDetail.genericNote.1': '当地礼仪和得体穿着很重要。',
    'destinationDetail.genericNote.2': '私人路线能带来更好的时间安排和更少匆忙。',
    'destinationRegion.Northern Highlands': '北部高原',
    'destinationRegion.Central Ethiopia': '埃塞俄比亚中部',
    'destinationRegion.Afar Lowlands': '阿法尔低地',
    'destinationRegion.Southern Rift': '南部裂谷',
    'destinationRegion.Tigray': '提格雷',
    'destinationRegion.Amhara': '阿姆哈拉',
    'destinationRegion.Oromia Highlands': '奥罗米亚高原',
    'destinationRegion.Eastern Ethiopia': '埃塞俄比亚东部',
    'destinationRegion.Southern Ethiopia': '埃塞俄比亚南部',
    'destinationRegion.Oromia': '奥罗米亚',
    'destinationRegion.Sidama': '锡达马',
    'destinationRegion.Gamo Highlands': '加莫高原',
  },
  {
    lalibela: { name: 'Lalibela', region: '北部高原', tag: 'UNESCO 遗产', teaser: '十一座向下凿入活岩的教堂，至今仍充满祈祷。', intro: '一座中世纪圣城从山体中被整体挖掘出来，八百年后礼拜仍未停止。', bestTime: '10月 – 3月', duration: '2 – 3 天' },
    'addis-ababa': { name: 'Addis Ababa', region: '埃塞俄比亚中部', tag: '首都城市', teaser: '博物馆、市场和现代埃塞俄比亚生活，是进入国家的门户。', intro: '埃塞俄比亚高原首都把古老历史、鲜活文化和现代城市雄心结合在几乎每段旅程的起点。', bestTime: '10月 – 5月', duration: '1 – 2 天' },
    'simien-mountains': { name: 'Simien 山脉国家公园', region: '北部高原', tag: '国家公园', teaser: '非洲屋脊，狮尾狒狒在两千米落差之上觅食。', intro: '玄武岩尖峰、跌入云层的断崖，以及可以并肩行走的大型灵长类群落。', bestTime: '10月 – 4月', duration: '3 – 5 天' },
    'danakil-depression': { name: 'Danakil 洼地与 Erta Ale', region: '阿法尔低地', tag: '探险', teaser: '地球上最炎热的有人居住之地，被硫磺与盐染色。', intro: '海平面下一百米：酸性泉、永久熔岩湖和数百年来几乎未变的盐队。', bestTime: '11月 – 2月', duration: '3 – 4 天' },
    'omo-valley': { name: '奥莫河谷', region: '南部裂谷', tag: '文化沉浸', teaser: '由多个世代塑造土地的社区组成的鲜活马赛克。', intro: '下奥莫是世界上文化密度最高的地区之一，需要慢行、许可与尊重。', bestTime: '6月 – 9月，12月 – 3月', duration: '5 – 8 天' },
    gondar: { name: 'Gondar', region: '北部高原', tag: '帝国城市', teaser: '非洲的 Camelot：高原帝国的宫殿、浴池和彩绘天花板。', intro: '十七世纪帝国首都，有石砌城堡和雪松气息的礼拜堂，Timkat 仍会注满皇家浴池。', bestTime: '10月 – 3月', duration: '1 – 2 天' },
    axum: { name: 'Aksum', region: '提格雷', tag: '古都', teaser: '花岗岩方尖碑、地下墓穴以及传说中的约柜安放之地。', intro: '一个曾铸造自己货币的贸易帝国所在地，也是埃塞俄比亚东正教精神中心。', bestTime: '10月 – 3月', duration: '1 – 2 天' },
    'lake-tana': { name: 'Bahir Dar、Tana 湖与蓝尼罗河瀑布', region: '阿姆哈拉', tag: '慢旅行', teaser: '岛上修道院、纸莎草船和蓝尼罗河源头。', intro: '埃塞俄比亚最大湖泊隐藏着岛上修道院，它们数百年来守护着彩绘手稿。', bestTime: '9月 – 3月', duration: '1 – 2 天' },
    'bale-mountains': { name: 'Bale 山脉国家公园', region: '奥罗米亚高原', tag: '野生动物', teaser: '非洲高山草甸，栖息着世界上最稀有的犬科动物：埃塞俄比亚狼。', intro: 'Sanetti 高原是非洲最大的非洲高山生境，也是观察野生狼捕猎的最佳地点。', bestTime: '11月 – 4月', duration: '3 – 4 天' },
    harar: { name: 'Harar Jugol', region: '埃塞俄比亚东部', tag: 'UNESCO 遗产', teaser: '一座由彩绘房屋、狭窄巷道和数百年伊斯兰学术构成的城墙城市。', intro: '在 Harar 古门之后，清真寺、市场和 Harari 家宅组成非洲最重要的活态历史城市之一。', bestTime: '10月 – 3月', duration: '2 – 3 天' },
    'arba-minch': { name: 'Arba Minch', region: '埃塞俄比亚南部', tag: '湖泊与野生动物', teaser: '绿色断崖俯瞰 Rift 双湖和 Nech Sar 森林。', intro: '南埃塞俄比亚的自然门户，俯瞰 Abaya 与 Chamo 湖，靠近湿地、野生动物和高地社区。', bestTime: '10月 – 3月', duration: '2 – 3 天' },
    konso: { name: 'Konso 文化景观', region: '埃塞俄比亚南部', tag: 'UNESCO 遗产', teaser: '石墙村落和梯田山坡，由几代熟练农人塑造。', intro: 'Konso 的防御村落、农业梯田和社区传统展现了历经数百年 refinement 的文化景观。', bestTime: '6月 – 3月', duration: '1 – 2 天' },
    'sof-omar-cave': { name: 'Sof Omar 洞穴', region: '奥罗米亚', tag: '地质奇观', teaser: '河流切割出的石灰岩世界，有巨大洞厅、石柱和神圣记忆。', intro: 'Web 河穿过庞大的石灰岩洞穴系统，回声廊道同时承载地质震撼与深层精神意义。', bestTime: '10月 – 6月', duration: '1 天' },
    hawassa: { name: 'Hawassa', region: '锡达马', tag: '裂谷湖区', teaser: '轻松的湖滨城市，有鱼市、花园和丰富鸟类。', intro: '位于 Hawassa 湖畔的 Sidama 首府，以湖滨生活、附近咖啡产区和更慢节奏介绍 Rift Valley。', bestTime: '10月 – 5月', duration: '1 – 2 天' },
    'wonchi-crater-lake': { name: 'Wonchi 火山口湖', region: '奥罗米亚', tag: '火山景观', teaser: '蓝色火山口湖，被农田、森林小路和矿泉环绕。', intro: 'Addis Ababa 以西的 Wonchi 火山口拥有高地湖泊、小岛和乡村步道，适合主动探索的一天或短途逃离。', bestTime: '10月 – 5月', duration: '1 – 2 天' },
    dorze: { name: 'Dorze 村', region: '加莫高原', tag: '活态文化', teaser: 'Rift Valley 之上的高地织造传统和独特竹屋。', intro: '在 Arba Minch 上方凉爽山地，Dorze 社区以织造、高竹屋和 enset 食物传统闻名。', bestTime: '10月 – 3月', duration: '1 天' },
    tiya: { name: 'Tiya 考古遗址', region: '埃塞俄比亚中部', tag: 'UNESCO 遗产', teaser: 'Addis 以南田野中的雕刻立石，保留着古老问题。', intro: 'Tiya 是紧凑而重要的巨石立柱遗址，与葬礼传统和仍未完全解答的考古问题相关。', bestTime: '10月 – 5月', duration: '半天' },
    'debre-libanos': { name: 'Debre Libanos 修道院', region: '奥罗米亚', tag: '神圣遗产', teaser: '东正教修道院历史与 Addis 北部 Jemma 峡谷景观相遇。', intro: 'Debre Libanos 把埃塞俄比亚重要修道院历史与 Addis Ababa 北部壮丽峡谷结合在一起。', bestTime: '10月 – 5月', duration: '1 天' },
    'dire-dawa': { name: 'Dire Dawa', region: '埃塞俄比亚东部', tag: '铁路城市', teaser: '位于高原、Harar 与 Djibouti 路线之间的东部贸易和铁路城市。', intro: 'Dire Dawa 保留铁路遗产、活跃市场和连接埃塞俄比亚东部的商贸文化。', bestTime: '10月 – 2月', duration: '1 天' },
    'adadi-mariam': { name: 'Adadi Mariam 岩石教堂', region: '奥罗米亚', tag: '神圣遗产', teaser: 'Addis 以南乡村中的一座仍在使用的东正教岩石教堂。', intro: 'Adadi Mariam 是一座仍在使用的东正教岩石教堂，传统上常与 Lalibela 国王联系在一起。', bestTime: '10月 – 5月', duration: '半天' },
  },
)

Object.assign(dictionaries.ES, {
  'destinationPair.Gondar': 'Gondar',
  'destinationPair.Aksum': 'Aksum',
  'destinationPair.Axum': 'Aksum',
  'destinationPair.Simien Mountains': 'Montañas Simien',
  'destinationPair.Debre Libanos': 'Debre Libanos',
  'destinationPair.Wonchi Crater Lake': 'Lago de Cráter Wonchi',
  'destinationPair.Tiya': 'Tiya',
  'destinationPair.Lake Tana': 'Lago Tana',
  'destinationPair.Historic North': 'Norte Histórico',
  'destinationPair.Gheralta': 'Gheralta',
  'destinationPair.Bahir Dar': 'Bahir Dar',
  'destinationPair.Sof Omar Cave': 'Cueva de Sof Omar',
  'destinationPair.Hawassa': 'Hawassa',
  'destinationPair.Addis Ababa': 'Addis Abeba',
  'destinationPair.Dire Dawa': 'Dire Dawa',
  'destinationPair.Aweday': 'Aweday',
  'destinationPair.Eastern Ethiopia': 'Etiopía Oriental',
  'destinationPair.Arba Minch': 'Arba Minch',
  'destinationPair.Dorze': 'Dorze',
  'destinationPair.Omo Valley': 'Valle del Omo',
  'destinationPair.Bale Mountains': 'Montañas Bale',
  'destinationPair.Dinsho': 'Dinsho',
  'destinationPair.Sanetti Plateau': 'Meseta de Sanetti',
  'destinationPair.Sidama coffee country': 'Región cafetera de Sidama',
  'destinationPair.Ambo': 'Ambo',
  'destinationPair.Central Highlands': 'Tierras Altas Centrales',
  'destinationPair.Lake Chamo': 'Lago Chamo',
  'destinationPair.Konso': 'Konso',
  'destinationPair.Jemma Gorge': 'Garganta de Jemma',
  'destinationPair.Adadi Mariam': 'Adadi Mariam',
  'destinationPair.Harar Jugol': 'Harar Jugol',
  'destinationPair.Danakil Depression': 'Depresión del Danakil',
})

Object.assign(dictionaries.FR, {
  'destinationPair.Gondar': 'Gondar',
  'destinationPair.Aksum': 'Aksoum',
  'destinationPair.Axum': 'Aksoum',
  'destinationPair.Simien Mountains': 'Montagnes du Simien',
  'destinationPair.Debre Libanos': 'Debre Libanos',
  'destinationPair.Wonchi Crater Lake': 'Lac de cratère Wonchi',
  'destinationPair.Tiya': 'Tiya',
  'destinationPair.Lake Tana': 'Lac Tana',
  'destinationPair.Historic North': 'Nord Historique',
  'destinationPair.Gheralta': 'Gheralta',
  'destinationPair.Bahir Dar': 'Bahir Dar',
  'destinationPair.Sof Omar Cave': 'Grotte de Sof Omar',
  'destinationPair.Hawassa': 'Hawassa',
  'destinationPair.Addis Ababa': 'Addis-Abeba',
  'destinationPair.Dire Dawa': 'Dire Dawa',
  'destinationPair.Aweday': 'Aweday',
  'destinationPair.Eastern Ethiopia': 'Éthiopie Orientale',
  'destinationPair.Arba Minch': 'Arba Minch',
  'destinationPair.Dorze': 'Dorze',
  'destinationPair.Omo Valley': 'Vallée de l’Omo',
  'destinationPair.Bale Mountains': 'Montagnes de Bale',
  'destinationPair.Dinsho': 'Dinsho',
  'destinationPair.Sanetti Plateau': 'Plateau de Sanetti',
  'destinationPair.Sidama coffee country': 'Pays du café Sidama',
  'destinationPair.Ambo': 'Ambo',
  'destinationPair.Central Highlands': 'Hautes Terres Centrales',
  'destinationPair.Lake Chamo': 'Lac Chamo',
  'destinationPair.Konso': 'Konso',
  'destinationPair.Jemma Gorge': 'Gorges de Jemma',
  'destinationPair.Adadi Mariam': 'Adadi Mariam',
  'destinationPair.Harar Jugol': 'Harar Jugol',
  'destinationPair.Danakil Depression': 'Dépression du Danakil',
})

Object.assign(dictionaries.DE, {
  'destinationPair.Gondar': 'Gondar',
  'destinationPair.Aksum': 'Aksum',
  'destinationPair.Axum': 'Aksum',
  'destinationPair.Simien Mountains': 'Simien-Gebirge',
  'destinationPair.Debre Libanos': 'Debre Libanos',
  'destinationPair.Wonchi Crater Lake': 'Wonchi-Kratersee',
  'destinationPair.Tiya': 'Tiya',
  'destinationPair.Lake Tana': 'Tana-See',
  'destinationPair.Historic North': 'Historischer Norden',
  'destinationPair.Gheralta': 'Gheralta',
  'destinationPair.Bahir Dar': 'Bahir Dar',
  'destinationPair.Sof Omar Cave': 'Sof-Omar-Höhle',
  'destinationPair.Hawassa': 'Hawassa',
  'destinationPair.Addis Ababa': 'Addis Abeba',
  'destinationPair.Dire Dawa': 'Dire Dawa',
  'destinationPair.Aweday': 'Aweday',
  'destinationPair.Eastern Ethiopia': 'Ostäthiopien',
  'destinationPair.Arba Minch': 'Arba Minch',
  'destinationPair.Dorze': 'Dorze',
  'destinationPair.Omo Valley': 'Omo-Tal',
  'destinationPair.Bale Mountains': 'Bale-Gebirge',
  'destinationPair.Dinsho': 'Dinsho',
  'destinationPair.Sanetti Plateau': 'Sanetti-Plateau',
  'destinationPair.Sidama coffee country': 'Sidama-Kaffeeland',
  'destinationPair.Ambo': 'Ambo',
  'destinationPair.Central Highlands': 'Zentrales Hochland',
  'destinationPair.Lake Chamo': 'Chamo-See',
  'destinationPair.Konso': 'Konso',
  'destinationPair.Jemma Gorge': 'Jemma-Schlucht',
  'destinationPair.Adadi Mariam': 'Adadi Mariam',
  'destinationPair.Harar Jugol': 'Harar Jugol',
  'destinationPair.Danakil Depression': 'Danakil-Depression',
})

Object.assign(dictionaries.ZH, {
  'destinationPair.Gondar': 'Gondar',
  'destinationPair.Aksum': 'Aksum',
  'destinationPair.Axum': 'Aksum',
  'destinationPair.Simien Mountains': 'Simien 山脉',
  'destinationPair.Debre Libanos': 'Debre Libanos',
  'destinationPair.Wonchi Crater Lake': 'Wonchi 火山口湖',
  'destinationPair.Tiya': 'Tiya',
  'destinationPair.Lake Tana': 'Tana 湖',
  'destinationPair.Historic North': '历史北线',
  'destinationPair.Gheralta': 'Gheralta',
  'destinationPair.Bahir Dar': 'Bahir Dar',
  'destinationPair.Sof Omar Cave': 'Sof Omar 洞穴',
  'destinationPair.Hawassa': 'Hawassa',
  'destinationPair.Addis Ababa': 'Addis Ababa',
  'destinationPair.Dire Dawa': 'Dire Dawa',
  'destinationPair.Aweday': 'Aweday',
  'destinationPair.Eastern Ethiopia': '埃塞俄比亚东部',
  'destinationPair.Arba Minch': 'Arba Minch',
  'destinationPair.Dorze': 'Dorze',
  'destinationPair.Omo Valley': '奥莫河谷',
  'destinationPair.Bale Mountains': 'Bale 山脉',
  'destinationPair.Dinsho': 'Dinsho',
  'destinationPair.Sanetti Plateau': 'Sanetti 高原',
  'destinationPair.Sidama coffee country': 'Sidama 咖啡产区',
  'destinationPair.Ambo': 'Ambo',
  'destinationPair.Central Highlands': '中部高原',
  'destinationPair.Lake Chamo': 'Chamo 湖',
  'destinationPair.Konso': 'Konso',
  'destinationPair.Jemma Gorge': 'Jemma 峡谷',
  'destinationPair.Adadi Mariam': 'Adadi Mariam',
  'destinationPair.Harar Jugol': 'Harar Jugol',
  'destinationPair.Danakil Depression': 'Danakil 洼地',
})

type TourSummaryTranslation = {
  title: string
  style: string
  teaser: string
  summary: string
  days: string
  season: string
  from: string
  group: string
}

function assignTourPageTranslations(
  language: Exclude<LanguageCode, 'EN'>,
  shared: Dictionary,
  tours: Record<string, TourSummaryTranslation>,
) {
  Object.assign(dictionaries[language], shared)

  for (const [slug, tour] of Object.entries(tours)) {
    dictionaries[language][`tour.${slug}.title`] = tour.title
    dictionaries[language][`tour.${slug}.style`] = tour.style
    dictionaries[language][`tour.${slug}.teaser`] = tour.teaser
    dictionaries[language][`tour.${slug}.summary`] = tour.summary
    dictionaries[language][`tour.${slug}.days`] = tour.days
    dictionaries[language][`tour.${slug}.season`] = tour.season
    dictionaries[language][`tour.${slug}.from`] = tour.from
    dictionaries[language][`tour.${slug}.group`] = tour.group
  }
}

assignTourPageTranslations(
  'ES',
  {
    'toursPage.hero.eyebrow': 'Tours y Viajes',
    'toursPage.hero.title': 'Quince rutas, ninguna fija',
    'toursPage.hero.lede':
      'Considere estas rutas como puntos de partida, no como paquetes. Cada una se redibuja alrededor de las personas que viajan.',
    'toursPage.hero.imageAlt': 'Recinto real histórico de Gondar, Etiopía',
    'toursPage.meta.journeys': 'Viajes',
    'toursPage.meta.length': 'Duración',
    'toursPage.meta.lengthValue': '4 – 18 días',
    'toursPage.meta.group': 'Tamaño del grupo',
    'toursPage.meta.groupValue': '2 – 10 viajeros',
    'toursPage.meta.guiding': 'Guía',
    'toursPage.meta.guidingValue': 'Privado',
    'toursPage.featured.badge': 'Más solicitado',
    'toursPage.featured.eyebrow': 'Viaje Signature',
    'toursPage.featured.cta': 'Ver itinerario completo',
    'toursPage.collection.eyebrow': 'La Colección',
    'toursPage.collection.title': 'Todos los viajes que diseñamos',
    'toursPage.collection.aside':
      'Filtre por el tipo de viaje que desea. Cualquiera puede ampliarse, acortarse o combinarse.',
    'toursPage.promises.eyebrow': 'Cómo Trabajamos',
    'toursPage.promises.title': 'Lo que cumple cada viaje de esta página',
    'toursPage.faq.eyebrow': 'Planificar Su Viaje',
    'toursPage.faq.title': 'Preguntas sobre tours, respondidas con claridad',
    'toursPage.cta.title': 'O empiece con una página en blanco',
    'toursPage.cta.text':
      'Muchos huéspedes terminan entre dos rutas. Describa el viaje que imagina y un diseñador lo trazará correctamente.',
    'toursPage.cta.secondary': 'Ver Destinos',
    'tourDetail.meta.duration': 'Duración',
    'tourDetail.meta.season': 'Temporada',
    'tourDetail.meta.group': 'Grupo',
    'tourDetail.meta.groupSize': 'Tamaño del grupo',
    'tourDetail.meta.pricing': 'Precio',
    'tourDetail.meta.bestSeason': 'Mejor temporada',
    'tourDetail.meta.style': 'Estilo',
    'tourDetail.private': 'Privado',
    'tourDetail.overview.eyebrow': 'El Viaje',
    'tourDetail.overview.title': '{nights} noches, diseñado alrededor de las horas que importan',
    'tourDetail.places': 'Lugares',
    'tourDetail.price.eyebrow': 'Precio indicativo',
    'tourDetail.price.copy': 'adaptado a sus fechas, grupo y preferencias de habitación',
    'tourDetail.price.cta': 'Consultar este viaje',
    'tourDetail.price.note':
      'El precio final depende de temporada, categoría de habitación y tamaño del grupo. No se toma depósito hasta que el itinerario sea correcto.',
    'tourDetail.intelligence.eyebrow': 'Inteligencia de Ruta',
    'tourDetail.intelligence.title': 'Los lugares, leídos con contexto',
    'tourDetail.intelligence.copy':
      'Una breve orientación de campo para cada parada: por qué importa, qué se vive allí y qué detalles afinan un viaje privado.',
    'tourDetail.intelligence.stops': 'Paradas',
    'tourDetail.bestMoment': 'Mejor momento',
    'tourDetail.itinerary.eyebrow': 'Día a Día',
    'tourDetail.itinerary.title': 'El itinerario, como suele funcionar',
    'tourDetail.itinerary.copy':
      'Un borrador de trabajo, no un horario fijo. Movemos días según clima, festivales y su ritmo.',
    'tourDetail.included': 'Qué Está Incluido',
    'tourDetail.notIncluded': 'No Incluido',
    'tourDetail.enquire.eyebrow': 'Consultar',
    'tourDetail.enquire.title': 'Haga suyo {tour}',
    'tourDetail.enquire.copy':
      'Envíenos sus fechas y confirmaremos disponibilidad, cotización precisa y los ajustes que haríamos si fuera nuestro viaje.',
    'tourDetail.enquire.runs': 'Opera',
    'tourDetail.other.eyebrow': 'Otros Viajes',
    'tourDetail.other.title': 'Quizá también esté considerando',
    'tourDetail.other.all': 'Todos los tours',
    'tourDetail.cta.title': '¿Preguntas antes de consultar?',
    'tourDetail.cta.text':
      'Altitud, tiempo de carretera, dificultad real de la caminata o si los niños estarán cómodos. Pregúntenos; un diseñador responderá con honestidad.',
    'tourDetail.cta.secondary': 'Tours de Escala',
    'tourDay.day': 'Día',
    'tourDay.days': 'Días',
    'tourDay.stage': 'Etapa',
    'tourMeta.nights': '{count} noches',
    'tourGeneric.itineraryTitle': 'Etapa privada',
    'tourGeneric.itinerary.0': 'Llegada, bienvenida privada y orientación inicial antes de comenzar la ruta.',
    'tourGeneric.itinerary.1': 'Primer tramo guiado con tiempos flexibles y contexto local.',
    'tourGeneric.itinerary.2': 'Exploración principal con guía especialista, paradas cuidadas y ritmo cómodo.',
    'tourGeneric.itinerary.3': 'Día de inmersión con experiencias locales y ajustes según clima y acceso.',
    'tourGeneric.itinerary.4': 'Continuación de la ruta con paisajes, cultura y apoyo logístico constante.',
    'tourGeneric.itinerary.5': 'Última etapa regional con margen para descanso, fotografía o visitas adicionales.',
    'tourGeneric.itinerary.6': 'Regreso o salida con traslado privado y tiempo protegido para la conexión.',
    'tourGeneric.include.0': 'Diseño privado del itinerario y coordinación local',
    'tourGeneric.include.1': 'Transporte cómodo con conductor-guía profesional',
    'tourGeneric.include.2': 'Guías locales especializados donde aportan valor',
    'tourGeneric.include.3': 'Alojamientos cuidadosamente seleccionados según disponibilidad',
    'tourGeneric.include.4': 'Entradas, permisos o arreglos comunitarios confirmados en la propuesta',
    'tourGeneric.include.5': 'Soporte local antes, durante y después del viaje',
    'tourGeneric.exclude.0': 'Vuelos internacionales y tasas de visa',
    'tourGeneric.exclude.1': 'Seguro de viaje',
    'tourGeneric.exclude.2': 'Propinas, compras personales y servicios no listados',
    'tourCategory.All Journeys': 'Todos los Viajes',
    'tourCategory.Historic & Religious': 'Histórico y Religioso',
    'tourCategory.Cultural': 'Cultural',
    'tourCategory.Nature & Wildlife': 'Naturaleza y Vida Silvestre',
    'tourCategory.Trekking': 'Trekking',
    'tourCategory.Adventure': 'Aventura',
    'tourCategory.Festivals': 'Festivales',
    'tourCategory.Grand Journeys': 'Grandes Viajes',
    'toursGrid.aria': 'Filtrar viajes por estilo',
    'toursGrid.empty': 'Aún no hay viajes de este estilo; pero diseñaremos uno.',
    'journeyStyle.Luxury': 'Lujo',
    'journeyStyle.Photography': 'Fotografía',
    'journeyStyle.Cultural': 'Cultural',
    'journeyStyle.Wildlife': 'Vida silvestre',
    'journeyStyle.Trekking': 'Trekking',
    'journeyStyle.Festival': 'Festival',
    'journeyStyle.Layover': 'Escala',
    'journeyStyle.Family': 'Familia',
    'tourPromise.0.title': 'Propiedad local, guías locales',
    'tourPromise.0.text':
      'Un equipo en Addis de diseñadores, guías académicos y conductores que trabajan juntos desde hace años.',
    'tourPromise.1.title': 'Diseñado, nunca empaquetado',
    'tourPromise.1.text':
      'Cada itinerario se traza desde cero alrededor de su ritmo, intereses y comodidad con altitud o carretera.',
    'tourPromise.2.title': 'Accesos que no se reservan en línea',
    'tourPromise.2.text':
      'Curadores, sacerdotes, arqueólogos y artesanos abren puertas en las horas adecuadas.',
    'tourPromise.3.title': 'Presentes antes, durante y después',
    'tourPromise.3.text':
      'Un diseñador dedicado desde la primera consulta hasta la salida final, con soporte 24 horas.',
    'tourFaq.0.question': '¿Son salidas grupales fijas?',
    'tourFaq.0.answer':
      'No. Nuestros viajes son privados y diseñados alrededor de quienes viajan juntos. Las rutas son puntos de partida.',
    'tourFaq.1.question': '¿Puedo personalizar uno de estos tours?',
    'tourFaq.1.answer':
      'Sí. Ajustamos ritmo, duración, alojamiento, actividades y ruta según fechas, intereses, carretera y altitud.',
    'tourFaq.2.question': '¿Se pueden combinar dos itinerarios?',
    'tourFaq.2.answer':
      'Sí. Muchos huéspedes combinan partes de dos rutas. Díganos qué lugares importan y los uniremos en un viaje práctico.',
    'tourFaq.3.question': '¿Qué incluye el precio?',
    'tourFaq.3.answer':
      'La propuesta final confirma alojamiento, transporte, guías, comidas, vuelos y entradas cubiertos por la cotización.',
    'tourFaq.4.question': '¿Qué tamaño tienen los grupos?',
    'tourFaq.4.answer':
      'Los viajes son privados y las rutas publicadas están pensadas para grupos de hasta diez personas.',
    'tourFaq.5.question': '¿Qué pasa después de consultar?',
    'tourFaq.5.answer':
      'Un diseñador en Addis suele responder en 24 horas con preguntas y una primera ruta. Revisamos hasta que el itinerario esté bien.',
    'tourPlace.generic.status': 'Parada curada',
    'tourPlace.generic.context':
      'Una parada elegida por su valor cultural, natural o histórico, con tiempos adaptados a las condiciones locales.',
    'tourPlace.generic.experience':
      'Espere guía privada, contexto local y un ritmo flexible que deje espacio para encuentros reales.',
    'tourPlace.generic.bestMoment':
      'El mejor horario se confirma cerca del viaje según luz, acceso y consejo local.',
    'tourPlace.generic.logistics':
      'Confirmamos carreteras, permisos, horarios y detalles de comodidad antes de cerrar la ruta.',
    'destinationRegion.Lasta Highlands': 'Tierras Altas de Lasta',
    'destinationRegion.Western Highlands': 'Tierras Altas Occidentales',
    'destinationRegion.Southwest Ethiopia': 'Suroeste de Etiopía',
    'destinationRegion.Kaffa Zone': 'Zona Kaffa',
    'destinationRegion.Sidama and Rift Valley': 'Sidama y Valle del Rift',
    'destinationRegion.Lower Omo': 'Bajo Omo',
    'destinationRegion.Omo and Mago area': 'Área de Omo y Mago',
    'destinationRegion.Oromia highlands': 'Tierras Altas de Oromia',
    'placeName.Addis Ababa': 'Addis Abeba',
    'placeName.Bahir Dar': 'Bahir Dar',
    'placeName.Lake Tana': 'Lago Tana',
    'placeName.Gondar': 'Gondar',
    'placeName.Simien Mountains National Park': 'Parque Nacional de las Montañas Simien',
    'placeName.Lalibela': 'Lalibela',
    'placeName.Aksum': 'Aksum',
    'placeName.Bale Mountains National Park': 'Parque Nacional de las Montañas Bale',
    'placeName.Sof Omar Cave': 'Cueva de Sof Omar',
    'placeName.Jimma': 'Jimma',
    'placeName.Kaffa': 'Kaffa',
    'placeName.Bonga Forest': 'Bosque de Bonga',
    'placeName.Hawassa': 'Hawassa',
    'placeName.Danakil Depression': 'Depresión del Danakil',
    'placeName.Dallol': 'Dallol',
    'placeName.Lake Assale': 'Lago Assale',
    'placeName.Erta Ale': 'Erta Ale',
    'placeName.Arba Minch': 'Arba Minch',
    'placeName.Dorze': 'Dorze',
    'placeName.Konso': 'Konso',
    'placeName.Omo Valley': 'Valle del Omo',
    'placeName.Turmi': 'Turmi',
    'placeName.Dimeka': 'Dimeka',
    'placeName.Mursi Highlands': 'Tierras Altas Mursi',
    'placeName.Karo': 'Karo',
    'placeName.Dire Dawa': 'Dire Dawa',
    'placeName.Harar Jugol': 'Harar Jugol',
    'placeName.Debre Libanos Monastery': 'Monasterio Debre Libanos',
    'placeName.Wonchi Crater Lake': 'Lago de Cráter Wonchi',
    'placeName.Tiya Archaeological Site': 'Sitio Arqueológico de Tiya',
    'placeName.Adadi Mariam Rock-Hewn Church': 'Iglesia Rupestre Adadi Mariam',
  },
  {
    'the-historic-route': { title: 'Norte Histórico Clásico', style: 'Cultural · Privado', teaser: 'Siga la peregrinación de reyes desde los castillos de Gondar hasta las iglesias rupestres de Lalibela.', summary: 'El circuito norte definitivo, uniendo monasterios insulares, castillos imperiales, escarpes de montaña e iglesias vivas excavadas en la roca.', days: '11 días', season: 'Oct – Mar', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'bale-mountains-and-sof-omar': { title: 'Aventura Montañas Bale y Sof Omar', style: 'Aventura · Privado', teaser: 'Rastree lobos etíopes en Sanetti, descienda al bosque Harenna y camine por las cámaras calizas de Sof Omar.', summary: 'Una aventura enfocada del sureste que combina el hábitat afroalpino más rico de Etiopía con uno de los sistemas de cuevas más notables de África.', days: '6 días', season: 'Nov – Abr', from: 'Cotización a medida', group: '2 – 6 viajeros' },
    'ethiopia-coffee-origins': { title: 'Viaje a los Orígenes del Café Etíope', style: 'Viaje Lento · Privado', teaser: 'Siga el café desde tostadores de Addis hasta granjas y bosques de Jimma, Kaffa y Sidama.', summary: 'Un viaje pausado por los paisajes cafeteros de Etiopía, combinando ecología forestal, hospitalidad familiar, fincas y rituales alrededor de cada taza.', days: '7 días', season: 'Todo el año', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'danakil-expedition': { title: 'Expedición Danakil y Erta Ale', style: 'Expedición · Grupo Pequeño', teaser: 'Manantiales de azufre, un lago de lava permanente y caravanas de sal sobre la llanura blanca.', summary: 'Una expedición compacta y asistida entre salares, campos geotérmicos y volcanes de las tierras bajas Afar.', days: '4 días', season: 'Nov – Feb', from: 'Cotización a medida', group: '2 – 6 viajeros' },
    'omo-valley-immersion': { title: 'Descubrimiento Cultural del Valle del Omo', style: 'Cultural · Privado', teaser: 'Días de mercado, ceremonia y conversación en uno de los valles con mayor densidad cultural del mundo.', summary: 'Diseñado alrededor de mercados e invitaciones, no de una ruta rígida, con mediador cultural junto a su guía durante todo el viaje.', days: '10 días', season: 'Jun – Sep, Dic – Mar', from: 'Cotización a medida', group: '2 – 6 viajeros' },
    'timkat-festival-journey': { title: 'Viaje al Festival Timkat', style: 'Festival · Privado', teaser: 'La Epifanía etíope: procesiones, túnicas blancas y el llenado del baño real.', summary: 'Una ventana fija cada enero, planificada con un año de antelación porque las habitaciones y puntos de vista se reservan pronto.', days: '8 días', season: 'Solo enero', from: 'Cotización a medida', group: '2 – 10 viajeros' },
    'simien-mountains-trek': { title: 'Trekking en las Montañas Simien', style: 'Trekking · Privado', teaser: 'Camine por el escarpe entre geladas, cascadas y vastas vistas de tierras altas.', summary: 'Un trekking enfocado desde Gondar hacia el Parque Nacional Simien, con distancias flexibles, scouts del parque y campamentos asistidos o lodges.', days: '5 días', season: 'Oct – Abr', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'lalibela-sacred-journey': { title: 'Viaje Sagrado a Lalibela', style: 'Cultural · Privado', teaser: 'Cuatro días sin prisa de iglesias rupestres, liturgia y monasterios de montaña.', summary: 'Un programa corto e inmersivo en Lalibela para viajeros que desean profundidad sin hacer todo el circuito norte.', days: '4 días', season: 'Oct – Mar', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'grand-ethiopia-highlights': { title: 'Grandes Esenciales de Etiopía', style: 'Cultural · Privado', teaser: 'El norte histórico, ciudades orientales, culturas del sur y vida silvestre de montaña en un gran viaje.', summary: 'Nuestra introducción más amplia a Etiopía, usando vuelos internos y tramos por carretera cuidadosamente elegidos para conectar historias, culturas y paisajes clave.', days: '18 días', season: 'Oct – Mar', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'historic-north-and-danakil': { title: 'Norte Histórico y Aventura Danakil', style: 'Expedición · Privado', teaser: 'De monasterios insulares y capitales antiguas a salares y un volcán vivo.', summary: 'Un viaje norteño de gran contraste que combina el circuito histórico con una expedición Danakil totalmente asistida, según acceso estacional.', days: '14 días', season: 'Nov – Feb', from: 'Cotización a medida', group: '2 – 6 viajeros' },
    'historic-north-and-omo-valley': { title: 'Norte Histórico y Valle del Omo', style: 'Cultural · Privado', teaser: 'Una amplia ruta cultural desde reinos del norte hasta comunidades del sur de Etiopía.', summary: 'Dos regiones culturales esenciales de Etiopía en un itinerario, conectadas por vuelos internos y guiadas con contexto, consentimiento y tiempo.', days: '15 días', season: 'Oct – Mar', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'harar-and-dire-dawa': { title: 'Viaje Cultural a Harar y Dire Dawa', style: 'Cultural · Privado', teaser: 'Herencia ferroviaria, casas harari, callejones antiguos y culturas comerciales del este.', summary: 'Un corto viaje oriental que une la historia ferroviaria de Dire Dawa con el patrimonio islámico vivo, mercados y arquitectura doméstica de Harar Jugol.', days: '4 días', season: 'Oct – Mar', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'rift-valley-southern-highlands': { title: 'Lagos del Rift y Tierras Altas del Sur', style: 'Viaje Lento · Privado', teaser: 'Ciudades junto al lago, aldeas de altura y paisajes del sur a un ritmo cómodo.', summary: 'Una ruta sureña suave por Hawassa, Arba Minch, Dorze y Konso para viajeros que quieren naturaleza y cultura sin una expedición larga por el Bajo Omo.', days: '7 días', season: 'Oct – Mayo', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'addis-ababa-central-highlands': { title: 'Addis Abeba y Tierras Altas Centrales', style: 'Cultural · Privado', teaser: 'La capital, tierras altas sagradas, un lago de cráter y arqueología en una ruta compacta.', summary: 'Un viaje accesible de cinco días centrado en Addis Abeba con excursiones a Debre Libanos, Wonchi, Tiya y Adadi Mariam.', days: '5 días', season: 'Oct – Mayo', from: 'Cotización a medida', group: '2 – 8 viajeros' },
    'genna-in-lalibela': { title: 'Genna en Lalibela', style: 'Festival · Privado', teaser: 'La Navidad etíope entre procesiones con velas y peregrinos de blanco en Lalibela.', summary: 'Un viaje de festival con fecha fija diseñado alrededor de vigilias y ceremonias de Genna, con habitaciones y guías reservados con antelación.', days: '4 días', season: 'Solo enero', from: 'Cotización a medida', group: '2 – 10 viajeros' },
  },
)

assignTourPageTranslations(
  'FR',
  {
    'toursPage.hero.eyebrow': 'Circuits et Voyages',
    'toursPage.hero.title': 'Quinze itinéraires, aucun figé',
    'toursPage.hero.lede':
      'Considérez ces routes comme des points de départ, pas comme des forfaits. Chacune est redessinée autour des voyageurs.',
    'toursPage.hero.imageAlt': 'Enceinte royale historique de Gondar, Éthiopie',
    'toursPage.meta.journeys': 'Voyages',
    'toursPage.meta.length': 'Durée',
    'toursPage.meta.lengthValue': '4 – 18 jours',
    'toursPage.meta.group': 'Taille du groupe',
    'toursPage.meta.groupValue': '2 – 10 voyageurs',
    'toursPage.meta.guiding': 'Guidage',
    'toursPage.meta.guidingValue': 'Privé',
    'toursPage.featured.badge': 'Le plus demandé',
    'toursPage.featured.eyebrow': 'Voyage Signature',
    'toursPage.featured.cta': 'Voir l’itinéraire complet',
    'toursPage.collection.eyebrow': 'La Collection',
    'toursPage.collection.title': 'Tous les voyages que nous organisons',
    'toursPage.collection.aside':
      'Filtrez par type de voyage. Chacun peut être allongé, raccourci ou combiné.',
    'toursPage.promises.eyebrow': 'Notre Manière de Travailler',
    'toursPage.promises.title': 'Ce qui vaut pour chaque voyage de cette page',
    'toursPage.faq.eyebrow': 'Planifier Votre Voyage',
    'toursPage.faq.title': 'Questions sur les circuits, réponses claires',
    'toursPage.cta.title': 'Ou commencez avec une page blanche',
    'toursPage.cta.text':
      'Beaucoup de voyageurs finissent entre deux routes. Décrivez le voyage que vous imaginez et un designer le dessinera correctement.',
    'toursPage.cta.secondary': 'Voir les Destinations',
    'tourDetail.meta.duration': 'Durée',
    'tourDetail.meta.season': 'Saison',
    'tourDetail.meta.group': 'Groupe',
    'tourDetail.meta.groupSize': 'Taille du groupe',
    'tourDetail.meta.pricing': 'Tarif',
    'tourDetail.meta.bestSeason': 'Meilleure saison',
    'tourDetail.meta.style': 'Style',
    'tourDetail.private': 'Privé',
    'tourDetail.overview.eyebrow': 'Le Voyage',
    'tourDetail.overview.title': '{nights} nuits, conçu autour des heures qui comptent',
    'tourDetail.places': 'Lieux',
    'tourDetail.price.eyebrow': 'Tarif indicatif',
    'tourDetail.price.copy': 'adapté à vos dates, groupe et préférences de chambre',
    'tourDetail.price.cta': 'Demander ce voyage',
    'tourDetail.price.note':
      'Le tarif final dépend de la saison, de la catégorie de chambre et de la taille du groupe. Aucun acompte avant que l’itinéraire soit juste.',
    'tourDetail.intelligence.eyebrow': 'Lecture de Route',
    'tourDetail.intelligence.title': 'Les lieux, lus avec contexte',
    'tourDetail.intelligence.copy':
      'Une note de terrain concise pour chaque arrêt : pourquoi il compte, ce que vous y vivez et les détails qui affinent un voyage privé.',
    'tourDetail.intelligence.stops': 'Arrêts',
    'tourDetail.bestMoment': 'Meilleur moment',
    'tourDetail.itinerary.eyebrow': 'Jour par Jour',
    'tourDetail.itinerary.title': 'L’itinéraire, tel qu’il se déroule souvent',
    'tourDetail.itinerary.copy':
      'Un brouillon de travail plutôt qu’un horaire fixe. Nous ajustons selon météo, festivals et votre rythme.',
    'tourDetail.included': 'Ce Qui Est Inclus',
    'tourDetail.notIncluded': 'Non Inclus',
    'tourDetail.enquire.eyebrow': 'Demander',
    'tourDetail.enquire.title': 'Faites vôtre {tour}',
    'tourDetail.enquire.copy':
      'Envoyez vos dates ; nous confirmerons disponibilité, prix précis et les ajustements que nous ferions pour notre propre voyage.',
    'tourDetail.enquire.runs': 'Opère',
    'tourDetail.other.eyebrow': 'Autres Voyages',
    'tourDetail.other.title': 'Vous pourriez aussi comparer',
    'tourDetail.other.all': 'Tous les circuits',
    'tourDetail.cta.title': 'Des questions avant de demander ?',
    'tourDetail.cta.text':
      'Altitude, temps de route, difficulté réelle de la marche ou confort des enfants. Demandez ; un designer répondra franchement.',
    'tourDetail.cta.secondary': 'Circuits d’Escale',
    'tourDay.day': 'Jour',
    'tourDay.days': 'Jours',
    'tourDay.stage': 'Étape',
    'tourMeta.nights': '{count} nuits',
    'tourGeneric.itineraryTitle': 'Étape privée',
    'tourGeneric.itinerary.0': 'Arrivée, accueil privé et première orientation avant de commencer la route.',
    'tourGeneric.itinerary.1': 'Premier tronçon guidé avec horaires flexibles et contexte local.',
    'tourGeneric.itinerary.2': 'Exploration principale avec guide spécialiste, arrêts soignés et rythme confortable.',
    'tourGeneric.itinerary.3': 'Journée d’immersion avec expériences locales et ajustements selon météo et accès.',
    'tourGeneric.itinerary.4': 'Suite de la route avec paysages, culture et soutien logistique constant.',
    'tourGeneric.itinerary.5': 'Dernière étape régionale avec marge pour repos, photographie ou visites supplémentaires.',
    'tourGeneric.itinerary.6': 'Retour ou départ avec transfert privé et temps protégé pour la connexion.',
    'tourGeneric.include.0': 'Conception privée de l’itinéraire et coordination locale',
    'tourGeneric.include.1': 'Transport confortable avec chauffeur-guide professionnel',
    'tourGeneric.include.2': 'Guides locaux spécialisés là où ils apportent une vraie valeur',
    'tourGeneric.include.3': 'Hébergements soigneusement sélectionnés selon disponibilité',
    'tourGeneric.include.4': 'Entrées, permis ou arrangements communautaires confirmés dans la proposition',
    'tourGeneric.include.5': 'Assistance locale avant, pendant et après le voyage',
    'tourGeneric.exclude.0': 'Vols internationaux et frais de visa',
    'tourGeneric.exclude.1': 'Assurance voyage',
    'tourGeneric.exclude.2': 'Pourboires, achats personnels et services non listés',
    'tourCategory.All Journeys': 'Tous les Voyages',
    'tourCategory.Historic & Religious': 'Historique et Religieux',
    'tourCategory.Cultural': 'Culturel',
    'tourCategory.Nature & Wildlife': 'Nature et Faune',
    'tourCategory.Trekking': 'Trekking',
    'tourCategory.Adventure': 'Aventure',
    'tourCategory.Festivals': 'Festivals',
    'tourCategory.Grand Journeys': 'Grands Voyages',
    'toursGrid.aria': 'Filtrer les voyages par style',
    'toursGrid.empty': 'Aucun voyage dans ce style pour l’instant ; nous en concevrons un.',
    'journeyStyle.Luxury': 'Luxe',
    'journeyStyle.Photography': 'Photographie',
    'journeyStyle.Cultural': 'Culturel',
    'journeyStyle.Wildlife': 'Faune',
    'journeyStyle.Trekking': 'Trekking',
    'journeyStyle.Festival': 'Festival',
    'journeyStyle.Layover': 'Escale',
    'journeyStyle.Family': 'Famille',
    'tourPromise.0.title': 'Propriété locale, guides locaux',
    'tourPromise.0.text':
      'Une équipe basée à Addis de designers, guides érudits et chauffeurs qui travaillent ensemble depuis des années.',
    'tourPromise.1.title': 'Conçu, jamais emballé',
    'tourPromise.1.text':
      'Chaque itinéraire est dessiné depuis zéro autour de votre rythme, vos intérêts et votre rapport à l’altitude ou à la route.',
    'tourPromise.2.title': 'Accès impossibles à réserver en ligne',
    'tourPromise.2.text':
      'Conservateurs, prêtres, archéologues et artisans ouvrent les portes aux bonnes heures.',
    'tourPromise.3.title': 'Présents avant, pendant et après',
    'tourPromise.3.text':
      'Un designer nommé de la première demande au départ final, avec assistance 24 h/24.',
    'tourFaq.0.question': 'S’agit-il de départs de groupe fixes ?',
    'tourFaq.0.answer':
      'Non. Nos voyages sont privés et conçus autour des personnes qui voyagent ensemble. Les routes sont des points de départ.',
    'tourFaq.1.question': 'Puis-je personnaliser l’un de ces circuits ?',
    'tourFaq.1.answer':
      'Oui. Nous ajustons rythme, durée, hébergement, activités et route selon vos dates, intérêts, route et altitude.',
    'tourFaq.2.question': 'Deux itinéraires peuvent-ils être combinés ?',
    'tourFaq.2.answer':
      'Oui. Beaucoup de voyageurs combinent deux routes. Dites-nous les lieux essentiels et nous les transformons en un seul voyage pratique.',
    'tourFaq.3.question': 'Qu’est-ce qui est inclus dans le prix ?',
    'tourFaq.3.answer':
      'La proposition finale confirme hébergement, transport, guidage, repas, vols et entrées inclus dans le devis.',
    'tourFaq.4.question': 'Quelle est la taille des groupes ?',
    'tourFaq.4.answer':
      'Les voyages sont privés et les routes publiées conviennent à des groupes jusqu’à dix personnes.',
    'tourFaq.5.question': 'Que se passe-t-il après ma demande ?',
    'tourFaq.5.answer':
      'Un designer basé à Addis répond généralement sous 24 heures avec des questions et une première route. Nous la révisons jusqu’à ce qu’elle soit juste.',
    'tourPlace.generic.status': 'Arrêt sélectionné',
    'tourPlace.generic.context':
      'Un arrêt choisi pour sa valeur culturelle, naturelle ou historique, avec un rythme adapté aux conditions locales.',
    'tourPlace.generic.experience':
      'Guidage privé, contexte local et rythme flexible laissant place à de vraies rencontres.',
    'tourPlace.generic.bestMoment':
      'Le meilleur horaire est confirmé près du départ selon lumière, accès et conseil local.',
    'tourPlace.generic.logistics':
      'Nous confirmons routes, permis, horaires et détails de confort avant de verrouiller l’itinéraire.',
    'destinationRegion.Lasta Highlands': 'Hautes Terres de Lasta',
    'destinationRegion.Western Highlands': 'Hautes Terres de l’Ouest',
    'destinationRegion.Southwest Ethiopia': 'Sud-Ouest de l’Éthiopie',
    'destinationRegion.Kaffa Zone': 'Zone Kaffa',
    'destinationRegion.Sidama and Rift Valley': 'Sidama et Vallée du Rift',
    'destinationRegion.Lower Omo': 'Bas Omo',
    'destinationRegion.Omo and Mago area': 'Région Omo et Mago',
    'destinationRegion.Oromia highlands': 'Hautes Terres d’Oromia',
    'placeName.Addis Ababa': 'Addis-Abeba',
    'placeName.Bahir Dar': 'Bahir Dar',
    'placeName.Lake Tana': 'Lac Tana',
    'placeName.Gondar': 'Gondar',
    'placeName.Simien Mountains National Park': 'Parc National des Montagnes du Simien',
    'placeName.Lalibela': 'Lalibela',
    'placeName.Aksum': 'Aksoum',
    'placeName.Bale Mountains National Park': 'Parc National des Montagnes de Bale',
    'placeName.Sof Omar Cave': 'Grotte de Sof Omar',
    'placeName.Jimma': 'Jimma',
    'placeName.Kaffa': 'Kaffa',
    'placeName.Bonga Forest': 'Forêt de Bonga',
    'placeName.Hawassa': 'Hawassa',
    'placeName.Danakil Depression': 'Dépression du Danakil',
    'placeName.Dallol': 'Dallol',
    'placeName.Lake Assale': 'Lac Assale',
    'placeName.Erta Ale': 'Erta Ale',
    'placeName.Arba Minch': 'Arba Minch',
    'placeName.Dorze': 'Dorze',
    'placeName.Konso': 'Konso',
    'placeName.Omo Valley': 'Vallée de l’Omo',
    'placeName.Turmi': 'Turmi',
    'placeName.Dimeka': 'Dimeka',
    'placeName.Mursi Highlands': 'Hautes Terres Mursi',
    'placeName.Karo': 'Karo',
    'placeName.Dire Dawa': 'Dire Dawa',
    'placeName.Harar Jugol': 'Harar Jugol',
    'placeName.Debre Libanos Monastery': 'Monastère de Debre Libanos',
    'placeName.Wonchi Crater Lake': 'Lac de cratère Wonchi',
    'placeName.Tiya Archaeological Site': 'Site archéologique de Tiya',
    'placeName.Adadi Mariam Rock-Hewn Church': 'Église rupestre Adadi Mariam',
  },
  {
    'the-historic-route': { title: 'Nord Historique Classique', style: 'Culturel · Privé', teaser: 'Suivez la route des rois, des châteaux de Gondar aux églises rupestres de Lalibela.', summary: 'Le grand circuit du nord : monastères insulaires, châteaux impériaux, escarpements et églises rupestres vivantes dans un rythme soigné.', days: '11 jours', season: 'Oct – Mar', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'bale-mountains-and-sof-omar': { title: 'Aventure Montagnes de Bale et Sof Omar', style: 'Aventure · Privé', teaser: 'Suivez les loups d’Éthiopie sur Sanetti, descendez dans Harenna et explorez les salles calcaires de Sof Omar.', summary: 'Une aventure ciblée dans le sud-est, combinant le plus riche habitat afro-alpin d’Éthiopie avec l’un des systèmes de grottes majeurs d’Afrique.', days: '6 jours', season: 'Nov – Avr', from: 'Devis sur mesure', group: '2 – 6 voyageurs' },
    'ethiopia-coffee-origins': { title: 'Voyage aux Origines du Café Éthiopien', style: 'Voyage Lent · Privé', teaser: 'Suivez le café des torréfacteurs d’Addis aux fermes et forêts de Jimma, Kaffa et Sidama.', summary: 'Un voyage lent dans les paysages du café éthiopien, mêlant écologie forestière, hospitalité familiale, fermes et rituels de chaque tasse.', days: '7 jours', season: 'Toute l’année', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'danakil-expedition': { title: 'Expédition Danakil et Erta Ale', style: 'Expédition · Petit Groupe', teaser: 'Sources de soufre, lac de lave permanent et caravanes de sel sur la plaine blanche.', summary: 'Une expédition compacte et encadrée dans les salines, champs géothermiques et paysages volcaniques des basses terres Afar.', days: '4 jours', season: 'Nov – Fév', from: 'Devis sur mesure', group: '2 – 6 voyageurs' },
    'omo-valley-immersion': { title: 'Découverte Culturelle de la Vallée de l’Omo', style: 'Culturel · Privé', teaser: 'Marchés, cérémonies et conversations dans l’une des vallées les plus denses culturellement au monde.', summary: 'Construit autour des marchés et invitations, non d’un tracé rigide, avec médiateur culturel aux côtés du guide.', days: '10 jours', season: 'Juin – Sep, Déc – Mar', from: 'Devis sur mesure', group: '2 – 6 voyageurs' },
    'timkat-festival-journey': { title: 'Voyage du Festival Timkat', style: 'Festival · Privé', teaser: 'L’Épiphanie éthiopienne : processions, robes blanches et bain royal rempli d’eau.', summary: 'Une fenêtre fixe chaque janvier, préparée un an à l’avance car chambres et points de vue partent tôt.', days: '8 jours', season: 'Janvier seulement', from: 'Devis sur mesure', group: '2 – 10 voyageurs' },
    'simien-mountains-trek': { title: 'Trek des Montagnes du Simien', style: 'Trekking · Privé', teaser: 'Marchez sur l’escarpement parmi les geladas, cascades et vastes vues de hautes terres.', summary: 'Un trek ciblé depuis Gondar vers le parc national du Simien, avec distances flexibles, scouts du parc et camps servis ou lodges.', days: '5 jours', season: 'Oct – Avr', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'lalibela-sacred-journey': { title: 'Voyage Sacré à Lalibela', style: 'Culturel · Privé', teaser: 'Quatre jours sans hâte d’églises rupestres, liturgie et monastères de montagne.', summary: 'Un court programme immersif à Lalibela pour ceux qui veulent de la profondeur sans tout le circuit nord.', days: '4 jours', season: 'Oct – Mar', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'grand-ethiopia-highlights': { title: 'Grands Incontournables d’Éthiopie', style: 'Culturel · Privé', teaser: 'Nord historique, villes orientales, cultures du sud et faune de montagne dans un grand voyage.', summary: 'Notre introduction la plus large à l’Éthiopie, reliant histoires, cultures et paysages essentiels par vols intérieurs et routes choisies.', days: '18 jours', season: 'Oct – Mar', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'historic-north-and-danakil': { title: 'Nord Historique et Aventure Danakil', style: 'Expédition · Privé', teaser: 'Des monastères insulaires et capitales anciennes aux salines et à un volcan vivant.', summary: 'Un voyage nordique à forts contrastes combinant le circuit historique et une expédition Danakil entièrement encadrée, selon l’accès saisonnier.', days: '14 jours', season: 'Nov – Fév', from: 'Devis sur mesure', group: '2 – 6 voyageurs' },
    'historic-north-and-omo-valley': { title: 'Nord Historique et Vallée de l’Omo', style: 'Culturel · Privé', teaser: 'Une grande route culturelle des royaumes du nord aux communautés du sud éthiopien.', summary: 'Deux régions culturelles essentielles en un itinéraire, reliées par vols intérieurs et guidées avec contexte, consentement et temps.', days: '15 jours', season: 'Oct – Mar', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'harar-and-dire-dawa': { title: 'Voyage Culturel Harar et Dire Dawa', style: 'Culturel · Privé', teaser: 'Patrimoine ferroviaire, maisons harari, ruelles anciennes et cultures marchandes de l’est.', summary: 'Un court voyage oriental associant l’histoire ferroviaire de Dire Dawa au patrimoine islamique vivant, aux marchés et à l’architecture de Harar Jugol.', days: '4 jours', season: 'Oct – Mar', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'rift-valley-southern-highlands': { title: 'Lacs du Rift et Hautes Terres du Sud', style: 'Voyage Lent · Privé', teaser: 'Villes lacustres, villages de montagne et paysages du sud à un rythme confortable.', summary: 'Une route méridionale douce par Hawassa, Arba Minch, Dorze et Konso pour voyageurs cherchant nature et culture sans longue expédition dans le Bas Omo.', days: '7 jours', season: 'Oct – Mai', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'addis-ababa-central-highlands': { title: 'Addis-Abeba et Hautes Terres Centrales', style: 'Culturel · Privé', teaser: 'La capitale, des hautes terres sacrées, un lac de cratère et l’archéologie en une route compacte.', summary: 'Un voyage accessible de cinq jours centré sur Addis-Abeba avec excursions à Debre Libanos, Wonchi, Tiya et Adadi Mariam.', days: '5 jours', season: 'Oct – Mai', from: 'Devis sur mesure', group: '2 – 8 voyageurs' },
    'genna-in-lalibela': { title: 'Genna à Lalibela', style: 'Festival · Privé', teaser: 'Noël éthiopien parmi processions aux bougies et pèlerins vêtus de blanc à Lalibela.', summary: 'Un voyage de festival à dates fixes autour des veillées et cérémonies de Genna, avec chambres et guidage réservés longtemps à l’avance.', days: '4 jours', season: 'Janvier seulement', from: 'Devis sur mesure', group: '2 – 10 voyageurs' },
  },
)

assignTourPageTranslations(
  'DE',
  {
    'toursPage.hero.eyebrow': 'Touren und Reisen',
    'toursPage.hero.title': 'Fünfzehn Routen, keine davon starr',
    'toursPage.hero.lede':
      'Verstehen Sie diese Routen als Ausgangspunkte, nicht als Pakete. Jede wird um die Reisenden herum neu gezeichnet.',
    'toursPage.hero.imageAlt': 'Historische königliche Anlage von Gondar, Äthiopien',
    'toursPage.meta.journeys': 'Reisen',
    'toursPage.meta.length': 'Dauer',
    'toursPage.meta.lengthValue': '4 – 18 Tage',
    'toursPage.meta.group': 'Gruppengröße',
    'toursPage.meta.groupValue': '2 – 10 Gäste',
    'toursPage.meta.guiding': 'Führung',
    'toursPage.meta.guidingValue': 'Privat',
    'toursPage.featured.badge': 'Am häufigsten angefragt',
    'toursPage.featured.eyebrow': 'Signature-Reise',
    'toursPage.featured.cta': 'Vollständigen Reiseplan ansehen',
    'toursPage.collection.eyebrow': 'Die Kollektion',
    'toursPage.collection.title': 'Alle Reisen, die wir durchführen',
    'toursPage.collection.aside':
      'Filtern Sie nach Reisestil. Jede Route kann verlängert, verkürzt oder kombiniert werden.',
    'toursPage.promises.eyebrow': 'Wie Wir Arbeiten',
    'toursPage.promises.title': 'Was für jede Reise auf dieser Seite gilt',
    'toursPage.faq.eyebrow': 'Ihre Reise Planen',
    'toursPage.faq.title': 'Tourfragen, klar beantwortet',
    'toursPage.cta.title': 'Oder beginnen Sie mit einem leeren Blatt',
    'toursPage.cta.text':
      'Viele Gäste landen zwischen zwei Routen. Beschreiben Sie Ihre Reiseidee und ein Designer zeichnet sie sauber aus.',
    'toursPage.cta.secondary': 'Reiseziele ansehen',
    'tourDetail.meta.duration': 'Dauer',
    'tourDetail.meta.season': 'Saison',
    'tourDetail.meta.group': 'Gruppe',
    'tourDetail.meta.groupSize': 'Gruppengröße',
    'tourDetail.meta.pricing': 'Preis',
    'tourDetail.meta.bestSeason': 'Beste Saison',
    'tourDetail.meta.style': 'Stil',
    'tourDetail.private': 'Privat',
    'tourDetail.overview.eyebrow': 'Die Reise',
    'tourDetail.overview.title': '{nights} Nächte, geplant um die wichtigen Stunden',
    'tourDetail.places': 'Orte',
    'tourDetail.price.eyebrow': 'Richtpreis',
    'tourDetail.price.copy': 'angepasst an Ihre Daten, Gruppe und Zimmerwünsche',
    'tourDetail.price.cta': 'Diese Reise anfragen',
    'tourDetail.price.note':
      'Der Endpreis hängt von Saison, Zimmerkategorie und Gruppengröße ab. Eine Anzahlung erfolgt erst, wenn der Reiseplan stimmt.',
    'tourDetail.intelligence.eyebrow': 'Routenwissen',
    'tourDetail.intelligence.title': 'Die Orte, mit Kontext gelesen',
    'tourDetail.intelligence.copy':
      'Kurze Feldnotizen zu jeder Station: warum sie wichtig ist, was man dort erlebt und welche Details eine private Reise verfeinern.',
    'tourDetail.intelligence.stops': 'Stationen',
    'tourDetail.bestMoment': 'Bester Moment',
    'tourDetail.itinerary.eyebrow': 'Tag für Tag',
    'tourDetail.itinerary.title': 'Der Reiseplan, wie er meist funktioniert',
    'tourDetail.itinerary.copy':
      'Ein Arbeitsentwurf statt eines festen Plans. Wir verschieben Tage je nach Wetter, Festen und Ihrem Rhythmus.',
    'tourDetail.included': 'Was Enthalten Ist',
    'tourDetail.notIncluded': 'Nicht Enthalten',
    'tourDetail.enquire.eyebrow': 'Anfragen',
    'tourDetail.enquire.title': 'Machen Sie {tour} zu Ihrer Reise',
    'tourDetail.enquire.copy':
      'Senden Sie Ihre Daten; wir prüfen Verfügbarkeit, kalkulieren präzise und schlagen sinnvolle Anpassungen vor.',
    'tourDetail.enquire.runs': 'Läuft',
    'tourDetail.other.eyebrow': 'Weitere Reisen',
    'tourDetail.other.title': 'Das könnten Sie ebenfalls abwägen',
    'tourDetail.other.all': 'Alle Touren',
    'tourDetail.cta.title': 'Fragen vor der Anfrage?',
    'tourDetail.cta.text':
      'Höhe, Fahrzeit, echte Schwierigkeit der Wanderung oder ob Kinder gut zurechtkommen. Fragen Sie uns; ein Designer antwortet ehrlich.',
    'tourDetail.cta.secondary': 'Layover-Touren',
    'tourDay.day': 'Tag',
    'tourDay.days': 'Tage',
    'tourDay.stage': 'Etappe',
    'tourMeta.nights': '{count} Nächte',
    'tourGeneric.itineraryTitle': 'Private Etappe',
    'tourGeneric.itinerary.0': 'Ankunft, private Begrüßung und erste Orientierung vor Beginn der Route.',
    'tourGeneric.itinerary.1': 'Erster geführter Abschnitt mit flexiblen Zeiten und lokalem Kontext.',
    'tourGeneric.itinerary.2': 'Haupterkundung mit Spezialguide, sorgfältigen Stopps und angenehmem Tempo.',
    'tourGeneric.itinerary.3': 'Vertiefungstag mit lokalen Erlebnissen und Anpassung an Wetter und Zugang.',
    'tourGeneric.itinerary.4': 'Weiterreise mit Landschaft, Kultur und durchgehender logistischer Betreuung.',
    'tourGeneric.itinerary.5': 'Letzte regionale Etappe mit Raum für Ruhe, Fotografie oder zusätzliche Besuche.',
    'tourGeneric.itinerary.6': 'Rückkehr oder Abreise mit privatem Transfer und geschützter Anschlusszeit.',
    'tourGeneric.include.0': 'Private Reiseplanung und lokale Koordination',
    'tourGeneric.include.1': 'Komfortabler Transport mit professionellem Fahrer-Guide',
    'tourGeneric.include.2': 'Spezialisierte lokale Guides, wo sie echten Mehrwert bringen',
    'tourGeneric.include.3': 'Sorgfältig ausgewählte Unterkünfte nach Verfügbarkeit',
    'tourGeneric.include.4': 'Eintritte, Genehmigungen oder Community-Absprachen laut bestätigtem Angebot',
    'tourGeneric.include.5': 'Lokale Betreuung vor, während und nach der Reise',
    'tourGeneric.exclude.0': 'Internationale Flüge und Visagebühren',
    'tourGeneric.exclude.1': 'Reiseversicherung',
    'tourGeneric.exclude.2': 'Trinkgelder, persönliche Ausgaben und nicht gelistete Leistungen',
    'tourCategory.All Journeys': 'Alle Reisen',
    'tourCategory.Historic & Religious': 'Historisch und Religiös',
    'tourCategory.Cultural': 'Kultur',
    'tourCategory.Nature & Wildlife': 'Natur und Wildtiere',
    'tourCategory.Trekking': 'Trekking',
    'tourCategory.Adventure': 'Abenteuer',
    'tourCategory.Festivals': 'Feste',
    'tourCategory.Grand Journeys': 'Große Reisen',
    'toursGrid.aria': 'Reisen nach Stil filtern',
    'toursGrid.empty': 'Noch keine Reise in diesem Stil; wir entwerfen eine.',
    'journeyStyle.Luxury': 'Luxus',
    'journeyStyle.Photography': 'Fotografie',
    'journeyStyle.Cultural': 'Kultur',
    'journeyStyle.Wildlife': 'Wildtiere',
    'journeyStyle.Trekking': 'Trekking',
    'journeyStyle.Festival': 'Festival',
    'journeyStyle.Layover': 'Layover',
    'journeyStyle.Family': 'Familie',
    'tourPromise.0.title': 'Lokal geführt, lokal begleitet',
    'tourPromise.0.text':
      'Ein Team in Addis aus Designern, Fachguides und Fahrern, die seit Jahren zusammenarbeiten.',
    'tourPromise.1.title': 'Entworfen, nie verpackt',
    'tourPromise.1.text':
      'Jeder Reiseplan entsteht neu um Ihr Tempo, Ihre Interessen und Ihren Umgang mit Höhe oder Fahrzeit.',
    'tourPromise.2.title': 'Zugang, der online nicht buchbar ist',
    'tourPromise.2.text':
      'Kuratoren, Priester, Archäologen und Handwerker öffnen Türen zu den richtigen Stunden.',
    'tourPromise.3.title': 'Präsent vor, während und nach der Reise',
    'tourPromise.3.text':
      'Ein fester Designer von der ersten Anfrage bis zur Abreise, mit 24-Stunden-Betreuung.',
    'tourFaq.0.question': 'Sind das feste Gruppenabfahrten?',
    'tourFaq.0.answer':
      'Nein. Unsere Reisen sind privat und werden um die gemeinsam Reisenden geplant. Die Routen sind Ausgangspunkte.',
    'tourFaq.1.question': 'Kann ich eine dieser Touren anpassen?',
    'tourFaq.1.answer':
      'Ja. Tempo, Länge, Unterkunft, Aktivitäten und Route passen wir an Ihre Daten, Interessen, Fahrzeit und Höhe an.',
    'tourFaq.2.question': 'Können zwei Reisepläne kombiniert werden?',
    'tourFaq.2.answer':
      'Ja. Viele Gäste kombinieren Teile zweier Routen. Sagen Sie uns, welche Orte zählen, und wir machen daraus eine praktische Reise.',
    'tourFaq.3.question': 'Was ist im Preis enthalten?',
    'tourFaq.3.answer':
      'Das finale Angebot bestätigt Unterkunft, Transport, Guides, Mahlzeiten, Flüge und Eintritte, die enthalten sind.',
    'tourFaq.4.question': 'Wie groß sind die Gruppen?',
    'tourFaq.4.answer':
      'Die Reisen sind privat; die veröffentlichten Routen sind für Gruppen bis zu zehn Personen gedacht.',
    'tourFaq.5.question': 'Was passiert nach meiner Anfrage?',
    'tourFaq.5.answer':
      'Ein Designer in Addis antwortet normalerweise innerhalb von 24 Stunden mit Fragen und einer ersten Route. Wir überarbeiten sie, bis sie stimmt.',
    'tourPlace.generic.status': 'Kuratierte Station',
    'tourPlace.generic.context':
      'Eine Station mit kulturellem, natürlichem oder historischem Wert, deren Timing an lokale Bedingungen angepasst wird.',
    'tourPlace.generic.experience':
      'Private Führung, lokaler Kontext und ein flexibles Tempo mit Raum für echte Begegnungen.',
    'tourPlace.generic.bestMoment':
      'Der beste Zeitpunkt wird kurz vor Reisebeginn nach Licht, Zugang und lokaler Empfehlung bestätigt.',
    'tourPlace.generic.logistics':
      'Wir bestätigen Straßen, Genehmigungen, Öffnungszeiten und Komfortdetails vor der finalen Route.',
    'destinationRegion.Lasta Highlands': 'Lasta-Hochland',
    'destinationRegion.Western Highlands': 'Westliches Hochland',
    'destinationRegion.Southwest Ethiopia': 'Südwestäthiopien',
    'destinationRegion.Kaffa Zone': 'Kaffa-Zone',
    'destinationRegion.Sidama and Rift Valley': 'Sidama und Rift Valley',
    'destinationRegion.Lower Omo': 'Unterer Omo',
    'destinationRegion.Omo and Mago area': 'Omo- und Mago-Gebiet',
    'destinationRegion.Oromia highlands': 'Oromia-Hochland',
    'placeName.Addis Ababa': 'Addis Abeba',
    'placeName.Bahir Dar': 'Bahir Dar',
    'placeName.Lake Tana': 'Tana-See',
    'placeName.Gondar': 'Gondar',
    'placeName.Simien Mountains National Park': 'Simien-Mountains-Nationalpark',
    'placeName.Lalibela': 'Lalibela',
    'placeName.Aksum': 'Aksum',
    'placeName.Bale Mountains National Park': 'Bale-Mountains-Nationalpark',
    'placeName.Sof Omar Cave': 'Sof-Omar-Höhle',
    'placeName.Jimma': 'Jimma',
    'placeName.Kaffa': 'Kaffa',
    'placeName.Bonga Forest': 'Bonga-Wald',
    'placeName.Hawassa': 'Hawassa',
    'placeName.Danakil Depression': 'Danakil-Depression',
    'placeName.Dallol': 'Dallol',
    'placeName.Lake Assale': 'Assale-See',
    'placeName.Erta Ale': 'Erta Ale',
    'placeName.Arba Minch': 'Arba Minch',
    'placeName.Dorze': 'Dorze',
    'placeName.Konso': 'Konso',
    'placeName.Omo Valley': 'Omo-Tal',
    'placeName.Turmi': 'Turmi',
    'placeName.Dimeka': 'Dimeka',
    'placeName.Mursi Highlands': 'Mursi-Hochland',
    'placeName.Karo': 'Karo',
    'placeName.Dire Dawa': 'Dire Dawa',
    'placeName.Harar Jugol': 'Harar Jugol',
    'placeName.Debre Libanos Monastery': 'Debre-Libanos-Kloster',
    'placeName.Wonchi Crater Lake': 'Wonchi-Kratersee',
    'placeName.Tiya Archaeological Site': 'Archäologische Stätte Tiya',
    'placeName.Adadi Mariam Rock-Hewn Church': 'Felsenkirche Adadi Mariam',
  },
  {
    'the-historic-route': { title: 'Klassischer Historischer Norden', style: 'Kultur · Privat', teaser: 'Folgen Sie der Route der Könige von Gondars Burgen zu Lalibelas Felsenkirchen.', summary: 'Der definitive Nordkreis: Inselklöster, kaiserliche Burgen, Bergkanten und lebendige Felsenkirchen in sorgfältigem Tempo.', days: '11 Tage', season: 'Okt – Mär', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'bale-mountains-and-sof-omar': { title: 'Bale Mountains und Sof Omar Abenteuer', style: 'Abenteuer · Privat', teaser: 'Suchen Sie äthiopische Wölfe auf Sanetti, steigen Sie in den Harenna-Wald ab und gehen Sie durch Sof Omars Kalksteinkammern.', summary: 'Ein fokussiertes Südost-Abenteuer, das Äthiopiens reichstes afro-alpines Wildtierhabitat mit einem der bemerkenswertesten Höhlensysteme Afrikas verbindet.', days: '6 Tage', season: 'Nov – Apr', from: 'Angebot nach Maß', group: '2 – 6 Gäste' },
    'ethiopia-coffee-origins': { title: 'Äthiopiens Kaffeeursprünge', style: 'Langsames Reisen · Privat', teaser: 'Folgen Sie dem Kaffee von Röstereien in Addis zu Farmen und Wäldern in Jimma, Kaffa und Sidama.', summary: 'Eine ruhige Reise in Äthiopiens Kaffeelandschaften mit Waldökologie, Familiengastfreundschaft, Farmbesuchen und Ritualen um jede Tasse.', days: '7 Tage', season: 'Ganzjährig', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'danakil-expedition': { title: 'Danakil-Depression und Erta Ale Expedition', style: 'Expedition · Kleine Gruppe', teaser: 'Schwefelquellen, ein permanenter Lavasee und Salzkarawanen auf der weißen Ebene.', summary: 'Eine kompakte, unterstützte Expedition in Salzflächen, Geothermalfelder und Vulkanlandschaften des Afar-Tieflands.', days: '4 Tage', season: 'Nov – Feb', from: 'Angebot nach Maß', group: '2 – 6 Gäste' },
    'omo-valley-immersion': { title: 'Kulturelle Entdeckung im Omo-Tal', style: 'Kultur · Privat', teaser: 'Markttage, Zeremonien und Gespräche in einem der kulturell dichtesten Täler der Erde.', summary: 'Gebaut um Markttage und Einladungen statt um eine starre Route, mit kulturellem Vermittler neben Ihrem Guide.', days: '10 Tage', season: 'Jun – Sep, Dez – Mär', from: 'Angebot nach Maß', group: '2 – 6 Gäste' },
    'timkat-festival-journey': { title: 'Timkat-Festivalreise', style: 'Festival · Privat', teaser: 'Äthiopiens Epiphanie: Prozessionen, weiße Gewänder und das Füllen des königlichen Bades.', summary: 'Ein festes Zeitfenster jeden Januar, ein Jahr im Voraus geplant, weil Zimmer und Standpunkte früh vergeben sind.', days: '8 Tage', season: 'Nur Januar', from: 'Angebot nach Maß', group: '2 – 10 Gäste' },
    'simien-mountains-trek': { title: 'Simien Mountains Trek', style: 'Trekking · Privat', teaser: 'Wandern Sie entlang der Kante zwischen Geladas, Wasserfällen und weiten Hochlandblicken.', summary: 'Ein fokussierter Trek von Gondar in den Simien-Mountains-Nationalpark mit flexiblen Distanzen, Parkscouts und betreuten Camps oder Lodges.', days: '5 Tage', season: 'Okt – Apr', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'lalibela-sacred-journey': { title: 'Heilige Reise nach Lalibela', style: 'Kultur · Privat', teaser: 'Vier ruhige Tage mit Felsenkirchen, Liturgie und Bergklöstern.', summary: 'Ein kurzes, intensives Lalibela-Programm für Reisende, die Tiefe möchten, ohne den ganzen Nordkreis zu machen.', days: '4 Tage', season: 'Okt – Mär', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'grand-ethiopia-highlights': { title: 'Große Höhepunkte Äthiopiens', style: 'Kultur · Privat', teaser: 'Historischer Norden, östliche Städte, südliche Kulturen und Hochlandwildtiere in einer großen Reise.', summary: 'Unsere breiteste Einführung in Äthiopien, mit Inlandsflügen und ausgewählten Straßenabschnitten zu den prägenden Geschichten, Kulturen und Landschaften.', days: '18 Tage', season: 'Okt – Mär', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'historic-north-and-danakil': { title: 'Historischer Norden und Danakil-Abenteuer', style: 'Expedition · Privat', teaser: 'Von Inselklöstern und alten Hauptstädten zu Salzflächen und einem lebenden Vulkan.', summary: 'Eine kontrastreiche Nordreise, die den historischen Kreis mit einer voll unterstützten Danakil-Expedition verbindet, abhängig vom saisonalen Zugang.', days: '14 Tage', season: 'Nov – Feb', from: 'Angebot nach Maß', group: '2 – 6 Gäste' },
    'historic-north-and-omo-valley': { title: 'Historischer Norden und Omo-Tal', style: 'Kultur · Privat', teaser: 'Eine weite Kulturroute von nördlichen Königreichen zu Gemeinden im Süden Äthiopiens.', summary: 'Zwei wesentliche Kulturregionen Äthiopiens in einer Reise, verbunden durch Inlandsflüge und geführt mit Kontext, Zustimmung und Zeit.', days: '15 Tage', season: 'Okt – Mär', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'harar-and-dire-dawa': { title: 'Kulturreise Harar und Dire Dawa', style: 'Kultur · Privat', teaser: 'Eisenbahnerbe, Harari-Häuser, Altstadtgassen und Handelswelten des Ostens.', summary: 'Eine kurze Ostreise, die Dire Dawas Eisenbahngeschichte mit lebendigem islamischem Erbe, Märkten und Architektur von Harar Jugol verbindet.', days: '4 Tage', season: 'Okt – Mär', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'rift-valley-southern-highlands': { title: 'Rift-Valley-Seen und Südliches Hochland', style: 'Langsames Reisen · Privat', teaser: 'Seestädte, Hochlanddörfer und südliche Landschaften in angenehmem Tempo.', summary: 'Eine sanftere Südroute durch Hawassa, Arba Minch, Dorze und Konso für Reisende, die Natur und Kultur ohne lange Lower-Omo-Expedition möchten.', days: '7 Tage', season: 'Okt – Mai', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'addis-ababa-central-highlands': { title: 'Addis Abeba und Zentrales Hochland', style: 'Kultur · Privat', teaser: 'Die Hauptstadt, heilige Hochländer, ein Kratersee und Archäologie in einer kompakten Route.', summary: 'Eine zugängliche fünftägige Reise rund um Addis Abeba mit Tagesausflügen nach Debre Libanos, Wonchi, Tiya und Adadi Mariam.', days: '5 Tage', season: 'Okt – Mai', from: 'Angebot nach Maß', group: '2 – 8 Gäste' },
    'genna-in-lalibela': { title: 'Genna in Lalibela', style: 'Festival · Privat', teaser: 'Äthiopische Weihnachten zwischen Kerzenprozessionen und weiß gekleideten Pilgern in Lalibela.', summary: 'Eine Festivalreise mit festen Daten rund um Gennas Nachtwachen und Zeremonien, mit früh reservierten Zimmern und Guides.', days: '4 Tage', season: 'Nur Januar', from: 'Angebot nach Maß', group: '2 – 10 Gäste' },
  },
)

assignTourPageTranslations(
  'ZH',
  {
    'toursPage.hero.eyebrow': '行程与旅程',
    'toursPage.hero.title': '十五条路线，没有一条固定',
    'toursPage.hero.lede':
      '请把这些看作起点，而不是套装。每条路线都会围绕同行旅客重新设计。',
    'toursPage.hero.imageAlt': '埃塞俄比亚 Gondar 的历史皇家城堡群',
    'toursPage.meta.journeys': '旅程',
    'toursPage.meta.length': '时长',
    'toursPage.meta.lengthValue': '4 – 18 天',
    'toursPage.meta.group': '团队规模',
    'toursPage.meta.groupValue': '2 – 10 位旅客',
    'toursPage.meta.guiding': '向导',
    'toursPage.meta.guidingValue': '私人',
    'toursPage.featured.badge': '最多咨询',
    'toursPage.featured.eyebrow': '招牌旅程',
    'toursPage.featured.cta': '查看完整行程',
    'toursPage.collection.eyebrow': '行程系列',
    'toursPage.collection.title': '我们设计的所有旅程',
    'toursPage.collection.aside':
      '按旅行方式筛选。每条路线都可以加长、缩短或组合。',
    'toursPage.promises.eyebrow': '我们的工作方式',
    'toursPage.promises.title': '本页每段旅程共同遵循的原则',
    'toursPage.faq.eyebrow': '规划您的旅程',
    'toursPage.faq.title': '关于行程的问题，清楚回答',
    'toursPage.cta.title': '也可以从空白页开始',
    'toursPage.cta.text':
      '许多客人最终会在两条路线之间。告诉我们您脑中的旅程，设计师会认真画出来。',
    'toursPage.cta.secondary': '查看目的地',
    'tourDetail.meta.duration': '时长',
    'tourDetail.meta.season': '季节',
    'tourDetail.meta.group': '团队',
    'tourDetail.meta.groupSize': '团队规模',
    'tourDetail.meta.pricing': '价格',
    'tourDetail.meta.bestSeason': '最佳季节',
    'tourDetail.meta.style': '风格',
    'tourDetail.private': '私人',
    'tourDetail.overview.eyebrow': '旅程',
    'tourDetail.overview.title': '{nights} 晚，围绕关键时段设计',
    'tourDetail.places': '地点',
    'tourDetail.price.eyebrow': '参考价格',
    'tourDetail.price.copy': '根据日期、团队和房型偏好定制',
    'tourDetail.price.cta': '咨询此旅程',
    'tourDetail.price.note':
      '最终价格取决于季节、房型和团队规模。只有行程确认合适后才收取订金。',
    'tourDetail.intelligence.eyebrow': '路线洞察',
    'tourDetail.intelligence.title': '带着背景理解这些地点',
    'tourDetail.intelligence.copy':
      '每一站的简明说明：为什么重要、会体验什么，以及哪些细节让私人旅程更顺畅。',
    'tourDetail.intelligence.stops': '停靠点',
    'tourDetail.bestMoment': '最佳时刻',
    'tourDetail.itinerary.eyebrow': '每日安排',
    'tourDetail.itinerary.title': '行程通常如何展开',
    'tourDetail.itinerary.copy':
      '这是工作草案，不是固定时间表。我们会根据天气、节庆和您的状态调整。',
    'tourDetail.included': '包含内容',
    'tourDetail.notIncluded': '不包含',
    'tourDetail.enquire.eyebrow': '咨询',
    'tourDetail.enquire.title': '让 {tour} 成为您的旅程',
    'tourDetail.enquire.copy':
      '发送您的日期，我们会确认可行性、精确报价，并提出真正值得调整的两三点。',
    'tourDetail.enquire.runs': '运营季节',
    'tourDetail.other.eyebrow': '其他旅程',
    'tourDetail.other.title': '您也可能正在比较',
    'tourDetail.other.all': '所有行程',
    'tourDetail.cta.title': '咨询前还有问题？',
    'tourDetail.cta.text':
      '海拔、车程、徒步真实难度，或孩子是否适合。尽管询问，设计师会如实回答。',
    'tourDetail.cta.secondary': '转机游',
    'tourDay.day': '第',
    'tourDay.days': '第',
    'tourDay.stage': '阶段',
    'tourMeta.nights': '{count} 晚',
    'tourGeneric.itineraryTitle': '私人阶段',
    'tourGeneric.itinerary.0': '抵达、私人迎接，并在路线开始前进行初步说明。',
    'tourGeneric.itinerary.1': '第一段私人向导行程，时间灵活并加入当地背景。',
    'tourGeneric.itinerary.2': '主要探索日，配合专业向导、精心停靠和舒适节奏。',
    'tourGeneric.itinerary.3': '沉浸体验日，根据天气与通行情况调整。',
    'tourGeneric.itinerary.4': '继续路线，结合景观、文化和持续后勤支持。',
    'tourGeneric.itinerary.5': '最后的区域阶段，为休息、摄影或额外访问保留空间。',
    'tourGeneric.itinerary.6': '返回或离境，私人接送并预留安全衔接时间。',
    'tourGeneric.include.0': '私人行程设计与当地协调',
    'tourGeneric.include.1': '舒适交通与专业司机向导',
    'tourGeneric.include.2': '在需要处安排专业当地向导',
    'tourGeneric.include.3': '按可订情况精心选择住宿',
    'tourGeneric.include.4': '报价中确认的门票、许可或社区安排',
    'tourGeneric.include.5': '旅前、旅中与旅后的当地支持',
    'tourGeneric.exclude.0': '国际航班与签证费用',
    'tourGeneric.exclude.1': '旅行保险',
    'tourGeneric.exclude.2': '小费、个人消费及未列明服务',
    'tourCategory.All Journeys': '所有旅程',
    'tourCategory.Historic & Religious': '历史与宗教',
    'tourCategory.Cultural': '文化',
    'tourCategory.Nature & Wildlife': '自然与野生动物',
    'tourCategory.Trekking': '徒步',
    'tourCategory.Adventure': '探险',
    'tourCategory.Festivals': '节庆',
    'tourCategory.Grand Journeys': '大旅行',
    'toursGrid.aria': '按风格筛选旅程',
    'toursGrid.empty': '这个风格目前没有现成旅程；我们可以为您设计。',
    'journeyStyle.Luxury': '奢华',
    'journeyStyle.Photography': '摄影',
    'journeyStyle.Cultural': '文化',
    'journeyStyle.Wildlife': '野生动物',
    'journeyStyle.Trekking': '徒步',
    'journeyStyle.Festival': '节庆',
    'journeyStyle.Layover': '转机',
    'journeyStyle.Family': '家庭',
    'tourPromise.0.title': '本地拥有，本地向导',
    'tourPromise.0.text':
      'Addis 的设计师、学者向导和司机团队，已经合作多年。',
    'tourPromise.1.title': '只做设计，不做套装',
    'tourPromise.1.text':
      '每份行程都从零开始，围绕您的节奏、兴趣以及对海拔和车程的舒适度。',
    'tourPromise.2.title': '网上无法预订的进入方式',
    'tourPromise.2.text':
      '策展人、神父、考古学者和手工艺人，在合适的时段打开真正的门。',
    'tourPromise.3.title': '旅前、旅中、旅后都在',
    'tourPromise.3.text':
      '从第一次咨询到最后离境，都有同一位设计师负责，并提供 24 小时支持。',
    'tourFaq.0.question': '这些是固定团期吗？',
    'tourFaq.0.answer':
      '不是。我们的旅程是私人定制，围绕同行者设计。本页路线只是起点。',
    'tourFaq.1.question': '我可以定制其中一条路线吗？',
    'tourFaq.1.answer':
      '可以。我们会按您的日期、兴趣、住宿、活动、车程和海拔舒适度调整。',
    'tourFaq.2.question': '两条行程可以组合吗？',
    'tourFaq.2.answer':
      '可以。许多客人会组合两条路线的一部分。告诉我们最重要的地点，我们会重画成一条可行路线。',
    'tourFaq.3.question': '价格包含什么？',
    'tourFaq.3.answer':
      '最终方案会明确住宿、交通、向导、餐食、航班和门票中哪些包含在报价内。',
    'tourFaq.4.question': '团队规模多大？',
    'tourFaq.4.answer':
      '旅程为私人形式，公开路线通常适合最多十位客人。',
    'tourFaq.5.question': '咨询之后会发生什么？',
    'tourFaq.5.answer':
      'Addis 的设计师通常会在 24 小时内回复问题和第一版路线，并继续修改到合适为止。',
    'tourPlace.generic.status': '精选停靠点',
    'tourPlace.generic.context':
      '因文化、自然或历史价值而被选入的停靠点，时间会根据当地条件调整。',
    'tourPlace.generic.experience':
      '私人向导、当地背景和灵活节奏，为真实交流留下空间。',
    'tourPlace.generic.bestMoment':
      '最佳时段会在临近出发时，根据光线、通行和当地建议确认。',
    'tourPlace.generic.logistics':
      '最终确认路线前，我们会核实道路、许可、开放时间和舒适细节。',
    'destinationRegion.Lasta Highlands': 'Lasta 高原',
    'destinationRegion.Western Highlands': '西部高原',
    'destinationRegion.Southwest Ethiopia': '埃塞俄比亚西南部',
    'destinationRegion.Kaffa Zone': 'Kaffa 地区',
    'destinationRegion.Sidama and Rift Valley': 'Sidama 与裂谷',
    'destinationRegion.Lower Omo': '下奥莫',
    'destinationRegion.Omo and Mago area': 'Omo 与 Mago 区域',
    'destinationRegion.Oromia highlands': '奥罗米亚高原',
    'placeName.Addis Ababa': 'Addis Ababa',
    'placeName.Bahir Dar': 'Bahir Dar',
    'placeName.Lake Tana': 'Tana 湖',
    'placeName.Gondar': 'Gondar',
    'placeName.Simien Mountains National Park': 'Simien 山脉国家公园',
    'placeName.Lalibela': 'Lalibela',
    'placeName.Aksum': 'Aksum',
    'placeName.Bale Mountains National Park': 'Bale 山脉国家公园',
    'placeName.Sof Omar Cave': 'Sof Omar 洞穴',
    'placeName.Jimma': 'Jimma',
    'placeName.Kaffa': 'Kaffa',
    'placeName.Bonga Forest': 'Bonga 森林',
    'placeName.Hawassa': 'Hawassa',
    'placeName.Danakil Depression': 'Danakil 洼地',
    'placeName.Dallol': 'Dallol',
    'placeName.Lake Assale': 'Assale 湖',
    'placeName.Erta Ale': 'Erta Ale',
    'placeName.Arba Minch': 'Arba Minch',
    'placeName.Dorze': 'Dorze',
    'placeName.Konso': 'Konso',
    'placeName.Omo Valley': '奥莫河谷',
    'placeName.Turmi': 'Turmi',
    'placeName.Dimeka': 'Dimeka',
    'placeName.Mursi Highlands': 'Mursi 高地',
    'placeName.Karo': 'Karo',
    'placeName.Dire Dawa': 'Dire Dawa',
    'placeName.Harar Jugol': 'Harar Jugol',
    'placeName.Debre Libanos Monastery': 'Debre Libanos 修道院',
    'placeName.Wonchi Crater Lake': 'Wonchi 火山口湖',
    'placeName.Tiya Archaeological Site': 'Tiya 考古遗址',
    'placeName.Adadi Mariam Rock-Hewn Church': 'Adadi Mariam 岩石教堂',
  },
  {
    'the-historic-route': { title: '经典北部历史之旅', style: '文化 · 私人', teaser: '从 Gondar 城堡到 Lalibela 岩石教堂，追随王国与朝圣的路线。', summary: '最完整的北部环线，把湖岛修道院、帝国城堡、山地断崖和仍在使用的岩石教堂串联起来。', days: '11 天', season: '10月 – 3月', from: '定制报价', group: '2 – 8 位旅客' },
    'bale-mountains-and-sof-omar': { title: 'Bale 山脉与 Sof Omar 探险', style: '探险 · 私人', teaser: '在 Sanetti 高原寻找埃塞俄比亚狼，进入 Harenna 森林，再步行穿过 Sof Omar 石灰岩洞穴。', summary: '一段聚焦东南部的探险，把埃塞俄比亚最丰富的高山生态与非洲重要洞穴系统之一结合。', days: '6 天', season: '11月 – 4月', from: '定制报价', group: '2 – 6 位旅客' },
    'ethiopia-coffee-origins': { title: '埃塞俄比亚咖啡源流之旅', style: '慢旅行 · 私人', teaser: '从 Addis 的烘焙店一路到 Jimma、Kaffa 和 Sidama 的农场与森林。', summary: '深入埃塞俄比亚咖啡景观的慢旅程，结合森林生态、家庭款待、农场访问和每杯咖啡背后的仪式。', days: '7 天', season: '全年', from: '定制报价', group: '2 – 8 位旅客' },
    'danakil-expedition': { title: 'Danakil 与 Erta Ale 探险', style: '探险 · 小团', teaser: '硫磺泉、永久熔岩湖，以及白色盐原上的盐队。', summary: '进入 Afar 低地盐原、地热区域和火山景观的紧凑支援型探险。', days: '4 天', season: '11月 – 2月', from: '定制报价', group: '2 – 6 位旅客' },
    'omo-valley-immersion': { title: '奥莫河谷文化发现', style: '文化 · 私人', teaser: '在世界文化密度最高的河谷之一，体验市场日、仪式与对话。', summary: '围绕市场日和真实邀请设计，而不是固定路线，全程配合文化协调人与向导。', days: '10 天', season: '6月 – 9月，12月 – 3月', from: '定制报价', group: '2 – 6 位旅客' },
    'timkat-festival-journey': { title: 'Timkat 节庆之旅', style: '节庆 · 私人', teaser: '埃塞俄比亚主显节：队列、白袍与注满水的皇家浴池。', summary: '每年一月固定窗口，需要提前一年规划，因为房间和观看位置很早被订完。', days: '8 天', season: '仅一月', from: '定制报价', group: '2 – 10 位旅客' },
    'simien-mountains-trek': { title: 'Simien 山脉徒步', style: '徒步 · 私人', teaser: '沿断崖行走，在狮尾狒狒、瀑布和广阔高地景色之间。', summary: '从 Gondar 进入 Simien 山脉国家公园的专注徒步，可调整距离，配合公园 scout 与营地或 lodge。', days: '5 天', season: '10月 – 4月', from: '定制报价', group: '2 – 8 位旅客' },
    'lalibela-sacred-journey': { title: 'Lalibela 神圣之旅', style: '文化 · 私人', teaser: '四天不匆忙地体验岩石教堂、礼拜和山地修道院。', summary: '一个短而深入的 Lalibela 项目，适合想要深度但不走完整北线的旅客。', days: '4 天', season: '10月 – 3月', from: '定制报价', group: '2 – 8 位旅客' },
    'grand-ethiopia-highlights': { title: '埃塞俄比亚全景精华', style: '文化 · 私人', teaser: '北部历史、东部城市、南部文化和高地野生动物，组成一次大旅程。', summary: '我们最全面的埃塞俄比亚入门路线，用国内航班和精选公路段连接国家最重要的历史、文化和景观。', days: '18 天', season: '10月 – 3月', from: '定制报价', group: '2 – 8 位旅客' },
    'historic-north-and-danakil': { title: '历史北线与 Danakil 探险', style: '探险 · 私人', teaser: '从湖岛修道院和古都，到盐原与活火山。', summary: '对比强烈的北部旅程，把历史环线与完整支援的 Danakil 探险结合，视季节通行而定。', days: '14 天', season: '11月 – 2月', from: '定制报价', group: '2 – 6 位旅客' },
    'historic-north-and-omo-valley': { title: '历史北线与奥莫河谷', style: '文化 · 私人', teaser: '从北部王国到南部社区的一条宏大文化路线。', summary: '把埃塞俄比亚两个关键文化区域放进一段行程，以国内航班连接，并以背景、同意和时间来引导。', days: '15 天', season: '10月 – 3月', from: '定制报价', group: '2 – 8 位旅客' },
    'harar-and-dire-dawa': { title: 'Harar 与 Dire Dawa 文化之旅', style: '文化 · 私人', teaser: '铁路遗产、Harari 家宅、古城巷道和东部商贸文化。', summary: '短途东部旅程，把 Dire Dawa 的铁路故事与 Harar Jugol 的活态伊斯兰遗产、市场和民居建筑结合。', days: '4 天', season: '10月 – 3月', from: '定制报价', group: '2 – 8 位旅客' },
    'rift-valley-southern-highlands': { title: '裂谷湖泊与南部高原', style: '慢旅行 · 私人', teaser: '湖畔城市、高地村落和南部景观，以舒适节奏展开。', summary: '经 Hawassa、Arba Minch、Dorze 和 Konso 的温和南部路线，适合想要自然与文化但不做长线下奥莫探险的旅客。', days: '7 天', season: '10月 – 5月', from: '定制报价', group: '2 – 8 位旅客' },
    'addis-ababa-central-highlands': { title: 'Addis Ababa 与中部高原', style: '文化 · 私人', teaser: '首都、神圣高地、火山口湖和考古遗址，组成紧凑路线。', summary: '以 Addis Ababa 为中心的五天轻松旅程，包含 Debre Libanos、Wonchi、Tiya 和 Adadi Mariam 一日游。', days: '5 天', season: '10月 – 5月', from: '定制报价', group: '2 – 8 位旅客' },
    'genna-in-lalibela': { title: 'Lalibela 的 Genna 圣诞', style: '节庆 · 私人', teaser: '在 Lalibela 的烛光队列和白袍朝圣者之间体验埃塞俄比亚圣诞。', summary: '围绕 Genna 守夜和仪式设计的固定日期节庆之旅，房间和向导需提前预留。', days: '4 天', season: '仅一月', from: '定制报价', group: '2 – 10 位旅客' },
  },
)

Object.assign(dictionaries.ES, {
  'journalTeaser.aside':
    'Guías de planificación, ensayos de destinos y notas escritas por los diseñadores y guías que realizan estos viajes.',
  'journalTeaser.cta': 'Leer el diario',
  'contact.hero.eyebrow': 'Hablar Con Un Diseñador',
  'contact.hero.title': 'Todo viaje comienza con una conversación',
  'contact.hero.lede':
    'Sin centros de llamadas ni plantillas. Escríbanos y un diseñador en Addis responde personalmente, normalmente el mismo día.',
  'contact.hero.imageAlt': 'Addis Abeba, sede del equipo de diseño de viajes de EthioAfro',
  'contact.meta.reply': 'Tiempo de respuesta',
  'contact.meta.replyValue': 'Dentro de 24 h',
  'contact.meta.based': 'Base',
  'contact.meta.support': 'Soporte',
  'contact.meta.supportValue': '24/7 en destino',
  'contact.meta.deposit': 'Depósito',
  'contact.meta.depositValue': 'Solo cuando esté correcto',
  'contact.touch.eyebrow': 'Contacto',
  'contact.touch.title': 'Cuéntenos el viaje que tiene en mente',
  'contact.touch.copy':
    'Aunque la idea sea inicial, es suficiente. Volveremos con preguntas, una ruta que valga la pena considerar y una respuesta clara sobre costos.',
  'contact.detail.phone': 'Teléfono',
  'contact.detail.email': 'Correo electrónico',
  'contact.detail.office': 'Oficina',
  'contact.detail.hours': 'Horario',
  'contact.steps.eyebrow': 'Qué Pasa Después',
  'contact.steps.title': 'Cómo se diseña un viaje',
  'contact.steps.aside':
    'Cuatro pasos, y no se paga nada hasta que el tercero le parezca correcto.',
  'contact.step.0.title': 'Usted escribe, nosotros escuchamos',
  'contact.step.0.text':
    'Una frase basta para empezar: fechas, ritmo, tolerancia a la altitud y cómo quiere que se sienta el viaje.',
  'contact.step.1.title': 'Trazamos una ruta',
  'contact.step.1.text':
    'En 24 horas, un diseñador asignado envía un primer esquema con dos o tres opciones y precios honestos.',
  'contact.step.2.title': 'La redibujamos',
  'contact.step.2.text':
    'Normalmente dos veces, a veces cuatro. Nada se reserva y no hay depósito hasta que le parezca correcto.',
  'contact.step.3.title': 'Estamos presentes',
  'contact.step.3.text':
    'Recepción a la llegada, guía durante el viaje y una línea 24 horas con su diseñador.',
  'contact.promise.eyebrow': 'Nuestra Promesa',
  'contact.promise.title': 'Qué obtiene al trabajar con nosotros',
  'article.breadcrumb': 'Ruta de navegación',
  'article.generic.body.0':
    'Este artículo resume cómo pensamos una ruta privada en Etiopía: temporada, acceso, comodidad y contexto local.',
  'article.generic.body.1':
    'Cada recomendación nace de viajes reales y de conversaciones con guías, comunidades y viajeros.',
  'article.generic.body.2':
    'El resultado es una planificación más honesta, con mejores horarios y menos prisa.',
  'article.generic.body.3':
    'Si desea vivirlo, diseñamos la ruta alrededor de sus fechas, intereses y ritmo.',
  'article.generic.body.4':
    'Nuestro equipo en Addis confirma las condiciones antes de cerrar cada detalle.',
  'article.writtenBy': 'Escrito por',
  'article.questions': 'Las preguntas sobre lo anterior siempre son bienvenidas',
  'article.write': 'escríbanos',
  'article.readNext': 'Leer Después',
  'article.more.eyebrow': 'Más Del Diario',
  'article.more.title': 'También merece su tiempo',
  'article.more.all': 'Todos los textos',
  'article.cta.title': '¿Listo para verlo por usted mismo?',
  'article.cta.text':
    'Cada ensayo nace de un viaje diseñado para alguien. Cuéntenos cómo quiere que se sienta el suyo.',
  'postAuthorRole.Head of Journey Design': 'Jefa de Diseño de Viajes',
  'postAuthorRole.Senior Guide, Northern Circuit': 'Guía Senior, Circuito Norte',
  'postAuthorRole.Culture & Community Lead': 'Responsable de Cultura y Comunidad',
  'experienceDetail.meta.Duration': 'Duración',
  'experienceDetail.meta.Regions': 'Regiones',
  'experienceDetail.meta.Route': 'Ruta',
  'experienceDetail.meta.Focus': 'Enfoque',
  'experienceDetail.meta.Style': 'Estilo',
  'experienceDetail.meta.Base': 'Base',
  'experienceDetail.metaValue.0': '7 – 14 días',
  'experienceDetail.metaValue.1': 'Etiopía privada',
  'experienceDetail.metaValue.2': 'Acceso, cultura, confort',
  'experienceDetail.metaValue.3': 'Privado premium',
  'experienceDetail.overview.eyebrow': 'La Experiencia',
  'experienceDetail.generic.overviewTitle':
    'Una experiencia privada diseñada alrededor de acceso, ritmo y contexto',
  'experienceDetail.generic.overview.0':
    'Esta experiencia se adapta a sus intereses, fechas y nivel de comodidad, con guías locales y acceso cuidadosamente coordinado.',
  'experienceDetail.generic.overview.1':
    'El ritmo protege los momentos importantes: luz, conversación, descanso y encuentros auténticos.',
  'experienceDetail.generic.overview.2':
    'La ruta puede ampliarse o comprimirse según la temporada, disponibilidad y el estilo de viaje que prefiera.',
  'experienceDetail.signature': 'Detalles Signature',
  'experienceDetail.signatureLabel.0': 'Ruta',
  'experienceDetail.signatureLabel.1': 'Acceso',
  'experienceDetail.signatureLabel.2': 'Hospitalidad',
  'experienceDetail.signatureLabel.3': 'Ritmo',
  'experienceDetail.generic.signature.0': 'Ruta privada diseñada a medida',
  'experienceDetail.generic.signature.1': 'Guías locales y accesos coordinados',
  'experienceDetail.generic.signature.2': 'Alojamientos seleccionados según disponibilidad',
  'experienceDetail.generic.signature.3': 'Ritmo flexible según temporada y carretera',
  'experienceDetail.planButton': 'Planificar Esta Experiencia',
  'experienceDetail.route.eyebrow': 'Diseño de Ruta',
  'experienceDetail.generic.routeTitle': 'Una ruta diseñada alrededor de la experiencia',
  'experienceDetail.generic.routeIntro':
    'El diseño final depende de temporada, acceso y estilo de viaje, pero el ritmo siempre es privado y cuidado.',
  'experienceDetail.generic.routePhase.0': 'Inicio',
  'experienceDetail.generic.routePhase.1': 'Desarrollo',
  'experienceDetail.generic.routePhase.2': 'Profundidad',
  'experienceDetail.generic.routePhase.3': 'Extensión',
  'experienceDetail.generic.routePhase.4': 'Cierre',
  'experienceDetail.generic.routeStepTitle': 'Etapa privada',
  'experienceDetail.generic.route.0': 'Llegada, orientación privada y primera lectura del viaje.',
  'experienceDetail.generic.route.1': 'Exploración guiada con tiempos protegidos y contexto local.',
  'experienceDetail.generic.route.2': 'Encuentros o paisajes centrales, con ritmo ajustado a las condiciones.',
  'experienceDetail.generic.route.3': 'Extensión opcional para añadir profundidad sin prisa.',
  'experienceDetail.generic.route.4': 'Cierre cómodo con regreso, descanso o conexión protegida.',
  'experienceDetail.touchpoints.eyebrow': 'Detalles Premium',
  'experienceDetail.touchpoints.title': 'Los detalles que hacen que se sienta cuidado',
  'experienceDetail.generic.highlight.0.title': 'Acceso Local',
  'experienceDetail.generic.highlight.0.text':
    'Presentaciones y guías seleccionados para que la experiencia tenga contexto real.',
  'experienceDetail.generic.highlight.1.title': 'Ritmo Privado',
  'experienceDetail.generic.highlight.1.text':
    'Los días se diseñan alrededor de luz, descanso, conversaciones y comodidad.',
  'experienceDetail.generic.highlight.2.title': 'Logística Cuidada',
  'experienceDetail.generic.highlight.2.text':
    'Transporte, horarios y soporte local se coordinan para que el viaje fluya.',
  'experienceDetail.pictures.eyebrow': 'En Imágenes',
  'experienceDetail.pictures.title': 'Un ritmo visual para este estilo de viaje',
  'experienceDetail.pictures.copy':
    'Escenas de origen, paisaje, cultura y hospitalidad muestran el tono del viaje.',
  'experienceDetail.generic.gallery.0.title': 'Momentos de Origen',
  'experienceDetail.generic.gallery.0.text': 'Escenas íntimas que muestran de dónde nace la experiencia.',
  'experienceDetail.generic.gallery.1.title': 'Paisaje y Confort',
  'experienceDetail.generic.gallery.1.text': 'Días activos y noches cómodas, equilibrados con cuidado.',
  'experienceDetail.generic.gallery.2.title': 'Conexiones Locales',
  'experienceDetail.generic.gallery.2.text': 'Personas, lugares y contexto al centro de la ruta.',
  'experienceDetail.suits.eyebrow': 'Para Quién Es',
  'experienceDetail.suits.title': 'Diseñado para viajeros que cuidan cómo se construye el viaje',
  'experienceDetail.generic.bestFor.0': 'Viajeros privados de lujo',
  'experienceDetail.generic.bestFor.1': 'Parejas y familias curiosas',
  'experienceDetail.generic.bestFor.2': 'Fotógrafos, amantes de la cultura o del café',
  'experienceDetail.generic.bestFor.3': 'Grupos que buscan acceso poco común',
  'experienceDetail.included': 'Incluido En El Diseño',
  'experienceDetail.related.eyebrow': 'Viajes Conectados',
  'experienceDetail.related.title': 'Rutas que combinan naturalmente con esta experiencia',
  'experienceDetail.generic.related.0': 'Ruta privada relacionada',
  'experienceDetail.generic.related.1': 'Extensión natural',
  'experienceDetail.enquire.eyebrow': 'Planificar Esta Experiencia',
  'experienceDetail.enquire.title': 'Cuéntenos cómo quiere que se sienta {experience}',
  'experienceDetail.enquire.copy':
    'Comparta fechas, intereses y nivel de comodidad. Diseñaremos ruta, accesos, alojamientos y ritmo diario alrededor de usted.',
})

Object.assign(dictionaries.FR, {
  'journalTeaser.aside':
    'Conseils de planification, essais de destinations et notes écrites par les designers et guides qui conduisent ces voyages.',
  'journalTeaser.cta': 'Lire le journal',
  'contact.hero.eyebrow': 'Parler à un Designer',
  'contact.hero.title': 'Chaque voyage commence par une conversation',
  'contact.hero.lede':
    'Pas de centres d’appel, pas de modèles. Écrivez-nous et un designer basé à Addis répond personnellement, souvent le jour même.',
  'contact.hero.imageAlt': 'Addis-Abeba, base de l’équipe de design de voyage EthioAfro',
  'contact.meta.reply': 'Délai de réponse',
  'contact.meta.replyValue': 'Sous 24 h',
  'contact.meta.based': 'Basé à',
  'contact.meta.support': 'Assistance',
  'contact.meta.supportValue': '24/7 dans le pays',
  'contact.meta.deposit': 'Acompte',
  'contact.meta.depositValue': 'Seulement quand tout est juste',
  'contact.touch.eyebrow': 'Contact',
  'contact.touch.title': 'Parlez-nous du voyage que vous avez en tête',
  'contact.touch.copy':
    'Même une idée très simple suffit. Nous reviendrons avec des questions, une route à considérer et une réponse claire sur le coût.',
  'contact.detail.phone': 'Téléphone',
  'contact.detail.email': 'E-mail',
  'contact.detail.office': 'Bureau',
  'contact.detail.hours': 'Horaires',
  'contact.steps.eyebrow': 'Et Ensuite',
  'contact.steps.title': 'Comment un voyage se dessine',
  'contact.steps.aside':
    'Quatre étapes, et aucun paiement avant que la troisième vous semble juste.',
  'contact.step.0.title': 'Vous écrivez, nous écoutons',
  'contact.step.0.text':
    'Une phrase suffit : dates, rythme, tolérance à l’altitude et ambiance souhaitée.',
  'contact.step.1.title': 'Nous dessinons une route',
  'contact.step.1.text':
    'Sous 24 heures, un designer nommé envoie une première proposition avec options et prix honnêtes.',
  'contact.step.2.title': 'Nous la redessinons',
  'contact.step.2.text':
    'Souvent deux fois, parfois quatre. Rien n’est réservé et aucun acompte n’est demandé avant que ce soit juste.',
  'contact.step.3.title': 'Nous sommes présents',
  'contact.step.3.text':
    'Accueil à l’arrivée, guidage tout au long du voyage et ligne 24 h/24 avec votre designer.',
  'contact.promise.eyebrow': 'Notre Promesse',
  'contact.promise.title': 'Ce que vous gagnez en travaillant avec nous',
  'article.breadcrumb': 'Fil d’Ariane',
  'article.generic.body.0':
    'Cet article résume notre manière de penser une route privée en Éthiopie : saison, accès, confort et contexte local.',
  'article.generic.body.1':
    'Chaque recommandation vient de voyages réels et de conversations avec guides, communautés et voyageurs.',
  'article.generic.body.2':
    'Le résultat est une planification plus honnête, avec de meilleurs horaires et moins de hâte.',
  'article.generic.body.3':
    'Si vous souhaitez le vivre, nous dessinons la route autour de vos dates, intérêts et rythme.',
  'article.generic.body.4':
    'Notre équipe à Addis vérifie les conditions avant de verrouiller chaque détail.',
  'article.writtenBy': 'Écrit par',
  'article.questions': 'Les questions sur ce sujet sont toujours bienvenues',
  'article.write': 'écrivez-nous',
  'article.readNext': 'Lire Ensuite',
  'article.more.eyebrow': 'Plus Du Journal',
  'article.more.title': 'À lire aussi',
  'article.more.all': 'Tous les articles',
  'article.cta.title': 'Prêt à le voir par vous-même ?',
  'article.cta.text':
    'Chaque essai vient d’un voyage conçu pour quelqu’un. Dites-nous ce que vous voulez ressentir.',
  'postAuthorRole.Head of Journey Design': 'Responsable du Design de Voyage',
  'postAuthorRole.Senior Guide, Northern Circuit': 'Guide Senior, Circuit Nord',
  'postAuthorRole.Culture & Community Lead': 'Responsable Culture et Communauté',
  'experienceDetail.meta.Duration': 'Durée',
  'experienceDetail.meta.Regions': 'Régions',
  'experienceDetail.meta.Route': 'Route',
  'experienceDetail.meta.Focus': 'Focus',
  'experienceDetail.meta.Style': 'Style',
  'experienceDetail.meta.Base': 'Base',
  'experienceDetail.metaValue.0': '7 – 14 jours',
  'experienceDetail.metaValue.1': 'Éthiopie privée',
  'experienceDetail.metaValue.2': 'Accès, culture, confort',
  'experienceDetail.metaValue.3': 'Privé premium',
  'experienceDetail.overview.eyebrow': 'L’Expérience',
  'experienceDetail.generic.overviewTitle':
    'Une expérience privée façonnée autour de l’accès, du rythme et du contexte',
  'experienceDetail.generic.overview.0':
    'Cette expérience s’adapte à vos intérêts, dates et niveau de confort, avec guides locaux et accès soigneusement coordonné.',
  'experienceDetail.generic.overview.1':
    'Le rythme protège les moments importants : lumière, conversation, repos et rencontres authentiques.',
  'experienceDetail.generic.overview.2':
    'La route peut être allongée ou condensée selon la saison, la disponibilité et votre style de voyage.',
  'experienceDetail.signature': 'Détails Signature',
  'experienceDetail.signatureLabel.0': 'Route',
  'experienceDetail.signatureLabel.1': 'Accès',
  'experienceDetail.signatureLabel.2': 'Hospitalité',
  'experienceDetail.signatureLabel.3': 'Rythme',
  'experienceDetail.generic.signature.0': 'Route privée dessinée sur mesure',
  'experienceDetail.generic.signature.1': 'Guides locaux et accès coordonnés',
  'experienceDetail.generic.signature.2': 'Hébergements sélectionnés selon disponibilité',
  'experienceDetail.generic.signature.3': 'Rythme flexible selon saison et route',
  'experienceDetail.planButton': 'Planifier Cette Expérience',
  'experienceDetail.route.eyebrow': 'Design de Route',
  'experienceDetail.generic.routeTitle': 'Une route conçue autour de l’expérience',
  'experienceDetail.generic.routeIntro':
    'Le design final dépend de la saison, de l’accès et de votre style, mais le rythme reste privé et soigné.',
  'experienceDetail.generic.routePhase.0': 'Début',
  'experienceDetail.generic.routePhase.1': 'Déploiement',
  'experienceDetail.generic.routePhase.2': 'Profondeur',
  'experienceDetail.generic.routePhase.3': 'Extension',
  'experienceDetail.generic.routePhase.4': 'Clôture',
  'experienceDetail.generic.routeStepTitle': 'Étape privée',
  'experienceDetail.generic.route.0': 'Arrivée, orientation privée et première lecture du voyage.',
  'experienceDetail.generic.route.1': 'Exploration guidée avec horaires protégés et contexte local.',
  'experienceDetail.generic.route.2': 'Rencontres ou paysages centraux, au rythme des conditions.',
  'experienceDetail.generic.route.3': 'Extension possible pour ajouter de la profondeur sans hâte.',
  'experienceDetail.generic.route.4': 'Clôture confortable avec retour, repos ou connexion protégée.',
  'experienceDetail.touchpoints.eyebrow': 'Touches Premium',
  'experienceDetail.touchpoints.title': 'Les détails qui donnent le sentiment d’un voyage pensé',
  'experienceDetail.generic.highlight.0.title': 'Accès Local',
  'experienceDetail.generic.highlight.0.text':
    'Présentations et guides choisis pour donner un vrai contexte.',
  'experienceDetail.generic.highlight.1.title': 'Rythme Privé',
  'experienceDetail.generic.highlight.1.text':
    'Les journées sont pensées autour de la lumière, du repos, des échanges et du confort.',
  'experienceDetail.generic.highlight.2.title': 'Logistique Soignée',
  'experienceDetail.generic.highlight.2.text':
    'Transport, horaires et soutien local sont coordonnés pour fluidifier le voyage.',
  'experienceDetail.pictures.eyebrow': 'En Images',
  'experienceDetail.pictures.title': 'Un rythme visuel pour ce style de voyage',
  'experienceDetail.pictures.copy':
    'Des scènes d’origine, de paysage, de culture et d’hospitalité montrent l’esprit du voyage.',
  'experienceDetail.generic.gallery.0.title': 'Moments d’Origine',
  'experienceDetail.generic.gallery.0.text': 'Scènes intimes montrant d’où naît l’expérience.',
  'experienceDetail.generic.gallery.1.title': 'Paysage et Confort',
  'experienceDetail.generic.gallery.1.text': 'Jours actifs et soirées confortables, équilibrés avec soin.',
  'experienceDetail.generic.gallery.2.title': 'Connexions Locales',
  'experienceDetail.generic.gallery.2.text': 'Personnes, lieux et contexte au cœur de la route.',
  'experienceDetail.suits.eyebrow': 'À Qui Cela Convient',
  'experienceDetail.suits.title': 'Pensé pour les voyageurs attentifs à la manière dont le voyage est fait',
  'experienceDetail.generic.bestFor.0': 'Voyageurs privés de luxe',
  'experienceDetail.generic.bestFor.1': 'Couples et familles curieux',
  'experienceDetail.generic.bestFor.2': 'Photographes, passionnés de culture ou de café',
  'experienceDetail.generic.bestFor.3': 'Groupes cherchant un accès rare',
  'experienceDetail.included': 'Inclus Dans Le Design',
  'experienceDetail.related.eyebrow': 'Voyages Connectés',
  'experienceDetail.related.title': 'Routes qui se marient naturellement avec cette expérience',
  'experienceDetail.generic.related.0': 'Route privée liée',
  'experienceDetail.generic.related.1': 'Extension naturelle',
  'experienceDetail.enquire.eyebrow': 'Planifier Cette Expérience',
  'experienceDetail.enquire.title': 'Dites-nous ce que vous voulez ressentir avec {experience}',
  'experienceDetail.enquire.copy':
    'Partagez vos dates, intérêts et niveau de confort. Nous façonnerons route, accès, hébergements et rythme quotidien autour de vous.',
})

Object.assign(dictionaries.DE, {
  'journalTeaser.aside':
    'Planungshinweise, Zielgebietsessays und Notizen der Designer und Guides, die diese Reisen durchführen.',
  'journalTeaser.cta': 'Journal lesen',
  'contact.hero.eyebrow': 'Mit Einem Designer Sprechen',
  'contact.hero.title': 'Jede Reise beginnt mit einem Gespräch',
  'contact.hero.lede':
    'Keine Callcenter und keine Vorlagen. Schreiben Sie uns; ein Designer in Addis antwortet persönlich, meist am selben Tag.',
  'contact.hero.imageAlt': 'Addis Abeba, Heimat des EthioAfro-Reisedesignteams',
  'contact.meta.reply': 'Antwortzeit',
  'contact.meta.replyValue': 'Innerhalb von 24 Std.',
  'contact.meta.based': 'Standort',
  'contact.meta.support': 'Betreuung',
  'contact.meta.supportValue': '24/7 im Land',
  'contact.meta.deposit': 'Anzahlung',
  'contact.meta.depositValue': 'Erst wenn es passt',
  'contact.touch.eyebrow': 'Kontakt',
  'contact.touch.title': 'Erzählen Sie uns von Ihrer Reiseidee',
  'contact.touch.copy':
    'Auch eine grobe Idee reicht. Wir melden uns mit Fragen, einer sinnvollen Route und einer klaren Kosteneinschätzung.',
  'contact.detail.phone': 'Telefon',
  'contact.detail.email': 'E-Mail',
  'contact.detail.office': 'Büro',
  'contact.detail.hours': 'Öffnungszeiten',
  'contact.steps.eyebrow': 'Was Danach Passiert',
  'contact.steps.title': 'Wie eine Reise entsteht',
  'contact.steps.aside':
    'Vier Schritte, und Geld fließt erst, wenn der dritte sich richtig liest.',
  'contact.step.0.title': 'Sie schreiben, wir hören zu',
  'contact.step.0.text':
    'Ein Satz genügt: Daten, Tempo, Höhenverträglichkeit und wie sich die Reise anfühlen soll.',
  'contact.step.1.title': 'Wir zeichnen eine Route',
  'contact.step.1.text':
    'Innerhalb von 24 Stunden sendet ein fester Designer einen ersten Entwurf mit Optionen und ehrlichen Preisen.',
  'contact.step.2.title': 'Wir zeichnen sie neu',
  'contact.step.2.text':
    'Meist zweimal, manchmal viermal. Nichts wird gebucht und keine Anzahlung fällig, bis es stimmt.',
  'contact.step.3.title': 'Wir sind da',
  'contact.step.3.text':
    'Empfang bei Ankunft, Begleitung während der Reise und eine 24-Stunden-Leitung zu Ihrem Designer.',
  'contact.promise.eyebrow': 'Unser Versprechen',
  'contact.promise.title': 'Was Sie von der Zusammenarbeit mit uns bekommen',
  'article.breadcrumb': 'Breadcrumb',
  'article.generic.body.0':
    'Dieser Artikel fasst zusammen, wie wir private Routen in Äthiopien denken: Saison, Zugang, Komfort und lokaler Kontext.',
  'article.generic.body.1':
    'Jede Empfehlung entsteht aus echten Reisen und Gesprächen mit Guides, Gemeinden und Reisenden.',
  'article.generic.body.2':
    'Das Ergebnis ist ehrlichere Planung mit besseren Zeiten und weniger Eile.',
  'article.generic.body.3':
    'Wenn Sie es erleben möchten, planen wir die Route um Ihre Daten, Interessen und Ihr Tempo.',
  'article.generic.body.4':
    'Unser Team in Addis bestätigt die Bedingungen, bevor Details festgelegt werden.',
  'article.writtenBy': 'Geschrieben von',
  'article.questions': 'Fragen dazu sind jederzeit willkommen',
  'article.write': 'schreiben Sie uns',
  'article.readNext': 'Weiterlesen',
  'article.more.eyebrow': 'Mehr Aus Dem Journal',
  'article.more.title': 'Ebenfalls lesenswert',
  'article.more.all': 'Alle Beiträge',
  'article.cta.title': 'Bereit, es selbst zu sehen?',
  'article.cta.text':
    'Jeder Essay entsteht aus einer Reise, die wir für jemanden geplant haben. Sagen Sie uns, wie sich Ihre anfühlen soll.',
  'postAuthorRole.Head of Journey Design': 'Leitung Reisedesign',
  'postAuthorRole.Senior Guide, Northern Circuit': 'Senior Guide, Nordroute',
  'postAuthorRole.Culture & Community Lead': 'Leitung Kultur und Community',
  'experienceDetail.meta.Duration': 'Dauer',
  'experienceDetail.meta.Regions': 'Regionen',
  'experienceDetail.meta.Route': 'Route',
  'experienceDetail.meta.Focus': 'Fokus',
  'experienceDetail.meta.Style': 'Stil',
  'experienceDetail.meta.Base': 'Basis',
  'experienceDetail.metaValue.0': '7 – 14 Tage',
  'experienceDetail.metaValue.1': 'Privates Äthiopien',
  'experienceDetail.metaValue.2': 'Zugang, Kultur, Komfort',
  'experienceDetail.metaValue.3': 'Privat Premium',
  'experienceDetail.overview.eyebrow': 'Das Erlebnis',
  'experienceDetail.generic.overviewTitle':
    'Ein privates Erlebnis, geprägt von Zugang, Tempo und Kontext',
  'experienceDetail.generic.overview.0':
    'Dieses Erlebnis wird auf Ihre Interessen, Daten und Ihren Komfort abgestimmt, mit lokalen Guides und sorgfältig koordiniertem Zugang.',
  'experienceDetail.generic.overview.1':
    'Das Tempo schützt die wichtigen Momente: Licht, Gespräch, Ruhe und echte Begegnungen.',
  'experienceDetail.generic.overview.2':
    'Die Route kann je nach Saison, Verfügbarkeit und Reisestil erweitert oder verdichtet werden.',
  'experienceDetail.signature': 'Signature-Details',
  'experienceDetail.signatureLabel.0': 'Route',
  'experienceDetail.signatureLabel.1': 'Zugang',
  'experienceDetail.signatureLabel.2': 'Gastlichkeit',
  'experienceDetail.signatureLabel.3': 'Tempo',
  'experienceDetail.generic.signature.0': 'Private Route nach Maß',
  'experienceDetail.generic.signature.1': 'Lokale Guides und koordinierter Zugang',
  'experienceDetail.generic.signature.2': 'Ausgewählte Unterkünfte nach Verfügbarkeit',
  'experienceDetail.generic.signature.3': 'Flexibles Tempo nach Saison und Straße',
  'experienceDetail.planButton': 'Dieses Erlebnis Planen',
  'experienceDetail.route.eyebrow': 'Routendesign',
  'experienceDetail.generic.routeTitle': 'Eine Route, die um das Erlebnis gebaut ist',
  'experienceDetail.generic.routeIntro':
    'Das finale Design hängt von Saison, Zugang und Reisestil ab, bleibt aber privat und sorgfältig getaktet.',
  'experienceDetail.generic.routePhase.0': 'Beginn',
  'experienceDetail.generic.routePhase.1': 'Aufbau',
  'experienceDetail.generic.routePhase.2': 'Tiefe',
  'experienceDetail.generic.routePhase.3': 'Erweiterung',
  'experienceDetail.generic.routePhase.4': 'Abschluss',
  'experienceDetail.generic.routeStepTitle': 'Private Etappe',
  'experienceDetail.generic.route.0': 'Ankunft, private Orientierung und erste Einordnung der Reise.',
  'experienceDetail.generic.route.1': 'Geführte Erkundung mit geschützten Zeiten und lokalem Kontext.',
  'experienceDetail.generic.route.2': 'Zentrale Begegnungen oder Landschaften, angepasst an die Bedingungen.',
  'experienceDetail.generic.route.3': 'Optionale Erweiterung für mehr Tiefe ohne Eile.',
  'experienceDetail.generic.route.4': 'Ruhiger Abschluss mit Rückkehr, Erholung oder geschütztem Anschluss.',
  'experienceDetail.touchpoints.eyebrow': 'Premium-Details',
  'experienceDetail.touchpoints.title': 'Die Details, die es durchdacht wirken lassen',
  'experienceDetail.generic.highlight.0.title': 'Lokaler Zugang',
  'experienceDetail.generic.highlight.0.text':
    'Vorstellungen und Guides werden ausgewählt, damit das Erlebnis echten Kontext hat.',
  'experienceDetail.generic.highlight.1.title': 'Privates Tempo',
  'experienceDetail.generic.highlight.1.text':
    'Die Tage werden um Licht, Ruhe, Gespräche und Komfort geplant.',
  'experienceDetail.generic.highlight.2.title': 'Sorgfältige Logistik',
  'experienceDetail.generic.highlight.2.text':
    'Transport, Zeiten und lokale Betreuung werden so koordiniert, dass die Reise fließt.',
  'experienceDetail.pictures.eyebrow': 'In Bildern',
  'experienceDetail.pictures.title': 'Ein visueller Rhythmus für diesen Reisestil',
  'experienceDetail.pictures.copy':
    'Szenen von Ursprung, Landschaft, Kultur und Gastlichkeit zeigen den Ton der Reise.',
  'experienceDetail.generic.gallery.0.title': 'Ursprungsmomente',
  'experienceDetail.generic.gallery.0.text': 'Intime Szenen, die zeigen, woraus das Erlebnis entsteht.',
  'experienceDetail.generic.gallery.1.title': 'Landschaft und Komfort',
  'experienceDetail.generic.gallery.1.text': 'Aktive Tage und komfortable Abende in sorgfältigem Gleichgewicht.',
  'experienceDetail.generic.gallery.2.title': 'Lokale Verbindungen',
  'experienceDetail.generic.gallery.2.text': 'Menschen, Orte und Kontext im Zentrum der Route.',
  'experienceDetail.suits.eyebrow': 'Für Wen Es Passt',
  'experienceDetail.suits.title': 'Für Reisende, denen wichtig ist, wie die Reise entsteht',
  'experienceDetail.generic.bestFor.0': 'Private Luxusreisende',
  'experienceDetail.generic.bestFor.1': 'Neugierige Paare und Familien',
  'experienceDetail.generic.bestFor.2': 'Fotografen, Kultur- oder Kaffeereisende',
  'experienceDetail.generic.bestFor.3': 'Gruppen mit Wunsch nach seltenem Zugang',
  'experienceDetail.included': 'Im Design Enthalten',
  'experienceDetail.related.eyebrow': 'Verbundene Reisen',
  'experienceDetail.related.title': 'Routen, die natürlich zu diesem Erlebnis passen',
  'experienceDetail.generic.related.0': 'Verwandte private Route',
  'experienceDetail.generic.related.1': 'Natürliche Erweiterung',
  'experienceDetail.enquire.eyebrow': 'Dieses Erlebnis Planen',
  'experienceDetail.enquire.title': 'Sagen Sie uns, wie sich {experience} anfühlen soll',
  'experienceDetail.enquire.copy':
    'Teilen Sie Daten, Interessen und Komfortniveau. Wir formen Route, Zugang, Unterkünfte und Tagesrhythmus um Sie.',
})

Object.assign(dictionaries.ZH, {
  'journalTeaser.aside': '规划建议、目的地文章和现场笔记，均来自真正执行这些旅程的设计师和向导。',
  'journalTeaser.cta': '阅读日志',
  'contact.hero.eyebrow': '与旅行设计师沟通',
  'contact.hero.title': '每段旅程都从一次对话开始',
  'contact.hero.lede': '没有呼叫中心，也没有模板。写给我们，Addis 的设计师通常会在当天亲自回复。',
  'contact.hero.imageAlt': 'Addis Ababa，EthioAfro 旅程设计团队所在地',
  'contact.meta.reply': '回复时间',
  'contact.meta.replyValue': '24 小时内',
  'contact.meta.based': '所在地',
  'contact.meta.support': '支持',
  'contact.meta.supportValue': '境内 24/7',
  'contact.meta.deposit': '订金',
  'contact.meta.depositValue': '确认合适后',
  'contact.touch.eyebrow': '联系',
  'contact.touch.title': '告诉我们您脑中的旅程',
  'contact.touch.copy': '想法再粗略也足够。我们会带着问题、值得考虑的路线和清楚的费用回复您。',
  'contact.detail.phone': '电话',
  'contact.detail.email': '电子邮箱',
  'contact.detail.office': '办公室',
  'contact.detail.hours': '时间',
  'contact.steps.eyebrow': '接下来会怎样',
  'contact.steps.title': '一段旅程如何被设计',
  'contact.steps.aside': '四个步骤，在第三步确认适合之前不需要付款。',
  'contact.step.0.title': '您写下想法，我们认真倾听',
  'contact.step.0.text': '一句话即可开始：日期、节奏、海拔舒适度，以及您希望旅程带来的感觉。',
  'contact.step.1.title': '我们绘制路线',
  'contact.step.1.text': '24 小时内，一位指定设计师会发送第一版方案，含两三种选择和诚实报价。',
  'contact.step.2.title': '我们重新调整',
  'contact.step.2.text': '通常两次，有时四次。直到行程读起来合适之前，不预订也不收订金。',
  'contact.step.3.title': '我们一直在',
  'contact.step.3.text': '抵达接待、全程向导，以及旅途中与设计师保持 24 小时联系。',
  'contact.promise.eyebrow': '我们的承诺',
  'contact.promise.title': '与我们合作您会得到什么',
  'article.breadcrumb': '面包屑导航',
  'article.generic.body.0': '这篇文章总结我们如何思考埃塞俄比亚私人路线：季节、通行、舒适度和当地背景。',
  'article.generic.body.1': '每条建议都来自真实旅程，以及与向导、社区和旅客的对话。',
  'article.generic.body.2': '结果是更诚实的规划、更好的时间安排和更少匆忙。',
  'article.generic.body.3': '如果您想亲自体验，我们会围绕您的日期、兴趣和节奏设计路线。',
  'article.generic.body.4': 'Addis 团队会在最终确认每个细节前核实实际情况。',
  'article.writtenBy': '作者',
  'article.questions': '欢迎就以上内容提问',
  'article.write': '联系我们',
  'article.readNext': '下一篇',
  'article.more.eyebrow': '更多日志',
  'article.more.title': '也值得阅读',
  'article.more.all': '全部文章',
  'article.cta.title': '准备亲自看看了吗？',
  'article.cta.text': '这里每篇文章都来自我们为某位客人设计过的旅程。告诉我们您希望自己的旅程是什么感觉。',
  'postAuthorRole.Head of Journey Design': '旅程设计负责人',
  'postAuthorRole.Senior Guide, Northern Circuit': '北部线路高级向导',
  'postAuthorRole.Culture & Community Lead': '文化与社区负责人',
  'experienceDetail.meta.Duration': '时长',
  'experienceDetail.meta.Regions': '地区',
  'experienceDetail.meta.Route': '路线',
  'experienceDetail.meta.Focus': '重点',
  'experienceDetail.meta.Style': '风格',
  'experienceDetail.meta.Base': '基地',
  'experienceDetail.metaValue.0': '7 – 14 天',
  'experienceDetail.metaValue.1': '私人埃塞俄比亚',
  'experienceDetail.metaValue.2': '通行、文化、舒适',
  'experienceDetail.metaValue.3': '高级私人',
  'experienceDetail.overview.eyebrow': '体验',
  'experienceDetail.generic.overviewTitle': '围绕通行、节奏和背景设计的私人体验',
  'experienceDetail.generic.overview.0': '这项体验会根据您的兴趣、日期和舒适度调整，并由当地向导和精心协调的通行支持。',
  'experienceDetail.generic.overview.1': '节奏会保护重要时刻：光线、对话、休息和真实相遇。',
  'experienceDetail.generic.overview.2': '路线可根据季节、可订情况和旅行风格加长或压缩。',
  'experienceDetail.signature': '招牌细节',
  'experienceDetail.signatureLabel.0': '路线',
  'experienceDetail.signatureLabel.1': '通行',
  'experienceDetail.signatureLabel.2': '接待',
  'experienceDetail.signatureLabel.3': '节奏',
  'experienceDetail.generic.signature.0': '量身定制的私人路线',
  'experienceDetail.generic.signature.1': '当地向导与协调通行',
  'experienceDetail.generic.signature.2': '按可订情况精选住宿',
  'experienceDetail.generic.signature.3': '根据季节和道路灵活安排节奏',
  'experienceDetail.planButton': '规划此体验',
  'experienceDetail.route.eyebrow': '路线设计',
  'experienceDetail.generic.routeTitle': '围绕体验而设计的路线',
  'experienceDetail.generic.routeIntro': '最终设计取决于季节、通行和您的旅行风格，但节奏始终是私人且细致的。',
  'experienceDetail.generic.routePhase.0': '开始',
  'experienceDetail.generic.routePhase.1': '展开',
  'experienceDetail.generic.routePhase.2': '深入',
  'experienceDetail.generic.routePhase.3': '延伸',
  'experienceDetail.generic.routePhase.4': '收尾',
  'experienceDetail.generic.routeStepTitle': '私人阶段',
  'experienceDetail.generic.route.0': '抵达、私人说明，并初步理解旅程。',
  'experienceDetail.generic.route.1': '带当地背景的私人向导探索，并保护关键时段。',
  'experienceDetail.generic.route.2': '根据实际情况安排核心相遇或景观体验。',
  'experienceDetail.generic.route.3': '可选延伸，让体验更深入而不匆忙。',
  'experienceDetail.generic.route.4': '舒适收尾，安排返回、休息或安全衔接。',
  'experienceDetail.touchpoints.eyebrow': '高级细节',
  'experienceDetail.touchpoints.title': '让旅程显得被认真考虑的细节',
  'experienceDetail.generic.highlight.0.title': '当地通行',
  'experienceDetail.generic.highlight.0.text': '选择合适介绍与向导，让体验拥有真实背景。',
  'experienceDetail.generic.highlight.1.title': '私人节奏',
  'experienceDetail.generic.highlight.1.text': '每日围绕光线、休息、对话和舒适度设计。',
  'experienceDetail.generic.highlight.2.title': '细致后勤',
  'experienceDetail.generic.highlight.2.text': '交通、时间和当地支持被协调好，让旅程顺畅。',
  'experienceDetail.pictures.eyebrow': '图片',
  'experienceDetail.pictures.title': '这种旅行方式的视觉节奏',
  'experienceDetail.pictures.copy': '源流、景观、文化和接待场景展示这段旅程的气质。',
  'experienceDetail.generic.gallery.0.title': '源流时刻',
  'experienceDetail.generic.gallery.0.text': '展示体验从何而来的亲密场景。',
  'experienceDetail.generic.gallery.1.title': '景观与舒适',
  'experienceDetail.generic.gallery.1.text': '活跃白天与舒适夜晚之间的平衡。',
  'experienceDetail.generic.gallery.2.title': '当地连接',
  'experienceDetail.generic.gallery.2.text': '人物、地点和背景处在路线核心。',
  'experienceDetail.suits.eyebrow': '适合谁',
  'experienceDetail.suits.title': '为在意旅程如何被设计的旅客而做',
  'experienceDetail.generic.bestFor.0': '私人奢华旅客',
  'experienceDetail.generic.bestFor.1': '好奇的伴侣与家庭',
  'experienceDetail.generic.bestFor.2': '摄影、文化或咖啡爱好者',
  'experienceDetail.generic.bestFor.3': '寻求少见通行的私人团体',
  'experienceDetail.included': '设计中包含',
  'experienceDetail.related.eyebrow': '相关旅程',
  'experienceDetail.related.title': '自然适合搭配此体验的路线',
  'experienceDetail.generic.related.0': '相关私人路线',
  'experienceDetail.generic.related.1': '自然延伸',
  'experienceDetail.enquire.eyebrow': '规划此体验',
  'experienceDetail.enquire.title': '告诉我们您希望 {experience} 是什么感觉',
  'experienceDetail.enquire.copy': '分享日期、兴趣和舒适度。我们会围绕您设计路线、通行、住宿和每日节奏。',
})

Object.assign(dictionaries.ES, {
  'contact.address': 'Bole Medhaniallem, Cape Verde Street 1000, Addis Abeba, Etiopía',
  'contact.hoursValue': 'Lunes a sábado, 8:00 a. m. – 5:30 p. m.',
  'notFound.eyebrow': 'Error 404',
  'notFound.title': 'Este camino no aparece en nuestro mapa',
  'notFound.copy':
    'La página que buscaba se movió o nunca existió. El país, por suerte, sigue donde lo dejamos.',
  'notFound.home': 'Volver al inicio',
  'notFound.or': 'O',
  'notFound.write': 'escriba a un diseñador',
  'notFound.instead': 'en su lugar.',
})

Object.assign(dictionaries.FR, {
  'contact.address': 'Bole Medhaniallem, Cape Verde Street 1000, Addis-Abeba, Éthiopie',
  'contact.hoursValue': 'Lundi à samedi, 8 h 00 – 17 h 30',
  'notFound.eyebrow': 'Erreur 404',
  'notFound.title': 'Cette route n’apparaît pas sur notre carte',
  'notFound.copy':
    'La page recherchée a été déplacée ou n’a jamais existé. Le pays, lui, est toujours là où nous l’avons laissé.',
  'notFound.home': 'Retour au début',
  'notFound.or': 'Ou',
  'notFound.write': 'écrivez à un designer',
  'notFound.instead': 'à la place.',
})

Object.assign(dictionaries.DE, {
  'contact.address': 'Bole Medhaniallem, Cape Verde Street 1000, Addis Abeba, Äthiopien',
  'contact.hoursValue': 'Montag bis Samstag, 8:00 – 17:30 Uhr',
  'notFound.eyebrow': 'Fehler 404',
  'notFound.title': 'Diese Straße erscheint nicht auf unserer Karte',
  'notFound.copy':
    'Die gesuchte Seite wurde verschoben oder hat nie existiert. Das Land ist zum Glück noch dort, wo wir es gelassen haben.',
  'notFound.home': 'Zurück zum Anfang',
  'notFound.or': 'Oder',
  'notFound.write': 'schreiben Sie einem Designer',
  'notFound.instead': 'stattdessen.',
})

Object.assign(dictionaries.ZH, {
  'contact.address': '埃塞俄比亚 Addis Ababa，Bole Medhaniallem，Cape Verde Street 1000',
  'contact.hoursValue': '周一至周六，上午 8:00 – 下午 5:30',
  'notFound.eyebrow': '404 错误',
  'notFound.title': '这条路不在我们的地图上',
  'notFound.copy': '您寻找的页面已移动或从未存在。好在埃塞俄比亚仍在原处。',
  'notFound.home': '返回首页',
  'notFound.or': '或者',
  'notFound.write': '联系旅行设计师',
  'notFound.instead': '。',
})

const LanguageContext = createContext<{
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: (key: string, fallback?: string) => string
} | null>(null)

function isLanguageCode(value: string): value is LanguageCode {
  return languageOptions.some((option) => option.code === value)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN')

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey)
    if (stored && isLanguageCode(stored)) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(storageKey, nextLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = htmlLang[language]
  }, [language])

  const t = useCallback(
    (key: string, fallback = key) =>
      dictionaries[language][key] ?? dictionaries.EN[key] ?? fallback,
    [language],
  )

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
