# Blog Management System - BillFreeUSA

## How to Add a New Blog Post (Daily Upload)

Adding a new blog post is simple! Just create a new `.md` (Markdown) file in this folder.

### Step 1: Create a New File

Create a new file in the `content/blog/` folder with a descriptive name:

```
content/blog/your-post-title.md
```

**Naming rules:**
- Use lowercase letters
- Replace spaces with hyphens (-)
- No special characters
- Example: `how-to-save-money-on-groceries.md`

### Step 2: Add Frontmatter

Every blog post must start with frontmatter (metadata) between `---` lines:

```markdown
---
title: "Your Post Title Here"
date: "2026-05-04"
excerpt: "A brief summary of your post (1-2 sentences)"
category: "Saving Tips"
author: "Your Name"
emoji: "💰"
---
```

**Available categories:**
- Saving Tips
- Bill Negotiation
- Financial Planning
- Credit
- Insurance
- Debt Management
- Budgeting
- Investing

### Step 3: Write Your Content

After the frontmatter, write your blog post using Markdown:

```markdown
## Your First Heading

Write your paragraph here. You can use **bold** and *italic* text.

### Subheading

- Bullet point 1
- Bullet point 2

1. Numbered list item 1
2. Numbered list item 2

> This is a blockquote

[Link text](https://example.com)
```

### Step 4: Commit and Push

```bash
git add content/blog/your-post-title.md
git commit -m "Add new blog post: Your Post Title"
git push
```

## Daily Blog Upload Workflow

For daily blog uploads, follow this simple routine:

1. Create your markdown file in `content/blog/`
2. Add the frontmatter with today's date
3. Write your content
4. Commit and push to Git
5. The website automatically rebuilds with the new post!

## Blog Post Template

Copy this template to start a new post:

```markdown
---
title: ""
date: ""
excerpt: ""
category: ""
author: "BillFreeUSA Team"
emoji: "📰"
---

## Introduction

Your introduction paragraph here.

## Main Section 1

Content here.

## Main Section 2

Content here.

## Conclusion

Your concluding thoughts and call to action.

[Contact us for help →](/contact)
```

## Tips for Great Blog Posts

1. **Use clear, descriptive titles** - Include keywords people search for
2. **Write compelling excerpts** - This shows on the blog listing page
3. **Use headings** (## and ###) to break up content
4. **Include actionable tips** - Readers want practical advice
5. **Add a call-to-action** - Link to the contact page
6. **Keep paragraphs short** - 2-3 sentences each
7. **Use lists** - Easy to scan and read
