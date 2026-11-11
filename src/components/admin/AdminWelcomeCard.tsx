import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function AdminWelcomeCard() {
  const { user } = useAuth();

  return (
    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-br
        from-indigo-500/10
        via-purple-500/10
        to-cyan-500/10
        p-6
        shadow-xl
        backdrop-blur-md
        md:p-8
      "
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        {/* Left Content */}

        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            Welcome back, {user?.fullName ?? "Admin"} 👋
          </h1>

          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-7
              text-slate-400
            "
          >
            Manage campus lost and found reports, verify submissions,
            approve genuine requests, and help students recover their
            belongings faster.
          </p>

          <div
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-400/30
              bg-purple-400/10
              px-4
              py-2
              text-sm
              text-purple-300
            "
          >
            <ShieldCheck size={16} />

            Administrator Account
          </div>
        </div>

        {/* Right Icon */}

        <div
          className="
            hidden
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-cyan-400
            md:block
          "
        >
          <ShieldCheck size={42} />
        </div>
      </div>
    </section>
  );
}

export default AdminWelcomeCard;