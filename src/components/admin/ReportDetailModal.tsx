import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  CalendarDays,
  Phone,
  User,
  Tag,
  FileText,
  ShieldCheck,
} from "lucide-react";

type ReportStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "matched"
  | "recovered";
  type ReportType = "Lost" | "Found";

interface Report {
  id: number;
  itemName: string;
  category: string;
  description?: string;
  location?: string;
  foundLocation?: string;
  lostDate?: string;
  foundDate?: string;
  contact?: string;
  ownerName?: string;
  finderName?: string;
  image?: string;
  status: ReportStatus;
  type: ReportType;
}

interface ReportDetailModalProps {
  report: Report | null;
  onClose: () => void;
}

function ReportDetailModal({
  report,
  onClose,
}: ReportDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {report && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            px-4
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              border
              border-white/10
              bg-slate-900
              p-6
              shadow-2xl
              md:p-8
            "
          >
            {/* Close Button */}

            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                right-5
                top-5
                rounded-full
                bg-white/10
                p-2
                text-white
                transition
                hover:bg-white/20
              "
            >
              <X size={20} />
            </button>

            {/* Header */}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {report.itemName}
              </h2>

              <span
                className={`
                  mt-3
                  inline-flex
                  rounded-full
                  px-4
                  py-1
                  text-sm
                  font-semibold
                  ${
                    report.type === "Lost"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-green-500/20 text-green-300"
                  }
                `}
              >
                {report.type} Item
              </span>
            </div>

            {/* Image */}

            {report.image && (
              <div className="mb-6">
                <img
                  src={report.image}
                  alt={report.itemName}
                  className="
                    h-56
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    object-cover
                  "
                />
              </div>
            )}

            {/* Details */}

            <div className="space-y-4">
              <DetailRow
                icon={<Tag size={18} />}
                label="Category"
                value={report.category}
              />

              <DetailRow
                icon={<FileText size={18} />}
                label="Description"
                value={
                  report.description ??
                  "No description provided"
                }
              />

              <DetailRow
                icon={<MapPin size={18} />}
                label={
                  report.type === "Lost"
                    ? "Lost Location"
                    : "Found Location"
                }
                value={
                  report.location ??
                  report.foundLocation ??
                  "Not available"
                }
              />

              <DetailRow
                icon={<CalendarDays size={18} />}
                label={
                  report.type === "Lost"
                    ? "Lost Date"
                    : "Found Date"
                }
                value={
                  report.lostDate ??
                  report.foundDate ??
                  "Not available"
                }
              />

              <DetailRow
                icon={<User size={18} />}
                label={
                  report.type === "Lost"
                    ? "Owner Name"
                    : "Finder Name"
                }
                value={
                  report.ownerName ??
                  report.finderName ??
                  "Not available"
                }
              />

              <DetailRow
                icon={<Phone size={18} />}
                label="Contact"
                value={report.contact ?? "Not available"}
              />

              <DetailRow
                icon={<ShieldCheck size={18} />}
                label="Status"
                value={report.status}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function DetailRow({
  icon,
  label,
  value,
}: DetailRowProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-cyan-300
        "
      >
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-2 text-white">
        {value}
      </p>
    </div>
  );
}

export default ReportDetailModal;