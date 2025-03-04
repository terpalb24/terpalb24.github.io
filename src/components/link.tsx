import React from "react";
import {Button} from "./ui/button";

type ButtonProps = Parameters<typeof Button>[0];

interface LinkProps extends ButtonProps {
    href: string;
    children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({href, children, ...props}) => {
    return (
        <Button {...props} asChild>
            <a href={href}>{children}</a>
        </Button>
    );
};

export {Link};