import { MenuCategory, GalleryImage } from '../types';

export const PHONE = '+91 94424 05676';
export const EMAIL = 'info@saicatering.com';
export const ADDRESS = '710 Street No 5, K Pudur, Madurai North, TN-625007, India';
export const MAPS_COORDS = { lat: 9.947258, lng: 78.149749 };
export const WHATSAPP_LINK = 'https://wa.me/919442405676';
export const MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.!2d78.149749!3d9.947258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTYnNTAuMSJOIDc4wrAwOCc1OS4xIkU!5e0!3m2!1sen!2sin!4v1`;

export const HERO_IMAGES = [
  'https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export const SLIDER_IMAGES = [
  { src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Traditional Tamil Feast' },
  { src: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Banana Leaf Samayal' },
  { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Grand Buffet Setup' },
  { src: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Wedding Mandapam Feast' },
  { src: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg?auto=compress&cs=tinysrgb&w=1200', caption: 'Live Counter Experience' },
];

export const STATS = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 250, suffix: '+', label: 'Menu Varieties' },
  { value: 340, suffix: '+', label: 'Expert Staff' },
  { value: 12000, suffix: '+', label: 'Happy Families' },
];

export const WHY_CHOOSE_US = [
  { icon: 'Leaf', title: 'Fresh Ingredients Daily', desc: 'We source the freshest produce from local Madurai markets every morning.' },
  { icon: 'ChefHat', title: 'Expert Tamil Nadu Chefs', desc: 'Our chefs carry 20+ years of traditional Tamil cooking expertise.' },
  { icon: 'Landmark', title: 'Traditional Recipes', desc: 'Authentic recipes passed down through generations, presented with modern flair.' },
  { icon: 'PartyPopper', title: '25+ Years of Celebrations', desc: 'A quarter century of making Tamil Nadu celebrations memorable.' },
  { icon: 'TreePalm', title: 'Banana Leaf Service', desc: 'Experience the authentic banana leaf dining tradition at your event.' },
  { icon: 'Truck', title: 'Pan-Madurai Delivery', desc: 'We serve across Madurai and surrounding districts with punctual delivery.' },
];

export const TIMELINE = [
  { year: '2000', title: 'Founded in Madurai', desc: 'Started as a small family catering service with a passion for Tamil cuisine.' },
  { year: '2005', title: 'Expanded to 100+ Staff', desc: 'Growing demand led to building a team of dedicated culinary professionals.' },
  { year: '2010', title: '250+ Menu Varieties', desc: 'Expanded our offerings to cover every Tamil celebration and modern event.' },
  { year: '2015', title: '5000+ Events Served', desc: 'Reached a milestone of serving over 5000 events across Tamil Nadu.' },
  { year: '2024', title: '12,000+ Happy Families', desc: 'Continuing our legacy of making every family celebration special.' },
];

export const EVENT_TYPES = [
  'Wedding', 'Corporate', 'Birthday', 'House Warming',
  'Seemantham', 'Engagement', 'Retirement', 'Annaprasana', 'Mehndi', 'Other'
] as const;

export const BUDGET_RANGES = ['Below 50k', '50k-1L', '1L-2L', 'Above 2L'] as const;
export const MENU_PREFERENCES = ['Vegetarian', 'Non-Vegetarian', 'Both'] as const;

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'kalyana-tiffin',
    name: 'Kalyana Tiffin (Breakfast)',
    items: [
      { id: 'kt1', name: 'Ghee Pongal & Gothsu', tamilName: 'நெய் பொங்கல் & கதம்ப கொத்சு', image: 'https://images.pexels.com/photos/4331790/pexels-photo-4331790.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
      { id: 'kt2', name: 'Idli & Kumbakonam Kadappa', tamilName: 'இட்லி & கும்பகோணம் கடப்பா', image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
      { id: 'kt3', name: 'Crispy Medu Vadai', tamilName: 'மெது வடை (உளுந்து வடை)', image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
      { id: 'kt4', name: 'Live Ghee Paper Roast Dosa', tamilName: 'நெய் பேப்பர் ரோஸ்ட் தோசை', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
      { id: 'kt5', name: 'Poori Masala', tamilName: 'பூரி கிழங்கு மசாலா', image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
      { id: 'kt6', name: 'Kumbakonam Degree Filter Coffee', tamilName: 'கும்பகோணம் பில்டர் காபி', image: 'https://images.pexels.com/photos/894612/pexels-photo-894612.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-tiffin' },
    ]
  },
  {
    id: 'kalyana-feasts',
    name: 'Kalyana Elai Sappadu (Lunch)',
    items: [
      { id: 'kf1', name: 'Traditional Kalyana Sambar', tamilName: 'கல்யாண கதம்ப சாம்பார்', image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf2', name: 'Jeera Milagu Rasam', tamilName: 'பூண்டு மிளகு ரசம்', image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf3', name: 'Karaikudi Ennai Kathirikai', tamilName: 'எண்ணெய் கத்தரிக்காய் மசாலா', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf4', name: 'Malabar Aviyal', tamilName: 'கல்யாண அவியல்', image: 'https://images.pexels.com/photos/6308006/pexels-photo-6308006.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf5', name: 'Potato Kara Poriyal', tamilName: 'உருளைக்கிழங்கு கார வறுவல்', image: 'https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf6', name: 'Chow Chow Paruppu Kootu', tamilName: 'சௌசௌ பருப்பு கூட்டு', image: 'https://images.pexels.com/photos/6049619/pexels-photo-6049619.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
      { id: 'kf7', name: 'Traditional Mor Kuzhambu', tamilName: 'வெண்டைக்காய் மோர் குழம்பு', image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalyana-feasts' },
    ]
  },
  {
    id: 'biryani-rice',
    name: 'Seeraga Samba Biryani (Lunch)',
    items: [
      { id: 'sb1', name: 'Mutton Seeraga Samba Biryani', tamilName: 'மதுரை சீரக சம்பா ஆட்டுக்கறி பிரியாணி', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'biryani-rice' },
      { id: 'sb2', name: 'Chicken Seeraga Samba Biryani', tamilName: 'கோழி பிரியாணி (சீரக சம்பா)', image: 'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'biryani-rice' },
      { id: 'sb3', name: 'Vegetable Dum Biryani', tamilName: 'காய்கறி தம் பிரியாணி', image: 'https://images.pexels.com/photos/12737651/pexels-photo-12737651.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'biryani-rice' },
      { id: 'sb4', name: 'Madurai Kari Dosa (Live)', tamilName: 'மதுரை கறி தோசை', image: 'https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'biryani-rice' },
      { id: 'sb5', name: 'Chettinad Kozhi Kuzhambu', tamilName: 'செட்டிநாடு நாட்டுக்கோழி குழம்பு', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'biryani-rice' },
    ]
  },
  {
    id: 'kalavai-sadham',
    name: 'Kalavai Sadham (Variety Rice)',
    items: [
      { id: 'sr1', name: 'Kovil Puliyodharai (Tamarind)', tamilName: 'கோயில் புளியோதரை', image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr2', name: 'Elumichai Sadham (Lemon Rice)', tamilName: 'எலுமிச்சை சாதம்', image: 'https://images.pexels.com/photos/6546023/pexels-photo-6546023.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr3', name: 'Thengai Sadham (Coconut Rice)', tamilName: 'தேங்காய் பால் சாதம்', image: 'https://images.pexels.com/photos/1447787/pexels-photo-1447787.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr4', name: 'Karuveppilai Sadham (Curry Leaf)', tamilName: 'கறிவேப்பிலை சாதம்', image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr5', name: 'Ellu Sadham (Sesame Rice)', tamilName: 'எள்ளு சாதம்', image: 'https://images.pexels.com/photos/262897/pexels-photo-262897.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr6', name: 'Bagala Bath (Temple Curd Rice)', tamilName: 'பகலா பாத் (தயிர் சாதம்)', image: 'https://images.pexels.com/photos/6545345/pexels-photo-6545345.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
      { id: 'sr7', name: 'Jaggery Sakkarai Pongal', tamilName: 'நெய் சர்க்கரை பொங்கல்', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'kalavai-sadham' },
    ]
  },
  {
    id: 'traditional-sweets',
    name: 'Sweets, Payasam & Desserts',
    items: [
      { id: 'ts1', name: 'Madurai Special Elaneer Payasam', tamilName: 'மதுரை இளநீர் பாயசம்', image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
      { id: 'ts2', name: 'Jaggery Paruppu Payasam', tamilName: 'வெல்ல பருப்பு பாயசம்', image: 'https://images.pexels.com/photos/6049615/pexels-photo-6049615.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
      { id: 'ts3', name: 'Tirunelveli Ghee Halwa', tamilName: 'திருநெல்வேலி நெய் அல்வா', image: 'https://images.pexels.com/photos/6049609/pexels-photo-6049609.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
      { id: 'ts4', name: 'Pure Ghee Mysore Pak', tamilName: 'நெய் மைசூர் பாக்', image: 'https://images.pexels.com/photos/6049609/pexels-photo-6049609.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
      { id: 'ts5', name: 'Saffron Rava Kesari', tamilName: 'குங்குமப்பூ ரவ கேசரி', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
      { id: 'ts6', name: 'Asoka Halwa', tamilName: 'தஞ்சாவூர் அசோகா அல்வா', image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'traditional-sweets' },
    ]
  },
  {
    id: 'live-stalls',
    name: 'Live Stalls & evening Chaats',
    items: [
      { id: 'ls1', name: 'Live Sweet & Spicy Paniyaram', tamilName: 'கார/இனிப்பு குழிப்பணியாரம்', image: 'https://images.pexels.com/photos/4331790/pexels-photo-4331790.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'live-stalls' },
      { id: 'ls2', name: 'Vazhaipoo & Milagai Bajji Stall', tamilName: 'வாழைப்பூ / மிளகாய் பஜ்ஜி', image: 'https://images.pexels.com/photos/14417755/pexels-photo-14417755.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'live-stalls' },
      { id: 'ls3', name: 'Madurai Special Jigarthanda', tamilName: 'மதுரை ஸ்பெஷல் ஜிகர்தண்டா', image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'live-stalls' },
      { id: 'ls4', name: 'Live Pani Puri Counter', tamilName: 'பானி பூரி / சாட் கவுண்டர்', image: 'https://images.pexels.com/photos/12419143/pexels-photo-12419143.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'live-stalls' },
      { id: 'ls5', name: 'Natural Fruit Mocktail Corner', tamilName: 'இயற்கை பழச்சாறு கவுண்டர்', image: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'live-stalls' },
    ]
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Tamil Wedding Setup', category: 'wedding' },
  { id: 'g2', src: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Banana Leaf Feast', category: 'food' },
  { id: 'g3', src: 'https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Chef Preparing', category: 'food' },
  { id: 'g4', src: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Grand Buffet', category: 'corporate' },
  { id: 'g5', src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Food Spread', category: 'food' },
  { id: 'g6', src: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Event Decoration', category: 'decorations' },
  { id: 'g7', src: 'https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Live Counter', category: 'wedding' },
  { id: 'g8', src: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Chef Team', category: 'corporate' },
  { id: 'g9', src: 'https://images.pexels.com/photos/4331790/pexels-photo-4331790.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Traditional Snacks', category: 'food' },
  { id: 'g10', src: 'https://images.pexels.com/photos/4331790/pexels-photo-4331790.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'South Indian Breakfast', category: 'food' },
  { id: 'g11', src: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Biryani Special', category: 'food' },
  { id: 'g12', src: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Dosa Counter', category: 'food' },
  { id: 'g13', src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Birthday Celebration', category: 'birthday' },
  { id: 'g14', src: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Floral Decoration', category: 'decorations' },
  { id: 'g15', src: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Wedding Stage', category: 'decorations' },
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];
