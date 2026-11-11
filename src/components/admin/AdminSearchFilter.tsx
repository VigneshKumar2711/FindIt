import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

type ReportType = "all" | "Lost" | "Found";
type ReportStatus = "all" | "pending" | "approved" | "rejected";

interface AdminSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  typeFilter: ReportType;
  setTypeFilter: (value: ReportType) => void;

  statusFilter: ReportStatus;
  setStatusFilter: (value: ReportStatus) => void;
}

function AdminSearchFilter({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
}: AdminSearchFilterProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-md
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center gap-3">
        <SlidersHorizontal
          size={24}
          className="text-cyan-400"
        />

        <h2 className="text-xl font-semibold text-white">
          Search & Filters
        </h2>
      </div>

      {/* Search */}

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          px-4
          transition
          focus-within:border-cyan-400
        "
      >
        <Search
          size={20}
          className="text-slate-400"
        />

        <input
          type="text"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search item name..."
          className="
            w-full
            bg-transparent
            py-3
            text-white
            outline-none
            placeholder:text-slate-500
          "
        />
      </div>

      {/* Filters */}

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {/* Report Type */}

        <div>
          <label
            htmlFor="reportType"
            className="mb-2 block text-sm text-slate-400"
          >
            Report Type
          </label>

          <select
            id="reportType"
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as ReportType)
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-400
            "
          >
            <option value="all">All</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="statusFilter"
            className="mb-2 block text-sm text-slate-400"
          >
            Status
          </label>

          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ReportStatus)
            }
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-400
            "
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default AdminSearchFilter;