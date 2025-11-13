"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Trash2, RotateCw } from "lucide-react";

export interface OutlineItem {
  id: string;
  heading: string;
  level: number;
}

interface OutlineEditorProps {
  outline: OutlineItem[];
  onOutlineChange: (outline: OutlineItem[]) => void;
  onRegenerate: () => void;
  isRegenerating?: boolean;
}

function SortableItem({
  item,
  onEdit,
  onDelete,
}: {
  item: OutlineItem;
  onEdit: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#e5e5e5] hover:border-[#171717] transition-all group"
    >
      <button
        className="cursor-grab active:cursor-grabbing text-[#a3a3a3] hover:text-[#171717] transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <Input
          value={item.heading}
          onChange={(e) => onEdit(item.id, e.target.value)}
          className="bg-[#fafafa] border-[#e5e5e5] h-10 font-medium text-[#171717]"
          placeholder="Enter heading..."
        />
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="text-[#a3a3a3] hover:text-[#ff6b35] transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export function OutlineEditor({
  outline,
  onOutlineChange,
  onRegenerate,
  isRegenerating = false,
}: OutlineEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = outline.findIndex((item) => item.id === active.id);
      const newIndex = outline.findIndex((item) => item.id === over.id);
      onOutlineChange(arrayMove(outline, oldIndex, newIndex));
    }
  };

  const handleEdit = (id: string, value: string) => {
    onOutlineChange(
      outline.map((item) => (item.id === id ? { ...item, heading: value } : item))
    );
  };

  const handleDelete = (id: string) => {
    if (outline.length > 1) {
      onOutlineChange(outline.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    const newItem: OutlineItem = {
      id: `heading-${Date.now()}`,
      heading: "",
      level: 2,
    };
    onOutlineChange([...outline, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#171717] font-satoshi tracking-[-0.02em]">
            Article Outline
          </h3>
          <p className="text-sm text-[#737373] mt-1">
            Drag to reorder, click to edit headings
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="gap-2"
        >
          <RotateCw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
          Regenerate Outline
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={outline} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {outline.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        onClick={handleAdd}
        className="w-full gap-2 border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Heading
      </Button>
    </div>
  );
}
