import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DocumentsTab() {
    return <Tabs defaultValue="document" className="w-[400px] h-[700px]">
        <TabsList>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="password">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="document">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
}