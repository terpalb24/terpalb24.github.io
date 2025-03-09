import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import React from "react";
import {Menu} from "lucide-react";

interface MenuItem {
    name: string;
    href: string;
}

interface Props {
    items: MenuItem[];
    pathname: string;
}

const NavbarMobile: React.FC<Props> = ({items, pathname}) => {
    return (<Sheet>
        <SheetTrigger asChild={true} className="md:hidden">
            <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5"/>
                <span className="sr-only">Toggle menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="right">
            <SheetHeader>
                <SheetTitle>TERPAL B 24</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
                {items.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-primary px-4 ${
                            (item.href == "/" ? pathname === item.href : pathname.startsWith(item.href)) ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
        </SheetContent>
    </Sheet>);
}
export default NavbarMobile;