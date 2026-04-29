import { memo, useMemo } from "react"
import Terminal from "react-console-emulator"
import { useDesktopSettings } from "../../desktop/useDesktopSettings"
import { useWindowManager } from "../../window/useWindowManager"
import "./terminal.scss"

const TerminalApp = () => {
  const { openWindow } = useWindowManager()
  const { setDesktopTheme, changeWallpaper, changeWindowTheme } = useDesktopSettings()

  const commands = useMemo(() => ({
    whoami: {
      description: "Show owner profile",
      usage: "whoami",
      fn: () => `Shray Priyadarshi
Web developer focused on modern React interfaces, app-style UI, and interactive portfolio experiences.
Email: shraypriyadarshi@gmail.com
Location: Kolkata, West Bengal, India`
    },
    about: {
      description: "About me",
      usage: "about",
      fn: () => "I am a web developer and app developer focused on building modern, interactive applications using React and JavaScript. I also have experience with full-stack development and AI-assisted tools."
    },
    skills: {
      description: "List technical skills",
      usage: "skills",
      fn: () => `Frontend: HTML, CSS, SCSS, JavaScript, React, Tailwind CSS
Backend: Node.js (learning), Basic Python, C
Tools: Git, GitHub, Bolt.ai, Create.xyz
Other: DSA with JavaScript, UI/UX-focused development`
    },
    projects: {
      description: "View selected projects",
      usage: "projects",
      fn: () => `1. Mac OS Style Portfolio UI - React, react-rnd, window manager
2. Calculator App - HTML, CSS, JavaScript
3. Portfolio Website - React
4. WordPress & GoHighLevel Client Projects`
    },
    contact: {
      description: "Get contact information",
      usage: "contact",
      fn: () => `Email: shraypriyadarshi@gmail.com
Phone: +91 6299521426
Location: Kolkata, West Bengal, India`
    },
    open: {
      description: "Open an app or external profile",
      usage: "open <notes|terminal|projects|resume|calendar|music|github|linkedin>",
      fn: (target = "") => {
        const normalizedTarget = target.toLowerCase()

        if (normalizedTarget === "github") {
          window.open("https://github.com/shraypriyadarshi", "_blank")
          return "Opening GitHub profile..."
        }

        if (normalizedTarget === "linkedin") {
          window.open("https://www.linkedin.com/in/shray-priyadarshi-20a73b285/", "_blank")
          return "Opening LinkedIn profile..."
        }

        const apps = {
          notes: "notes",
          note: "notes",
          terminal: "terminal",
          cli: "terminal",
          projects: "github",
          resume: "resume",
          pdf: "resume",
          calendar: "calendar",
          music: "spotify",
          spotify: "spotify"
        }

        if (apps[normalizedTarget]) {
          openWindow(apps[normalizedTarget])
          return `Opening ${normalizedTarget}...`
        }

        return "Usage: open <notes|terminal|projects|resume|calendar|music|github|linkedin>"
      }
    },
    theme: {
      description: "Change desktop color mode",
      usage: "theme <dark|light>",
      fn: (theme = "") => setDesktopTheme(theme.toLowerCase())
    },
    wallpaper: {
      description: "Change desktop wallpaper",
      usage: "wallpaper <monterey|ventura|sonoma>",
      fn: (wallpaperName = "") => changeWallpaper(wallpaperName.toLowerCase())
    },
    "window-theme": {
      description: "Change window chrome style",
      usage: "window-theme <glass|solid|graphite>",
      fn: (themeName = "") => changeWindowTheme(themeName.toLowerCase())
    }
  }), [changeWallpaper, changeWindowTheme, openWindow, setDesktopTheme])

  const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to My Portfolio CLI!       ║
╚════════════════════════════════════════╝

Type 'help' to see all commands.

Try:
  - whoami
  - projects
  - open notes
  - open github
  - theme dark
  - wallpaper
  - clear
`

  return (
    <div className="terminal-app">
      <Terminal
        commands={commands}
        welcomeMessage={welcomeMessage}
        promptLabel="shray:~$"
        promptLabelStyle={{ color: "#00ff00" }}
        ignoreCommandCase
      />
    </div>
  )
}

export default memo(TerminalApp)
