"use client"

import * as React from "react"

import { useDataTableContext } from "@/blocks/data-table/context/use-data-table-context"
import { CommandBar } from "@/components/command-bar"

interface DataTableCommandBarProps {
  selectedLabel?: ((count: number) => string) | string
}

const DataTableCommandBar = (props: DataTableCommandBarProps) => {
  const { instance } = useDataTableContext()

  const commands = instance.getCommands()
  const rowSelection = instance.getRowSelection()

  const count = Object.keys(rowSelection || []).length

  const open = commands && commands.length > 0 && count > 0

  function getSelectedLabel(count: number) {
    if (typeof props.selectedLabel === "function") {
      return props.selectedLabel(count)
    }

    return props.selectedLabel
  }

  if (!commands || commands.length === 0) {
    return null
  }

  return (
    <CommandBar open={open}>
      <CommandBar.Bar>
        {props.selectedLabel && (
          <React.Fragment>
            <CommandBar.Value>{getSelectedLabel(count)}</CommandBar.Value>
            <CommandBar.Seperator />
          </React.Fragment>
        )}
        {commands.map((command, idx) => (
          <React.Fragment key={idx}>
            <CommandBar.Command
              key={command.label}
              action={() => command.action(rowSelection)}
              label={command.label}
              shortcut={command.shortcut}
            />
            {idx < commands.length - 1 && <CommandBar.Seperator />}
          </React.Fragment>
        ))}
      </CommandBar.Bar>
    </CommandBar>
  )
}

export { DataTableCommandBar }
export type { DataTableCommandBarProps }
