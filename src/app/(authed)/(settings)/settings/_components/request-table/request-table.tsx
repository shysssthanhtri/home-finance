"use client";

import React from "react";

import { RequestRow } from "@/app/(authed)/(settings)/settings/_components/request-table/request-row";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type TRequestJoinTeamInfoDto } from "@/domain/dtos/team";

type Props = {
  requests: TRequestJoinTeamInfoDto[];
};
export const RequestTable = ({ requests }: Props) => {
  return (
    <Card className="pt-4 sm:pt-6">
      <CardContent>
        <Table>
          <TableCaption>Your pending requests to join team.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Team name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <RequestRow
                key={[request.teamId, request.userId].join(",")}
                request={request}
              />
            ))}
            {!requests.length && (
              <TableRow>
                <TableCell
                  className="text-center font-medium text-gray-500"
                  colSpan={3}
                >
                  Empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
