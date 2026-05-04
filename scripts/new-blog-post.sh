#!/bin/bash
# BillFreeUSA - New Blog Post Creator
# Usage: ./scripts/new-blog-post.sh "Your Blog Post Title"

if [ -z "$1" ]; then
  echo "Usage: ./scripts/new-blog-post.sh \"Your Blog Post Title\""
  echo "Example: ./scripts/new-blog-post.sh \"10 Ways to Save Money on Groceries\""
  exit 1
fi

TITLE="$1"
DATE=$(date +%Y-%m-%d)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
FILE="content/blog/${SLUG}.md"

if [ -f "$FILE" ]; then
  echo "Error: File already exists: $FILE"
  exit 1
fi

cat > "$FILE" << EOF
---
title: "${TITLE}"
date: "${DATE}"
excerpt: ""
category: ""
author: "BillFreeUSA Team"
emoji: "📰"
---

## Introduction

Your introduction here.

## Main Content

Your content here.

## Conclusion

Your concluding thoughts.

[Contact us for help →](/contact)
EOF

echo "Blog post created: $FILE"
echo "Edit the file to add your content, then:"
echo "  git add $FILE"
echo "  git commit -m 'Add blog post: ${TITLE}'"
echo "  git push"
