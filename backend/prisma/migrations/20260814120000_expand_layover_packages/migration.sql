ALTER TABLE "layover_packages"
ADD COLUMN "minimum_connection" TEXT NOT NULL DEFAULT 'Confirm with our team',
ADD COLUMN "package_type" TEXT NOT NULL DEFAULT 'layover',
ADD COLUMN "excludes" TEXT NOT NULL DEFAULT '[]';

UPDATE "layover_packages"
SET "minimum_connection" = CASE "slug"
  WHEN '6-hour' THEN '8–10 hours'
  WHEN '12-hour' THEN '10–12 hours'
  WHEN '24-hour' THEN '24–36 hours'
  WHEN '48-hour' THEN '60–72 hours'
  ELSE "minimum_connection"
END,
"package_type" = CASE WHEN "slug" = '48-hour' THEN 'stopover' ELSE 'layover' END;

ALTER TABLE "layover_packages"
ALTER COLUMN "minimum_connection" DROP DEFAULT;

-- Replace only the original four-row client catalog. If an administrator has
-- added or removed any package, preserve that customized catalog unchanged.
DO $migration$
DECLARE
  total_packages INTEGER;
  legacy_packages INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_packages FROM "layover_packages";
  SELECT COUNT(*) INTO legacy_packages
  FROM "layover_packages"
  WHERE "slug" IN ('6-hour', '12-hour', '24-hour', '48-hour');

  IF total_packages = 4 AND legacy_packages = 4 THEN
    DELETE FROM "layover_packages";

    INSERT INTO "layover_packages"
      ("slug", "hours", "minimum_connection", "package_type", "title", "price", "image_url", "teaser", "itinerary", "includes", "excludes", "best_for", "sort_order", "created_at", "updated_at")
    VALUES
      (
        'addis-highlights-layover', 'About 4 hours', '8–10 hours', 'layover',
        'Addis Highlights Layover', 'Custom quote', NULL,
        'A carefully timed introduction to Addis Ababa with a highland viewpoint, city landmarks and Ethiopian coffee.',
        '["Meet after immigration and confirm the return schedule","Drive to Entoto for a city panorama when conditions allow","Follow a flexible landmark loop through central Addis Ababa","Pause for an Ethiopian coffee experience","Return to Bole with the agreed international check-in buffer"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote"]',
        'First-time visitors with a daytime connection', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
        'addis-culture-and-coffee', 'About 5–6 hours', '10–12 hours', 'layover',
        'Addis Culture & Coffee', 'Custom quote', NULL,
        'A deeper look at the capital through a museum or cultural site, local craft traditions, lunch and coffee.',
        '["Meet at Bole and review traffic and opening hours","Visit the National Museum or the best available cultural alternative","Explore a craft, textile or historic quarter with your guide","Enjoy a traditional Ethiopian meal","Finish with coffee before the timed airport return"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote"]',
        'Travellers who want culture, history and food in one visit', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
        'full-day-addis-experience', 'About 8–9 hours', '14–18 hours', 'layover',
        'Full-Day Addis Experience', 'Custom quote', NULL,
        'A flexible full day combining Addis Ababa’s viewpoints, heritage, neighbourhoods, cuisine and coffee culture.',
        '["Airport welcome and a route check based on the day’s conditions","Begin at Entoto or another panoramic city viewpoint","Visit selected museums, monuments or places of worship that are open","Explore a market or artisan district with your private guide","Take time for lunch and an Ethiopian coffee ceremony","Optional day-room stop when requested and available","Return to Bole with the agreed check-in buffer"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote","Hotel day room unless included in the confirmed quote"]',
        'Long daytime connections with room for a relaxed city visit', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
        'addis-evening-experience', 'About 4–5 hours', '8–12 hours', 'layover',
        'Addis Evening Experience', 'Custom quote', NULL,
        'An after-hours alternative built around Ethiopian food, coffee, music and Addis Ababa after dark.',
        '["Meet after immigration and confirm the evening schedule","Take a short illuminated city drive or viewpoint stop","Enjoy an Ethiopian dinner selected for your preferences","Experience coffee and an optional cultural performance when available","Return to Bole with the agreed check-in buffer"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote"]',
        'Evening arrivals when museums and daytime attractions are closed', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
        'overnight-addis-and-highlands', 'One night', '24–36 hours', 'layover',
        'Overnight Addis & Highlands', 'Custom quote', NULL,
        'Rest overnight, then explore Addis or make a carefully timed highland excursion before returning to Bole.',
        '["Airport welcome and private hotel transfer","Dinner or rest according to your arrival time","Choose an Addis morning or a highland excursion after a route and weather check","Lunch and a flexible final stop","Return to Bole with the agreed international departure buffer"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote","Accommodation unless included in the confirmed quote"]',
        'Overnight connections that allow a hotel stay and a flexible second day', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
        'lalibela-stopover-extension', 'Two nights', '60–72 hours minimum', 'stopover',
        'Lalibela Stopover Extension', 'Custom quote', NULL,
        'Turn a multi-day stopover into a privately guided visit to Lalibela, subject to domestic schedules and a safe onward-flight buffer.',
        '["Arrive in Addis and review the confirmed domestic-flight plan","Fly to Lalibela and meet your local guide","Explore the rock-hewn church groups around opening and service times","Stay overnight in Lalibela and continue the visit the next morning","Fly back to Addis with a pre-agreed buffer before the onward journey"]',
        '["Airport pickup and return transfer","Private vehicle and English-speaking guide","Itinerary planning around confirmed flight times"]',
        '["Ethiopian visa and travel insurance","Personal purchases, tips and unlisted services","Meals and entrance fees unless confirmed in your quote","Domestic flights and accommodation unless included in the confirmed quote"]',
        'Planned stopovers of at least 60–72 hours with flexible onward travel', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      );
  END IF;
END;
$migration$;
