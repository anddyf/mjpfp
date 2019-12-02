const Sequelize = require('sequelize');
const pg = require('pg')
const runtime = require("regenerator-runtime/runtime")
const conn = new Sequelize('postgres://localhost:5432/calendar')

const Calendar = conn.define('calendar', {
    month: {
        type: Sequelize.STRING,
        allowNull: false
    },
    abbrev: {
        type: Sequelize.STRING,
        allowNull: false
    },
    day: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
const Tasks = conn.define('tasks', {
    tasks: {
        type: Sequelize.STRING,
        allowNull: true
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})
Calendar.belongsTo(Tasks)
Tasks.hasMany(Calendar)

const syncAndSeed = async() => {
    try{
        await conn.sync({force:true})
        const date = []
        let currentYr = 2019
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

        for(let j = 0; j < 3; j++){
            //create years
            for ( let i = 0 ; i < months.length; i++ ){
                //create months
                let oneMonth = months[i]
                for ( let k = 1; k <= 31; k++){  
                    //create days
                    if (oneMonth === "February" ){
                        if (k > 28 && currentYr !== 2020) date.push({ month: 'None',abbrev:'None', day: k , year: currentYr})
                        else if ( k > 29 && currentYr === 2020) date.push({ month: 'None',abbrev: oneMonth.slice(0,3), day: k , year: currentYr})
                        else date.push({ month: oneMonth, abbrev: oneMonth.slice(0,3), day: k , year: currentYr})
                    }
                    else if(oneMonth === "April" || oneMonth === "June" || oneMonth === "September" || oneMonth === "November"){
                        if(k > 30) date.push({ month: 'None',abbrev:'None', day: k , year: currentYr})
                        else date.push({ month: oneMonth,abbrev: oneMonth.slice(0,3), day: k , year: currentYr})
                    }
                    else{
                        date.push({ month: oneMonth,abbrev: oneMonth.slice(0,3), day: k , year: currentYr})
                    }
                }
            }
        currentYr += 1
        }
        date.forEach( async(createDate) => {
        let task = await Tasks.create({ tasks: null, completed:false})
        await Calendar.create({ ...createDate, taskId: task.id })
        })
    }
    catch(e){
        console.log(e)
    }
 }

 syncAndSeed()

module.exports = {
    conn,
    Sequelize,
    syncAndSeed,
    Tasks,
    Calendar
} 