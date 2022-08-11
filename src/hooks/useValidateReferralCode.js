import { fetchApi } from "@/src/services/fetchApi.js";
import { debounce } from "@/utils/debounce";
import { utils } from "@neptunemutual/sdk";
import { useState, useEffect } from "react";

// creates a cancellable request
const fetchValidateReferralCode = fetchApi("fetchValidateReferralCode");

// wraps cancellable request with a debounce
const debouncedValidation = debounce(async (referralCode, setIsValid) => {
  const result = await fetchValidateReferralCode(
    "protocol/cover/referral-code",
    {
      method: "POST",
      body: JSON.stringify({ referralCode }),
    }
  );

  // status 401 is a valid request rejection
  // try catch won't work here
  const isValid = result.message.toLowerCase() === "ok";

  setIsValid(isValid);
}, 400);

/**
 *
 * @param {string} referralCode
 * @returns {boolean}
 */
function isValidReferralCode(referralCode) {
  try {
    utils.keyUtil.toBytes32(referralCode.trim());
    return true;
  } catch (e) {
    return false;
  }
}

export function useValidateReferralCode(referralCode) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const sanitizedValue = referralCode.trim();
    // if there's a value we check it
    if (sanitizedValue.length) {
      if (isValidReferralCode(sanitizedValue)) {
        // immediately disable submit button
        setIsValid(false);
        debouncedValidation(sanitizedValue, setIsValid);
        return;
      }
      setIsValid(false);
      return;
    }

    // if it's empty we set true immediately
    setIsValid(true);
  }, [referralCode]);

  return isValid;
}
