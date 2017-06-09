  /* jshint undef: true, unused: true, esversion: 6, asi: true */

class Project {
  constructor(newName) {
    this.allPhases = []
    this.name = newName

    this.SumInt = 0
    this.AveInt = 0

    this.SumDelta = 0
    this.AveDelta= 0

    this.correlation = 0

    this.show = false

  }

  addPhase( newPhase, newDate, newStart, newIntTime, newStop, newDeltaTime, newComments) {
    let aPhase = new Phase(newPhase, newDate, newStart, newIntTime, newStop, newDeltaTime, newComments)
    this.allPhases.push(aPhase)
  }

  findPhase( target ) {
    let foundPhase = null
    for ( let aPhase of this.allPhases ){
      if ( aPhase.name === target ) {
        foundPhase = aPhase
      }
    }
    return foundPhase
  }

  calculateAll(){
    this.calculateInt()
    this.calculateDelta()
    this.calculateCorrelation()
  }

  calculateInt(){
    this.SumInt = 0

    for(let aPhase of this.allPhases) {
      this.SumInt += Number(aPhase.intTime)
    }

    this.AveInt = this.SumInt/this.allPhases.length
  }

  calculateDelta(){
    this.SumDelta = 0

    for(let aPhase of this.allPhases) {
      let listData = aPhase.deltaTime.split(':')
      let totalMinutes = Number(listData[0])*60 + Number(listData[1])

      this.SumDelta += totalMinutes
    }

    this.AveDelta = this.SumDelta/this.allPhases.length

  }

  calculateCorrelation(){
    let sumTop = 0
    let sumBottom = 0
    let sumX2 = 0
    let sumY2 = 0

    for(let aPhase of this.allPhases) {
      let listData = aPhase.deltaTime.split(':')
      let totalMinutes = Number(listData[0]) * 60 + Number(listData[1])

      let x = aPhase.intTime - this.AveInt
      let y = totalMinutes - this.AveDelta
      let x2 = Math.pow(x, 2);
      let y2 = Math.pow(y, 2);

       sumTop += x * y

       sumX2 += x2
       sumY2 += y2
    }

    sumBottom = sumX2 * sumY2;
    this.correlation = sumTop/Math.sqrt(sumBottom);

  }

}
