import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // High-Thinking Vacation & Custom Itinerary Architect API
  app.post('/api/plan-itinerary', async (req, res) => {
    try {
      const {
        destination,
        durationDays,
        travelers,
        budgetTier,
        specialRequirements,
        interests,
      } = req.body;

      if (!destination && !specialRequirements) {
        return res.status(400).json({ error: 'Please provide a destination or holiday requirements.' });
      }

      const ai = getAiClient();

      if (!ai) {
        // Return a structured high-quality fallback if no API key is provided
        return res.json({
          tripTitle: `${destination || 'Bespoke India & Beyond'} Handcrafted Experience`,
          destination: destination || 'Curated Escape',
          overview: `A meticulously balanced itinerary crafted for ${travelers || 'discerning travelers'} focusing on scenic wonders, cultural depth, and seamless pacing with comfortable transit.`,
          durationText: `${durationDays || 5} Days / ${Math.max(1, (durationDays || 5) - 1)} Nights`,
          estimatedCostPerPerson: budgetTier === 'Luxury' ? '₹45,000 – ₹75,000' : '₹22,000 – ₹38,000',
          bestSeason: 'October to May',
          suitability: travelers || 'Families, Couples & Small Groups',
          recommendedHotelTier: budgetTier || 'Premium 4-Star & Heritage Boutique Resorts',
          dailyPlan: Array.from({ length: Number(durationDays) || 5 }).map((_, i) => ({
            day: i + 1,
            title: i === 0 ? 'Arrival, Check-in & Scenic Welcome' : i === (Number(durationDays) || 5) - 1 ? 'Heritage Souvenirs & Departure Transfer' : `Exploration & Immersive Discovery Phase ${i}`,
            morning: `Early breakfast followed by private chauffeur pickup to major viewpoints and historic landmarks with dedicated skip-the-line guidance.`,
            afternoon: `Curated local culinary lunch tasting followed by relaxing downtime or scenic nature walks tailored to avoid peak crowds.`,
            evening: `Sunset vantage point experience, local market stroll, and curated dinner reservations.`,
            travelTimeNotes: 'Private AC cab transfers (approx 45-90 mins comfortable drive).',
            specialMealsOrTips: 'Pre-reserved vehicle parking to eliminate walking fatigue for family members.'
          })),
          logisticsAdvice: [
            'Private vehicle allocated with local English and Hindi speaking certified chauffeur.',
            'All temple and monument entries pre-scheduled during off-peak hours.',
            'Wheelchair/porter support available on request at transit hubs.'
          ],
          insiderSpecialistTips: [
            'Connect with your Sai Viva 24/7 dedicated trip manager upon landing for real-time adjustments.',
            'Enjoy authentic regional delicacies at vetted family-run kitchens curated for impeccable hygiene.'
          ],
          isDemonstrationMode: true,
          notice: 'Note: To enable real-time Gemini-4-Argon AI thinking mode, configure your GEMINI_API_KEY in the AI Studio Secrets panel.'
        });
      }

      const prompt = `
You are the Chief Travel Architect for "Sai Viva Holidays", a prestigious travel agency specializing in personalized domestic India circuits (Kashmir, Kerala, Himachal, Shirdi, Kashi, Golden Triangle, Andaman) and international holiday escapes (Dubai, Bali, Maldives, Vietnam, Europe).

The user has submitted a complex travel request. Use deep reasoning and analysis to architect an optimal, realistic, and delightful vacation plan that factors in transit times, physical comfort, seasonal weather, age-appropriate pacing, cuisine preferences, and budget optimization.

USER TRAVEL SPECIFICATIONS:
- Destination / Theme: ${destination || 'Custom Journey'}
- Duration: ${durationDays || '5'} days
- Travelers / Party: ${travelers || 'Family with mixed ages'}
- Budget Preference: ${budgetTier || 'Comfortable Premium'}
- Special Requirements / Pace / Dietary / Accessibility: ${specialRequirements || 'Balanced pacing, verified hygiene, comfortable vehicle'}
- Passions & Interests: ${interests || 'Culture, Scenic Landscapes, Local Food'}

CRITICAL INSTRUCTIONS:
- Reason thoroughly through drive times, altitude/weather adjustments, crowd-avoidance windows, and resting slots.
- Provide a day-by-day plan with clear time-slots (morning, afternoon, evening), transit notes, and specialist tips.
- Do not output markdown text around JSON; adhere strictly to the JSON schema.
      `;

      // gemini-3.8-flash with thinkingLevel: ThinkingLevel.HIGH
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tripTitle: { type: Type.STRING },
              destination: { type: Type.STRING },
              overview: { type: Type.STRING },
              durationText: { type: Type.STRING },
              estimatedCostPerPerson: { type: Type.STRING },
              bestSeason: { type: Type.STRING },
              suitability: { type: Type.STRING },
              recommendedHotelTier: { type: Type.STRING },
              dailyPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    morning: { type: Type.STRING },
                    afternoon: { type: Type.STRING },
                    evening: { type: Type.STRING },
                    travelTimeNotes: { type: Type.STRING },
                    specialMealsOrTips: { type: Type.STRING }
                  },
                  required: ['day', 'title', 'morning', 'afternoon', 'evening', 'travelTimeNotes']
                }
              },
              logisticsAdvice: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              insiderSpecialistTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              'tripTitle',
              'destination',
              'overview',
              'durationText',
              'estimatedCostPerPerson',
              'bestSeason',
              'suitability',
              'recommendedHotelTier',
              'dailyPlan',
              'logisticsAdvice',
              'insiderSpecialistTips'
            ]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No text returned from Gemini API.');
      }

      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error('Error generating itinerary:', err);
      res.status(500).json({
        error: 'Failed to generate tailored itinerary.',
        details: err?.message || String(err)
      });
    }
  });

  // Contact / Enquiry Submission endpoint (for storing/simulating enquiry dispatch)
  app.post('/api/enquiry', (req, res) => {
    const { name, phone, email, packageTitle, travelMonth, guests, notes } = req.body;
    console.log(`[Sai Viva Enquiry Received]:`, { name, phone, email, packageTitle, travelMonth, guests, notes });
    res.json({
      success: true,
      message: `Thank you ${name}! Your enquiry for "${packageTitle}" has been received. Our senior holiday planner will contact you via WhatsApp / phone (${phone}) within 4 business hours with custom pricing.`,
      referenceId: 'SV-' + Math.floor(100000 + Math.random() * 900000)
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sai Viva Holidays full-stack app running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
});
