"use client";

import { endOfDay, startOfMonth } from "date-fns";
import { useCallback, useState } from "react";

import { type TGetTransactionInDurationDto } from "@/domain/dtos/transaction/get-transaction-in-duration.dto";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
};
export const useTransactionHistory = ({ teamId }: Props) => {
  const [options, setOptions] = useState<
    Omit<TGetTransactionInDurationDto, "teamId">
  >({
    duration: {
      from: startOfMonth(new Date()),
      to: endOfDay(new Date()),
    },
  });

  const { data: transactions = [], isPending } =
    api.transaction.getTransactionsInDuration.useQuery({
      teamId,
      ...options,
    });

  const utils = api.useUtils();
  const refetch = useCallback(
    () => utils.transaction.getTransactionsInDuration.refetch(),
    [utils],
  );

  return {
    options,
    setOptions,
    transactions,
    isPending,
    refetch,
  };
};
