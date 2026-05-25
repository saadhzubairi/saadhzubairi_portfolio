# Spec 1: Portfolio Backend — Next.js Migration + MongoDB Integration

## Overview

Migrate the portfolio frontend from a Vite/React SPA with static JSON data to a Next.js (App Router) application backed by MongoDB Atlas. Deployed on Vercel. Game projects remain untouched and continue using their existing JSON-based system.

### Goals

- Server-side rendering for SEO (meta tags, Open Graph, sitemap)
- Dynamic content from MongoDB instead of hardcoded JSON files
- Block-based section rendering that supports flexible per-project layouts
- API routes for the CMS to trigger ISR revalidation
- Clean separation: portfolio reads from MongoDB, CMS writes to MongoDB

### Non-Goals

- Game project migration (stays JSON-based, separate system)
- Image hosting/upload (images remain in `/public/Projects/`)
- Authentication on the portfolio side (no admin UI in the portfolio itself)

---

## Architecture

```
┌──────────────────────────┐
│   Portfolio (Vercel)     │
│   Next.js App Router     │
│   Server Components      │──────▶ MongoDB Atlas (reads)
│   ISR + SSG              │
└──────────────────────────┘
           ▲
           │ POST /api/cms/revalidate
┌──────────────────────────┐
│   CMS (localhost)        │
│   Next.js + Mongoose     │──────▶ MongoDB Atlas (reads + writes)
│   Port 3001              │
└──────────────────────────┘
```

### Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG, file-based routing, API routes, Vercel-native |
| Database | MongoDB Atlas (free tier) | Flexible schema for block data, free, familiar |
| ORM | Mongoose | Schema validation, typed queries |
| Deployment | Vercel | Zero-config Next.js hosting, ISR support |
| UI | shadcn/ui + Tailwind (carried over) | No changes needed |
| Animations | Framer Motion (carried over) | No changes needed |
| Gallery | LightGallery (carried over) | No changes needed |

---

## Data Model

### `projects` Collection

```typescript
interface Project {
  _id: ObjectId;

  // ── Core metadata (always present) ──
  slug: string;                // URL-friendly ID, e.g. "hoops". Unique index.
  title: string;               // "Hoops"
  subtitle: string;            // "A different kind of Social Media."
  heroImage: {
    src: string;               // "/Projects/hoops/hoops.png"
    alt: string;
  };
  status: "draft" | "published";
  category: string;            // References categories.slug, e.g. "most-recent"
  sortOrder: number;           // Controls ordering within category

  // ── Links ──
  links: {
    github?: string;
    liveDemo?: string;
  };

  // ── Tech Stack ──
  techStack: {
    frameworks: string[];      // ["React", "Node.js", "Express"]
    database: string[];        // ["MongoDB"]
    tools: string[];           // ["JWT", "Axios"]
  };

  // ── Sections (ordered array of blocks) ──
  sections: Section[];

  // ── Timestamps ──
  createdAt: Date;
  updatedAt: Date;
}

interface Section {
  id: string;                  // Unique within project, e.g. "about-1"
  type: BlockType;
  title: string;               // Section heading displayed on the page
  enabled: boolean;            // Toggle on/off without deleting content
  order: number;               // Rendering order (ascending)
  data: BlockData;             // Type-specific payload (see Block Types)
}

type BlockType =
  | "text"
  | "bullet-list"
  | "gallery"
  | "challenge-solution"
  | "skills"
  | "featured-highlight"
  | "image-text"
  | "rich-text"
  | "embed";
```

### Block Types & Data Shapes

| Type | `data` Shape | Renders As |
|---|---|---|
| `text` | `{ paragraphs: string[] }` | Paragraphs of prose (like current "About This Project") |
| `bullet-list` | `{ items: string[] }` | Bulleted list (like current "My Responsibilities") |
| `gallery` | `{ images: { src: string, alt: string }[] }` | LightGallery image grid |
| `challenge-solution` | `{ pairs: { challenge: string, solution: string }[] }` | Challenge/solution card pairs |
| `skills` | `{ hardSkills: string[], softSkills: string[] }` | Two-column skills cards (Technical / Soft) |
| `featured-highlight` | `{ items: { image: { src: string, alt: string }, heading: string, description: string }[] }` | 1-3 spotlighted screenshots with detailed write-ups |
| `image-text` | `{ image: { src: string, alt: string }, text: string, layout: "image-left" \| "image-right" }` | Image alongside descriptive text |
| `rich-text` | `{ content: string }` | Markdown-rendered freeform content |
| `embed` | `{ url: string, type: "youtube" \| "iframe" }` | Embedded video or iframe |

### `categories` Collection

```typescript
interface Category {
  _id: ObjectId;
  name: string;                    // "Most Recent"
  slug: string;                    // "most-recent". Unique index.
  sortOrder: number;               // Tab ordering (ascending)
  contentSource: "cms" | "static"; // "cms" = MongoDB projects, "static" = JSON-based

  // Only present when contentSource is "static"
  staticConfig?: {
    jsonIds: string[];             // e.g. ["pixelcut", "tetromania", "topdown", "hidenseek"]
    routePrefix: string;           // e.g. "/portfolio/project/game"
  };
}
```

#### Seed Data for Categories

| name | slug | sortOrder | contentSource | staticConfig |
|---|---|---|---|---|
| Most Recent | most-recent | 1 | cms | — |
| Hobbyist Game Dev | hobbyist-game-dev | 2 | static | `{ jsonIds: ["pixelcut", "tetromania", "topdown", "hidenseek"], routePrefix: "/portfolio/project/game" }` |
| Early Coursework | early-coursework | 3 | cms | — |
| Photography | photography | 4 | static | `{ jsonIds: [], routePrefix: "/portfolio/photography" }` |

### Indexes

| Collection | Index | Type |
|---|---|---|
| projects | `{ slug: 1 }` | Unique |
| projects | `{ status: 1, category: 1, sortOrder: 1 }` | Compound (listing queries) |
| categories | `{ slug: 1 }` | Unique |
| categories | `{ sortOrder: 1 }` | Sort |

---

## API Routes

### Public Routes (portfolio frontend pages also use these internally via server components, but they're available as REST too)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | All published projects grouped by category, sorted. Query params: `?category=slug` for filtering. |
| `GET` | `/api/projects/[slug]` | Single project with all sections. 404 if not found or draft. |
| `GET` | `/api/categories` | All categories with sort order. |

### CMS-Only Route

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/cms/revalidate` | Triggers on-demand ISR revalidation. Accepts `{ paths: string[] }` body. Protected by `CMS_API_KEY`. |

### Response Shapes

**`GET /api/projects`**

```json
{
  "categories": [
    {
      "name": "Most Recent",
      "slug": "most-recent",
      "contentSource": "cms",
      "projects": [
        {
          "slug": "hoops",
          "title": "Hoops",
          "subtitle": "A different kind of Social Media.",
          "heroImage": { "src": "/Projects/hoops/hoops.png", "alt": "Hoops" },
          "techStack": { "frameworks": ["React", "Node.js"], "database": ["MongoDB"], "tools": ["JWT"] },
          "category": "most-recent",
          "sortOrder": 1
        }
      ]
    },
    {
      "name": "Hobbyist Game Dev",
      "slug": "hobbyist-game-dev",
      "contentSource": "static",
      "staticConfig": {
        "jsonIds": ["pixelcut", "tetromania", "topdown", "hidenseek"],
        "routePrefix": "/portfolio/project/game"
      },
      "projects": []
    }
  ]
}
```

For `"static"` categories, the `projects` array is empty — the frontend loads those from JSON imports client-side using the `jsonIds` and `routePrefix`.

**`GET /api/projects/[slug]`**

Returns the full `Project` document as-is.

### Caching & Revalidation Strategy

- Portfolio pages use ISR with `revalidate: 3600` (1 hour)
- `generateStaticParams()` pre-renders all published project pages at build time
- After CMS saves, the CMS app calls `POST /api/cms/revalidate` with the affected paths
- The revalidation endpoint calls `revalidatePath()` for each provided path
- `CMS_API_KEY` env var protects the revalidation endpoint

---

## Next.js Project Structure

```
saadhzubairi-portfolio/
├── app/
│   ├── layout.tsx                          # Root layout (fonts, theme provider, navbar, footer)
│   ├── page.tsx                            # Home page (/)
│   ├── portfolio/
│   │   ├── page.tsx                        # Portfolio listing page (SSG + ISR)
│   │   └── project/
│   │       ├── [slug]/
│   │       │   └── page.tsx                # Web project detail page (SSG + ISR)
│   │       └── game/
│   │           └── [projectId]/
│   │               └── page.tsx            # Game project detail page (kept as-is, JSON-based)
│   └── api/
│       ├── projects/
│       │   ├── route.ts                    # GET all published projects
│       │   └── [slug]/
│       │       └── route.ts                # GET single project
│       ├── categories/
│       │   └── route.ts                    # GET all categories
│       └── cms/
│           └── revalidate/
│               └── route.ts                # POST trigger ISR revalidation
├── components/
│   ├── ui/                                 # shadcn/ui components (carried over)
│   ├── home/                               # Home page components (carried over)
│   ├── about/                              # About components (carried over)
│   ├── portfolio/
│   │   ├── PortfolioPage.tsx               # Tab navigation + project grid
│   │   └── ProjectCard.tsx                 # Project card in the grid
│   ├── project/
│   │   ├── ProjectPage.tsx                 # Orchestrator: hero + block loop + navigation
│   │   ├── HeroSection.tsx                 # Hero image with subtitle/tech overlays
│   │   ├── ProjectNavigation.tsx           # Previous/Next buttons
│   │   └── blocks/
│   │       ├── BlockRenderer.tsx           # Maps section.type → block component
│   │       ├── TextBlock.tsx
│   │       ├── BulletListBlock.tsx
│   │       ├── GalleryBlock.tsx
│   │       ├── ChallengeSolutionBlock.tsx
│   │       ├── SkillsBlock.tsx
│   │       ├── FeaturedHighlightBlock.tsx
│   │       ├── ImageTextBlock.tsx
│   │       ├── RichTextBlock.tsx
│   │       └── EmbedBlock.tsx
│   ├── game/                               # Game project components (carried over as-is)
│   │   └── GameProjectPage.tsx
│   ├── CustomDiv.tsx                       # Carried over
│   └── TexturedSpacer.tsx                  # Carried over
├── lib/
│   ├── mongodb.ts                          # MongoDB client singleton (cached connection)
│   ├── models/
│   │   ├── Project.ts                      # Mongoose model
│   │   └── Category.ts                     # Mongoose model
│   ├── queries/
│   │   ├── getProjects.ts                  # Fetch all published projects grouped by category
│   │   ├── getProject.ts                   # Fetch single project by slug
│   │   └── getCategories.ts               # Fetch all categories
│   └── types.ts                            # Shared TypeScript types (Project, Section, BlockData, Category)
├── public/
│   └── Projects/                           # Project images (unchanged)
│       ├── hoops/
│       ├── talenthive/
│       ├── credx/
│       └── ...
├── .env.local                              # MONGODB_URI, CMS_API_KEY
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## Block Rendering System

### ProjectPage.tsx (Server Component)

```tsx
import { getProject } from "@/lib/queries/getProject";
import { getCategories } from "@/lib/queries/getCategories";
import { HeroSection } from "@/components/project/HeroSection";
import { BlockRenderer } from "@/components/project/blocks/BlockRenderer";
import { ProjectNavigation } from "@/components/project/ProjectNavigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  return {
    title: `${project.title} | Saad Zubairi`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [project.heroImage.src],
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug);

  const enabledSections = project.sections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="pt-24 pb-12 sm:pb-16">
      <HeroSection project={project} />

      {enabledSections.map(section => (
        <BlockRenderer key={section.id} section={section} />
      ))}

      <ProjectNavigation
        currentSlug={project.slug}
        category={project.category}
      />
    </div>
  );
}
```

### BlockRenderer.tsx

```tsx
import { TextBlock } from "./TextBlock";
import { BulletListBlock } from "./BulletListBlock";
import { GalleryBlock } from "./GalleryBlock";
import { ChallengeSolutionBlock } from "./ChallengeSolutionBlock";
import { SkillsBlock } from "./SkillsBlock";
import { FeaturedHighlightBlock } from "./FeaturedHighlightBlock";
import { ImageTextBlock } from "./ImageTextBlock";
import { RichTextBlock } from "./RichTextBlock";
import { EmbedBlock } from "./EmbedBlock";

const BLOCK_MAP: Record<string, React.FC<{ title: string; data: any }>> = {
  "text": TextBlock,
  "bullet-list": BulletListBlock,
  "gallery": GalleryBlock,
  "challenge-solution": ChallengeSolutionBlock,
  "skills": SkillsBlock,
  "featured-highlight": FeaturedHighlightBlock,
  "image-text": ImageTextBlock,
  "rich-text": RichTextBlock,
  "embed": EmbedBlock,
};

export function BlockRenderer({ section }: { section: Section }) {
  const Component = BLOCK_MAP[section.type];
  if (!Component) return null;
  return <Component title={section.title} data={section.data} />;
}
```

Each block component wraps content in `CustomDiv` and `Card` with the existing styling (`shadow-xl border-none`).

---

## Migration Strategy

### What Carries Over As-Is

- All shadcn/ui components (`/components/ui/`)
- Tailwind configuration + `index.css` global styles
- Framer Motion animations
- LightGallery setup and styles
- `CustomDiv.tsx`, `TexturedSpacer.tsx`
- All images in `/public/Projects/`
- Game project JSON files and `GameProjectPage` component
- Home page components, About components

### What Changes

| Before (Vite SPA) | After (Next.js) |
|---|---|
| `react-router-dom` routing | Next.js file-based routing (App Router) |
| Static JSON imports in PortfolioPage | MongoDB queries via server components |
| Dynamic `import()` in ProjectPage | `getProject(slug)` server function |
| Hardcoded category tabs | Dynamic categories from MongoDB |
| Fixed project section layout | Block-based rendering from `sections` array |
| Client-side only rendering | SSR/SSG with ISR |
| `@/` path alias via Vite | `@/` path alias via `tsconfig.json` (Next.js default) |

### Data Migration

A one-time script (`scripts/seed-db.ts`) that:

1. Reads each existing project JSON file
2. Transforms it into the new `Project` schema, mapping existing fields to blocks:
   - `about` array → `text` block
   - `myResponsibilities` → `bullet-list` block
   - `gallery` → `gallery` block
   - `challengesAndLessons` → `challenge-solution` block
   - `skillsDeveloped` → `skills` block
3. Inserts into MongoDB
4. Creates the four category documents (seed data above)
5. Logs results

This ensures zero content loss during migration.

---

## Environment Variables

```env
# .env.local
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
CMS_API_KEY=<random-secret-string>
```

---

## SEO Enhancements

- `generateMetadata()` on every page for title, description, Open Graph
- `generateStaticParams()` for pre-rendering all project pages
- Automatic `sitemap.xml` via `app/sitemap.ts`
- Semantic HTML from server components
- Proper heading hierarchy in block components
