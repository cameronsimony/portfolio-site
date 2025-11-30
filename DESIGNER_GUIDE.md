# Portfolio Site - Designer's Coding Guide

A reference guide for product designers learning to code with Next.js and Tailwind CSS.

---

## 📚 Project Documentation

### About `AGENTS.md`

This project includes an **`AGENTS.md`** file that serves as a comprehensive guide for AI agents (like those in Cursor) working on this codebase.

**What it contains:**
- Project structure and overview
- Development guidelines and code style standards
- Vercel's Web Interface Guidelines (accessibility, performance, interactions, animation, layout, content, and design best practices)
- Common tasks and patterns
- Key files to reference

**How AI agents use it:**
When you're working with AI assistance in Cursor, the AI agent automatically references `AGENTS.md` to:
- Understand the project structure and conventions
- Follow established code style and patterns
- Apply accessibility and performance best practices
- Maintain consistency with existing code
- Make informed decisions about implementation details

**For designers:**
You don't need to read `AGENTS.md` yourself—it's primarily for the AI agents helping you code. However, if you're curious about the technical standards and best practices being applied to your site, feel free to take a look! The guidelines ensure your portfolio site is accessible, performant, and follows modern web standards.

---

## 📐 Layout & Structure

### Next.js File Structure

**`layout.tsx`** = Global wrapper (master template)
- Wraps every page in your app
- Contains `<html>` and `<body>` tags
- Use for: fonts, global styles, navigation, footers, metadata
- Think of it as your "frame" that stays consistent

**`page.tsx`** = Individual page content
- The actual content that changes per page
- Gets inserted where `{children}` is in the layout
- This is where your hero section, projects, etc. live

**Analogy:**
```
layout.tsx = Your artboard/frame
page.tsx = Your actual design/content
Tailwind classes = Your design system tokens
```

---

## 🎨 Tailwind CSS - Layout Classes

### Centered Content Column

To create a centered content column (like a max-width container in Figma):

```tsx
<main className="mx-auto max-w-[692px] px-6 py-12">
  {/* All sections go here */}
</main>
```

**Breakdown:**
- `mx-auto` = Centers horizontally (auto left/right margins)
- `max-w-[692px]` = Constrains width to 692px (or use presets like `max-w-2xl`, `max-w-3xl`)
- `px-6` = 24px horizontal padding
- `py-12` = 48px vertical padding

**Key Point:** Put this on the parent container (`<main>`) so all child sections automatically respect the centered column.

### Common Tailwind Layout Classes

**Container/Spacing:**
- `mx-auto` = Center horizontally
- `max-w-[value]` = Maximum width constraint
- `px-*` = Horizontal padding (left/right)
- `py-*` = Vertical padding (top/bottom)
- `p-*` = Padding on all sides
- `m-*` = Margin on all sides

**Flexbox Layout:**
- `flex` = Make this a flexbox container
- `flex-col` = Stack children vertically
- `flex-row` = Arrange children horizontally
- `gap-*` = Space between flex children
- `items-start` = Align items to start
- `items-center` = Align items to center
- `justify-between` = Space items apart

**Responsive Design:**
- `md:flex-row` = On medium screens and up, use flex-row
- `sm:py-16` = On small screens and up, use py-16
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)

---

## 📝 Typography

### Font Sizes

- `text-base` = 16px (default/base size)
- `text-sm` = 14px
- `text-lg` = 18px
- `text-xl` = 20px
- `text-2xl` = 24px
- `text-3xl` = 30px
- `text-4xl` = 36px

**Tip:** For consistent typography, use `text-base` (16px) as your default and only scale up for headings when needed.

### Text Utilities

- `font-bold` = Bold weight
- `leading-relaxed` = More line height (1.625)
- `text-gray-700` = Text color
- `dark:text-gray-300` = Text color in dark mode

---

## 🎯 Best Practices

### Container Strategy

**Option 1: Page-level container** (current approach)
- Put `mx-auto max-w-[value] px-*` on `<main>` in `page.tsx`
- Good if: Only specific pages need this layout
- Gives you control per page

**Option 2: Global container in layout**
- Wrap `{children}` in `layout.tsx` with container classes
- Good if: Every page should have the same centered column
- More consistent but less flexible

**Recommendation:** For portfolio sites, page-level is usually better for flexibility.

### Component Organization

- Keep reusable components in `/components` folder
- Use semantic HTML (`<main>`, `<section>`, `<article>`, etc.)
- Group related styles together in className

---

## 💡 Quick Reference

### Common Patterns

**Two-column layout (image left, content right):**
```tsx
<div className="flex flex-col md:flex-row gap-8 items-start">
  <div className="flex-shrink-0">
    {/* Image/avatar */}
  </div>
  <div className="flex-1">
    {/* Content */}
  </div>
</div>
```

**Centered section:**
```tsx
<section className="mx-auto max-w-[692px] px-6">
  {/* Content */}
</section>
```

**Spacing between elements:**
```tsx
<div className="space-y-4">
  {/* Children have 16px vertical spacing */}
</div>
```

---

## 🔄 Updates Log

- **Initial setup:** Centered column layout, typography basics, layout structure
- More tips will be added as we build...

---

*This guide is automatically updated as we build your portfolio. Feel free to reference it anytime!*

