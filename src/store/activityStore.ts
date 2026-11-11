import { create } from "zustand";


export interface Activity {

  id: number;

  title: string;

  description: string;

  type:
    | "lost"
    | "found"
    | "approved"
    | "rejected"
    | "matched";

  createdAt: string;

}



interface ActivityStore {

  activities: Activity[];

  addActivity: (
    activity: Activity
  ) => void;

  clearActivities: () => void;

}



export const useActivityStore =
create<ActivityStore>((set)=>({


  activities:
    JSON.parse(
      localStorage.getItem("activities") ?? "[]"
    ),



  addActivity:(activity)=>{


    const updatedActivities = [

      activity,

      ...JSON.parse(
        localStorage.getItem("activities") ?? "[]"
      )

    ];



    localStorage.setItem(

      "activities",

      JSON.stringify(updatedActivities)

    );



    set({

      activities: updatedActivities

    });


  },



  clearActivities:()=>{


    localStorage.removeItem(
      "activities"
    );


    set({

      activities:[]

    });


  }



}));