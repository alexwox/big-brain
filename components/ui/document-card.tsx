import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Doc } from "@/convex/_generated/dataModel"
import { Button } from "./button"

export function DocumentCard({ document }: { document: Doc<"documents"> }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle> {document.title} </CardTitle>
                <CardDescription> </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary">
                    View Document
                </Button>
            </CardFooter>
        </Card>
    )
}