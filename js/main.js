/* jshint undef: true, unused: true, esversion: 6, asi: true */

      var app = new Vue({
          el: '#root',

          data : {

            newProject: 'Assignment2',
            newPhase: 'define requirement',
            newDate: '',
            newStart: '',
            newIntTime: 0,
            newStop: '',
            newDeltaTime: '',
            newComments: 'good job',

            projects : [],
            aProject : {},

            prev : '',

            pauseTime: '',
            restartTime: '',
            sButton: true,
            pButton: false,
            rButton: false,
            stButton: false,

            },


          methods: {

            /*
             * project adding finding and deleting
             */

            addProject(newProject){

             let exist = false;

              for (let a of this.projects){
                if(a.name === newProject) {
                  alert(newProject + " already exist");
                  exist = true;
                }
              }

              if ( !exist ) {
              this.aProject = new Project(this.newProject),
              this.projects.push(this.aProject);
              }
            },

            findProject( targetName ,index) {
              let foundProject = null
              for ( let aProject of this.projects ){
                if ( aProject.name === targetName ) {
                  foundProject = aProject
                  foundProject.show = true
                } else {
                  this.aProject.show = false
                }

              }
              this.aProject = foundProject
              console.log(targetName)

              let selectId = document.getElementById("projectId"+index);
              let lastSelectId = document.getElementById(this.prev);
              // this.removeSiblingsClass(selectId);

              if (this.prev) {
                lastSelectId.classList.remove("btn-success");
              }
              selectId.className= "btn-success";

              this.prev = "projectId"+index;

              return this.aProject

            },

            deleteProject(index) {
              this.projects.splice(index, 1)
            },


            /*
             * add Timelog in one project
             */
            addTimelog() {
              if( this.projects.length ) {
                this.computeDeltaTime()
                this.aProject.addPhase( this.newPhase, this.newDate, this.newStart, this.newIntTime, this.newStop, this.newDeltaTime, this.newComments)
                this.newIntTime = 0
              } else {
                alert("Please create a new project first");
              }
            },
            /*
             * report table editing
             */
            delete_row(index) {
              this.aProject.allPhases.splice(index, 1)
            },

            edit_row(aPhase) {
              aPhase.show = false;
            },


            save_row(aPhase) {

              aPhase.show = true;
            },




           /*
            * file reader method
            */
           loadedHandler(event) {
               let myFile = event.target.result  //event.target.result
               let listData = myFile.split('\r\n')
               // console.log(listData)
               let data

               for (let i = 0; i < listData.length; i ++ ) {
                  // console.log(listData[i])
                  data = listData[i].split(',')

                  //not valid data break ,to modify later
                  if (data.length < 7)
                    break;

                  let nameP = data.splice(0,1);
                  let namePro = nameP.toString();

                  let exist = false;

                   for (let aProject of this.projects){
                     if(aProject.name === namePro) {
                       this.aProject = aProject;
                       exist = true;
                     }
                   }

                   if ( !exist ) {
                    this.aProject = new Project(namePro);
                    this.projects.push(this.aProject);
                  }


                  // console.log(data)
                 this.aProject.addPhase( ...data)
               }
                // console.log(this.aProject)
            },

            onFileChange(e) {
                    let files = e.target.files || e.dataTransfer.files;
                    // console.log(files)
                    let theFile = files[0]
                    // console.log(theFile)

                    let reader = new window.FileReader();
                    reader.onload = this.loadedHandler
                    reader.readAsText(theFile)
                    // console.log("it has been told to load")

            },


            /*
             * compute Delta Time
             */
            computeDeltaTime(){

              let start = new Date(this.newDate+'T'+this.newStart)
              let stop = new Date(this.newDate+'T'+this.newStop)

              let leftMinutes = 60*stop.getHours()+stop.getMinutes() - (60*start.getHours()+start.getMinutes()) - this.newIntTime
              let hours = Math.floor(leftMinutes/ 60)
              let minutes = leftMinutes% 60;

              if (isNaN(minutes)){
                this.newDeltaTime = 0

              } else {

                minutes = this.checkTime(minutes)
                this.newDeltaTime = (hours+":"+minutes)
              }



            },



            /*
             * Button click to fill time
             */
            startButton() {
              let time = new Date();
              let date = time.getDate()
              let month = time.getMonth()
              let year = time.getFullYear()
              let hours = time.getHours()
              let minutes = time.getMinutes()

              if(month+1<10){
                month = "0"+(month+1)
              } else {
                month = month+1
              }

              date = this.checkTime(date)

              this.newDate = year+"-"+(month)+"-"+date

              minutes = this.checkTime(minutes)
              hours = this.checkTime(hours)


              this.newStart = hours+":"+minutes
              this.sButton = false;
              this.pButton = true;
              this.rButton = false;
              this.stButton = true;
              // startTime()


            },

            pauseButton() {
                this.pauseTime = new Date();
                this.pButton = false;
                this.rButton = true;
                this.stButton = true;
                // stopFunction()
            },

            restartButton() {
                  this.restartTime = new Date();

                  let restartHours = this.restartTime.getHours()
                  let restarMinutes = this.restartTime.getMinutes()
                  let pauseHours = this.pauseTime.getHours()
                  let pauseMinutes = this.pauseTime.getMinutes()

                  this.newIntTime += Number(restartHours * 60 + restarMinutes -
                                    pauseHours * 60 - pauseMinutes);


                  this.pButton = true;
                  this.rButton = false;
                  this.stButton = true;
                  // startTime()

            },



            stopButton() {
              let time = new Date();

              let hours = time.getHours()
              let minutes = time.getMinutes()

              hours = this.checkTime(hours)
              minutes = this.checkTime(minutes)

              this.newStop = hours+":"+minutes
              this.sButton = true;
              this.pButton = false;
              this.rButton = false;
              this.stButton = false;
              // stopFunction()
            },

            checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }  // add zero in front of numbers < 10
                return i;
            },

            /*
             * Local storage
             */
            saveToStorage() {
              localStorage.setItem("portfolio", JSON.stringify(this.projects));
              console.log(localStorage.getItem("portfolio"))
            },

            loadFromStorage() {
              data = JSON.parse(localStorage.getItem("portfolio"))
              this.projects = data
            },


            /*
             * Alarm set
             */




          },

          computed: {
            delta() {
             this.computeDeltaTime();
             startTime()
             return this.newDeltaTime
            }

          }


  })










