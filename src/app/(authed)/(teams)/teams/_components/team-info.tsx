import { Settings } from "lucide-react";
import React from "react";

import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TeamInfo = async () => {
  return (
    <Card className="space-y-2 p-4 sm:space-y-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1 sm:space-y-2">
          <div className="space-x-2">
            <span className="text-gray-400">Team id:</span>
            <span>123</span>
          </div>
          <div className="space-x-2">
            <span className="text-gray-400">Team name:</span>
            <span>Personal</span>
          </div>
        </div>
        <InviteMemberButton />
      </div>
      <Separator />
      <div>
        <Table>
          <TableCaption>Members of team</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Super handsome</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Update role</DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Super handsome</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Update role</DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Super handsome</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Update role</DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
