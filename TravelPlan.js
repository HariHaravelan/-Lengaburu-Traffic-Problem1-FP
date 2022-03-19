const weathers = {
    SUNNY: {
      craterImpactingPercentage: -10
    },
    RAINY: {
      craterImpactingPercentage: 20
    },
    WINDY: {
      craterImpactingPercentage: 0
    }
  };
  
  const vehicles = [{
      name: 'TukTuk',
      ridableWeathers: [weathers.SUNNY, weathers.RAINY],
      speedInMmph: 12,
      minsTakenInCrater: 1
    },
    {
      name: 'Bike',
      ridableWeathers: [weathers.SUNNY, weathers.WINDY],
      speedInMmph: 10,
      minsTakenInCrater: 2
    },
    {
      name: 'Car',
      ridableWeathers: [weathers.SUNNY, weathers.RAINY, weathers.WINDY],
      speedInMmph: 20,
      minsTakenInCrater: 3
    }
  ];
  
  let orbits = [{
    name: 'Orbit1',
    distanceInMm: 18,
    trafficSpeed: 12,
    craters: 20
  }, {
    name: 'Orbit2',
    distanceInMm: 20,
    trafficSpeed: 10,
    craters: 10
  }];
  
  
  const MINUTES_IN_HOUR = 60;
  const PERCENTAGE = 100;
  
  const getRidableVehicles = (vehicles, weather) => {
    return vehicles.filter(vehicle => vehicle.ridableWeathers.includes(weather));
  };
  
  const getTravelTime = (vehicle, orbit, noOfCraters) => {
    return (orbit.trafficSpeed < vehicle.speedInMmph ? (orbit.distanceInMm / orbit.trafficSpeed) : (orbit.distanceInMm / vehicle.speedInMmph)) * MINUTES_IN_HOUR + noOfCraters * vehicle.minsTakenInCrater;
  };
  
  
  const getNoOfCraters = (orbit, weather) => {
    return parseInt(orbit.craters + (orbit.craters * weather.craterImpactingPercentage / PERCENTAGE));
  }
  
  const getFastestJourney = (vehicles, orbits, weather) => {
    return getRidableVehicles(vehicles, weather)
      .flatMap(vehicle =>
        orbits.map(orbit => ({
          vehicle: vehicle.name,
          orbit: orbit.name,
          travelTime: getTravelTime(vehicle, orbit, getNoOfCraters(orbit, weather)),
          vehicleSpeed: vehicle.speedInMmph,
        })))
      .reduce((journey, otherJourney) => reduceToFastestJourney(journey, otherJourney));
  };
  
  const reduceToFastestJourney = (journey, otherJourney) => {
    return journey.travelTime === otherJourney.travelTime && journey.vehicleSpeed < otherJourney.vehicleSpeed || journey.travelTime < otherJourney.travelTime ? journey : otherJourney;
  }
  
  const getTravelPlan = (vehicles, orbits, weather) => {
    console.log("Input: Weather is SUNNY");
    orbits.forEach(orbit => console.log(`${orbit.name} traffic speed is ${orbit.trafficSpeed}`));
  
    return parseOutcome(getFastestJourney(vehicles, orbits, weather));
  }
  
  const parseOutcome = (outcome) => `Expected Output: Vehicle ${outcome.vehicle} on ${outcome.orbit}`;
  