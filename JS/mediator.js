export class EventsMediator{
    constructor(){
        this.events ={}

    }
   //subscribe on event using  eventsMediator.on("eventName",cbf)
    on(eventName,cbf){
        this.events[eventName]=  this.events[eventName]? this.events[eventName]:[]
        this.events[eventName].push(cbf)
    }
      // emit event  (change in data)
    emit(eventName,data){
        console.log("inside emit ",data)
          if(this.events[eventName]){
            this.events[eventName].forEach(function(fun){
                fun(data)
            })
          }
    }

}