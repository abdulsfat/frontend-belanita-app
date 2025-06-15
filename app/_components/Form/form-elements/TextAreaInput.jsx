"use client";
import React, { useState } from "react";
import TextArea from "../input/TextArea";
import Label from "../Label";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title="Textarea input field">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>Description</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
