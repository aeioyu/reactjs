import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../apollo/client';

const StoreConfigQuery = gql`
  query storeConfigs {
    storeConfigs {
      code
      base_url
    }
  }
`;

const Index = () => {
  const {
    data: { storeConfigs },
  } = useQuery(StoreConfigQuery);

  return (
    <div>
      You're signed in as {storeConfigs[0].base_url} and you're {storeConfigs[0].code} goto{' '}
      <Link href="/about">
        <a>static</a>
      </Link>{' '}
      page.
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: StoreConfigQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
