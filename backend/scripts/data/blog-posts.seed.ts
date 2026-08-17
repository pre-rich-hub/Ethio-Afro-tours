// CLIENT CATALOG — EthioAfroTours frontend/lib/site.ts (posts array).
// All 6 journal posts, mapped verbatim into the backend Blog schema:
//   - slug: the client slug is the API contract (used on /blog/<slug>)
//   - blogTitle: post.title, description: post.excerpt
//   - content: post.body paragraphs joined into one text block (new Blog
//     column added in Phase 4 for the AI assistant catalog context)
//   - imageUrl: the version-pinned Cloudinary asset used by the frontend
// The category is resolved and created-by-name by scripts/seed.ts.
export interface BlogPostSeed {
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  categoryName: string;
}

export const blogPostSeeds: BlogPostSeed[] = [
  {
    slug: "when-to-visit-ethiopia",
    title: "When to visit Ethiopia: a month-by-month reading of the light",
    description:
      "Ethiopia has thirteen months of sunshine, but not all of them are the same. Here is how we actually choose dates for our guests.",
    content: [
      "The tourist-board line is thirteen months of sunshine, and it is not untrue — but it flattens a country that runs from 125 metres below sea level to nearly 4,600 above. What follows is how our designers actually think about dates.",
      "October and November are the finest weeks of the year. The long rains have just finished, the highlands are green, the wildflowers are out on the Sanetti Plateau and the air is so clear you can see three ridges deep in the Simiens. Everything is open, nothing is dusty.",
      "December through February brings the festival season — Ethiopian Christmas in Lalibela, then Timkat in Gondar — and the coldest highland nights. It is also the only sensible window for the Danakil, where daytime temperatures merely become extreme rather than dangerous.",
      "March to May is our quiet secret. Hot in the lowlands, occasional afternoon storms in the north, but the light is dramatic, the sites are empty and the rates are softer. If you have travelled before and want the churches to yourself, come in April.",
      "June to September is the kiremt, the long rains. We stop running the north almost entirely: roads soften, flights cancel and cloud sits on the escarpments. But the south is open and the Omo is at its most beautiful, green and full, with fewer visitors than any other month."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786804467/simien-mountains.png",
    categoryName: "Planning"
  },
  {
    slug: "lalibela-at-dawn",
    title: "Lalibela at dawn: how to see the rock churches properly",
    description:
      "Most visitors arrive at ten in the morning and see a monument. Arrive at five and you see a living city instead.",
    content: [
      "There is a version of Lalibela that opens at eight, fills with groups by ten and empties by two. It is impressive, and it is also the wrong version.",
      "Come instead at five in the morning, in the dark, when the pilgrims are already gathered in the trenches with candles and white shawls. The chant starts underground and reaches you before the buildings do.",
      "Practically: this means a lodge within ten minutes of the site, a guide who is on good terms with the priests, and a willingness to be cold for an hour. We bring blankets and flasks. Nobody ever regrets it.",
      "By seven, when the light finally drops into the trench at Bete Maryam and lands on the north wall, you will have had two hours in a working sanctuary. The groups arriving as you leave are welcome to the monument."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg",
    categoryName: "Destinations"
  },
  {
    slug: "the-coffee-ceremony",
    title: "The coffee ceremony is not a performance",
    description:
      "Three rounds, an hour of your time, and a set of small courtesies that change the experience entirely.",
    content: [
      "In hotels it takes fifteen minutes and arrives with a bill. In a home it takes an hour and it is not really about the coffee.",
      "Green beans are washed and roasted in front of you, and the pan is carried around so you can take the smoke in with both hands — this is an invitation, not a flourish. Then the pounding, the jebena, and the first of three pours.",
      "The three rounds have names: abol, tona and baraka. Leaving before the third is a small rudeness, and staying for it is the entire point. Baraka means blessing.",
      "What to do: accept the popcorn, drink slowly, praise the roast rather than the room, and let the conversation wander. What not to do: photograph first. Ask on the second round, when you have earned it."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg",
    categoryName: "Culture"
  },
  {
    slug: "packing-for-the-highlands",
    title: "Packing for 4,000 metres and 45 degrees in one suitcase",
    description:
      "Ethiopia asks you to pack for two climates at once. A short, opinionated list from eighteen years of doing it.",
    content: [
      "The Simien rim can hit freezing before dawn. The Danakil can hit forty-five by ten in the morning. Most guests overpack for one and underpack for the other.",
      "Layers, not bulk: a merino base, a light fleece, and one properly windproof shell. That combination covers every highland morning we operate in. Add a warm hat — you will use it more than you expect.",
      "For the lowlands: loose long sleeves in light cotton or linen, a wide brim, and closed shoes for the salt crust, which is sharper than it looks. Sandals are a mistake at Dallol.",
      "Everywhere: modest shoulders and knees for churches and monasteries, slip-on shoes because you will remove them often, and a headlamp. And leave 3kg for the coffee."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786966781/danakil-expedition.jpg",
    categoryName: "Practical"
  },
  {
    slug: "responsible-travel-in-the-omo",
    title: "What responsible travel in the Omo Valley actually requires",
    description:
      "The pay-per-photo economy is a choice, not an inevitability. Here is how we work instead, and what we ask of guests.",
    content: [
      "The Omo has a well-documented problem: an economy in which a stranger arrives, pays a few birr per frame, and leaves. It distorts everything it touches, and it is entirely avoidable.",
      "We pay community fees at village level, agreed annually with elders and published to our guests. Nothing is negotiated at the roadside, and nothing is paid per image.",
      "A cultural mediator travels with every Omo journey. Their job is not translation alone — it is to arrange the visit in advance, explain who we are, and give people a genuine ability to decline.",
      "What we ask of guests is simple: put the camera down for the first half hour, ask before every portrait, accept a no without negotiation, and send prints back with us. Half of our returning guests come back partly to deliver them."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg",
    categoryName: "Responsible Travel"
  },
  {
    slug: "twelve-hours-in-addis",
    title: "Twelve hours in Addis: a layover worth leaving the airport for",
    description:
      "Bole is one of Africa's great connecting hubs. If your onward flight is more than eight hours out, the city is right there.",
    content: [
      "Half our layover guests were not planning to leave the terminal. Twelve hours later they are asking whether they can change their onward flight.",
      "The shape of a good Addis day: high ground first for the panorama and the eucalyptus air, then the National Museum before the school groups, then Mercato with somebody who knows which alley to turn down.",
      "The single best thing in the city is not a building. It is a coffee ceremony in a family home in Shiro Meda, an hour long, in a room with a corrugated roof and a bowl of popcorn.",
      "Logistics matter more than sights on a layover. Visa on arrival, a driver who tracks your inbound flight, a hotel day room for a shower, and back at the terminal three hours before departure. That is the whole trick."
    ].join("\n\n"),
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786969347/full-day-addis-experience.jpg",
    categoryName: "Layover"
  }
];
