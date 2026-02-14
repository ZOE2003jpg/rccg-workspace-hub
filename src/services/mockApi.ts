// Mock service layer — swap with real API calls when backend is ready

export interface Issue {
  id: string;
  category: string;
  title: string;
  message: string;
  accessCode: string;
  createdAt: string;
  status: "pending" | "responded";
}

export interface IssueResponse {
  from: "user" | "pastor";
  message: string;
  timestamp: string;
}

export function generateAccessCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function submitIssue(data: {
  category: string;
  title: string;
  message: string;
}): Promise<{ success: boolean; accessCode: string }> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1500));
  const accessCode = generateAccessCode();
  return { success: true, accessCode };
}

export async function checkResponse(
  accessCode: string
): Promise<{ found: boolean; conversation?: IssueResponse[] }> {
  await new Promise((r) => setTimeout(r, 1000));

  if (accessCode.toUpperCase() === "TEST123") {
    return {
      found: true,
      conversation: [
        {
          from: "user",
          message:
            "I've been struggling with attending midweek services because of my work schedule. Is there any way to get the Bible study materials so I can follow along at home?",
          timestamp: "Feb 10, 2026 • 3:45 PM",
        },
        {
          from: "pastor",
          message:
            "Thank you for reaching out, and we completely understand. We'll be sharing Bible study notes via the church app soon. In the meantime, I'll have the materials sent to your email after each session. God bless you for your commitment to growth!",
          timestamp: "Feb 11, 2026 • 10:20 AM",
        },
      ],
    };
  }

  return { found: false };
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  description: string;
  youtubeId?: string;
  series?: string;
}

export const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Purpose",
    speaker: "Pastor Johnson",
    date: "Feb 9, 2026",
    duration: "45 min",
    description: "Discover God's unique plan for your life and how to walk boldly in the calling He has placed upon you.",
    youtubeId: "dQw4w9WgXcQ",
    series: "Kingdom Living",
  },
  {
    id: "2",
    title: "The Power of Faith",
    speaker: "Pastor Johnson",
    date: "Feb 2, 2026",
    duration: "38 min",
    description: "An exploration of faith as the substance of things hoped for and how it moves mountains in our daily lives.",
    youtubeId: "dQw4w9WgXcQ",
    series: "Kingdom Living",
  },
  {
    id: "3",
    title: "Overcoming Through Grace",
    speaker: "Pastor Mary",
    date: "Jan 26, 2026",
    duration: "42 min",
    description: "Grace isn't just unmerited favor — it's the empowerment to live beyond your limitations.",
    youtubeId: "dQw4w9WgXcQ",
    series: "Grace Unlimited",
  },
  {
    id: "4",
    title: "Prayer: The Master Key",
    speaker: "Pastor Johnson",
    date: "Jan 19, 2026",
    duration: "50 min",
    description: "Why prayer is not optional but the very foundation of every breakthrough you'll ever experience.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Building Strong Families",
    speaker: "Deaconess Ade",
    date: "Jan 12, 2026",
    duration: "35 min",
    description: "Practical wisdom for strengthening the bonds within your family and raising godly children.",
    youtubeId: "dQw4w9WgXcQ",
    series: "Family Matters",
  },
  {
    id: "6",
    title: "The Heart of Worship",
    speaker: "Minister David",
    date: "Jan 5, 2026",
    duration: "40 min",
    description: "Worship is more than music — it's a lifestyle of surrender and adoration to the Most High.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: "pdf" | "book" | "guide" | "devotional";
  description: string;
  coverColor: string;
  pdfUrl?: string;
}

export const mockResources: LibraryResource[] = [
  {
    id: "1",
    title: "New Believers' Guide",
    author: "RCCG Master's Place",
    type: "guide",
    description: "A comprehensive guide for new believers to understand the foundations of faith, prayer, and church life.",
    coverColor: "hsl(217 91% 50%)",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "2",
    title: "30 Days of Prayer",
    author: "Pastor Johnson",
    type: "devotional",
    description: "A powerful 30-day prayer devotional to deepen your relationship with God and ignite your prayer life.",
    coverColor: "hsl(38 92% 50%)",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "3",
    title: "Understanding the Holy Spirit",
    author: "Pastor Johnson",
    type: "book",
    description: "An in-depth study on the person, power, and work of the Holy Spirit in the life of believers.",
    coverColor: "hsl(150 60% 40%)",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "4",
    title: "Marriage & Family Handbook",
    author: "Deaconess Ade",
    type: "guide",
    description: "Biblical principles and practical advice for building and maintaining a God-centered family.",
    coverColor: "hsl(340 70% 50%)",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "5",
    title: "Youth Leadership Manual",
    author: "Minister David",
    type: "guide",
    description: "Equipping young leaders with tools, strategies, and biblical wisdom for effective ministry.",
    coverColor: "hsl(270 60% 50%)",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];
