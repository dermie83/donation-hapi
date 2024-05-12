export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  groups: {
    _model: "Group",
    one: {
      name: "West",
    },
    two: {
      name: "East",
    },
    three: {
      name: "North",
    },
    four: {
      name: "South",
    },
  },
  lighthouses: {
    _model: "Lighthouse",
    one: {
      name: "Inisheer",
      user: "->users.marge",
      group: "->groups.one",
      lat: "52.161290",
      lng: "-7.51540",
      img:"http://res.cloudinary.com/dbx8kj5x4/image/upload/v1712088094/erxlob4tqjqne8wfdjr8.jpg",
    },
    two: {
      name: "Hook",
      user: "->users.homer",
      group: "->groups.two",
      lat: "53.161290",
      lng: "-7.51540",
      img:"",
    },
    three: {
      name: "Blackhead",
      user: "->users.bart",
      group: "->groups.three",
      lat: "54.161290",
      lng: "-7.51540",
      img:"",
    },
  },
};