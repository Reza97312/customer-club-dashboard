import { useQuery } from "@tanstack/react-query";
import {
  getVitrinList,
  getPersonalSummary,
  getVitrinSummary,
  getVitrinDetails,
} from "../services/CustomerClub.api";

export const useCustomerClubData = (activeTab: string | number) => {
  const { data: vitrins } = useQuery({
    queryKey: ["vitrin-list"],
    queryFn: getVitrinList,
  });

  const { data: personalSummary } = useQuery({
    queryKey: ["personal-summary"],
    queryFn: getPersonalSummary,
    enabled: activeTab === "personal",
  });

  const { data: vitrinDetail } = useQuery({
    queryKey: ["vitrin-detail", activeTab],
    queryFn: () => getVitrinDetails(activeTab as number),
    enabled: typeof activeTab === "number",
  });

  const { data: vitrinSummary } = useQuery({
    queryKey: ["vitrin-summary", activeTab],
    queryFn: () => getVitrinSummary(activeTab as number),
    enabled: typeof activeTab === "number",
  });

  return { vitrins, personalSummary, vitrinDetail, vitrinSummary };
};
