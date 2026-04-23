export interface Education {
  institution: string;
  degrees: string[];
  concentration: string;
  start: string;
  end: string;
  location: string;
}

export const education: Education = {
  institution: "Wilfrid Laurier University",
  degrees: [
    "Honors Bachelor of Science in Computer Science (BSc)",
    "Honors Bachelor of Business Administration (BBA)",
  ],
  concentration: "Computer Science, Business Administration",
  start: "Sept 2022",
  end: "April 2027",
  location: "Waterloo, ON",
};

export interface Certification {
  issuer: string;
  title: string;
  type: "specialization" | "professional";
}

export const certifications: Certification[] = [
  {
    issuer: "Google",
    title: "Digital Marketing and E-Commerce Professional",
    type: "specialization",
  },
  {
    issuer: "Meta",
    title: "Back-End Developer",
    type: "professional",
  },
];
