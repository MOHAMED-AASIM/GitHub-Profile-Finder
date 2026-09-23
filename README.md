# 🔎 GitHub Profile Finder

A modern, responsive **GitHub Profile Finder** built with **React.js and Vite** that allows users to search GitHub profiles, explore developer statistics, view top repositories, compare two GitHub users, filter repositories by programming language, sort repositories by stars or forks, and export profile insights as JSON.

The application provides a clean developer-focused interface with **Dark Mode / Light Mode**, responsive design, loading states, error handling, and direct links to GitHub profiles and repositories.

---

## 🚀 Features

### 👤 GitHub Profile Search

* Search for any public GitHub profile using a GitHub username.
* Retrieve profile information directly from the GitHub API.
* Display:

  * Profile avatar
  * Full name
  * GitHub username
  * Bio
  * Location
  * Company
  * Personal website
  * X/Twitter username
  * Account creation date

### 📊 Developer Statistics

The profile card displays important GitHub statistics:

* 📁 Public repositories
* 👥 Followers
* 👤 Following

### ⭐ Top Repositories

The application retrieves public repositories and highlights the user's top repositories.

Repository information includes:

* Repository name
* Description
* ⭐ Stars
* 🍴 Forks
* 👁 Watchers
* Programming language
* Direct repository link

Repositories are initially ranked according to star count.

### ⚖️ Compare Mode

Enable **Compare Mode** to search for and display two GitHub profiles side by side.

This makes it easier to compare:

* Repository counts
* Followers
* Following
* Developer profiles
* Top repositories
* Repository popularity

### 🔍 Repository Filtering

Repositories can be filtered by programming language.

Available filters include:

* All
* JavaScript
* Python
* TypeScript

Additional languages are displayed automatically when available in repository data.

### ↕️ Repository Sorting

Repositories can be sorted by:

* ⭐ Most stars
* 🍴 Most forks

### 🌙 Dark & Light Mode

The application includes a theme switcher for:

* Dark Mode
* Light Mode

The selected theme is stored using `localStorage`, allowing the user's preference to remain after refreshing the page.

### 📤 Export Insights

Search results can be exported as a JSON file.

The exported data includes:

* GitHub login
* Name
* Public repository count
* Followers
* Top repository names

Example:

```json
[
  {
    "login": "username",
    "name": "Developer Name",
    "repos": 25,
    "followers": 120,
    "topRepositories": [
      "project-one",
      "project-two"
    ]
  }
]
```

### ⚡ Loading States

Skeleton loading components are displayed while GitHub profile information is being retrieved.

This improves the user experience by providing visual feedback during API requests.

### ❌ Error Handling

The application handles common GitHub API problems, including:

* Username not found
* GitHub API rate limit
* Network connection problems
* Invalid or unsuccessful API responses

Users can retry requests when appropriate.

### 📱 Responsive Design

The interface is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The layout automatically adapts to different screen sizes.

---

# 🛠️ Technologies Used

| Technology        | Purpose                            |
| ----------------- | ---------------------------------- |
| React 19          | Frontend UI development            |
| Vite              | Development server and build tool  |
| JavaScript (ES6+) | Application logic                  |
| CSS3              | Styling and responsive design      |
| GitHub REST API   | GitHub profile and repository data |
| HTML5             | Application structure              |
| LocalStorage      | Theme preference persistence       |

---

# 📁 Project Structure

```text
GitHub-Profile-Finder/
│
├── GitHub_Proflie_Finder/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── GithubProfileFinder/
│   │   │       ├── index.jsx
│   │   │       ├── styles.css
│   │   │       └── user.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── .gitignore
│
├── LICENSE
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/MOHAMED-AASIM/GitHub-Profile-Finder.git
```

Navigate into the project:

```bash
cd GitHub-Profile-Finder/GitHub_Proflie_Finder
```

---

## 2. Install Dependencies

Make sure **Node.js** and **npm** are installed.

Then run:

```bash
npm install
```

---

## 3. Start the Development Server

```bash
npm run dev
```

Vite will start the development server.

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

# 📦 Available Commands

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

# 🔌 GitHub API

This application communicates directly with the GitHub REST API.

The main endpoints used are:

```text
GET https://api.github.com/users/{username}
```

and:

```text
GET https://api.github.com/users/{username}/repos?per_page=100
```

The first endpoint retrieves user profile information.

The second endpoint retrieves the user's public repositories.

The application then processes the repository data to display the most relevant repositories and provide sorting/filtering functionality.

---

# 🔐 GitHub API Rate Limits

The application currently accesses the GitHub API without user authentication.

GitHub's unauthenticated API requests are subject to rate limits.

If the rate limit is reached, the application displays an appropriate message and provides a retry option.

For larger-scale production usage, authenticated GitHub API access can be considered.

---

# 🎨 User Interface

The application uses a modern developer-oriented design featuring:

* Glass-style cards
* Responsive grid layout
* Dark/light themes
* Accent-based visual hierarchy
* Repository cards
* Profile statistics
* Responsive controls
* Loading skeletons
* Error messages
* Smooth hover transitions

---

# 🧩 Main Components

## `GithubProfileFinder`

The main application component responsible for:

* Username input
* Profile searching
* Compare Mode
* Theme switching
* Repository filtering
* Repository sorting
* JSON export
* API request handling

## `UserCard`

Displays the retrieved GitHub profile and repository information.

It presents:

* Profile information
* Social links
* GitHub statistics
* Top repositories

## `Skeleton`

Provides a loading-state interface while API data is being retrieved.

## `ErrorBox`

Displays user-friendly messages when:

* A profile does not exist
* API limits are reached
* The network request fails

---

# 🔄 Application Workflow

```text
User enters GitHub username
           │
           ▼
     Search submitted
           │
           ▼
     GitHub REST API
           │
           ├───────────────┐
           ▼               ▼
     User Profile      Repositories
           │               │
           └───────┬───────┘
                   ▼
             Process Data
                   │
                   ▼
             Display Profile
                   │
          ┌────────┼─────────┐
          ▼        ▼         ▼
       Filter    Sort     Compare
          │        │         │
          └────────┼─────────┘
                   ▼
             Export JSON
```

---

# 🧪 Example Usage

### Search a Profile

Enter:

```text
torvalds
```

The application retrieves the public GitHub profile and displays the available information.

### Compare Profiles

Enable:

```text
Compare mode
```

Then enter two usernames:

```text
torvalds
octocat
```

The application displays both profiles in a comparison layout.

### Filter Repositories

Select a language such as:

```text
JavaScript
```

Only repositories matching the selected language will be displayed.

### Sort Repositories

Choose:

```text
Most stars
```

or:

```text
Most forks
```

to change the repository ordering.

---

# 📤 Exporting Profile Insights

After searching a profile, click:

```text
Export JSON ↗
```

The browser will generate:

```text
profile-finder-insights.json
```

This file can be used for further analysis or record keeping.

---

# 🌐 Deployment

Because this is a Vite + React frontend application, it can be deployed to modern static hosting platforms.

Typical deployment options include:

* GitHub Pages
* Vercel
* Netlify
* Cloudflare Pages

Build the application using:

```bash
npm run build
```

The generated production files will be placed in:

```text
dist/
```

---

# 🔮 Future Improvements

Potential future enhancements include:

* 🔐 GitHub OAuth authentication
* 📈 Contribution graphs
* 🔥 GitHub contribution streaks
* 📊 More detailed repository analytics
* 🔎 Advanced repository search
* 🏷️ Topic/tag filtering
* 📅 Repository activity timeline
* 📉 Developer activity charts
* 🌎 GitHub location visualization
* ⭐ Repository comparison
* 📱 Progressive Web App support
* 💾 Search history
* 🔗 Shareable profile comparison URLs
* 🧪 Automated testing
* ♿ Additional accessibility improvements

---

# 👨‍💻 Author

## Abdul Saleem Mohamed Aasim

Cloud Computing Undergraduate
SLTC Research University, Sri Lanka

GitHub:

**@MOHAMED-AASIM**

---

# 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

You may use, study, modify, and redistribute the software according to the terms of the license.

See the [`LICENSE`](./LICENSE) file for the complete license terms.

---

# ⭐ Support

If you find this project useful:

* ⭐ Star the repository
* 🍴 Fork the repository
* 🐛 Report issues
* 💡 Suggest improvements
* 🔧 Contribute to the project

---

## 📌 Project Summary

**GitHub Profile Finder** is a lightweight React application designed to make GitHub profile exploration easier by combining profile information, developer statistics, repository insights, comparison tools, filtering, sorting, and JSON export into a single responsive interface.

Built with **React + Vite + GitHub REST API**.
