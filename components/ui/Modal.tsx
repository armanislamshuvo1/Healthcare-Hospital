"use client";

import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 sm:p-7 my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-200",
          className
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <div className="mb-3 pr-8 flex-shrink-0">
            <h3
              id="modal-title"
              className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
            >
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{description}</p>
            )}
          </div>
        )}

        <div className="overflow-y-auto flex-1 pr-1 -mr-1">{children}</div>
      </div>
    </div>
  );
}
