# Spec 2: Portfolio CMS — Local-Only Admin App

## Overview

A standalone Next.js application that runs on localhost. It connects directly to MongoDB Atlas via Mongoose to create, edit, reorder, and manage portfolio projects. After saving changes, it hits the portfolio's revalidation endpoint so the live site updates.

No auth required — it only runs locally on your machine.

### Goals

- Simple, fast project management with a visual editor
- Block-based section system: add, remove, reorder, enable/disable sections per project
- Live preview of how the project page will look
- Category management for portfolio tabs
- One-click publish with automatic ISR revalidation

### Non-Goals

- Image upload (images stay in the portfolio repo's `/public/Projects/` folder; CMS manages path strings)
- Game project management (separate system, untouched)
- Multi-user support or authentication
- Deployment (runs locally only)

---

## Architecture

```
┌──────────────────────────────┐
│   CMS App (localhost:3001)   │
│   Next.js App Router         │
│                              │
│   Pages:                     │
│   / ─────────── Dashboard    │
│   /editor/[slug] ── Editor   │
│   /categories ── Categories  │
│                              │
│   API Routes:                │
│   /api/projects/* ── CRUD    │
│   /api/categories/* ── CRUD  │
│                              │
│   Direct Mongoose connection │
│   to MongoDB Atlas           │
└──────────────┬───────────────┘
               │
               ▼
       ┌───────────────┐       POST /api/cms/revalidate
       │ MongoDB Atlas │       ┌─────────────────────────┐
       │               │       │ Portfolio on Vercel     │
       └───────────────┘       │ (triggers ISR)          │
               ▲               └─────────────────────────┘
               │ reads                    ▲
               │                          │
       Portfolio Server Components ───────┘
```

### Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | Self-contained backend + frontend, consistent with portfolio |
| Database | Mongoose → MongoDB Atlas | Direct connection, shared DB with portfolio |
| UI Components | shadcn/ui + Tailwind | Same component library as portfolio, zero learning curve |
| Server State | React Query (TanStack Query) | API caching, optimistic updates, loading/error states |
| Forms | React Hook Form + Zod | Nested form fields for blocks, runtime validation |
| Drag & Drop | dnd-kit | Section reordering with accessible drag handles |
| Markdown | react-markdown | Preview for `rich-text` blocks |

---

## Project Structure

```
portfolio-cms/
├── app/
│   ├── layout.tsx                          # Root layout (minimal chrome, sidebar nav)
│   ├── page.tsx                            # Dashboard (project list)
│   ├── editor/
│   │   └── [slug]/
│   │       └── page.tsx                    # Project editor
│   ├── categories/
│   │   └── page.tsx                        # Category manager
│   └── api/
│       ├── projects/
│       │   ├── route.ts                    # GET all, POST create
│       │   └── [slug]/
│       │       ├── route.ts                # GET one, PUT update, DELETE
│       │       └── status/
│       │           └── route.ts            # PATCH toggle draft/published
│       ├── categories/
│       │   ├── route.ts                    # GET all, POST create
│       │   └── [slug]/
│       │       └── route.ts                # PUT update, DELETE
│       └── revalidate/
│           └── route.ts                    # POST triggers portfolio ISR
├── components/
│   ├── ui/                                 # shadcn/ui components
│   ├── dashboard/
│   │   ├── ProjectTable.tsx                # Sortable table of all projects
│   │   ├── ProjectRow.tsx                  # Single row with quick actions
│   │   └── CreateProjectDialog.tsx         # Modal: title + slug + category to start
│   ├── editor/
│   │   ├── CoreMetadataForm.tsx            # Title, subtitle, slug, hero image, links, category
│   │   ├── TechStackEditor.tsx             # Tag input for frameworks, database, tools
│   │   ├── SectionList.tsx                 # Draggable list of all sections
│   │   ├── SectionItem.tsx                 # Single section row: drag handle, title, toggle, expand, delete
│   │   ├── SectionEditor.tsx              # Expanded view — routes to the correct block editor
│   │   ├── AddSectionMenu.tsx              # Dropdown menu of block types to add
│   │   ├── EditorToolbar.tsx               # Save Draft / Publish / status indicator
│   │   ├── LivePreview.tsx                 # Right panel: renders blocks as portfolio would
│   │   └── blocks/
│   │       ├── TextBlockEditor.tsx         # Multiple textareas for paragraphs
│   │       ├── BulletListEditor.tsx        # List of text inputs, add/remove/reorder
│   │       ├── GalleryEditor.tsx           # List of {src, alt} rows, add/remove/reorder
│   │       ├── ChallengeSolutionEditor.tsx # Pairs of challenge + solution inputs
│   │       ├── SkillsEditor.tsx            # Two-column tag inputs (hard/soft)
│   │       ├── FeaturedHighlightEditor.tsx # Cards: image path + heading + description textarea
│   │       ├── ImageTextEditor.tsx         # Image path + textarea + layout toggle
│   │       ├── RichTextEditor.tsx          # Markdown textarea + live preview
│   │       └── EmbedEditor.tsx             # URL input + type dropdown + auto-preview
│   ├── categories/
│   │   ├── CategoryList.tsx                # Draggable list of categories
│   │   └── CategoryForm.tsx                # Name, slug, content source, static config
│   └── shared/
│       ├── ImagePathInput.tsx              # Text input for image paths with format hint
│       ├── ConfirmDialog.tsx               # Reusable confirmation modal
│       └── StatusBadge.tsx                 # Draft/Published badge
├── lib/
│   ├── mongodb.ts                          # Mongoose connection singleton
│   ├── models/
│   │   ├── Project.ts                      # Mongoose schema + model
│   │   └── Category.ts                     # Mongoose schema + model
│   ├── validation/
│   │   ├── project.ts                      # Zod schemas for project + each block type
│   │   └── category.ts                     # Zod schemas for category
│   ├── types.ts                            # Shared TypeScript types
│   └── revalidate.ts                       # Helper: POST to portfolio's revalidation endpoint
├── .env.local                              # MONGODB_URI, PORTFOLIO_URL, CMS_API_KEY
└── package.json
```

---

## CMS API Routes

All routes are internal to the CMS app (localhost only). No auth needed.

### Projects

| Method | Route | Request Body | Description |
|---|---|---|---|
| `GET` | `/api/projects` | — | List all projects (all statuses). Returns: `{ projects: Project[] }` |
| `GET` | `/api/projects/[slug]` | — | Get single project with all sections |
| `POST` | `/api/projects` | `{ title, slug, category }` | Create new project with empty sections. Returns created project. |
| `PUT` | `/api/projects/[slug]` | Full `Project` body | Update entire project (core metadata + sections). Sets `updatedAt`. |
| `DELETE` | `/api/projects/[slug]` | — | Delete project. Returns `{ success: true }`. |
| `PATCH` | `/api/projects/[slug]/status` | `{ status: "draft" \| "published" }` | Toggle publish status. |

### Categories

| Method | Route | Request Body | Description |
|---|---|---|---|
| `GET` | `/api/categories` | — | List all categories sorted by `sortOrder` |
| `POST` | `/api/categories` | `{ name, slug, sortOrder, contentSource, staticConfig? }` | Create category |
| `PUT` | `/api/categories/[slug]` | Full category body | Update category |
| `DELETE` | `/api/categories/[slug]` | — | Delete category. Fails if projects reference it. |

### Revalidation

| Method | Route | Request Body | Description |
|---|---|---|---|
| `POST` | `/api/revalidate` | `{ slug: string }` | Calls the portfolio's `POST /api/cms/revalidate` with the affected paths (`/portfolio`, `/portfolio/project/{slug}`) |

---

## Page Designs

### Dashboard (`/`)

```
┌─────────────────────────────────────────────────────────────┐
│  Portfolio CMS                        [Manage Categories]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Filter: [All Categories ▼]  [All Statuses ▼]              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Title          │ Category       │ Status   │ Updated  │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ Hoops          │ Most Recent    │ Published│ May 20   │  │
│  │                │                │          │ [Edit] [⋮]│  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ TalentHive     │ Most Recent    │ Draft    │ May 18   │  │
│  │                │                │          │ [Edit] [⋮]│  │
│  ├───────────────────────────────────────────────────────┤  │
│  │ CredX          │ Early Course...│ Published│ May 15   │  │
│  │                │                │          │ [Edit] [⋮]│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│                    [+ New Project]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**[⋮] Menu actions:** Edit, Duplicate, Toggle Draft/Published, Delete

**[+ New Project] dialog:**
- Title (required)
- Slug (auto-generated from title, editable)
- Category (dropdown of CMS categories)
- Creates project with `status: "draft"` and empty sections
- Redirects to editor

### Project Editor (`/editor/[slug]`)

```
┌──────────────────────────────────────────────────────────────────────┐
│  ← Dashboard    Editing: Hoops              [Save Draft] [Publish]  │
├────────────────────────────────┬─────────────────────────────────────┤
│                                │                                     │
│  EDITOR PANEL                  │  LIVE PREVIEW                       │
│  (scrollable)                  │  (scrollable, synced)               │
│                                │                                     │
│  ┌────────────────────────┐    │  ┌─────────────────────────────┐    │
│  │ CORE METADATA          │    │  │ [Hero Image Preview]        │    │
│  │                        │    │  │                             │    │
│  │ Title:    [Hoops     ] │    │  │  "A different kind of..."  │    │
│  │ Subtitle: [A differe ] │    │  │  [React] [Node] [MongoDB]  │    │
│  │ Slug:     [hoops     ] │    │  └─────────────────────────────┘    │
│  │ Category: [Most Rece▼] │    │                                     │
│  │ Hero:     [/Projects/] │    │  About This Project                 │
│  │ GitHub:   [https://gi] │    │  ┌─────────────────────────────┐    │
│  │ Demo:     [https://ho] │    │  │ Hoops is an anonymous...    │    │
│  └────────────────────────┘    │  │                             │    │
│                                │  └─────────────────────────────┘    │
│  ┌────────────────────────┐    │                                     │
│  │ TECH STACK             │    │  Gallery                            │
│  │                        │    │  ┌──┬──┬──┬──┬──┐                   │
│  │ Frameworks:            │    │  │  │  │  │  │  │                   │
│  │ [React][Node.js][+ ]   │    │  └──┴──┴──┴──┴──┘                   │
│  │ Database:              │    │                                     │
│  │ [MongoDB][+ ]          │    │  Featured Highlights                │
│  │ Tools:                 │    │  ┌─────────────────────────────┐    │
│  │ [JWT][Axios][+ ]       │    │  │ [Screenshot]                │    │
│  └────────────────────────┘    │  │ Real-time matching...       │    │
│                                │  └─────────────────────────────┘    │
│  ┌────────────────────────┐    │                                     │
│  │ SECTIONS               │    │                                     │
│  │                        │    │                                     │
│  │ ≡ About          [✓]  │    │                                     │
│  │   ┌────────────────┐   │    │                                     │
│  │   │ [paragraph 1 ] │   │    │                                     │
│  │   │ [paragraph 2 ] │   │    │                                     │
│  │   │ [+ paragraph ] │   │    │                                     │
│  │   └────────────────┘   │    │                                     │
│  │                        │    │                                     │
│  │ ≡ Gallery         [✓]  │    │                                     │
│  │   (collapsed)          │    │                                     │
│  │                        │    │                                     │
│  │ ≡ Highlights ★    [✓]  │    │                                     │
│  │   (collapsed)          │    │                                     │
│  │                        │    │                                     │
│  │ ≡ Challenges      [ ]  │    │                                     │
│  │   (disabled, dimmed)   │    │                                     │
│  │                        │    │                                     │
│  │ [+ Add Section ▼]      │    │                                     │
│  └────────────────────────┘    │                                     │
│                                │                                     │
├────────────────────────────────┴─────────────────────────────────────┤
│                                            [Save Draft] [Publish]   │
└──────────────────────────────────────────────────────────────────────┘
```

#### Editor Panel Behavior

**Core Metadata Form:**
- All fields are text inputs except Category (dropdown of CMS categories)
- Slug auto-generates from title on create, editable afterward
- Hero image field is a text input for the path (e.g. `/Projects/hoops/hoops.png`)

**Tech Stack Editor:**
- Three tag-input fields (frameworks, database, tools)
- Type a tech name, press Enter to add as a tag
- Click the x on a tag to remove it

**Section List:**
- Each section shows: drag handle (≡), title, block type badge, enable/disable toggle [✓], expand/collapse chevron, delete (x)
- Drag handle reorders via dnd-kit
- Toggle dims the section without deleting its content
- Click to expand shows the inline block editor
- Only one section expanded at a time

**[+ Add Section] Dropdown:**

```
┌──────────────────────────────┐
│  Text                        │  Paragraphs of prose
│  Bullet List                 │  Bulleted list of items
│  Gallery                     │  Image grid with lightbox
│  Challenge & Solution        │  Problem/solution pairs
│  Skills                      │  Technical + soft skills
│  Featured Highlight     ★    │  Spotlight screenshots
│  Image + Text                │  Image alongside text
│  Rich Text                   │  Markdown content
│  Embed                       │  YouTube / iframe
└──────────────────────────────┘
```

Selecting a type:
1. Prompts for a section title
2. Creates section with `enabled: true`, appended at end of `order`
3. Auto-expands the new section's editor

#### Live Preview Panel

- Renders blocks using the same component styles as the portfolio (shadcn cards, `shadow-xl border-none`, CustomDiv spacing)
- Updates in real-time as you edit the left panel (React state, no save needed)
- Only shows enabled sections in their current order
- Scrolls independently from the editor panel

### Block Editor Details

**TextBlockEditor:**
- Section title input at top
- List of textareas, one per paragraph
- [+ Add Paragraph] button
- Drag to reorder paragraphs
- Delete (x) per paragraph

**BulletListEditor:**
- Section title input at top
- List of single-line text inputs
- [+ Add Item] button
- Drag to reorder
- Delete (x) per item

**GalleryEditor:**
- Section title input at top
- Grid of rows, each with: `src` path input, `alt` text input, delete (x)
- [+ Add Image] button
- Drag to reorder

**ChallengeSolutionEditor:**
- Section title input at top
- Cards with two fields each: Challenge (text input), Solution (textarea)
- [+ Add Pair] button
- Drag to reorder pairs
- Delete (x) per pair

**SkillsEditor:**
- Section title input at top
- Two columns: "Technical Skills" and "Soft Skills"
- Each column: tag-input (type + Enter to add, x to remove)

**FeaturedHighlightEditor:**
- Section title input at top
- 1-3 highlight cards, each with:
  - Image path input
  - Heading text input
  - Description textarea (supports longer write-ups)
- [+ Add Highlight] button (max 3)
- Drag to reorder
- Delete (x) per highlight

**ImageTextEditor:**
- Section title input at top
- Image path input
- Text textarea
- Layout toggle: `Image Left | Image Right` (two buttons, one active)

**RichTextEditor:**
- Section title input at top
- Split view: markdown textarea on left, rendered preview on right
- Basic markdown supported (headers, bold, italic, links, code blocks, lists)

**EmbedEditor:**
- Section title input at top
- URL input
- Type dropdown: YouTube / iframe
- Auto-preview of the embed below the inputs

### Category Manager (`/categories`)

```
┌─────────────────────────────────────────────────────────────┐
│  ← Dashboard                              Categories        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ ≡  Most Recent         │ cms    │ [Edit] [Delete]    │  │
│  │ ≡  Hobbyist Game Dev   │ static │ [View]             │  │
│  │ ≡  Early Coursework    │ cms    │ [Edit] [Delete]    │  │
│  │ ≡  Photography         │ static │ [View]             │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│                    [+ New Category]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Drag handles (≡) to reorder tabs (updates `sortOrder`)
- `static` categories are read-only (shown for visibility, not editable)
- `cms` categories can be edited (name, slug) or deleted
- Delete warns if projects exist in that category
- [+ New Category] creates a `cms` type category

---

## Workflows

### Creating a New Project

1. Click [+ New Project] on dashboard
2. Enter title (slug auto-generates), select category
3. Redirected to `/editor/[slug]`
4. Fill in core metadata (subtitle, hero image path, links)
5. Add tech stack tags
6. Click [+ Add Section] to add blocks
7. Fill in each block's content
8. Reorder sections via drag & drop
9. Toggle sections on/off as needed
10. Preview updates live in the right panel
11. Click [Save Draft] → saves to MongoDB with `status: "draft"`
12. When ready, click [Publish] → sets `status: "published"` + triggers revalidation
13. Portfolio site updates within seconds

### Editing an Existing Project

1. Click [Edit] on a project row in the dashboard
2. Editor loads with all current data pre-filled
3. Make changes — add/remove/reorder sections, update metadata
4. Preview updates live
5. [Save Draft] saves without publishing changes
6. [Publish] saves and triggers revalidation

### Reordering Projects Within a Category

- On the dashboard, projects within the same category can be drag-reordered
- This updates the `sortOrder` field on each affected project
- Changes reflected on portfolio after next revalidation

### Publishing Flow

```
Save Draft ──▶ MongoDB (status: "draft")
                 │
                 │ (project not visible on portfolio)
                 ▼
Publish ─────▶ MongoDB (status: "published")
                 │
                 ├──▶ POST portfolio/api/cms/revalidate
                 │      paths: ["/portfolio", "/portfolio/project/{slug}"]
                 │
                 └──▶ Portfolio ISR regenerates affected pages
```

---

## Validation (Zod Schemas)

### Project Validation

```typescript
const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  heroImage: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
  status: z.enum(["draft", "published"]),
  category: z.string().min(1),
  sortOrder: z.number().int().min(0),
  links: z.object({
    github: z.string().url().optional().or(z.literal("")),
    liveDemo: z.string().url().optional().or(z.literal("")),
  }),
  techStack: z.object({
    frameworks: z.array(z.string()),
    database: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  sections: z.array(SectionSchema),
});
```

### Section Validation

```typescript
const SectionSchema = z.object({
  id: z.string(),
  type: z.enum([
    "text", "bullet-list", "gallery", "challenge-solution",
    "skills", "featured-highlight", "image-text", "rich-text", "embed"
  ]),
  title: z.string().min(1),
  enabled: z.boolean(),
  order: z.number().int().min(0),
  data: z.union([
    TextBlockSchema,
    BulletListBlockSchema,
    GalleryBlockSchema,
    ChallengeSolutionBlockSchema,
    SkillsBlockSchema,
    FeaturedHighlightBlockSchema,
    ImageTextBlockSchema,
    RichTextBlockSchema,
    EmbedBlockSchema,
  ]),
});
```

### Per-Block Validation

```typescript
const TextBlockSchema = z.object({
  paragraphs: z.array(z.string().min(1)).min(1),
});

const BulletListBlockSchema = z.object({
  items: z.array(z.string().min(1)).min(1),
});

const GalleryBlockSchema = z.object({
  images: z.array(z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  })).min(1),
});

const ChallengeSolutionBlockSchema = z.object({
  pairs: z.array(z.object({
    challenge: z.string().min(1),
    solution: z.string().min(1),
  })).min(1),
});

const SkillsBlockSchema = z.object({
  hardSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
});

const FeaturedHighlightBlockSchema = z.object({
  items: z.array(z.object({
    image: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
    heading: z.string().min(1),
    description: z.string().min(1),
  })).min(1).max(3),
});

const ImageTextBlockSchema = z.object({
  image: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
  text: z.string().min(1),
  layout: z.enum(["image-left", "image-right"]),
});

const RichTextBlockSchema = z.object({
  content: z.string().min(1),
});

const EmbedBlockSchema = z.object({
  url: z.string().url(),
  type: z.enum(["youtube", "iframe"]),
});
```

---

## Environment Variables

```env
# .env.local
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
PORTFOLIO_URL=https://your-portfolio.vercel.app
CMS_API_KEY=<same-key-as-portfolio>
```

---

## Shared Code

The `types.ts` and Mongoose models are identical between the portfolio and CMS apps. To keep them in sync:

- Option A: Copy-paste and keep manually in sync (simpler, fine for a personal project)
- Option B: Extract into a shared `packages/types` workspace if you ever put both in a monorepo

For now, Option A is recommended — it's just you using it.
