import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Bookmark,
  Share2,
  CheckCircle2,
  Shield,
  Headphones,
  Award,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  MessageCircle,
  Menu,
  Send,
  Loader2,
  Info,
  Car,
  Utensils,
  SunMedium,
  HeartHandshake
} from 'lucide-react';

// Interfaces
interface ItineraryStep {
  day: string;
  title: string;
}

interface TravelStory {
  id: number;
  category: 'Domestic' | 'International' | 'Pilgrimage' | 'Honeymoon';
  title: string;
  excerpt: string;
  days: number;
  durationText: string;
  author: string;
  readTime: string;
  priceEstimate: string;
  season: string;
  idealFor: string;
  style: string;
  imgUrl: string;
  paragraphs: string[];
  itinerary: ItineraryStep[];
  insiderTip: string;
}

interface GeneratedPlan {
  tripTitle: string;
  destination: string;
  overview: string;
  durationText: string;
  estimatedCostPerPerson: string;
  bestSeason: string;
  suitability: string;
  recommendedHotelTier: string;
  dailyPlan: Array<{
    day: number;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    travelTimeNotes: string;
    specialMealsOrTips?: string;
  }>;
  logisticsAdvice: string[];
  insiderSpecialistTips: string[];
  isDemonstrationMode?: boolean;
  notice?: string;
}

// 9 Handcrafted Travel Packages & Journal Articles
const TRAVEL_STORIES: TravelStory[] = [
  {
    id: 1,
    category: "Domestic",
    title: "Kashmir: Valleys, Houseboats & The Gondola of Gulmarg",
    excerpt: "Sip hot Kahwa on Dal Lake, walk amidst Pahalgam pines, and take the world's highest cable car in Gulmarg.",
    days: 6,
    durationText: "6 Days / 5 Nights",
    author: "Shweta Joshi (North India Lead)",
    readTime: "4 min read",
    priceEstimate: "From ₹22,500 / person",
    season: "Mar–Oct (Green) / Dec–Feb (Snow)",
    idealFor: "Couples & Families",
    style: "Private Cab & Houseboat Stay",
    imgUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Kashmir captures the imagination like few places on earth. Our Sai Viva 6-day circuit begins in Srinagar with a restorative stay aboard a traditional cedar-carved houseboat on Dal Lake, listening to the gentle ripples as Shikaras carry floating flower markets past your verandah.",
      "From the historical Mughal Gardens, the itinerary moves toward the meadow of gold, Sonamarg, followed by the alpine meadows of Gulmarg. Here, we pre-book Phase 1 & 2 Gondola tickets to prevent standing in tedious queues, leaving you free to revel in panoramic Himalayan views.",
      "The concluding stretch in Pahalgam introduces the Betaab Valley and the rushing Lidder river. We include hand-picked local drivers familiar with mountainous passes who know the finest authentic Wazwan spots."
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Srinagar & Sunset Shikara ride on Dal Lake (Heritage Houseboat)" },
      { day: "Day 2", title: "Srinagar to Gulmarg: Meadow walk & Gondola Cable Car Ride (Phases 1 & 2)" },
      { day: "Day 3", title: "Gulmarg to Pahalgam via saffron fields and Awantipora ruins" },
      { day: "Day 4", title: "Pahalgam local exploration: Betaab Valley, Aru Valley & riverside stroll" },
      { day: "Day 5", title: "Return to Srinagar: Shankaracharya Temple, Shalimar & Nishat Gardens" },
      { day: "Day 6", title: "Old Srinagar dry fruit bazaar walk & airport drop-off" }
    ],
    insiderTip: "Always request a Dal Lake houseboat positioned on the quieter inner canal rather than the bustling boulevard for tranquil mornings and clear mountain reflections."
  },
  {
    id: 2,
    category: "Domestic",
    title: "Kerala Soul Escape: Munnar Tea Hills to Alleppey Houseboats",
    excerpt: "Crisp misty mornings at tea estates, cascading Cheeyappara falls, and luxury backwater cruising in God's Own Country.",
    days: 5,
    durationText: "5 Days / 4 Nights",
    author: "Arjun Nair (Kerala Specialist)",
    readTime: "5 min read",
    priceEstimate: "From ₹18,900 / person",
    season: "September – April",
    idealFor: "Family, Honeymoon & Elders",
    style: "Private AC Vehicle + Air-Conditioned Kettuvallam",
    imgUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Kerala's natural cadence slows your heartbeat. Sai Viva Holidays designs this journey with zero rush: your private chauffeur greets you at Cochin airport and takes you up winding roads flanked by rubber trees and waterfalls into the cool air of Munnar.",
      "Spend two nights tucked between sprawling tea plantations, exploring the Eravikulam National Park and watching rare Nilgiri Tahr graze against rolling green knolls.",
      "The pinnacle is an overnight stay aboard a private, luxury Kettuvallam (traditional houseboat) in Alleppey. Savor freshly prepared Karimeen Pollichathu (pearl spot fish in banana leaf) cooked on board by your private chef as coconut palms drift gently by."
    ],
    itinerary: [
      { day: "Day 1", title: "Cochin pickup to Munnar via Cheeyappara & Valara Waterfalls (Resort check-in)" },
      { day: "Day 2", title: "Munnar tea museum, Mattupetty Dam, Echo Point & tea garden stroll" },
      { day: "Day 3", title: "Munnar to Thekkady: Spice plantation walking tour & Kathakali cultural show" },
      { day: "Day 4", title: "Thekkady to Alleppey: Board private luxury houseboat, cruise backwaters & village canals" },
      { day: "Day 5", title: "Disembark at Alleppey, Fort Kochi colonial walk & Cochin drop" }
    ],
    insiderTip: "Opt for an upper-deck houseboat for panoramic 360-degree photography of paddy fields and kingfishers during golden hour."
  },
  {
    id: 3,
    category: "Pilgrimage",
    title: "Divine Shirdi & Nashik: Complete Spiritual Circuit",
    excerpt: "Smooth VIP Darshan arrangements at Samadhi Mandir Shirdi, Trimbakeshwar Jyotirlinga, and Panchavati.",
    days: 3,
    durationText: "3 Days / 2 Nights",
    author: "Pandit R. Kulkarni (Spiritual Desk)",
    readTime: "3 min read",
    priceEstimate: "From ₹8,999 / person",
    season: "All Year Round",
    idealFor: "Devotees & Senior Citizens",
    style: "Comfort Cabs & Senior-Friendly Accommodations",
    imgUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Sai Viva Holidays takes deep pride in curating respectful, seamless spiritual yatra packages. Our Shirdi & Nashik pilgrimage is specially structured for families traveling with senior citizens who require punctual transfers, wheelchair assistance, and pre-scheduled Darshan.",
      "Visit the revered Samadhi Temple of Sai Baba, Dwarakamai, and Chavadi with dedicated local coordinators assisting your entry timing to avoid exhausting peak waiting periods.",
      "On day two, proceed to Nashik for Darshan at Trimbakeshwar (one of the 12 sacred Jyotirlingas of Lord Shiva) followed by the sacred sites of Panchavati, Sita Gufa, and the Godavari River Ghats."
    ],
    itinerary: [
      { day: "Day 1", title: "Pickup from Pune/Mumbai/Aurangabad to Shirdi. Evening Aarti & Samadhi Mandir Darshan" },
      { day: "Day 2", title: "Shirdi morning Kakad Aarti visit, proceed to Shani Shingnapur & return to Shirdi" },
      { day: "Day 3", title: "Shirdi to Nashik: Trimbakeshwar Jyotirlinga, Panchavati, Muktidham & return drop" }
    ],
    insiderTip: "We recommend booking weekday departures (Tuesday to Thursday) for a much calmer temple atmosphere and faster entry."
  },
  {
    id: 4,
    category: "International",
    title: "Dubai Unveiled: Skyscrapers, Desert Safaris & Luxury Marina",
    excerpt: "Experience Burj Khalifa's 124th floor, dune bashing with BBQ under starry skies, and futuristic museum wonders.",
    days: 5,
    durationText: "5 Days / 4 Nights",
    author: "Zaid Merchant (Middle East Desk)",
    readTime: "4 min read",
    priceEstimate: "From ₹48,000 / person + Flights",
    season: "October to April",
    idealFor: "Families, Friends & Shopping Lovers",
    style: "4-Star Hotel, Visa Assistance & Private Transfers",
    imgUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Dubai blends ultra-modern grandeur with Arabian warmth. With Sai Viva Holidays, you bypass confusing booking steps: your single package incorporates UAE tourist visas, airport meet-and-greet, luxury city touring, and entry tickets.",
      "Stand at the observation deck of the world's tallest building, the Burj Khalifa, witness the dancing fountains, and immerse yourself in the mind-bending exhibits at the Museum of the Future.",
      "Our Red Dune 4x4 Safari includes heart-racing dune bashing, sandboarding, camel rides, and an authentic Arabic buffet with Tanoura dance performances under desert stars."
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival at DXB Airport, hotel transfer, evening luxury Marina Dhow Cruise with buffet" },
      { day: "Day 2", title: "Half-day Dubai city tour, Dubai Mall & Burj Khalifa 124th floor at sunset" },
      { day: "Day 3", title: "Day at leisure for Gold & Spice Souks. Afternoon 4x4 Desert Safari & Bedouin dinner" },
      { day: "Day 4", title: "Visit Museum of the Future & optional Miracle Garden or Atlantis Aquaventure" },
      { day: "Day 5", title: "Last-minute duty-free shopping & airport transfer" }
    ],
    insiderTip: "Opt for the 5:30 PM Burj Khalifa slot so you witness the cityscape transition from golden sunset to millions of glittering night lights."
  },
  {
    id: 5,
    category: "International",
    title: "Bali Tropical Bliss: Sacred Temples, Waterfalls & Coastal Sunsets",
    excerpt: "Emerald rice terraces in Ubud, sacred sea temples in Tanah Lot, and Uluwatu cliffs overlooking crashing waves.",
    days: 6,
    durationText: "6 Days / 5 Nights",
    author: "Ananya Roy (Southeast Asia Desk)",
    readTime: "5 min read",
    priceEstimate: "From ₹34,900 / person",
    season: "April to October",
    idealFor: "Honeymooners, Couples & Adventurers",
    style: "Private Pool Villa + English Speaking Balinese Guide",
    imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "The Island of the Gods never fails to enchant. Sai Viva's Bali itinerary is curated to offer both sides of Bali: the tranquil, artistic jungle vibes of Ubud and the breezy oceanfront luxury of Seminyak.",
      "You'll begin in Ubud exploring the lush Tegalalang Rice Terraces, trying the iconic jungle swing, and trekking to hidden jungle waterfalls like Tegenungan.",
      "Afterwards, head down to Seminyak or Nusa Dua to spend two nights in a private pool villa, visiting the sea temple of Tanah Lot and Uluwatu Temple perched high atop sheer ocean cliffs."
    ],
    itinerary: [
      { day: "Day 1", title: "Denpasar arrival, flower garland welcome, transfer to Ubud Private Villa" },
      { day: "Day 2", title: "Tegalalang Rice Terraces, Aloha Jungle Swing, Kintamani Volcano view lunch" },
      { day: "Day 3", title: "Tegenungan Waterfall, Ubud Monkey Forest & art market shopping" },
      { day: "Day 4", title: "Transfer to Seminyak beach resort. Sunset at cliffside Uluwatu Temple & Kecak Dance" },
      { day: "Day 5", title: "Day trip to Nusa Penida Island (Kelingking T-Rex Beach & Angel's Billabong)" },
      { day: "Day 6", title: "Balinese traditional massage & airport drop" }
    ],
    insiderTip: "Take the morning speedboat to Nusa Penida to beat the crowds at Kelingking viewpoint."
  },
  {
    id: 6,
    category: "Honeymoon",
    title: "Maldives: Overwater Villa Dreams & Turquoise Lagoons",
    excerpt: "Unpack on private coral atolls, dine under the stars on powdery sands, and snorkel with gentle manta rays.",
    days: 4,
    durationText: "4 Nights / 5 Days",
    author: "Preeti Verma (Luxury Team)",
    readTime: "3 min read",
    priceEstimate: "From ₹72,000 / person (All Inclusive)",
    season: "November to April",
    idealFor: "Honeymoons & Anniversary Milestones",
    style: "Speedboat / Seaplane Transfer & All-Inclusive Resort",
    imgUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Few destinations on the planet evoke pure escapism like the Maldives. With Sai Viva Holidays, we match you with verified resort properties offering dedicated meal packages so there are no unexpected dining charges on checkout.",
      "Enjoy a split stay: spend your first two nights in a beachfront villa with direct access to pale sands, and two nights suspended directly over crystal-clear lagoon waters in an overwater villa with private plunge pool.",
      "Includes complimentary honeymoon surprises like a bed floral decoration, sunset mocktails, and a photo session."
    ],
    itinerary: [
      { day: "Day 1", title: "Male International Airport arrival, thrilling speedboat/seaplane transfer to resort island" },
      { day: "Day 2", title: "House reef snorkeling, kayak exploration & sunset cocktail hour" },
      { day: "Day 3", title: "Move to Overwater Villa, private couple's spa treatment & floating breakfast" },
      { day: "Day 4", title: "Dolphin watching boat excursion & candlelit beach dinner" },
      { day: "Day 5", title: "Buffet breakfast, sea views & seaplane transfer back to Male" }
    ],
    insiderTip: "Select the 'All-Inclusive Dine Around' plan so you can enjoy à la carte specialty Thai, Italian, and Mediterranean restaurants on the island without limit."
  },
  {
    id: 7,
    category: "Domestic",
    title: "Himachal Serenity: Shimla, Kullu & Manali Mountains",
    excerpt: "Pine forests, Solang Valley adventure, the iconic Atal Tunnel, and Tibetan monastery strolls.",
    days: 6,
    durationText: "6 Days / 5 Nights",
    author: "Rohan Malhotra (Himalayan Guides)",
    readTime: "4 min read",
    priceEstimate: "From ₹16,500 / person",
    season: "March–June (Pleasant) / Nov–Feb (Snowfall)",
    idealFor: "Youth Groups, Families & Couples",
    style: "Private Innova / Tempo Traveler with Mountain Driver",
    imgUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "The Himachal circuit is India’s favorite mountain retreat for good reason. Sai Viva Holidays starts your tour from Delhi or Chandigarh, whisking you safely through lush Shivalik foothills.",
      "In Shimla, stroll the pedestrianized Mall Road and Ridge, admire colonial architecture, and take in the panoramic viewpoints of Kufri. Then drive alongside the churning Beas river towards Manali.",
      "Traverse the engineering wonder of the Atal Tunnel to enter Sissu valley, try paragliding in Solang, and soak in hot sulphur springs at Vashisht."
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi/Chandigarh drive to Shimla, evening Mall Road walk" },
      { day: "Day 2", title: "Shimla to Kufri snow viewpoint, Jakhoo Temple & Green Valley" },
      { day: "Day 3", title: "Scenic drive from Shimla to Manali via Kullu river rafting points" },
      { day: "Day 4", title: "Solang Valley adventure sports, Atal Tunnel crossing & Sissu waterfall" },
      { day: "Day 5", title: "Manali local: Hadimba Devi Temple, Vashisht hot springs & Old Manali cafés" },
      { day: "Day 6", title: "Breakfast & return drive to Delhi/Chandigarh" }
    ],
    insiderTip: "Carry light woolens even in summer as evenings near the Beas river and Atal Tunnel can drop to 12°C quickly."
  },
  {
    id: 8,
    category: "Pilgrimage",
    title: "Kashi (Varanasi), Prayagraj & Ayodhya Sacred Triangle",
    excerpt: "Ganga Aarti at Dashashwamedh, Kashi Vishwanath Corridor, Sangam Snan, and the grand Ram Mandir.",
    days: 5,
    durationText: "5 Days / 4 Nights",
    author: "Pandit R. Kulkarni (Spiritual Desk)",
    readTime: "4 min read",
    priceEstimate: "From ₹15,900 / person",
    season: "October to March",
    idealFor: "Elders, Devotees & Families",
    style: "AC Sedan + Boat rides + VIP Temple Passes",
    imgUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Experience the spiritual heartbeat of India. Our Kashi-Ayodhya pilgrimage has been praised by thousands of senior citizens for its organized, caring pace.",
      "In Varanasi, witness the world-famous evening Ganga Aarti from a private reserved boat, visit the newly restored Kashi Vishwanath Golden Temple, and visit Sarnath where Buddha gave his first sermon.",
      "The tour then takes you to Prayagraj for the holy Triveni Sangam, followed by Ayodhya to offer prayers at Shri Ram Janmabhoomi Mandir and Sarayu river ghats."
    ],
    itinerary: [
      { day: "Day 1", title: "Varanasi arrival, hotel check-in, sunset boat ride & Dashashwamedh Ganga Aarti" },
      { day: "Day 2", title: "Early morning Kashi Vishwanath, Annapurna, Kaal Bhairav & Sarnath Buddhist park" },
      { day: "Day 3", title: "Drive to Prayagraj: Triveni Sangam boat ride, Anand Bhavan & proceed to Ayodhya" },
      { day: "Day 4", title: "Ayodhya: Shri Ram Janmabhoomi Darshan, Hanuman Garhi, Kanak Bhavan & Sarayu Aarti" },
      { day: "Day 5", title: "Morning Aarti and drop to Lucknow or Varanasi Airport" }
    ],
    insiderTip: "We arrange e-rickshaws through the narrow gullies of Varanasi so elderly travelers never have to walk long distances on stone pavements."
  },
  {
    id: 9,
    category: "International",
    title: "Vietnam: Halong Bay Cruise, Hanoi & Lantern-lit Hoi An",
    excerpt: "Limestone karsts rising from emerald waters, egg coffee in Hanoi's old quarter, and lantern boats in Hoi An.",
    days: 7,
    durationText: "7 Days / 6 Nights",
    author: "Ananya Roy (Southeast Asia Desk)",
    readTime: "5 min read",
    priceEstimate: "From ₹44,500 / person + Flights",
    season: "September to April",
    idealFor: "Culture Seekers, Food Lovers & Photographers",
    style: "5-Star Overnight Cruise + Boutique Hotels",
    imgUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    paragraphs: [
      "Vietnam is rapidly becoming one of the most beloved destinations for travelers looking for culture, cuisine, and jaw-dropping landscapes at unbeatable value.",
      "Cruise through Halong Bay on a boutique wooden junk boat, kayaking through dark & light water caves and waking up to misty limestone peaks right outside your cabin window.",
      "In Hoi An, cycle past emerald rice paddies, make your own silk lantern, and sail down the Thu Bon river beneath thousands of candle-lit lanterns."
    ],
    itinerary: [
      { day: "Day 1", title: "Hanoi arrival, cyclo rickshaw tour of the French Quarter & Old 36 Streets" },
      { day: "Day 2", title: "Drive to Halong Bay, board luxury overnight cruise, kayak into karst sea caves" },
      { day: "Day 3", title: "Tai Chi on cruise deck, morning cave visit, transfer to Hanoi airport for flight to Da Nang" },
      { day: "Day 4", title: "Ba Na Hills & Golden Hand Bridge, transfer to UNESCO heritage town Hoi An" },
      { day: "Day 5", title: "Hoi An lantern making workshop, basket boat ride in coconut forest & night market" },
      { day: "Day 6", title: "Relax on An Bang Beach or optional Marble Mountains visit" },
      { day: "Day 7", title: "Flight from Da Nang back home" }
    ],
    insiderTip: "Don't miss a piping hot bowl of vegetarian Pho and traditional Vietnamese drip coffee with condensed milk at a sidewalk café in Hanoi."
  }
];

export default function App() {
  // Navigation & UI states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'days-asc' | 'days-desc'>('featured');
  const [savedTripIds, setSavedTripIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('saiVivaBookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);
  const [enquiryPackage, setEnquiryPackage] = useState<string | null>(null);
  const [enquirySuccessMessage, setEnquirySuccessMessage] = useState<string | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Architect State (High Thinking with Gemini 4 Argon)
  const [aiDestination, setAiDestination] = useState('');
  const [aiDays, setAiDays] = useState('6');
  const [aiTravelers, setAiTravelers] = useState('Family (2 Adults + 2 Kids)');
  const [aiBudget, setAiBudget] = useState('Comfortable 4-Star');
  const [aiRequirements, setAiRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync saved trips
  useEffect(() => {
    try {
      localStorage.setItem('saiVivaBookmarks', JSON.stringify(savedTripIds));
    } catch (err) {
      console.error(err);
    }
  }, [savedTripIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedTripIds.includes(id)) {
      setSavedTripIds(prev => prev.filter(item => item !== id));
      showToast('Removed from saved trips.');
    } else {
      setSavedTripIds(prev => [...prev, id]);
      showToast('Trip saved to your wishlist! ★');
    }
  };

  // Filter & Sort stories
  const filteredStories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let list = TRAVEL_STORIES.filter(story => {
      const matchesCategory =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Saved'
          ? savedTripIds.includes(story.id)
          : story.category === activeCategory;

      const matchesSearch =
        q === '' ||
        story.title.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    if (sortOrder === 'days-asc') {
      list = [...list].sort((a, b) => a.days - b.days);
    } else if (sortOrder === 'days-desc') {
      list = [...list].sort((a, b) => b.days - a.days);
    }

    return list;
  }, [searchQuery, activeCategory, sortOrder, savedTripIds]);

  // Handle Enquiry submission
  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      packageTitle: enquiryPackage || (formData.get('package') as string) || 'Custom Tour',
      travelMonth: formData.get('travelMonth') as string,
      guests: formData.get('guests') as string,
      notes: formData.get('notes') as string,
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setEnquiryPackage(null);
      showToast(`Thank you, ${payload.name}! Reference ${data.referenceId || 'SV-HOLIDAYS'} generated.`);
    } catch {
      setEnquiryPackage(null);
      showToast(`Thank you, ${payload.name}! Sai Viva team will connect shortly.`);
    }
  };

  // Handle High-Thinking Gemini Itinerary Generation
  const handleGenerateItinerary = async (preset?: { dest: string; days: string; travelers: string; req: string }) => {
    const targetDest = preset ? preset.dest : aiDestination;
    const targetDays = preset ? preset.days : aiDays;
    const targetTravelers = preset ? preset.travelers : aiTravelers;
    const targetReq = preset ? preset.req : aiRequirements;

    if (!targetDest && !targetReq) {
      setAiError('Please enter a destination or describe your travel dreams.');
      return;
    }

    setIsGenerating(true);
    setAiError(null);
    setAiGeneratedPlan(null);

    try {
      const res = await fetch('/api/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: targetDest,
          durationDays: targetDays,
          travelers: targetTravelers,
          budgetTier: aiBudget,
          specialRequirements: targetReq,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to architect plan.');
      }

      const plan: GeneratedPlan = await res.json();
      setAiGeneratedPlan(plan);
      showToast('Bespoke itinerary architected by Gemini thinking mode!');
    } catch (err: any) {
      console.error(err);
      setAiError('Could not generate plan. Please try again or reach out to our human specialists.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#1f2824] bg-[#fbf9f5]">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0a241e] text-[#c9ded9] text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="text-[#d49a3f]">✦</span>
            <span>
              <strong>Sai Viva Holidays</strong> — Curated Domestic & International Vacations with 24/7 Dedicated Concierge
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#d49a3f]" />
              <span>Helpline: <strong>+91 98200 12345</strong></span>
            </span>
            <a
              href="mailto:contact@saivivaholidays.com"
              className="text-[#d49a3f] hover:underline flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>contact@saivivaholidays.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e6e8e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#123d34] text-[#d49a3f] flex items-center justify-center font-bold text-lg shadow-sm border border-[#d49a3f]/30">
              SV
            </div>
            <div>
              <div className="font-serif-heading font-bold text-2xl tracking-tight text-[#123d34] flex items-center">
                sai viva<span className="text-[#d49a3f]">.</span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-[#66726b] font-semibold">
                Holidays & Journeys
              </p>
            </div>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1f2824]">
            <a href="#packages" className="hover:text-[#d49a3f] transition-colors">
              Curated Packages
            </a>
            <a href="#ai-architect" className="flex items-center gap-1.5 text-[#123d34] font-semibold hover:text-[#d49a3f] transition-colors">
              <Sparkles className="w-4 h-4 text-[#d49a3f] animate-pulse" />
              <span>AI Architect</span>
              <span className="text-[10px] bg-[#d49a3f]/20 text-[#8c5d10] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Thinking
              </span>
            </a>
            <a href="#why-us" className="hover:text-[#d49a3f] transition-colors">
              Why Us
            </a>
            <a href="#contact" className="hover:text-[#d49a3f] transition-colors">
              Contact
            </a>
          </nav>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/919820012345?text=Hello%20Sai%20Viva%20Holidays,%20I%20would%20like%20to%20inquire%20about%20a%20tour%20package."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-semibold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm transition-all hover:shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={() => setEnquiryPackage('Custom Holiday Request')}
              className="bg-[#123d34] hover:bg-[#185246] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#123d34] hover:bg-[#edf1ec]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#e6e8e4] px-4 py-4 space-y-3 shadow-lg">
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-[#1f2824] hover:text-[#d49a3f]"
            >
              Curated Packages
            </a>
            <a
              href="#ai-architect"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold py-1.5 text-[#123d34]"
            >
              <Sparkles className="w-4 h-4 text-[#d49a3f]" />
              <span>AI Architect (Gemini Thinking Mode)</span>
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-[#1f2824] hover:text-[#d49a3f]"
            >
              Why Us
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-[#1f2824] hover:text-[#d49a3f]"
            >
              Contact
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryPackage('Custom Holiday Request');
                }}
                className="w-full bg-[#123d34] text-white text-sm font-semibold py-2.5 rounded-full"
              >
                Get Free Quote
              </button>
              <a
                href="https://wa.me/919820012345?text=Hello%20Sai%20Viva%20Holidays"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25d366] text-white text-sm font-semibold py-2.5 rounded-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Instant Help</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#fbeedb] text-[#8c5d10] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <span>🌟</span>
                <span>Tailor-Made & Group Vacations</span>
              </div>

              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl text-[#0a241e] font-bold leading-[1.12]">
                Explore India and the world with{' '}
                <em className="text-[#d49a3f] font-normal italic">Sai Viva Holidays.</em>
              </h1>

              <p className="text-[#66726b] text-base sm:text-lg max-w-xl leading-relaxed">
                From serene backwaters of Kerala and mystical snow peaks of Kashmir to golden dunes of Dubai and sacred temple circuits, we engineer stress-free, luxurious journeys tailored to your budget and passion.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#packages"
                  className="bg-[#123d34] hover:bg-[#185246] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all shadow-sm hover:shadow"
                >
                  Browse Itineraries & Blog ↓
                </a>
                <a
                  href="#ai-architect"
                  className="bg-white border border-[#e6e8e4] hover:border-[#123d34] text-[#123d34] font-semibold text-sm px-6 py-3.5 rounded-full flex items-center gap-2 transition-all hover:bg-[#f7faf7]"
                >
                  <Sparkles className="w-4 h-4 text-[#d49a3f]" />
                  <span>Custom Trip Architect</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#e6e8e4] max-w-lg">
                <div>
                  <h4 className="font-serif-heading font-bold text-2xl text-[#123d34]">15,000+</h4>
                  <p className="text-xs text-[#66726b]">Happy Voyagers</p>
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-2xl text-[#123d34]">4.9 ★</h4>
                  <p className="text-xs text-[#66726b]">Customer Rating</p>
                </div>
                <div>
                  <h4 className="font-serif-heading font-bold text-2xl text-[#123d34]">100%</h4>
                  <p className="text-xs text-[#66726b]">Customized Plans</p>
                </div>
              </div>
            </div>

            {/* Right Visual Image + Floating Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1000&q=80"
                  alt="Scenic tropical and mountain getaway by Sai Viva Holidays"
                  className="w-full h-[440px] sm:h-[480px] object-cover rounded-3xl shadow-xl border-4 border-white"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-[#e6e8e4] flex items-center gap-4 max-w-[280px] sm:max-w-[320px]">
                  <div className="w-12 h-12 rounded-xl bg-[#fbeedb] text-[#d49a3f] flex items-center justify-center text-xl flex-shrink-0">
                    ✈️
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#123d34]">Curated with Local Care</h5>
                    <p className="text-xs text-[#66726b] mt-0.5">
                      24/7 dedicated travel concierge throughout your trip.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TICKER BAR */}
      <div className="bg-[#123d34] text-white py-3.5 overflow-hidden border-y border-[#185246]">
        <div className="animate-ticker text-xs tracking-widest uppercase font-semibold flex items-center gap-10">
          <span>KASHMIR & LADAKH <b className="text-[#d49a3f]">✦</b></span>
          <span>KERALA HOUSEBOATS <b className="text-[#d49a3f]">✦</b></span>
          <span>BALI PARADISE <b className="text-[#d49a3f]">✦</b></span>
          <span>SHIRDI & CHAR DHAM SPIRITUAL TOURS <b className="text-[#d49a3f]">✦</b></span>
          <span>DUBAI DESERT SAFARI <b className="text-[#d49a3f]">✦</b></span>
          <span>VIETNAM & THAILAND <b className="text-[#d49a3f]">✦</b></span>
          <span>EUROPE GRAND TOUR <b className="text-[#d49a3f]">✦</b></span>
          <span>ANDAMAN ISLANDS <b className="text-[#d49a3f]">✦</b></span>
          <span>HIMACHAL SERENITY <b className="text-[#d49a3f]">✦</b></span>
          <span>MALDIVES LUXURY <b className="text-[#d49a3f]">✦</b></span>
          {/* Repeating for infinite loop */}
          <span>KASHMIR & LADAKH <b className="text-[#d49a3f]">✦</b></span>
          <span>KERALA HOUSEBOATS <b className="text-[#d49a3f]">✦</b></span>
          <span>BALI PARADISE <b className="text-[#d49a3f]">✦</b></span>
          <span>SHIRDI & CHAR DHAM SPIRITUAL TOURS <b className="text-[#d49a3f]">✦</b></span>
        </div>
      </div>

      {/* 5. AI ITINERARY ARCHITECT (GEMINI 4 ARGON HIGH THINKING) */}
      <section id="ai-architect" className="py-16 sm:py-20 bg-gradient-to-b from-[#edf1ec]/60 to-[#fbf9f5] border-b border-[#e6e8e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 bg-[#d49a3f]/15 text-[#7b4f0b] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d49a3f]" />
              <span>Sai Viva High-Thinking Vacation Architect</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#0a241e] font-bold">
              Got a Complex Travel Vision? Let Our AI Think Through Every Detail.
            </h2>
            <p className="text-sm sm:text-base text-[#66726b] mt-3 leading-relaxed">
              Powered by deep reasoning models, our vacation architect evaluates driving transit times, elderly or toddler pacing, altitude acclimation, hotel tiering, and crowd mitigation to draft a realistic day-by-day itinerary.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#66726b] mb-2.5">
              Popular Complex Queries (Click to try):
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  handleGenerateItinerary({
                    dest: 'Kerala Backwaters & Munnar',
                    days: '7',
                    travelers: 'Family with 2 Senior Citizens (65+) & 1 Child (8)',
                    req: 'Knee issues: minimal steep stairs, elevator hotels, gentle pacing, pure vegetarian meals, and private luxury AC houseboat.'
                  })
                }
                className="text-xs bg-white hover:bg-[#123d34] hover:text-white text-[#123d34] border border-[#dbe6dc] px-3.5 py-2 rounded-full transition-all shadow-2xs"
              >
                👴 7-Day Serene Kerala for Seniors & Kids
              </button>
              <button
                onClick={() =>
                  handleGenerateItinerary({
                    dest: 'Kashmir Winter Wonderland',
                    days: '6',
                    travelers: 'Couple (Honeymoon)',
                    req: 'Gulmarg Gondola Phase 2 snow activities, cozy heated houseboat on Dal Lake, scenic photography, romantic candlelight dinner.'
                  })
                }
                className="text-xs bg-white hover:bg-[#123d34] hover:text-white text-[#123d34] border border-[#dbe6dc] px-3.5 py-2 rounded-full transition-all shadow-2xs"
              >
                ❄️ 6-Day Romantic Kashmir & Gondola
              </button>
              <button
                onClick={() =>
                  handleGenerateItinerary({
                    dest: 'Kashi, Prayagraj & Ayodhya',
                    days: '5',
                    travelers: 'Spiritual Devotees (4 Adults)',
                    req: 'VIP Darshan at Kashi Vishwanath, reserved boat for evening Ganga Aarti, Sangam snan arrangements, and Ram Mandir Ayodhya visit.'
                  })
                }
                className="text-xs bg-white hover:bg-[#123d34] hover:text-white text-[#123d34] border border-[#dbe6dc] px-3.5 py-2 rounded-full transition-all shadow-2xs"
              >
                🪔 5-Day Sacred Kashi-Ayodhya Circuit
              </button>
              <button
                onClick={() =>
                  handleGenerateItinerary({
                    dest: 'Dubai & Abu Dhabi Extravaganza',
                    days: '5',
                    travelers: '4 Working Professionals / Friends',
                    req: 'Burj Khalifa sunset view, desert safari with quad biking, Museum of the Future, fine dining & Gold Souk shopping.'
                  })
                }
                className="text-xs bg-white hover:bg-[#123d34] hover:text-white text-[#123d34] border border-[#dbe6dc] px-3.5 py-2 rounded-full transition-all shadow-2xs"
              >
                🌆 5-Day Dubai City & Dune Bashing
              </button>
            </div>
          </div>

          {/* Generator Form Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6e8e4] shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1.5">
                  Destination / Region
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bali, Kashmir, Rajasthan..."
                  value={aiDestination}
                  onChange={(e) => setAiDestination(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-[#fbf9f5]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1.5">
                  Duration (Days)
                </label>
                <select
                  value={aiDays}
                  onChange={(e) => setAiDays(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-white"
                >
                  <option value="3">3 Days (Weekend / Quick Yatra)</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days (Full Week)</option>
                  <option value="9">9 Days (Extended)</option>
                  <option value="12">12 Days (Grand Holiday)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1.5">
                  Travelers / Party Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 Adults + 2 Seniors"
                  value={aiTravelers}
                  onChange={(e) => setAiTravelers(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-[#fbf9f5]/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1.5">
                  Hotel / Budget Tier
                </label>
                <select
                  value={aiBudget}
                  onChange={(e) => setAiBudget(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-white"
                >
                  <option value="Comfortable 3-Star & Verified Homestays">Budget-Friendly / 3-Star</option>
                  <option value="Comfortable 4-Star">Comfortable 4-Star (Recommended)</option>
                  <option value="Luxury 5-Star & Heritage Boutique Resorts">Luxury 5-Star & Heritage</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#1f2824] mb-1.5">
                Special Logistics, Pacing & Dietary Notes (The complex factors our AI reasons through)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need wheelchair accessibility in temples, avoid night driving on ghats, strictly Jain food required, need 2 adjoining rooms for kids, photography morning golden hour..."
                value={aiRequirements}
                onChange={(e) => setAiRequirements(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-[#fbf9f5]/50"
              />
            </div>

            {aiError && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                {aiError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#e6e8e4]">
              <div className="flex items-center gap-2 text-xs text-[#66726b]">
                <Shield className="w-4 h-4 text-[#123d34]" />
                <span>Deeply reasoned for drive times, opening hours & comfort</span>
              </div>
              <button
                onClick={() => handleGenerateItinerary()}
                disabled={isGenerating}
                className="w-full sm:w-auto bg-[#123d34] hover:bg-[#185246] disabled:opacity-70 text-white font-semibold text-sm px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking Through Logistics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#d49a3f]" />
                    <span>Architect Custom Plan ↗</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Plan Output Display */}
          {aiGeneratedPlan && (
            <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#123d34]/20 shadow-xl space-y-8 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e6e8e4]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#123d34] text-white px-3 py-1 rounded-full">
                    {aiGeneratedPlan.destination}
                  </span>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#0a241e] font-bold mt-2">
                    {aiGeneratedPlan.tripTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66726b] mt-1">
                    {aiGeneratedPlan.overview}
                  </p>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <span className="text-xs text-[#66726b] block">Estimated Cost</span>
                  <span className="text-lg font-bold text-[#123d34]">
                    {aiGeneratedPlan.estimatedCostPerPerson}
                  </span>
                  <span className="text-[11px] text-[#66726b] block mt-0.5">
                    {aiGeneratedPlan.durationText}
                  </span>
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f7faf7] p-4 rounded-2xl border border-[#dbe6dc]">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#66726b]">Best Season</p>
                  <p className="font-semibold text-sm text-[#123d34] mt-0.5">{aiGeneratedPlan.bestSeason}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#66726b]">Ideal For</p>
                  <p className="font-semibold text-sm text-[#123d34] mt-0.5">{aiGeneratedPlan.suitability}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#66726b]">Hotel Tier</p>
                  <p className="font-semibold text-sm text-[#123d34] mt-0.5">{aiGeneratedPlan.recommendedHotelTier}</p>
                </div>
              </div>

              {/* Day-by-Day Detailed Plan */}
              <div>
                <h4 className="font-serif-heading text-xl font-bold text-[#123d34] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d49a3f]" />
                  <span>Curated Day-By-Day Route & Time Slots</span>
                </h4>
                <div className="space-y-4">
                  {aiGeneratedPlan.dailyPlan.map((dp) => (
                    <div
                      key={dp.day}
                      className="border border-[#e6e8e4] rounded-2xl p-5 hover:border-[#123d34]/40 transition-colors bg-[#fbf9f5]/40"
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h5 className="font-bold text-[#123d34] text-base flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-[#123d34] text-white text-xs flex items-center justify-center font-bold">
                            D{dp.day}
                          </span>
                          <span>{dp.title}</span>
                        </h5>
                        <span className="text-xs text-[#8c5d10] bg-[#fbeedb] px-2.5 py-1 rounded-md font-medium">
                          {dp.travelTimeNotes}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#3b4540] mt-2">
                        <div className="bg-white p-3 rounded-xl border border-[#e6e8e4]">
                          <span className="font-bold text-[#123d34] flex items-center gap-1.5 mb-1">
                            <SunMedium className="w-3.5 h-3.5 text-[#d49a3f]" /> Morning
                          </span>
                          <p className="leading-relaxed">{dp.morning}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#e6e8e4]">
                          <span className="font-bold text-[#123d34] flex items-center gap-1.5 mb-1">
                            <Utensils className="w-3.5 h-3.5 text-[#d49a3f]" /> Afternoon
                          </span>
                          <p className="leading-relaxed">{dp.afternoon}</p>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-[#e6e8e4]">
                          <span className="font-bold text-[#123d34] flex items-center gap-1.5 mb-1">
                            <Clock className="w-3.5 h-3.5 text-[#d49a3f]" /> Evening
                          </span>
                          <p className="leading-relaxed">{dp.evening}</p>
                        </div>
                      </div>

                      {dp.specialMealsOrTips && (
                        <p className="text-xs text-[#66726b] mt-3 italic flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-[#d49a3f] flex-shrink-0" />
                          <span>Special Note: {dp.specialMealsOrTips}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistics & Tips Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#f7faf7] border border-[#dbe6dc] p-5 rounded-2xl">
                  <h5 className="font-bold text-sm text-[#123d34] mb-3 flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#d49a3f]" />
                    <span>Logistics & Transit Reasoning</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#3b4540]">
                    {aiGeneratedPlan.logisticsAdvice.map((advice, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#123d34] flex-shrink-0 mt-0.5" />
                        <span>{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fbeedb]/60 border border-[#f5dfb8] p-5 rounded-2xl">
                  <h5 className="font-bold text-sm text-[#7b4f0b] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d49a3f]" />
                    <span>Sai Viva Insider Specialist Tips</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#5a3c10]">
                    {aiGeneratedPlan.insiderSpecialistTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#d49a3f] font-bold">✦</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-[#e6e8e4] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h6 className="font-bold text-[#123d34] text-sm">
                    Ready to bring this custom itinerary to life?
                  </h6>
                  <p className="text-xs text-[#66726b]">
                    Our travel specialists will verify room availability, drivers, and lock the best tariffs.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setEnquiryPackage(aiGeneratedPlan.tripTitle)}
                    className="flex-1 sm:flex-none bg-[#123d34] hover:bg-[#185246] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    Book / Quote This AI Plan ↗
                  </button>
                  <a
                    href={`https://wa.me/919820012345?text=${encodeURIComponent(
                      `Hello Sai Viva Holidays, I would like to book my custom itinerary: "${aiGeneratedPlan.tripTitle}" for ${aiGeneratedPlan.destination}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25d366] text-white text-xs font-semibold px-4 py-3 rounded-full flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. CURATED PACKAGES & TRAVEL JOURNAL SECTION */}
      <section id="packages" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#d49a3f] mb-2">
              Sai Viva Travel Journal & Handcrafted Packages
            </p>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#0a241e] font-bold">
              Inspiration, Route Maps & Guides
            </h2>
          </div>
          <p className="text-sm text-[#66726b] max-w-md">
            Dive into our insider field notes, detailed day-by-day itineraries, estimated budgets, and expert travel advice for your next journey.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e6e8e4] shadow-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {['All', 'Domestic', 'International', 'Pilgrimage', 'Honeymoon'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#123d34] text-white shadow-xs'
                    : 'bg-[#fbf9f5] text-[#66726b] hover:bg-[#edf1ec] hover:text-[#123d34]'
                }`}
              >
                {cat === 'All' ? 'All Journeys' : cat === 'Domestic' ? 'Domestic India' : cat === 'Pilgrimage' ? 'Spiritual & Heritage' : cat === 'Honeymoon' ? 'Honeymoon & Luxury' : cat}
              </button>
            ))}
            <button
              onClick={() => setActiveCategory('Saved')}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'Saved'
                  ? 'bg-[#d49a3f] text-white'
                  : 'bg-[#fbeedb] text-[#7b4f0b] hover:bg-[#f7dfb8]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Saved Trips ({savedTripIds.length})</span>
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#66726b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                placeholder="Search destination, hills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-full border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-[#fbf9f5]"
              />
            </div>
            <select
              value={sortOrder}
              onChange={(e: any) => setSortOrder(e.target.value)}
              className="w-full sm:w-auto text-xs px-3.5 py-2 rounded-full border border-[#e6e8e4] bg-white text-[#66726b] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Stories</option>
              <option value="days-asc">Duration (Short to Long)</option>
              <option value="days-desc">Duration (Long to Short)</option>
            </select>
          </div>
        </div>

        {/* Story Cards Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#e6e8e4]">
            <p className="text-4xl mb-3">🏝️</p>
            <h4 className="font-serif-heading font-bold text-lg text-[#123d34]">
              No journeys match your criteria
            </h4>
            <p className="text-xs text-[#66726b] mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or switch categories, or design a custom trip in our AI Architect above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => {
              const isSaved = savedTripIds.includes(story.id);
              return (
                <article
                  key={story.id}
                  className="bg-white rounded-2xl border border-[#e6e8e4] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col group"
                >
                  {/* Media */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={story.imgUrl}
                      alt={story.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3.5 left-3.5 bg-[#123d34]/90 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {story.category}
                    </span>
                    <button
                      onClick={(e) => toggleBookmark(story.id, e)}
                      title={isSaved ? 'Remove bookmark' : 'Save trip'}
                      className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110 ${
                        isSaved ? 'text-[#d49a3f]' : 'text-gray-400'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-[#66726b] mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d49a3f]" />
                        <span>{story.durationText}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{story.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif-heading font-bold text-xl text-[#0a241e] leading-snug mb-2 group-hover:text-[#123d34] transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-xs text-[#66726b] leading-relaxed line-clamp-3 mb-5 flex-1">
                      {story.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-[#e6e8e4] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#123d34]">
                        {story.priceEstimate}
                      </span>
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="text-xs font-bold text-[#123d34] hover:text-[#d49a3f] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Read Itinerary</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 7. WHY CHOOSE US (THE SAI VIVA PROMISE) */}
      <section id="why-us" className="py-16 sm:py-20 bg-[#edf1ec]/70 border-y border-[#e6e8e4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#d49a3f] mb-2">
              The Sai Viva Promise
            </p>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#0a241e] font-bold">
              Why Savvy Travelers Choose Us
            </h2>
            <p className="text-sm text-[#66726b] mt-2">
              We combine transparent pricing, verified luxury stays, and attentive personalized service to make every trip seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#e6e8e4] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#fbeedb] text-[#d49a3f] flex items-center justify-center text-2xl mb-4">
                🧭
              </div>
              <h4 className="font-bold text-[#123d34] text-base mb-2">Tailored Itineraries</h4>
              <p className="text-xs text-[#66726b] leading-relaxed">
                No generic cookie-cutter tours. We personalize pace, sightseeing, meals, and accommodations to match your family style.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#e6e8e4] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#fbeedb] text-[#d49a3f] flex items-center justify-center text-2xl mb-4">
                🛡️
              </div>
              <h4 className="font-bold text-[#123d34] text-base mb-2">Verified Stays & Cabs</h4>
              <p className="text-xs text-[#66726b] leading-relaxed">
                Only hand-inspected 3-star, 4-star, and 5-star properties, hygienic vehicles, and trusted English/Hindi speaking tour drivers.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#e6e8e4] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#fbeedb] text-[#d49a3f] flex items-center justify-center text-2xl mb-4">
                📞
              </div>
              <h4 className="font-bold text-[#123d34] text-base mb-2">24/7 On-Trip Concierge</h4>
              <p className="text-xs text-[#66726b] leading-relaxed">
                A dedicated trip manager is a WhatsApp ping away from departure to safe return home, smoothing flight delays or schedule edits.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#e6e8e4] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#fbeedb] text-[#d49a3f] flex items-center justify-center text-2xl mb-4">
                💰
              </div>
              <h4 className="font-bold text-[#123d34] text-base mb-2">Honest, No-Hidden Pricing</h4>
              <p className="text-xs text-[#66726b] leading-relaxed">
                Transparent quotes covering permits, transfers, taxes, and breakfast with flexible installment options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="contact" className="bg-[#0a241e] text-[#d1ddd8] pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#123d34] text-[#d49a3f] flex items-center justify-center font-bold text-base border border-[#d49a3f]/40">
                  SV
                </div>
                <h3 className="font-serif-heading font-bold text-2xl text-white">
                  sai viva<span className="text-[#d49a3f]">.</span> holidays
                </h3>
              </div>
              <p className="text-xs text-[#9cb5ad] leading-relaxed max-w-sm">
                Transforming dream getaways into effortless memories. Specialists in tailored India circuits, temple pilgrimages, and worldwide vacation packages.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://wa.me/919820012345"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25d366] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Domestic */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
                Domestic Circuits
              </h5>
              <ul className="space-y-2.5 text-xs text-[#9cb5ad]">
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Kashmir & Gulmarg</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Kerala Backwaters</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Himachal Serenity</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Shirdi & Nashik Yatra</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Kashi & Ayodhya</a></li>
              </ul>
            </div>

            {/* International */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
                International Tours
              </h5>
              <ul className="space-y-2.5 text-xs text-[#9cb5ad]">
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Dubai Extravaganza</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Bali Island Escape</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Vietnam & Halong Bay</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Maldives Overwater</a></li>
                <li><a href="#packages" className="hover:text-[#d49a3f] transition-colors">Thailand & Singapore</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-white mb-4">
                Reach Sai Viva
              </h5>
              <p className="text-xs text-[#9cb5ad] leading-relaxed">
                📍 Express Towers, MG Road, Mumbai / Pune<br />
                📞 +91 98200 12345 / +91 98200 67890<br />
                📧 bookings@saivivaholidays.com<br />
                🕒 Mon – Sat: 9:30 AM to 7:30 PM
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8da69e]">
            <p>© {new Date().getFullYear()} Sai Viva Holidays. All rights reserved. Registered Tour Operator.</p>
            <p>Crafted for thoughtful journeys & unforgettable smiles.</p>
          </div>
        </div>
      </footer>

      {/* 9. ITINERARY DETAIL MODAL */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-[#0a241e]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#123d34] shadow-md flex items-center justify-center transition-transform hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Cover Image */}
            <div className="relative h-64 sm:h-72 w-full flex-shrink-0">
              <img
                src={selectedStory.imgUrl}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-6 bg-[#123d34]/95 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full backdrop-blur-xs">
                {selectedStory.category}
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#0a241e]">
                  {selectedStory.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#66726b] mt-3 pb-4 border-b border-[#e6e8e4]">
                  <span>✍️ {selectedStory.author}</span>
                  <span>•</span>
                  <span>⏱️ {selectedStory.readTime}</span>
                  <span>•</span>
                  <span>📅 {selectedStory.durationText}</span>
                  <span>•</span>
                  <span className="font-bold text-[#123d34]">🏷️ {selectedStory.priceEstimate}</span>
                </div>
              </div>

              {/* Quick Facts Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#f7faf7] p-4 rounded-xl border border-[#dbe6dc] text-xs">
                <div>
                  <h6 className="uppercase tracking-wider text-[#66726b] text-[10px]">Best Season</h6>
                  <p className="font-bold text-[#123d34] mt-0.5">{selectedStory.season}</p>
                </div>
                <div>
                  <h6 className="uppercase tracking-wider text-[#66726b] text-[10px]">Ideal For</h6>
                  <p className="font-bold text-[#123d34] mt-0.5">{selectedStory.idealFor}</p>
                </div>
                <div>
                  <h6 className="uppercase tracking-wider text-[#66726b] text-[10px]">Tour Style</h6>
                  <p className="font-bold text-[#123d34] mt-0.5">{selectedStory.style}</p>
                </div>
              </div>

              {/* Prose narrative */}
              <div className="space-y-3.5 text-sm leading-relaxed text-[#3b4540]">
                {selectedStory.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Day-by-Day Accordion / Steps */}
              <div className="border border-[#e6e8e4] rounded-2xl overflow-hidden">
                <div className="bg-[#fbf9f5] px-5 py-3 border-b border-[#e6e8e4] font-bold text-xs text-[#123d34] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d49a3f]" />
                  <span>Curated Day-By-Day Route Plan</span>
                </div>
                <div className="divide-y divide-[#e6e8e4]">
                  {selectedStory.itinerary.map((step, idx) => (
                    <div key={idx} className="p-4 text-xs text-[#3b4540] flex items-start gap-3">
                      <span className="font-bold text-[#123d34] bg-[#edf1ec] px-2 py-0.5 rounded-md flex-shrink-0">
                        {step.day}
                      </span>
                      <span>{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Tip */}
              <div className="bg-[#fbeedb] p-4 rounded-xl border border-[#f5dfb8]">
                <h5 className="font-bold text-xs text-[#7b4f0b] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d49a3f]" />
                  <span>Sai Viva Specialist Tip:</span>
                </h5>
                <p className="text-xs text-[#5a3c10] leading-relaxed">
                  {selectedStory.insiderTip}
                </p>
              </div>

              {/* Modal Action Bar */}
              <div className="pt-4 border-t border-[#e6e8e4] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#66726b] block">Interested in this itinerary?</span>
                  <strong className="text-sm text-[#123d34]">Get a customized quote with Sai Viva</strong>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const title = selectedStory.title;
                      setSelectedStory(null);
                      setEnquiryPackage(title);
                    }}
                    className="flex-1 sm:flex-none bg-[#123d34] hover:bg-[#185246] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    Book / Customize This Tour ↗
                  </button>
                  <button
                    onClick={() => toggleBookmark(selectedStory.id)}
                    className="p-2.5 rounded-full border border-[#e6e8e4] hover:bg-[#fbf9f5] text-[#123d34]"
                    title="Bookmark Trip"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedTripIds.includes(selectedStory.id) ? 'fill-[#d49a3f] text-[#d49a3f]' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. ENQUIRY / FREE QUOTE MODAL */}
      {enquiryPackage !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0a241e]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setEnquiryPackage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEnquiryPackage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-heading font-bold text-2xl text-[#123d34] mb-1">
              Plan Your Journey
            </h3>
            <p className="text-xs text-[#66726b] mb-6">
              Share your details and our senior travel planner will prepare an itinerary and quote within 4 business hours.
            </p>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                  Selected Destination / Package
                </label>
                <input
                  type="text"
                  name="package"
                  defaultValue={enquiryPackage}
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-[#fbf9f5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                    Travel Month / Date
                  </label>
                  <input
                    type="month"
                    name="travelMonth"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34] bg-white"
                  >
                    <option>2 Adults (Couple)</option>
                    <option>Family (2 Adults + 1-2 Kids)</option>
                    <option>Family with Senior Citizens</option>
                    <option>Small Group (4-8 pax)</option>
                    <option>Solo Traveler</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1f2824] mb-1">
                  Special Notes (Hotel Class, Meal preferences, Flights)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. Need 4-star lake view stay, vegetarian food, airport pickup..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#e6e8e4] focus:outline-none focus:border-[#123d34]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#123d34] hover:bg-[#185246] text-white font-semibold text-xs py-3.5 rounded-full transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Free Enquiry ↗</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123d34] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-[#d49a3f]/40 animate-slideUp">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
