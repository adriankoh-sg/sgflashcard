# SG Flashcard

This is an App that provides student with elearning using flash card. The content currently is focus on Singapore Primary school syllabus.

### Getting Started

This project is create using the Next.JS framework. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Software stack used

These are the stack used:

- Next.JS - Fullstack React framework
- Shadcn - UI components
- Drizzle - Database ORM
- PostgreSQL - Database

### Folder structure

`src` - main folder for all the source codes
`actions` - all form actions
`app` - all App routes (using Next.JS App router feature)
`components` - common components
`constants` - all constants for the App
`db` - codes for handling database transactions
`lib` - contains all utils functions
`styles` - CSS files
`db_data` - persistence volume for postgres db (using docker)
