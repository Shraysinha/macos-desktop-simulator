import { memo } from "react"
import { DOCK_EXTERNAL_ITEMS, WINDOW_DEFINITIONS } from "../window/windowConfig"
import { useWindowManager } from "../window/useWindowManager"
import "./dock.scss"

const Dock = () => {
  const { windows, activeWindowId, toggleWindow } = useWindowManager()

  return (
    <footer className="dock">
      {Object.values(WINDOW_DEFINITIONS).map(item => {
        const currentWindow = windows[item.id]
        const isOpen = currentWindow?.isOpen
        const isActive = activeWindowId === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleWindow(item.id)}
            className={[
              "icon",
              item.dockClass,
              isOpen ? "open" : "",
              isActive ? "active" : "",
              currentWindow?.isMinimized ? "minimized" : ""
            ].filter(Boolean).join(" ")}
            aria-label={`Open ${item.title}`}
          >
            <img src={item.icon} alt="" />
          </button>
        )
      })}

      {DOCK_EXTERNAL_ITEMS.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={() => window.open(item.href, "_blank")}
          className={`icon ${item.dockClass}`}
          aria-label={`Open ${item.id}`}
        >
          <img src={item.icon} alt="" />
        </button>
      ))}
    </footer>
  )
}

export default memo(Dock)
