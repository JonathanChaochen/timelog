  /* jshint undef: true, unused: true, esversion: 6, asi: true */

class Phase{
  constructor(newPhase, newDate, newStart, newIntTime, newStop, newDeltaTime, newComments) {
    this.show = true;

    this.name = newPhase
    this.id = 0;
    this.sumInt = 9;
    this.sumDelta = 0;

    this.date = newDate
    this.start = newStart
    this.intTime = newIntTime
    this.stop = newStop
    this.deltaTime = newDeltaTime
    this.comments = newComments

  }

  // addTask( newDate, newStart, newIntTime, newStop, newDeltaTime, newComments) {

  //   let aTask = new Task(newDate, newStart, newIntTime, newStop, newDeltaTime, newComments)
  //   this.allTasks.push(aTask)
  // }


    calculateAverage() {
      for( let aTask of this.allTasks) {
        this.sumInt +=  aTask.intTime
        this.sumDelta += aTask.deltaTime
      }
    }




}
