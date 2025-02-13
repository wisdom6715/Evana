import { useEffect, useState } from "react";

const useDeviceCheck = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileDevices = [
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "opera mini",
        "mobile",
      ];

      setIsMobile(mobileDevices.some((device) => userAgent.includes(device)));
    };

    checkDevice();
  }, []);

  return isMobile;
};

export default useDeviceCheck;
