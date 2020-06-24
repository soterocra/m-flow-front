 export interface Messages {
   id: number;
   userId: string;
   content: string;
   timestamp: Date;
   from_: string;
   to_: string;
 }

 export interface MessagesRoot {
   messages: Messages[];
   userId: string;
 }
