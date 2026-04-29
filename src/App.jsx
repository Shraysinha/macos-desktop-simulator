import { Suspense } from "react"
import { APP_REGISTRY } from "./apps/appRegistry"
import ErrorBoundary from "./components/ErrorBoundary"
import Dock from "./components/Dock"
import Nav from "./components/Nav"
import { DesktopSettingsProvider } from "./desktop/DesktopSettingsProvider"
import { useDesktopSettings } from "./desktop/useDesktopSettings"
import { WindowManagerProvider } from "./window/WindowManagerProvider"
import { useWindowManager } from "./window/useWindowManager"
import { useWindowShortcuts } from "./window/useWindowShortcuts"
import MacWindow from "./components/windows/MacWindow"
import "./app.scss"

const WindowLayer = () => {
  const { windows } = useWindowManager()

  return Object.values(windows)
    .filter(currentWindow => currentWindow.isOpen && !currentWindow.isMinimized)
    .map(currentWindow => {
      const app = APP_REGISTRY[currentWindow.id]
      if (!app) {
        return null
      }

      const AppComponent = app.Component

      return (
        <MacWindow key={currentWindow.id} window={currentWindow}>
          <ErrorBoundary>
            <Suspense fallback={<div className="app-loader">Loading {app.label}...</div>}>
              <AppComponent />
            </Suspense>
          </ErrorBoundary>
        </MacWindow>
      )
    })
}

const Desktop = () => {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    switchWindow,
    blurWindow
  } = useWindowManager()
  const {
    appearance,
    windowTheme,
    desktopStyle
  } = useDesktopSettings()

  useWindowShortcuts({
    activeWindowId,
    openWindow,
    closeWindow,
    switchWindow
  })

  return (
    <main
      className={`desktop ${appearance} window-theme-${windowTheme}`}
      style={desktopStyle}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          blurWindow()
        }
      }}
    >
      <Nav />
      <Dock windows={windows} />
      <WindowLayer />
    </main>
  )
}

function App() {
  return (
    <DesktopSettingsProvider>
      <WindowManagerProvider>
        <Desktop />
      </WindowManagerProvider>
    </DesktopSettingsProvider>
  )
}

export default App
