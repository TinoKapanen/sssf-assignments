const InputGeoJSONType = new GraphQLInputObjectType({
  name: 'Location',
  description: 'Location as array, longitude first',
  fields: () => ({
    type: {type: GraphQLString, defaultValue: 'Point'},
    coordinates: {type: new GraphQLNonNull(new GraphQLList(GraphQLFloat))},
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    station: {
      type: stationType,
      description: 'Get station by id',
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return station.findById(args.id);
      },
    },
    stations: {
      type: new GraphQLList(stationType),
      description: 'Get all stations',
      args: {
        bounds: {type: Bounds},
        limit: {type: GraphQLInt, defaultValue: 10},
        start: {type: GraphQLInt},
      },
      resolve: (parent, args) => {
        // console.log(args);
        if (args.bounds) { // if bounds arg is in query
          // console.log('bounds', args.bounds);
          const mapBounds = rectangleBounds(args.bounds._northEast,
              args.bounds._southWest);
          return station.find(({
            Location: {
              $geoWithin: {  // geoWithin is built in mongoose, https://mongoosejs.com/docs/geojson.html
                $geometry: mapBounds,
              },
            },
          }));
        } else { // if no args or start or limit
          return station.find().skip(args.start).limit(args.limit);
        }
      },
    },
    connectiontypes: {
      type: new GraphQLList(connectiontypeType),
      description: 'Connection types for connections',
      resolve: (parent, args) => {
        return connectiontype.find();
      },
    },
    currenttypes: {
      type: new GraphQLList(currenttypeType),
      description: 'Current types for connections',
      resolve: (parent, args) => {
        return currenttype.find();
      },
    },
    leveltypes: {
      type: new GraphQLList(levelType),
      description: 'Level types for connections',
      resolve: (parent, args) => {
        return level.find();
      },
    },
    user: {
      type: userType,
      description: 'Get user by token, authentication required.',
      resolve: async (parent, args, {req, res}) => {
        try {
          const result = await authController.checkAuth(req, res);
          result.token = 'you have it already';
          return result;
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
    login: {
      type: userType,
      description: 'Login with username and password to receive token.',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args, {req, res}) => {
        console.log('arks', args);
        req.body = args; // inject args to reqest body for passport
        try {
          const authResponse = await authController.login(req, res);
          console.log('ar', authResponse);
          return {
            id: authResponse.user._id,
            ...authResponse.user,
            token: authResponse.token,
          };
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    addStation: {
      type: stationType,
      description: 'Add station, authentication required.',
      args: {
        Connections: {
          type: new GraphQLNonNull(new GraphQLList(InputConnection)),
        },
        Title: {type: new GraphQLNonNull(GraphQLString)},
        AddressLine1: {type: new GraphQLNonNull(GraphQLString)},
        Town: {type: new GraphQLNonNull(GraphQLString)},
        StateOrProvince: {type: GraphQLString},
        Postcode: {type: new GraphQLNonNull(GraphQLString)},
        Location: {type: InputGeoJSONType},
      },
      resolve: async (parent, args, {req, res}) => {
        try {
          await authController.checkAuth(req, res);
          const conns = await Promise.all(args.Connections.map(async conn => {
            let newConnection = new connection(conn);
            const result = await newConnection.save();
            return result._id;
          }));

          let newStation = new station({
            ...args,
            Connections: conns,
          });
          return newStation.save();
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
    modifyStation: {
      type: stationType,
      description: 'Modify station, authentication required.',
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        Connections: {
          type: new GraphQLList(ModifyConnection),
        },
        Title: {type: GraphQLString},
        AddressLine1: {type: GraphQLString},
        Town: {type: GraphQLString},
        StateOrProvince: {type: GraphQLString},
        Postcode: {type: GraphQLString},
      },
      resolve: async (parent, args, {req, res}) => {
        try {
          await authController.checkAuth(req, res);
          const conns = await Promise.all(args.Connections.map(async conn => {
            const result = await connection.findByIdAndUpdate(conn.id, conn,
                {new: true});
            return result;
          }));

          let newStation = {
            Title: args.Title,
            AddressLine1: args.AddressLine1,
            Town: args.Town,
            StateOrProvince: args.StateOrProvince,
            Postcode: args.Postcode,
          };
          return await station.findByIdAndUpdate(args.id, newStation,
              {new: true});
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
    deleteStation: {
      type: stationType,
      description: 'Delete station, authentication required.',
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: async (parent, args, {req, res}) => {
        try {
          authController.checkAuth(req, res);
          // delete connections
          const stat = await station.findById(args.id);
          const delResult = await Promise.all(
              stat.Connections.map(async (conn) => {
                return await connection.findByIdAndDelete(conn._id);
              }));
          console.log('delete result', delResult);
          const result = await station.findByIdAndDelete(args.id);
          console.log('delete result', result);
          return result;
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
    registerUser: {
      type: userType,
      description: 'Register user.',
      args: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
        full_name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args, {req, res}) => {
        try {
          const hash = await bcrypt.hash(args.password, saltRound);
          const userWithHash = {
            ...args,
            password: hash,
          };
          const newUser = new user(userWithHash);
          const result = await newUser.save();
          if (result !== null) {
            // automatic login
            req.body = args; // inject args to request body for passport
            const authResponse = await authController.login(req, res);
            console.log('ar', authResponse);
            return {
              id: authResponse.user._id,
              ...authResponse.user,
              token: authResponse.token,
            };
          } else {
            throw new Error('insert fail');
          }
        }
        catch (err) {
          throw new Error(err);
        }
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
