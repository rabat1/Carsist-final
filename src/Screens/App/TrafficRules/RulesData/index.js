

async function MandatoryRules() {
    const Rules = [
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/Oneway.jpg'),
            title: 'One Way',
            description: 'This indicates that the traffic flow is allowed in only one direction',
        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/noBothWay.png'),
            title: 'No Way',
            description: 'This Indicates there is no way in both Directions',
        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/allProhibited.png'),
            title: 'All Vehicles Prohibited',
            description: 'This Indicates that all kinds of Vehicles(Cars,bikes,Busses..etc) are Prohibited',
        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/HandCardProhibitted.jpg'),
            title: 'Hand Carts Prohibited',
            description: 'This Indicates that bringing Hand Cart is Prohibited',

        }, {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/hornProhibit.jpg'),
            title: 'Horn Prohibitted',
            description: 'This Indicates that any kind of horn is not allowed',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/noEntry.png'),
            title: 'No Entry',
            description: 'This Indicates that any kind of Entry is not allowed',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/NoParking.png'),
            title: 'No Parking',
            description: 'This Indicates that Parking is not allowed for any kinds of vehicle',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/padestrianProhibitted.png'),
            title: 'Pedestrians Prohibited',
            description: 'This Indicates that Padestrians are not allowed',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/speedLimit.png'),
            title: 'Speed Limit',
            description: 'This Indicates that the speed of vehicles should be equal to sign board mentioned speed',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/Stop.jpg'),
            title: 'Stop',
            description: 'This Indicates that vehicle should be stopped',

        },
        {
            image: require('../../../../../assets/Images/MandatoryRulesImgs/straightProhibited.png'),
            title: 'Straight Prohibited',
            description: 'These signs located to inform that there is no straight road ahead',

        },
    ]
    return Rules;
}

async function InformatoryRules() {
    const Rules = [
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/eating.png'),
            title: 'Eating Place',
            description: 'This indicates that there is Eating Place NearBy',
        },
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/hospital.png'),
            title: 'Hospital',
            description: 'This indicates that there is Hospital NearBy',
        },
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/parkingBothDir.jpg'),
            title: 'Can Park In Both Directions',
            description: 'This indicates that the driver can park the vehicle in any direction',
        },
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/parkinglotCar.png'),
            title: 'Parking Lot for Cars',
            description: 'This indicates that only Cars can park there',

        }, {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/parkingThisSide.png'),
            title: 'Park This Side',
            description: 'This Indicates that parking can be in only one mentioned direction',

        },
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/petrolPump.png'),
            title: 'Petrol Pump',
            description: 'This indicates that there is Petrol Pump NearBy',

        },
        {
            image: require('../../../../../assets/Images/InformatoryRulesImgs/phone.png'),
            title: 'Public Phone',
            description: 'This Indicates that there is Phone for Public',

        },
    ]

    return Rules;
}

async function RoadRules() {
    const Rules = [
        {
            title: 'Solid Line',
            description: 'Requires you to stay within the lane and also marks the shoulder of the roadway.',
            image: require('../../../../../assets/Images/RoadRulesImgs/SolidLine.jpg'),
            
        },
        {
            title: 'Dotted Line',
            description: 'You may change lanes if it is safe to do so.',
            image: require('../../../../../assets/Images/RoadRulesImgs/dottedLine.jpg'),
           
        },
        {
            title: 'Double Line',
            description: 'A double line indicates that passing is not allowed from either side of the road.',
            image: require('../../../../../assets/Images/RoadRulesImgs/Double.jpg'),
        },
        {
            image: require('../../../../../assets/Images/RoadRulesImgs/Padestrian.jpg'),
            title: 'Padestrian Line',
            description: 'These Line are for People for crossing the Road',

        },
        {
            image: require('../../../../../assets/Images/RoadRulesImgs/YellowLine.jpg'),
            title: 'Yellow Lines',
            description: 'Mark the center of a two-way road used for two-way traffic. You may pass on a two-way road if the yellow centerline is broken. When a solid and a broken yellow line are together, you must not pass if you are driving next to the solid line. Two solid yellow lines mean no passing. Never drive to the left of these lines.',

        },
      
        
    ]

    return Rules;
}


async function TrafficLightRules() {
    const Rules = [
        {
            image: require('../../../../../assets/Images/LightRulesImgs/red.jpg'),
           
            title: 'Stop',
            description: 'A red signal light means STOP.A right turn can be made against a red light ONLY after you stop and yield to pedestrians and vehicles in your path. DO NOT turn if there is a sign posted for NO TURN ON RED.A flashing red signal light means exactly the same as a stop sign: STOP! After stopping, proceed when safe and observe the right-of-way rules.',

        },
        {
            image: require('../../../../../assets/Images/LightRulesImgs/yellow.jpg'),
           
            title: 'Be Alert',
            description: 'A yellow signal light warns you that the red signal is about to appear. When you see the yellow light, you should stop, if you can do so safely. If you cant stop, look out for vehicles that may enter the intersection when the light changes.A flashing yellow signal light warns you to be careful. Slow down and be especially alert.',

        },
        {
            image: require('../../../../../assets/Images/LightRulesImgs/green.jpg'),
           
            title: 'Go',
            description: 'A green light means GO, but you must first let any vehicles, bicycles, or pedestrians remaining in the intersection get through before you move ahead.',

        },
    ]

    return Rules;
}


async function TrafficSignalRules() {
    const Rules = [
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/Right.jpg'),
          
            title: 'Allow Right Side Traffic',
            description: 'TO ALLOW VEHICLES COMING FROM RIGHT AND TURNING RIGHT BY STOPPING TRAFFIC APPROACHING FROM THE LEFT',

        },
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/Behindstop.jpg'),
          
            title: 'Stop behind Vehicles',
            description: 'TO STOP VEHICLES APPROACHING FROM BEHIND',

        },
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/CloseAll.jpg'),
          
            title: 'All Vehicles Stop',
            description: 'WARNING SIGNAL CLOSING ALL VEHICLES',

        },
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/FrontStop.jpg'),
          
            title: 'Stop Front Vehicles',
            description: 'TO STOP VEHICLES COMING FROM FRONT',

        },
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/StopVehicle.jpg'),
          
            title: 'Stop Front And Behind Vehicles',
            description: 'TO STOP VEHICLES APPROACHING SIMULTANEOUSLY FROM FRONT AND BEHIND',

        },
        {
            image: require('../../../../../assets/Images/SignalRulesImgs/WaitRight.jpg'),
          
            title: 'Stop Vehicles Approching from left to Right',
            description: 'TO STOP VEHICLES APPROACHING FROM LEFT AND WAITING TO TURN RIGHT',

        },
          ]

    return Rules;
}



export {
    MandatoryRules, InformatoryRules, RoadRules, TrafficSignalRules, TrafficLightRules
}