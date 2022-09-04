import { user } from './stores';

export default async () => {
  const { ethereum } = window;

  if (!ethereum) {
    console.warn('Please install metamask browser plugin.');
    return;
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' });

  if (accounts[0]) {
    user.update(() => accounts[0]);
  }
};
