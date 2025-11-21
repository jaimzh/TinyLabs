"use client";

import React, { useState, useEffect } from "react";
import { Plus, ArrowLeft, Beaker, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TinyLabs() {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [experiments, setExperiments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    observation: "",
    hypothesis: "",
    action: "",
    duration: "",
    results: "",
    reflection: "",
    nextStep: ""
  });

  // Load & Save localStorage logic
  useEffect(() => {
    const saved = localStorage.getItem("tiny-labs-v3-data");
    if (saved) setExperiments(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tiny-labs-v3-data", JSON.stringify(experiments));
  }, [experiments]);

  const handleCreate = () => {
    setExperiments([{ ...formData, id: Date.now(), status: "active", logs: [] }, ...experiments]);
    setFormData({ observation: "", hypothesis: "", action: "", duration: "", results: "", reflection: "", nextStep: "" });
    setView("list");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      {view === "list" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Beaker className="w-6 h-6" /> TinyLabs
            </h1>
            <Button onClick={() => setView("create")}>
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>

          {experiments.length === 0 ? (
            <Card className="text-center py-10 border-dashed border-2 border-slate-200">
              <CardContent>
                <h3 className="text-lg font-bold">No experiments yet</h3>
                <Button onClick={() => setView("create")} variant="secondary" className="mt-4">
                  Create First Experiment
                </Button>
              </CardContent>
            </Card>
          ) : (
            experiments.map((exp) => (
              <Card key={exp.id} className="mb-4 p-4 cursor-pointer">
                <CardHeader>
                  <CardTitle>{exp.action || "Untitled Experiment"}</CardTitle>
                  <Badge>{exp.status}</Badge>
                </CardHeader>
                <CardContent>
                  <p>{exp.observation}</p>
                  <p>{exp.hypothesis}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {view === "create" && (
        <div>
          <Button onClick={() => setView("list")} variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="mt-6 space-y-4">
            <Textarea
              placeholder="Observation / Problem"
              value={formData.observation}
              onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
            />
            <Textarea
              placeholder="Hypothesis"
              value={formData.hypothesis}
              onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
            />
            <Input
              placeholder="Action"
              value={formData.action}
              onChange={(e) => setFormData({ ...formData, action: e.target.value })}
            />
            <Input
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <Button onClick={handleCreate} className="w-full">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Launch Experiment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}