import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  MapPin,
  CalendarDays,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";


interface Report {

  id: number;

  itemName: string;

  category: string;

  description: string;

  location?: string;

  foundLocation?: string;

  lostDate?: string;

  foundDate?: string;

  contact: string;

  ownerName?: string;

  finderName?: string;

  status:
    | "pending"
    | "approved"
    | "rejected"
    | "matched"
    | "recovered";

  type: "lost" | "found";

  createdAt: string;

}



interface MatchPair {

  lost: Report;

  found: Report;

  score: number;

}



function MatchReports() {


  const [matches,setMatches] =
    useState<MatchPair[]>([]);


  const [search,setSearch] =
    useState("");





  const loadReports = () => {


    const lostReports:Report[] =
      JSON.parse(
        localStorage.getItem("lostReports") ?? "[]"
      );


    const foundReports:Report[] =
      JSON.parse(
        localStorage.getItem("foundReports") ?? "[]"
      );



    const possibleMatches:MatchPair[] = [];





    lostReports.forEach((lost)=>{


      if(lost.status !== "pending")
        return;



      foundReports.forEach((found)=>{


        if(found.status !== "pending")
          return;



        let score = 0;



        if(
          lost.itemName
            .toLowerCase()
            .trim()
          ===
          found.itemName
            .toLowerCase()
            .trim()
        ){

          score += 40;

        }



        if(
          lost.category === found.category
        ){

          score += 25;

        }




        if(
          lost.location
            ?.toLowerCase()
            .trim()
          ===
          found.foundLocation
            ?.toLowerCase()
            .trim()
        ){

          score += 25;

        }




        if(
          lost.description
            .toLowerCase()
            .includes(
              found.description
              .toLowerCase()
            )
          ||
          found.description
            .toLowerCase()
            .includes(
              lost.description
              .toLowerCase()
            )
        ){

          score += 10;

        }





        if(score >= 60){

          possibleMatches.push({

            lost,

            found,

            score

          });

        }



      });


    });



    setMatches(possibleMatches);

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








  const approveMatch = (
    lostId:number,
    foundId:number
  )=>{


    const lostReports:Report[] =
      JSON.parse(
        localStorage.getItem("lostReports") ?? "[]"
      );


    const foundReports:Report[] =
      JSON.parse(
        localStorage.getItem("foundReports") ?? "[]"
      );




    const updatedLost =
      lostReports.map((item)=>{


        if(item.id === lostId){

          return {

            ...item,

            status:"recovered",

            matchedWith:foundId,

          };

        }


        return item;


      });






    const updatedFound =
      foundReports.map((item)=>{


        if(item.id === foundId){

          return {

            ...item,

            status:"matched",

            matchedWith:lostId,

          };

        }


        return item;


      });





    localStorage.setItem(
      "lostReports",
      JSON.stringify(updatedLost)
    );


    localStorage.setItem(
      "foundReports",
      JSON.stringify(updatedFound)
    );



    window.dispatchEvent(
      new Event("reportsUpdated")
    );



    toast.success(
      "Lost and Found reports matched successfully 🎉"
    );


  };








  const rejectMatch = () =>{


    toast.error(
      "Match rejected"
    );


  };







  const filteredMatches =
    matches.filter((match)=>

      match.lost.itemName
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );







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
          flex
          items-center
          gap-2
          text-2xl
          font-bold
          text-white
          "
        >

          <Sparkles
            className="text-cyan-400"
          />

          Match Reports


        </h2>



        <p
          className="
          mt-2
          text-slate-400
          "
        >

          Verify possible lost and found item matches

        </p>


      </div>






      <div
        className="
        mb-6
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-black/20
        px-4
        py-3
        "
      >

        <Search
          size={18}
          className="text-slate-400"
        />


        <input

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          placeholder="Search matched item..."

          className="
          w-full
          bg-transparent
          text-white
          outline-none
          "

        />


      </div>








      {
        filteredMatches.length === 0 ? (


          <div
            className="
            rounded-2xl
            bg-black/20
            p-10
            text-center
            text-slate-400
            "
          >

            No possible matches found 🔍

          </div>


        )

        :


        (

        <div className="space-y-6">


        {
          filteredMatches.map((match)=>(


          <motion.div

            key={
              `${match.lost.id}-${match.found.id}`
            }

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            className="
            rounded-3xl
            border
            border-white/10
            bg-slate-900/60
            p-6
            "

          >




            <div
              className="
              mb-5
              flex
              items-center
              justify-between
              "
            >

              <h3
                className="
                text-lg
                font-semibold
                text-white
                "
              >

                Possible Match Found 🎯

              </h3>


              <span
                className="
                rounded-full
                bg-green-500/20
                px-4
                py-1
                text-sm
                text-green-300
                "
              >

                {match.score}% Match

              </span>


            </div>






            <div
              className="
              grid
              gap-5
              md:grid-cols-2
              "
            >




              <ReportCard

                title="Lost Item"

                report={match.lost}

              />



              <ReportCard

                title="Found Item"

                report={match.found}

              />



            </div>







            <div
              className="
              mt-6
              flex
              justify-end
              gap-3
              "
            >


              <button

                onClick={rejectMatch}

                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-500/20
                px-5
                py-2
                text-red-300
                "

              >

                <XCircle size={18}/>

                Reject


              </button>






              <button

                onClick={()=>approveMatch(
                  match.lost.id,
                  match.found.id
                )}

                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-green-500
                px-5
                py-2
                text-white
                "

              >

                <CheckCircle2 size={18}/>

                Approve Match


              </button>



            </div>





          </motion.div>


          ))
        }


        </div>

        )

      }



    </section>

  );

}









function ReportCard({
  title,
  report,
}:{
  title:string;
  report:Report;
}){


return (

<div
className="
rounded-2xl
border
border-white/10
bg-black/20
p-5
"
>


<h4
className="
mb-4
font-semibold
text-cyan-300
"
>

{title}

</h4>



<p className="text-white">

<b>Item:</b> {report.itemName}

</p>



<p className="mt-2 text-slate-300">

<b>Category:</b> {report.category}

</p>




<p
className="
mt-3
flex
items-center
gap-2
text-slate-400
"
>

<MapPin size={16}/>

{
report.location ??
report.foundLocation
}


</p>





<p
className="
mt-2
flex
items-center
gap-2
text-slate-400
"
>

<CalendarDays size={16}/>

{
report.lostDate ??
report.foundDate
}


</p>





<p
className="
mt-3
text-sm
text-slate-400
"
>

{report.description}

</p>



</div>

);


}



export default MatchReports;