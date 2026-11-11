import { useEffect, useState } from "react";
import {
  Check,
  X,
  Eye,
  MapPin,
  CalendarDays,
  Clock3,
} from "lucide-react";

import ReportDetailModal from "./ReportDetailModal";


type ReportStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "matched"
  | "recovered";


type ReportType =
  | "Lost"
  | "Found";



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


  createdAt: string;

}




function PendingReportsQueue() {


  const [reports, setReports] =
    useState<Report[]>([]);


  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);



  const loadReports = () => {


    const lostReports: Report[] =
      JSON.parse(
        localStorage.getItem("lostReports") ?? "[]"
      ).map((item: Omit<Report,"type">)=>({

        ...item,

        type:"Lost"

      }));




    const foundReports: Report[] =
      JSON.parse(
        localStorage.getItem("foundReports") ?? "[]"
      ).map((item: Omit<Report,"type">)=>({

        ...item,

        type:"Found"

      }));




    const pendingReports = [

      ...lostReports,

      ...foundReports,

    ].filter(

      (report)=>report.status === "pending"

    );



    setReports(pendingReports);

  };






  useEffect(()=>{


    loadReports();



    window.addEventListener(
      "reportsUpdated",
      loadReports
    );



    return()=>{

      window.removeEventListener(
        "reportsUpdated",
        loadReports
      );

    };


  },[]);









  const updateStatus = (

    id:number,

    type:ReportType,

    status:ReportStatus

  )=>{


    const storageKey =
      type === "Lost"
        ? "lostReports"
        : "foundReports";



    const reportsFromStorage:Report[] =
      JSON.parse(
        localStorage.getItem(storageKey) ?? "[]"
      );




    const updatedReports =
      reportsFromStorage.map((report)=>{


        if(report.id === id){

          return{

            ...report,

            status,

          };

        }


        return report;


      });




    localStorage.setItem(

      storageKey,

      JSON.stringify(updatedReports)

    );




    window.dispatchEvent(

      new Event("reportsUpdated")

    );


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


      <div className="mb-6">


        <h2
          className="
          text-xl
          font-bold
          text-white
          "
        >

          Pending Verification Queue

        </h2>


        <p
          className="
          mt-1
          text-sm
          text-slate-400
          "
        >

          Review newly submitted lost and found reports

        </p>


      </div>









      {
        reports.length === 0 ? (


          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-10
            text-center
            "
          >


            <Clock3
              size={40}
              className="
              mx-auto
              text-slate-500
              "
            />


            <p
              className="
              mt-4
              text-slate-400
              "
            >

              No pending reports 🎉

            </p>


          </div>


        )

        :

        (


          <div
            className="
            space-y-5
            "
          >



          {
            reports.map((report)=>(


              <div
                key={report.id}
                className="
                rounded-2xl
                border
                border-white/10
                bg-slate-900/60
                p-5
                transition
                hover:border-cyan-400/30
                "
              >



              <div
                className="
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
                "
              >




                <div>


                  <div
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >


                    <h3
                      className="
                      text-lg
                      font-semibold
                      text-white
                      "
                    >

                      {report.itemName}

                    </h3>


                    <span
                      className="
                      rounded-full
                      bg-yellow-500/20
                      px-3
                      py-1
                      text-xs
                      text-yellow-300
                      "
                    >

                      Pending

                    </span>


                  </div>




                  <p
                    className="
                    mt-2
                    text-sm
                    text-cyan-300
                    "
                  >

                    {report.type} • {report.category}

                  </p>





                  <div
                    className="
                    mt-4
                    space-y-2
                    text-sm
                    text-slate-400
                    "
                  >


                    <p
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >

                      <MapPin size={15}/>


                      {
                        report.location ??
                        report.foundLocation ??
                        "Campus"
                      }


                    </p>




                    <p
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >

                      <CalendarDays size={15}/>


                      {
                        report.lostDate ??
                        report.foundDate ??
                        new Date(
                          report.createdAt
                        )
                        .toLocaleDateString()
                      }


                    </p>


                  </div>



                </div>









                <div
                  className="
                  flex
                  flex-wrap
                  gap-3
                  "
                >


                  <button
                    onClick={()=>
                      setSelectedReport(report)
                    }
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    px-4
                    py-2
                    text-sm
                    text-white
                    hover:bg-white/10
                    "
                  >

                    <Eye size={16}/>

                    View

                  </button>







                  <button
                    onClick={()=>
                      updateStatus(
                        report.id,
                        report.type,
                        "approved"
                      )
                    }
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-green-500/20
                    px-4
                    py-2
                    text-sm
                    text-green-300
                    hover:bg-green-500/30
                    "
                  >

                    <Check size={16}/>

                    Approve

                  </button>







                  <button
                    onClick={()=>
                      updateStatus(
                        report.id,
                        report.type,
                        "rejected"
                      )
                    }
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-500/20
                    px-4
                    py-2
                    text-sm
                    text-red-300
                    hover:bg-red-500/30
                    "
                  >

                    <X size={16}/>

                    Reject

                  </button>



                </div>



              </div>


              </div>


            ))
          }



          </div>


        )

      }







      <ReportDetailModal

        report={selectedReport}

        onClose={()=>
          setSelectedReport(null)
        }

      />


    </section>

  );

}



export default PendingReportsQueue;