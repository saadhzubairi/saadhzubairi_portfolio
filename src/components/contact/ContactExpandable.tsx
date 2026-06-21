import { Mail, Linkedin, Github, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";

const CONTACT_EMAIL = "saadhzubairi@outlook.com";

const channels = [
  {
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
  },
  {
    href: "https://www.linkedin.com/in/saadhzubairi/",
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/saadhzubairi",
  },
  {
    href: "https://github.com/saadhzubairi/",
    icon: Github,
    label: "GitHub",
    value: "@saadhzubairi",
  },
  {
    href: "https://discord.com/users/saadhzubairi#1469",
    icon: MessageCircle,
    label: "Discord",
    value: "saadhzubairi#1469",
  },
];

interface ContactExpandableProps {
  triggerClassName?: string;
}

export default function ContactExpandable({
  triggerClassName = "",
}: ContactExpandableProps) {
  return (
    <ExpandableScreen
      layoutId="contact-card"
      triggerRadius="9999px"
      contentRadius="24px"
    >
      <ExpandableScreenTrigger>
        <div
          className={cn(
            "group inline-flex h-11 items-center gap-2 rounded-full border border-gray-200 px-6 text-sm font-medium text-gray-600 transition-all duration-300 hover:border-gray-400 hover:text-gray-900 dark:border-gray-700/70 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white",
            triggerClassName
          )}
        >
          Contact
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </ExpandableScreenTrigger>

      <ExpandableScreenContent className="bg-primary">
        <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col justify-center gap-10 p-6 sm:p-10 lg:p-16">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Get in touch
            </p>
            <h2 className="text-4xl font-medium leading-none tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Let&apos;s build something.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              Have a project, a role, or just want to say hi? Reach me directly
              on any of these.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {channels.map(({ href, icon: Icon, label, value }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.03] p-4 transition-colors hover:bg-primary-foreground/[0.08]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-medium text-primary-foreground">
                    {label}
                  </span>
                  <span className="truncate text-xs text-primary-foreground/60">
                    {value}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-primary-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
