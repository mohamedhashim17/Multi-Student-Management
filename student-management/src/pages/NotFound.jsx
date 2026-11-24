import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page-wrapper">
      <motion.div
        className="not-found-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="not-found-glow-circle" />

        <motion.div
          className="not-found-astronaut"
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🎓
        </motion.div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          The academic corridor or resource you were looking for does not exist or has been relocated.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-primary-neon">
            <Home size={16} /> Return to Dashboard
          </Link>
          <Link to="/students" className="btn-secondary">
            <Compass size={16} /> Student Directory
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
