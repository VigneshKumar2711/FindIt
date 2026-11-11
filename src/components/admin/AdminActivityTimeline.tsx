import {
  CheckCircle2,
  XCircle,
  Clock,
  PackageSearch,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import {
  useActivityStore,
} from "@/store/activityStore";


function AdminActivityTimeline() {


  const {
    activities,
  } = useActivityStore();



  const latestActivities =
    [...activities]
      .sort(
        (a,b)=>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0,8);



  const getIcon = (
    type:string
  )=>{


    switch(type){

      case "lost":

        return (
          <PackageSearch
            size={28}
            className="text-red-400"
          />
        );


      case "found":

        return (
          <PackageCheck
            size={28}
            className="text-green-400"
          />
        );


      case "approved":

        return (
          <CheckCircle2
            size={28}
            className="text-green-400"
          />
        );


      case "rejected":

        return (
          <XCircle
            size={28}
            className="text-red-400"
          />
        );


      case "matched":

        return (
          <Sparkles
            size={28}
            className="text-yellow-400"
          />
        );


      default:

        return (
          <Clock
            size={28}
            className="text-slate-400"
          />
        );

    }


  };



  return (

    <section
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >

      <h2
        className="
          mb-6
          text-xl
          font-bold
          text-white
        "
      >
        Activity Timeline
      </h2>



      {
        latestActivities.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-black/20
              p-8
              text-center
              text-sm
              text-slate-400
            "
          >
            No recent activity yet 🚀
          </div>

        )

        :

        (

          <div className="space-y-5">

            {
              latestActivities.map(
                (activity)=>(

                <div
                  key={activity.id}
                  className="
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-slate-900/40
                    p-4
                    transition
                    hover:bg-slate-900/60
                  "
                >

                  <div className="shrink-0">

                    {getIcon(activity.type)}

                  </div>



                  <div className="flex-1">


                    <p
                      className="
                        font-semibold
                        text-white
                      "
                    >

                      {activity.title}

                    </p>



                    <p
                      className="
                        mt-1
                        text-sm
                        text-cyan-300
                      "
                    >

                      {activity.description}

                    </p>



                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-slate-500
                      "
                    >

                      <Clock size={14}/>


                      {
                        new Date(
                          activity.createdAt
                        )
                        .toLocaleString()
                      }


                    </div>


                  </div>


                </div>

              ))

            }


          </div>

        )
      }


    </section>

  );

}


export default AdminActivityTimeline;