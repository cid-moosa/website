"use server";

import { db } from "@/lib/db";
import { generateTicketId } from "@/lib/utils";
import { z } from "zod";

const GrievanceSchema = z.object({
  studentName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  category: z.enum(["Anti-Ragging", "Academic", "POSH/ICC", "Infrastructure", "Examinations", "General"]),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  isAnonymous: z.boolean().default(false),
});

export async function submitGrievance(prevState: any, formData: FormData) {
  try {
    const isAnonymous = formData.get("isAnonymous") === "on";
    
    const validatedData = GrievanceSchema.parse({
      studentName: isAnonymous ? undefined : formData.get("studentName"),
      email: formData.get("email"),
      category: formData.get("category"),
      description: formData.get("description"),
      isAnonymous,
    });

    const ticketId = generateTicketId();

    const grievance = await db.grievance.create({
      data: {
        ticketId,
        studentName: validatedData.studentName || "Anonymous",
        email: validatedData.email,
        category: validatedData.category,
        description: validatedData.description,
        isAnonymous: validatedData.isAnonymous,
        status: "Pending",
      },
    });

    return {
      success: true,
      ticketId: grievance.ticketId,
      message: "Grievance submitted successfully. Please save your Ticket ID to track the status.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).issues?.[0]?.message || (error as any).errors?.[0]?.message || "Validation failed" };
    }
    return { success: false, error: "An unexpected error occurred while submitting." };
  }
}

export async function trackGrievance(ticketId: string) {
  if (!ticketId || ticketId.trim() === "") return { success: false, error: "Ticket ID is required" };

  try {
    const grievance = await db.grievance.findUnique({
      where: { ticketId: ticketId.trim().toUpperCase() },
      select: {
        ticketId: true,
        status: true,
        category: true,
        resolutionNotes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!grievance) {
      return { success: false, error: "No grievance found with this Ticket ID." };
    }

    return { success: true, data: grievance };
  } catch (error) {
    return { success: false, error: "Failed to track grievance." };
  }
}
