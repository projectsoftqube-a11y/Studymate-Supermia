/**
 * Legal document content.
 *
 * Kept as data rather than JSX for three reasons: the two documents then render
 * through one component and cannot drift apart visually, the table of contents
 * is derived from the same source that renders the body (so it can never list a
 * section that isn't there), and the copy stays editable by someone who does not
 * read React.
 *
 * The wording is verbatim from the approved documents. Anything that changes the
 * meaning of a clause belongs to whoever signs off the legal text, not to a
 * layout pass — so this file is copy only, and every styling decision lives in
 * `LegalPage.tsx`.
 *
 * Inline markup is a deliberately tiny subset, rendered by `renderInline` in
 * LegalPage rather than by a markdown parser:
 *   **bold**   lead-in labels on list items, emphasis in prose
 *   `code`     literal identifiers (bucket names, table names)
 * No links, no images, no HTML. A three-token grammar cannot produce a broken
 * document, and pulling in a parser to render two static pages would ship a
 * sanitiser's worth of risk for no gain.
 */

export type LegalBlock =
  /** Body paragraph. */
  | { kind: "p"; text: string }
  /** Sub-heading inside a numbered section (renders as an <h3>). */
  | { kind: "h3"; text: string }
  /** Bulleted list. Items commonly open with a `**Label:**` lead-in. */
  | { kind: "list"; items: string[] }
  /** Named contact, rendered as a card with a live mailto. */
  | { kind: "contact"; name: string; email: string };

export interface LegalSection {
  /** Anchor target. Also the `#hash` the table of contents links to. */
  id: string;
  /** Displayed number, e.g. "01". Presentational — ordering comes from the array. */
  number: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  /** Route path this document is served at, used for canonical URLs. */
  path: string;
  /** <h1> and the label used when the other document links here. */
  title: string;
  /** Small caps line above the <h1>. */
  eyebrow: string;
  /** Human-readable revision date, shown in the header and in `<time>`. */
  updated: string;
  /** Machine-readable form of `updated`, for the `datetime` attribute. */
  updatedISO: string;
  /** Opening paragraph, set larger than body copy and outside the numbered sections. */
  intro: string;
  /** `<meta name="description">` for the route. */
  description: string;
  sections: LegalSection[];
}

export const PRIVACY_DOC: LegalDoc = {
  path: "/privacy",
  title: "Privacy Policy",
  eyebrow: "Legal",
  updated: "August 10, 2026",
  updatedISO: "2026-08-10",
  description:
    "How StudyMate collects, uses, discloses and safeguards your information — the personal, educational and usage data we hold, who we share it with, and how to contact us about it.",
  intro:
    "Welcome to StudyMate. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.",
  sections: [
    {
      id: "information-we-collect",
      number: "01",
      title: "Information We Collect",
      blocks: [
        {
          kind: "p",
          text: "We may collect information about you in a variety of ways. The information we may collect via the Application includes:",
        },
        { kind: "h3", text: "Personal Data" },
        {
          kind: "p",
          text: "Personally identifiable information that you voluntarily give to us when you register with the Application or when you choose to participate in various activities related to the Application. This includes:",
        },
        {
          kind: "list",
          items: [
            "**Contact Information:** First name, last name, email address, mobile number, and company name (if applicable).",
            "**Demographic & Location Data:** Address, city, state, country, and zip code.",
            "**Educational Profile:** Curriculum details including your selected Country, Board, and Standard (Grade level).",
          ],
        },
        { kind: "h3", text: "Usage and Academic Data" },
        {
          kind: "p",
          text: "When you use StudyMate, we automatically collect data related to your academic progress and interaction with the platform:",
        },
        {
          kind: "list",
          items: [
            "**Performance Data:** Test scores, assignment completions, and recent practice activities.",
            "**Content Data:** Generated question banks, chat histories with our AI tutors, and custom assignments.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      number: "02",
      title: "How We Use Your Information",
      blocks: [
        {
          kind: "p",
          text: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:",
        },
        {
          kind: "list",
          items: [
            "Create and manage your account.",
            "Deliver targeted, AI-driven educational content, quizzes, and assignments tailored to your specific Board and Standard.",
            "Sync your account profile across the central SuperMia network.",
            "Email you regarding your account or order (e.g., OTP verification, password resets).",
            "Monitor and analyze usage and trends to improve your experience with the Application.",
            "Generate personalized performance analytics and score trends.",
          ],
        },
      ],
    },
    {
      id: "disclosure-of-your-information",
      number: "03",
      title: "Disclosure of Your Information",
      blocks: [
        {
          kind: "p",
          text: "We may share information we have collected about you in certain situations. Your information may be disclosed as follows:",
        },
        { kind: "h3", text: "Third-Party Service Providers" },
        {
          kind: "p",
          text: "We may share your information with third parties that perform services for us or on our behalf, including:",
        },
        {
          kind: "list",
          items: [
            "**AI & Language Models:** We utilize third-party AI providers (such as OpenAI and Anthropic) to power our chat sessions and generate educational content.",
            "**Cloud Storage:** User data and media may be stored on secure third-party cloud infrastructure (e.g., AWS S3).",
            "**SuperMia Network:** StudyMate is part of the broader MIA ecosystem. Your profile information (name, contact details) is securely synchronized with the central MIA database (`mst_customer`) to allow seamless authentication across platforms.",
          ],
        },
        { kind: "h3", text: "By Law or to Protect Rights" },
        {
          kind: "p",
          text: "If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.",
        },
      ],
    },
    {
      id: "security-of-your-information",
      number: "04",
      title: "Security of Your Information",
      blocks: [
        {
          kind: "p",
          text: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
        },
      ],
    },
    {
      id: "contact-us",
      number: "05",
      title: "Contact Us",
      blocks: [
        {
          kind: "p",
          text: "If you have questions or comments about this Privacy Policy, please contact us at:",
        },
        { kind: "contact", name: "StudyMate Support", email: "hello@supermia.ai" },
      ],
    },
  ],
};

export const TERMS_DOC: LegalDoc = {
  path: "/terms",
  title: "Terms & Conditions",
  eyebrow: "Legal",
  updated: "August 10, 2026",
  updatedISO: "2026-08-10",
  description:
    "The Terms of Security and Service governing StudyMate — account and authentication security, acceptable use, AI-generated content, and the conditions under which accounts may be suspended.",
  intro:
    "Welcome to StudyMate. By accessing or using our application, APIs, and associated services, you agree to be bound by these Terms of Security and Service. If you do not agree, please do not use the application.",
  sections: [
    {
      id: "authentication-and-account-security",
      number: "01",
      title: "Authentication and Account Security",
      blocks: [
        {
          kind: "p",
          text: "StudyMate employs a dual-database authentication system linked to the SuperMia network. You are responsible for maintaining the security of your account.",
        },
        {
          kind: "list",
          items: [
            "**OTP and Passwords:** You are responsible for keeping your One-Time Passwords (OTPs) and account passwords strictly confidential. StudyMate will never ask for your password or OTP via unsecured channels.",
            "**Session Management:** Your session is managed via secure JSON Web Tokens (JWT). You must not share your active tokens or API keys with unauthorized parties.",
            "**Unauthorized Access:** You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to comply with this security obligation.",
          ],
        },
      ],
    },
    {
      id: "data-and-cloud-security",
      number: "02",
      title: "Data and Cloud Security",
      blocks: [
        {
          kind: "list",
          items: [
            "**Infrastructure:** StudyMate utilizes robust cloud infrastructure (including AWS) to store user data and media (e.g., the `miachatbot` bucket).",
            "**Data Transmission:** All sensitive data transmitted between your client and our backend APIs must be sent over secure, encrypted channels (HTTPS).",
            "**Cross-Platform Sync:** By using StudyMate, you acknowledge that your basic profile information (such as name and contact details) is securely synchronized with the central MIA database (`mst_customer`) for network-wide authentication.",
          ],
        },
      ],
    },
    {
      id: "acceptable-use-and-restrictions",
      number: "03",
      title: "Acceptable Use and Restrictions",
      blocks: [
        {
          kind: "p",
          text: "You agree not to engage in any of the following prohibited activities:",
        },
        {
          kind: "list",
          items: [
            "**Bypassing Security:** Attempting to bypass, disable, or interfere with security-related features of the application, including the authentication services.",
            "**Scraping and Automation:** Using automated systems, bots, or scrapers to extract data, test banks, or AI-generated questions from the platform without explicit permission.",
            "**Malicious Payloads:** Uploading or transmitting viruses, Trojans, or other malicious code that could affect the functionality or operation of the Application.",
          ],
        },
      ],
    },
    {
      id: "ai-generated-content-disclaimer",
      number: "04",
      title: "AI-Generated Content Disclaimer",
      blocks: [
        {
          kind: "p",
          text: "StudyMate utilizes advanced third-party AI models (including OpenAI and Anthropic) to generate chat responses, question banks, and assignments.",
        },
        {
          kind: "list",
          items: [
            "**Accuracy:** While we strive for high educational quality, AI-generated content may occasionally contain inaccuracies. Users are advised to review the generated content.",
            "**Input Security:** Please do not input sensitive, personally identifiable, or confidential information into the AI chat interfaces that is not required for educational purposes.",
          ],
        },
      ],
    },
    {
      id: "account-suspension-and-termination",
      number: "05",
      title: "Account Suspension and Termination",
      blocks: [
        {
          kind: "p",
          text: "We reserve the right to suspend or terminate your account and refuse any and all current or future use of the Application for any reason, including but not limited to:",
        },
        {
          kind: "list",
          items: [
            "Violation of these Terms of Security.",
            "Suspicious activity indicating a compromised account.",
            "Extended periods of inactivity.",
          ],
        },
      ],
    },
    {
      id: "changes-to-terms",
      number: "06",
      title: "Changes to Terms",
      blocks: [
        {
          kind: "p",
          text: 'We reserve the right to update or modify these Terms of Security at any time. We will notify you of any changes by updating the "Last Updated" date of these Terms.',
        },
      ],
    },
    {
      id: "contact-us",
      number: "07",
      title: "Contact Us",
      blocks: [
        {
          kind: "p",
          text: "For any security concerns or to report a vulnerability, please contact:",
        },
        { kind: "contact", name: "StudyMate Security Team", email: "hello@supermia.ai" },
      ],
    },
  ],
};
