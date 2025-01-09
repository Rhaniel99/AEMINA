"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

export function FancyMultiSelect({ categories, onCategoriesChange }) {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
    onCategoriesChange?.(selected.filter((s) => s.value !== item.value)); // Atualiza as categorias no parent
  }, [onCategoriesChange, selected]);

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault();
        const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
        if (!selected.find((s) => s.value === newCategory.value)) {
          setSelected((prev) => [...prev, newCategory]);
          onCategoriesChange?.([...selected, newCategory]); // Atualiza no parent
        }
        setInputValue("");
      }
    },
    [inputValue, onCategoriesChange, selected]
  );

  const selectables = categories.filter((cat) => !selected.some((s) => s.value === cat.value));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => (
            <Badge key={item.value} variant="secondary">
              {item.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Adicione ou selecione categorias..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => (
                  <CommandItem
                    key={item.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, item]);
                      onCategoriesChange?.([...selected, item]); // Atualiza no parent
                    }}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
}
