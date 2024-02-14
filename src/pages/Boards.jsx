import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "../Utils/components/layout";
import Icon from "../Utils/Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Boards = () => {

  return (
    <Layout pageName="Boards">
      <div className="m-auto flex items-center px-[40px] ">
        <div className="m-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button flex className="gap-2">
                <Icon name="PlusCircle" /> Add Task{" "}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Task Assign Page</DialogTitle>
                <DialogDescription>Assign Task Here..!!</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value=""
                    placeholder="Enter name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value=""
                    placeholder="Enter the email address"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="time"
                    value=""
                    placeholder=""
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button className="items-center" type="submit">
                  Assign Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default Boards;
