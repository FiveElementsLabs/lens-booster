import { useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { useSharedState } from "../context/store";
import actions from "../context/actions";
import networks from "../helpers/networks";

export const useWallet = () => {
  const [{ provider }, dispatch] = useSharedState();

  const networkChanged = async () => {
    const Web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const { name: network_name, chainId: chain_id } =
      await Web3Provider.getNetwork();
    dispatch({
      type: actions.CHANGE_NETWORK,
      payload: { network_name, chain_id, provider: Web3Provider },
    });
  };

  useEffect(() => {
    window?.ethereum?.on("chainChanged", async () => await networkChanged());

    return () => {
      window.ethereum.removeListener(
        "chainChanged",
        async () => await networkChanged()
      );
    };
  }, []);

  const connectMetamask = async () => {
    if (!window.ethereum) toast.error("No compatible wallet found.");

    const Web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = (await Web3Provider.send("eth_requestAccounts", []))[0];
    const { name: network_name, chainId: chain_id } =
      await Web3Provider.getNetwork();

    dispatch({
      type: actions.LOGIN_WALLET,
      payload: { account, provider: Web3Provider, network_name, chain_id },
    });
  };

  const loginWallet = async () => {
    try {
      await connectMetamask();
      toast.success("Wallet connected");
    } catch (err) {
      console.error(err);
    }
  };

  const autoLoginWallet = async () => {
    const shouldAutoConnect =
      window.localStorage.getItem("shouldConnectMetamask") === "true";

    if (shouldAutoConnect) {
      await loginWallet();
    }
  };

  const logoutWallet = async () => {
    dispatch({ type: actions.LOGOUT_WALLET });
    toast.success("Wallet disconnected");
  };

  const changeNetwork = async (networkName) => {
    if (!window.ethereum) toast("No compatible wallet found.");
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{ ...networks[networkName] }],
      });

      const { name: network_name, chainId: chain_id } =
        await provider.getNetwork();
      dispatch({
        type: actions.CHANGE_NETWORK,
        payload: { network_name, chain_id },
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  return { loginWallet, autoLoginWallet, logoutWallet, changeNetwork };
};
