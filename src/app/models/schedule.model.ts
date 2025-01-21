export interface TimeSlot {
    time: string;
    isRed: boolean;
  }
  
  export interface Schedule {
    day: string;
    morning: TimeSlot[];
    afternoon: TimeSlot[];
  }
  
  export interface Doctor {
    id: string;
    fullname: string;
    comment: string
    isEditMode: boolean;
    schedules: Schedule[];
  }