import dynamic from 'next/dynamic';

export default dynamic(() => import('react-tooltip'), {
  ssr: false,
});