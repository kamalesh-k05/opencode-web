import { motion, AnimatePresence } from 'framer-motion'
import './MobileMenu.css'

export default function MobileMenu({ isOpen, onClose, links }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu-overlay"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          aria-modal="true"
          role="dialog"
        >
          <div className="mobile-menu-header">
            <div className="mobile-menu-brand">
              CS<span className="mobile-menu-brand-accent">.OpenCode</span>
            </div>
            <button
              className="mobile-menu-close"
              onClick={onClose}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-menu-nav">
            {links.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="mobile-menu-link"
                onClick={onClose}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.25 }}
              >
                <span>{link.label}</span>
                <span className="mobile-menu-link-num">0{idx + 1}</span>
              </motion.a>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <a href="#contact" className="mobile-menu-cta" onClick={onClose}>
              Apply for 2026/27 →
            </a>
            <div className="mobile-menu-meta">
              School of Computer Science • OpenCode Framework
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
