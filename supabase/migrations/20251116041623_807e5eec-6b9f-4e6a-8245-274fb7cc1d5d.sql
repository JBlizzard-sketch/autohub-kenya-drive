-- Insert blog categories for Kenyan automotive content
INSERT INTO blog_categories (name, description) VALUES
('Maintenance Tips', 'Essential car maintenance tips for Kenyan road conditions'),
('DIY Guides', 'Step-by-step guides for common auto repairs'),
('Driving in Kenya', 'Tips for navigating Kenyan roads and traffic'),
('Seasonal Care', 'Seasonal vehicle maintenance for Kenya''s climate')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts with Kenyan context
INSERT INTO blog_posts (title, content, slug, published, category_id) 
SELECT 
  'Essential Car Maintenance Tips for Kenyan Roads',
  '<h2>Maintaining Your Vehicle on Kenyan Roads</h2>
<p>Driving in Kenya presents unique challenges that require special attention to vehicle maintenance. From dusty murram roads to heavy Nairobi traffic, your car needs proper care to perform at its best.</p>

<h3>1. Regular Air Filter Cleaning</h3>
<p>Kenya''s dusty conditions, especially during dry seasons, can clog your air filter quickly. Check and clean your air filter every 5,000 km, or more frequently if you drive on unpaved roads regularly. A clean air filter improves fuel efficiency and engine performance.</p>

<h3>2. Tire Pressure and Tread Depth</h3>
<p>Kenyan roads can be tough on tires. Check tire pressure weekly and inspect tread depth monthly. Proper tire maintenance is crucial for:</p>
<ul>
  <li>Better fuel economy</li>
  <li>Improved handling on wet roads during rainy seasons</li>
  <li>Reduced risk of blowouts on rough surfaces</li>
  <li>Longer tire life</li>
</ul>

<h3>3. Cooling System Maintenance</h3>
<p>With Nairobi''s traffic jams and Kenya''s warm climate, your cooling system works overtime. Regularly check coolant levels and inspect hoses for cracks. Service your radiator every 40,000 km to prevent overheating.</p>

<h3>4. Brake System Care</h3>
<p>Heavy traffic and hilly terrain in many Kenyan cities put extra strain on brakes. Have your brake pads inspected every 10,000 km and replace them when they reach 3mm thickness. Don''t ignore squeaking or grinding sounds.</p>

<h3>5. Oil Changes</h3>
<p>Change your engine oil every 5,000 km in Kenyan conditions, even if your manual suggests longer intervals. Stop-and-go traffic and dusty conditions break down oil faster. Use quality synthetic oil for better protection.</p>

<h3>Conclusion</h3>
<p>Regular maintenance saves money in the long run and keeps you safe on Kenya''s diverse roads. At AutoHub Kenya, we stock all the parts you need for proper vehicle maintenance. Visit our shop or contact us for expert advice!</p>',
  'essential-car-maintenance-tips-kenyan-roads',
  true,
  (SELECT blog_category_id FROM blog_categories WHERE name = 'Maintenance Tips' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, content, slug, published, category_id)
SELECT
  'How to Change Your Car''s Oil: A DIY Guide for Kenyan Drivers',
  '<h2>DIY Oil Change Guide</h2>
<p>Changing your car''s oil is one of the most important maintenance tasks, and it''s easier than you think! This guide will walk you through the process step by step.</p>

<h3>What You''ll Need</h3>
<ul>
  <li>New engine oil (check your manual for the right grade)</li>
  <li>New oil filter</li>
  <li>Oil drain pan</li>
  <li>Wrench or socket set</li>
  <li>Funnel</li>
  <li>Jack and jack stands (if needed)</li>
  <li>Gloves and rags</li>
</ul>

<h3>Step 1: Prepare Your Vehicle</h3>
<p>Park on level ground and let the engine cool for 10-15 minutes. Warm oil drains better, but you don''t want it too hot. If needed, use a jack to lift the car safely, ensuring it''s on stable jack stands.</p>

<h3>Step 2: Locate the Drain Plug</h3>
<p>Slide under the car and locate the oil drain plug on the oil pan. Place your drain pan underneath before loosening the plug.</p>

<h3>Step 3: Drain the Old Oil</h3>
<p>Using the correct size wrench, carefully loosen the drain plug. The oil will start flowing once the plug is removed. Let it drain completely (5-10 minutes). Be careful - the oil may still be warm!</p>

<h3>Step 4: Replace the Oil Filter</h3>
<p>Locate the oil filter. Use an oil filter wrench if it''s tight. Before installing the new filter, apply a thin layer of fresh oil to the rubber gasket. Hand-tighten the new filter - don''t over-tighten!</p>

<h3>Step 5: Add New Oil</h3>
<p>Replace the drain plug and tighten it securely. Locate the oil filler cap on top of the engine, remove it, and pour in the new oil using a funnel. Check your manual for the correct amount (usually 3.5-5 liters for most cars).</p>

<h3>Step 6: Check Oil Level</h3>
<p>After adding oil, wait a minute, then check the dipstick. The oil level should be between the min and max marks. Start the engine and let it run for a minute, then check for leaks underneath.</p>

<h3>Disposing of Old Oil</h3>
<p>Never pour old oil down drains or on the ground. Many auto parts shops in Nairobi and other cities accept used oil for recycling. Store it in a sealed container and take it to a proper disposal point.</p>

<h3>When to Get Professional Help</h3>
<p>If you''re not comfortable doing this yourself, visit any reputable garage in Nairobi, Mombasa, Kisumu, or your local town. At AutoHub Kenya, we can connect you with trusted mechanics across Kenya.</p>',
  'how-to-change-car-oil-diy-guide-kenya',
  true,
  (SELECT blog_category_id FROM blog_categories WHERE name = 'DIY Guides' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, content, slug, published, category_id)
SELECT
  'Preparing Your Car for Kenya''s Rainy Season',
  '<h2>Rainy Season Car Care in Kenya</h2>
<p>Kenya''s rainy seasons (March to May and October to December) bring unique challenges for drivers. Proper preparation ensures your safety and prevents costly repairs.</p>

<h3>Check Your Tires</h3>
<p>Wet roads require good tire tread. The legal minimum in Kenya is 1.6mm, but for safety, replace tires when tread reaches 3mm. Check tire pressure monthly - underinflated tires are dangerous on wet roads.</p>

<h3>Test Your Wipers</h3>
<p>Wiper blades should be replaced every 6-12 months. If they leave streaks or skip across the windscreen, it''s time for new ones. Also ensure your windscreen washer reservoir is full.</p>

<h3>Brake Inspection</h3>
<p>Wet conditions increase braking distance. Have your brakes inspected before the rains. Squeaking, grinding, or a soft brake pedal are warning signs that need immediate attention.</p>

<h3>Check Your Lights</h3>
<p>Visibility is crucial during heavy rain. Test all lights - headlights, taillights, indicators, and fog lights. Replace any burnt-out bulbs and clean dirty lenses.</p>

<h3>Inspect Drainage Holes</h3>
<p>Check door, sunroof, and boot drainage holes. Blocked drains can lead to water accumulation and electrical problems. Use a thin wire to clear any debris.</p>

<h3>Protect Against Rust</h3>
<p>Kenyan rain mixed with road salt and mud accelerates rust. Wash your car regularly during rainy season, paying special attention to the undercarriage. Apply rust protection spray to vulnerable areas.</p>

<h3>Emergency Kit</h3>
<p>Keep these items in your car during rainy season:</p>
<ul>
  <li>Jumper cables (for wet-related electrical issues)</li>
  <li>Flashlight with fresh batteries</li>
  <li>First aid kit</li>
  <li>Reflective triangle</li>
  <li>Tow rope</li>
  <li>Phone charger</li>
</ul>

<h3>Driving Tips for Rainy Conditions</h3>
<p>Reduce speed on wet roads, increase following distance, and avoid sudden movements. If you encounter flooding, turn around - don''t risk driving through deep water. Many Nairobi and Mombasa roads flood during heavy rain.</p>

<h3>Get the Right Parts</h3>
<p>AutoHub Kenya stocks quality wiper blades, brake components, tires, and all the parts you need for rainy season preparation. Order online for fast delivery across Kenya!</p>',
  'preparing-car-kenya-rainy-season',
  true,
  (SELECT blog_category_id FROM blog_categories WHERE name = 'Seasonal Care' LIMIT 1)
ON CONFLICT DO NOTHING;