import { useSearchInput } from "@/hooks/store/useSearchInput";
import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/router";

function withSearchInputText(Component: ComponentType) {
  const Page = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const { searchInput } = useSearchInput();

    useEffect(() => {
      if (!searchInput) {
        router.push(
          {
            query: {}
          },
          undefined,
          { shallow: true }
        );
      }
      setLoaded(true);

    }, [])

    return loaded ? <Component /> : null;
  };

  return Page;
}

export default withSearchInputText;