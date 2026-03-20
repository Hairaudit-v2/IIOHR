export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/training-pathways", label: "Training Pathways" },
  { href: "/practical-fue", label: "Practical FUE" },
  { href: "/hair-loss-science", label: "Hair Loss Science" },
  { href: "https://follicleintelligence.ai", label: "Follicle Intelligence", external: true },
  { href: "/for-clinics", label: "For Clinics" },
];

export const utilityNavigation: NavigationItem[] = [
  { href: "/apply", label: "Apply for Training" },
];

export const footerNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academy", label: "Academy" },
  { href: "/certification-framework", label: "Certification Framework" },
  { href: "/training-pathways", label: "Training Pathways" },
  { href: "/practical-fue", label: "Practical FUE" },
  { href: "/hair-loss-science", label: "Hair Loss Science" },
  { href: "/for-clinics", label: "For Clinics" },
  { href: "/apply", label: "Apply for Training" },
];

export const ecosystemNavigation: NavigationItem[] = [
  { href: "https://iiohr.com", label: "IIOHR - Training", external: true },
  { href: "https://hairaudit.com", label: "HairAudit - Measurement", external: true },
  {
    href: "https://follicleintelligence.ai",
    label: "Follicle Intelligence - Analysis",
    external: true,
  },
  {
    href: "https://hairlongevityinstitute.com",
    label: "Hair Longevity Institute - Biology",
    external: true,
  },
];

export const standardsSupportItems: string[] = [
  "Institute-led clinical standards",
  "Mentored practical training pathways",
  "Outcome review and quality governance",
  "Admissions and pathway support",
];

export const legalNavigation: NavigationItem[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookies" },
];
