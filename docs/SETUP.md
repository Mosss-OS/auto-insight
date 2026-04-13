# GitBook Setup Instructions

To publish these docs on GitBook and sync with GitHub:

## Option 1: GitHub Sync (Recommended)

1. Go to [GitBook](https://gitbook.com) and sign in
2. Create a new space or use an existing one
3. Click **Configure** in the top-right
4. Select **GitHub Sync** from the provider list
5. Install GitBook GitHub app if prompted
6. Select the `auto-insight` repository
7. Choose the `docs` folder for content
8. Select the branch (main)
9. Choose sync direction: **GitHub -> GitBook** (to import existing docs)
10. Complete the initial sync

## Option 2: Manual Upload

1. Go to [GitBook](https://gitbook.com) and sign in
2. Create a new space
3. Create pages manually and paste the content from the `.md` files in this folder
4. Publish the site

## Published URL

Once published, your docs will be available at:
```
https://your-organization.gitbook.io/auto-insight/
```

## Update the README

After getting your GitBook URL, update `../README.md` with:
```markdown
## Documentation

Full documentation available at: https://your-org.gitbook.io/auto-insight/
```