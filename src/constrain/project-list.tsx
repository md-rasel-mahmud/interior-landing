export interface Project {
  slug: string;
  title: string;
  location: string;
  type: "Residential" | "Commercial" | "Hospitality" | "Mixed-Use" | "Cultural";
  images: string[];
  description: string;
  features: string[];
}

export const projects: Project[] = [
  {
    slug: "luxury-penthouse",
    title: "Luxury Penthouse",
    location: "Manhattan, NY",
    type: "Residential",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&h=600&fit=crop",
    ],
    description:
      "Modern luxury living with panoramic city views and bespoke furnishings. This penthouse features floor-to-ceiling windows, private terrace, and curated interiors blending contemporary and classic styles.",
    features: [
      "Panoramic city views",
      "Private rooftop terrace",
      "Smart home automation",
      "Custom Italian kitchen",
    ],
  },
  {
    slug: "corporate-headquarters",
    title: "Corporate Headquarters",
    location: "San Francisco, CA",
    type: "Commercial",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
    ],
    description:
      "Innovative workspace design promoting collaboration and creativity. The design integrates open-plan offices, breakout zones, and eco-friendly materials for sustainability.",
    features: [
      "Open-plan workspace",
      "Breakout collaboration areas",
      "Energy-efficient lighting",
      "Modern conference rooms",
    ],
  },
  {
    slug: "seaside-villa",
    title: "Seaside Villa",
    location: "Malibu, CA",
    type: "Residential",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=600&fit=crop",
    ],
    description:
      "Beachfront villa offering serene ocean views, infinity pool, and outdoor living spaces designed for relaxation and luxury.",
    features: [
      "Infinity pool",
      "Direct beach access",
      "Outdoor lounge",
      "Open-concept interiors",
    ],
  },
  {
    slug: "modern-art-museum",
    title: "Modern Art Museum",
    location: "Chicago, IL",
    type: "Cultural",
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    ],
    description:
      "A cultural landmark showcasing contemporary art in a minimal yet striking architectural space with natural lighting.",
    features: [
      "Expansive gallery halls",
      "Glass façade",
      "Interactive installations",
      "Energy-efficient design",
    ],
  },
  {
    slug: "urban-mall",
    title: "Urban Lifestyle Mall",
    location: "Los Angeles, CA",
    type: "Commercial",
    images: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=600&fit=crop",
    ],
    description:
      "A vibrant mall integrating retail, dining, and entertainment with modern architecture and open spaces.",
    features: [
      "Open atrium design",
      "Premium retail outlets",
      "Food courts",
      "Multiplex cinema",
    ],
  },
  {
    slug: "eco-resort",
    title: "Eco-Resort Retreat",
    location: "Bali, Indonesia",
    type: "Hospitality",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=600&fit=crop",
    ],
    description:
      "An eco-friendly resort blending sustainability with luxury, featuring bamboo villas and organic dining.",
    features: [
      "Sustainable architecture",
      "Organic dining",
      "Spa & wellness center",
      "Ocean-view villas",
    ],
  },
  {
    slug: "tech-campus",
    title: "Tech Innovation Campus",
    location: "Austin, TX",
    type: "Commercial",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=1200&h=600&fit=crop",
    ],
    description:
      "Cutting-edge tech campus designed for startups and enterprises, integrating coworking and green spaces.",
    features: [
      "Flexible coworking spaces",
      "Green rooftop gardens",
      "Auditoriums",
      "Energy-smart infrastructure",
    ],
  },
  {
    slug: "mountain-chalet",
    title: "Mountain Chalet",
    location: "Aspen, CO",
    type: "Residential",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop",
    ],
    description:
      "Cozy yet luxurious chalet nestled in the mountains, featuring wood interiors and panoramic views.",
    features: [
      "Fireplace lounge",
      "Ski-in ski-out access",
      "Panoramic mountain views",
      "Heated flooring",
    ],
  },
  {
    slug: "urban-apartments",
    title: "Urban Apartments",
    location: "Brooklyn, NY",
    type: "Residential",
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=1200&h=600&fit=crop",
    ],
    description:
      "Modern apartments designed for urban living with smart layouts and community-focused amenities.",
    features: [
      "Smart home integration",
      "Community lounge",
      "Rooftop garden",
      "Fitness center",
    ],
  },
  {
    slug: "coastal-hotel",
    title: "Coastal Luxury Hotel",
    location: "Miami, FL",
    type: "Hospitality",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop",
    ],
    description:
      "Luxury beachfront hotel offering suites with ocean views, infinity pool, and premium services.",
    features: [
      "Infinity pool",
      "Private beach access",
      "Luxury spa",
      "Fine dining",
    ],
  },
  {
    slug: "mixed-use-tower",
    title: "Mixed-Use Tower",
    location: "Dubai, UAE",
    type: "Mixed-Use",
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200&h=600&fit=crop",
    ],
    description:
      "Iconic skyscraper combining residential, commercial, and leisure spaces with modern luxury.",
    features: [
      "Luxury apartments",
      "Corporate offices",
      "Sky lounge",
      "Shopping mall",
    ],
  },
  {
    slug: "desert-retreat",
    title: "Desert Retreat",
    location: "Dubai Desert, UAE",
    type: "Hospitality",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572120360610-d971b9b78825?w=1200&h=600&fit=crop",
    ],
    description:
      "A serene desert escape blending traditional design with modern comfort, offering a unique experience.",
    features: [
      "Desert safari access",
      "Traditional architecture",
      "Private pools",
      "Luxury tents",
    ],
  },
];
