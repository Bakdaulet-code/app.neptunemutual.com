import { useCallback, useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { AddressZero } from "@ethersproject/constants";

import { convertToUnits, isValidNumber } from "@/utils/bn";
import { getProviderOrSigner } from "@/lib/connect-wallet/utils/web3";
import { useAppContext } from "@/src/context/AppWrapper";
import { registry } from "@neptunemutual/sdk";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useInvokeMethod } from "@/src/hooks/useInvokeMethod";
import { useErrorNotifier } from "@/src/hooks/useErrorNotifier";

export const useCalculateLiquidity = ({ coverKey, podAmount }) => {
  const mountedRef = useRef(false);
  const { library, account } = useWeb3React();
  const { networkId } = useAppContext();

  const debouncedValue = useDebounce(podAmount, 200);
  const [receiveAmount, setReceiveAmount] = useState("0");
  const { invoke } = useInvokeMethod();
  const { notifyError } = useErrorNotifier();

  const calculateLiquidity = useCallback(async () => {
    if (!networkId || !debouncedValue || !isValidNumber(debouncedValue)) {
      return;
    }

    const signerOrProvider = getProviderOrSigner(
      library,
      account || AddressZero,
      networkId
    );

    try {
      const instance = await registry.Vault.getInstance(
        networkId,
        coverKey,
        signerOrProvider
      );

      const args = [convertToUnits(debouncedValue).toString()];
      const liquidityAmount = await invoke(
        instance,
        "calculateLiquidity",
        {},
        notifyError,
        args,
        false
      );

      if (!mountedRef.current) return;
      setReceiveAmount(liquidityAmount);
    } catch (error) {
      notifyError(error, "calculate liquidity");
    }
  }, [
    account,
    coverKey,
    debouncedValue,
    invoke,
    library,
    networkId,
    notifyError,
  ]);

  useEffect(() => {
    mountedRef.current = true;

    calculateLiquidity();

    return () => {
      mountedRef.current = false;
    };
  }, [calculateLiquidity]);

  return {
    receiveAmount,
  };
};
