'use strict';
 
 const {
     GraphQLObjectType, 
     GraphQLID, 
     GraphQLString, 
     GraphQLList, 
     GraphQLSchema,
     GraphQLNonNull,
    } = require('graphql');
 
 const animalData = [
   {
     id: '1',
     animalName: 'Frank',
     species: '1',
   },
   {
       id: '2',
       animalName: 'John',
       species: '2',
   }
 ];
 
 const speciesData = [
   {
     id: '1',
     speciesName: 'Cat',
     category: '1',
   },
   {
    id: '2',
    speciesName: 'dog',
    category: '1',
   }
 ];
 
 const categoryData = [
   {
     id: '1',
     categoryName: 'Mammal',
   },
 ];
 
 const animalType = new GraphQLObjectType({
   name: 'animal',
   description: 'Animal name and species',
   fields: () => ({
     id: {type: GraphQLID},
     animalName: {type: GraphQLString},
     species: {
         type: speciesType,
         resolve(parent, args){
             //console.log(parent);
             return speciesData.find(spe => spe.id === parent.species);
         },
    },
   }),
 });

 const speciesType = new GraphQLObjectType({
    name: 'species',
    description: 'Animal species',
    fields: () => ({
      id: {type: GraphQLID},
      speciesName: {type: GraphQLString},
      category: {
          type: categoryType,
          resolve: (parent, args) => {
              //console.log(parent);
              return categoryData.find(cat => cat.id === parent.category);
          },
        },
    }),
  });

  const categoryType = new GraphQLObjectType({
    name: 'category',
    description: 'Animal category',
    fields: () => ({
      id: {type: GraphQLID},
      categoryName: {type: GraphQLString},
    }),
  });
 
 const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   description: 'Main query',
   fields: {
     animals: {
       type: new GraphQLNonNull(new GraphQLList(animalType)),
       description: 'Get all animals',
       resolve: (parent, args) => {
         return animalData;
       },
     },
     animal: {
         type: animalType,
         description: 'Get animal by id',
         args: {
             id: {type: new GraphQLNonNull(GraphQLID)},
         },
         resolve: (parent, args) => {
             return animalData;
         }
     }
   },
 });
 
 module.exports = new GraphQLSchema({
   query: RootQuery,
 });
