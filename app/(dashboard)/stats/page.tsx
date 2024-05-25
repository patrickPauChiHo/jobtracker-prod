import React from "react";
import { getStatsAction, getChartsDataAction } from "@/utils/actions";
import StatsContainer from "@/components/StatsContainer";
import ChartsContainer from "@/components/ChartsContainer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  //const stats = await getStatsAction();
  //console.log(stats);
  //const charts = await getChartsDataAction();
  //console.log(charts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
};

export default StatsPage;
