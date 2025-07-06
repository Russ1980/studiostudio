
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKeyboardShortcuts } from "@/lib/actions";

export default async function KeyboardShortcutsPage() {
    const shortcuts = await getKeyboardShortcuts();
    
    const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
        (acc[shortcut.section] = acc[shortcut.section] || []).push(shortcut);
        return acc;
    }, {} as Record<string, typeof shortcuts>);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Keyboard Shortcuts</h1>
        <p className="text-muted-foreground">
          A reference for all available keyboard shortcuts to improve your workflow.
        </p>
      </div>
      
      {Object.entries(groupedShortcuts).map(([section, items]) => (
        <Card key={section}>
            <CardHeader>
                <CardTitle>{section}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Action</TableHead>
                            <TableHead>Shortcut</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {items.map(item => (
                         <TableRow key={item.action}>
                            <TableCell className="font-medium">{item.action}</TableCell>
                            <TableCell>
                                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    {item.shortcut}
                                </kbd>
                            </TableCell>
                        </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      ))}
      
    </div>
  );
}
