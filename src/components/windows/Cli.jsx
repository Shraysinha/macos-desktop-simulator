import React from 'react'
import MacWindow from './MacWindow'
import Terminal from 'react-console-emulator'
import "./cli.scss"

const Cli = ({ windowName, setWindowsState }) => {
    const commands = {
        about: {
            description: 'About me',
            usage: 'about',
            fn: () => 'I am a web developer and app developer focused on building modern, interactive applications using React and JavaScript. I also have experience with full-stack development and AI-assisted tools.'
        },
        skills: {
            description: 'List technical skills',
            usage: 'skills',
            fn: () => `Frontend: HTML, CSS, SCSS, JavaScript, React, Tailwind CSS
Backend: Node.js (learning), Basic Python, C
Tools: Git, GitHub, Bolt.ai, Create.xyz
Other: DSA with JavaScript, UI/UX-focused development`
        },
        projects: {
            description: 'View my projects',
            usage: 'projects',
            fn: () => `1. Mac OS Style Portfolio UI - React (Draggable & Resizable Windows)
2. Calculator App - HTML, CSS, JavaScript
3. Portfolio Website - React (In Progress)
4. WordPress & GoHighLevel Client Projects (Freelance)`
        },
        experience: {
            description: 'Display work experience',
            usage: 'experience',
            fn: () => `Web Developer Intern @ CipherByte Technologies
  - Worked on web development tasks
  - Received Internship Completion Certificate & LOR

Web Development Intern @ InternPE
  - Completed training-based internship
  - Built beginner-level projects

Web Development Intern @ Prodigy InfoTech
  - Training-based internship experience

Freelance Developer @ VTabs
  - Built WordPress & GoHighLevel pages
  - Worked on projects like ADHD Holistically & Real Focus Life Coaching`
        },
        contact: {
            description: 'Get contact information',
            usage: 'contact',
            fn: () => `Email: shraypriyadarshi@gmail.com
Phone: +91 6299521426
Location: Kolkata, West Bengal, India`
        },
        github: {
            description: 'Open GitHub profile',
            usage: 'github',
            fn: () => {
                window.open('https://github.com', '_blank')
                return 'Opening GitHub...'
            }
        },
        resume: {
            description: 'Download resume',
            usage: 'resume',
            fn: () => 'Resume download started...'
        },
        social: {
            description: 'View social media links',
            usage: 'social',
            fn: () => `LinkedIn: Available on profile
Portfolio: Coming soon`
        },
        echo: {
            description: 'Echo a passed string',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        }
    }

    const welcomeMessage = `
╔════════════════════════════════════════╗
║     Welcome to My Portfolio CLI!       ║
╚════════════════════════════════════════╝

Hello! 👋 Welcome to my interactive portfolio. You can navigate through my work experience, skills, and projects using terminal commands.

Type 'help' to see all available commands, or try:
  • about     - Learn about me
  • skills    - View my technical skills
  • projects  - Check out my work
  • experience - See my career history
  • contact   - Get in touch

Happy exploring! 🚀
`

    return (
        <MacWindow windowName={windowName} setWindowsState={setWindowsState} >
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={welcomeMessage}
                    promptLabel={'shray:~$'}
                    promptLabelStyle={{ color: '#00ff00' }}
                />
            </div>
        </MacWindow>
    )
}

export default Cli