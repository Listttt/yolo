import { GraphQLClient, gql } from 'graphql-request';
import {CountryResponseInterface} from "@/service/country/types/CountryResponseInterface";
// //@ts-ignore
// const graphqlReq = require('graphql-request').default;
// const { GraphQLClient, gql } = graphqlReq;

const GET_COUNTRIES = gql`
  query GetCountries($filterCriteria: String!) {
      countries(filter: {code: {regex: $filterCriteria}}) {
        name
        code
      }
  }
`;

//@ts-ignore
const client = new GraphQLClient(process.env.NEXT_PUBLIC_DOMAIN);

export const fetchCountries = (filterCriteria: string): Promise<CountryResponseInterface> => client.request(GET_COUNTRIES, {filterCriteria});
