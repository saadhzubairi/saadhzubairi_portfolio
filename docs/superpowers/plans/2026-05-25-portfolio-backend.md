# Portfolio Backend: Next.js Migration + MongoDB Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio from a Vite/React SPA with static JSON to a Next.js App Router application backed by MongoDB Atlas, with block-based project page rendering and ISR.

**Architecture:** Next.js 14+ App Router deployed on Vercel. Server components read project data from MongoDB Atlas via Mongoose. Project pages render a dynamic list of typed content blocks. Game projects remain JSON-based and untouched. A single `/api/cms/revalidate` endpoint allows the separate CMS app to trigger ISR cache busting.

**Tech Stack:** Next.js 14+, React 18, TypeScript, MongoDB Atlas (free tier), Mongoose 8+, Tailwind CSS 3.4, shadcn/ui, Framer Motion, LightGallery, Lucide Icons

**Spec:** `docs/superpowers/specs/2026-05-25-portfolio-backend-design.md`

---

## Chunk 1: Next.js Project Initialization

### Task 1: Initialize Next.js project

**Files:**
- Create: `portfolio-nextjs/` (new project directory, sibling to current project)
- Create: `portfolio-nextjs/package.json`
- Create: `portfolio-nextjs/next.config.js`
- Create: `portfolio-nextjs/tsconfig.json`
- Create: `portfolio-nextjs/tailwind.config.js`
- Create: `portfolio-nextjs/postcss.config.js`
- Create: `portfolio-nextjs/.env.local`
- Create: `portfolio-nextjs/.gitignore`

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/saadhzubairi/Work/Personal_Projects/
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --eslint --app --src-dir --no-import-alias --no-turbopack
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: No
- Import alias: use `@/*` → `./src/*`

- [ ] **Step 2: Install all dependencies from current project**

```bash
cd /Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs
npm install mongoose next-themes @emailjs/browser @fontsource/inter @fontsource/roboto @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-slot @radix-ui/react-tabs class-variance-authority clsx framer-motion lightgallery lucide-react motion react-just-parallax react-responsive react-text-transition tailwind-merge tailwindcss-animate vaul
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D tailwindcss-animate @types/node
```

- [ ] **Step 4: Configure tailwind.config.js**

Copy the full tailwind config from the current project at `/Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/tailwind.config.js`. The only change needed:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",  // removed "./index.html" — Next.js doesn't use it
  ],
  // ... rest of config is identical to current project
}
```

- [ ] **Step 5: Copy global CSS**

Copy `/Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/src/index.css` to `src/app/globals.css` in the new project. Keep all custom CSS variables, utility classes, and dark mode styles exactly as-is.

- [ ] **Step 6: Set up environment variables**

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
CMS_API_KEY=<generate-a-random-string>
```

- [ ] **Step 7: Copy public assets**

```bash
cp -r /Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/public/Projects /Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/public/Projects
```

Also copy any other public assets (favicon, etc.).

- [ ] **Step 8: Copy shadcn/ui components and lib**

```bash
# Copy UI components
cp -r /Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/src/components/ui /Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/src/components/ui

# Copy lib/utils.ts if it exists
mkdir -p /Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/src/lib
cp /Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/src/lib/utils.ts /Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/src/lib/utils.ts 2>/dev/null || true
```

- [ ] **Step 9: Configure shadcn/ui for Next.js**

Create `components.json` at project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Note: `"rsc": true` is the only change from the Vite version.

- [ ] **Step 10: Verify the project starts**

```bash
npm run dev
```

Expected: Next.js dev server starts on port 3000 with the default landing page.

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js project with all dependencies and config"
```

---

### Task 2: Copy shared components and assets

**Files:**
- Copy: `src/components/CustomDiv.tsx`
- Copy: `src/components/TexturedSpacer.tsx`
- Copy: `src/components/AnimatedPage.tsx`
- Copy: `src/components/theme-provider.tsx`
- Copy: `src/components/header/*`
- Copy: `src/components/home/*`
- Copy: `src/components/about/*`
- Copy: `src/components/connect/*`
- Copy: `src/components/projectHighlights/*`
- Copy: Game project JSON files and components

- [ ] **Step 1: Copy all reusable components**

```bash
SRC=/Users/saadhzubairi/Work/Personal_Projects/saadhzubairi_portfolio/src
DEST=/Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/src

# Shared components
cp "$SRC/components/CustomDiv.tsx" "$DEST/components/"
cp "$SRC/components/TexturedSpacer.tsx" "$DEST/components/"
cp "$SRC/components/AnimatedPage.tsx" "$DEST/components/"
cp "$SRC/components/theme-provider.tsx" "$DEST/components/"

# Layout components
mkdir -p "$DEST/components/header"
cp "$SRC/components/header/"* "$DEST/components/header/"

# Home page
mkdir -p "$DEST/components/home"
cp "$SRC/components/home/"* "$DEST/components/home/"

# About
mkdir -p "$DEST/components/about" "$DEST/components/about/details"
cp "$SRC/components/about/"*.tsx "$DEST/components/about/"
cp "$SRC/components/about/"*.css "$DEST/components/about/" 2>/dev/null || true
cp "$SRC/components/about/details/"* "$DEST/components/about/details/" 2>/dev/null || true

# Connect
mkdir -p "$DEST/components/connect"
cp "$SRC/components/connect/"* "$DEST/components/connect/"

# Project highlights
mkdir -p "$DEST/components/projectHighlights"
cp "$SRC/components/projectHighlights/"* "$DEST/components/projectHighlights/"

# Game project page (stays JSON-based)
mkdir -p "$DEST/components/ProjectPage/GameProjectPage"
cp "$SRC/components/ProjectPage/GameProjectPage/"* "$DEST/components/ProjectPage/GameProjectPage/"
cp "$SRC/components/ProjectPage/projectPage.css" "$DEST/components/ProjectPage/" 2>/dev/null || true

# Game JSON data files
mkdir -p "$DEST/assets/portfolio"
for f in pixelcut tetromania topdown hidenseek; do
  cp "$SRC/assets/portfolio/$f.json" "$DEST/assets/portfolio/"
done
# Also copy projects.json (needed for game navigation)
cp "$SRC/assets/portfolio/projects.json" "$DEST/assets/portfolio/"

# Other shared components/utilities
mkdir -p "$DEST/components/utils"
cp "$SRC/components/utils/"* "$DEST/components/utils/" 2>/dev/null || true
```

- [ ] **Step 2: Fix imports in copied components**

All copied components use `react-router-dom` for `Link`, `useNavigate`, `useParams`. These need to be updated:

- `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
- `import { useNavigate } from 'react-router-dom'` → `import { useRouter } from 'next/navigation'`
- `const navigate = useNavigate()` → `const router = useRouter()`
- `navigate('/path')` → `router.push('/path')`
- `import { useParams } from 'react-router-dom'` → `import { useParams } from 'next/navigation'`

Components that need these changes:
- `src/components/home/Home.tsx` — uses `Link`
- `src/components/header/Navigation.tsx` — uses `Link`, possibly `useNavigate`
- `src/components/ProjectPage/GameProjectPage/GameProjectPage.tsx` — uses `useParams`, `useNavigate`
- `src/components/projectHighlights/ProjectH.tsx` — uses `Link`

Also add `"use client"` directive to any component that uses:
- React hooks (`useState`, `useEffect`, `useRef`)
- Framer Motion animations
- Browser APIs
- Event handlers (onClick, etc.)

Components that need `"use client"`:
- `AnimatedPage.tsx`
- `theme-provider.tsx`
- `header/NavbarAnimation.tsx`
- `header/Navigation.tsx`
- `header/DarkModeToggle.tsx` / `ModeToggle.tsx`
- `home/Home.tsx`
- `about/BentoGrid.tsx`
- `about/HeroAtAGlance.tsx`
- `connect/Connect.tsx`
- `projectHighlights/ProjectH.tsx`
- `CustomDiv.tsx` (if it uses hooks)
- `ProjectPage/GameProjectPage/GameProjectPage.tsx`

- [ ] **Step 3: Verify compilation**

```bash
npm run dev
```

Expected: No import errors. Pages may not render correctly yet (no routes set up), but compilation should succeed.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: copy shared components from Vite project and fix imports for Next.js"
```

---

## Chunk 2: MongoDB + Mongoose Setup

### Task 3: MongoDB connection singleton

**Files:**
- Create: `src/lib/mongodb.ts`

- [ ] **Step 1: Create MongoDB connection helper**

```typescript
// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/mongodb.ts
git commit -m "feat: add MongoDB connection singleton with caching for serverless"
```

---

### Task 4: TypeScript types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 1: Create shared types file**

```typescript
// src/lib/types.ts

export type BlockType =
  | "text"
  | "bullet-list"
  | "gallery"
  | "challenge-solution"
  | "skills"
  | "featured-highlight"
  | "image-text"
  | "rich-text"
  | "embed";

export interface ImageRef {
  src: string;
  alt: string;
}

// ── Block Data Shapes ──

export interface TextBlockData {
  paragraphs: string[];
}

export interface BulletListBlockData {
  items: string[];
}

export interface GalleryBlockData {
  images: ImageRef[];
}

export interface ChallengeSolutionBlockData {
  pairs: { challenge: string; solution: string }[];
}

export interface SkillsBlockData {
  hardSkills: string[];
  softSkills: string[];
}

export interface FeaturedHighlightBlockData {
  items: { image: ImageRef; heading: string; description: string }[];
}

export interface ImageTextBlockData {
  image: ImageRef;
  text: string;
  layout: "image-left" | "image-right";
}

export interface RichTextBlockData {
  content: string;
}

export interface EmbedBlockData {
  url: string;
  type: "youtube" | "iframe";
}

export type BlockData =
  | TextBlockData
  | BulletListBlockData
  | GalleryBlockData
  | ChallengeSolutionBlockData
  | SkillsBlockData
  | FeaturedHighlightBlockData
  | ImageTextBlockData
  | RichTextBlockData
  | EmbedBlockData;

// ── Section ──

export interface Section {
  id: string;
  type: BlockType;
  title: string;
  enabled: boolean;
  order: number;
  data: BlockData;
}

// ── Project ──

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: ImageRef;
  status: "draft" | "published";
  category: string;
  sortOrder: number;
  links: {
    github?: string;
    liveDemo?: string;
  };
  techStack: {
    frameworks: string[];
    database: string[];
    tools: string[];
  };
  sections: Section[];
  createdAt: Date;
  updatedAt: Date;
}

// ── Lightweight project for listing pages ──

export type ProjectSummary = Pick<
  Project,
  "slug" | "title" | "subtitle" | "heroImage" | "techStack" | "category" | "sortOrder"
>;

// ── Category ──

export interface Category {
  name: string;
  slug: string;
  sortOrder: number;
  contentSource: "cms" | "static";
  staticConfig?: {
    jsonIds: string[];
    routePrefix: string;
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add shared TypeScript types for projects, sections, blocks, and categories"
```

---

### Task 5: Mongoose models

**Files:**
- Create: `src/lib/models/Project.ts`
- Create: `src/lib/models/Category.ts`

- [ ] **Step 1: Create Project model**

```typescript
// src/lib/models/Project.ts
import mongoose, { Schema, Model } from "mongoose";

const ImageRefSchema = new Schema(
  { src: { type: String, required: true }, alt: { type: String, required: true } },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "text", "bullet-list", "gallery", "challenge-solution",
        "skills", "featured-highlight", "image-text", "rich-text", "embed",
      ],
    },
    title: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    order: { type: Number, required: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    heroImage: { type: ImageRefSchema, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    category: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    links: {
      github: { type: String, default: "" },
      liveDemo: { type: String, default: "" },
    },
    techStack: {
      frameworks: [String],
      database: [String],
      tools: [String],
    },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

// Compound index for listing queries
ProjectSchema.index({ status: 1, category: 1, sortOrder: 1 });

const Project: Model<any> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
```

- [ ] **Step 2: Create Category model**

```typescript
// src/lib/models/Category.ts
import mongoose, { Schema, Model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  sortOrder: { type: Number, required: true },
  contentSource: { type: String, enum: ["cms", "static"], required: true },
  staticConfig: {
    jsonIds: [String],
    routePrefix: { type: String },
  },
});

CategorySchema.index({ sortOrder: 1 });

const Category: Model<any> =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/models/
git commit -m "feat: add Mongoose models for Project and Category"
```

---

### Task 6: Query functions

**Files:**
- Create: `src/lib/queries/getProjects.ts`
- Create: `src/lib/queries/getProject.ts`
- Create: `src/lib/queries/getCategories.ts`

- [ ] **Step 1: Create getProjects query**

```typescript
// src/lib/queries/getProjects.ts
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import type { ProjectSummary } from "@/lib/types";

export async function getProjects(category?: string): Promise<ProjectSummary[]> {
  await connectToDatabase();

  const filter: Record<string, any> = { status: "published" };
  if (category) {
    filter.category = category;
  }

  const projects = await Project.find(filter)
    .select("slug title subtitle heroImage techStack category sortOrder")
    .sort({ sortOrder: 1 })
    .lean<ProjectSummary[]>();

  return projects;
}
```

- [ ] **Step 2: Create getProject query**

```typescript
// src/lib/queries/getProject.ts
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import type { Project as ProjectType } from "@/lib/types";

export async function getProject(slug: string): Promise<ProjectType | null> {
  await connectToDatabase();

  const project = await Project.findOne({ slug, status: "published" }).lean<ProjectType>();

  return project;
}
```

- [ ] **Step 3: Create getCategories query**

```typescript
// src/lib/queries/getCategories.ts
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import type { Category as CategoryType } from "@/lib/types";

export async function getCategories(): Promise<CategoryType[]> {
  await connectToDatabase();

  const categories = await Category.find({}).sort({ sortOrder: 1 }).lean<CategoryType[]>();

  return categories;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/queries/
git commit -m "feat: add query functions for projects and categories"
```

---

## Chunk 3: Data Migration Script

### Task 7: Seed script to migrate JSON data to MongoDB

**Files:**
- Create: `scripts/seed-db.ts`
- Create: `scripts/tsconfig.json`

- [ ] **Step 1: Install tsx for running TypeScript scripts**

```bash
npm install -D tsx
```

- [ ] **Step 2: Create seed script tsconfig**

```json
// scripts/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

- [ ] **Step 3: Create the seed script**

This script reads the existing JSON files from the original Vite project and transforms them into the new schema:

```typescript
// scripts/seed-db.ts
import mongoose from "mongoose";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use direct Mongoose connection (not the Next.js singleton)
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Set MONGODB_URI env var");
  process.exit(1);
}

// Inline schemas (avoid Next.js import issues in scripts)
const ImageRefSchema = new mongoose.Schema(
  { src: { type: String, required: true }, alt: { type: String, required: true } },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    order: { type: Number, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    heroImage: { type: ImageRefSchema, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    category: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
    links: { github: String, liveDemo: String },
    techStack: { frameworks: [String], database: [String], tools: [String] },
    sections: [SectionSchema],
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sortOrder: { type: Number, required: true },
  contentSource: { type: String, enum: ["cms", "static"], required: true },
  staticConfig: { jsonIds: [String], routePrefix: String },
});

const Project = mongoose.model("Project", ProjectSchema);
const Category = mongoose.model("Category", CategorySchema);

// ── Category assignments (mirrors current PortfolioPage.tsx tabs) ──
const CATEGORY_MAP: Record<string, { category: string; sortOrder: number }> = {
  hoops: { category: "most-recent", sortOrder: 1 },
  talenthive: { category: "most-recent", sortOrder: 2 },
  credx: { category: "early-coursework", sortOrder: 1 },
  crickex: { category: "early-coursework", sortOrder: 2 },
  halpert: { category: "early-coursework", sortOrder: 3 },
  latex: { category: "early-coursework", sortOrder: 4 },
  tutor: { category: "early-coursework", sortOrder: 5 },
};

// ── JSON path (original Vite project) ──
const JSON_DIR = path.resolve(
  __dirname,
  "../../saadhzubairi_portfolio/src/assets/portfolio"
);

// Only migrate web projects (not game projects)
const WEB_PROJECT_IDS = ["hoops", "talenthive", "credx", "crickex", "halpert", "latex", "tutor"];

function transformProject(data: any, id: string) {
  const mapping = CATEGORY_MAP[id] || { category: "uncategorized", sortOrder: 0 };
  const sections: any[] = [];
  let order = 0;

  // about → text block
  if (data.about && Array.isArray(data.about) && data.about.length > 0) {
    sections.push({
      id: `about-${order}`,
      type: "text",
      title: "About This Project",
      enabled: true,
      order: order++,
      data: { paragraphs: data.about },
    });
  }

  // myResponsibilities → bullet-list block
  if (data.myResponsibilities && data.myResponsibilities.length > 0) {
    sections.push({
      id: `responsibilities-${order}`,
      type: "bullet-list",
      title: "My Responsibilities",
      enabled: true,
      order: order++,
      data: { items: data.myResponsibilities },
    });
  }

  // gallery → gallery block
  if (data.gallery && data.gallery.length > 0) {
    sections.push({
      id: `gallery-${order}`,
      type: "gallery",
      title: "Gallery",
      enabled: true,
      order: order++,
      data: { images: data.gallery },
    });
  }

  // challengesAndLessons → challenge-solution block
  if (data.challengesAndLessons && data.challengesAndLessons.length > 0) {
    sections.push({
      id: `challenges-${order}`,
      type: "challenge-solution",
      title: "Challenges & Lessons Learned",
      enabled: true,
      order: order++,
      data: { pairs: data.challengesAndLessons },
    });
  }

  // skillsDeveloped → skills block
  if (data.skillsDeveloped) {
    sections.push({
      id: `skills-${order}`,
      type: "skills",
      title: "Skills Developed",
      enabled: true,
      order: order++,
      data: {
        hardSkills: data.skillsDeveloped.hardSkills || [],
        softSkills: data.skillsDeveloped.softSkills || [],
      },
    });
  }

  // methodology → rich-text block (if present)
  if (data.methodology) {
    sections.push({
      id: `methodology-${order}`,
      type: "rich-text",
      title: "Methodology",
      enabled: true,
      order: order++,
      data: { content: data.methodology },
    });
  }

  return {
    slug: data.id || id,
    title: data.title,
    subtitle: data.subtitle,
    heroImage: data.heroImage,
    status: "published" as const,
    category: mapping.category,
    sortOrder: mapping.sortOrder,
    links: {
      github: typeof data.links === "object" ? data.links.github || "" : "",
      liveDemo: typeof data.links === "object" ? data.links.liveDemo || "" : "",
    },
    techStack: data.techStack || { frameworks: [], database: [], tools: [] },
    sections,
  };
}

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.");

  // Clear existing data
  await Project.deleteMany({});
  await Category.deleteMany({});
  console.log("Cleared existing data.");

  // Seed categories
  const categories = [
    { name: "Most Recent", slug: "most-recent", sortOrder: 1, contentSource: "cms" },
    {
      name: "Hobbyist Game Dev",
      slug: "hobbyist-game-dev",
      sortOrder: 2,
      contentSource: "static",
      staticConfig: {
        jsonIds: ["pixelcut", "tetromania", "topdown", "hidenseek"],
        routePrefix: "/portfolio/project/game",
      },
    },
    { name: "Early Coursework", slug: "early-coursework", sortOrder: 3, contentSource: "cms" },
    {
      name: "Photography",
      slug: "photography",
      sortOrder: 4,
      contentSource: "static",
      staticConfig: { jsonIds: [], routePrefix: "/portfolio/photography" },
    },
  ];

  await Category.insertMany(categories);
  console.log(`Inserted ${categories.length} categories.`);

  // Seed web projects
  for (const id of WEB_PROJECT_IDS) {
    const filePath = path.join(JSON_DIR, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping ${id}: file not found at ${filePath}`);
      continue;
    }
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const project = transformProject(raw, id);
    await Project.create(project);
    console.log(`Inserted project: ${project.title} (${project.slug})`);
  }

  console.log("Seed complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
```

- [ ] **Step 4: Add seed script to package.json**

Add to `scripts`:

```json
"seed": "tsx scripts/seed-db.ts"
```

- [ ] **Step 5: Run the seed script**

```bash
MONGODB_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio" npm run seed
```

Expected: Output showing each project and category inserted successfully.

- [ ] **Step 6: Verify data in MongoDB**

Use MongoDB Compass or Atlas UI to confirm:
- `projects` collection has 7 documents (hoops, talenthive, credx, crickex, halpert, latex, tutor)
- `categories` collection has 4 documents
- Each project has a `sections` array with the correct block types

- [ ] **Step 7: Commit**

```bash
git add scripts/ package.json
git commit -m "feat: add seed script to migrate existing JSON project data to MongoDB"
```

---

## Chunk 4: API Routes

### Task 8: Public API routes

**Files:**
- Create: `src/app/api/projects/route.ts`
- Create: `src/app/api/projects/[slug]/route.ts`
- Create: `src/app/api/categories/route.ts`

- [ ] **Step 1: GET /api/projects**

```typescript
// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { getProjects } from "@/lib/queries/getProjects";
import { getCategories } from "@/lib/queries/getCategories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryFilter = searchParams.get("category");

  const [categories, projects] = await Promise.all([
    getCategories(),
    getProjects(categoryFilter || undefined),
  ]);

  // Group projects by category
  const result = categories.map((cat) => ({
    ...cat,
    projects: cat.contentSource === "cms"
      ? projects.filter((p) => p.category === cat.slug)
      : [],
  }));

  return NextResponse.json({ categories: result });
}
```

- [ ] **Step 2: GET /api/projects/[slug]**

```typescript
// src/app/api/projects/[slug]/route.ts
import { NextResponse } from "next/server";
import { getProject } from "@/lib/queries/getProject";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
```

- [ ] **Step 3: GET /api/categories**

```typescript
// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import { getCategories } from "@/lib/queries/getCategories";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ categories });
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/
git commit -m "feat: add public API routes for projects and categories"
```

---

### Task 9: CMS revalidation endpoint

**Files:**
- Create: `src/app/api/cms/revalidate/route.ts`

- [ ] **Step 1: Create revalidation route**

```typescript
// src/app/api/cms/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const apiKey = request.headers.get("authorization")?.replace("Bearer ", "");

  if (apiKey !== process.env.CMS_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { paths } = body as { paths?: string[] };

  const defaultPaths = ["/portfolio"];
  const pathsToRevalidate = paths || defaultPaths;

  for (const p of pathsToRevalidate) {
    revalidatePath(p);
  }

  return NextResponse.json({
    revalidated: true,
    paths: pathsToRevalidate,
    timestamp: Date.now(),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/cms/
git commit -m "feat: add CMS revalidation endpoint with API key protection"
```

---

## Chunk 5: Block Rendering Components

### Task 10: Block renderer and block components

**Files:**
- Create: `src/components/project/blocks/BlockRenderer.tsx`
- Create: `src/components/project/blocks/TextBlock.tsx`
- Create: `src/components/project/blocks/BulletListBlock.tsx`
- Create: `src/components/project/blocks/GalleryBlock.tsx`
- Create: `src/components/project/blocks/ChallengeSolutionBlock.tsx`
- Create: `src/components/project/blocks/SkillsBlock.tsx`
- Create: `src/components/project/blocks/FeaturedHighlightBlock.tsx`
- Create: `src/components/project/blocks/ImageTextBlock.tsx`
- Create: `src/components/project/blocks/RichTextBlock.tsx`
- Create: `src/components/project/blocks/EmbedBlock.tsx`

- [ ] **Step 1: Create BlockRenderer**

```tsx
// src/components/project/blocks/BlockRenderer.tsx
import type { Section } from "@/lib/types";
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

- [ ] **Step 2: Create TextBlock**

Port the "About This Project" card from the current `ProjectPage.tsx` (lines 164-174):

```tsx
// src/components/project/blocks/TextBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { TextBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: TextBlockData;
}

export function TextBlock({ title, data }: Props) {
  return (
    <CustomDiv>
      <Card className="shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-thin">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 italic prose-lg dark:prose-invert max-w-none text-muted-foreground text-base/8">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </CustomDiv>
  );
}
```

- [ ] **Step 3: Create BulletListBlock**

Port from current "My Responsibilities" card (lines 176-185):

```tsx
// src/components/project/blocks/BulletListBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { BulletListBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: BulletListBlockData;
}

export function BulletListBlock({ title, data }: Props) {
  return (
    <CustomDiv>
      <Card className="shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-thin">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {data.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </CustomDiv>
  );
}
```

- [ ] **Step 4: Create GalleryBlock**

Port from current gallery section (lines 132-157). Needs `"use client"` for LightGallery:

```tsx
// src/components/project/blocks/GalleryBlock.tsx
"use client";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import CustomDiv from "@/components/CustomDiv";
import type { GalleryBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: GalleryBlockData;
}

export function GalleryBlock({ title, data }: Props) {
  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {data.images.map((image, index) => (
            <a
              href={image.src}
              key={index}
              className={`relative block group overflow-hidden rounded-none shadow-2xl hover:shadow-gray-300 shadow-gray-200 transition-all transition-300 dark:shadow-none ${index >= 5 ? "hidden" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-[4/3] object-cover shadow-md border"
              />
              {index === 4 && data.images.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold cursor-pointer transition-colors duration-300 group-hover:bg-black/70">
                  +{data.images.length - 5}
                </div>
              )}
            </a>
          ))}
        </LightGallery>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 5: Create ChallengeSolutionBlock**

Port from current challenges section (lines 190-203):

```tsx
// src/components/project/blocks/ChallengeSolutionBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { ChallengeSolutionBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: ChallengeSolutionBlockData;
}

export function ChallengeSolutionBlock({ title, data }: Props) {
  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <div className="space-y-8">
          {data.pairs.map((item, index) => (
            <Card key={index} className="shadow-xl border-none">
              <CardHeader>
                <CardTitle className="text-xl">{item.challenge}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 6: Create SkillsBlock**

Port from current skills section (lines 207-230):

```tsx
// src/components/project/blocks/SkillsBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { SkillsBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: SkillsBlockData;
}

export function SkillsBlock({ title, data }: Props) {
  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-xl border-none">
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {data.hardSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="shadow-xl border-none">
            <CardHeader>
              <CardTitle>Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {data.softSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 7: Create FeaturedHighlightBlock (new block)**

```tsx
// src/components/project/blocks/FeaturedHighlightBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { FeaturedHighlightBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: FeaturedHighlightBlockData;
}

export function FeaturedHighlightBlock({ title, data }: Props) {
  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <div className="space-y-10">
          {data.items.map((item, index) => (
            <Card key={index} className="shadow-xl border-none overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <h3 className="text-2xl font-semibold mb-4">{item.heading}</h3>
                  <p className="text-muted-foreground text-base/7">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 8: Create ImageTextBlock (new block)**

```tsx
// src/components/project/blocks/ImageTextBlock.tsx
import { Card, CardContent } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { ImageTextBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: ImageTextBlockData;
}

export function ImageTextBlock({ title, data }: Props) {
  const imageFirst = data.layout === "image-left";

  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <Card className="shadow-xl border-none overflow-hidden">
          <CardContent className="p-0">
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${imageFirst ? "" : "direction-rtl"}`}>
              <div className={`${imageFirst ? "" : "lg:order-2"}`}>
                <img
                  src={data.image.src}
                  alt={data.image.alt}
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
              <div className={`flex items-center p-8 ${imageFirst ? "" : "lg:order-1"}`}>
                <p className="text-muted-foreground text-base/7">{data.text}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 9: Create RichTextBlock (new block)**

```bash
npm install react-markdown
```

```tsx
// src/components/project/blocks/RichTextBlock.tsx
"use client";

import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomDiv from "@/components/CustomDiv";
import type { RichTextBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: RichTextBlockData;
}

export function RichTextBlock({ title, data }: Props) {
  return (
    <CustomDiv>
      <Card className="shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-thin">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </CustomDiv>
  );
}
```

- [ ] **Step 10: Create EmbedBlock (new block)**

```tsx
// src/components/project/blocks/EmbedBlock.tsx
import CustomDiv from "@/components/CustomDiv";
import type { EmbedBlockData } from "@/lib/types";

interface Props {
  title: string;
  data: EmbedBlockData;
}

export function EmbedBlock({ title, data }: Props) {
  const embedUrl =
    data.type === "youtube"
      ? data.url.replace("watch?v=", "embed/")
      : data.url;

  return (
    <div>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin">{title}</h2>
      </CustomDiv>
      <CustomDiv>
        <div className="h-7" />
      </CustomDiv>
      <CustomDiv>
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            className="w-full h-full border shadow-xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CustomDiv>
    </div>
  );
}
```

- [ ] **Step 11: Verify all blocks compile**

```bash
npm run dev
```

Expected: No compilation errors.

- [ ] **Step 12: Commit**

```bash
git add src/components/project/
git commit -m "feat: add BlockRenderer and all 9 block components for project pages"
```

---

## Chunk 6: Page Migration

### Task 11: Root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Set up root layout**

Port the `Layout` component from the current `App.tsx` and the `ThemeProvider`:

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "@fontsource/inter/variable.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarAnimation from "@/components/header/NavbarAnimation";

export const metadata: Metadata = {
  title: "Saad H. Zubairi | Software Engineer",
  description:
    "Full-stack engineer with proven track record in architecting and optimizing scalable, high-performance web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="vite-ui-theme"
        >
          <div className="bg-radial-grid min-h-screen flex flex-col">
            <NavbarAnimation isVisible={true} />
            <div className="relative flex-grow w-full">
              <div
                aria-hidden
                className="hidden xl:block pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-100 dark:border-gray-900 left-[calc(50%-36rem-2.5rem)]"
              />
              <div
                aria-hidden
                className="hidden xl:block pointer-events-none bg-textured-rails absolute inset-y-0 w-10 border-l border-r border-gray-100 dark:border-gray-900 left-[calc(50%+36rem)]"
              />
              <main className="w-full mx-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Note: The `ThemeProvider` may need `next-themes` instead of the current Vite-based theme provider. Check if the existing `theme-provider.tsx` uses `next-themes` — if not, install it:

```bash
npm install next-themes
```

And update `theme-provider.tsx` to use `next-themes` `ThemeProvider`.

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: set up root layout with theme provider, navbar, and decorative pillars"
```

---

### Task 12: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create home page**

```tsx
// src/app/page.tsx
import Home from "@/components/home/Home";
import HeroAtAGlance from "@/components/about/HeroAtAGlance";
import BentoGrid from "@/components/about/BentoGrid";
import { ProjectH } from "@/components/projectHighlights/ProjectH";
import Connect from "@/components/connect/Connect";

export default function HomePage() {
  return (
    <>
      <Home />
      <HeroAtAGlance />
      <BentoGrid />
      <ProjectH />
      <Connect />
    </>
  );
}
```

- [ ] **Step 2: Verify home page renders**

```bash
npm run dev
```

Open `http://localhost:3000` — should display the home page matching the current Vite site.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add home page with all existing sections"
```

---

### Task 13: Portfolio listing page

**Files:**
- Create: `src/app/portfolio/page.tsx`
- Modify: `src/components/portfolio/PortfolioPage.tsx` (new version)
- Copy: `src/components/portfolio/ProjectCard.tsx`

- [ ] **Step 1: Create the server component page**

```tsx
// src/app/portfolio/page.tsx
import { getProjects } from "@/lib/queries/getProjects";
import { getCategories } from "@/lib/queries/getCategories";
import PortfolioPage from "@/components/portfolio/PortfolioPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Saad H. Zubairi",
  description: "Some interesting projects that kept me occupied",
};

export const revalidate = 3600; // ISR: revalidate every hour

export default async function PortfolioRoute() {
  const [categories, projects] = await Promise.all([
    getCategories(),
    getProjects(),
  ]);

  return <PortfolioPage categories={categories} projects={projects} />;
}
```

- [ ] **Step 2: Rewrite PortfolioPage as a client component that receives data via props**

The new `PortfolioPage.tsx` should:
- Accept `categories` and `projects` as props (no more static JSON imports)
- Render tabs dynamically from categories sorted by `sortOrder`
- For `"cms"` categories: render `ProjectCard` for each project in that category
- For `"static"` categories: import game JSON files and render them (same as current behavior)
- Keep existing animations and styling

Key changes from current version:
- Remove all static JSON imports (`import hoops from '...'`)
- Remove hardcoded tab arrays
- Accept props from server component

- [ ] **Step 3: Update ProjectCard for Next.js**

Port the existing `ProjectCard.tsx`:
- Replace `useNavigate` with `useRouter` from `next/navigation`
- Replace `navigate()` calls with `router.push()`
- Add `"use client"` directive

- [ ] **Step 4: Verify portfolio page renders**

```bash
npm run dev
```

Open `http://localhost:3000/portfolio` — should display project cards in the correct category tabs.

- [ ] **Step 5: Commit**

```bash
git add src/app/portfolio/ src/components/portfolio/
git commit -m "feat: add portfolio listing page with dynamic categories from MongoDB"
```

---

### Task 14: Project detail page (block-based)

**Files:**
- Create: `src/app/portfolio/project/[slug]/page.tsx`
- Create: `src/components/project/HeroSection.tsx`
- Create: `src/components/project/ProjectNavigation.tsx`

- [ ] **Step 1: Create the server component page**

```tsx
// src/app/portfolio/project/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProject } from "@/lib/queries/getProject";
import { getProjects } from "@/lib/queries/getProjects";
import { HeroSection } from "@/components/project/HeroSection";
import { BlockRenderer } from "@/components/project/blocks/BlockRenderer";
import { ProjectNavigation } from "@/components/project/ProjectNavigation";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Saad H. Zubairi`,
    description: project.subtitle,
    openGraph: {
      title: project.title,
      description: project.subtitle,
      images: [project.heroImage.src],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const enabledSections = project.sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="pt-24 pb-12 sm:pb-16">
      <HeroSection project={project} />

      {enabledSections.map((section) => (
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

- [ ] **Step 2: Create HeroSection**

Port the hero image section from current `ProjectPage.tsx` (lines 78-131):

```tsx
// src/components/project/HeroSection.tsx
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomDiv from "@/components/CustomDiv";
import type { Project } from "@/lib/types";

interface Props {
  project: Project;
}

export function HeroSection({ project }: Props) {
  return (
    <>
      <CustomDiv>
        <div className="relative">
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            className="w-full h-auto shadow-2xl border aspect-auto object-cover"
          />
          <div className="absolute -bottom-6 left-4 right-4 flex items-end justify-between gap-3 z-10">
            <div className="max-w-[55%]">
              <div className="rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-4 py-2.5 shadow-lg border border-white/50 dark:border-gray-700/50">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 leading-snug">
                  {project.subtitle}
                </p>
              </div>
            </div>
            <div className="max-w-[50%]">
              <div className="rounded-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-3 py-2.5 shadow-lg border border-white/50 dark:border-gray-700/50">
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {[
                    ...project.techStack.frameworks,
                    ...project.techStack.database,
                    ...project.techStack.tools,
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-900 dark:bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-white dark:text-gray-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomDiv>
      <CustomDiv>
        <div className="h-12" />
      </CustomDiv>
      <CustomDiv>
        <div className="text-center">
          <div className="flex justify-center gap-4">
            {project.links.github && (
              <Button variant="secondary" asChild>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
            )}
            {project.links.liveDemo && (
              <Button variant="secondary" asChild>
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </CustomDiv>
    </>
  );
}
```

- [ ] **Step 3: Create ProjectNavigation**

Computes previous/next projects dynamically from MongoDB:

```tsx
// src/components/project/ProjectNavigation.tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomDiv from "@/components/CustomDiv";
import Link from "next/link";
import { getProjects } from "@/lib/queries/getProjects";

interface Props {
  currentSlug: string;
  category: string;
}

export async function ProjectNavigation({ currentSlug, category }: Props) {
  const projects = await getProjects(category);
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <CustomDiv>
      <nav className="flex justify-between items-center border">
        {previousProject ? (
          <Button variant="outline" asChild>
            <Link href={`/portfolio/project/${previousProject.slug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {previousProject.title}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" /> No Previous Project
          </Button>
        )}
        {nextProject ? (
          <Button variant="outline" asChild>
            <Link href={`/portfolio/project/${nextProject.slug}`}>
              {nextProject.title} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            No Next Project <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </nav>
    </CustomDiv>
  );
}
```

- [ ] **Step 4: Verify project page renders**

```bash
npm run dev
```

Open `http://localhost:3000/portfolio/project/hoops` — should render the hero section and all content blocks.

- [ ] **Step 5: Commit**

```bash
git add src/app/portfolio/project/ src/components/project/
git commit -m "feat: add project detail page with block-based rendering from MongoDB"
```

---

### Task 15: Game project page route

**Files:**
- Create: `src/app/portfolio/project/game/[projectId]/page.tsx`

- [ ] **Step 1: Create game project route**

This is a thin wrapper that renders the existing `GameProjectPage` component as-is:

```tsx
// src/app/portfolio/project/game/[projectId]/page.tsx
import GameProjectPage from "@/components/ProjectPage/GameProjectPage/GameProjectPage";

export default function GameProjectRoute() {
  return <GameProjectPage />;
}
```

The `GameProjectPage` component already handles its own data loading via dynamic imports. It just needs the `"use client"` directive and updated router imports (done in Task 2).

- [ ] **Step 2: Verify game project page**

```bash
npm run dev
```

Open `http://localhost:3000/portfolio/project/game/pixelcut` — should render the game project page.

- [ ] **Step 3: Commit**

```bash
git add src/app/portfolio/project/game/
git commit -m "feat: add game project page route (JSON-based, unchanged)"
```

---

## Chunk 7: SEO, Sitemap & Final Cleanup

### Task 16: Sitemap and SEO

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create sitemap generator**

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getProjects } from "@/lib/queries/getProjects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectUrls = projects.map((project) => ({
    url: `https://saadhzubairi.com/portfolio/project/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://saadhzubairi.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://saadhzubairi.com/portfolio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add automatic sitemap generation for SEO"
```

---

### Task 17: Build and deploy verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. Static pages are generated for all project pages.

- [ ] **Step 2: Run production server locally**

```bash
npm run start
```

Verify:
- Home page renders at `/`
- Portfolio page renders at `/portfolio` with correct category tabs
- A project page renders at `/portfolio/project/hoops` with all blocks
- A game project page renders at `/portfolio/project/game/pixelcut`
- API routes return data: `curl http://localhost:3000/api/projects`

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel
```

Set environment variables in Vercel dashboard:
- `MONGODB_URI`
- `CMS_API_KEY`

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: portfolio backend migration complete — Next.js + MongoDB + block rendering"
```
