import { useSearchParams } from "next/navigation";

export default function useCleanSearchParams() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams();

  searchParams.forEach((value, key) => {
    if (value !== "") {
      newSearchParams.set(key, value);
    }
  });

  return newSearchParams;
}
