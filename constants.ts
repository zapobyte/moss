
import IntroBg from './assets/bg1.jpg';
import MossProd from './assets/moss-prod.jpg';
import MossArt from './assets/moss-art.jpg';
import ProjectHeroWide from './assets/3887-1920x1131.jpg';
import VerticalGarden from './assets/verticaletuin2-1200x337.jpg';
import GalleryP1 from './assets/p1.jpg';
import GalleryP12 from './assets/p12.jpg';
import GalleryP13 from './assets/p13.jpg';
import AboutImage from './assets/about.jpg';

export const ASSETS = {
    // Hero background used on the intro/home section
    INTRO_BG: IntroBg,

    // Product placeholders used in the shop
    PLACEHOLDER_PRODUCT_1: MossProd,
    PLACEHOLDER_PRODUCT_2: MossArt,

    // About page hero image
    ABOUT_IMAGE: AboutImage,
};

export const NAVIGATION = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'shop', label: 'Shop' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];


export const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Tech Hub Antwerp",
    category: "Corporate Office",
    year: "2024",
    location: "Antwerp, BE",
    client: "TechSpace Inc.",
    image: ProjectHeroWide,
    description: "A biophilic intervention in a brutalist concrete structure, bringing softness to the digital workspace.",
    content: [
      "The Tech Hub Antwerp project represented a unique challenge: how to introduce organic warmth into a stark, industrial environment without compromising its architectural integrity. Our approach focused on contrast and relief.",
      "We installed over 40 square meters of flat and bun moss, carefully mapped to follow the acoustic hotspots of the open-plan office. The result is not just visually striking but functionally transformative, reducing ambient noise by approximately 30%.",
      "The central atrium features a 6-meter high vertical garden that serves as the building's lungs, visually connecting the three floors of the co-working space."
    ],
    gallery: [
      GalleryP1,
      GalleryP12,
      GalleryP13,
    ]
  },
  {
    id: 2,
    title: "Maison De Groen",
    category: "Private Residence",
    year: "2023",
    location: "Ghent, BE",
    client: "Private Client",
    image: VerticalGarden,
    description: "A seamless integration of nature within a minimalist residential setting.",
    content: [
      "For this private residence in Ghent, the client desired a connection to nature that didn't require the maintenance of traditional indoor plants. The solution was a series of framed moss art pieces that act as living windows.",
      "Using a blend of reindeer moss and preserved ferns, we created textures that catch the changing light throughout the day. The installation in the master bath provides a spa-like atmosphere, completely resistant to the room's humidity.",
      "Each frame was hand-crafted in our Antwerp studio to match the specific walnut wood tones of the interior joinery."
    ],
    gallery: [
      GalleryP1,
      GalleryP12,
      GalleryP13,
    ]
  },
  {
    id: 3,
    title: "Azure Boutique Hotel",
    category: "Hospitality",
    year: "2023",
    location: "Brussels, BE",
    client: "Azure Hotels Group",
    image: ProjectHeroWide,
    description: "Creating an immersive welcome experience for luxury travelers.",
    content: [
      "The lobby of the Azure Boutique Hotel needed a statement piece. We designed a wraparound moss wall that curves behind the reception desk, immediately grounding guests as they arrive.",
      "Incorporating the hotel's logo in negative space within the moss allowed for subtle branding that feels organic rather than commercial. The deep greens of the moss complement the brass fixtures and marble floors perfectly."
    ],
    gallery: [
      GalleryP1,
      GalleryP12,
      GalleryP13,
    ]
  },
];
