export const ALUMNI_MENU = [
  { name: "Home", path: '/alumni' },
  { name: "About", path: '/alumni/about' },
  { name: "Gallery", path: '/alumni/gallery' },
  {
    name: "Events",
    subMenus: [
      { name: "Alumni Events", path: "/alumni/events" },
      { name: "Achievements", path: "/alumni/achievements" },
      { name: "Memoriam", path: "/alumni/memoriam" },
    ]
  },
  { name: "Jobs", path: '/alumni/jobs' },
  { name: "Donations", path: '/alumni/donations' },
  {
    name: "Services",
    subMenus: [
      { name: "FAQs Services", path: "/alumni/faqs" },
      { name: "Contact Us", path: "/alumni/contact" }
    ]
  },
]

export const ADMIN_MENU = [
  { icon: "dashboard", name: "Dashboard", path: "/app", display: 0 },
  { icon: "team", name: "Alumni", path: "/app/alumni", display: 0 },
  { icon: "picture", name: "Gallery", path: "/app/gallery", display: 0 },
  {
    icon: "calendar",
    name: "Events",
    subMenus: [
      { name: "Alumni Events", path: "/app/events"  },
      { name: "Achievements", path: "/app/achievements"  },
      { name: "Memoriam", path: "/app/memoriam"  }
    ],
    display: 1
  },
  {
    icon: "inbox",
    name: "Jobs",
    subMenus: [
      { name: "Job Openings", path: "/app/jobs"  },
      { name: "Requests", path: "/app/job-requests"  }
    ],
    display: 1
  },
  { icon: "dollar", name: "Donations", path: '/app/donations', display: 2 },
  {
    icon: "customer-service",
    name: "Services",
    subMenus: [
      { name: "FAQs Services", path: "/app/faqs" },
      { name: "Concerns", path: "/app/concerns" }
    ],
    display: 3
  },
  { icon: "solution", name: "Surveys", path: '/app/survey-list', display: 4 },
  // {
  //   icon: "solution",
  //   name: "Survey",
  //   subMenus: [
  //     { name: "Survey List", path: "/app/survey-list"  },
  //     // { name: "Survey Report", path: "/app/survey-report"  },
  //     // { name: "Alumni Report", path: "/app/alumni-report"  }
  //   ],
  //   display: 4
  // },
];
