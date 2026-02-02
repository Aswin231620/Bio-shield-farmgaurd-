First, run the development server:
```bash
npm run dev

1. The "Big Indicator" Vitality Dashboard
Feature: A massive, color-coded status shield (Red/Green) at the center of the app.
Why: Farmers are busy. They don't have time to read long reports. The "Big Indicator" gives them the answer to "Is my farm safe?" in exactly 1 second. It combines data from sensors and audits into one simple visual.
2. Biosecurity Risk Assessment Audit
Feature: A step-by-step digital audit tool (covering Entry/Exit, Animal Health, and Feed Logistics) that gives the farm a percentage score.
Why: Most disease outbreaks happen because of small human errors (e.g., forgetting to wash boots or a broken fence). This feature helps farmers find these "weak links" before a virus does. It also allows them to download a PDF report for government or bank compliance.
3. Real-Time Sickness & Map Alerts
Feature: A live feed of disease outbreaks in the surrounding area, integrated with a visual map.
Why: If a nearby farm has Bird Flu, you need to know immediately to lockdown your perimeter. This feature acts as a "Social Radar" for farm health, allowing the community to protect each other by reporting problems.
4. IoT Sensor Integration (The "Digital Fence")
Feature: Real-time tracking of movement (PIR) and intruder distance (Ultrasonic).
Why: Physical biosecurity is about controlling movement. Sensors detect unauthorized people or wild animals entering "Clean Zones" and trigger alarms instantly. This replaces the need for 24/7 manual patrolling.
5. Training & Educational Hub
Feature: A curated library of videos and guides on how to practice safe farming.
Why: Technology is only half the battle; education is the other half. We included this to ensure that farmworkers understand the logic behind the rules they are following.
6. Community Experts & AI Advisor
Feature: A direct bridge to chat with veterinarians or biosecurity experts.
Why: When an animal looks sick, the first few hours are critical. This feature ensures that even a farmer in a remote village has access to world-class expert advice instantly.
7. Digital Compliance & Records
Feature: A paperless system to record vaccinations, visitor logs, and feed deliveries.
Why: Paper logs are often lost, dirty, or faked. Digital records are searchable, shareable, and much more reliable during government inspections or when selling livestock at a premium price.



 Core Frameworks
Next.js 16 (App Router): The main framework used for building the application, routing, and server-side rendering.
React 19: The underlying UI library for building the components.
⌨️ Language
TypeScript: Used for type-safe code, helping to prevent bugs and make development faster.
🎨 Styling & UI
Vanilla CSS: All styles are written in custom CSS (
globals.css
 and CSS Modules) for a unique, high-performance look.
Framer Motion: Used for the premium animations, page transitions, and the pulsing "Big Indicator" effects.
Lucide React: The library providing all the professional vector icons used throughout the dashboard.
🏗️ State Management
