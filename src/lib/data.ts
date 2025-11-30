import type { BlogPost, Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Explorer Kayak',
    description: 'A stable and versatile kayak for all your water adventures. Perfect for lakes, rivers, and coastal waters. Made from durable polyethylene, it features a comfortable seating system, ample storage space, and adjustable foot braces. Its sleek design ensures excellent tracking and speed.',
    price: 699.99,
    category: 'Kayaking',
    image: 'product-kayak',
  },
  {
    id: '2',
    name: 'Wilderness Tent',
    description: 'A lightweight and durable 2-person tent, ideal for backpacking and camping. Features a full-coverage rainfly, two large doors for easy entry and exit, and interior pockets for organization. Easy to set up and take down, providing reliable shelter in various weather conditions.',
    price: 249.99,
    category: 'Camping',
    image: 'product-tent',
  },
  {
    id: '3',
    name: 'Summit Hiking Boots',
    description: 'Conquer any trail with these waterproof and breathable hiking boots. The rugged outsole provides excellent traction, while the cushioned midsole offers all-day comfort. Gore-Tex lining keeps your feet dry, and the supportive design protects your ankles on uneven terrain.',
    price: 179.99,
    category: 'Hiking',
    image: 'product-hiking-boots',
  },
  {
    id: '4',
    name: 'Trekker 65L Backpack',
    description: 'A spacious and comfortable backpack for multi-day treks. Features an adjustable harness system, multiple compartments for organization, and an integrated rain cover. The durable fabric and robust construction can withstand the rigors of the trail. Hydration compatible.',
    price: 219.99,
    category: 'Hiking',
    image: 'product-backpack',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'mastering-the-climb',
    title: 'Mastering the Climb: A Beginner\'s Guide to Rock Climbing',
    author: 'Alex Johnson',
    date: '2024-07-15T10:00:00Z',
    excerpt: 'Rock climbing is an exhilarating sport that combines physical strength with mental problem-solving. This guide covers the basics to get you started on your vertical journey.',
    content: `
      <h2>Rock climbing is an exhilarating sport that combines physical strength with mental problem-solving.</h2>
      <p>Whether you're scaling an indoor wall or a natural rock face, the principles of balance, technique, and safety are paramount. This guide covers the basics to get you started on your vertical journey.</p>
      <h3>Essential Gear</h3>
      <p>Before you start, you'll need some basic equipment. This includes climbing shoes for grip, a harness to secure you to the rope, a belay device for controlling the rope, and a chalk bag to keep your hands dry. Renting gear is a great option for your first few climbs.</p>
      <h3>Basic Techniques</h3>
      <p>Focus on using your legs to push yourself up, rather than pulling with your arms. Keep your arms straight whenever possible to conserve energy. Look for footholds and plan your route a few moves ahead. Trusting your feet is one of the biggest hurdles for beginners.</p>
      <h3>Safety First</h3>
      <p>Always climb with a partner and double-check each other's knots and harness. Learn the proper belay technique and communication calls. Never climb above your ability level without proper supervision or instruction.</p>
    `,
    category: 'Climbing',
    image: 'blog-climbing',
  },
  {
    slug: 'top-5-mountain-bike-trails',
    title: 'The Top 5 Mountain Bike Trails for Thrill-Seekers',
    author: 'Maria Garcia',
    date: '2024-07-10T14:30:00Z',
    excerpt: 'Looking for your next adrenaline rush on two wheels? We\'ve compiled a list of the most breathtaking and challenging mountain bike trails around the world.',
    content: `
      <p>Looking for your next adrenaline rush on two wheels? We've compiled a list of the most breathtaking and challenging mountain bike trails that should be on every enthusiast's bucket list.</p>
      <h3>1. The Whole Enchilada, Utah, USA</h3>
      <p>This trail offers a massive descent with incredibly varied terrain, from high alpine forests to slickrock desert. It's a true test of endurance and technical skill.</p>
      <h3>2. A-Line, Whistler, Canada</h3>
      <p>Famous in the mountain biking world, A-Line is the quintessential downhill flow trail, packed with massive tabletops and perfectly sculpted berms. It's pure, high-speed fun.</p>
      <h3>3. Mefjellet, Norway</h3>
      <p>For those who love epic scenery with their rides, this trail in Norway delivers. Expect stunning fjord views and a long, technical descent that will keep you on your toes.</p>
      <h3>4. Fort William, Scotland</h3>
      <p>Home to a UCI World Cup downhill track, Fort William is not for the faint of heart. It's rocky, rooty, and relentlessly steep.</p>
      <h3>5. Yungas Road, Bolivia</h3>
      <p>Known as "Death Road," this is more of an adventure than a technical ride. The narrow, cliff-hugging road offers unparalleled views and a serious dose of adrenaline.</p>
    `,
    category: 'Cycling',
    image: 'blog-cycling',
  },
  {
    slug: 'the-art-of-ultralight-hiking',
    title: 'The Art of Ultralight Hiking: Pack Less, Experience More',
    author: 'Sam Roberts',
    date: '2024-06-28T09:00:00Z',
    excerpt: 'Ultralight hiking is a philosophy that can transform your outdoor experiences. By carefully selecting your gear, you can reduce your pack weight and enjoy the trail more freely.',
    content: `
      <p>Ultralight hiking is a philosophy that can transform your outdoor experiences. The goal is to carry the lightest possible load without compromising safety or comfort. By carefully selecting your gear, you can reduce your pack weight and enjoy the trail more freely, moving faster and with less strain on your body.</p>
      <h3>The Big Three</h3>
      <p>The heaviest items in most packs are the shelter, sleeping system (bag and pad), and backpack itself. Focusing on lightweight options for these "Big Three" provides the most significant weight savings. Look for tents made with Dyneema Composite Fabric, quilt-style sleeping bags, and minimalist, frameless backpacks.</p>
      <h3>Multi-Purpose Gear</h3>
      <p>Every item should be scrutinized. Can one item serve multiple purposes? For example, your trekking poles can also be used as your tent poles. A bandana can be a pot holder, a towel, and a water filter pre-filter.</p>
      <h3>Embrace Minimalism</h3>
      <p>Do you really need that camp chair, extra set of clothes, or a large knife? Challenge every item you pack. The less you carry, the more you can connect with your surroundings. It's about shifting your mindset from "what if I need this?" to "can I manage without this?". This approach not only lightens your load but also simplifies your entire hiking experience.</p>
    `,
    category: 'Hiking',
    image: 'blog-trail',
  },
];
