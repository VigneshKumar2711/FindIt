import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  FileWarning,
  Clock3,
  ShieldCheck,
  XCircle,
  PackageCheck,
  SearchCheck,
} from "lucide-react";

type ReportStatus = "pending" | "approved" | "rejected";

interface Report {
  status?: ReportStatus;
}

interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  lost: number;
  found: number;
}

interface StatCard {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

function AdminStatsCards() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    lost: 0,
    found: 0,
  });

  const loadStats = () => {
    const lostReports: Report[] = JSON.parse(
      localStorage.getItem("lostReports") || "[]"
    );

    const foundReports: Report[] = JSON.parse(
      localStorage.getItem("foundReports") || "[]"
    );

    const allReports = [...lostReports, ...foundReports];

    const pending = allReports.filter(
      (report) => report.status === "pending"
    ).length;

    const approved = allReports.filter(
      (report) => report.status === "approved"
    ).length;

    const rejected = allReports.filter(
      (report) => report.status === "rejected"
    ).length;

    setStats({
      total: allReports.length,
      pending,
      approved,
      rejected,
      lost: lostReports.length,
      found: foundReports.length,
    });
  };

  useEffect(() => {
    loadStats();

    window.addEventListener(
      "reportsUpdated",
      loadStats as EventListener
    );

    return () => {
      window.removeEventListener(
        "reportsUpdated",
        loadStats as EventListener
      );
    };
  }, []);

  const cards: StatCard[] = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: FileWarning,
      color: "text-cyan-400",
    },
    {
      title: "Pending Approval",
      value: stats.pending,
      icon: Clock3,
      color: "text-yellow-400",
    },
    {
      title: "Approved Reports",
      value: stats.approved,
      icon: ShieldCheck,
      color: "text-green-400",
    },
    {
      title: "Rejected Reports",
      value: stats.rejected,
      icon: XCircle,
      color: "text-red-400",
    },
    {
      title: "Lost Reports",
      value: stats.lost,
      icon: SearchCheck,
      color: "text-orange-400",
    },
    {
      title: "Found Reports",
      value: stats.found,
      icon: PackageCheck,
      color: "text-purple-400",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">
        Dashboard Overview
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/10
                hover:shadow-xl
                hover:shadow-cyan-500/10
              "
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={30}
                  className={card.color}
                />
              </div>

              <h3 className="mt-5 text-3xl font-bold text-white">
                {card.value}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {card.title}
              </p>
            </div>
          );
        })}
      </div>

      {stats.total === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500">
          No reports available yet.
        </p>
      )}
    </section>
  );
}

export default AdminStatsCards;