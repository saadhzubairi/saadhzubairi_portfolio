# Portfolio CMS: Local-Only Admin App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone local-only Next.js CMS app that manages portfolio projects in MongoDB Atlas with a block-based editor, drag-and-drop section reordering, and live preview.

**Architecture:** Next.js App Router with its own API routes talking directly to MongoDB Atlas via Mongoose. Editor uses a two-panel layout: left panel for editing (core metadata + draggable section list with inline block editors), right panel for live preview. Publishing triggers ISR revalidation on the deployed portfolio site.

**Tech Stack:** Next.js 14+, React 18, TypeScript, Mongoose 8+, Tailwind CSS 3.4, shadcn/ui, React Hook Form + Zod, dnd-kit, React Query (TanStack Query), react-markdown

**Spec:** `docs/superpowers/specs/2026-05-25-portfolio-cms-design.md`

**Prerequisite:** The portfolio backend (Plan 1) must be deployed with the `/api/cms/revalidate` endpoint live for the publish workflow to work. The CMS can be built and used for content editing before that.

---

## Chunk 1: CMS Project Initialization

### Task 1: Initialize Next.js project

**Files:**
- Create: `portfolio-cms/` (new project directory, sibling to portfolio)

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/saadhzubairi/Work/Personal_Projects/
npx create-next-app@latest portfolio-cms --typescript --tailwind --eslint --app --src-dir --no-import-alias --no-turbopack
```

Import alias: `@/*` → `./src/*`

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/saadhzubairi/Work/Personal_Projects/portfolio-cms
npm install mongoose @tanstack/react-query react-hook-form @hookform/resolvers zod @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-markdown lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-tabs class-variance-authority clsx tailwind-merge tailwindcss-animate
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Then add needed components:

```bash
npx shadcn@latest add button card dialog dropdown-menu input label select switch tabs textarea badge table
```

- [ ] **Step 4: Set up environment variables**

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
PORTFOLIO_URL=https://your-portfolio.vercel.app
CMS_API_KEY=<same-key-as-portfolio>
```

- [ ] **Step 5: Configure dev server port**

In `package.json`, update the dev script:

```json
"dev": "next dev -p 3001"
```

- [ ] **Step 6: Verify the project starts**

```bash
npm run dev
```

Expected: Next.js dev server starts on port 3001.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: initialize CMS project with all dependencies"
```

---

### Task 2: MongoDB connection + shared models + types

**Files:**
- Create: `src/lib/mongodb.ts`
- Create: `src/lib/types.ts`
- Create: `src/lib/models/Project.ts`
- Create: `src/lib/models/Category.ts`

- [ ] **Step 1: Copy shared files from portfolio project**

These files are identical to the portfolio backend. Copy them:

```bash
SRC=/Users/saadhzubairi/Work/Personal_Projects/portfolio-nextjs/src/lib
DEST=/Users/saadhzubairi/Work/Personal_Projects/portfolio-cms/src/lib

cp "$SRC/mongodb.ts" "$DEST/"
cp "$SRC/types.ts" "$DEST/"
mkdir -p "$DEST/models"
cp "$SRC/models/Project.ts" "$DEST/models/"
cp "$SRC/models/Category.ts" "$DEST/models/"
```

- [ ] **Step 2: Verify connection**

Create a quick test: navigate to `http://localhost:3001/api/test` (temporary route to confirm DB connection works). Remove after verification.

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add MongoDB connection, Mongoose models, and shared types"
```

---

## Chunk 2: CMS API Routes

### Task 3: Zod validation schemas

**Files:**
- Create: `src/lib/validation/project.ts`
- Create: `src/lib/validation/category.ts`

- [ ] **Step 1: Create project validation schemas**

```typescript
// src/lib/validation/project.ts
import { z } from "zod";

const ImageRefSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

const TextBlockSchema = z.object({ paragraphs: z.array(z.string()).min(1) });
const BulletListBlockSchema = z.object({ items: z.array(z.string()).min(1) });
const GalleryBlockSchema = z.object({ images: z.array(ImageRefSchema).min(1) });
const ChallengeSolutionBlockSchema = z.object({
  pairs: z.array(z.object({ challenge: z.string().min(1), solution: z.string().min(1) })).min(1),
});
const SkillsBlockSchema = z.object({ hardSkills: z.array(z.string()), softSkills: z.array(z.string()) });
const FeaturedHighlightBlockSchema = z.object({
  items: z.array(z.object({ image: ImageRefSchema, heading: z.string().min(1), description: z.string().min(1) })).min(1).max(3),
});
const ImageTextBlockSchema = z.object({
  image: ImageRefSchema,
  text: z.string().min(1),
  layout: z.enum(["image-left", "image-right"]),
});
const RichTextBlockSchema = z.object({ content: z.string().min(1) });
const EmbedBlockSchema = z.object({ url: z.string().url(), type: z.enum(["youtube", "iframe"]) });

const SectionBaseSchema = {
  id: z.string(),
  title: z.string().min(1),
  enabled: z.boolean(),
  order: z.number().int().min(0),
};

export const SectionSchema = z.discriminatedUnion("type", [
  z.object({ ...SectionBaseSchema, type: z.literal("text"), data: TextBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("bullet-list"), data: BulletListBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("gallery"), data: GalleryBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("challenge-solution"), data: ChallengeSolutionBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("skills"), data: SkillsBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("featured-highlight"), data: FeaturedHighlightBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("image-text"), data: ImageTextBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("rich-text"), data: RichTextBlockSchema }),
  z.object({ ...SectionBaseSchema, type: z.literal("embed"), data: EmbedBlockSchema }),
]);

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  heroImage: ImageRefSchema,
  status: z.enum(["draft", "published"]),
  category: z.string().min(1),
  sortOrder: z.number().int().min(0),
  links: z.object({
    github: z.string().optional().or(z.literal("")),
    liveDemo: z.string().optional().or(z.literal("")),
  }),
  techStack: z.object({
    frameworks: z.array(z.string()),
    database: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  sections: z.array(SectionSchema),
  // createdAt/updatedAt managed by Mongoose timestamps: true
});

export const CreateProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.string().min(1),
});
```

- [ ] **Step 2: Create category validation schema**

```typescript
// src/lib/validation/category.ts
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  sortOrder: z.number().int().min(0),
  contentSource: z.enum(["cms", "static"]),
  staticConfig: z.object({
    jsonIds: z.array(z.string()),
    routePrefix: z.string(),
  }).optional(),
});
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/validation/
git commit -m "feat: add Zod validation schemas for projects, sections, blocks, and categories"
```

---

### Task 4: Project CRUD API routes

**Files:**
- Create: `src/app/api/projects/route.ts`
- Create: `src/app/api/projects/[slug]/route.ts`
- Create: `src/app/api/projects/[slug]/status/route.ts`

- [ ] **Step 1: GET all + POST create**

```typescript
// src/app/api/projects/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { CreateProjectSchema } from "@/lib/validation/project";

// GET — list all projects (all statuses, for CMS)
export async function GET() {
  await connectToDatabase();
  const projects = await Project.find({})
    .sort({ category: 1, sortOrder: 1 })
    .lean();
  return NextResponse.json({ projects });
}

// POST — create new project
export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const parsed = CreateProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = await Project.create({
    slug: body.slug,
    title: body.title,
    subtitle: body.subtitle || "",
    heroImage: { src: "", alt: "" },
    status: "draft",
    category: body.category,
    sortOrder: body.sortOrder || 0,
    links: { github: "", liveDemo: "" },
    techStack: { frameworks: [], database: [], tools: [] },
    sections: [],
  });

  return NextResponse.json(project, { status: 201 });
}
```

- [ ] **Step 2: GET one, PUT update, DELETE**

```typescript
// src/app/api/projects/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;
  const project = await Project.findOne({ slug }).lean();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;
  const body = await request.json();

  const project = await Project.findOneAndUpdate(
    { slug },
    { ...body, updatedAt: new Date() },
    { new: true, runValidators: true }
  ).lean();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;
  await Project.deleteOne({ slug });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: PATCH status toggle**

```typescript
// src/app/api/projects/[slug]/status/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;
  const { status } = await request.json();

  const project = await Project.findOneAndUpdate(
    { slug },
    { status },
    { new: true }
  ).lean();

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/projects/
git commit -m "feat: add project CRUD API routes"
```

---

### Task 4: Category CRUD API routes

**Files:**
- Create: `src/app/api/categories/route.ts`
- Create: `src/app/api/categories/[slug]/route.ts`

- [ ] **Step 1: GET all + POST create**

```typescript
// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/lib/models/Category";

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find({}).sort({ sortOrder: 1 }).lean();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const category = await Category.create(body);
  return NextResponse.json(category, { status: 201 });
}
```

- [ ] **Step 2: PUT update + DELETE**

```typescript
// src/app/api/categories/[slug]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Project from "@/lib/models/Project";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;
  const body = await request.json();

  const category = await Category.findOneAndUpdate({ slug }, body, {
    new: true,
  }).lean();

  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();
  const { slug } = await params;

  // Check if any projects use this category
  const count = await Project.countDocuments({ category: slug });
  if (count > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${count} projects use this category` },
      { status: 409 }
    );
  }

  await Category.deleteOne({ slug });
  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/categories/
git commit -m "feat: add category CRUD API routes with deletion safety check"
```

---

### Task 5: Revalidation helper

**Files:**
- Create: `src/lib/revalidate.ts`
- Create: `src/app/api/revalidate/route.ts`

- [ ] **Step 1: Create revalidation helper**

```typescript
// src/lib/revalidate.ts
export async function triggerPortfolioRevalidation(slug?: string) {
  const portfolioUrl = process.env.PORTFOLIO_URL;
  const apiKey = process.env.CMS_API_KEY;

  if (!portfolioUrl || !apiKey) {
    console.warn("PORTFOLIO_URL or CMS_API_KEY not set, skipping revalidation");
    return { revalidated: false, reason: "Missing env vars" };
  }

  const paths = ["/portfolio"];
  if (slug) {
    paths.push(`/portfolio/project/${slug}`);
  }

  const response = await fetch(`${portfolioUrl}/api/cms/revalidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ paths }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Revalidation failed:", text);
    return { revalidated: false, reason: text };
  }

  return await response.json();
}
```

- [ ] **Step 2: Create revalidation API route**

```typescript
// src/app/api/revalidate/route.ts
import { NextResponse } from "next/server";
import { triggerPortfolioRevalidation } from "@/lib/revalidate";

export async function POST(request: Request) {
  const { slug } = await request.json();
  const result = await triggerPortfolioRevalidation(slug);
  return NextResponse.json(result);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/revalidate.ts src/app/api/revalidate/
git commit -m "feat: add portfolio ISR revalidation trigger"
```

---

## Chunk 3: Dashboard Page

### Task 6: React Query provider setup

**Files:**
- Create: `src/components/providers/QueryProvider.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create QueryProvider**

```tsx
// src/components/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

- [ ] **Step 2: Update root layout**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Portfolio CMS",
  description: "Local CMS for portfolio management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="min-h-screen bg-background">
            <header className="border-b px-6 py-4">
              <h1 className="text-xl font-semibold">Portfolio CMS</h1>
            </header>
            <main className="p-6">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/providers/ src/app/layout.tsx
git commit -m "feat: add React Query provider and CMS root layout"
```

---

### Task 7: API client hooks

**Files:**
- Create: `src/lib/api.ts`

- [ ] **Step 1: Create API client with React Query hooks**

```typescript
// src/lib/api.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project, Category } from "@/lib/types";

const API_BASE = "/api";

// ── Fetchers ──

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ── Projects ──

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchJSON<{ projects: Project[] }>("/projects"),
    select: (data) => data.projects,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchJSON<Project>(`/projects/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; slug: string; category: string }) =>
      fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Project>) =>
      fetch(`${API_BASE}/projects/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project", slug] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) =>
      fetch(`${API_BASE}/projects/${slug}`, { method: "DELETE" }).then((r) =>
        r.json()
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useToggleProjectStatus(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (status: "draft" | "published") =>
      fetch(`${API_BASE}/projects/${slug}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["project", slug] });
    },
  });
}

// ── Categories ──

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchJSON<{ categories: Category[] }>("/categories"),
    select: (data) => data.categories,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Category>) =>
      fetch(`${API_BASE}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useUpdateCategory(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Category>) =>
      fetch(`${API_BASE}/categories/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) =>
      fetch(`${API_BASE}/categories/${slug}`, { method: "DELETE" }).then((r) =>
        r.json()
      ),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });
}

// ── Revalidation ──

export function useRevalidate() {
  return useMutation({
    mutationFn: (slug?: string) =>
      fetch(`${API_BASE}/revalidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).then((r) => r.json()),
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/api.ts
git commit -m "feat: add React Query API client with hooks for projects, categories, revalidation"
```

---

### Task 8: Dashboard page

**Files:**
- Create: `src/app/page.tsx` (dashboard)
- Create: `src/components/dashboard/ProjectTable.tsx`
- Create: `src/components/dashboard/CreateProjectDialog.tsx`
- Create: `src/components/shared/StatusBadge.tsx`
- Create: `src/components/shared/ConfirmDialog.tsx`

- [ ] **Step 1: Create StatusBadge**

```tsx
// src/components/shared/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  return (
    <Badge variant={status === "published" ? "default" : "secondary"}>
      {status}
    </Badge>
  );
}
```

- [ ] **Step 2: Create ConfirmDialog**

```tsx
// src/components/shared/ConfirmDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  destructive,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={destructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 3: Create CreateProjectDialog**

```tsx
// src/components/dashboard/CreateProjectDialog.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProject, useCategories } from "@/lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function CreateProjectDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const { data: categories } = useCategories();
  const createProject = useCreateProject();

  const cmsCategories = categories?.filter((c) => c.contentSource === "cms") || [];

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async () => {
    await createProject.mutateAsync({ title, slug, category });
    onOpenChange(false);
    router.push(`/editor/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Awesome Project"
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-project"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {cmsCategories.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !slug || !category || createProject.isPending}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

Note: This uses the shadcn Select component. Make sure it's installed:

```bash
npx shadcn@latest add select
```

- [ ] **Step 4: Create ProjectTable**

```tsx
// src/components/dashboard/ProjectTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useQueryClient } from "@tanstack/react-query";
import {
  useProjects,
  useDeleteProject,
  useRevalidate,
} from "@/lib/api";

export function ProjectTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const revalidate = useRevalidate();
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.slug}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell>
                {new Date(project.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/editor/${project.slug}`)}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        const newStatus =
                          project.status === "published" ? "draft" : "published";
                        await fetch(`/api/projects/${project.slug}/status`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ status: newStatus }),
                        });
                        queryClient.invalidateQueries({ queryKey: ["projects"] });
                        if (newStatus === "published") {
                          await revalidate.mutateAsync(project.slug);
                        }
                      }}
                    >
                      {project.status === "published" ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" /> Unpublish
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" /> Publish
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDeleteSlug(project.slug)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={!!deleteSlug}
        onOpenChange={() => setDeleteSlug(null)}
        title="Delete Project"
        description="This will permanently delete this project. This action cannot be undone."
        destructive
        onConfirm={async () => {
          if (deleteSlug) {
            await deleteProject.mutateAsync(deleteSlug);
          }
        }}
      />
    </>
  );
}
```

- [ ] **Step 5: Create dashboard page**

```tsx
// src/app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectTable } from "@/components/dashboard/ProjectTable";
import { CreateProjectDialog } from "@/components/dashboard/CreateProjectDialog";
import Link from "next/link";

export default function DashboardPage() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/categories">
            <Button variant="outline">Manage Categories</Button>
          </Link>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      <ProjectTable />

      <CreateProjectDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
```

- [ ] **Step 6: Verify dashboard renders**

```bash
npm run dev
```

Open `http://localhost:3001` — should display the project table with data from MongoDB.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add dashboard page with project table, create dialog, and status toggling"
```

---

## Chunk 4: Project Editor — Core Metadata & Section List

### Task 9: Editor page layout

**Files:**
- Create: `src/app/editor/[slug]/page.tsx`
- Create: `src/components/editor/CoreMetadataForm.tsx`
- Create: `src/components/editor/TechStackEditor.tsx`
- Create: `src/components/editor/EditorToolbar.tsx`

- [ ] **Step 1: Create editor page**

This is the main editor page with the two-panel layout. Uses React Hook Form at the top level to manage the full project state. Left panel: editor, right panel: live preview.

```tsx
// src/app/editor/[slug]/page.tsx
"use client";

import { use } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useProject, useUpdateProject, useRevalidate } from "@/lib/api";
import { CoreMetadataForm } from "@/components/editor/CoreMetadataForm";
import { TechStackEditor } from "@/components/editor/TechStackEditor";
import { SectionList } from "@/components/editor/SectionList";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { LivePreview } from "@/components/editor/LivePreview";
import type { Project } from "@/lib/types";

export default function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading } = useProject(slug);
  const updateProject = useUpdateProject(slug);
  const revalidate = useRevalidate();

  const methods = useForm<Project>();

  useEffect(() => {
    if (project) {
      methods.reset(project);
    }
  }, [project, methods]);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!project) return <div className="p-8">Project not found</div>;

  const handleSave = async (status?: "draft" | "published") => {
    const values = methods.getValues();
    if (status) values.status = status;
    await updateProject.mutateAsync(values);
    if (status === "published") {
      await revalidate.mutateAsync(slug);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <EditorToolbar
          slug={slug}
          onSave={() => handleSave()}
          onPublish={() => handleSave("published")}
          isSaving={updateProject.isPending}
        />

        <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
          {/* Left panel: Editor */}
          <div className="overflow-y-auto border-r p-6 space-y-8">
            <CoreMetadataForm />
            <TechStackEditor />
            <SectionList />
          </div>

          {/* Right panel: Live Preview */}
          <div className="overflow-y-auto bg-muted/30 p-6">
            <LivePreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
```

- [ ] **Step 2: Create EditorToolbar**

```tsx
// src/components/editor/EditorToolbar.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  slug: string;
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
}

export function EditorToolbar({ slug, onSave, onPublish, isSaving }: Props) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <span className="text-muted-foreground">Editing: {slug}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" /> Save Draft
        </Button>
        <Button onClick={onPublish} disabled={isSaving}>
          <Upload className="mr-2 h-4 w-4" /> Publish
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create CoreMetadataForm**

```tsx
// src/components/editor/CoreMetadataForm.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/lib/api";
import type { Project } from "@/lib/types";

export function CoreMetadataForm() {
  const { register, setValue, watch } = useFormContext<Project>();
  const { data: categories } = useCategories();
  const cmsCategories = categories?.filter((c) => c.contentSource === "cms") || [];
  const currentCategory = watch("category");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Core Metadata</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
        </div>
        <div>
          <Label>Slug</Label>
          <Input {...register("slug")} disabled className="bg-muted" />
        </div>
      </div>

      <div>
        <Label>Subtitle</Label>
        <Input {...register("subtitle")} />
      </div>

      <div>
        <Label>Category</Label>
        <Select
          value={currentCategory}
          onValueChange={(val) => setValue("category", val)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cmsCategories.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Hero Image Path</Label>
          <Input {...register("heroImage.src")} placeholder="/Projects/..." />
        </div>
        <div>
          <Label>Hero Image Alt</Label>
          <Input {...register("heroImage.alt")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>GitHub URL</Label>
          <Input {...register("links.github")} placeholder="https://github.com/..." />
        </div>
        <div>
          <Label>Live Demo URL</Label>
          <Input {...register("links.liveDemo")} placeholder="https://..." />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create TechStackEditor**

```tsx
// src/components/editor/TechStackEditor.tsx
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Project } from "@/lib/types";

function TagInput({
  label,
  fieldName,
}: {
  label: string;
  fieldName: "techStack.frameworks" | "techStack.database" | "techStack.tools";
}) {
  const { watch, setValue } = useFormContext<Project>();
  const [input, setInput] = useState("");
  const tags = watch(fieldName) || [];

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setValue(fieldName, [...tags, trimmed]);
      setInput("");
    }
  };

  const removeTag = (index: number) => {
    setValue(
      fieldName,
      tags.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeTag(i)}
            />
          </Badge>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder={`Add ${label.toLowerCase()}...`}
      />
    </div>
  );
}

export function TechStackEditor() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tech Stack</h3>
      <TagInput label="Frameworks" fieldName="techStack.frameworks" />
      <TagInput label="Database" fieldName="techStack.database" />
      <TagInput label="Tools" fieldName="techStack.tools" />
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/editor/ src/components/editor/
git commit -m "feat: add project editor page with core metadata form and tech stack editor"
```

---

### Task 10: Section list with drag-and-drop

**Files:**
- Create: `src/components/editor/SectionList.tsx`
- Create: `src/components/editor/SectionItem.tsx`
- Create: `src/components/editor/AddSectionMenu.tsx`
- Create: `src/components/editor/SectionEditor.tsx`

- [ ] **Step 1: Create AddSectionMenu**

Dropdown menu listing all 9 block types. Clicking one creates a new section with that type, appended at the end.

```tsx
// src/components/editor/AddSectionMenu.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Type, List, Image, HelpCircle, Award, Star, Columns, FileText, Play } from "lucide-react";
import type { BlockType } from "@/lib/types";

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: React.ReactNode; description: string }[] = [
  { type: "text", label: "Text", icon: <Type className="h-4 w-4" />, description: "Paragraphs of prose" },
  { type: "bullet-list", label: "Bullet List", icon: <List className="h-4 w-4" />, description: "Bulleted list of items" },
  { type: "gallery", label: "Gallery", icon: <Image className="h-4 w-4" />, description: "Image grid with lightbox" },
  { type: "challenge-solution", label: "Challenge & Solution", icon: <HelpCircle className="h-4 w-4" />, description: "Problem/solution pairs" },
  { type: "skills", label: "Skills", icon: <Award className="h-4 w-4" />, description: "Technical + soft skills" },
  { type: "featured-highlight", label: "Featured Highlight", icon: <Star className="h-4 w-4" />, description: "Spotlight screenshots" },
  { type: "image-text", label: "Image + Text", icon: <Columns className="h-4 w-4" />, description: "Image alongside text" },
  { type: "rich-text", label: "Rich Text", icon: <FileText className="h-4 w-4" />, description: "Markdown content" },
  { type: "embed", label: "Embed", icon: <Play className="h-4 w-4" />, description: "YouTube / iframe" },
];

interface Props {
  onAdd: (type: BlockType) => void;
}

export function AddSectionMenu({ onAdd }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {BLOCK_OPTIONS.map((opt) => (
          <DropdownMenuItem key={opt.type} onClick={() => onAdd(opt.type)}>
            <span className="mr-3">{opt.icon}</span>
            <div>
              <div className="font-medium">{opt.label}</div>
              <div className="text-xs text-muted-foreground">{opt.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

- [ ] **Step 2: Create SectionItem**

A single row in the section list with drag handle, title, toggle, expand/collapse, and delete:

```tsx
// src/components/editor/SectionItem.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Section } from "@/lib/types";

interface Props {
  section: Section;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleEnabled: (enabled: boolean) => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export function SectionItem({
  section,
  isExpanded,
  onToggleExpand,
  onToggleEnabled,
  onDelete,
  children,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg ${section.enabled ? "" : "opacity-50"}`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <button {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </button>
        <button onClick={onToggleExpand} className="flex-1 flex items-center gap-2 text-left">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="font-medium">{section.title}</span>
          <Badge variant="outline" className="text-xs">
            {section.type}
          </Badge>
        </button>
        <Switch
          checked={section.enabled}
          onCheckedChange={onToggleEnabled}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {isExpanded && (
        <div className="border-t px-4 py-4">{children}</div>
      )}
    </div>
  );
}
```

Note: This uses shadcn Switch. Install it:

```bash
npx shadcn@latest add switch
```

- [ ] **Step 3: Create SectionList**

The main sortable list wrapping all sections with dnd-kit:

```tsx
// src/components/editor/SectionList.tsx
"use client";

import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SectionItem } from "./SectionItem";
import { SectionEditor } from "./SectionEditor";
import { AddSectionMenu } from "./AddSectionMenu";
import type { Project, BlockType, Section } from "@/lib/types";

function getDefaultData(type: BlockType) {
  const defaults: Record<BlockType, any> = {
    text: { paragraphs: [""] },
    "bullet-list": { items: [""] },
    gallery: { images: [] },
    "challenge-solution": { pairs: [{ challenge: "", solution: "" }] },
    skills: { hardSkills: [], softSkills: [] },
    "featured-highlight": {
      items: [{ image: { src: "", alt: "" }, heading: "", description: "" }],
    },
    "image-text": {
      image: { src: "", alt: "" },
      text: "",
      layout: "image-left",
    },
    "rich-text": { content: "" },
    embed: { url: "", type: "youtube" },
  };
  return defaults[type];
}

export function SectionList() {
  const { control, setValue, watch } = useFormContext<Project>();
  const { fields, remove } = useFieldArray({ control, name: "sections" });
  const sections = watch("sections") || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));
    setValue("sections", reordered);
  };

  const addSection = (type: BlockType) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      title: type
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      enabled: true,
      order: sections.length,
      data: getDefaultData(type),
    };
    setValue("sections", [...sections, newSection]);
    setExpandedId(newSection.id);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Sections</h3>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map((section, index) => (
              <SectionItem
                key={section.id}
                section={section}
                isExpanded={expandedId === section.id}
                onToggleExpand={() =>
                  setExpandedId(expandedId === section.id ? null : section.id)
                }
                onToggleEnabled={(enabled) =>
                  setValue(`sections.${index}.enabled`, enabled)
                }
                onDelete={() => remove(index)}
              >
                <SectionEditor index={index} type={section.type} />
              </SectionItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <AddSectionMenu onAdd={addSection} />
    </div>
  );
}
```

- [ ] **Step 4: Create SectionEditor stub**

Routes to the correct block editor based on type. Block editors will be built in the next task:

```tsx
// src/components/editor/SectionEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BlockType, Project } from "@/lib/types";

// Block editor imports — will be created in the next task
import { TextBlockEditor } from "./blocks/TextBlockEditor";
import { BulletListEditor } from "./blocks/BulletListEditor";
import { GalleryEditor } from "./blocks/GalleryEditor";
import { ChallengeSolutionEditor } from "./blocks/ChallengeSolutionEditor";
import { SkillsEditor } from "./blocks/SkillsEditor";
import { FeaturedHighlightEditor } from "./blocks/FeaturedHighlightEditor";
import { ImageTextEditor } from "./blocks/ImageTextEditor";
import { RichTextEditor } from "./blocks/RichTextEditor";
import { EmbedEditor } from "./blocks/EmbedEditor";

const EDITOR_MAP: Record<BlockType, React.FC<{ index: number }>> = {
  text: TextBlockEditor,
  "bullet-list": BulletListEditor,
  gallery: GalleryEditor,
  "challenge-solution": ChallengeSolutionEditor,
  skills: SkillsEditor,
  "featured-highlight": FeaturedHighlightEditor,
  "image-text": ImageTextEditor,
  "rich-text": RichTextEditor,
  embed: EmbedEditor,
};

interface Props {
  index: number;
  type: BlockType;
}

export function SectionEditor({ index, type }: Props) {
  const { register } = useFormContext<Project>();
  const Editor = EDITOR_MAP[type];

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input {...register(`sections.${index}.title`)} />
      </div>
      {Editor && <Editor index={index} />}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/editor/
git commit -m "feat: add section list with drag-and-drop reordering, add/remove/toggle sections"
```

---

## Chunk 5: Block Editors

### Task 11: All 9 block editor components

**Files:**
- Create: `src/components/editor/blocks/TextBlockEditor.tsx`
- Create: `src/components/editor/blocks/BulletListEditor.tsx`
- Create: `src/components/editor/blocks/GalleryEditor.tsx`
- Create: `src/components/editor/blocks/ChallengeSolutionEditor.tsx`
- Create: `src/components/editor/blocks/SkillsEditor.tsx`
- Create: `src/components/editor/blocks/FeaturedHighlightEditor.tsx`
- Create: `src/components/editor/blocks/ImageTextEditor.tsx`
- Create: `src/components/editor/blocks/RichTextEditor.tsx`
- Create: `src/components/editor/blocks/EmbedEditor.tsx`

Each block editor reads/writes to `sections.{index}.data` via React Hook Form's `useFormContext`.

- [ ] **Step 1: TextBlockEditor**

```tsx
// src/components/editor/blocks/TextBlockEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function TextBlockEditor({ index }: { index: number }) {
  const { watch, setValue, register } = useFormContext<Project>();
  const paragraphs: string[] = watch(`sections.${index}.data.paragraphs`) || [];

  return (
    <div className="space-y-3">
      {paragraphs.map((_, i) => (
        <div key={i} className="flex gap-2">
          <Textarea
            {...register(`sections.${index}.data.paragraphs.${i}`)}
            rows={3}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setValue(
                `sections.${index}.data.paragraphs`,
                paragraphs.filter((_, j) => j !== i)
              )
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setValue(`sections.${index}.data.paragraphs`, [...paragraphs, ""])
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Paragraph
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: BulletListEditor**

```tsx
// src/components/editor/blocks/BulletListEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function BulletListEditor({ index }: { index: number }) {
  const { watch, setValue, register } = useFormContext<Project>();
  const items: string[] = watch(`sections.${index}.data.items`) || [];

  return (
    <div className="space-y-2">
      {items.map((_, i) => (
        <div key={i} className="flex gap-2">
          <Input {...register(`sections.${index}.data.items.${i}`)} className="flex-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setValue(`sections.${index}.data.items`, items.filter((_, j) => j !== i))
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setValue(`sections.${index}.data.items`, [...items, ""])}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </div>
  );
}
```

- [ ] **Step 3: GalleryEditor**

```tsx
// src/components/editor/blocks/GalleryEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function GalleryEditor({ index }: { index: number }) {
  const { watch, setValue, register } = useFormContext<Project>();
  const images: { src: string; alt: string }[] =
    watch(`sections.${index}.data.images`) || [];

  return (
    <div className="space-y-3">
      {images.map((_, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-xs">Image Path</Label>
            <Input {...register(`sections.${index}.data.images.${i}.src`)} placeholder="/Projects/..." />
          </div>
          <div className="flex-1">
            <Label className="text-xs">Alt Text</Label>
            <Input {...register(`sections.${index}.data.images.${i}.alt`)} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setValue(`sections.${index}.data.images`, images.filter((_, j) => j !== i))
            }
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setValue(`sections.${index}.data.images`, [...images, { src: "", alt: "" }])
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Image
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: ChallengeSolutionEditor**

```tsx
// src/components/editor/blocks/ChallengeSolutionEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function ChallengeSolutionEditor({ index }: { index: number }) {
  const { watch, setValue, register } = useFormContext<Project>();
  const pairs: { challenge: string; solution: string }[] =
    watch(`sections.${index}.data.pairs`) || [];

  return (
    <div className="space-y-4">
      {pairs.map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <Label className="font-medium">Pair {i + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setValue(`sections.${index}.data.pairs`, pairs.filter((_, j) => j !== i))
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs">Challenge</Label>
            <Input {...register(`sections.${index}.data.pairs.${i}.challenge`)} />
          </div>
          <div>
            <Label className="text-xs">Solution</Label>
            <Textarea {...register(`sections.${index}.data.pairs.${i}.solution`)} rows={3} />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setValue(`sections.${index}.data.pairs`, [
            ...pairs,
            { challenge: "", solution: "" },
          ])
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Pair
      </Button>
    </div>
  );
}
```

- [ ] **Step 5: SkillsEditor**

Reuses the `TagInput` pattern from `TechStackEditor`:

```tsx
// src/components/editor/blocks/SkillsEditor.tsx
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Project } from "@/lib/types";

function SkillTagInput({ label, fieldPath }: { label: string; fieldPath: string }) {
  const { watch, setValue } = useFormContext<Project>();
  const [input, setInput] = useState("");
  const tags: string[] = watch(fieldPath as any) || [];

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary" className="gap-1">
            {tag}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => setValue(fieldPath as any, tags.filter((_, j) => j !== i))}
            />
          </Badge>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = input.trim();
            if (trimmed && !tags.includes(trimmed)) {
              setValue(fieldPath as any, [...tags, trimmed]);
              setInput("");
            }
          }
        }}
        placeholder={`Add ${label.toLowerCase()}...`}
      />
    </div>
  );
}

export function SkillsEditor({ index }: { index: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SkillTagInput label="Technical Skills" fieldPath={`sections.${index}.data.hardSkills`} />
      <SkillTagInput label="Soft Skills" fieldPath={`sections.${index}.data.softSkills`} />
    </div>
  );
}
```

- [ ] **Step 6: FeaturedHighlightEditor**

```tsx
// src/components/editor/blocks/FeaturedHighlightEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";

export function FeaturedHighlightEditor({ index }: { index: number }) {
  const { watch, setValue, register } = useFormContext<Project>();
  const items: any[] = watch(`sections.${index}.data.items`) || [];

  return (
    <div className="space-y-4">
      {items.map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <Label className="font-medium">Highlight {i + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setValue(`sections.${index}.data.items`, items.filter((_, j) => j !== i))
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Image Path</Label>
              <Input {...register(`sections.${index}.data.items.${i}.image.src`)} placeholder="/Projects/..." />
            </div>
            <div>
              <Label className="text-xs">Image Alt</Label>
              <Input {...register(`sections.${index}.data.items.${i}.image.alt`)} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Heading</Label>
            <Input {...register(`sections.${index}.data.items.${i}.heading`)} />
          </div>
          <div>
            <Label className="text-xs">Description</Label>
            <Textarea {...register(`sections.${index}.data.items.${i}.description`)} rows={4} />
          </div>
        </div>
      ))}
      {items.length < 3 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setValue(`sections.${index}.data.items`, [
              ...items,
              { image: { src: "", alt: "" }, heading: "", description: "" },
            ])
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add Highlight (max 3)
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 7: ImageTextEditor**

```tsx
// src/components/editor/blocks/ImageTextEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

export function ImageTextEditor({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext<Project>();
  const layout = watch(`sections.${index}.data.layout`) || "image-left";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label>Image Path</Label>
          <Input {...register(`sections.${index}.data.image.src`)} placeholder="/Projects/..." />
        </div>
        <div>
          <Label>Image Alt</Label>
          <Input {...register(`sections.${index}.data.image.alt`)} />
        </div>
      </div>
      <div>
        <Label>Text</Label>
        <Textarea {...register(`sections.${index}.data.text`)} rows={4} />
      </div>
      <div>
        <Label>Layout</Label>
        <div className="flex gap-2 mt-1">
          <Button
            variant={layout === "image-left" ? "default" : "outline"}
            size="sm"
            onClick={() => setValue(`sections.${index}.data.layout`, "image-left")}
          >
            Image Left
          </Button>
          <Button
            variant={layout === "image-right" ? "default" : "outline"}
            size="sm"
            onClick={() => setValue(`sections.${index}.data.layout`, "image-right")}
          >
            Image Right
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: RichTextEditor**

```tsx
// src/components/editor/blocks/RichTextEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/lib/types";

export function RichTextEditor({ index }: { index: number }) {
  const { register, watch } = useFormContext<Project>();
  const content = watch(`sections.${index}.data.content`) || "";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Markdown</Label>
        <Textarea {...register(`sections.${index}.data.content`)} rows={12} className="font-mono text-sm" />
      </div>
      <div>
        <Label>Preview</Label>
        <div className="border rounded-md p-4 prose dark:prose-invert max-w-none text-sm min-h-[300px]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 9: EmbedEditor**

```tsx
// src/components/editor/blocks/EmbedEditor.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Project } from "@/lib/types";

export function EmbedEditor({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext<Project>();
  const url = watch(`sections.${index}.data.url`) || "";
  const type = watch(`sections.${index}.data.type`) || "youtube";

  const previewUrl =
    type === "youtube" ? url.replace("watch?v=", "embed/") : url;

  return (
    <div className="space-y-4">
      <div>
        <Label>URL</Label>
        <Input {...register(`sections.${index}.data.url`)} placeholder="https://..." />
      </div>
      <div>
        <Label>Type</Label>
        <Select
          value={type}
          onValueChange={(val) => setValue(`sections.${index}.data.type`, val)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="iframe">iFrame</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {url && (
        <div>
          <Label>Preview</Label>
          <div className="aspect-video border rounded-md overflow-hidden">
            <iframe src={previewUrl} className="w-full h-full" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 10: Verify editor compiles and renders**

```bash
npm run dev
```

Open `http://localhost:3001/editor/hoops` — should render the full editor with all sections expandable.

- [ ] **Step 11: Commit**

```bash
git add src/components/editor/blocks/
git commit -m "feat: add all 9 block editor components for the project editor"
```

---

## Chunk 6: Live Preview & Category Manager

### Task 12: Live preview panel

**Files:**
- Create: `src/components/editor/LivePreview.tsx`

- [ ] **Step 1: Create LivePreview**

Renders the project as it would appear on the portfolio. Reads from React Hook Form state (real-time updates as you type):

```tsx
// src/components/editor/LivePreview.tsx
"use client";

import { useFormContext } from "react-hook-form";
import type { Project } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simplified preview renderers for each block type
// These mirror the portfolio's block components but in a compact preview format

function PreviewBlock({ section }: { section: any }) {
  switch (section.type) {
    case "text":
      return (
        <Card className="shadow-md">
          <CardHeader><CardTitle className="text-lg">{section.title}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              {section.data?.paragraphs?.map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </CardContent>
        </Card>
      );

    case "bullet-list":
      return (
        <Card className="shadow-md">
          <CardHeader><CardTitle className="text-lg">{section.title}</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {section.data?.items?.map((item: string, i: number) => <li key={i}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
      );

    case "gallery":
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
          <div className="grid grid-cols-3 gap-2">
            {section.data?.images?.slice(0, 6).map((img: any, i: number) => (
              <div key={i} className="aspect-[4/3] bg-muted rounded border overflow-hidden">
                {img.src && <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
      );

    case "challenge-solution":
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
          <div className="space-y-2">
            {section.data?.pairs?.map((pair: any, i: number) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="pt-4">
                  <p className="font-medium text-sm">{pair.challenge}</p>
                  <p className="text-xs text-muted-foreground mt-1">{pair.solution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "skills":
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
          <div className="grid grid-cols-2 gap-2">
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <p className="font-medium text-xs mb-1">Technical</p>
                <div className="flex flex-wrap gap-1">
                  {section.data?.hardSkills?.map((s: string) => (
                    <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <p className="font-medium text-xs mb-1">Soft</p>
                <div className="flex flex-wrap gap-1">
                  {section.data?.softSkills?.map((s: string) => (
                    <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "featured-highlight":
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
          {section.data?.items?.map((item: any, i: number) => (
            <Card key={i} className="shadow-sm mb-2 overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="aspect-video bg-muted overflow-hidden">
                  {item.image?.src && <img src={item.image.src} alt={item.image.alt} className="w-full h-full object-cover" />}
                </div>
                <CardContent className="pt-4">
                  <p className="font-medium text-sm">{item.heading}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      );

    default:
      return (
        <Card className="shadow-sm">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">[{section.type}] {section.title}</p>
          </CardContent>
        </Card>
      );
  }
}

export function LivePreview() {
  const { watch } = useFormContext<Project>();
  const project = watch();
  const sections = (project.sections || [])
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-muted-foreground">Live Preview</h3>

      {/* Hero preview */}
      {project.heroImage?.src && (
        <div className="relative rounded-lg overflow-hidden border shadow-md">
          <img src={project.heroImage.src} alt={project.heroImage?.alt} className="w-full aspect-video object-cover" />
          <div className="absolute bottom-2 left-2">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur px-3 py-1 rounded text-xs">
              {project.subtitle}
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold">{project.title}</h2>
        <p className="text-sm text-muted-foreground">{project.subtitle}</p>
      </div>

      {/* Section previews */}
      {sections.map((section) => (
        <PreviewBlock key={section.id} section={section} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/LivePreview.tsx
git commit -m "feat: add live preview panel for project editor"
```

---

### Task 13: Category manager page

**Files:**
- Create: `src/app/categories/page.tsx`
- Create: `src/components/categories/CategoryList.tsx`

- [ ] **Step 1: Create CategoryList component**

```tsx
// src/components/categories/CategoryList.tsx
"use client";

import { useState } from "react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

export function CategoryList() {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  if (isLoading) return <div>Loading...</div>;

  const handleCreate = async () => {
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const maxOrder = Math.max(0, ...(categories || []).map((c) => c.sortOrder));
    await createCategory.mutateAsync({
      name: newName,
      slug,
      sortOrder: maxOrder + 1,
      contentSource: "cms",
    });
    setNewName("");
    setCreateOpen(false);
  };

  return (
    <div className="space-y-4">
      {categories?.map((cat) => (
        <Card key={cat.slug}>
          <CardContent className="flex items-center gap-4 py-4">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium flex-1">{cat.name}</span>
            <Badge variant={cat.contentSource === "cms" ? "default" : "secondary"}>
              {cat.contentSource}
            </Badge>
            {cat.contentSource === "cms" && (
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => setDeleteSlug(cat.slug)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full" onClick={() => setCreateOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> New Category
      </Button>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Category Name</Label>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="My Category" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteSlug}
        onOpenChange={() => setDeleteSlug(null)}
        title="Delete Category"
        description="This will delete the category. Projects using it will need to be reassigned."
        destructive
        onConfirm={async () => {
          if (deleteSlug) await deleteCategory.mutateAsync(deleteSlug);
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create categories page**

```tsx
// src/app/categories/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CategoryList } from "@/components/categories/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Categories</h2>
      </div>
      <CategoryList />
    </div>
  );
}
```

- [ ] **Step 3: Verify categories page**

```bash
npm run dev
```

Open `http://localhost:3001/categories` — should list all 4 categories with correct badges.

- [ ] **Step 4: Commit**

```bash
git add src/app/categories/ src/components/categories/
git commit -m "feat: add category manager page with create and delete"
```

---

## Chunk 7: Final Verification & Polish

### Task 14: End-to-end verification

- [ ] **Step 1: Verify full workflow**

Run the CMS:

```bash
npm run dev
```

Test the complete workflow:
1. Dashboard loads with all seeded projects
2. Click "New Project" → create a test project
3. Editor loads → fill in metadata, tech stack
4. Add sections: text, gallery, featured highlight
5. Reorder sections via drag-and-drop
6. Toggle a section off → verify it disappears from preview
7. Preview updates in real-time
8. Click "Save Draft" → verify data persists on page reload
9. Click "Publish" → verify revalidation triggers (may fail if portfolio not deployed yet — that's OK)
10. Go back to dashboard → verify project appears with correct status
11. Delete the test project → verify it's removed

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: portfolio CMS complete — dashboard, block editor, live preview, category manager"
```
