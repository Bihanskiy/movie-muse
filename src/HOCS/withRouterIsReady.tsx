import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";


function withRouterIsReady(Component: ComponentType) {
  const Page = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (router.isReady) {
        setLoaded(true)
      }
    }, [router.query])

    return loaded ? <Component /> : null;
  };

  return Page;
}

export default withRouterIsReady;