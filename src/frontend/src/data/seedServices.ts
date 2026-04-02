import type { Service } from "../backend";

export const seedServices: Service[] = [
  {
    id: "personal-care",
    title: "Personal Care",
    order: 1n,
    iconName: "Heart",
    shortDescription:
      "Dignified, compassionate personal care support tailored to your unique needs and preferences.",
    description:
      "Our Personal Care service provides comprehensive, dignified support for daily living activities including bathing, dressing, grooming, continence care, and medication management. Our trained support workers build genuine relationships with clients, ensuring every interaction respects your privacy, dignity, and personal preferences. We work with you and your family to create a care plan that maximises your independence while providing the support you need to live well.",
  },
  {
    id: "community-participation",
    title: "Community Participation",
    order: 2n,
    iconName: "Users",
    shortDescription:
      "Connecting you with your community through meaningful activities, social events, and inclusive programs.",
    description:
      "Community Participation support helps you engage fully with your local community, pursue hobbies, attend events, and build meaningful social connections. Our support workers accompany you to recreational activities, volunteer opportunities, educational programs, and social gatherings. We believe everyone deserves an active, connected social life, and we work hard to remove barriers so you can do the things you love.",
  },
  {
    id: "supported-independent-living",
    title: "Supported Independent Living",
    order: 3n,
    iconName: "Home",
    shortDescription:
      "Live independently in your own home with the right level of support — your home, your rules.",
    description:
      "Supported Independent Living (SIL) provides the support you need to live as independently as possible in your own home or a shared living arrangement. We offer 24/7 support, assistance with household tasks, meal preparation, and skill-building to increase your independence over time. Our experienced team works with you to develop the daily living skills you want to build, so you can thrive in your own space on your own terms.",
  },
  {
    id: "therapy-allied-health",
    title: "Therapy & Allied Health",
    order: 4n,
    iconName: "Activity",
    shortDescription:
      "Evidence-based therapy from qualified allied health professionals to help you reach your goals.",
    description:
      "Our Therapy & Allied Health services connect you with qualified occupational therapists, physiotherapists, speech pathologists, and behaviour support practitioners. Each therapy plan is individually designed to help you achieve your NDIS goals, build functional capacity, and improve quality of life. We use evidence-based approaches delivered with warmth and respect, working collaboratively with you, your family, and your support network.",
  },
];

export const serviceImages: Record<string, string> = {
  "personal-care": "/assets/generated/service-personal-care.dim_800x600.jpg",
  "community-participation":
    "/assets/generated/service-community.dim_800x600.jpg",
  "supported-independent-living":
    "/assets/generated/service-independent-living.dim_800x600.jpg",
  "therapy-allied-health": "/assets/generated/service-therapy.dim_800x600.jpg",
  // legacy ids
  community: "/assets/generated/service-community.dim_800x600.jpg",
  sil: "/assets/generated/service-independent-living.dim_800x600.jpg",
  therapy: "/assets/generated/service-therapy.dim_800x600.jpg",
};

export const serviceVideos: Record<string, string> = {
  "personal-care": "https://www.youtube.com/embed/Xvjnoagk6GU",
  "community-participation": "https://www.youtube.com/embed/Xvjnoagk6GU",
  "supported-independent-living": "https://www.youtube.com/embed/Xvjnoagk6GU",
  "therapy-allied-health": "https://www.youtube.com/embed/Xvjnoagk6GU",
};
