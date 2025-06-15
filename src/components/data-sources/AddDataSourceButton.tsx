
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const dataSourceTypes = [
  "Transaction Data",
  "Security Logs",
  "Network Data",
  "API Data",
  "User Data",
  "Payment Processor",
  "Custom Database",
];

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  type: z.string({ required_error: "Please select a data source type." }),
});

export function AddDataSourceButton() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.from("data_sources").insert([
        {
          name: values.name,
          type: values.type,
          status: "connected",
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Data source added successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["data_sources"] });
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error adding data source",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="border-0 border-dashed border-2 border-security-blue/30 shadow-none bg-transparent hover:bg-security-blue/5 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center py-10 h-full">
            <div className="h-12 w-12 rounded-full bg-security-blue/20 flex items-center justify-center text-security-blue mb-4">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-security-blue mb-1">Add Data Source</h3>
            <p className="text-sm text-gray-400 text-center max-w-[250px]">
              Connect a new data source to enhance anomaly detection
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-security-navy border-security-blue/20">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Data Source</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect a new data source. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Data Source Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. E-commerce Platform" {...field} className="bg-security-navy-deep border-security-blue/30 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Data Source Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-security-navy-deep border-security-blue/30 text-white">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-security-navy-deep border-security-blue/30 text-white">
                      {dataSourceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="bg-security-blue hover:bg-security-blue/90 text-white">
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
