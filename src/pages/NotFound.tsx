
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import DNABackground from "../components/DNABackground";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DNABackground />
      <div className="bio-container">
        <motion.div 
          className="glass-panel p-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold text-bio-blue mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-bio-blue text-white px-6 py-3 rounded-md hover:bg-bio-blue/90 transition-colors"
          >
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
