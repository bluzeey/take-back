"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendarView from "@/components/schedule/CalendarView";
import ListView from "@/components/schedule/ListView";
import ScheduleForm from "@/components/schedule/ScheduleForm";
import NotificationSection from "@/components/schedule/NotificationSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Material } from "@/lib/definitions";
import React from "react";
import axios from "../../../node_modules/axios/index.cjs";
import { useAuth } from "@/context/AuthContext";

export interface Appointment {
  id: string;
  date: Date;
  type: "Pickup" | "Drop-off";
  material: string;
  location: string;
  status: "Confirmed" | "Pending" | "Completed";
  notes?: string;
}

export default function ScheduleManagementPage() {
  const {authTokens}=useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isScheduleFormOpen, setIsScheduleFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
    setIsScheduleFormOpen(false);
  };

  const addScheduling = async (materialData: Material) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/materials/",
        materialData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const handleEditAppointment = (updatedAppointment: Appointment) => {
    setAppointments(
      appointments.map((app) =>
        app.id === updatedAppointment.id ? updatedAppointment : app
      )
    );
    setEditingAppointment(null);
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">
            Manage Your Pickups and Drop-offs
          </h1>
          <Button
            onClick={() => setIsScheduleFormOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Schedule New Pickup/Drop-off
          </Button>
        </div>
        <NotificationSection appointments={appointments} />
        <Tabs defaultValue="calendar" className="mt-8">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar">
            <CalendarView
              appointments={appointments}
              onEditAppointment={setEditingAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          </TabsContent>
          <TabsContent value="list">
            <ListView
              appointments={appointments}
              onEditAppointment={setEditingAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <ScheduleForm
        isOpen={isScheduleFormOpen || !!editingAppointment}
        onClose={() => {
          setIsScheduleFormOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={
          editingAppointment ? handleEditAppointment : handleAddAppointment
        }
        initialData={editingAppointment}
      />
    </div>
  );
}
