/**
 * Site Configuration — Change these values to rebrand the entire site.
 * This config-driven approach makes the template reusable for any service business.
 */
window.SITE_CONFIG = {
  companyName: 'PestNoble',
  shortName: 'PestNoble',
  tagline: 'Premium Pest Control Services in Northeastern Pennsylvania',
  description: 'Professional pest control company serving NEPA. Residential, commercial, termite, rodent, bed bug, mosquito, and wildlife services.',
  phone: '(570) 604-4680',
  phoneRaw: '5706044680',
  email: 'contact@pestnoble.com',
  address: 'Northeastern Pennsylvania',
  hours: 'Mon–Fri: 7AM–6PM | Sat: 8AM–2PM | Sun: Emergency Only',
  license: 'Licensed & Certified',
  yearFounded: '2020',

  social: {
    facebook: '#',
    instagram: '#',
    google: '#',
  },

  navigation: [
    { id: 'home', label: 'Home', url: '/' },
    { id: 'about', label: 'About', url: '/about' },
    { id: 'services', label: 'Services', url: '/services' },
    { id: 'service-areas', label: 'Service Areas', url: '/service-areas' },
    { id: 'blog', label: 'Blog', url: '/blog' },
    { id: 'contact', label: 'Contact', url: '/contact' },
  ],

  services: [
    {
      id: 'general-pest',
      title: 'General Pest Control',
      icon: 'bug',
      description: 'Comprehensive protection against common household pests including ants, spiders, cockroaches, and more. Our targeted treatments eliminate infestations and prevent future invasions.',
      features: ['Ant & Spider Control', 'Cockroach Elimination', 'Flea & Tick Treatment', 'Stink Bug Removal', 'Seasonal Prevention Plans', 'Interior & Exterior Treatment'],
    },
    {
      id: 'termite-control',
      title: 'Termite Control',
      icon: 'termite',
      description: 'Protect your biggest investment from silent destroyers. Our advanced termite detection and treatment systems eliminate colonies and create lasting barriers around your property.',
      features: ['Free Termite Inspections', 'Liquid Barrier Treatment', 'Bait Station Systems', 'Damage Assessment', 'Annual Monitoring Plans', 'Real Estate Inspections'],
    },
    {
      id: 'rodent-control',
      title: 'Rodent Control',
      icon: 'rodent',
      description: 'Mice and rats carry diseases and cause structural damage. Our humane yet effective rodent control methods eliminate infestations and seal entry points to keep them out for good.',
      features: ['Mouse & Rat Removal', 'Entry Point Sealing', 'Attic & Crawl Space Treatment', 'Sanitation & Cleanup', 'Ongoing Monitoring', 'Commercial Solutions'],
    },
    {
      id: 'bed-bug',
      title: 'Bed Bug Treatment',
      icon: 'bedbug',
      description: 'Bed bugs are notoriously difficult to eliminate without professional help. Our multi-step treatment process ensures complete eradication with minimal disruption to your daily life.',
      features: ['Thorough Inspections', 'Heat Treatment Options', 'Chemical Treatment Plans', 'Mattress Encasements', 'Follow-Up Visits', 'Hotel & Multi-Unit Solutions'],
    },
    {
      id: 'mosquito-tick',
      title: 'Mosquito & Tick Control',
      icon: 'mosquito',
      description: 'Reclaim your outdoor spaces from disease-carrying mosquitoes and ticks. Our barrier treatments create a protective zone around your property for weeks of protection.',
      features: ['Yard Barrier Sprays', 'Tick Tube Programs', 'Standing Water Treatment', 'Special Event Spraying', 'Monthly Service Plans', 'Lyme Disease Prevention'],
    },
    {
      id: 'wildlife',
      title: 'Wildlife Removal',
      icon: 'wildlife',
      description: 'Humane removal of nuisance wildlife including raccoons, squirrels, bats, and skunks. We safely relocate animals and repair entry points to prevent future intrusions.',
      features: ['Raccoon & Squirrel Removal', 'Bat Exclusion', 'Skunk & Opossum Control', 'Bird Nesting Prevention', 'Damage Repair', 'Exclusion & Sealing'],
    },
  ],

  serviceAreas: [
    'Scranton', 'Wilkes-Barre', 'Hazleton', 'Stroudsburg',
    'Pocono Mountains', 'Back Mountain', 'Pittston', 'Clarks Summit',
    'Dunmore', 'Old Forge', 'Moosic', 'Dallas',
    'Kingston', 'Nanticoke', 'Mountain Top', 'Dickson City',
    'Archbald', 'Carbondale', 'Honesdale', 'Milford',
    'East Stroudsburg', 'Tobyhanna', 'Mount Pocono', 'Hawley',
    'Lake Ariel', 'Hamlin', 'Moscow', 'Blakely',
    'Taylor', 'Throop', 'Jessup', 'Olyphant',
  ],

  trustBadges: [
    { icon: 'shield', title: 'Licensed & Certified', text: 'Fully licensed pest control professionals with state certifications and ongoing training.' },
    { icon: 'clock', title: 'Same-Day Service', text: 'Urgent pest problem? We offer same-day and next-day service appointments.' },
    { icon: 'star', title: '5-Star Rated', text: 'Consistently rated 5 stars by satisfied customers across Northeastern PA.' },
    { icon: 'dollar', title: 'Free Inspections', text: 'Complimentary pest inspections with transparent, upfront pricing on all treatments.' },
  ],

  testimonials: [
    { name: 'Sarah M.', location: 'Scranton, PA', text: 'PestNoble completely eliminated our ant problem. The technician was professional, explained everything, and the results were immediate. Highly recommend!', rating: 5 },
    { name: 'James T.', location: 'Wilkes-Barre, PA', text: 'We had a serious mouse problem in our attic. PestNoble not only removed them all but sealed every entry point. Haven\'t seen one since!', rating: 5 },
    { name: 'Linda K.', location: 'Stroudsburg, PA', text: 'Their mosquito barrier treatment transformed our backyard. We can finally enjoy our patio again without being eaten alive. Amazing service!', rating: 5 },
  ],

  seo: {
    siteUrl: 'https://www.pestnoble.com',
    ogImage: '/images/logo.png',
  },
};
