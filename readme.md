# ✨ Creative Portfolio Template ✨

A responsive, modern portfolio template for creative professionals. Features include a glitch effect title, portfolio filtering, video integrations, and a mobile-friendly design. No coding experience required! 🎨

## 📋 Table of Contents
- [Features](#features)
- [Setup Guide](#setup-guide)
  - [Prerequisites](#prerequisites)
  - [Setting Up GitHub](#setting-up-github)
  - [Installing GitHub Desktop](#installing-github-desktop)
  - [Installing Visual Studio Code](#installing-visual-studio-code)
  - [Downloading the Template](#downloading-the-template)
  - [Customizing Your Portfolio](#customizing-your-portfolio)
  - [Publishing to GitHub Pages](#publishing-to-github-pages)
- [Custom Domain Setup](#custom-domain-setup)
- [Updating Your Site](#updating-your-site)
- [Troubleshooting](#troubleshooting)
- [Development Philosophy](#development-philosophy)
- [Credits](#credits)

## ✨ Features

- 📱 Responsive design for desktop, tablet, and mobile devices
- 🎭 Animated glitch effect for the title
- 🗂️ Portfolio filtering by category
- 🎬 YouTube video integrations with modal viewer
- 🔄 Smooth scrolling navigation
- ✨ AOS (Animate On Scroll) animations
- 📬 Contact form integration via Formspree
- 🛠️ Easily customizable with detailed comments or AI assistance

## 🚀 Setup Guide

### Prerequisites

Before starting, make sure you have:
- A GitHub account
- GitHub Desktop (for easy management)
- Visual Studio Code (for editing)
- Basic knowledge of HTML and CSS (for customization) OR willingness to use Claude.ai!

### Setting Up GitHub

1. **Create a GitHub Account** 📝
   - Go to [GitHub.com](https://github.com)
   - Click "Sign up" and follow the instructions
   - Verify your email address

2. **Create a New Repository** 🏗️
   - Once logged in, click the "+" icon in the top right corner
   - Select "New repository"
   - Name your repository `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make sure it's set to "Public"
   - Skip the initialization options for now
   - Click "Create repository"

### Installing GitHub Desktop

GitHub Desktop provides a user-friendly interface for managing your repository.

1. **Download and Install** 💻
   - Go to [desktop.github.com](https://desktop.github.com/)
   - Download the version for your operating system
   - Install the application

2. **Log In to GitHub Desktop** 🔑
   - Open GitHub Desktop
   - Sign in with your GitHub account credentials

### Installing Visual Studio Code

VS Code is a powerful, free editor that's great for web development.

1. **Download and Install** 📥
   - Go to [code.visualstudio.com](https://code.visualstudio.com/)
   - Download the version for your operating system
   - Install the application

2. **Recommended Extensions** 🔌
   - Open VS Code
   - Click the Extensions icon in the sidebar (or press Ctrl+Shift+X)
   - Search for and install these extensions:
     - Live Server (allows you to preview your site locally)
     - HTML CSS Support
     - Prettier - Code formatter

### Downloading the Template

1. **Clone the Repository** 📋
   - In GitHub Desktop, click "File" > "Clone Repository"
   - Select your repository (`yourusername.github.io`)
   - Choose where to save it on your computer
   - Click "Clone"

2. **Add Template Files** 📁
   - Download this template
   - Extract the files to your cloned repository folder
   - Make sure all files are in the root directory, not inside a subfolder

### Customizing Your Portfolio

#### Method 1: Manual Editing with VS Code ✏️

1. **Open the Project in VS Code**
   - In GitHub Desktop, click "Repository" > "Open in Visual Studio Code"
   - Alternatively, open VS Code and use "File" > "Open Folder" to navigate to your repository

2. **Preview Your Site** 👀
   - In VS Code, right-click on `index.html` and select "Open with Live Server"
   - This will open your site in a browser with live reloading

3. **Customize the Content**
   - Replace placeholder images with your own:
     - Add your headshot as `images/artist_headshot.webp`
     - Add portfolio thumbnails as `images/thumbnail_01.webp`, `images/thumbnail_02.webp`, etc.
     - Update the hero video at `videos/hero_loop.mp4`
   - Edit `index.html` to update:
     - Your name and professional title
     - About section information
     - Portfolio projects (update categories, titles, links)
     - Experience details
     - Skills and services
     - Contact information (update Formspree form ID)
   - Customize styles in `css/main.css` if needed

#### Method 2: AI-Assisted Editing with Claude 🤖

This template was originally developed and can be easily modified using Claude.ai (version 3.7 with extended thinking mode). This approach requires no coding experience:

1. **Access Claude.ai**
   - Visit [Claude.ai](https://claude.ai) and create an account if you don't have one
   - Start a new conversation

2. **Upload Your Files** 📤
   - Simply drag and drop your `index.html`, `main.css`, and `main.js` files into the conversation
   - Claude will be able to see and understand the code

3. **Request Changes in Plain Language** 💬
   - Explain what you want to change in natural language
   - For example: "Please update the About section with this new bio: [your text]" or "Can you change the red accent color to blue throughout the site?"
   - You can be specific or general in your requests

4. **Iterative Improvements** 🔄
   - After Claude provides updated files, download them
   - Replace the originals in your repository folder
   - Preview the changes using Live Server in VS Code
   - Take screenshots of anything that needs adjustment
   - Upload the screenshots back to Claude and explain what you'd like refined

5. **Tips for Working with Claude** 💡
   - Be specific about what you want changed
   - Provide examples where possible
   - You can ask Claude to make multiple changes at once
   - For complex changes, it's better to work incrementally
   - If Claude gives you snippets to edit and it's getting too complicated, simply ask for the complete file instead! This is often clearer than trying to merge snippets.

While Claude 3.7 with extended thinking mode was used to develop this template, other AI assistants may also work, though results may vary.

### Creating Portfolio Media

#### Hero Video Creation 🎥

The looping background video can be created using AI tools:

1. **Generate a Base Image**
   - Use [Midjourney](https://midjourney.com) or similar AI image generators to create a high-quality still image
   - Aim for an abstract or atmospheric image that represents your work

2. **Create a Looping Video with Kling**
   - Visit [Kling](https://kling.ai)
   - Upload your Midjourney image as both start and end frames
   - Specify that you want a "seamlessly looping video"
   - Download the resulting video and add it to your `videos` folder

#### Portfolio Videos 📹

For portfolio items that link to videos:

1. **Using Public YouTube Videos**
   - Find the video ID (the part after `v=` in the YouTube URL)
   - Add it to your portfolio item using the `data-video-id` attribute

2. **Using Your Own Videos**
   - Upload your videos to YouTube as "Unlisted" if you don't want them publicly discoverable
   - Use the video ID in your portfolio items
   - This approach avoids hosting large video files in your repository

### Publishing to GitHub Pages

1. **Commit and Push Your Changes** 🚀
   - In GitHub Desktop, you'll see all your changed files
   - Add a summary (e.g., "Initial template customization")
   - Click "Commit to main"
   - Click "Push origin" to upload to GitHub

2. **Enable GitHub Pages** 🌐
   - Go to your repository on GitHub.com
   - Click "Settings"
   - Scroll down to the "GitHub Pages" section
   - For Source, select "main" branch
   - Click "Save"
   - Wait a few minutes for your site to deploy
   - GitHub will provide a link to your published site

## 🔗 Custom Domain Setup

Want to use your own domain instead of yourusername.github.io? Here's how:

### 1. Purchase a Domain 💰

Several affordable options include:
- [Namecheap](https://www.namecheap.com) - Domains from $8.88/year
- [Google Domains](https://domains.google) - Domains from $12/year
- [Hover](https://www.hover.com) - Known for good customer service, domains from $12.99/year
- [Porkbun](https://porkbun.com) - Often has very competitive pricing, from $8.88/year

### 2. Configure DNS ⚙️

For Namecheap (process is similar for other providers):

1. Log in to your domain provider's dashboard
2. Find DNS management or nameservers
3. Create these records:
   - Type: A, Host: @, Value: 185.199.108.153
   - Type: A, Host: @, Value: 185.199.109.153
   - Type: A, Host: @, Value: 185.199.110.153
   - Type: A, Host: @, Value: 185.199.111.153
   - Type: CNAME, Host: www, Value: yourusername.github.io

### 3. Configure GitHub Pages 🔧

1. In your repository, go to Settings > Pages
2. Under "Custom domain", enter your domain name
3. Click "Save"
4. Check "Enforce HTTPS" once it becomes available

Note: DNS changes can take up to 48 hours to propagate fully.

## 🔄 Updating Your Site

To make future updates to your site:

1. **Make Changes Locally** ✏️
   - Open your project in VS Code
   - Make your edits
   - Preview changes with Live Server

2. **Commit and Push** 📤
   - In GitHub Desktop, review your changes
   - Enter a commit summary describing what you changed
   - Click "Commit to main"
   - Click "Push origin"

3. **Wait for Deployment** ⏱️
   - GitHub Pages will automatically update your site
   - This typically takes 1-3 minutes

## ❓ Troubleshooting

**Site isn't publishing:** 🚫
- Check if GitHub Pages is enabled in repository settings
- Ensure your repository is named correctly: `yourusername.github.io`
- Verify that your files are in the root of the repository, not in a subfolder

**Images not showing:** 🖼️
- Check file paths are correct
- Ensure all image files are properly uploaded
- Verify image formats are web-compatible (webp, jpg, png)

**Form not working:** 📝
- Confirm your Formspree endpoint is correct
- Test the form submission to verify

**Need more help?** 🆘
- Join our [Discord support server](https://discord.gg/TWfa3A72)
- Visit [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Check [GitHub Community Forum](https://github.community/)

## 💭 Development Philosophy

This template was created with a "no-code" approach, making it accessible to creative professionals without web development experience. The entire development process was handled through conversations with Claude.ai, demonstrating how AI can empower creators to build their professional web presence without traditional coding.

### How This Template Was Built 🏗️

1. **Initial Concept**: I explained to Claude 3.7 (with extended thinking enabled) what I wanted in a portfolio site.

2. **Iterative Design**: Through natural conversation, I refined the design by:
   - Sending screenshots back to Claude to show what needed changing
   - Asking for specific features in plain language
   - Having Claude generate all HTML, CSS, and JavaScript

3. **Media Creation**: The looping hero background was created by:
   - Generating a base image with Midjourney
   - Converting it to a seamless loop using Kling.ai

This approach demonstrates how creators can leverage AI tools to build professional web presences without needing to code everything from scratch.

## 🙏 Credits

- Template designed with [Claude 3.7 Sonnet](https://claude.ai) (extended thinking mode) 🤖
- Animation effects powered by [AOS](https://michalsnik.github.io/aos/) ✨
- Contact form powered by [Formspree](https://formspree.io) 📨
- Fonts from [Google Fonts](https://fonts.google.com) 🔤
- Video processing by [Kling.ai](https://kling.ai) 🎬