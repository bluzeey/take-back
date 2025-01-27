"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Material } from "@/lib/definitions";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Material name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  tracking_id: z.string().regex(/^[A-Za-z0-9]{6}$/, {
    message: "Tracking ID must be 6 alphanumeric characters.",
  }),
});

interface AddMaterialFormProps {
  onSubmit: (material: Material) => void;
  initialData?: Material | null;
}

export default function AddMaterialForm({
  onSubmit,
  initialData,
}: AddMaterialFormProps) {
  const { authTokens } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tracking_id: "",
    },
  });

  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/materials/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          ...values,
          status: initialData?.status || "In Tracking",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create material");
      }

      const newMaterial = await response.json();

      // Call the onSubmit prop with the new material
      onSubmit(newMaterial);

      // Show success message
      setMessage({ text: "Material added successfully!", type: "success" });
      form.reset();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setMessage({
          text: error.message || "An error occurred",
          type: "error",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Plastic Bottles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the material and its condition"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tracking_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ABC123" {...field} />
              </FormControl>
              <FormDescription>
                Enter a unique 6-character alphanumeric ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {initialData ? "Update Material" : "Add Material"}
        </Button>
      </form>
      {message && (
        <div
          className={`my-4 text-${
            message.type === "success" ? "green-600" : "red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </Form>
  );
}
