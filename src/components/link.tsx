import React from "react";
import {Button} from "./ui/button";

type ButtonProps = Parameters<typeof Button>[0];

interface LinkProps extends ButtonProps {
    href: string;
    children: React.ReactNode;
    target?: React.HTMLAttributeAnchorTarget;
}

const Link: React.FC<LinkProps> = ({href, children, target, ...props}) => {
    return (
        <Button {...props} asChild>
            <a href={href} target={target}>{children}</a>
        </Button>
    );
};

export {Link};